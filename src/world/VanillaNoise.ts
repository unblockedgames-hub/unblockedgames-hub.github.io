import biomePointsRaw from './overworld_biome_points.json';

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

// Simple fast pure-JS MD5 implementation for standard strings
function md5(input: string): Uint8Array {
  // Convert string to UTF-8
  const utf8: number[] = [];
  for (let i = 0; i < input.length; i++) {
    let c = input.charCodeAt(i);
    if (c < 128) utf8.push(c);
    else if (c < 2048) utf8.push((c >> 6) | 192, (c & 63) | 128);
    else utf8.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
  }

  const origLen = utf8.length;
  utf8.push(0x80);
  while ((utf8.length % 64) !== 56) utf8.push(0);
  const bitLen = origLen * 8;
  for (let i = 0; i < 8; i++) {
    utf8.push((bitLen >>> (i * 8)) & 0xff);
  }

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const K = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ];

  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];

  for (let block = 0; block < utf8.length; block += 64) {
    const w: number[] = new Array(16);
    for (let i = 0; i < 16; i++) {
      const idx = block + i * 4;
      w[i] = utf8[idx] | (utf8[idx + 1] << 8) | (utf8[idx + 2] << 16) | (utf8[idx + 3] << 24);
    }

    let A = a, B = b, C = c, D = d;

    for (let i = 0; i < 64; i++) {
      let f: number, g: number;
      if (i < 16) {
        f = (B & C) | ((~B) & D);
        g = i;
      } else if (i < 32) {
        f = (D & B) | ((~D) & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        f = C ^ (B | (~D));
        g = (7 * i) % 16;
      }

      const temp = D;
      D = C;
      C = B;
      const sum = (A + f + K[i] + w[g]) | 0;
      const rotated = (sum << S[i]) | (sum >>> (32 - S[i]));
      B = (B + rotated) | 0;
      A = temp;
    }

    a = (a + A) | 0;
    b = (b + B) | 0;
    c = (c + C) | 0;
    d = (d + D) | 0;
  }

  const out = new Uint8Array(16);
  const words = [a, b, c, d];
  for (let i = 0; i < 4; i++) {
    out[i * 4] = words[i] & 0xff;
    out[i * 4 + 1] = (words[i] >>> 8) & 0xff;
    out[i * 4 + 2] = (words[i] >>> 16) & 0xff;
    out[i * 4 + 3] = (words[i] >>> 24) & 0xff;
  }
  return out;
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

  nextBits(bits: number): number {
    const l = this.nextLong() & MASK64;
    return Number(l >> BigInt(64 - bits));
  }

  nextInt(bound: number): number {
    let r = this.nextBits(31);
    let m = bound - 1;
    if ((bound & m) === 0) {
      r = Number((BigInt(bound) * BigInt(r)) >> 31n);
    } else {
      for (let u = r; u - (r = u % bound) + m < 0; u = this.nextBits(31));
    }
    return r;
  }

  nextDouble(): number {
    const l = this.nextBits(53);
    return l * 1.1102230246251565e-16;
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
      const j = rand.nextInt(256 - i);
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

    const fx = rx - ix;
    const fy = ry - iy;
    const fz = rz - iz;

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

interface OctaveLayer {
  frequency: number;
  amplitude: number;
  first: PerlinNoise;
  second: PerlinNoise;
}

export class VanillaNormalNoise {
  layers: OctaveLayer[] = [];
  normalizationFactor: number;

  constructor(
    factory: PositionalRandomFactory,
    noiseName: string,
    baseOctave: number,
    amplitudes: number[]
  ) {
    const rand = factory.fromHashOf(noiseName);
    const f1 = new PositionalRandomFactory(rand.nextLong(), rand.nextLong());
    const f2 = new PositionalRandomFactory(rand.nextLong(), rand.nextLong());

    let freq = Math.pow(2.0, baseOctave);
    let amp = 1.0;
    let sumAmps = 0;

    for (let i = 0; i < amplitudes.length; i++) {
      const mod = amplitudes[i];
      if (mod !== 0) {
        const octaveSeed = String(baseOctave + i);
        const p1 = new PerlinNoise(f1.fromHashOf(octaveSeed));
        const p2 = new PerlinNoise(f2.fromHashOf(octaveSeed));
        const effAmp = amp * mod;
        this.layers.push({
          frequency: freq,
          amplitude: effAmp,
          first: p1,
          second: p2
        });
        sumAmps += Math.abs(effAmp);
      }
      freq *= 2.0;
      amp *= 0.5;
    }

    // NormalNoise deviation normalization:
    this.normalizationFactor = (1.0 / 6.0) / Math.sqrt(sumAmps > 0 ? sumAmps : 1.0);
  }

  get(x: number, y: number, z: number): number {
    let sum = 0;
    const factor = 337.0 / 331.0;
    for (let i = 0; i < this.layers.length; i++) {
      const l = this.layers[i];
      const v1 = l.first.get(x * l.frequency, y * l.frequency, z * l.frequency);
      const v2 = l.second.get(x * l.frequency * factor, y * l.frequency * factor, z * l.frequency * factor);
      sum += (v1 + v2) * l.amplitude;
    }
    return sum * this.normalizationFactor;
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
    const qx = (blockX >> 2) << 2;
    const qz = (blockZ >> 2) << 2;

    const shiftX = this.offsetNoise.get(qx * 0.25, 0.0, qz * 0.25) * 4.0;
    const shiftZ = this.offsetNoise.get(qz * 0.25, 0.0, qx * 0.25) * 4.0;

    const sx = (qx + shiftX) * 0.25;
    const sz = (qz + shiftZ) * 0.25;

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

      const fit = dt * dt + dh * dh + dc * dc + de * de + dd * dd + dw * dw + p.offset * p.offset;
      if (fit < bestFit) {
        bestFit = fit;
        bestBiome = p.biome;
        if (fit === 0) break;
      }
    }

    return bestBiome;
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
