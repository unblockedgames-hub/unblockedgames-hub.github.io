import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT } from './Chunk';
import { Registries } from '../core/Registries';

export class FeaturePlacer {
  static SEA_LEVEL = 63;

  /**
   * Places authentic Minecraft 26.3 features per chunk according to official biome definitions:
   */
  static placeFeatures(
    chunk: Chunk,
    cx: number,
    cz: number,
    heightMap: Int32Array,
    worldSeed: number,
    hasStructure = false
  ) {
    const snowLayerId = Registries.getBlock('snow')?.numId || 0;
    const grassSnowId = Registries.getBlock('grass_block_snow')?.numId || Registries.getBlock('grass_block').numId;
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
    const sandId = Registries.getBlock('sand')?.numId || 0;
    const grassId = Registries.getBlock('grass_block')?.numId || 0;
    const podzolId = Registries.getBlock('podzol')?.numId || 0;
    const waterId = Registries.getBlock('water')?.numId || 0;

    // --- 1. TREE GENERATION ---
    // Sample tree placements per chunk
    for (let lz = 2; lz < CHUNK_SIZE - 2; lz += 4) {
      for (let lx = 2; lx < CHUNK_SIZE - 2; lx += 4) {
        if (hasStructure && lx >= 1 && lx <= 15 && lz >= 1 && lz <= 15) {
          continue; // Clear trees and flora inside structure footprints
        }
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const h = heightMap[lz * CHUNK_SIZE + lx];
        if (h <= this.SEA_LEVEL) continue;

        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || 'minecraft:plains';
        const treeRoll = this.hash2D(wx, wz, worldSeed ^ 1234);

        if (biomeId === 'minecraft:snowy_plains') {
          // Vanilla trees_snowy.json: 90% chance of 0, 10% chance of 1 tree per chunk
          if (treeRoll < 0.015) {
            this.placeSpruceTree(chunk, lx, h + 1, lz, 6 + Math.floor(treeRoll * 30), true);
          }
        } else if (biomeId.includes('taiga')) {
          const isSnowy = biomeId.includes('snowy');
          if (treeRoll < 0.22) {
            this.placeSpruceTree(chunk, lx, h + 1, lz, 6 + Math.floor(treeRoll * 20), isSnowy);
          }
        } else if (biomeId === 'minecraft:dappled_forest' || biomeId === 'minecraft:poplar_grove') {
          if (treeRoll < 0.32) {
            const leafRoll = this.hash2D(wx, wz, 777);
            const variant: 'orange_poplar_leaves' | 'yellow_poplar_leaves' | 'red_poplar_leaves' =
              leafRoll < 0.4
                ? 'orange_poplar_leaves'
                : leafRoll < 0.72
                ? 'yellow_poplar_leaves'
                : 'red_poplar_leaves';
            this.placePoplarTree(chunk, lx, h + 1, lz, variant, leafRoll);
          }
        } else if (biomeId === 'minecraft:forest') {
          if (treeRoll < 0.25) {
            if (this.hash2D(wx, wz, 99) < 0.2) {
              this.placeClassicTree(chunk, lx, h + 1, lz, 'birch_log', 'birch_leaves', 6);
            } else {
              this.placeClassicTree(chunk, lx, h + 1, lz, 'oak_log', 'oak_leaves', 5);
            }
          }
        } else if (biomeId === 'minecraft:birch_forest' || biomeId === 'minecraft:old_growth_birch_forest') {
          if (treeRoll < 0.28) {
            this.placeClassicTree(chunk, lx, h + 1, lz, 'birch_log', 'birch_leaves', 6 + Math.floor(treeRoll * 10));
          }
        } else if (biomeId === 'minecraft:cherry_grove') {
          if (treeRoll < 0.2) {
            this.placeClassicTree(chunk, lx, h + 1, lz, 'cherry_log', 'cherry_leaves', 6);
          }
        } else if (biomeId === 'minecraft:dark_forest') {
          if (treeRoll < 0.35) {
            this.placeDarkOakTree(chunk, lx, h + 1, lz);
          }
        } else if (biomeId === 'minecraft:jungle' || biomeId === 'minecraft:sparse_jungle') {
          if (treeRoll < 0.3) {
            this.placeJungleTree(chunk, lx, h + 1, lz, treeRoll);
          }
        } else if (biomeId === 'minecraft:savanna') {
          if (treeRoll < 0.1) {
            this.placeAcaciaTree(chunk, lx, h + 1, lz);
          }
        } else if (biomeId === 'minecraft:plains' || biomeId === 'minecraft:sunflower_plains') {
          if (treeRoll < 0.02) {
            this.placeClassicTree(chunk, lx, h + 1, lz, 'oak_log', 'oak_leaves', 5);
          }
        }
      }
    }

    // --- 2. FLORA & SURFACE COVER DECORATION ---
    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const h = heightMap[lz * CHUNK_SIZE + lx];
        if (h <= this.SEA_LEVEL) {
          // Lily pads in swamp water
          const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || '';
          if (biomeId.includes('swamp') && lilyPadId && chunk.getBlock(lx, this.SEA_LEVEL, lz) === waterId) {
            if (this.hash2D(wx, wz, 555) < 0.03 && chunk.getBlock(lx, this.SEA_LEVEL + 1, lz) === 0) {
              chunk.setBlock(lx, this.SEA_LEVEL + 1, lz, lilyPadId);
            }
          }
          continue;
        }

        const topBlock = chunk.getBlock(lx, h, lz);
        if (chunk.getBlock(lx, h + 1, lz) !== 0 && chunk.getBlock(lx, h + 1, lz) !== snowLayerId) continue;

        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || 'minecraft:plains';
        const fRoll = this.hash2D(wx, wz, worldSeed ^ 5555);

        if (biomeId === 'minecraft:snowy_plains' || biomeId.includes('frozen') || biomeId.includes('snowy')) {
          // Vanilla snowy_plains: ONLY sparse short grass. NO flowers!
          if (fRoll < 0.035) {
            chunk.setBlock(lx, h + 1, lz, shortGrassId);
            chunk.setBlock(lx, h, lz, grassSnowId);
          }
        } else if (biomeId.includes('desert') || biomeId.includes('badlands')) {
          // Cacti and dead bushes on sand
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
          // Standard Plains & Forest flora
          if (topBlock === grassId || topBlock === podzolId) {
            if (fRoll < 0.11 && shortGrassId) chunk.setBlock(lx, h + 1, lz, shortGrassId);
            else if (fRoll < 0.135 && poppyId) chunk.setBlock(lx, h + 1, lz, poppyId);
            else if (fRoll < 0.155 && dandelionId) chunk.setBlock(lx, h + 1, lz, dandelionId);
          }
        }
      }
    }
  }

  /**
   * Conical Spruce Tree matching Minecraft's trees_snowy.json and taiga features
   */
  static placeSpruceTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    height: number,
    withSnow = false
  ) {
    const logId = Registries.getBlock('spruce_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('spruce_leaves')?.numId || Registries.getBlock('oak_leaves').numId;
    const snowLayerId = Registries.getBlock('snow')?.numId || 0;

    for (let y = baseY; y < baseY + height; y++) {
      if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, logId);
    }

    const topY = baseY + height;
    if (topY < CHUNK_HEIGHT) {
      chunk.setBlock(lx, topY, lz, leafId);
      if (withSnow && snowLayerId && topY + 1 < CHUNK_HEIGHT) {
        chunk.setBlock(lx, topY + 1, lz, snowLayerId);
      }
    }

    const maxRadius = height > 7 ? 2 : 1;
    for (let y = topY - 1; y >= baseY + 2; y--) {
      const distFromTop = topY - y;
      const r = distFromTop === 1 ? 1 : distFromTop % 2 === 0 ? maxRadius : 1;

      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (dx === 0 && dz === 0) continue;
          if (Math.abs(dx) === r && Math.abs(dz) === r && r > 1) continue;
          const px = lx + dx;
          const pz = lz + dz;
          if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            if (chunk.getBlock(px, y, pz) === 0) {
              chunk.setBlock(px, y, pz, leafId);
              if (withSnow && snowLayerId && y + 1 < CHUNK_HEIGHT && chunk.getBlock(px, y + 1, pz) === 0) {
                chunk.setBlock(px, y + 1, pz, snowLayerId);
              }
            }
          }
        }
      }
    }
  }

  static placeClassicTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    logName: string,
    leafName: string,
    height = 5
  ) {
    const logId = Registries.getBlock(logName)?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock(leafName)?.numId || Registries.getBlock('oak_leaves').numId;

    for (let y = baseY; y < baseY + height; y++) {
      if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, logId);
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
          const px = lx + dx;
          const pz = lz + dz;
          if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            if (chunk.getBlock(px, y, pz) === 0) {
              chunk.setBlock(px, y, pz, leafId);
            }
          }
        }
      }
    }
  }

  static placeDarkOakTree(chunk: Chunk, lx: number, baseY: number, lz: number) {
    const logId = Registries.getBlock('dark_oak_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('dark_oak_leaves')?.numId || Registries.getBlock('oak_leaves').numId;
    const height = 7;

    for (let y = baseY; y < baseY + height; y++) {
      for (let dx = 0; dx < 2; dx++) {
        for (let dz = 0; dz < 2; dz++) {
          const px = lx + dx;
          const pz = lz + dz;
          if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            chunk.setBlock(px, y, pz, logId);
          }
        }
      }
    }

    for (let y = baseY + height - 2; y <= baseY + height + 1; y++) {
      const radius = y >= baseY + height ? 2 : 3;
      for (let dx = -radius; dx <= radius + 1; dx++) {
        for (let dz = -radius; dz <= radius + 1; dz++) {
          const px = lx + dx;
          const pz = lz + dz;
          if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            if (chunk.getBlock(px, y, pz) === 0) {
              chunk.setBlock(px, y, pz, leafId);
            }
          }
        }
      }
    }
  }

  static placeJungleTree(chunk: Chunk, lx: number, baseY: number, lz: number, roll: number) {
    const logId = Registries.getBlock('jungle_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('jungle_leaves')?.numId || Registries.getBlock('oak_leaves').numId;

    if (roll < 0.1) {
      // Mega 2x2 jungle tree
      const height = 12;
      for (let y = baseY; y < baseY + height; y++) {
        for (let dx = 0; dx < 2; dx++) {
          for (let dz = 0; dz < 2; dz++) {
            const px = lx + dx;
            const pz = lz + dz;
            if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
              chunk.setBlock(px, y, pz, logId);
            }
          }
        }
      }
      for (let y = baseY + height - 3; y <= baseY + height + 1; y++) {
        const radius = y >= baseY + height ? 2 : 3;
        for (let dx = -radius; dx <= radius + 1; dx++) {
          for (let dz = -radius; dz <= radius + 1; dz++) {
            const px = lx + dx;
            const pz = lz + dz;
            if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
              if (chunk.getBlock(px, y, pz) === 0) {
                chunk.setBlock(px, y, pz, leafId);
              }
            }
          }
        }
      }
    } else {
      this.placeClassicTree(chunk, lx, baseY, lz, 'jungle_log', 'jungle_leaves', 6);
    }
  }

  static placeAcaciaTree(chunk: Chunk, lx: number, baseY: number, lz: number) {
    const logId = Registries.getBlock('acacia_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('acacia_leaves')?.numId || Registries.getBlock('oak_leaves').numId;
    const height = 6;

    for (let y = baseY; y < baseY + height; y++) {
      if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, logId);
    }
    // Flat umbrella canopy
    const topY = baseY + height;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const px = lx + dx;
        const pz = lz + dz;
        if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && topY < CHUNK_HEIGHT) {
          if (chunk.getBlock(px, topY, pz) === 0) {
            chunk.setBlock(px, topY, pz, leafId);
          }
        }
      }
    }
  }

  static placePoplarTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    leafVariant: 'orange_poplar_leaves' | 'red_poplar_leaves' | 'yellow_poplar_leaves',
    seedRoll = 0.5
  ) {
    const logId = Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock(leafVariant)?.numId || Registries.getBlock('oak_leaves').numId;
    const height = 9 + Math.floor(seedRoll * 5);

    for (let y = baseY; y < baseY + height; y++) {
      if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, logId);
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
          const px = lx + dx;
          const pz = lz + dz;
          if (px >= 0 && px < CHUNK_SIZE && pz >= 0 && pz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            if (chunk.getBlock(px, y, pz) === 0) {
              chunk.setBlock(px, y, pz, leafId);
            }
          }
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
