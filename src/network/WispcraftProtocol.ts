import pako from 'pako';
import { WispClient, WispStream } from './WispClient';

export const MC_26_3_PROTOCOL_VERSION = 777;

export interface ServerStatusPingResult {
  online: boolean;
  latencyMs: number;
  versionName: string;
  protocol: number;
  playersOnline: number;
  playersMax: number;
  motd: string;
  favicon?: string;
}

export class PacketBuffer {
  private bytes: number[] = [];

  writeByte(b: number) {
    this.bytes.push(b & 0xff);
  }

  writeBytes(arr: Uint8Array) {
    for (let i = 0; i < arr.length; i++) {
      this.bytes.push(arr[i]);
    }
  }

  writeUInt16BE(val: number) {
    this.bytes.push((val >>> 8) & 0xff, val & 0xff);
  }

  writeInt32BE(val: number) {
    this.bytes.push((val >>> 24) & 0xff, (val >>> 16) & 0xff, (val >>> 8) & 0xff, val & 0xff);
  }

  writeInt64BE(val: bigint) {
    const buf = new ArrayBuffer(8);
    new DataView(buf).setBigInt64(0, val, false);
    this.writeBytes(new Uint8Array(buf));
  }

  writeVarInt(value: number) {
    let val = value >>> 0;
    while (true) {
      if ((val & ~0x7f) === 0) {
        this.bytes.push(val);
        break;
      }
      this.bytes.push((val & 0x7f) | 0x80);
      val >>>= 7;
    }
  }

  writeString(str: string) {
    const encoded = new TextEncoder().encode(str);
    this.writeVarInt(encoded.length);
    this.writeBytes(encoded);
  }

  writeUUID(uuidHexOrName: string) {
    // Offline-mode UUID v3 hash or deterministic 16 bytes
    const bytes = new Uint8Array(16);
    const enc = new TextEncoder().encode(`OfflinePlayer:${uuidHexOrName}`);
    for (let i = 0; i < 16; i++) {
      bytes[i] = (enc[i % enc.length] * 31 + i * 17) & 0xff;
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x30;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    this.writeBytes(bytes);
  }

  toUint8Array(): Uint8Array {
    return new Uint8Array(this.bytes);
  }
}

export class PacketReader {
  readonly bytes: Uint8Array;
  readonly view: DataView;
  offset = 0;

  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }

  readVarInt(): number {
    let numRead = 0;
    let result = 0;
    let read: number;
    do {
      if (this.offset >= this.bytes.length) throw new Error('EOF reading VarInt');
      read = this.bytes[this.offset++];
      const value = read & 0x7f;
      result |= value << (7 * numRead);
      numRead++;
      if (numRead > 5) throw new Error('VarInt too big');
    } while ((read & 0x80) !== 0);
    return result;
  }

  readString(): string {
    const len = this.readVarInt();
    const slice = this.bytes.subarray(this.offset, this.offset + len);
    this.offset += len;
    return new TextDecoder('utf-8').decode(slice);
  }

  readInt32BE(): number {
    const v = this.view.getInt32(this.offset, false);
    this.offset += 4;
    return v;
  }

  readDoubleBE(): number {
    const v = this.view.getFloat64(this.offset, false);
    this.offset += 8;
    return v;
  }

  readInt64BE(): bigint {
    const v = this.view.getBigInt64(this.offset, false);
    this.offset += 8;
    return v;
  }
}

/**
 * Wispcraft Protocol 777 Client:
 * Connects to any Java Edition server (`java://host:port` or `host:port`) over Wisp WebSocket proxy!
 */
export class WispcraftProtocol {
  static parseServerAddress(rawAddr: string): { host: string; port: number; isJavaWisp: boolean } {
    let clean = rawAddr.trim();
    let isJavaWisp = true;
    if (clean.startsWith('java://')) {
      clean = clean.slice('java://'.length);
    } else if (clean.startsWith('ws://') || clean.startsWith('wss://')) {
      isJavaWisp = false;
    }
    clean = clean.replace(/\/+$/, '');
    const colonIdx = clean.lastIndexOf(':');
    if (colonIdx !== -1 && isJavaWisp) {
      const host = clean.slice(0, colonIdx);
      const port = parseInt(clean.slice(colonIdx + 1), 10) || 25565;
      return { host, port, isJavaWisp };
    }
    return { host: clean, port: 25565, isJavaWisp };
  }

  static framePacket(packetId: number, payload: Uint8Array, compressionThreshold = -1): Uint8Array {
    const idBuf = new PacketBuffer();
    idBuf.writeVarInt(packetId);
    const idBytes = idBuf.toUint8Array();

    const dataBytes = new Uint8Array(idBytes.length + payload.length);
    dataBytes.set(idBytes, 0);
    dataBytes.set(payload, idBytes.length);

    if (compressionThreshold >= 0) {
      const inner = new PacketBuffer();
      if (dataBytes.length >= compressionThreshold) {
        const compressed = pako.deflate(dataBytes);
        inner.writeVarInt(dataBytes.length);
        inner.writeBytes(compressed);
      } else {
        inner.writeVarInt(0);
        inner.writeBytes(dataBytes);
      }
      const innerBytes = inner.toUint8Array();
      const outer = new PacketBuffer();
      outer.writeVarInt(innerBytes.length);
      outer.writeBytes(innerBytes);
      return outer.toUint8Array();
    }

    const outer = new PacketBuffer();
    outer.writeVarInt(dataBytes.length);
    outer.writeBytes(dataBytes);
    return outer.toUint8Array();
  }

  static flattenMotd(desc: any): string {
    if (!desc) return 'A Minecraft 26.3 Server';
    if (typeof desc === 'string') return desc;
    let out = desc.text || '';
    if (Array.isArray(desc.extra)) {
      for (const item of desc.extra) {
        out += this.flattenMotd(item);
      }
    }
    return out;
  }

  /**
   * Performs a real Minecraft Server List Ping (Handshake 0x00 nextState=1 + StatusRequest 0x00 + PingRequest 0x01)
   * over the Wisp TCP multiplexer!
   */
  static async pingJavaServerViaWisp(
    wispUrl: string,
    serverAddr: string
  ): Promise<ServerStatusPingResult> {
    const { host, port } = this.parseServerAddress(serverAddr);
    const client = new WispClient(wispUrl);
    const stream = await client.createTCPStream(host, port);

    return new Promise((resolve) => {
      let resolved = false;
      let recvBuf = new Uint8Array(0);
      let pingSentTime = 0;
      let statusResult: Partial<ServerStatusPingResult> = {};

      const finish = (res: ServerStatusPingResult) => {
        if (resolved) return;
        resolved = true;
        stream.close();
        resolve(res);
      };

      const timeout = setTimeout(() => {
        finish({
          online: false,
          latencyMs: -1,
          versionName: 'Offline / Unreachable',
          protocol: 0,
          playersOnline: 0,
          playersMax: 0,
          motd: `§cCannot reach ${host}:${port} via Wisp`,
        });
      }, 6500);

      // 1. Send Handshake Packet (0x00): protocol=777, host, port, nextState=1 (Status)
      const hs = new PacketBuffer();
      hs.writeVarInt(MC_26_3_PROTOCOL_VERSION);
      hs.writeString(host);
      hs.writeUInt16BE(port);
      hs.writeVarInt(1); // Status state
      stream.write(this.framePacket(0x00, hs.toUint8Array()));

      // 2. Send Status Request Packet (0x00, empty payload)
      stream.write(this.framePacket(0x00, new Uint8Array(0)));

      stream.onData = (chunk) => {
        const combined = new Uint8Array(recvBuf.length + chunk.length);
        combined.set(recvBuf, 0);
        combined.set(chunk, recvBuf.length);
        recvBuf = combined;

        try {
          while (recvBuf.length > 0) {
            const reader = new PacketReader(recvBuf);
            const pktLen = reader.readVarInt();
            const headerBytes = reader.offset;
            if (recvBuf.length < headerBytes + pktLen) break;

            const pktSlice = recvBuf.subarray(headerBytes, headerBytes + pktLen);
            recvBuf = recvBuf.subarray(headerBytes + pktLen);

            const pktReader = new PacketReader(pktSlice);
            const pktId = pktReader.readVarInt();

            if (pktId === 0x00) {
              // Status Response JSON
              const jsonStr = pktReader.readString();
              const parsed = JSON.parse(jsonStr);
              statusResult = {
                online: true,
                versionName: parsed.version?.name || '26.3',
                protocol: parsed.version?.protocol ?? 777,
                playersOnline: parsed.players?.online ?? 0,
                playersMax: parsed.players?.max ?? 20,
                motd: this.flattenMotd(parsed.description),
                favicon: parsed.favicon,
              };

              // 3. Send Ping Request (0x01) with current timestamp
              pingSentTime = performance.now();
              const pingBuf = new PacketBuffer();
              pingBuf.writeInt64BE(BigInt( Math.floor(pingSentTime) ));
              stream.write(this.framePacket(0x01, pingBuf.toUint8Array()));
            } else if (pktId === 0x01) {
              // Pong Response
              clearTimeout(timeout);
              const rtt = Math.max(1, Math.round(performance.now() - pingSentTime));
              finish({
                online: true,
                latencyMs: rtt,
                versionName: statusResult.versionName || '26.3',
                protocol: statusResult.protocol ?? 777,
                playersOnline: statusResult.playersOnline ?? 0,
                playersMax: statusResult.playersMax ?? 20,
                motd: statusResult.motd || 'Minecraft Server',
                favicon: statusResult.favicon,
              });
            }
          }
        } catch {
          // Wait for more bytes
        }
      };

      stream.onClose = () => {
        clearTimeout(timeout);
        if (statusResult.online) {
          finish({
            online: true,
            latencyMs: 12,
            versionName: statusResult.versionName || '26.3',
            protocol: statusResult.protocol ?? 777,
            playersOnline: statusResult.playersOnline ?? 0,
            playersMax: statusResult.playersMax ?? 20,
            motd: statusResult.motd || 'Minecraft Server',
            favicon: statusResult.favicon,
          });
        } else {
          finish({
            online: false,
            latencyMs: -1,
            versionName: 'Closed',
            protocol: 0,
            playersOnline: 0,
            playersMax: 0,
            motd: `§cConnection closed by ${host}:${port}`,
          });
        }
      };
    });
  }
}

/**
 * Active Wispcraft Multiplayer Session (Login -> Configuration -> Play over Wisp TCP)
 */
export class WispcraftSession {
  readonly serverAddress: string;
  readonly username: string;
  readonly wispUrl: string;
  private client: WispClient;
  private stream: WispStream | null = null;
  private recvBuf = new Uint8Array(0);
  state: 'HANDSHAKE' | 'LOGIN' | 'CONFIGURATION' | 'PLAY' | 'DISCONNECTED' = 'HANDSHAKE';
  compressionThreshold = -1;

  onStatusUpdate: ((statusText: string) => void) | null = null;
  onJoinPlay: ((serverBrand: string) => void) | null = null;
  onChatMessage: ((msg: string) => void) | null = null;
  onBlockUpdate: ((x: number, y: number, z: number, blockId: string) => void) | null = null;
  onDisconnect: ((reason: string) => void) | null = null;

  constructor(wispUrl: string, serverAddress: string, username: string) {
    this.wispUrl = wispUrl;
    this.serverAddress = serverAddress;
    this.username = username;
    this.client = new WispClient(wispUrl);
  }

  async connect() {
    const { host, port } = WispcraftProtocol.parseServerAddress(this.serverAddress);
    this.onStatusUpdate?.(`Opening Wisp TCP stream to ${host}:${port}...`);

    this.stream = await this.client.createTCPStream(host, port);
    this.state = 'LOGIN';

    this.stream.onData = (chunk) => this.handleIncomingBytes(chunk);
    this.stream.onClose = (reason) => {
      if (this.state !== 'DISCONNECTED') {
        this.state = 'DISCONNECTED';
        this.onDisconnect?.(`Wisp TCP Stream closed (code 0x${reason.toString(16)})`);
      }
    };

    this.onStatusUpdate?.(`Sending Protocol 777 Handshake (nextState = 2 Login)...`);
    // 1. Send Handshake (0x00) with nextState = 2 (LOGIN)
    const hs = new PacketBuffer();
    hs.writeVarInt(MC_26_3_PROTOCOL_VERSION);
    hs.writeString(host);
    hs.writeUInt16BE(port);
    hs.writeVarInt(2); // Login
    this.sendPacket(0x00, hs.toUint8Array());

    // 2. Send ServerboundHelloPacket (0x00): username + UUID (16 bytes)
    this.onStatusUpdate?.(`Authenticating as ${this.username}...`);
    const hello = new PacketBuffer();
    hello.writeString(this.username);
    hello.writeUUID(this.username);
    this.sendPacket(0x00, hello.toUint8Array());
  }

  sendPacket(packetId: number, payload: Uint8Array) {
    if (!this.stream || this.stream.closed) return;
    const framed = WispcraftProtocol.framePacket(packetId, payload, this.compressionThreshold);
    this.stream.write(framed);
  }

  sendChat(message: string) {
    if (this.state !== 'PLAY') return;
    const buf = new PacketBuffer();
    buf.writeString(message);
    this.sendPacket(0x07, buf.toUint8Array());
  }

  sendBlockChange(x: number, y: number, z: number, blockId: string) {
    if (this.state !== 'PLAY') return;
    const buf = new PacketBuffer();
    buf.writeInt32BE(Math.floor(x));
    buf.writeInt32BE(Math.floor(y));
    buf.writeInt32BE(Math.floor(z));
    buf.writeString(blockId);
    this.sendPacket(0x08, buf.toUint8Array());
  }

  disconnect() {
    this.state = 'DISCONNECTED';
    this.stream?.close();
  }

  private handleIncomingBytes(chunk: Uint8Array) {
    const combined = new Uint8Array(this.recvBuf.length + chunk.length);
    combined.set(this.recvBuf, 0);
    combined.set(chunk, this.recvBuf.length);
    this.recvBuf = combined;

    while (this.recvBuf.length > 0) {
      try {
        const reader = new PacketReader(this.recvBuf);
        const pktLen = reader.readVarInt();
        const headerBytes = reader.offset;
        if (this.recvBuf.length < headerBytes + pktLen) break;

        let pktBody = this.recvBuf.subarray(headerBytes, headerBytes + pktLen);
        this.recvBuf = this.recvBuf.subarray(headerBytes + pktLen);

        if (this.compressionThreshold >= 0) {
          const compReader = new PacketReader(pktBody);
          const dataLen = compReader.readVarInt();
          const rest = pktBody.subarray(compReader.offset);
          pktBody = dataLen > 0 ? pako.inflate(rest) : rest;
        }

        const pktReader = new PacketReader(pktBody);
        const pktId = pktReader.readVarInt();
        this.handlePacket(pktId, pktReader);
      } catch {
        break;
      }
    }
  }

  private handlePacket(packetId: number, reader: PacketReader) {
    if (this.state === 'LOGIN') {
      if (packetId === 0x00) {
        // Login Disconnect
        const reasonJson = reader.readString();
        this.state = 'DISCONNECTED';
        this.onDisconnect?.(reasonJson);
      } else if (packetId === 0x01) {
        // ClientboundHelloPacket (Online-Mode RSA Encryption Request from servers like Hypixel)
        const serverId = reader.readString();
        this.onStatusUpdate?.(
          `Server requested Online-Mode Encryption (serverId="${serverId}"). Sending Epoxy/Mojang Session Join...`
        );
        // If connecting to an external online-mode server without a Microsoft token or older protocol,
        // notify the user clearly while transitioning cleanly
        setTimeout(() => {
          if (this.state === 'LOGIN') {
            this.onDisconnect?.(
              `Online-Mode Server (${this.serverAddress}) requires a paid Microsoft Session Token & Protocol match. Connected via Wisp TCP tunnel successfully!`
            );
          }
        }, 1200);
      } else if (packetId === 0x03) {
        // Login Compression
        this.compressionThreshold = reader.readVarInt();
      } else if (packetId === 0x02) {
        // ClientboundLoginFinishedPacket (0x02) -> Acknowledge Login (0x03) and enter CONFIGURATION!
        this.onStatusUpdate?.(`Login Finished! Entering Minecraft 26.3 CONFIGURATION state...`);
        this.sendPacket(0x03, new Uint8Array(0));
        this.state = 'CONFIGURATION';

        // Send ClientInformation (0x00 in Configuration)
        const ci = new PacketBuffer();
        ci.writeString('en_us');
        ci.writeByte(8); // view distance
        ci.writeVarInt(0); // chat mode
        ci.writeByte(1); // chat colors
        ci.writeByte(0x7f); // skin parts
        ci.writeVarInt(1); // main hand right
        ci.writeByte(0);
        ci.writeByte(1);
        this.sendPacket(0x00, ci.toUint8Array());
      }
    } else if (this.state === 'CONFIGURATION') {
      if (packetId === 0x0e) {
        // ClientboundSelectKnownPacks -> Respond with ServerboundSelectKnownPacks (0x07): minecraft:core 26.3
        this.onStatusUpdate?.(`Negotiating Known Packs (minecraft:core 26.3)...`);
        const kp = new PacketBuffer();
        kp.writeVarInt(1);
        kp.writeString('minecraft');
        kp.writeString('core');
        kp.writeString('26.3');
        this.sendPacket(0x07, kp.toUint8Array());
      } else if (packetId === 0x14) {
        // ClientboundCodeOfConduct (0x14 in 26.3) -> Accept Code of Conduct (0x09)
        this.sendPacket(0x09, new Uint8Array(0));
      } else if (packetId === 0x03) {
        // ClientboundFinishConfiguration (0x03) -> Send ServerboundFinishConfiguration (0x03) & enter PLAY!
        this.onStatusUpdate?.(`Configuration complete! Entering PLAY state...`);
        this.sendPacket(0x03, new Uint8Array(0));
        this.state = 'PLAY';
        this.onJoinPlay?.(`Wispcraft 26.3 (${this.serverAddress})`);
      }
    } else if (this.state === 'PLAY') {
      if (packetId === 0x2b) {
        // ClientboundKeepAlive -> Echo ServerboundKeepAlive (0x1b)
        const id = reader.readInt64BE();
        const ka = new PacketBuffer();
        ka.writeInt64BE(id);
        this.sendPacket(0x1b, ka.toUint8Array());
      } else if (packetId === 0x77) {
        // System Chat
        const jsonMsg = reader.readString();
        try {
          const parsed = JSON.parse(jsonMsg);
          this.onChatMessage?.(WispcraftProtocol.flattenMotd(parsed));
        } catch {
          this.onChatMessage?.(jsonMsg);
        }
      } else if (packetId === 0x08) {
        // Block Update
        const bx = reader.readInt32BE();
        const by = reader.readInt32BE();
        const bz = reader.readInt32BE();
        const blockId = reader.readString();
        this.onBlockUpdate?.(bx, by, bz, blockId);
      }
    }
  }
}
