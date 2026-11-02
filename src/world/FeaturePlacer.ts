import * as deepslate from 'deepslate';
import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT } from './Chunk';
import { Registries } from '../core/Registries';
import { WorldGen26_3 } from './WorldGen26_3';

function trapezoid(random: { nextInt(n: number): number }, min: number, max: number): number {
  const range = max - min;
  const half = Math.floor(range / 2);
  return min + random.nextInt(half + 1) + random.nextInt(half + 1);
}

export class FeaturePlacer {
  static SEA_LEVEL = 63;

  /**
   * Places authentic Minecraft 26.3 features per chunk according to official biome definitions.
   * Tree canopies are checked across 3x3 neighboring chunks to ensure seamless boundaries without clipping.
   */
  static placeFeatures(
    chunk: Chunk,
    cx: number,
    cz: number,
    heightMap: Int32Array,
    worldSeed: number,
    hasStructure = false
  ) {
    const r = deepslate.XoroshiroRandom.create(BigInt(worldSeed));
    const pr = r.forkPositional();

    const shortGrassId = Registries.getBlock('short_grass')?.numId || 0;
    const tallGrassId = Registries.getBlock('tall_grass')?.numId || 0;
    const dandelionId = Registries.getBlock('dandelion')?.numId || 0;
    const poppyId = Registries.getBlock('poppy')?.numId || 0;
    const sunflowerId = Registries.getBlock('sunflower')?.numId || 0;
    const leafLitterId = Registries.getBlock('leaf_litter')?.numId || 0;
    const brownMushroomId = Registries.getBlock('brown_mushroom')?.numId || 0;
    const cactusId = Registries.getBlock('cactus')?.numId || 0;
    const deadBushId = Registries.getBlock('dead_bush')?.numId || 0;
    const pinkPetalsId = Registries.getBlock('pink_petals')?.numId || 0;
    const lilyPadId = Registries.getBlock('lily_pad')?.numId || 0;
    const grassId = Registries.getBlock('grass_block')?.numId || 0;
    const podzolId = Registries.getBlock('podzol')?.numId || 0;
    const sandId = Registries.getBlock('sand')?.numId || 0;
    const waterId = Registries.getBlock('water')?.numId || 0;

    // World block setter restricted to the current chunk
    const setBlockInChunk = (wx: number, y: number, wz: number, id: number) => {
      if (y < 0 || y >= CHUNK_HEIGHT) return;
      const lx = wx - cx * CHUNK_SIZE;
      const lz = wz - cz * CHUNK_SIZE;
      if (lx >= 0 && lx < CHUNK_SIZE && lz >= 0 && lz < CHUNK_SIZE) {
        chunk.setBlock(lx, y, lz, id);
      }
    };

    const getSurfaceHeight = (wx: number, wz: number): number => {
      const lx = wx - cx * CHUNK_SIZE;
      const lz = wz - cz * CHUNK_SIZE;
      if (lx >= 0 && lx < CHUNK_SIZE && lz >= 0 && lz < CHUNK_SIZE) {
        return heightMap[lz * CHUNK_SIZE + lx];
      }
      return WorldGen26_3.vanillaClimate.generator.getBaseHeight(
        wx,
        wz,
        'WORLD_SURFACE_WG',
        WorldGen26_3.vanillaClimate.randomState
      );
    };

    // --- 1. TREE GENERATION (3x3 neighborhood for seamless border canopies) ---
    for (let dcx = -1; dcx <= 1; dcx++) {
      for (let dcz = -1; dcz <= 1; dcz++) {
        const ncx = cx + dcx;
        const ncz = cz + dcz;
        const chunkRng = pr.at(ncx, 0, ncz);

        // Sample tree count and positions for chunk (ncx, ncz)
        const sampleTree = () => {
          const lx = chunkRng.nextInt(16);
          const lz = chunkRng.nextInt(16);
          const twx = ncx * CHUNK_SIZE + lx;
          const twz = ncz * CHUNK_SIZE + lz;

          // Quick distance check: skip if tree canopy cannot reach current chunk
          if (
            twx < cx * CHUNK_SIZE - 4 ||
            twx > (cx + 1) * CHUNK_SIZE + 4 ||
            twz < cz * CHUNK_SIZE - 4 ||
            twz > (cz + 1) * CHUNK_SIZE + 4
          ) {
            return;
          }

          if (hasStructure && twx >= cx * CHUNK_SIZE && twx < (cx + 1) * CHUNK_SIZE &&
              twz >= cz * CHUNK_SIZE && twz < (cz + 1) * CHUNK_SIZE) {
            return;
          }

          const biomeId = WorldGen26_3.vanillaClimate.getBiomeAt(twx, twz);
          const h = getSurfaceHeight(twx, twz);
          if (h <= this.SEA_LEVEL) return;

          if (biomeId === 'minecraft:snowy_plains') {
            // Authentic Minecraft trees_snowy: count roll with high chance
            const roll = chunkRng.nextInt(10);
            if (roll < 8) {
              const trunkH = 5 + chunkRng.nextInt(3) + chunkRng.nextInt(2);
              const folRadius = 2 + chunkRng.nextInt(2);
              this.placeSpruceTree(setBlockInChunk, twx, h + 1, twz, trunkH, folRadius);
            }
          } else if (biomeId.includes('taiga') || biomeId === 'minecraft:grove') {
            const trunkH = 6 + chunkRng.nextInt(4);
            const folRadius = 2 + chunkRng.nextInt(2);
            this.placeSpruceTree(setBlockInChunk, twx, h + 1, twz, trunkH, folRadius);
          } else if (biomeId === 'minecraft:dappled_forest' || biomeId === 'minecraft:poplar_grove') {
            const leafRoll = chunkRng.nextFloat();
            const variant: 'orange_poplar_leaves' | 'yellow_poplar_leaves' | 'red_poplar_leaves' =
              leafRoll < 0.4
                ? 'orange_poplar_leaves'
                : leafRoll < 0.72
                ? 'yellow_poplar_leaves'
                : 'red_poplar_leaves';
            this.placePoplarTree(setBlockInChunk, twx, h + 1, twz, variant, leafRoll);
          } else if (biomeId === 'minecraft:forest') {
            if (chunkRng.nextFloat() < 0.25) {
              this.placeClassicTree(setBlockInChunk, twx, h + 1, twz, 'birch_log', 'birch_leaves', 6);
            } else {
              this.placeClassicTree(setBlockInChunk, twx, h + 1, twz, 'oak_log', 'oak_leaves', 5);
            }
          } else if (biomeId === 'minecraft:birch_forest' || biomeId === 'minecraft:old_growth_birch_forest') {
            this.placeClassicTree(setBlockInChunk, twx, h + 1, twz, 'birch_log', 'birch_leaves', 6 + chunkRng.nextInt(3));
          } else if (biomeId === 'minecraft:cherry_grove') {
            this.placeClassicTree(setBlockInChunk, twx, h + 1, twz, 'cherry_log', 'cherry_leaves', 6);
          } else if (biomeId === 'minecraft:dark_forest') {
            this.placeDarkOakTree(setBlockInChunk, twx, h + 1, twz);
          } else if (biomeId === 'minecraft:jungle' || biomeId === 'minecraft:sparse_jungle') {
            this.placeJungleTree(setBlockInChunk, twx, h + 1, twz, chunkRng.nextFloat());
          } else if (biomeId === 'minecraft:savanna') {
            this.placeAcaciaTree(setBlockInChunk, twx, h + 1, twz);
          } else if (biomeId === 'minecraft:plains' || biomeId === 'minecraft:sunflower_plains') {
            if (chunkRng.nextInt(10) < 3) {
              this.placeClassicTree(setBlockInChunk, twx, h + 1, twz, 'oak_log', 'oak_leaves', 5);
            }
          }
        };

        // Determine number of tree attempts for this chunk
        const treeRoll = chunkRng.nextInt(10);
        const centerBiome = WorldGen26_3.vanillaClimate.getBiomeAt(ncx * CHUNK_SIZE + 8, ncz * CHUNK_SIZE + 8);

        let treeAttempts = 0;
        if (centerBiome.includes('forest') || centerBiome.includes('taiga') || centerBiome.includes('grove')) {
          treeAttempts = 3 + (treeRoll % 3);
        } else if (centerBiome === 'minecraft:dappled_forest' || centerBiome === 'minecraft:poplar_grove') {
          treeAttempts = 3 + (treeRoll % 3);
        } else if (centerBiome.includes('jungle')) {
          treeAttempts = 4 + (treeRoll % 3);
        } else if (centerBiome === 'minecraft:snowy_plains') {
          treeAttempts = 1;
        } else if (centerBiome === 'minecraft:plains' || centerBiome === 'minecraft:sunflower_plains') {
          treeAttempts = treeRoll < 2 ? 1 : 0;
        } else if (centerBiome === 'minecraft:savanna') {
          treeAttempts = treeRoll < 4 ? 1 : 0;
        }

        for (let i = 0; i < treeAttempts; i++) {
          sampleTree();
        }
      }
    }

    // --- 2. FLORA & SURFACE COVER DECORATION (per chunk) ---
    const biomeAtCenter = chunk.biomes[8 * CHUNK_SIZE + 8] || 'minecraft:plains';

    if (biomeAtCenter === 'minecraft:snowy_plains' || biomeAtCenter.includes('snowy')) {
      // 1. Clustered grass patches (patch_grass_badlands)
      const patchRng = pr.at(cx, 1, cz);
      const ox = cx * CHUNK_SIZE + patchRng.nextInt(16);
      const oz = cz * CHUNK_SIZE + patchRng.nextInt(16);
      for (let i = 0; i < 32; i++) {
        const dx = trapezoid(patchRng, -7, 7);
        const dz = trapezoid(patchRng, -7, 7);
        const wx = ox + dx;
        const wz = oz + dz;
        const lx = wx - cx * CHUNK_SIZE;
        const lz = wz - cz * CHUNK_SIZE;
        if (lx >= 0 && lx < CHUNK_SIZE && lz >= 0 && lz < CHUNK_SIZE) {
          const h = heightMap[lz * CHUNK_SIZE + lx];
          if (h > this.SEA_LEVEL && chunk.getBlock(lx, h, lz) === grassId && chunk.getBlock(lx, h + 1, lz) === 0) {
            chunk.setBlock(lx, h + 1, lz, shortGrassId);
          }
        }
      }

      // 2. Flowers (flower_default: dandelions and poppies)
      const flRng = pr.at(cx, 2, cz);
      if (flRng.nextInt(3) === 0) {
        const fox = cx * CHUNK_SIZE + flRng.nextInt(16);
        const foz = cz * CHUNK_SIZE + flRng.nextInt(16);
        for (let i = 0; i < 20; i++) {
          const dx = trapezoid(flRng, -7, 7);
          const dz = trapezoid(flRng, -7, 7);
          const wx = fox + dx;
          const wz = foz + dz;
          const lx = wx - cx * CHUNK_SIZE;
          const lz = wz - cz * CHUNK_SIZE;
          if (lx >= 0 && lx < CHUNK_SIZE && lz >= 0 && lz < CHUNK_SIZE) {
            const h = heightMap[lz * CHUNK_SIZE + lx];
            if (h > this.SEA_LEVEL && chunk.getBlock(lx, h, lz) === grassId && chunk.getBlock(lx, h + 1, lz) === 0) {
              const flowerId = flRng.nextFloat() < 0.5 ? dandelionId : poppyId;
              chunk.setBlock(lx, h + 1, lz, flowerId);
            }
          }
        }
      }
    } else {
      // General Biome flora
      for (let lz = 0; lz < CHUNK_SIZE; lz++) {
        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
          const wx = cx * CHUNK_SIZE + lx;
          const wz = cz * CHUNK_SIZE + lz;
          const h = heightMap[lz * CHUNK_SIZE + lx];
          if (h <= this.SEA_LEVEL) {
            if (biomeAtCenter.includes('swamp') && lilyPadId && chunk.getBlock(lx, this.SEA_LEVEL, lz) === waterId) {
              if (this.hash2D(wx, wz, 555) < 0.03 && chunk.getBlock(lx, this.SEA_LEVEL + 1, lz) === 0) {
                chunk.setBlock(lx, this.SEA_LEVEL + 1, lz, lilyPadId);
              }
            }
            continue;
          }

          const topBlock = chunk.getBlock(lx, h, lz);
          if (chunk.getBlock(lx, h + 1, lz) !== 0) continue;

          const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || 'minecraft:plains';
          const fRoll = this.hash2D(wx, wz, worldSeed ^ 5555);

          if (biomeId.includes('desert') || biomeId.includes('badlands')) {
            if (topBlock === sandId) {
              if (fRoll < 0.008 && cactusId) {
                const cactusHeight = 1 + Math.floor(this.hash2D(wx, wz, 77) * 3);
                for (let y = 1; y <= cactusHeight; y++) {
                  if (h + y < CHUNK_HEIGHT) chunk.setBlock(lx, h + y, lz, cactusId);
                }
              } else if (fRoll < 0.025 && deadBushId) {
                chunk.setBlock(lx, h + 1, lz, deadBushId);
              }
            }
          } else if (biomeId === 'minecraft:dappled_forest' || biomeId === 'minecraft:poplar_grove') {
            if (fRoll < 0.07 && leafLitterId) chunk.setBlock(lx, h + 1, lz, leafLitterId);
            else if (fRoll < 0.14 && shortGrassId) chunk.setBlock(lx, h + 1, lz, shortGrassId);
            else if (fRoll < 0.155 && brownMushroomId) chunk.setBlock(lx, h + 1, lz, brownMushroomId);
          } else if (biomeId === 'minecraft:cherry_grove') {
            if (fRoll < 0.18 && pinkPetalsId) chunk.setBlock(lx, h + 1, lz, pinkPetalsId);
            else if (fRoll < 0.22 && shortGrassId) chunk.setBlock(lx, h + 1, lz, shortGrassId);
          } else if (biomeId === 'minecraft:sunflower_plains') {
            if (fRoll < 0.05 && sunflowerId) {
              chunk.setBlock(lx, h + 1, lz, sunflowerId);
              if (h + 2 < CHUNK_HEIGHT) chunk.setBlock(lx, h + 2, lz, sunflowerId);
            } else if (fRoll < 0.15 && shortGrassId) {
              chunk.setBlock(lx, h + 1, lz, shortGrassId);
            }
          } else {
            if (topBlock === grassId || topBlock === podzolId) {
              if (fRoll < 0.11 && shortGrassId) chunk.setBlock(lx, h + 1, lz, shortGrassId);
              else if (fRoll < 0.135 && poppyId) chunk.setBlock(lx, h + 1, lz, poppyId);
              else if (fRoll < 0.155 && dandelionId) chunk.setBlock(lx, h + 1, lz, dandelionId);
            }
          }
        }
      }
    }

    // --- 3. FREEZE TOP LAYER (Vanilla FreezeTopLayerFeature executed at the end) ---
    this.freezeTopLayer(chunk, cx, cz);
  }

  /**
   * Vanilla freeze_top_layer feature:
   * Freezes surface water to ice and covers exposed upward-facing blocks and leaves with snow.
   * Naturally preserves grass and flowers in 1-block deep snow holes.
   */
  static freezeTopLayer(chunk: Chunk, cx: number, cz: number) {
    const snowLayerId = Registries.getBlock('snow')?.numId || 0;
    const grassSnowId = Registries.getBlock('grass_block_snow')?.numId || Registries.getBlock('grass_block').numId;
    const grassId = Registries.getBlock('grass_block')?.numId || 0;
    const waterId = Registries.getBlock('water')?.numId || 0;
    const iceId = Registries.getBlock('ice')?.numId || waterId;
    const dirtId = Registries.getBlock('dirt')?.numId || 0;
    const stoneId = Registries.getBlock('stone')?.numId || 0;
    const shortGrassId = Registries.getBlock('short_grass')?.numId || 0;
    const tallGrassId = Registries.getBlock('tall_grass')?.numId || 0;
    const dandelionId = Registries.getBlock('dandelion')?.numId || 0;
    const poppyId = Registries.getBlock('poppy')?.numId || 0;
    const spruceLeavesId = Registries.getBlock('spruce_leaves')?.numId || 0;
    const oakLeavesId = Registries.getBlock('oak_leaves')?.numId || 0;
    const birchLeavesId = Registries.getBlock('birch_leaves')?.numId || 0;

    const nonSolidFlora = new Set<number>([
      shortGrassId, tallGrassId, dandelionId, poppyId
    ]);

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || 'minecraft:plains';
        const isCold =
          biomeId.includes('snowy') ||
          biomeId.includes('frozen') ||
          biomeId.includes('ice') ||
          biomeId.includes('grove') ||
          biomeId.includes('slopes') ||
          biomeId.includes('peaks');

        if (!isCold) continue;

        // 1. Freeze surface water
        if (chunk.getBlock(lx, this.SEA_LEVEL, lz) === waterId) {
          chunk.setBlock(lx, this.SEA_LEVEL, lz, iceId);
        }

        // 2. Scan downwards through column to place snow on leaves and ground
        for (let y = CHUNK_HEIGHT - 2; y >= 1; y--) {
          const b = chunk.getBlock(lx, y, lz);
          if (b === 0) continue;

          const above = chunk.getBlock(lx, y + 1, lz);

          // If leaf block with air above: place snow layer on it!
          if (b === spruceLeavesId || b === oakLeavesId || b === birchLeavesId) {
            if (above === 0 && snowLayerId) {
              chunk.setBlock(lx, y + 1, lz, snowLayerId);
            }
            continue; // Continue scanning down for lower canopy tiers and ground
          }

          // If non-solid flora (grass or flower):
          // Sits in authentic snow hole! Do NOT place snow on top, do NOT freeze grass block beneath.
          if (nonSolidFlora.has(b)) {
            break;
          }

          // If solid ground (grass block, dirt, stone, gravel, sand)
          if (b === grassId) {
            if (above === 0 && snowLayerId) {
              chunk.setBlock(lx, y, lz, grassSnowId);
              chunk.setBlock(lx, y + 1, lz, snowLayerId);
            }
            break;
          } else if (b === dirtId || b === stoneId || b === grassSnowId) {
            if (above === 0 && snowLayerId) {
              chunk.setBlock(lx, y + 1, lz, snowLayerId);
            }
            break;
          } else if (b === waterId || b === iceId) {
            break;
          }
        }
      }
    }
  }

  /**
   * Conical Spruce Tree matching Minecraft's authentic SpruceFoliagePlacer:
   * 3-4 distinct tiered conical layers alternating between cross and 5x5 disc with corner truncation.
   */
  static placeSpruceTree(
    setBlockWorld: (x: number, y: number, z: number, id: number) => void,
    baseX: number,
    baseY: number,
    baseZ: number,
    trunkHeight: number,
    foliageRadius = 2
  ) {
    const logId = Registries.getBlock('spruce_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('spruce_leaves')?.numId || Registries.getBlock('oak_leaves').numId;

    // 1. Trunk
    for (let y = baseY; y < baseY + trunkHeight; y++) {
      setBlockWorld(baseX, y, baseZ, logId);
    }

    // 2. Foliage (Minecraft SpruceFoliagePlacer)
    const topY = baseY + trunkHeight;
    let currentRadius = 0;
    let maxRadius = 1;
    let minRadius = 0;
    const foliageHeight = trunkHeight - 1;

    for (let y = topY; y >= topY - foliageHeight; y--) {
      const r = currentRadius;
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (r === 0) {
            setBlockWorld(baseX, y, baseZ, leafId);
          } else if (r === 1) {
            if (Math.abs(dx) + Math.abs(dz) <= 1) {
              setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
            }
          } else if (r === 2) {
            if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue; // Truncate corners
            setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
          } else if (r >= 3) {
            if (Math.abs(dx) + Math.abs(dz) > r + 1) continue;
            setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
          }
        }
      }

      if (currentRadius >= maxRadius) {
        currentRadius = minRadius;
        minRadius = 1;
        maxRadius = Math.min(maxRadius + 1, foliageRadius);
      } else {
        currentRadius++;
      }
    }
  }

  static placeClassicTree(
    setBlockWorld: (x: number, y: number, z: number, id: number) => void,
    baseX: number,
    baseY: number,
    baseZ: number,
    logName: string,
    leafName: string,
    height = 5
  ) {
    const logId = Registries.getBlock(logName)?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock(leafName)?.numId || Registries.getBlock('oak_leaves').numId;

    for (let y = baseY; y < baseY + height; y++) {
      setBlockWorld(baseX, y, baseZ, logId);
    }

    const leafStart = baseY + height - 2;
    for (let y = leafStart; y <= baseY + height + 1; y++) {
      const radius = y >= baseY + height ? 1 : 2;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if (dx === 0 && dz === 0 && y < baseY + height) continue;
          if (Math.abs(dx) === radius && Math.abs(dz) === radius) {
            if (y >= baseY + height || Math.random() < 0.4) continue;
          }
          setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
        }
      }
    }
  }

  static placeDarkOakTree(
    setBlockWorld: (x: number, y: number, z: number, id: number) => void,
    baseX: number,
    baseY: number,
    baseZ: number
  ) {
    const logId = Registries.getBlock('dark_oak_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('dark_oak_leaves')?.numId || Registries.getBlock('oak_leaves').numId;
    const height = 7;

    for (let y = baseY; y < baseY + height; y++) {
      for (let dx = 0; dx < 2; dx++) {
        for (let dz = 0; dz < 2; dz++) {
          setBlockWorld(baseX + dx, y, baseZ + dz, logId);
        }
      }
    }

    for (let y = baseY + height - 2; y <= baseY + height + 1; y++) {
      const radius = y >= baseY + height ? 2 : 3;
      for (let dx = -radius; dx <= radius + 1; dx++) {
        for (let dz = -radius; dz <= radius + 1; dz++) {
          setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
        }
      }
    }
  }

  static placeJungleTree(
    setBlockWorld: (x: number, y: number, z: number, id: number) => void,
    baseX: number,
    baseY: number,
    baseZ: number,
    roll: number
  ) {
    const logId = Registries.getBlock('jungle_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('jungle_leaves')?.numId || Registries.getBlock('oak_leaves').numId;

    if (roll < 0.1) {
      // Mega 2x2 jungle tree
      const height = 12;
      for (let y = baseY; y < baseY + height; y++) {
        for (let dx = 0; dx < 2; dx++) {
          for (let dz = 0; dz < 2; dz++) {
            setBlockWorld(baseX + dx, y, baseZ + dz, logId);
          }
        }
      }
      for (let y = baseY + height - 3; y <= baseY + height + 1; y++) {
        const radius = y >= baseY + height ? 2 : 3;
        for (let dx = -radius; dx <= radius + 1; dx++) {
          for (let dz = -radius; dz <= radius + 1; dz++) {
            setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
          }
        }
      }
    } else {
      this.placeClassicTree(setBlockWorld, baseX, baseY, baseZ, 'jungle_log', 'jungle_leaves', 6);
    }
  }

  static placeAcaciaTree(
    setBlockWorld: (x: number, y: number, z: number, id: number) => void,
    baseX: number,
    baseY: number,
    baseZ: number
  ) {
    const logId = Registries.getBlock('acacia_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('acacia_leaves')?.numId || Registries.getBlock('oak_leaves').numId;
    const height = 6;

    for (let y = baseY; y < baseY + height; y++) {
      setBlockWorld(baseX, y, baseZ, logId);
    }
    const topY = baseY + height;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        setBlockWorld(baseX + dx, topY, baseZ + dz, leafId);
      }
    }
  }

  static placePoplarTree(
    setBlockWorld: (x: number, y: number, z: number, id: number) => void,
    baseX: number,
    baseY: number,
    baseZ: number,
    leafVariant: 'orange_poplar_leaves' | 'red_poplar_leaves' | 'yellow_poplar_leaves',
    seedRoll = 0.5
  ) {
    const logId = Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock(leafVariant)?.numId || Registries.getBlock('oak_leaves').numId;
    const height = 9 + Math.floor(seedRoll * 5);

    for (let y = baseY; y < baseY + height; y++) {
      setBlockWorld(baseX, y, baseZ, logId);
    }

    const foliageBaseY = baseY + 2;
    const foliageTopY = baseY + height + 1;
    for (let y = foliageBaseY; y <= foliageTopY; y++) {
      let r = 1;
      if (y === foliageBaseY || y === foliageTopY) r = 0;
      else if (y > foliageBaseY + 2 && y < foliageTopY - 2) r = 2;

      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (r > 1 && Math.abs(dx) === r && Math.abs(dz) === r) continue;
          if (dx === 0 && dz === 0 && y < baseY + height) continue;
          setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
        }
      }
    }
  }

  private static hash2D(x: number, z: number, seed = 0): number {
    let n = Math.imul(x, 374761393) + Math.imul(z, 668265263) + Math.imul(seed, 1442695041);
    n = (n ^ (n >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }
}
