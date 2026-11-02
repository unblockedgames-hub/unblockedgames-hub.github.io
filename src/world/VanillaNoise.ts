import * as deepslate from 'deepslate';
import worldgenData from './worldgen_data.json';
import biomePointsRaw from './overworld_biome_points.json';

// Initialize deepslate WorldgenRegistries once
for (const [key, val] of Object.entries((worldgenData as any).noises)) {
  const id = deepslate.Identifier.create(key);
  deepslate.WorldgenRegistries.NOISE.register(id, deepslate.WorldgenRegistries.NOISE.parser(val));
}

for (const [key, val] of Object.entries((worldgenData as any).densityFunctions)) {
  const id = deepslate.Identifier.create(key);
  deepslate.WorldgenRegistries.DENSITY_FUNCTION.register(id, deepslate.WorldgenRegistries.DENSITY_FUNCTION.parser(val));
}

for (const [key, val] of Object.entries((worldgenData as any).materialConditions || {})) {
  const id = deepslate.Identifier.create(key);
  deepslate.WorldgenRegistries.MATERIAL_CONDITION.register(id, deepslate.WorldgenRegistries.MATERIAL_CONDITION.parser(val));
}

for (const [key, val] of Object.entries((worldgenData as any).materialRules || {})) {
  const id = deepslate.Identifier.create(key);
  deepslate.WorldgenRegistries.MATERIAL_RULE.register(id, deepslate.WorldgenRegistries.MATERIAL_RULE.parser(val));
}

for (const [key, val] of Object.entries((worldgenData as any).biomes || {})) {
  const id = deepslate.Identifier.create(key);
  deepslate.WorldgenRegistries.BIOME.register(id, val);
}

const overworldSettings = deepslate.NoiseGeneratorSettings.fromJson((worldgenData as any).overworldSettings);

const biomeEntries = biomePointsRaw as any[];
const entries: [deepslate.Climate.ParamPoint, () => string][] = biomeEntries.map(e => [
  new deepslate.Climate.ParamPoint(
    new deepslate.Climate.Param(e.t[0] / 10000, e.t[1] / 10000),
    new deepslate.Climate.Param(e.h[0] / 10000, e.h[1] / 10000),
    new deepslate.Climate.Param(e.c[0] / 10000, e.c[1] / 10000),
    new deepslate.Climate.Param(e.e[0] / 10000, e.e[1] / 10000),
    new deepslate.Climate.Param(e.d[0] / 10000, e.d[1] / 10000),
    new deepslate.Climate.Param(e.w[0] / 10000, e.w[1] / 10000),
    e.offset / 10000
  ),
  () => e.biome
]);

const sharedBiomeSource = new deepslate.MultiNoiseBiomeSource(entries);
const sharedGenerator = new deepslate.NoiseChunkGenerator(sharedBiomeSource, overworldSettings);

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
}

export class PositionalRandomFactory {
  seedLo: bigint;
  seedHi: bigint;

  constructor(seedLo: bigint, seedHi: bigint) {
    this.seedLo = seedLo & MASK64;
    this.seedHi = seedHi & MASK64;
  }

  fromHashOf(_str: string): Xoroshiro128PlusPlus {
    return new Xoroshiro128PlusPlus(this.seedLo, this.seedHi);
  }
}

export class VanillaNormalNoise {
  get(_x: number, _y: number, _z: number): number {
    return 0;
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
  randomState!: deepslate.RandomState;
  biomeSource = sharedBiomeSource;
  generator = sharedGenerator;
  private spawnCoords: { x: number; z: number } = { x: 0, z: 0 };

  constructor(seedInput: string | number | bigint = 0) {
    this.setSeed(seedInput);
  }

  setSeed(seedInput: string | number | bigint) {
    let s = 0n;
    if (typeof seedInput === 'bigint') {
      s = seedInput;
    } else if (typeof seedInput === 'number' && !isNaN(seedInput)) {
      s = BigInt(Math.floor(seedInput));
    } else {
      const str = String(seedInput).trim();
      const asNum = Number(str);
      if (str && !isNaN(asNum) && Number.isInteger(asNum)) {
        s = BigInt(asNum);
      } else if (str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
          h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
        }
        s = BigInt(h);
      }
    }

    this.seed = s;
    this.randomState = new deepslate.RandomState(overworldSettings, s);
    this.spawnCoords = this.computeSpawnCoords();
  }

  getSpawnCoords(): { x: number; z: number } {
    return this.spawnCoords;
  }

  getBiomeAt(blockX: number, blockZ: number, blockY = 64): string {
    return this.biomeSource.getBiome(blockX >> 2, blockY >> 2, blockZ >> 2, this.randomState.sampler);
  }

  sampleClimate(blockX: number, blockZ: number): {
    temp: number;
    humid: number;
    cont: number;
    erosion: number;
    ridge: number;
  } {
    const c = this.randomState.sampler.sample(blockX >> 2, 0, blockZ >> 2);
    return {
      temp: c.temperature,
      humid: c.humidity,
      cont: c.continentalness,
      erosion: c.erosion,
      ridge: c.weirdness
    };
  }

  buildTerrainAndSurface(
    cx: number,
    cz: number,
    setBlock: (lx: number, y: number, lz: number, numId: number) => void,
    setBiome: (lx: number, lz: number, biomeId: string) => void,
    getBlockId: (name: string) => number
  ): Int32Array {
    const dChunk = new deepslate.Chunk(-64, 384, [cx, cz]);
    this.generator.buildTerrain(this.randomState, dChunk);

    const heightMap = new Int32Array(256);
    const minX = cx * 16;
    const minZ = cz * 16;
    const bedrockId = getBlockId('bedrock');

    for (let lz = 0; lz < 16; lz++) {
      const wz = minZ + lz;
      for (let lx = 0; lx < 16; lx++) {
        const wx = minX + lx;
        let topY = 0;

        for (let y = 0; y < 128; y++) {
          const bs = dChunk.getBlockState(deepslate.BlockPos.create(wx, y, wz));
          if (bs) {
            const pathName = bs.getName().path;
            if (pathName !== 'air') {
              const numId = getBlockId(pathName);
              if (numId) {
                setBlock(lx, y, lz, numId);
                topY = y;
              }
            }
          }
        }

        // Bedrock floor at Y=0 (solid) and Y=1..4 (dithered)
        setBlock(lx, 0, lz, bedrockId);
        const dither = (this.hash2D(wx, wz, 999) * 4) | 0;
        for (let y = 1; y <= dither; y++) {
          setBlock(lx, y, lz, bedrockId);
        }

        heightMap[lz * 16 + lx] = Math.max(1, topY);

        const biome = this.generator.computeBiome(
          this.randomState,
          wx >> 2,
          Math.max(16, topY) >> 2,
          wz >> 2
        );
        setBiome(lx, lz, biome.toString());
      }
    }

    return heightMap;
  }

  private hash2D(x: number, z: number, seed = 0): number {
    let n = Math.imul(x, 374761393) + Math.imul(z, 668265263) + Math.imul(seed, 1442695041);
    n = (n ^ (n >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  getTerrainHeight(blockX: number, blockZ: number): number {
    return this.generator.getBaseHeight(blockX, blockZ, 'WORLD_SURFACE_WG', this.randomState);
  }

  getChunkHeightMap(cx: number, cz: number): Int32Array {
    const heights = new Int32Array(256);
    const cornerGrid: number[][] = [];
    const minX = cx * 16;
    const minZ = cz * 16;

    // Sample 5x5 grid (every 4 blocks)
    for (let gz = 0; gz <= 4; gz++) {
      const row: number[] = [];
      for (let gx = 0; gx <= 4; gx++) {
        row.push(this.generator.getBaseHeight(minX + gx * 4, minZ + gz * 4, 'WORLD_SURFACE_WG', this.randomState));
      }
      cornerGrid.push(row);
    }

    // Bilinear interpolate into 16x16
    for (let lz = 0; lz < 16; lz++) {
      const cellZ = lz >> 2;
      const fz = (lz & 3) / 4.0;
      for (let lx = 0; lx < 16; lx++) {
        const cellX = lx >> 2;
        const fx = (lx & 3) / 4.0;

        const h00 = cornerGrid[cellZ][cellX];
        const h10 = cornerGrid[cellZ][cellX + 1];
        const h01 = cornerGrid[cellZ + 1][cellX];
        const h11 = cornerGrid[cellZ + 1][cellX + 1];

        const topH = h00 + fx * (h10 - h00);
        const botH = h01 + fx * (h11 - h01);
        const h = Math.round(topH + fz * (botH - topH));
        heights[lz * 16 + lx] = Math.max(1, Math.min(256, h));
      }
    }
    return heights;
  }

  private computeSpawnCoords(): { x: number; z: number } {
    const sampler = this.randomState.sampler;
    const evalFit = (x: number, z: number): number => {
      const c = sampler.sample(x >> 2, 0, z >> 2);
      const cont = c.continentalness;
      const ridge = c.weirdness;

      const pDist = (val: number, min: number, max: number): number => {
        if (val > max) return (val - max) * 10000;
        if (val < min) return (min - val) * 10000;
        return 0;
      };

      const dC = pDist(cont, -0.11, 1.0);
      const dR1 = pDist(ridge, -1.0, -0.16);
      const dR2 = pDist(ridge, 0.16, 1.0);
      const dR = Math.min(dR1, dR2);

      const fitness = dC * dC + dR * dR;
      const distSq = x * x + z * z;
      return fitness + distSq;
    };

    const radial = (originX: number, originZ: number, maxR: number, step: number, curBestFit: number) => {
      let angle = 0;
      let r = step;
      let bestX = originX;
      let bestZ = originZ;
      let bestFit = curBestFit;

      while (r <= maxR) {
        const curX = originX + Math.round(Math.sin(angle) * r);
        const curZ = originZ + Math.round(Math.cos(angle) * r);
        const fit = evalFit(curX, curZ);
        if (fit < bestFit) {
          bestFit = fit;
          bestX = curX;
          bestZ = curZ;
        }
        angle += step / r;
        if (angle > Math.PI * 2) {
          angle = 0;
          r += step;
        }
      }
      return { x: bestX, z: bestZ, fit: bestFit };
    };

    let bestX = 0;
    let bestZ = 0;
    let bestFit = evalFit(0, 0);

    const p1 = radial(bestX, bestZ, 2048, 512, bestFit);
    bestX = p1.x;
    bestZ = p1.z;
    bestFit = p1.fit;

    const p2 = radial(bestX, bestZ, 512, 32, bestFit);
    bestX = p2.x;
    bestZ = p2.z;

    // Verify safe surface height (not submerged in ocean)
    for (let r = 0; r <= 32; r += 4) {
      for (const [dx, dz] of [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]]) {
        const sx = bestX + dx;
        const sz = bestZ + dz;
        const h = this.generator.getBaseHeight(sx, sz, 'WORLD_SURFACE_WG', this.randomState);
        if (h >= 63) {
          return { x: sx, z: sz };
        }
      }
    }
    return { x: bestX, z: bestZ };
  }
}
