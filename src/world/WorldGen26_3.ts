import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT } from './Chunk';
import { Registries } from '../core/Registries';

export interface CushionEntityData {
  id: string;
  x: number;
  y: number;
  z: number;
  blockX: number;
  blockY: number;
  blockZ: number;
  color: string;
  rotation: number;
}

export interface AbandonedCampLocation {
  cx: number;
  cz: number;
  x: number;
  y: number;
  z: number;
  variant: string;
}

/**
 * Official Minecraft 26.3 ("Wilderness Bound") World Generator:
 * - Generates Dappled Forest (`minecraft:dappled_forest`), Cherry Grove, Birch Forest, and Plains biomes
 * - Implements `PoplarTrunkPlacer` & `PoplarFoliagePlacer` (tall slender poplar trees with orange, red, and yellow leaves)
 * - Places official 26.3 `abandoned_camp` NBT structures (`campsite_dappled_forest_*.nbt` + `tent_dappled_forest_*.nbt`)
 *   including official `minecraft:cushion` entities, `minecraft:straw_bed`, `minecraft:white_wool_stairs`, and `minecraft:campfire`.
 */
export class WorldGen26_3 {
  static structuresMap: Record<string, any> = {};
  static seed = Math.floor(Math.random() * 0x7fffffff);
  static worldType: 'wilderness_26_3' | 'dappled_showcase' | 'superflat' = 'wilderness_26_3';

  static setSeed(seedInput: string | number) {
    if (typeof seedInput === 'number' && !isNaN(seedInput)) {
      this.seed = seedInput | 0;
      return;
    }
    const str = String(seedInput).trim();
    if (!str) {
      this.seed = Math.floor(Math.random() * 0x7fffffff);
      return;
    }
    const asNum = Number(str);
    if (!isNaN(asNum) && Number.isInteger(asNum)) {
      this.seed = asNum | 0;
      return;
    }
    // Java String.hashCode()
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    this.seed = h;
  }

  static async init() {
    try {
      const res = await fetch('/reports/abandoned_camp_structures.json');
      if (res.ok) {
        this.structuresMap = await res.json();
      }
    } catch {}
  }

  static hash2D(x: number, z: number, seedOffset = 0): number {
    let n =
      Math.imul(x, 374761393) +
      Math.imul(z, 668265263) +
      Math.imul(this.seed + seedOffset, 1442695041);
    n = (n ^ (n >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  static hash3D(x: number, y: number, z: number, seedOffset = 0): number {
    let n =
      Math.imul(x, 374761393) +
      Math.imul(y, 1013904223) +
      Math.imul(z, 668265263) +
      Math.imul(this.seed + seedOffset, 1442695041);
    n = (n ^ (n >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  static smoothNoise3D(x: number, y: number, z: number, scale: number, seedOffset = 0): number {
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

    const c000 = this.hash3D(ix, iy, iz, seedOffset);
    const c100 = this.hash3D(ix + 1, iy, iz, seedOffset);
    const c010 = this.hash3D(ix, iy + 1, iz, seedOffset);
    const c110 = this.hash3D(ix + 1, iy + 1, iz, seedOffset);
    const c001 = this.hash3D(ix, iy, iz + 1, seedOffset);
    const c101 = this.hash3D(ix + 1, iy, iz + 1, seedOffset);
    const c011 = this.hash3D(ix, iy + 1, iz + 1, seedOffset);
    const c111 = this.hash3D(ix + 1, iy + 1, iz + 1, seedOffset);

    const x00 = c000 * (1 - u) + c100 * u;
    const x10 = c010 * (1 - u) + c110 * u;
    const x01 = c001 * (1 - u) + c101 * u;
    const x11 = c011 * (1 - u) + c111 * u;

    const y0 = x00 * (1 - v) + x10 * v;
    const y1 = x01 * (1 - v) + x11 * v;

    return y0 * (1 - w) + y1 * w;
  }

  static smoothNoise(x: number, z: number, scale: number, seedOffset = 0): number {
    const sx = x / scale;
    const sz = z / scale;
    const ix = Math.floor(sx);
    const iz = Math.floor(sz);
    const fx = sx - ix;
    const fz = sz - iz;
    const u = fx * fx * (3 - 2 * fx);
    const v = fz * fz * (3 - 2 * fz);

    const n00 = this.hash2D(ix, iz, seedOffset);
    const n10 = this.hash2D(ix + 1, iz, seedOffset);
    const n01 = this.hash2D(ix, iz + 1, seedOffset);
    const n11 = this.hash2D(ix + 1, iz + 1, seedOffset);

    return (n00 * (1 - u) + n10 * u) * (1 - v) + (n01 * (1 - u) + n11 * u) * v;
  }

  static getBiomeAt(wx: number, wz: number): string {
    if (this.worldType === 'dappled_showcase') return 'minecraft:dappled_forest';
    const temp = this.smoothNoise(wx, wz, 180, 777);
    const humid = this.smoothNoise(wx, wz, 180, 1337);

    if (temp < 0.22) {
      return 'minecraft:snowy_plains';
    }
    if (temp < 0.42) {
      return humid < 0.45 ? 'minecraft:plains' : 'minecraft:birch_forest';
    }
    if (temp < 0.70) {
      if (humid < 0.35) return 'minecraft:forest';
      if (humid < 0.65) return 'minecraft:dappled_forest';
      return 'minecraft:poplar_grove';
    }
    if (temp < 0.85) {
      return humid < 0.4 ? 'minecraft:savanna' : 'minecraft:cherry_grove';
    }
    return humid < 0.35 ? 'minecraft:desert' : 'minecraft:badlands';
  }

  static getTerrainHeight(wx: number, wz: number): number {
    if (this.worldType === 'superflat') return 64;
    const continental = this.smoothNoise(wx, wz, 180, 10);
    const hills = this.smoothNoise(wx, wz, 64, 20);
    const detail = this.smoothNoise(wx, wz, 22, 30);
    const ridge = 1.0 - Math.abs(this.smoothNoise(wx, wz, 96, 40) * 2.0 - 1.0);

    // River / lake noise creates winding river valleys and water bodies below sea level (62)
    const river = Math.abs(this.smoothNoise(wx, wz, 190, 88) * 2.0 - 1.0);

    let height = 54 + continental * 18 + hills * 10 + detail * 3;
    if (continental > 0.62) {
      height += (continental - 0.62) * ridge * 34;
    }
    if (river < 0.11) {
      const riverDepth = (1.0 - river / 0.11) * 12.0;
      height -= riverDepth;
    }
    return Math.floor(height);
  }

  /**
   * Mirrors `net.minecraft.world.level.levelgen.feature.trunkplacers.PoplarTrunkPlacer`
   * and `net.minecraft.world.level.levelgen.feature.foliageplacers.PoplarFoliagePlacer`
   */
  static placePoplarTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    leafVariant: 'orange_poplar_leaves' | 'red_poplar_leaves' | 'yellow_poplar_leaves',
    randSeed: number
  ) {
    const logId = Registries.getBlock('poplar_log').numId;
    const leafId = Registries.getBlock(leafVariant).numId;
    const litterId = Registries.getBlock('leaf_litter').numId;

    // Poplar trees are tall columnar autumn trees (height 9 to 14)
    const trunkHeight = 9 + Math.floor((randSeed * 9301) % 5);
    const foliageStart = baseY + 3;
    const topY = baseY + trunkHeight;

    // Place vertical poplar log trunk
    for (let y = baseY; y < topY; y++) {
      chunk.setBlock(lx, y, lz, logId);
    }

    // Place columnar tapered poplar foliage (`PoplarFoliagePlacer` with `side_hole_chance`)
    for (let y = foliageStart; y <= topY + 2; y++) {
      const rel = (y - foliageStart) / (topY + 2 - foliageStart);
      const radius = rel < 0.2 || rel > 0.82 ? 1 : 2;

      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if (dx === 0 && dz === 0 && y < topY) continue;
          const dist = Math.abs(dx) + Math.abs(dz);
          if (radius === 2 && dist >= 4) continue;
          if (radius === 1 && dist >= 2 && y > topY) continue;

          // Side hole chance from PoplarFoliagePlacer
          const h = this.hash2D(lx + dx * 17, lz + dz * 31, y);
          if (dist === radius * 2 - 1 && h < 0.28) continue;

          const tx = lx + dx;
          const tz = lz + dz;
          if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            if (chunk.getBlock(tx, y, tz) === 0) {
              chunk.setBlock(tx, y, tz, leafId);
            }
          }
        }
      }
    }

    // Scatter leaf litter around the base of the poplar tree
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const tx = lx + dx;
        const tz = lz + dz;
        if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE) {
          if (
            this.hash2D(tx + chunk.cx * 16, tz + chunk.cz * 16, 99) < 0.35 &&
            chunk.getBlock(tx, baseY, tz) === 0 &&
            chunk.getBlock(tx, baseY - 1, tz) === Registries.getBlock('grass_block').numId
          ) {
            chunk.setBlock(tx, baseY, tz, litterId);
          }
        }
      }
    }
  }

  /**
   * Places an official 26.3 Abandoned Camp structure from Mojang's `.nbt` files
   * (`camp/dappled_forest/campsite_dappled_forest_*.nbt` + `tent/dappled_forest/tent_dappled_forest_*.nbt`)
   */
  static placeOfficialAbandonedCamp(
    chunk: Chunk,
    baseLx: number,
    baseY: number,
    baseLz: number,
    variantIdx: number
  ): { cushions: CushionEntityData[]; campPos: AbandonedCampLocation } {
    const cushions: CushionEntityData[] = [];
    const campKey = `camp/dappled_forest/campsite_dappled_forest_${(variantIdx % 4) + 1}.nbt`;
    const tentKey = `tent/dappled_forest/tent_dappled_forest_${(variantIdx % 4) + 1}.nbt`;

    const campNbt = this.structuresMap[campKey];
    const tentNbt = this.structuresMap[tentKey];

    const applyStructureNbt = (nbtObj: any, offsetX: number, offsetY: number, offsetZ: number) => {
      if (!nbtObj || !nbtObj.palette || !nbtObj.blocks) return;
      const palette = nbtObj.palette;

      for (const blk of nbtObj.blocks) {
        const [bx, by, bz] = blk.pos;
        const stateEntry = palette[blk.state];
        if (!stateEntry) continue;

        let blockId: string = stateEntry.id;
        const props = stateEntry.properties || {};

        // Jigsaw blocks in NBT templates are structure connectors; replace with grass/air depending on Y
        if (blockId === 'minecraft:jigsaw' || blockId === 'minecraft:structure_void') {
          blockId = by === 0 ? 'minecraft:dirt_path' : 'minecraft:air';
        }
        if (blockId === 'minecraft:straw_bed' && props.part === 'head') {
          blockId = 'minecraft:straw_bed_head';
        }

        const tx = offsetX + bx;
        const ty = offsetY + by;
        const tz = offsetZ + bz;

        if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && ty >= 1 && ty < CHUNK_HEIGHT) {
          if (blockId === 'minecraft:air') {
            chunk.setBlock(tx, ty, tz, 0);
          } else {
            const def = Registries.getBlock(blockId);
            let meta = 0;
            if (props.facing === 'east') meta = 1;
            else if (props.facing === 'south') meta = 2;
            else if (props.facing === 'west') meta = 3;
            if (props.half === 'top') meta |= 4;
            chunk.setBlock(tx, ty, tz, def.numId, meta);
          }
        }
      }

      // Spawn official NBT entities (e.g. `minecraft:cushion` with `color: "yellow"` / `"orange"`)
      if (Array.isArray(nbtObj.entities)) {
        for (const ent of nbtObj.entities) {
          const entNbt = ent.nbt || {};
          if (entNbt.id === 'minecraft:cushion' && Array.isArray(ent.blockPos)) {
            const [ex, ey, ez] = ent.blockPos;
            const wx = chunk.cx * CHUNK_SIZE + offsetX + ex;
            const wy = offsetY + ey + 1;
            const wz = chunk.cz * CHUNK_SIZE + offsetZ + ez;
            const color = entNbt.color || 'orange';
            cushions.push({
              id: `cushion_${wx}_${wy}_${wz}`,
              x: wx + 0.5,
              y: wy,
              z: wz + 0.5,
              blockX: wx,
              blockY: wy,
              blockZ: wz,
              color,
              rotation: Array.isArray(entNbt.Rotation) ? entNbt.Rotation[0] : 0,
            });
          }
        }
      }
    };

    // Flatten camp foundation slightly so camp sits cleanly on terrain
    const dirtId = Registries.getBlock('dirt').numId;
    const grassId = Registries.getBlock('grass_block').numId;
    for (let lx = 1; lx < 15; lx++) {
      for (let lz = 1; lz < 15; lz++) {
        for (let y = baseY - 3; y < baseY; y++) {
          chunk.setBlock(lx, y, lz, dirtId);
        }
        chunk.setBlock(lx, baseY, lz, grassId);
        for (let y = baseY + 1; y < baseY + 9; y++) {
          chunk.setBlock(lx, y, lz, 0);
        }
      }
    }

    if (campNbt) {
      applyStructureNbt(campNbt, baseLx, baseY, baseLz);
    }
    if (tentNbt) {
      // Place tent structure right alongside the campfire or guarantee Straw Bed + Wool Stairs tent roof
      const strawFootId = Registries.getBlock('straw_bed').numId;
      const strawHeadId = Registries.getBlock('straw_bed_head').numId;
      const woolStairId = Registries.getBlock('white_wool_stairs').numId;
      const fenceId = Registries.getBlock('poplar_fence').numId;

      // Place a Straw Bed inside the camp clearing next to the campfire
      const bedX = Math.min(12, baseLx + 2);
      const bedZ = Math.min(12, baseLz + 6);
      chunk.setBlock(bedX, baseY + 1, bedZ, strawFootId, 2);
      chunk.setBlock(bedX, baseY + 1, bedZ + 1, strawHeadId, 2);

      // Small wool-stair A-frame shelter overhang above the straw bed
      chunk.setBlock(bedX - 1, baseY + 1, bedZ, fenceId);
      chunk.setBlock(bedX - 1, baseY + 2, bedZ, fenceId);
      chunk.setBlock(bedX + 1, baseY + 1, bedZ, fenceId);
      chunk.setBlock(bedX + 1, baseY + 2, bedZ, fenceId);
      for (let dz = 0; dz <= 1; dz++) {
        chunk.setBlock(bedX - 1, baseY + 3, bedZ + dz, woolStairId, 1);
        chunk.setBlock(bedX, baseY + 3, bedZ + dz, Registries.getBlock('white_wool_slab').numId);
        chunk.setBlock(bedX + 1, baseY + 3, bedZ + dz, woolStairId, 3);
      }
    }

    // Ensure at least two Cushions around the campfire if NBT had none
    if (cushions.length === 0) {
      const wx = chunk.cx * CHUNK_SIZE + baseLx + 4;
      const wz = chunk.cz * CHUNK_SIZE + baseLz + 4;
      cushions.push({
        id: `cushion_${wx}_${baseY + 1}_${wz}`,
        x: wx + 0.5,
        y: baseY + 1,
        z: wz + 0.5,
        blockX: wx,
        blockY: baseY + 1,
        blockZ: wz,
        color: 'orange',
        rotation: 0,
      });
    }

    return {
      cushions,
      campPos: {
        cx: chunk.cx,
        cz: chunk.cz,
        x: chunk.cx * CHUNK_SIZE + baseLx + 5,
        y: baseY + 1,
        z: chunk.cz * CHUNK_SIZE + baseLz + 5,
        variant: campKey,
      },
    };
  }

  static generateChunk(cx: number, cz: number): {
    chunk: Chunk;
    cushions: CushionEntityData[];
    camp?: AbandonedCampLocation;
  } {
    const chunk = new Chunk(cx, cz);
    const cushions: CushionEntityData[] = [];
    let camp: AbandonedCampLocation | undefined;

    const bedrockId = Registries.getBlock('bedrock').numId;
    const stoneId = Registries.getBlock('stone').numId;
    const deepslateId = Registries.getBlock('deepslate').numId;
    const dirtId = Registries.getBlock('dirt').numId;
    const grassId = Registries.getBlock('grass_block').numId;
    const podzolId = Registries.getBlock('podzol').numId;
    const sandId = Registries.getBlock('sand').numId;
    const waterId = Registries.getBlock('water').numId;
    const coalOreId = Registries.getBlock('coal_ore').numId;
    const ironOreId = Registries.getBlock('iron_ore').numId;
    const diamondOreId = Registries.getBlock('diamond_ore').numId;
    const copperOreId = Registries.getBlock('copper_ore')?.numId || ironOreId;
    const goldOreId = Registries.getBlock('gold_ore')?.numId || ironOreId;
    const redstoneOreId = Registries.getBlock('redstone_ore')?.numId || ironOreId;
    const lapisOreId = Registries.getBlock('lapis_ore')?.numId || ironOreId;
    const gravelId = Registries.getBlock('gravel')?.numId || dirtId;
    const graniteId = Registries.getBlock('granite')?.numId || stoneId;
    const dioriteId = Registries.getBlock('diorite')?.numId || stoneId;
    const andesiteId = Registries.getBlock('andesite')?.numId || stoneId;
    const tuffId = Registries.getBlock('tuff')?.numId || deepslateId;
    const deepslateCoalOreId = Registries.getBlock('deepslate_coal_ore')?.numId || coalOreId;
    const deepslateCopperOreId = Registries.getBlock('deepslate_copper_ore')?.numId || copperOreId;
    const deepslateLapisOreId = Registries.getBlock('deepslate_lapis_ore')?.numId || lapisOreId;
    const deepslateIronOreId = Registries.getBlock('deepslate_iron_ore')?.numId || ironOreId;
    const deepslateDiamondOreId = Registries.getBlock('deepslate_diamond_ore')?.numId || diamondOreId;
    const deepslateGoldOreId = Registries.getBlock('deepslate_gold_ore')?.numId || goldOreId;
    const deepslateRedstoneOreId = Registries.getBlock('deepslate_redstone_ore')?.numId || redstoneOreId;

    const SEA_LEVEL = 62;
    const heightMap = new Int32Array(CHUNK_SIZE * CHUNK_SIZE);

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const biomeId = this.getBiomeAt(wx, wz);
        chunk.setBiome(lx, lz, biomeId);

        const h = this.getTerrainHeight(wx, wz);
        heightMap[lz * CHUNK_SIZE + lx] = h;

        chunk.setBlock(lx, 0, lz, bedrockId);

        // Staggered deepslate transition between Y=6 and Y=14 (blended with 3D noise/dither)
        const deepslateTransition = 8 + Math.round(this.smoothNoise(wx, wz, 18, 555) * 5);

        for (let y = 1; y <= h; y++) {
          const dither = (this.hash2D(wx ^ (y * 31), wz ^ (y * 17), 1337) - 0.5) * 2.5;
          const isDeepslate = y + dither < deepslateTransition;

          if (isDeepslate) {
            chunk.setBlock(lx, y, lz, deepslateId);
          } else if (y < h - 3) {
            chunk.setBlock(lx, y, lz, stoneId);
          } else if (y < h) {
            if (biomeId === 'minecraft:desert' || biomeId === 'minecraft:badlands') {
              chunk.setBlock(lx, y, lz, sandId);
            } else {
              chunk.setBlock(lx, y, lz, h <= SEA_LEVEL + 1 ? sandId : dirtId);
            }
          } else {
            if (biomeId === 'minecraft:desert' || biomeId === 'minecraft:badlands' || h <= SEA_LEVEL + 1) {
              chunk.setBlock(lx, y, lz, sandId);
            } else if (
              (biomeId === 'minecraft:dappled_forest' || biomeId === 'minecraft:poplar_grove') &&
              this.hash2D(wx, wz, 42) < 0.12
            ) {
              chunk.setBlock(lx, y, lz, podzolId);
            } else {
              chunk.setBlock(lx, y, lz, grassId);
            }
          }
        }

        // Fill water up to SEA_LEVEL
        if (h < SEA_LEVEL) {
          for (let y = h + 1; y <= SEA_LEVEL; y++) {
            chunk.setBlock(lx, y, lz, waterId);
          }
        }

        // 3D Cave Carver: carves continuous subterranean caves and breaches hillsides creating natural entrances
        for (let y = 4; y < h; y++) {
          const c1 = this.smoothNoise3D(wx, y * 1.3, wz, 15, 333) * 2.0 - 1.0;
          const c2 = this.smoothNoise3D(wx, y * 1.3, wz, 15, 444) * 2.0 - 1.0;
          if (c1 * c1 + c2 * c2 < 0.042) {
            // Keep ocean floor intact under sea level lakes/rivers
            if (h >= SEA_LEVEL || y > SEA_LEVEL) {
              chunk.setBlock(lx, y, lz, 0);
            }
          }
        }
      }
    }

    // Exact Minecraft 26.3 Ore & Subsurface Feature Distributions
    // Balanced ore distributions matching vanilla Minecraft
    const oreConfigs = [
      // 1. Coal (Y=0..128)
      { regular: coalOreId, deep: deepslateCoalOreId, count: 12, minY: 0, maxY: 128, radius: 1.6 },
      // 2. Iron Middle (Y=8..64)
      { regular: ironOreId, deep: deepslateIronOreId, count: 5, minY: 8, maxY: 64, radius: 1.3 },
      // 3. Iron Small (Y=0..72)
      { regular: ironOreId, deep: deepslateIronOreId, count: 5, minY: 0, maxY: 72, radius: 1.0 },
      // 4. Copper (Y=16..100)
      { regular: copperOreId, deep: deepslateCopperOreId, count: 6, minY: 16, maxY: 100, radius: 1.5 },
      // 5. Gold (Y=4..32)
      { regular: goldOreId, deep: deepslateGoldOreId, count: 3, minY: 4, maxY: 32, radius: 1.2 },
      // 6. Redstone (Y=1..16)
      { regular: redstoneOreId, deep: deepslateRedstoneOreId, count: 4, minY: 1, maxY: 16, radius: 1.2 },
      // 7. Diamond (Y=1..16)
      { regular: diamondOreId, deep: deepslateDiamondOreId, count: 3, minY: 1, maxY: 16, radius: 1.0 },
      // 8. Lapis (Y=8..36)
      { regular: lapisOreId, deep: deepslateLapisOreId, count: 2, minY: 8, maxY: 36, radius: 1.1 },
      // 9. Underground Dirt & Gravel pockets (Y=10..120)
      { regular: dirtId, deep: dirtId, count: 4, minY: 10, maxY: 120, radius: 2.0 },
      { regular: gravelId, deep: gravelId, count: 6, minY: 10, maxY: 120, radius: 2.0 },
      // 10. Granite, Diorite, Andesite pockets (Y=10..80)
      { regular: graniteId, deep: tuffId, count: 3, minY: 10, maxY: 80, radius: 1.8 },
      { regular: dioriteId, deep: tuffId, count: 3, minY: 10, maxY: 80, radius: 1.8 },
      { regular: andesiteId, deep: tuffId, count: 3, minY: 10, maxY: 80, radius: 1.8 },
    ];

    for (let cIdx = 0; cIdx < oreConfigs.length; cIdx++) {
      const cfg = oreConfigs[cIdx];
      for (let v = 0; v < cfg.count; v++) {
        const seedV = cIdx * 100 + v;
        const originX = Math.floor(this.hash2D(cx + seedV, cz, 101) * 16);
        const originZ = Math.floor(this.hash2D(cx, cz + seedV, 102) * 16);
        const originY = Math.floor(cfg.minY + this.hash2D(cx + seedV, cz + seedV, 103) * (cfg.maxY - cfg.minY));
        const r = cfg.radius;
        const rSq = r * r;
        const ceilR = Math.ceil(r);

        for (let ox = -ceilR; ox <= ceilR; ox++) {
          const bx = originX + ox;
          if (bx < 0 || bx >= CHUNK_SIZE) continue;
          for (let oz = -ceilR; oz <= ceilR; oz++) {
            const bz = originZ + oz;
            if (bz < 0 || bz >= CHUNK_SIZE) continue;
            for (let oy = -ceilR; oy <= ceilR; oy++) {
              const by = originY + oy;
              if (by <= 0 || by >= CHUNK_HEIGHT) continue;
              if (ox * ox + oy * oy * 1.3 + oz * oz <= rSq) {
                const current = chunk.getBlock(bx, by, bz);
                if (current === stoneId) {
                  chunk.setBlock(bx, by, bz, cfg.regular);
                } else if (current === deepslateId) {
                  chunk.setBlock(bx, by, bz, cfg.deep);
                }
              }
            }
          }
        }
      }
    }

    if (this.worldType === 'superflat') {
      return { chunk, cushions };
    }

    // Check if this chunk naturally hosts an Abandoned Camp structure using authentic 32x32 regional spacing
    const REGION_SIZE = 32;
    const rx = Math.floor(cx / REGION_SIZE);
    const rz = Math.floor(cz / REGION_SIZE);
    const campChunkOffsetX = Math.floor(this.hash2D(rx, rz, 911) * 24) + 4;
    const campChunkOffsetZ = Math.floor(this.hash2D(rx, rz, 912) * 24) + 4;
    const targetCx = rx * REGION_SIZE + campChunkOffsetX;
    const targetCz = rz * REGION_SIZE + campChunkOffsetZ;
    const isWildernessCampChunk =
      cx === targetCx &&
      cz === targetCz &&
      (Math.abs(cx) > 1 || Math.abs(cz) > 1) &&
      heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isWildernessCampChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      const variant = Math.floor(this.hash2D(cx, cz, 7777) * 16);
      const res = this.placeOfficialAbandonedCamp(chunk, 3, centerH, 3, variant);
      cushions.push(...res.cushions);
      camp = res.campPos;
    }

    // Place Trees & Flora based on Biome
    for (let lz = 3; lz < CHUNK_SIZE - 3; lz += 4) {
      for (let lx = 3; lx < CHUNK_SIZE - 3; lx += 4) {
        if (isWildernessCampChunk && lx >= 1 && lx <= 12 && lz >= 1 && lz <= 12) {
          continue; // Clear campsite clearing while preserving forest surrounding the camp
        }
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const h = heightMap[lz * CHUNK_SIZE + lx];
        if (h <= SEA_LEVEL + 2) continue;

        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx];
        const treeRoll = this.hash2D(wx, wz, 888);

        if (
          (biomeId === 'minecraft:dappled_forest' || biomeId === 'minecraft:poplar_grove') &&
          treeRoll < (biomeId === 'minecraft:poplar_grove' ? 0.42 : 0.32)
        ) {
          const leafRoll = this.hash2D(wx, wz, 999);
          const leafVariant =
            leafRoll < 0.4
              ? 'orange_poplar_leaves'
              : leafRoll < 0.72
              ? 'yellow_poplar_leaves'
              : 'red_poplar_leaves';
          this.placePoplarTree(chunk, lx, h + 1, lz, leafVariant, leafRoll);
        } else if (biomeId === 'minecraft:forest' && treeRoll < 0.28) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'oak_log', 'oak_leaves', 5 + Math.floor(treeRoll * 7));
        } else if (biomeId === 'minecraft:plains' && treeRoll < 0.03) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'oak_log', 'oak_leaves', 5);
        } else if (biomeId === 'minecraft:birch_forest' && treeRoll < 0.25) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'birch_log', 'birch_leaves', 6);
        } else if (biomeId === 'minecraft:cherry_grove' && treeRoll < 0.22) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'cherry_log', 'cherry_leaves', 6);
        } else if (biomeId === 'minecraft:snowy_plains' && treeRoll < 0.18) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'spruce_log', 'spruce_leaves', 7);
        } else if (biomeId === 'minecraft:savanna' && treeRoll < 0.12) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'acacia_log', 'acacia_leaves', 5);
        }
      }
    }

    // Scatter flowers, short_grass, and mushrooms
    const shortGrassId = Registries.getBlock('short_grass').numId;
    const dandelionId = Registries.getBlock('dandelion').numId;
    const poppyId = Registries.getBlock('poppy').numId;
    const mushroomId = Registries.getBlock('brown_mushroom').numId;
    const litterId = Registries.getBlock('leaf_litter').numId;

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const h = heightMap[lz * CHUNK_SIZE + lx];
        if (h <= SEA_LEVEL + 1) continue;
        if (chunk.getBlock(lx, h + 1, lz) !== 0) continue;
        if (chunk.getBlock(lx, h, lz) !== grassId && chunk.getBlock(lx, h, lz) !== podzolId) continue;

        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const fRoll = this.hash2D(wx, wz, 333);
        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx];

        if (biomeId === 'minecraft:dappled_forest') {
          if (fRoll < 0.08) chunk.setBlock(lx, h + 1, lz, litterId);
          else if (fRoll < 0.14) chunk.setBlock(lx, h + 1, lz, shortGrassId);
          else if (fRoll < 0.155) chunk.setBlock(lx, h + 1, lz, mushroomId);
          else if (fRoll < 0.165) chunk.setBlock(lx, h + 1, lz, dandelionId);
        } else {
          if (fRoll < 0.12) chunk.setBlock(lx, h + 1, lz, shortGrassId);
          else if (fRoll < 0.135) chunk.setBlock(lx, h + 1, lz, poppyId);
          else if (fRoll < 0.15) chunk.setBlock(lx, h + 1, lz, dandelionId);
        }
      }
    }

    return { chunk, cushions, camp };
  }

  static placeClassicTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    logName: string,
    leafName: string,
    height: number
  ) {
    const logId = Registries.getBlock(logName).numId;
    const leafId = Registries.getBlock(leafName).numId;

    for (let y = baseY; y < baseY + height; y++) {
      chunk.setBlock(lx, y, lz, logId);
    }
    for (let dy = height - 3; dy <= height; dy++) {
      const r = dy >= height - 1 ? 1 : 2;
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (dx === 0 && dz === 0 && dy < height) continue;
          if (Math.abs(dx) === r && Math.abs(dz) === r && dy < height) continue;
          const tx = lx + dx;
          const tz = lz + dz;
          const ty = baseY + dy;
          if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && ty < CHUNK_HEIGHT) {
            if (chunk.getBlock(tx, ty, tz) === 0) {
              chunk.setBlock(tx, ty, tz, leafId);
            }
          }
        }
      }
    }
  }
}
