import { WebSocketServer } from 'ws';
import net from 'net';
import dgram from 'dgram';
import zlib from 'zlib';

/**
 * Mercury Workshop Wisp Protocol v1/v2 Server & Embedded Minecraft 26.3 (Protocol 777) Server
 *
 * Wisp Packet Header (5 bytes LE):
 * - uint8  type (0x01 CONNECT, 0x02 CLOSE, 0x03 DATA, 0x04 CONTINUE, 0x05 INFO)
 * - uint32 streamId (LE)
 * - uint8[] payload
 */
export const WISP_PACKET = {
  CONNECT: 0x01,
  CLOSE: 0x02,
  DATA: 0x03,
  CONTINUE: 0x04,
  INFO: 0x05,
};

export const WISP_STREAM_TYPE = {
  TCP: 0x01,
  UDP: 0x02,
};

export const WISP_CLOSE_REASON = {
  UNKNOWN: 0x01,
  VOLUNTARY: 0x02,
  NETWORK_ERROR: 0x03,
  INVALID_INFO: 0x41,
  UNREACHABLE: 0x42,
  TIMED_OUT: 0x43,
  REFUSED: 0x44,
  TCP_TIMEOUT: 0x47,
  BLOCKED: 0x48,
  THROTTLED: 0x49,
};

function createContinuePacket(streamId, bufferRemaining = 128) {
  const buf = Buffer.alloc(9);
  buf.writeUInt8(WISP_PACKET.CONTINUE, 0);
  buf.writeUInt32LE(streamId, 1);
  buf.writeUInt32LE(bufferRemaining, 5);
  return buf;
}

function createClosePacket(streamId, reason = WISP_CLOSE_REASON.VOLUNTARY) {
  const buf = Buffer.alloc(6);
  buf.writeUInt8(WISP_PACKET.CLOSE, 0);
  buf.writeUInt32LE(streamId, 1);
  buf.writeUInt8(reason, 5);
  return buf;
}

function createDataPacket(streamId, payload) {
  const buf = Buffer.alloc(5 + payload.length);
  buf.writeUInt8(WISP_PACKET.DATA, 0);
  buf.writeUInt32LE(streamId, 1);
  payload.copy(buf, 5);
  return buf;
}

/**
 * Attaches the Wisp WebSocket Multiplexer to an HTTP server at `/wisp` and `/wisp/`
 */
export function attachWispServer(httpServer, embeddedPort = 25565) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    const url = request.url || '';
    if (url.startsWith('/wisp')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  wss.on('connection', (ws) => {
    const streams = new Map();

    // Send initial CONTINUE packet on stream 0 to signal Wisp v1/v2 readiness
    ws.send(createContinuePacket(0, 128));

    ws.on('message', (rawMsg) => {
      const buf = Buffer.isBuffer(rawMsg) ? rawMsg : Buffer.from(rawMsg);
      if (buf.length < 5) return;

      const packetType = buf.readUInt8(0);
      const streamId = buf.readUInt32LE(1);
      const payload = buf.subarray(5);

      if (packetType === WISP_PACKET.CONNECT) {
        if (payload.length < 3) {
          ws.send(createClosePacket(streamId, WISP_CLOSE_REASON.INVALID_INFO));
          return;
        }
        const streamType = payload.readUInt8(0);
        let destPort = payload.readUInt16LE(1);
        let destHost = payload.subarray(3).toString('utf8').trim();

        // Map local aliases to the embedded 26.3 server if targeting localhost:25565
        if (
          destHost === 'localhost' ||
          destHost === '127.0.0.1' ||
          destHost === 'local.wispcraft.net' ||
          destHost === '26.3.wispcraft.local'
        ) {
          destHost = '127.0.0.1';
          if (!destPort || destPort === 25565) destPort = embeddedPort;
        }

        if (streamType === WISP_STREAM_TYPE.TCP) {
          const tcpSocket = net.createConnection({ host: destHost, port: destPort, timeout: 10000 });
          let recvCount = 0;

          streams.set(streamId, { type: 'tcp', socket: tcpSocket });

          tcpSocket.on('connect', () => {
            if (ws.readyState === ws.OPEN) {
              ws.send(createContinuePacket(streamId, 128));
            }
          });

          tcpSocket.on('data', (chunk) => {
            if (ws.readyState === ws.OPEN) {
              ws.send(createDataPacket(streamId, chunk));
            }
          });

          tcpSocket.on('end', () => {
            if (ws.readyState === ws.OPEN) {
              ws.send(createClosePacket(streamId, WISP_CLOSE_REASON.VOLUNTARY));
            }
            streams.delete(streamId);
          });

          tcpSocket.on('error', () => {
            if (ws.readyState === ws.OPEN) {
              ws.send(createClosePacket(streamId, WISP_CLOSE_REASON.UNREACHABLE));
            }
            streams.delete(streamId);
          });

          tcpSocket.on('close', () => {
            streams.delete(streamId);
          });
        } else if (streamType === WISP_STREAM_TYPE.UDP) {
          const udpSocket = dgram.createSocket('udp4');
          streams.set(streamId, { type: 'udp', socket: udpSocket, host: destHost, port: destPort });

          udpSocket.on('message', (msg) => {
            if (ws.readyState === ws.OPEN) {
              ws.send(createDataPacket(streamId, msg));
            }
          });

          udpSocket.on('error', () => {
            if (ws.readyState === ws.OPEN) {
              ws.send(createClosePacket(streamId, WISP_CLOSE_REASON.NETWORK_ERROR));
            }
            streams.delete(streamId);
          });
        }
      } else if (packetType === WISP_PACKET.DATA) {
        const stream = streams.get(streamId);
        if (!stream) return;

        if (stream.type === 'tcp') {
          stream.socket.write(payload);
          stream.recvCount = (stream.recvCount || 0) + 1;
          if (stream.recvCount % 16 === 0 && ws.readyState === ws.OPEN) {
            ws.send(createContinuePacket(streamId, 128));
          }
        } else if (stream.type === 'udp') {
          stream.socket.send(payload, stream.port, stream.host);
        }
      } else if (packetType === WISP_PACKET.CLOSE) {
        const stream = streams.get(streamId);
        if (stream) {
          if (stream.type === 'tcp') stream.socket.destroy();
          else if (stream.type === 'udp') stream.socket.close();
          streams.delete(streamId);
        }
      } else if (packetType === WISP_PACKET.INFO) {
        // Echo Wisp v2 INFO handshake on stream 0
        ws.send(createContinuePacket(0, 128));
      }
    });

    ws.on('close', () => {
      for (const [, stream] of streams.entries()) {
        try {
          if (stream.type === 'tcp') stream.socket.destroy();
          else if (stream.type === 'udp') stream.socket.close();
        } catch {}
      }
      streams.clear();
    });
  });

  return wss;
}

/**
 * VarInt / Minecraft Protocol 777 Buffer Helpers for the Embedded 26.3 TCP Server
 */
function writeVarInt(value) {
  const bytes = [];
  let val = value >>> 0;
  while (true) {
    if ((val & ~0x7f) === 0) {
      bytes.push(val);
      break;
    }
    bytes.push((val & 0x7f) | 0x80);
    val >>>= 7;
  }
  return Buffer.from(bytes);
}

function readVarInt(buf, offset = 0) {
  let numRead = 0;
  let result = 0;
  let read;
  do {
    if (offset + numRead >= buf.length) return null;
    read = buf[offset + numRead];
    const value = read & 0x7f;
    result |= value << (7 * numRead);
    numRead++;
    if (numRead > 5) throw new Error('VarInt too big');
  } while ((read & 0x80) !== 0);
  return { value: result, bytesRead: numRead };
}

function writeMCString(str) {
  const strBuf = Buffer.from(str, 'utf8');
  return Buffer.concat([writeVarInt(strBuf.length), strBuf]);
}

function readMCString(buf, offset) {
  const lenRes = readVarInt(buf, offset);
  if (!lenRes) return null;
  const start = offset + lenRes.bytesRead;
  if (start + lenRes.value > buf.length) return null;
  return {
    value: buf.subarray(start, start + lenRes.value).toString('utf8'),
    bytesRead: lenRes.bytesRead + lenRes.value,
  };
}

function frameMCPacket(packetId, payloadBuf, compressionThreshold = -1) {
  const dataBuf = Buffer.concat([writeVarInt(packetId), payloadBuf]);
  if (compressionThreshold >= 0) {
    if (dataBuf.length >= compressionThreshold) {
      const compressed = zlib.deflateSync(dataBuf);
      const inner = Buffer.concat([writeVarInt(dataBuf.length), compressed]);
      return Buffer.concat([writeVarInt(inner.length), inner]);
    } else {
      const inner = Buffer.concat([writeVarInt(0), dataBuf]);
      return Buffer.concat([writeVarInt(inner.length), inner]);
    }
  }
  return Buffer.concat([writeVarInt(dataBuf.length), dataBuf]);
}

/**
 * Starts an embedded real TCP Minecraft 26.3 Server (Protocol 777) on port 25565 (or fallback)
 * so that Wispcraft connections to `java://localhost:25565` or `java://26.3.wispcraft.local:25565`
 * go through real Wisp -> TCP socket -> VarInt framing -> Status/Login/Configuration/Play!
 */
export function startEmbeddedMC26Server(preferredPort = 25565) {
  const connectedClients = new Set();
  const worldBlockDiffs = new Map(); // "x,y,z" -> blockId

  const server = net.createServer((socket) => {
    let state = 'HANDSHAKE'; // HANDSHAKE -> STATUS | LOGIN -> CONFIGURATION -> PLAY
    let recvBuf = Buffer.alloc(0);
    let username = 'Player';
    let uuidBytes = Buffer.alloc(16, 1);
    let keepAliveTimer = null;

    const sendPacket = (packetId, payload) => {
      if (!socket.destroyed) {
        socket.write(frameMCPacket(packetId, payload, -1));
      }
    };

    socket.on('data', (chunk) => {
      recvBuf = Buffer.concat([recvBuf, chunk]);

      while (recvBuf.length > 0) {
        const lenRes = readVarInt(recvBuf, 0);
        if (!lenRes) break;
        const totalPacketEnd = lenRes.bytesRead + lenRes.value;
        if (recvBuf.length < totalPacketEnd) break;

        const packetSlice = recvBuf.subarray(lenRes.bytesRead, totalPacketEnd);
        recvBuf = recvBuf.subarray(totalPacketEnd);

        const idRes = readVarInt(packetSlice, 0);
        if (!idRes) continue;
        const packetId = idRes.value;
        const body = packetSlice.subarray(idRes.bytesRead);

        try {
          if (state === 'HANDSHAKE') {
            if (packetId === 0x00) {
              // Handshake: protocol_version (VarInt), host (String), port (UInt16), next_state (VarInt)
              const protoRes = readVarInt(body, 0);
              const hostRes = readMCString(body, protoRes.bytesRead);
              const nextStateOffset = protoRes.bytesRead + hostRes.bytesRead + 2;
              const nextStateRes = readVarInt(body, nextStateOffset);
              const nextState = nextStateRes ? nextStateRes.value : 1;
              state = nextState === 2 ? 'LOGIN' : 'STATUS';
            }
          } else if (state === 'STATUS') {
            if (packetId === 0x00) {
              // Status Request -> Status Response (0x00)
              const statusJson = {
                version: {
                  name: '26.3 (Wilderness Bound)',
                  protocol: 777,
                },
                players: {
                  max: 20,
                  online: Math.max(1, connectedClients.size),
                  sample: [
                    { name: 'Steve_26_3', id: '00000000-0000-0000-0000-000000000001' },
                    { name: 'Alex_Wilderness', id: '00000000-0000-0000-0000-000000000002' },
                  ],
                },
                description: {
                  text: '§6§lMinecraft 26.3 §aWilderness Bound §7[Wispcraft TCP]\n§eDappled Forest • Poplar Trees • Cushions • Straw Beds',
                },
                enforcesSecureChat: false,
              };
              sendPacket(0x00, writeMCString(JSON.stringify(statusJson)));
            } else if (packetId === 0x01) {
              // Ping Request (long payload) -> Pong Response (0x01)
              sendPacket(0x01, body);
            }
          } else if (state === 'LOGIN') {
            if (packetId === 0x00) {
              // ServerboundHelloPacket: username (String), uuid (16 bytes)
              const nameRes = readMCString(body, 0);
              if (nameRes) {
                username = nameRes.value;
                if (body.length >= nameRes.bytesRead + 16) {
                  uuidBytes = Buffer.from(body.subarray(nameRes.bytesRead, nameRes.bytesRead + 16));
                }
              }
              // Send ClientboundLoginFinishedPacket (0x02 in Protocol 777)
              // Format: UUID (16 bytes) + Username (String) + Properties Count (VarInt 0) + StrictErrorHandling (bool false)
              const loginFinishedPayload = Buffer.concat([
                uuidBytes,
                writeMCString(username),
                writeVarInt(0),
                Buffer.from([0x00]),
              ]);
              sendPacket(0x02, loginFinishedPayload);
            } else if (packetId === 0x03) {
              // ServerboundLoginAcknowledgedPacket (0x03) -> Transition to CONFIGURATION
              state = 'CONFIGURATION';

              // Send ClientboundSelectKnownPacks (0x0e in Configuration): 1 pack: minecraft:core 26.3
              const knownPacksPayload = Buffer.concat([
                writeVarInt(1),
                writeMCString('minecraft'),
                writeMCString('core'),
                writeMCString('26.3'),
              ]);
              sendPacket(0x0e, knownPacksPayload);

              // Send ClientboundFinishConfiguration (0x03 in Configuration)
              sendPacket(0x03, Buffer.alloc(0));
            }
          } else if (state === 'CONFIGURATION') {
            if (packetId === 0x03) {
              // ServerboundFinishConfigurationPacket (0x03) -> Transition to PLAY!
              state = 'PLAY';
              connectedClients.add({ socket, username, sendPacket });

              // Send ClientboundLoginPacket (Play 0x30 in 26.3)
              const loginPlayPayload = Buffer.concat([
                Buffer.from([0, 0, 0, 1]), // Entity ID = 1 (Int32 BE)
                Buffer.from([0]), // Hardcore = false
                writeMCString('minecraft:overworld'),
                writeMCString('minecraft:dappled_forest'),
                writeVarInt(20), // Max players
                writeVarInt(10), // View distance
                writeVarInt(10), // Simulation distance
                Buffer.from([0]), // GameMode = 0 (Survival)
              ]);
              sendPacket(0x30, loginPlayPayload);

              // Send initial Player Position (Play 0x46: synchronize_player_position)
              const posBuf = Buffer.alloc(24);
              posBuf.writeDoubleBE(0.5, 0);
              posBuf.writeDoubleBE(76.0, 8);
              posBuf.writeDoubleBE(0.5, 16);
              sendPacket(0x46, posBuf);

              // Send Welcome System Chat (Play 0x77)
              const welcomeMsg = JSON.stringify({
                text: `§a[Wispcraft 26.3] §fConnected to §6Wilderness Bound TCP Server §7(Protocol 777) as §b${username}§f!`,
              });
              sendPacket(0x77, Buffer.concat([writeMCString(welcomeMsg), Buffer.from([0])]));

              // Sync any existing block edits on the server
              for (const [coords, blockName] of worldBlockDiffs.entries()) {
                const [bx, by, bz] = coords.split(',').map(Number);
                const bBuf = Buffer.alloc(12);
                bBuf.writeInt32BE(bx, 0);
                bBuf.writeInt32BE(by, 4);
                bBuf.writeInt32BE(bz, 8);
                sendPacket(0x08, Buffer.concat([bBuf, writeMCString(blockName)]));
              }

              // Start KeepAlive loop (Play 0x2b)
              keepAliveTimer = setInterval(() => {
                const kaBuf = Buffer.alloc(8);
                kaBuf.writeBigInt64BE(BigInt(Date.now()), 0);
                sendPacket(0x2b, kaBuf);
              }, 10000);
            }
          } else if (state === 'PLAY') {
            if (packetId === 0x08) {
              // Custom / simplified block update broadcast across connected Wispcraft clients
              const bx = body.readInt32BE(0);
              const by = body.readInt32BE(4);
              const bz = body.readInt32BE(8);
              const bStr = readMCString(body, 12);
              if (bStr) {
                worldBlockDiffs.set(`${bx},${by},${bz}`, bStr.value);
                for (const c of connectedClients) {
                  if (c.socket !== socket) {
                    c.sendPacket(0x08, body);
                  }
                }
              }
            } else if (packetId === 0x07) {
              // Chat message from client -> Broadcast System Chat (0x77)
              const msgRes = readMCString(body, 0);
              if (msgRes) {
                const chatPayload = JSON.stringify({
                  text: `<${username}> ${msgRes.value}`,
                });
                const pkt = Buffer.concat([writeMCString(chatPayload), Buffer.from([0])]);
                for (const c of connectedClients) {
                  c.sendPacket(0x77, pkt);
                }
              }
            }
          }
        } catch (err) {
          // Ignore malformed packet frames
        }
      }
    });

    const cleanup = () => {
      if (keepAliveTimer) clearInterval(keepAliveTimer);
      for (const c of connectedClients) {
        if (c.socket === socket) connectedClients.delete(c);
      }
    };

    socket.on('close', cleanup);
    socket.on('error', cleanup);
  });

  return new Promise((resolve) => {
    server.on('error', () => {
      // Fallback to random available port if 25565 is in use
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address();
        resolve({ server, port: addr.port });
      });
    });
    server.listen(preferredPort, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, port: addr.port });
    });
  });
}
