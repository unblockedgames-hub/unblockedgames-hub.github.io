import pako from 'pako';

export interface NBTCompound {
  [key: string]: any;
}

/**
 * Binary NBT Reader & Writer for Minecraft 26.3 (.nbt structures, servers.dat, network NBT)
 */
export class NBTParser {
  static parse(buffer: ArrayBuffer | Uint8Array): NBTCompound {
    let bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    // Check GZIP magic (0x1f 0x8b) or ZLIB header
    if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
      bytes = pako.ungzip(bytes);
    } else if (bytes.length >= 2 && bytes[0] === 0x78) {
      try {
        bytes = pako.inflate(bytes);
      } catch {
        // Proceed with raw bytes if not zlib
      }
    }

    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let offset = 0;

    const readString = (): string => {
      const len = view.getUint16(offset, false);
      offset += 2;
      const slice = bytes.subarray(offset, offset + len);
      offset += len;
      return new TextDecoder('utf-8').decode(slice);
    };

    const readTagPayload = (tagType: number): any => {
      switch (tagType) {
        case 1: {
          const val = view.getInt8(offset);
          offset += 1;
          return val;
        }
        case 2: {
          const val = view.getInt16(offset, false);
          offset += 2;
          return val;
        }
        case 3: {
          const val = view.getInt32(offset, false);
          offset += 4;
          return val;
        }
        case 4: {
          const val = view.getBigInt64(offset, false);
          offset += 8;
          return Number(val);
        }
        case 5: {
          const val = view.getFloat32(offset, false);
          offset += 4;
          return val;
        }
        case 6: {
          const val = view.getFloat64(offset, false);
          offset += 8;
          return val;
        }
        case 7: {
          const len = view.getInt32(offset, false);
          offset += 4;
          const arr = new Int8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = view.getInt8(offset++);
          }
          return Array.from(arr);
        }
        case 8: {
          return readString();
        }
        case 9: {
          const subType = view.getInt8(offset++);
          const len = view.getInt32(offset, false);
          offset += 4;
          const list = [];
          for (let i = 0; i < Math.max(0, len); i++) {
            list.push(readTagPayload(subType));
          }
          return list;
        }
        case 10: {
          const obj: NBTCompound = {};
          while (offset < bytes.byteLength) {
            const nextType = view.getInt8(offset++);
            if (nextType === 0) break;
            const key = readString();
            obj[key] = readTagPayload(nextType);
          }
          return obj;
        }
        case 11: {
          const len = view.getInt32(offset, false);
          offset += 4;
          const arr: number[] = [];
          for (let i = 0; i < len; i++) {
            arr.push(view.getInt32(offset, false));
            offset += 4;
          }
          return arr;
        }
        case 12: {
          const len = view.getInt32(offset, false);
          offset += 4;
          const arr: string[] = [];
          for (let i = 0; i < len; i++) {
            arr.push(view.getBigInt64(offset, false).toString());
            offset += 8;
          }
          return arr;
        }
        default:
          throw new Error(`Unsupported NBT tag type: ${tagType}`);
      }
    };

    const rootType = view.getInt8(offset++);
    if (rootType === 0) return {};
    // Root tag name
    readString();
    return readTagPayload(rootType);
  }
}
