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

  private hash3D(x: number, y: number, z: number, seed = 0): number {
    let n = Math.imul(x, 374761393) + Math.imul(y, 1013904223) + Math.imul(z, 668265263) + Math.imul(seed, 1442695041);
    n = (n ^ (n >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  private smoothNoise3D(x: number, y: number, z: number, scale: number, seed = 0): number {
    const sx = x / scale;
    const sy = y / scale;
    const sz = z / scale;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    const iz = Math.floor(sz);
    const fx = sx - ix;
    const fy = sy - iy;
    const fz = sz - iz;
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);
    const w = fz * fz * (3 - 2 * fz);

    const c000 = this.hash3D(ix, iy, iz, seed);
    const c100 = this.hash3D(ix + 1, iy, iz, seed);
    const c010 = this.hash3D(ix, iy + 1, iz, seed);
    const c110 = this.hash3D(ix + 1, iy + 1, iz, seed);
    const c001 = this.hash3D(ix, iy, iz + 1, seed);
    const c101 = this.hash3D(ix + 1, iy, iz + 1, seed);
    const c011 = this.hash3D(ix, iy + 1, iz + 1, seed);
    const c111 = this.hash3D(ix + 1, iy + 1, iz + 1, seed);

    const x00 = c000 * (1 - u) + c100 * u;
    const x10 = c010 * (1 - u) + c110 * u;
    const x01 = c001 * (1 - u) + c101 * u;
    const x11 = c011 * (1 - u) + c111 * u;

    const y0 = x00 * (1 - v) + x10 * v;
    const y1 = x01 * (1 - v) + x11 * v;

    return y0 * (1 - w) + y1 * w;
  }

  private static heightCache = new Map<number, number>();

  private getSampledHeight(wx: number, wz: number): number {
    const key = ((wx & 0xffff) << 16) | (wz & 0xffff);
    let h = VanillaClimate.heightCache.get(key);
    if (h === undefined) {
      // Sample OCEAN_FLOOR_WG to obtain genuine solid terrain and ocean bed height
      // (WORLD_SURFACE_WG returns 63 over water because it includes fluids).
      h = this.generator.getBaseHeight(wx, wz, 'OCEAN_FLOOR_WG', this.randomState);
      if (VanillaClimate.heightCache.size > 8192) {
        VanillaClimate.heightCache.clear();
      }
      VanillaClimate.heightCache.set(key, h);
    }
    return h;
  }

  buildTerrainAndSurface(
    cx: number,
    cz: number,
    setBlock: (lx: number, y: number, lz: number, numId: number) => void,
    setBiome: (lx: number, lz: number, biomeId: string) => void,
    getBlockId: (name: string) => number
  ): Int32Array {
    const heightMap = this.getChunkHeightMap(cx, cz);
    const minX = cx * 16;
    const minZ = cz * 16;

    const bedrockId = getBlockId('bedrock');
    const deepslateId = getBlockId('deepslate') || getBlockId('stone');
    const stoneId = getBlockId('stone');
    const dirtId = getBlockId('dirt');
    const grassId = getBlockId('grass_block');
    const sandId = getBlockId('sand');
    const sandstoneId = getBlockId('sandstone') || stoneId;
    const redSandId = getBlockId('red_sand') || sandId;
    const terracottaId = getBlockId('terracotta') || stoneId;
    const waterId = getBlockId('water');
    const lavaId = getBlockId('lava');
    const gravelId = getBlockId('gravel') || dirtId;
    const snowBlockId = getBlockId('snow_block') || stoneId;
    const iceId = getBlockId('ice') || waterId;
    const clayId = getBlockId('clay') || gravelId;

    const SEA_LEVEL = 62;
    const seedOffset = Number(this.seed & 0x7fffffffn);

    // Pre-sample 4x4 quartet biomes for the entire chunk (authentic quarter-resolution sampler)
    const quartetBiomes: string[] = new Array(16);
    for (let qz = 0; qz < 4; qz++) {
      for (let qx = 0; qx < 4; qx++) {
        quartetBiomes[qz * 4 + qx] = this.biomeSource.getBiome(
          (minX >> 2) + qx,
          16,
          (minZ >> 2) + qz,
          this.randomState.sampler
        );
      }
    }

    for (let lz = 0; lz < 16; lz++) {
      const wz = minZ + lz;
      const qz = lz >> 2;
      for (let lx = 0; lx < 16; lx++) {
        const wx = minX + lx;
        const qx = lx >> 2;
        const rawH = heightMap[lz * 16 + lx];
        // In Minecraft/deepslate, getBaseHeight returns blockY + 1 (the first air/fluid space).
        // The top solid block of the terrain/seabed is therefore rawH - 1.
        const H = Math.max(1, Math.min(127, rawH - 1));
        heightMap[lz * 16 + lx] = H;

        const biome = quartetBiomes[qz * 4 + qx];
        setBiome(lx, lz, biome);

        const isDesert = biome.includes('desert') || biome.includes('beach');
        const isBadlands = biome.includes('badlands');
        const isSnowy = biome.includes('snowy') || biome.includes('ice') || biome.includes('frozen');
        const isOcean = biome.includes('ocean');
        const isRiver = biome.includes('river');
        const isWarmOcean = biome.includes('warm_ocean');
        const isFrozen = biome.includes('frozen') || biome.includes('ice');

        // Solid bedrock floor at Y=0, dithered at Y=1..4
        setBlock(lx, 0, lz, bedrockId);
        const bedDither = (this.hash2D(wx, wz, 999) * 4) | 0;
        for (let y = 1; y <= bedDither; y++) {
          setBlock(lx, y, lz, bedrockId);
        }

        // Fill rock column up to H with 1.18+ cheese & noodle caves
        const deepslateThreshold = 16 - ((this.hash2D(wx, wz, 99) * 6) | 0);
        for (let y = 1; y <= H; y++) {
          const baseRock = y <= deepslateThreshold ? deepslateId : stoneId;

          // Surface & subsurface block palette
          if (y === H) {
            if (H < SEA_LEVEL) {
              if (isWarmOcean || isDesert) {
                setBlock(lx, y, lz, sandId);
              } else if (isOcean || isRiver) {
                const isClay = this.hash2D(wx, wz, 123) < 0.12;
                setBlock(lx, y, lz, isClay ? clayId : gravelId);
              } else {
                setBlock(lx, y, lz, dirtId);
              }
            } else if (isDesert) {
              setBlock(lx, y, lz, sandId);
            } else if (isBadlands) {
              setBlock(lx, y, lz, redSandId);
            } else if (isSnowy && H > 90) {
              setBlock(lx, y, lz, snowBlockId);
            } else {
              setBlock(lx, y, lz, grassId);
            }
          } else if (y >= H - 3) {
            if (H < SEA_LEVEL) {
              if (isWarmOcean || isDesert) {
                setBlock(lx, y, lz, sandstoneId);
              } else {
                setBlock(lx, y, lz, dirtId);
              }
            } else if (isDesert) {
              setBlock(lx, y, lz, sandstoneId);
            } else if (isBadlands) {
              setBlock(lx, y, lz, terracottaId);
            } else {
              setBlock(lx, y, lz, dirtId);
            }
          } else {
            // Underground rock zone: sample caves efficiently only where caverns can exist
            if (y >= 6 && y <= H - 4) {
              const cheese = this.smoothNoise3D(wx, y * 1.15, wz, 34, seedOffset + 101);
              const n1 = this.smoothNoise3D(wx, y * 0.95, wz, 22, seedOffset + 202) * 2.0 - 1.0;
              const n2 = this.smoothNoise3D(wx, y * 0.95, wz, 22, seedOffset + 303) * 2.0 - 1.0;
              const noodleDistSq = n1 * n1 + n2 * n2;

              if (cheese > 0.46 || noodleDistSq < 0.038) {
                if (y <= 10) {
                  setBlock(lx, y, lz, lavaId);
                } else if (y <= 24 && this.smoothNoise3D(wx, 20, wz, 40, seedOffset + 404) > 0.58) {
                  setBlock(lx, y, lz, waterId);
                }
                continue;
              }
            }
            setBlock(lx, y, lz, baseRock);
          }
        }

        // Fill sea level water/ice if seabed is below SEA_LEVEL (Y=62)
        if (H < SEA_LEVEL) {
          if (isFrozen) {
            setBlock(lx, SEA_LEVEL, lz, iceId);
            for (let y = H + 1; y < SEA_LEVEL; y++) {
              setBlock(lx, y, lz, waterId);
            }
          } else {
            for (let y = H + 1; y <= SEA_LEVEL; y++) {
              setBlock(lx, y, lz, waterId);
            }
          }
        }
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
    return Math.max(1, this.getSampledHeight(blockX, blockZ) - 1);
  }

  getChunkHeightMap(cx: number, cz: number): Int32Array {
    const heights = new Int32Array(256);
    const minX = cx * 16;
    const minZ = cz * 16;

    // Sample 3x3 grid (every 8 blocks: 0, 8, 16) with cached boundary reuse
    const cornerGrid: number[][] = [];
    for (let gz = 0; gz <= 2; gz++) {
      const row: number[] = [];
      const wz = minZ + gz * 8;
      for (let gx = 0; gx <= 2; gx++) {
        row.push(this.getSampledHeight(minX + gx * 8, wz));
      }
      cornerGrid.push(row);
    }

    // Fast bilinear interpolation across the 2x2 cells of 8x8 blocks
    for (let lz = 0; lz < 16; lz++) {
      const cellZ = lz >> 3;
      const fz = (lz & 7) / 8.0;
      for (let lx = 0; lx < 16; lx++) {
        const cellX = lx >> 3;
        const fx = (lx & 7) / 8.0;

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
        const h = this.generator.getBaseHeight(sx, sz, 'OCEAN_FLOOR_WG', this.randomState);
        if (h >= 64) { // Terrain solid height is h - 1 >= 63, safely above ocean water (Y=62)
          return { x: sx, z: sz };
        }
      }
    }
    return { x: bestX, z: bestZ };
  }
}
