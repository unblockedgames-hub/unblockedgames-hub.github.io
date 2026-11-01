import biomePointsRaw from './overworld_biome_points.json';
import offsetData from './offset.json';

const offsetSplineRoot = (offsetData as any).input?.second?.right;

function evalCubicSpline(splineObj: any, ctx: { cont: number; erosion: number; ridge: number }): number {
  if (typeof splineObj === 'number') return splineObj;
  if (!splineObj) return 0;
  const s = splineObj.spline || splineObj;
  const coordName = s.coordinate || '';
  let coordVal = 0;
  if (coordName.includes('continents')) coordVal = ctx.cont;
  else if (coordName.includes('erosion')) coordVal = ctx.erosion;
  else if (coordName.includes('ridges')) coordVal = ctx.ridge;

  const pts = s.points;
  if (!pts || pts.length === 0) return 0;
  if (pts.length === 1) return evalCubicSpline(pts[0].value, ctx);

  if (coordVal <= pts[0].location) {
    const val0 = evalCubicSpline(pts[0].value, ctx);
    const d0 = pts[0].derivative || 0;
    return val0 + d0 * (coordVal - pts[0].location);
  }
  const last = pts[pts.length - 1];
  if (coordVal >= last.location) {
    const valLast = evalCubicSpline(last.value, ctx);
    const dLast = last.derivative || 0;
    return valLast + dLast * (coordVal - last.location);
  }

  let idx = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    if (coordVal >= pts[i].location && coordVal <= pts[i + 1].location) {
      idx = i;
      break;
    }
  }

  const p0 = pts[idx];
  const p1 = pts[idx + 1];
  const deltaX = p1.location - p0.location;
  const t = deltaX === 0 ? 0 : (coordVal - p0.location) / deltaX;

  const v0 = evalCubicSpline(p0.value, ctx);
  const v1 = evalCubicSpline(p1.value, ctx);
  const d0 = (p0.derivative || 0) * deltaX;
  const d1 = (p1.derivative || 0) * deltaX;

  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;

  return h00 * v0 + h10 * d0 + h01 * v1 + h11 * d1;
}

const MASK64 = 0xFFFFFFFFFFFFFFFFn;
const SIGN64 = 0x8000000000000000n;

function toSigned64(n: bigint): bigint {
  n = n & MASK64;
  return n >= SIGN64 ? n - 0x10000000000000000n : n;
}

function rotl64(x: bigint, k: bigint): bigint {
  return ((x << k) | ((x & MASK64) >> (64n - k))) & MASK64;
}

export function mixStafford13(z: bigint): bigint {
  z = z & MASK64;
  z = ((z ^ (z >> 30n)) * 0xBF58476D1CE4E5B9n) & MASK64;
  z = ((z ^ (z >> 27n)) * 0x94D049BB133111EBn) & MASK64;
  return (z ^ (z >> 31n)) & MASK64;
}

export function upgradeSeedTo128bit(seed: bigint): [bigint, bigint] {
  const s = seed & MASK64;
  const seedLo = (s ^ 0x6A09E667F3BCC909n) & MASK64;
  const seedHi = (seedLo + 0x9E3779B97F4A7C15n) & MASK64;
  return [mixStafford13(seedLo), mixStafford13(seedHi)];
}

// Standard RFC 1321 MD5
function md5(string: string): Uint8Array {
  function md5_RotateLeft(lValue: number, iShiftBits: number): number {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function md5_AddUnsigned(lX: number, lY: number): number {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }
  function md5_F(x: number, y: number, z: number): number { return (x & y) | ((~x) & z); }
  function md5_G(x: number, y: number, z: number): number { return (x & z) | (y & (~z)); }
  function md5_H(x: number, y: number, z: number): number { return x ^ y ^ z; }
  function md5_I(x: number, y: number, z: number): number { return y ^ (x | (~z)); }

  function md5_FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }

  function convertToWordArray(str: string): number[] {
    const lMessageLength = str.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = new Array(lNumberOfWords).fill(0);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      const lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    const lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  const x = convertToWordArray(string);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821);

    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x02441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x04881d05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);

    a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391);

    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }

  const words = [a, b, c, d];
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 4; i++) {
    bytes[i * 4] = words[i] & 0xff;
    bytes[i * 4 + 1] = (words[i] >>> 8) & 0xff;
    bytes[i * 4 + 2] = (words[i] >>> 16) & 0xff;
    bytes[i * 4 + 3] = (words[i] >>> 24) & 0xff;
  }
  return bytes;
}

export function seedFromHashOf(str: string): [bigint, bigint] {
  const bytes = md5(str);
  let lo = 0n;
  for (let i = 0; i < 8; i++) {
    lo = (lo << 8n) | BigInt(bytes[i]);
  }
  let hi = 0n;
  for (let i = 8; i < 16; i++) {
    hi = (hi << 8n) | BigInt(bytes[i]);
  }
  return [lo & MASK64, hi & MASK64];
}

export class Xoroshiro128PlusPlus {
  seedLo: bigint;
  seedHi: bigint;

  constructor(seedLo: bigint, seedHi: bigint) {
    this.seedLo = seedLo & MASK64;
    this.seedHi = seedHi & MASK64;
    if (this.seedLo === 0n && this.seedHi === 0n) {
      this.seedLo = 0x9E3779B97F4A7C15n;
      this.seedHi = 0x6A09E667F3BCC909n;
    }
  }

  nextLong(): bigint {
    const s0 = this.seedLo;
    let s1 = this.seedHi;
    const result = (rotl64((s0 + s1) & MASK64, 17n) + s0) & MASK64;
    s1 ^= s0;
    this.seedLo = (rotl64(s0, 49n) ^ s1 ^ ((s1 << 21n) & MASK64)) & MASK64;
    this.seedHi = rotl64(s1, 28n);
    return toSigned64(result);
  }

  nextInt(): number {
    return Number(BigInt.asIntN(32, this.nextLong()));
  }

  nextIntBound(bound: number): number {
    let l = BigInt(this.nextInt()) & 0xFFFFFFFFn;
    let l1 = l * BigInt(bound);
    let l2 = l1 & 0xFFFFFFFFn;
    if (l2 < BigInt(bound)) {
      const i = BigInt(Math.floor(0x100000000 % bound));
      while (l2 < i) {
        l = BigInt(this.nextInt()) & 0xFFFFFFFFn;
        l1 = l * BigInt(bound);
        l2 = l1 & 0xFFFFFFFFn;
      }
    }
    return Number(l1 >> 32n);
  }

  nextDouble(): number {
    const l = (this.nextLong() & MASK64) >> 11n;
    return Number(l) * 1.1102230246251565e-16;
  }

  forkPositional(): PositionalRandomFactory {
    return new PositionalRandomFactory(this.nextLong(), this.nextLong());
  }
}

export class PositionalRandomFactory {
  seedLo: bigint;
  seedHi: bigint;

  constructor(seedLo: bigint, seedHi: bigint) {
    this.seedLo = seedLo & MASK64;
    this.seedHi = seedHi & MASK64;
  }

  fromHashOf(str: string): Xoroshiro128PlusPlus {
    const [hLo, hHi] = seedFromHashOf(str);
    return new Xoroshiro128PlusPlus(this.seedLo ^ hLo, this.seedHi ^ hHi);
  }
}

const GRADIENTS: [number, number, number][] = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  [1, 1, 0], [0, -1, 1], [-1, 1, 0], [0, -1, -1]
];

function smoothstep(t: number): number {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

function lerp(delta: number, start: number, end: number): number {
  return start + delta * (end - start);
}

function lerp3(
  dx: number, dy: number, dz: number,
  x0y0z0: number, x1y0z0: number, x0y1z0: number, x1y1z0: number,
  x0y0z1: number, x1y0z1: number, x0y1z1: number, x1y1z1: number
): number {
  return lerp(
    dz,
    lerp(dy, lerp(dx, x0y0z0, x1y0z0), lerp(dx, x0y1z0, x1y1z0)),
    lerp(dy, lerp(dx, x0y0z1, x1y0z1), lerp(dx, x0y1z1, x1y1z1))
  );
}

function gradDot(gradIdx: number, x: number, y: number, z: number): number {
  const g = GRADIENTS[gradIdx & 15];
  return g[0] * x + g[1] * y + g[2] * z;
}

export class PerlinNoise {
  perms: Uint8Array = new Uint8Array(256);
  offsetX: number;
  offsetY: number;
  offsetZ: number;

  constructor(rand: Xoroshiro128PlusPlus) {
    this.offsetX = rand.nextDouble() * 256.0;
    this.offsetY = rand.nextDouble() * 256.0;
    this.offsetZ = rand.nextDouble() * 256.0;

    for (let i = 0; i < 256; i++) {
      this.perms[i] = i;
    }
    for (let i = 0; i < 256; i++) {
      const j = rand.nextIntBound(256 - i);
      const temp = this.perms[i];
      this.perms[i] = this.perms[i + j];
      this.perms[i + j] = temp;
    }
  }

  permute(v: number): number {
    return this.perms[v & 255];
  }

  get(x: number, y: number, z: number): number {
    const rx = x + this.offsetX;
    const ry = y + this.offsetY;
    const rz = z + this.offsetZ;

    const ix = Math.floor(rx);
    const iy = Math.floor(ry);
    const iz = Math.floor(rz);

    const fx = Math.fround(rx - ix);
    const fy = Math.fround(ry - iy);
    const fz = Math.fround(rz - iz);

    const pX0 = this.permute(ix);
    const pX1 = this.permute(ix + 1);

    const p00 = this.permute(pX0 + iy);
    const p01 = this.permute(pX0 + iy + 1);
    const p10 = this.permute(pX1 + iy);
    const p11 = this.permute(pX1 + iy + 1);

    const d000 = gradDot(this.permute(p00 + iz), fx, fy, fz);
    const d100 = gradDot(this.permute(p10 + iz), fx - 1, fy, fz);
    const d010 = gradDot(this.permute(p01 + iz), fx, fy - 1, fz);
    const d110 = gradDot(this.permute(p11 + iz), fx - 1, fy - 1, fz);

    const d001 = gradDot(this.permute(p00 + iz + 1), fx, fy, fz - 1);
    const d101 = gradDot(this.permute(p10 + iz + 1), fx - 1, fy, fz - 1);
    const d011 = gradDot(this.permute(p01 + iz + 1), fx, fy - 1, fz - 1);
    const d111 = gradDot(this.permute(p11 + iz + 1), fx - 1, fy - 1, fz - 1);

    const sx = smoothstep(fx);
    const sy = smoothstep(fy);
    const sz = smoothstep(fz);

    return lerp3(sx, sy, sz, d000, d100, d010, d110, d001, d101, d011, d111);
  }
}

function parityExpectedDeviation(span: number): number {
  return 0.1 * (1.0 + 1.0 / (span + 1));
}

function computeParityNormalizationFactor(baseAmp: number, octaveCount: number, amplitudes: number[]): number {
  let minIdx = 2147483647;
  let maxIdx = -2147483648;
  for (let k = 0; k < amplitudes.length; k++) {
    if (amplitudes[k] !== 0) {
      minIdx = Math.min(minIdx, k);
      maxIdx = Math.max(maxIdx, k);
    }
  }
  return baseAmp * 0.5 * (1.0 / 3.0) / parityExpectedDeviation(maxIdx - minIdx);
}

interface OctaveLayer {
  frequency: number;
  amplitude: number;
  noise: PerlinNoise;
}

export class VanillaNormalNoise {
  layers: OctaveLayer[] = [];

  constructor(
    factory: PositionalRandomFactory,
    noiseName: string,
    baseOctave: number,
    amplitudes: number[]
  ) {
    const rand = factory.fromHashOf(noiseName);
    const f1 = rand.forkPositional();
    const f2 = rand.forkPositional();

    let freq = Math.pow(2.0, baseOctave);
    let amp = 1.0;
    const octaveCount = amplitudes.length;
    amp = amp * (Math.pow(0.5, -(octaveCount - 1)) / (Math.pow(0.5, -octaveCount) - 1.0));

    const octaves: Array<{ octaveIndex: number; freq: number; amplitude: number }> = [];
    for (let i = 0; i < amplitudes.length; i++) {
      const mod = amplitudes[i];
      if (mod !== 0) {
        const effAmp = amp * mod;
        octaves.push({
          octaveIndex: baseOctave + i,
          freq: freq,
          amplitude: effAmp
        });
      }
      freq *= 2.0;
      amp *= 0.5;
    }

    const parityFactor = computeParityNormalizationFactor(1.0, amplitudes.length, amplitudes);
    const factor = 1.0181268882175227;
    for (const oct of octaves) {
      const seedStr = 'octave_' + oct.octaveIndex;
      const p1 = new PerlinNoise(f1.fromHashOf(seedStr));
      const p2 = new PerlinNoise(f2.fromHashOf(seedStr));
      const layerAmp = oct.amplitude * parityFactor;
      this.layers.push({ noise: p1, frequency: oct.freq, amplitude: layerAmp });
      this.layers.push({ noise: p2, frequency: oct.freq * factor, amplitude: layerAmp });
    }
  }

  get(x: number, y: number, z: number): number {
    let sum = 0;
    for (let i = 0; i < this.layers.length; i++) {
      const l = this.layers[i];
      sum += l.noise.get(x * l.frequency, y * l.frequency, z * l.frequency) * l.amplitude;
    }
    return sum;
  }
}

export interface ClimatePoint {
  biome: string;
  t: [number, number];
  h: [number, number];
  c: [number, number];
  e: [number, number];
  d: [number, number];
  w: [number, number];
  offset: number;
}

export class VanillaClimate {
  seed: bigint = 0n;
  tempNoise!: VanillaNormalNoise;
  vegNoise!: VanillaNormalNoise;
  contNoise!: VanillaNormalNoise;
  erosionNoise!: VanillaNormalNoise;
  ridgeNoise!: VanillaNormalNoise;
  offsetNoise!: VanillaNormalNoise;

  private points: ClimatePoint[] = (biomePointsRaw as any) as ClimatePoint[];
  private spawnCoords: { x: number; z: number } = { x: 0, z: 0 };

  constructor(seedInput: string | number | bigint = 0) {
    this.setSeed(seedInput);
  }

  setSeed(seedInput: string | number | bigint) {
    let s = 0n;
    if (typeof seedInput === 'bigint') {
      s = seedInput;
    } else if (typeof seedInput === 'number' && !isNaN(seedInput)) {
      s = BigInt(seedInput | 0);
    } else {
      const str = String(seedInput).trim();
      const asNum = Number(str);
      if (str && !isNaN(asNum) && Number.isInteger(asNum)) {
        s = BigInt(asNum);
      } else if (str) {
        // Java String.hashCode()
        let h = 0;
        for (let i = 0; i < str.length; i++) {
          h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
        }
        s = BigInt(h);
      }
    }

    this.seed = s;
    const [lo, hi] = upgradeSeedTo128bit(s);
    const rootRng = new Xoroshiro128PlusPlus(lo, hi);
    const rootFactory = new PositionalRandomFactory(rootRng.nextLong(), rootRng.nextLong());

    // Noise configurations from Minecraft 26.3:
    this.tempNoise = new VanillaNormalNoise(rootFactory, 'minecraft:temperature', -10, [1.5, 0.0, 1.0, 0.0, 0.0, 0.0]);
    this.vegNoise = new VanillaNormalNoise(rootFactory, 'minecraft:vegetation', -8, [1.0, 1.0, 0.0, 0.0, 0.0, 0.0]);
    this.contNoise = new VanillaNormalNoise(rootFactory, 'minecraft:continentalness', -9, [1.0, 1.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0]);
    this.erosionNoise = new VanillaNormalNoise(rootFactory, 'minecraft:erosion', -9, [1.0, 1.0, 0.0, 1.0, 1.0]);
    this.ridgeNoise = new VanillaNormalNoise(rootFactory, 'minecraft:ridge', -7, [1.0, 2.0, 1.0, 0.0, 0.0, 0.0]);
    this.offsetNoise = new VanillaNormalNoise(rootFactory, 'minecraft:offset', -3, [1.0, 1.0, 1.0, 0.0]);

    this.spawnCoords = this.computeSpawnCoords();
  }

  getSpawnCoords(): { x: number; z: number } {
    return this.spawnCoords;
  }

  sampleClimate(blockX: number, blockZ: number): {
    temp: number;
    humid: number;
    cont: number;
    erosion: number;
    ridge: number;
  } {
    const qx = blockX >> 2;
    const qz = blockZ >> 2;

    const shiftX = this.offsetNoise.get(qx, 0.0, qz) * 4.0;
    const shiftZ = this.offsetNoise.get(qz, 0.0, qx) * 4.0;

    const sx = qx + shiftX;
    const sz = qz + shiftZ;

    const temp = this.tempNoise.get(sx, 0.0, sz);
    const humid = this.vegNoise.get(sx, 0.0, sz);
    const cont = this.contNoise.get(sx, 0.0, sz);
    const erosion = this.erosionNoise.get(sx, 0.0, sz);
    const ridge = this.ridgeNoise.get(sx, 0.0, sz);

    return { temp, humid, cont, erosion, ridge };
  }

  getBiomeAt(blockX: number, blockZ: number, blockY = 64): string {
    const c = this.sampleClimate(blockX, blockZ);

    const qt = c.temp * 10000;
    const qh = c.humid * 10000;
    const qc = c.cont * 10000;
    const qe = c.erosion * 10000;
    // Surface depth is 0
    const qd = blockY > 55 ? 0 : 10000;
    const qw = c.ridge * 10000;

    let bestBiome = 'minecraft:plains';
    let bestFit = Infinity;

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const dt = qt > p.t[1] ? qt - p.t[1] : (qt < p.t[0] ? p.t[0] - qt : 0);
      const dh = qh > p.h[1] ? qh - p.h[1] : (qh < p.h[0] ? p.h[0] - qh : 0);
      const dc = qc > p.c[1] ? qc - p.c[1] : (qc < p.c[0] ? p.c[0] - qc : 0);
      const de = qe > p.e[1] ? qe - p.e[1] : (qe < p.e[0] ? p.e[0] - qe : 0);
      const dd = qd > p.d[1] ? qd - p.d[1] : (qd < p.d[0] ? p.d[0] - qd : 0);
      const dw = qw > p.w[1] ? qw - p.w[1] : (qw < p.w[0] ? p.w[0] - qw : 0);

      const fit = dt * dt + dh * dh + dc * dc + de * de + dd * dd + dw * dw + p.offset;
      if (fit < bestFit) {
        bestFit = fit;
        bestBiome = p.biome;
        if (fit === 0) break;
      }
    }

    return bestBiome;
  }

  getTerrainHeight(blockX: number, blockZ: number): number {
    const c = this.sampleClimate(blockX, blockZ);
    const splineVal = evalCubicSpline(offsetSplineRoot, c);
    const totalOffset = -0.50375 + splineVal;
    const baseHeight = 128 + 128 * totalOffset;
    return Math.max(1, Math.min(256, Math.round(baseHeight)));
  }

  // Official Minecraft NoiseSpawnFinder algorithm
  private computeSpawnCoords(): { x: number; z: number } {
    let bestX = 0;
    let bestZ = 0;
    let bestFitness = this.evalSpawnFitness(0, 0);

    // Radial pass 1: radius up to 2048, step 512
    const pass1 = this.radialSearch(bestX, bestZ, 2048, 512, bestFitness);
    bestX = pass1.x;
    bestZ = pass1.z;
    bestFitness = this.evalSpawnFitness(bestX, bestZ);

    // Radial pass 2: radius up to 512, step 32
    const pass2 = this.radialSearch(bestX, bestZ, 512, 32, bestFitness);
    return { x: pass2.x, z: pass2.z };
  }

  private radialSearch(
    originX: number,
    originZ: number,
    maxRadius: number,
    step: number,
    curBestFit: number
  ): { x: number; z: number } {
    let angle = 0;
    let radius = step;
    let bestX = originX;
    let bestZ = originZ;
    let bestFit = curBestFit;

    while (radius <= maxRadius) {
      const curX = originX + Math.floor(Math.sin(angle) * radius);
      const curZ = originZ + Math.floor(Math.cos(angle) * radius);
      const fit = this.evalSpawnFitness(curX, curZ);
      if (fit < bestFit) {
        bestFit = fit;
        bestX = curX;
        bestZ = curZ;
      }
      angle += step / radius;
      if (angle > 6.283185307179586) {
        angle = 0;
        radius += step;
      }
    }
    return { x: bestX, z: bestZ };
  }

  private evalSpawnFitness(x: number, z: number): number {
    const c = this.sampleClimate(x, z);

    // Spawn target points from Minecraft 26.3 overworld.json:
    // Continents in [-0.11, 1.0], Ridges in [-1.0, -0.16] OR [0.16, 1.0]
    const fitC = this.paramDist(c.cont, -0.11, 1.0);
    const fitR1 = this.paramDist(c.ridge, -1.0, -0.16);
    const fitR2 = this.paramDist(c.ridge, 0.16, 1.0);
    const fitR = Math.min(fitR1, fitR2);

    const fitness = fitC * fitC + fitR * fitR;
    const distSq = x * x + z * z;
    return fitness * 2048 * 2048 + distSq;
  }

  private paramDist(val: number, min: number, max: number): number {
    const qVal = val * 10000;
    const qMin = min * 10000;
    const qMax = max * 10000;
    if (qVal > qMax) return qVal - qMax;
    if (qVal < qMin) return qMin - qVal;
    return 0;
  }
}
