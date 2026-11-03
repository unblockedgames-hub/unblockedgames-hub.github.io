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
  static SEA_LEVEL = 62;

  /**
   * Places authentic Minecraft 26.3 ore veins (step 6: underground_ores) using Mojang's
   * exact ellipsoidal line equations, triangular/uniform height ranges, and air-exposure discard checks.
   */
  static placeOres(chunk: Chunk, cx: number, cz: number, worldSeed: number) {
    const r = deepslate.XoroshiroRandom.create(BigInt(worldSeed));
    const pr = r.forkPositional();

    const stoneId = Registries.getBlock('stone')?.numId || 0;
    const deepslateId = Registries.getBlock('deepslate')?.numId || 0;

    const ores = [
      // Coal upper: 30 attempts, uniform [136..256], size 17, air 0
      { ore: 'coal_ore', deep: 'deepslate_coal_ore', count: 30, type: 'uniform', min: 136, max: 256, size: 17, airDiscard: 0.0, step: 0 },
      // Coal lower: 20 attempts, trapezoid [0..192], size 17, air 0.5
      { ore: 'coal_ore', deep: 'deepslate_coal_ore', count: 20, type: 'trapezoid', min: 0, max: 192, size: 17, airDiscard: 0.5, step: 1 },
      // Iron upper: 90 attempts, trapezoid [80..256], size 9, air 0
      { ore: 'iron_ore', deep: 'deepslate_iron_ore', count: 90, type: 'trapezoid', min: 80, max: 256, size: 9, airDiscard: 0.0, step: 2 },
      // Iron middle: 10 attempts, trapezoid [-24..56], size 9, air 0
      { ore: 'iron_ore', deep: 'deepslate_iron_ore', count: 10, type: 'trapezoid', min: -24, max: 56, size: 9, airDiscard: 0.0, step: 3 },
      // Iron small: 10 attempts, uniform [0..72], size 4, air 0
      { ore: 'iron_ore', deep: 'deepslate_iron_ore', count: 10, type: 'uniform', min: 0, max: 72, size: 4, airDiscard: 0.0, step: 4 },
      // Copper: 16 attempts, trapezoid [-16..112], size 10, air 0
      { ore: 'copper_ore', deep: 'deepslate_copper_ore', count: 16, type: 'trapezoid', min: -16, max: 112, size: 10, airDiscard: 0.0, step: 5 },
      // Copper large: 16 attempts, trapezoid [-16..112], size 20, air 0
      { ore: 'copper_ore', deep: 'deepslate_copper_ore', count: 16, type: 'trapezoid', min: -16, max: 112, size: 20, airDiscard: 0.0, step: 6 },
      // Gold: 4 attempts, trapezoid [-64..32], size 9, air 0.5
      { ore: 'gold_ore', deep: 'deepslate_gold_ore', count: 4, type: 'trapezoid', min: -64, max: 32, size: 9, airDiscard: 0.5, step: 7 },
      // Redstone: 4 attempts, uniform [0..15], size 8, air 0
      { ore: 'redstone_ore', deep: 'deepslate_redstone_ore', count: 4, type: 'uniform', min: 0, max: 15, size: 8, airDiscard: 0.0, step: 8 },
      // Redstone lower: 8 attempts, trapezoid [0..32], size 8, air 0
      { ore: 'redstone_ore', deep: 'deepslate_redstone_ore', count: 8, type: 'trapezoid', min: 0, max: 32, size: 8, airDiscard: 0.0, step: 9 },
      // Diamond: 7 attempts, trapezoid [0..16], size 4, air 0.5
      { ore: 'diamond_ore', deep: 'deepslate_diamond_ore', count: 7, type: 'trapezoid', min: 0, max: 16, size: 4, airDiscard: 0.5, step: 10 },
      // Diamond medium: 2 attempts, uniform [0..16], size 8, air 0.5
      { ore: 'diamond_ore', deep: 'deepslate_diamond_ore', count: 2, type: 'uniform', min: 0, max: 16, size: 8, airDiscard: 0.5, step: 11 },
      // Lapis: 2 attempts, trapezoid [0..64], size 7, air 0
      { ore: 'lapis_ore', deep: 'deepslate_lapis_ore', count: 2, type: 'trapezoid', min: 0, max: 64, size: 7, airDiscard: 0.0, step: 12 },
      // Dirt: 7 attempts, uniform [0..160], size 33, air 0
      { ore: 'dirt', deep: 'dirt', count: 7, type: 'uniform', min: 0, max: 160, size: 33, airDiscard: 0.0, step: 13 },
      // Gravel: 14 attempts, uniform [0..128], size 33, air 0
      { ore: 'gravel', deep: 'gravel', count: 14, type: 'uniform', min: 0, max: 128, size: 33, airDiscard: 0.0, step: 14 },
      // Granite: 2 attempts, uniform [0..60], size 64, air 0
      { ore: 'granite', deep: 'tuff', count: 2, type: 'uniform', min: 0, max: 60, size: 64, airDiscard: 0.0, step: 15 },
      // Diorite: 2 attempts, uniform [0..60], size 64, air 0
      { ore: 'diorite', deep: 'tuff', count: 2, type: 'uniform', min: 0, max: 60, size: 64, airDiscard: 0.0, step: 16 },
      // Andesite: 2 attempts, uniform [0..60], size 64, air 0
      { ore: 'andesite', deep: 'tuff', count: 2, type: 'uniform', min: 0, max: 60, size: 64, airDiscard: 0.0, step: 17 },
      // Tuff: 2 attempts, uniform [0..16], size 64, air 0
      { ore: 'tuff', deep: 'tuff', count: 2, type: 'uniform', min: 0, max: 16, size: 64, airDiscard: 0.0, step: 18 }
    ];

    for (const cfg of ores) {
      const oreId = Registries.getBlock(cfg.ore)?.numId || stoneId;
      const deepId = Registries.getBlock(cfg.deep)?.numId || deepslateId;
      const oreRng = pr.at(cx, cfg.step, cz);

      for (let c = 0; c < cfg.count; c++) {
        const originX = cx * 16 + oreRng.nextInt(16);
        const originZ = cz * 16 + oreRng.nextInt(16);

        let originY = 0;
        if (cfg.type === 'trapezoid') {
          originY = trapezoid(oreRng, cfg.min, cfg.max);
        } else {
          originY = cfg.min + oreRng.nextInt(Math.max(1, cfg.max - cfg.min + 1));
        }

        if (originY < 1 || originY >= CHUNK_HEIGHT) continue;

        // Mojang OreFeature line equation
        const f = oreRng.nextFloat() * Math.PI;
        const g = cfg.size / 8.0;
        const d = originX + Math.sin(f) * g;
        const e = originX - Math.sin(f) * g;
        const h = originZ + Math.cos(f) * g;
        const j = originZ - Math.cos(f) * g;
        const k = originY + oreRng.nextInt(3) - 2;
        const m = originY + oreRng.nextInt(3) - 2;

        for (let s = 0; s < cfg.size; s++) {
          const progress = s / cfg.size;
          const curX = d + (e - d) * progress;
          const curY = k + (m - k) * progress;
          const curZ = h + (j - h) * progress;
          const spread = oreRng.nextDouble() * cfg.size / 16.0;
          const radius = ((Math.sin(Math.PI * progress) + 1.0) * spread + 1.0) / 2.0;

          const minBx = Math.floor(curX - radius);
          const maxBx = Math.floor(curX + radius);
          const minBy = Math.floor(curY - radius);
          const maxBy = Math.floor(curY + radius);
          const minBz = Math.floor(curZ - radius);
          const maxBz = Math.floor(curZ + radius);

          for (let bx = minBx; bx <= maxBx; bx++) {
            const dx = (bx + 0.5 - curX) / radius;
            if (dx * dx >= 1.0) continue;
            const lx = bx - cx * 16;
            if (lx < 0 || lx >= 16) continue;

            for (let by = minBy; by <= maxBy; by++) {
              const dy = (by + 0.5 - curY) / radius;
              if (dx * dx + dy * dy >= 1.0) continue;
              if (by < 1 || by >= CHUNK_HEIGHT) continue;

              for (let bz = minBz; bz <= maxBz; bz++) {
                const dz = (bz + 0.5 - curZ) / radius;
                if (dx * dx + dy * dy + dz * dz >= 1.0) continue;
                const lz = bz - cz * 16;
                if (lz < 0 || lz >= 16) continue;

                const curBlock = chunk.getBlock(lx, by, lz);
                if (curBlock === stoneId || curBlock === deepslateId) {
                  if (cfg.airDiscard > 0) {
                    const nearAir =
                      (lx > 0 && chunk.getBlock(lx - 1, by, lz) === 0) ||
                      (lx < 15 && chunk.getBlock(lx + 1, by, lz) === 0) ||
                      (by > 0 && chunk.getBlock(lx, by - 1, lz) === 0) ||
                      (by < CHUNK_HEIGHT - 1 && chunk.getBlock(lx, by + 1, lz) === 0) ||
                      (lz > 0 && chunk.getBlock(lx, by, lz - 1) === 0) ||
                      (lz < 15 && chunk.getBlock(lx, by, lz + 1) === 0);
                    if (nearAir && oreRng.nextFloat() < cfg.airDiscard) continue;
                  }
                  chunk.setBlock(lx, by, lz, curBlock === deepslateId ? deepId : oreId);
                }
              }
            }
          }
        }
      }
    }
  }

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
      const lx = Math.max(0, Math.min(15, wx - cx * CHUNK_SIZE));
      const lz = Math.max(0, Math.min(15, wz - cz * CHUNK_SIZE));
      return heightMap[lz * CHUNK_SIZE + lx];
    };

    // --- 1. TREE GENERATION (fast deterministic chunk placement with 3x3 neighborhood for seamless cross-chunk canopies) ---
    for (let nox = -1; nox <= 1; nox++) {
      for (let noz = -1; noz <= 1; noz++) {
        const ncx = cx + nox;
        const ncz = cz + noz;
        const chunkRng = pr.at(ncx, 0, ncz);
        const candidateAttempts = 4;
        for (let i = 0; i < candidateAttempts; i++) {
          const lx = chunkRng.nextInt(16);
          const lz = chunkRng.nextInt(16);
          const twx = ncx * CHUNK_SIZE + lx;
          const twz = ncz * CHUNK_SIZE + lz;

          if (hasStructure && nox === 0 && noz === 0 && lx >= 4 && lx <= 12 && lz >= 4 && lz <= 12) {
            continue;
          }

          const biomeId = WorldGen26_3.vanillaClimate.getBiomeAt(twx, twz);
          const h = (nox === 0 && noz === 0)
            ? heightMap[lz * CHUNK_SIZE + lx]
            : WorldGen26_3.vanillaClimate.getTerrainHeight(twx, twz);
          if (h <= this.SEA_LEVEL) continue;

          // Soil check for root chunk
          if (nox === 0 && noz === 0) {
            const groundBlock = chunk.getBlock(lx, h, lz);
            if (groundBlock !== grassId && groundBlock !== podzolId && groundBlock !== (Registries.getBlock('dirt')?.numId || 0)) {
              continue;
            }
          }

          // Per-candidate probability based on biome density
          let treeChance = 0;
          if (biomeId.includes('forest') || biomeId.includes('taiga') || biomeId.includes('grove')) {
            treeChance = 0.85;
          } else if (biomeId === 'minecraft:dappled_forest' || biomeId === 'minecraft:poplar_grove') {
            treeChance = 0.85;
          } else if (biomeId.includes('jungle')) {
            treeChance = 0.95;
          } else if (biomeId === 'minecraft:snowy_plains') {
            // Authentic Minecraft trees_snowy: sparse spruce pines scattered across the plains
            treeChance = 0.45;
          } else if (biomeId === 'minecraft:plains' || biomeId === 'minecraft:sunflower_plains') {
            treeChance = 0.15;
          } else if (biomeId === 'minecraft:savanna') {
            treeChance = 0.35;
          }

          if (chunkRng.nextFloat() > treeChance) continue;

          if (biomeId === 'minecraft:snowy_plains') {
            // Authentic Minecraft trees_snowy: tall conical pines with tiered snowy crowns
            const trunkH = 7 + chunkRng.nextInt(4);
            const folRadius = 2 + (chunkRng.nextInt(10) < 3 ? 1 : 0);
            this.placeSpruceTree(setBlockInChunk, twx, h + 1, twz, trunkH, folRadius);
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
            this.placeClassicTree(setBlockInChunk, twx, h + 1, twz, 'oak_log', 'oak_leaves', 5);
          }
        }
      }
    }

    // --- 2. FLORA & SURFACE COVER DECORATION (per-block biome evaluation) ---
    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const h = heightMap[lz * CHUNK_SIZE + lx];
        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || 'minecraft:plains';

        if (h <= this.SEA_LEVEL) {
          const isCold = biomeId.includes('snowy') || biomeId.includes('frozen') || biomeId.includes('ice');
          if (!isCold && biomeId.includes('swamp') && lilyPadId && chunk.getBlock(lx, this.SEA_LEVEL, lz) === waterId) {
            if (this.hash2D(wx, wz, 555) < 0.03 && chunk.getBlock(lx, this.SEA_LEVEL + 1, lz) === 0) {
              chunk.setBlock(lx, this.SEA_LEVEL + 1, lz, lilyPadId);
            }
          }
          continue;
        }

        const topBlock = chunk.getBlock(lx, h, lz);
        if (chunk.getBlock(lx, h + 1, lz) !== 0) continue;

        const fRoll = this.hash2D(wx, wz, worldSeed ^ 5555);

        // Snowy biomes: ZERO flowers (vanilla Minecraft 26.3 parity: no dandelions or poppies)
        if (
          biomeId.includes('snowy') ||
          biomeId.includes('frozen') ||
          biomeId === 'minecraft:grove' ||
          biomeId.includes('peaks') ||
          biomeId.includes('slopes')
        ) {
          if ((topBlock === grassId || topBlock === podzolId) && fRoll < 0.04 && shortGrassId) {
            chunk.setBlock(lx, h + 1, lz, shortGrassId);
          }
        } else if (biomeId.includes('desert') || biomeId.includes('badlands')) {
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
          // If a lily pad was on the water, it cannot survive on ice: pop it off
          const aboveBlock = chunk.getBlock(lx, this.SEA_LEVEL + 1, lz);
          const aboveDef = Registries.getBlock(aboveBlock);
          if (aboveDef && aboveDef.shortId === 'lily_pad') {
            chunk.setBlock(lx, this.SEA_LEVEL + 1, lz, 0);
          }
        }

        // 2. Scan downwards through column to place snow on leaves and ground
        let hasCanopyAbove = false;
        for (let y = CHUNK_HEIGHT - 2; y >= 1; y--) {
          const b = chunk.getBlock(lx, y, lz);
          if (b === 0) continue;

          const above = chunk.getBlock(lx, y + 1, lz);

          // If leaf block with air above: place snow layer on it!
          if (b === spruceLeavesId || b === oakLeavesId || b === birchLeavesId) {
            if (!hasCanopyAbove && above === 0 && snowLayerId) {
              chunk.setBlock(lx, y + 1, lz, snowLayerId);
            }
            hasCanopyAbove = true;
            continue; // Continue scanning down for lower canopy tiers and ground
          }

          // If non-solid flora (grass or flower):
          // Sits in authentic snow hole! Do NOT place snow on top, do NOT freeze grass block beneath.
          if (nonSolidFlora.has(b)) {
            break;
          }

          // If solid ground (grass block, dirt, stone, gravel, sand)
          if (!hasCanopyAbove) {
            if (b === grassId) {
              if (above === 0 && snowLayerId) {
                chunk.setBlock(lx, y, lz, grassSnowId);
                chunk.setBlock(lx, y + 1, lz, snowLayerId);
              }
            } else if (b === dirtId || b === stoneId || b === grassSnowId) {
              if (above === 0 && snowLayerId) {
                chunk.setBlock(lx, y + 1, lz, snowLayerId);
              }
            }
          }
          break;
        }
      }
    }
  }

  /**
   * Conical Spruce Tree matching Minecraft's authentic SpruceFoliagePlacer:
   * 3-4 distinct tiered conical layers alternating between cross and 5x5 disc with corner truncation.
   * Preserves bare lower trunk and never overwrites log column.
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
    const snowId = Registries.getBlock('snow')?.numId || 0;
    const dirtId = Registries.getBlock('dirt')?.numId || 0;

    // 1. Trunk and ground foundation
    if (dirtId) setBlockWorld(baseX, baseY - 1, baseZ, dirtId);
    for (let y = baseY; y < baseY + trunkHeight; y++) {
      setBlockWorld(baseX, y, baseZ, logId);
    }

    // 2. Foliage (Minecraft SpruceFoliagePlacer: tiered evergreen pine with snow layers)
    const topY = baseY + trunkHeight;
    // Top tip
    setBlockWorld(baseX, topY, baseZ, leafId);
    if (snowId) setBlockWorld(baseX, topY + 1, baseZ, snowId);

    // Tier 1: cross shape at topY - 1
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 1) {
          if (dx === 0 && dz === 0) continue; // Preserve log trunk!
          setBlockWorld(baseX + dx, topY - 1, baseZ + dz, leafId);
          if (snowId) {
            setBlockWorld(baseX + dx, topY, baseZ + dz, snowId);
          }
        }
      }
    }

    // Tier 2: 3x3 square at topY - 2
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dz === 0) continue; // Preserve log trunk!
        setBlockWorld(baseX + dx, topY - 2, baseZ + dz, leafId);
        if (snowId && Math.abs(dx) === 1 && Math.abs(dz) === 1) {
          setBlockWorld(baseX + dx, topY - 1, baseZ + dz, snowId);
        }
      }
    }

    // Tiers downwards: leave 2-3 bare trunk blocks at the bottom!
    const foliageBottomY = baseY + 2 + (trunkHeight > 8 ? 1 : 0);
    let currentR = 1;
    for (let y = topY - 3; y >= foliageBottomY; y--) {
      const step = topY - y;
      const isWide = step % 2 === 0;
      if (isWide && currentR < foliageRadius) {
        currentR++;
      }
      const r = isWide ? currentR : Math.max(1, currentR - 1);

      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (dx === 0 && dz === 0 && y < topY) continue; // Preserve log trunk!
          if (r >= 2 && Math.abs(dx) === r && Math.abs(dz) === r) continue; // Truncate corners
          if (r === 1 && !isWide && Math.abs(dx) + Math.abs(dz) > 1) continue; // Cross shape

          setBlockWorld(baseX + dx, y, baseZ + dz, leafId);
        }
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
          if ((dx === 0 || dx === 1) && (dz === 0 || dz === 1) && y < baseY + height) continue;
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
            if ((dx === 0 || dx === 1) && (dz === 0 || dz === 1) && y < baseY + height) continue;
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
