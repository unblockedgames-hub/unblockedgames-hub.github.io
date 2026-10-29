/**
 * Mercury Workshop Wisp Protocol v1/v2 Client Implementation (`MercuryWorkshop/wisp-protocol`)
 *
 * Multiplexes raw TCP (0x01) and UDP (0x02) streams over a single binary WebSocket connection.
 * Used by Wispcraft to connect from a web browser to real Java Edition Minecraft servers (`java://host:port`).
 *
 * Binary Frame Header (5 bytes, Little-Endian):
 * - Byte 0:      Packet Type (`0x01` CONNECT, `0x02` CLOSE, `0x03` DATA, `0x04` CONTINUE, `0x05` INFO)
 * - Bytes 1..4:  Stream ID (`uint32` LE, `0` = control, `1+` = virtual socket stream)
 * - Bytes 5..N:  Packet Payload
 */

export const WISP_PACKET_TYPE = {
  CONNECT: 0x01,
  CLOSE: 0x02,
  DATA: 0x03,
  CONTINUE: 0x04,
  INFO: 0x05,
} as const;

export const WISP_STREAM_TYPE = {
  TCP: 0x01,
  UDP: 0x02,
} as const;

export class WispStream {
  readonly streamId: number;
  readonly host: string;
  readonly port: number;
  readonly streamType: number;
  private client: WispClient;
  sendBufferRemaining = 128;
  private writeQueue: Uint8Array[] = [];
  closed = false;

  onData: ((data: Uint8Array) => void) | null = null;
  onClose: ((reason: number) => void) | null = null;
  onConnect: (() => void) | null = null;

  constructor(client: WispClient, streamId: number, host: string, port: number, streamType: number) {
    this.client = client;
    this.streamId = streamId;
    this.host = host;
    this.port = port;
    this.streamType = streamType;
  }

  write(data: Uint8Array) {
    if (this.closed) return;
    if (this.sendBufferRemaining > 0 || this.streamType === WISP_STREAM_TYPE.UDP) {
      this.sendBufferRemaining = Math.max(0, this.sendBufferRemaining - 1);
      this.client.sendDataFrame(this.streamId, data);
    } else {
      this.writeQueue.push(data);
    }
  }

  handleContinue(bufferRemaining: number) {
    this.sendBufferRemaining = bufferRemaining;
    if (this.onConnect) {
      const cb = this.onConnect;
      this.onConnect = null;
      cb();
    }
    while (this.writeQueue.length > 0 && this.sendBufferRemaining > 0) {
      const next = this.writeQueue.shift()!;
      this.sendBufferRemaining--;
      this.client.sendDataFrame(this.streamId, next);
    }
  }

  close(reason = 0x02) {
    if (this.closed) return;
    this.closed = true;
    this.client.sendCloseFrame(this.streamId, reason);
  }
}

export class WispClient {
  readonly wispUrl: string;
  private ws: WebSocket | null = null;
  private nextStreamId = 1;
  private streams = new Map<number, WispStream>();
  private connectPromise: Promise<void> | null = null;
  connected = false;

  constructor(wispUrl: string) {
    this.wispUrl = wispUrl;
  }

  connect(): Promise<void> {
    if (this.connected && this.ws?.readyState === WebSocket.OPEN) {
      return Promise.resolve();
    }
    if (this.connectPromise) return this.connectPromise;

    this.connectPromise = new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(this.wispUrl);
        ws.binaryType = 'arraybuffer';
        this.ws = ws;

        const timeout = setTimeout(() => {
          reject(new Error(`Wisp WebSocket timeout connecting to ${this.wispUrl}`));
        }, 7000);

        ws.onopen = () => {
          clearTimeout(timeout);
          this.connected = true;
          resolve();
        };

        ws.onmessage = (ev) => {
          if (!(ev.data instanceof ArrayBuffer)) return;
          const bytes = new Uint8Array(ev.data);
          if (bytes.length < 5) return;
          const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
          const packetType = view.getUint8(0);
          const streamId = view.getUint32(1, true);
          const payload = bytes.subarray(5);

          if (streamId === 0) {
            // Stream 0 control packet (CONTINUE or Wisp V2 INFO)
            return;
          }

          const stream = this.streams.get(streamId);
          if (!stream) return;

          if (packetType === WISP_PACKET_TYPE.DATA) {
            stream.onData?.(payload);
          } else if (packetType === WISP_PACKET_TYPE.CONTINUE) {
            const rem = payload.length >= 4 ? new DataView(payload.buffer, payload.byteOffset, 4).getUint32(0, true) : 128;
            stream.handleContinue(rem);
          } else if (packetType === WISP_PACKET_TYPE.CLOSE) {
            const reason = payload.length >= 1 ? payload[0] : 0x01;
            stream.closed = true;
            this.streams.delete(streamId);
            stream.onClose?.(reason);
          }
        };

        ws.onerror = () => {
          clearTimeout(timeout);
          this.connected = false;
          this.connectPromise = null;
          reject(new Error(`Failed to connect to Wisp server at ${this.wispUrl}`));
        };

        ws.onclose = () => {
          this.connected = false;
          this.connectPromise = null;
          for (const [, s] of this.streams) {
            s.closed = true;
            s.onClose?.(0x03);
          }
          this.streams.clear();
        };
      } catch (err) {
        this.connectPromise = null;
        reject(err);
      }
    });

    return this.connectPromise;
  }

  async createTCPStream(host: string, port: number): Promise<WispStream> {
    await this.connect();
    const streamId = this.nextStreamId++;
    const stream = new WispStream(this, streamId, host, port, WISP_STREAM_TYPE.TCP);
    this.streams.set(streamId, stream);

    // Build Wisp CONNECT frame (0x01): [uint8 type=1][uint32LE streamId][uint8 streamType=1][uint16LE port][utf8 host]
    const hostBytes = new TextEncoder().encode(host);
    const frame = new Uint8Array(5 + 3 + hostBytes.length);
    const view = new DataView(frame.buffer);
    view.setUint8(0, WISP_PACKET_TYPE.CONNECT);
    view.setUint32(1, streamId, true);
    view.setUint8(5, WISP_STREAM_TYPE.TCP);
    view.setUint16(6, port, true);
    frame.set(hostBytes, 8);

    this.ws!.send(frame);
    return stream;
  }

  sendDataFrame(streamId: number, payload: Uint8Array) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const frame = new Uint8Array(5 + payload.length);
    const view = new DataView(frame.buffer);
    view.setUint8(0, WISP_PACKET_TYPE.DATA);
    view.setUint32(1, streamId, true);
    frame.set(payload, 5);
    this.ws.send(frame);
  }

  sendCloseFrame(streamId: number, reason: number) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const frame = new Uint8Array(6);
    const view = new DataView(frame.buffer);
    view.setUint8(0, WISP_PACKET_TYPE.CLOSE);
    view.setUint32(1, streamId, true);
    view.setUint8(5, reason);
    this.ws.send(frame);
    this.streams.delete(streamId);
  }
}
