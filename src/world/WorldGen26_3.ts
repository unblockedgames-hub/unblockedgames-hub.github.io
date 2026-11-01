import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT } from './Chunk';
import { Registries } from '../core/Registries';
import structuresBundle from './structures_bundle.json';
import { VanillaClimate } from './VanillaNoise';

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
  static structuresMap: Record<string, any> = { ...(structuresBundle as any) };
  static seed = Math.floor(Math.random() * 0x7fffffff);
  static worldType: 'default' | 'superflat' | 'large_biomes' | 'amplified' | 'single_biome' | 'wilderness_26_3' = 'default';
  static singleBiomeChoice = 'minecraft:plains';
  static generateStructures = true;
  static bonusChest = false;
  static vanillaClimate = new VanillaClimate(WorldGen26_3.seed);

  static setSeed(seedInput: string | number) {
    if (typeof seedInput === 'number' && !isNaN(seedInput)) {
      this.seed = seedInput | 0;
    } else {
      const str = String(seedInput).trim();
      if (!str) {
        this.seed = Math.floor(Math.random() * 0x7fffffff);
      } else {
        const asNum = Number(str);
        if (!isNaN(asNum) && Number.isInteger(asNum)) {
          this.seed = asNum | 0;
        } else {
          // Java String.hashCode()
          let h = 0;
          for (let i = 0; i < str.length; i++) {
            h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
          }
          this.seed = h;
        }
      }
    }
    this.vanillaClimate.setSeed(this.seed);
  }

  static getSpawnCoords(): { x: number; z: number } {
    return this.vanillaClimate.getSpawnCoords();
  }

  static async init() {
    try {
      const res = await fetch('/reports/abandoned_camp_structures.json');
      if (res.ok) {
        Object.assign(this.structuresMap, await res.json());
      }
    } catch {}
    try {
      const res2 = await fetch('/reports/structures_bundle.json');
      if (res2.ok) {
        Object.assign(this.structuresMap, await res2.json());
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

  static octaveNoise(x: number, z: number, baseScale: number, octaves: number, offset = 0): number {
    let sum = 0;
    let max = 0;
    let amp = 1.0;
    let scale = baseScale;
    for (let i = 0; i < octaves; i++) {
      sum += (this.smoothNoise(x, z, scale, offset + i * 37) * 2 - 1) * amp;
      max += amp;
      amp *= 0.5;
      scale *= 0.5;
    }
    return sum / max;
  }

  static sampleClimate(wx: number, wz: number): {
    temp: number;
    humid: number;
    cont: number;
    erosion: number;
    weird: number;
  } {
    let x = wx;
    let z = wz;
    if (this.worldType === 'large_biomes') {
      x *= 0.25;
      z *= 0.25;
    }
    const c = this.vanillaClimate.sampleClimate(x, z);
    return {
      temp: c.temp,
      humid: c.humid,
      cont: c.cont,
      erosion: c.erosion,
      weird: c.ridge
    };
  }

  static getBiomeAt(wx: number, wz: number, wy = 64): string {
    if (this.worldType === 'superflat') return 'minecraft:plains';
    if (this.worldType === 'single_biome') return this.singleBiomeChoice;

    let x = wx;
    let z = wz;
    if (this.worldType === 'large_biomes') {
      x *= 0.25;
      z *= 0.25;
    }
    return this.vanillaClimate.getBiomeAt(x, z, wy);
  }

  static findNearestBiome(
    px: number,
    pz: number,
    targetBiome: string
  ): { x: number; z: number; dist: number } | null {
    const rawTarget = targetBiome.toLowerCase().replace('minecraft:', '');
    const normTarget = `minecraft:${rawTarget}`;

    const cur = this.getBiomeAt(px, pz);
    if (cur === normTarget || cur.replace('minecraft:', '') === rawTarget) {
      return { x: Math.floor(px), z: Math.floor(pz), dist: 0 };
    }

    // Outward spiral search sampling up to 3840 blocks away
    for (let r = 32; r <= 3840; r += 48) {
      const stepCount = Math.max(8, Math.floor((r * 2 * Math.PI) / 48));
      for (let s = 0; s < stepCount; s++) {
        const ang = (s / stepCount) * Math.PI * 2;
        const tx = Math.floor(px + Math.cos(ang) * r);
        const tz = Math.floor(pz + Math.sin(ang) * r);
        const sample = this.getBiomeAt(tx, tz);
        if (sample === normTarget || sample.replace('minecraft:', '') === rawTarget) {
          const d = Math.round(Math.hypot(tx - px, tz - pz));
          return { x: tx, z: tz, dist: d };
        }
      }
    }
    return null;
  }

  static getStructureChunk(rx: number, rz: number, structType: string): { cx: number; cz: number } {
    let norm = structType.toLowerCase().replace('minecraft:', '');
    if (norm.startsWith('village')) norm = 'village';
    else if (norm.startsWith('abandoned_camp')) norm = 'abandoned_camp';
    else if (norm.startsWith('ruined_portal')) norm = 'ruined_portal';
    else if (norm.startsWith('desert_pyramid')) norm = 'desert_pyramid';
    else if (norm.startsWith('jungle_pyramid')) norm = 'jungle_pyramid';
    else if (norm.startsWith('igloo')) norm = 'igloo';
    else if (norm.startsWith('swamp_hut')) norm = 'swamp_hut';
    else if (norm.startsWith('pillager_outpost')) norm = 'pillager_outpost';

    let structHash = this.seed ^ 0x5a5a;
    for (let i = 0; i < norm.length; i++) {
      structHash = (Math.imul(31, structHash) + norm.charCodeAt(i)) | 0;
    }
    structHash = Math.abs(structHash);

    const spacing = norm.includes('mansion') ? 80 : norm.includes('ruined_portal') ? 24 : 32;
    const offX = Math.floor(this.hash2D(rx, rz, (structHash % 1000) + 11) * (spacing - 8) + 4);
    const offZ = Math.floor(this.hash2D(rx, rz, (structHash % 1000) + 22) * (spacing - 8) + 4);
    return {
      cx: rx * spacing + offX,
      cz: rz * spacing + offZ,
    };
  }

  static findNearestStructure(
    px: number,
    pz: number,
    targetStructure: string
  ): { x: number; z: number; dist: number } {
    const norm = targetStructure.startsWith('minecraft:') ? targetStructure : `minecraft:${targetStructure}`;
    const spacing = norm.includes('mansion') ? 80 : norm.includes('ruined_portal') ? 24 : 32;
    const regSize = spacing * 16;
    const regX = Math.floor(px / regSize);
    const regZ = Math.floor(pz / regSize);

    let bestDist = Infinity;
    let bestX = Math.floor(px);
    let bestZ = Math.floor(pz);

    for (let dx = -5; dx <= 5; dx++) {
      for (let dz = -5; dz <= 5; dz++) {
        const rx = regX + dx;
        const rz = regZ + dz;
        const target = this.getStructureChunk(rx, rz, norm);
        const sx = target.cx * 16 + 8;
        const sz = target.cz * 16 + 8;
        const biome = this.getBiomeAt(sx, sz);

        if (norm.includes('desert') && !biome.includes('desert') && !biome.includes('badlands')) continue;
        if (norm.includes('jungle') && !biome.includes('jungle')) continue;
        if (norm.includes('swamp') && !biome.includes('swamp')) continue;
        if (norm.includes('snowy') && !biome.includes('snowy') && !biome.includes('ice')) continue;
        if (norm.includes('taiga') && !biome.includes('taiga')) continue;
        if (norm.includes('savanna') && !biome.includes('savanna')) continue;

        const d = Math.hypot(sx - px, sz - pz);
        if (d < bestDist) {
          bestDist = d;
          bestX = sx;
          bestZ = sz;
        }
      }
    }

    if (bestDist === Infinity) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          const rx = regX + dx;
          const rz = regZ + dz;
          const target = this.getStructureChunk(rx, rz, norm);
          const sx = target.cx * 16 + 8;
          const sz = target.cz * 16 + 8;
          const d = Math.hypot(sx - px, sz - pz);
          if (d < bestDist) {
            bestDist = d;
            bestX = sx;
            bestZ = sz;
          }
        }
      }
    }

    return { x: bestX, z: bestZ, dist: Math.round(bestDist) };
  }

  static getTerrainHeight(wx: number, wz: number): number {
    if (this.worldType === 'superflat') return 3;
    let x = wx;
    let z = wz;
    if (this.worldType === 'large_biomes') {
      x *= 0.25;
      z *= 0.25;
    }
    const continental = this.smoothNoise(x, z, 180, 10);
    const hills = this.smoothNoise(x, z, 64, 20);
    const detail = this.smoothNoise(x, z, 22, 30);
    const ridge = 1.0 - Math.abs(this.smoothNoise(x, z, 96, 40) * 2.0 - 1.0);

    const river = Math.abs(this.smoothNoise(x, z, 190, 88) * 2.0 - 1.0);

    const ampMult = this.worldType === 'amplified' ? 2.0 : 1.0;
    let height = 54 + (continental * 18 + hills * 10 + detail * 3) * ampMult;
    if (continental > 0.62) {
      height += (continental - 0.62) * ridge * 34 * ampMult;
    }
    if (this.worldType === 'amplified' && continental > 0.45) {
      height += (continental - 0.45) * ridge * 60;
    }
    if (river < 0.11) {
      const riverDepth = (1.0 - river / 0.11) * 12.0;
      height -= riverDepth;
    }
    return Math.max(1, Math.min(250, Math.floor(height)));
  }

  static getBlockAt(wx: number, wy: number, wz: number): number {
    if (wy <= 0) return Registries.getBlock('bedrock').numId;
    if (wy >= CHUNK_HEIGHT) return 0;
    const h = this.getTerrainHeight(wx, wz);
    if (wy <= h) return Registries.getBlock('stone').numId;
    if (wy <= 62) return Registries.getBlock('water').numId;
    return 0;
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

  static placeJungleTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    roll: number
  ) {
    const logId = Registries.getBlock('jungle_log').numId;
    const leafId = Registries.getBlock('jungle_leaves').numId;
    const vineId = Registries.getBlock('vine')?.numId || 0;
    const cocoaId = Registries.getBlock('cocoa')?.numId || 0;

    const isMega = roll < 0.22 && lx < CHUNK_SIZE - 2 && lz < CHUNK_SIZE - 2;
    if (isMega) {
      // 2x2 Mega Jungle Tree (16-24 blocks tall)
      const height = 16 + Math.floor(roll * 28);
      for (let y = baseY; y < baseY + height; y++) {
        chunk.setBlock(lx, y, lz, logId);
        chunk.setBlock(lx + 1, y, lz, logId);
        chunk.setBlock(lx, y, lz + 1, logId);
        chunk.setBlock(lx + 1, y, lz + 1, logId);
        if (vineId && y > baseY + 2 && y % 3 === 0) {
          if (lx > 0) chunk.setBlock(lx - 1, y, lz, vineId);
          if (lz > 0) chunk.setBlock(lx, y, lz - 1, vineId);
        }
      }
      // Mega canopy
      for (let dy = height - 4; dy <= height + 1; dy++) {
        const rad = dy === height + 1 ? 2 : dy >= height - 1 ? 3 : 2;
        for (let dx = -rad; dx <= rad + 1; dx++) {
          for (let dz = -rad; dz <= rad + 1; dz++) {
            const bx = lx + dx;
            const bz = lz + dz;
            if (bx >= 0 && bx < CHUNK_SIZE && bz >= 0 && bz < CHUNK_SIZE) {
              if (chunk.getBlock(bx, baseY + dy, bz) === 0) {
                chunk.setBlock(bx, baseY + dy, bz, leafId);
              }
            }
          }
        }
      }
    } else {
      // Standard Jungle Tree (7-11 blocks tall)
      const height = 7 + Math.floor(roll * 5);
      for (let y = baseY; y < baseY + height; y++) {
        chunk.setBlock(lx, y, lz, logId);
        if (cocoaId && y === baseY + 3 && lx > 0 && roll < 0.3) {
          chunk.setBlock(lx - 1, y, lz, cocoaId);
        }
      }
      for (let dy = height - 3; dy <= height + 1; dy++) {
        const rad = dy > height - 1 ? 1 : 2;
        for (let dx = -rad; dx <= rad; dx++) {
          for (let dz = -rad; dz <= rad; dz++) {
            const bx = lx + dx;
            const bz = lz + dz;
            if (bx >= 0 && bx < CHUNK_SIZE && bz >= 0 && bz < CHUNK_SIZE) {
              if (chunk.getBlock(bx, baseY + dy, bz) === 0) {
                chunk.setBlock(bx, baseY + dy, bz, leafId);
              }
            }
          }
        }
      }
    }
  }

  static placeBambooStalk(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    height: number
  ) {
    const bambooId = Registries.getBlock('bamboo')?.numId || Registries.getBlock('sugar_cane')?.numId || 0;
    if (!bambooId) return;
    for (let y = baseY; y < baseY + height; y++) {
      chunk.setBlock(lx, y, lz, bambooId);
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

  static applyStructureTemplate(
    chunk: Chunk,
    templateKey: string,
    offsetX: number,
    baseY: number,
    offsetZ: number,
    foundationBlock: string = 'cobblestone'
  ): { size: [number, number, number]; placed: boolean } {
    const nbtObj = this.structuresMap[templateKey];
    if (!nbtObj || !nbtObj.palette || !nbtObj.blocks) {
      return { size: [0, 0, 0], placed: false };
    }

    const palette = nbtObj.palette;
    const size: [number, number, number] = nbtObj.size || [10, 10, 10];
    const [sx, sy, sz] = size;
    const foundationId = Registries.getBlock(foundationBlock)?.numId || Registries.getBlock('cobblestone').numId;

    // 1. Fill solid foundation under footprint down to terrain
    for (let bx = 0; bx < sx; bx++) {
      for (let bz = 0; bz < sz; bz++) {
        const tx = offsetX + bx;
        const tz = offsetZ + bz;
        if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE) {
          for (let y = baseY - 1; y >= baseY - 12; y--) {
            if (y < 1) break;
            const cur = chunk.getBlock(tx, y, tz);
            if (cur === 0 || cur === Registries.getBlock('water')?.numId || cur === Registries.getBlock('short_grass')?.numId) {
              chunk.setBlock(tx, y, tz, foundationId);
            } else {
              break;
            }
          }
        }
      }
    }

    // 2. Place template blocks
    for (const blk of nbtObj.blocks) {
      const [bx, by, bz] = blk.pos;
      const stateEntry = palette[blk.state];
      if (!stateEntry) continue;

      let blockId: string = stateEntry.id;
      const props = stateEntry.properties || {};

      // Structure connectors
      if (blockId === 'minecraft:jigsaw' || blockId === 'minecraft:structure_void') {
        continue;
      }

      const tx = offsetX + bx;
      const ty = baseY + by;
      const tz = offsetZ + bz;

      if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && ty >= 1 && ty < CHUNK_HEIGHT) {
        if (blockId === 'minecraft:air' || blockId === 'minecraft:cave_air') {
          chunk.setBlock(tx, ty, tz, 0);
          continue;
        }

        // Normalize beds
        if (blockId.endsWith('_bed') && props.part === 'head') {
          blockId = 'minecraft:straw_bed_head';
        }

        const def = Registries.getBlock(blockId);
        if (!def) continue;

        let meta = 0;
        if (props.facing === 'east') meta = 1;
        else if (props.facing === 'south') meta = 2;
        else if (props.facing === 'west') meta = 3;
        if (props.half === 'top') meta |= 4;
        chunk.setBlock(tx, ty, tz, def.numId, meta);
      }
    }

    return { size, placed: true };
  }

  static placeVillagePiece(
    chunk: Chunk,
    cx: number,
    cz: number,
    centerCx: number,
    centerCz: number,
    baseY: number,
    villageBiome: string
  ): { villagers: Array<{ type: string; x: number; y: number; z: number }> } {
    const villagers: Array<{ type: string; x: number; y: number; z: number }> = [];
    const dx = cx - centerCx;
    const dz = cz - centerCz;

    let biomeKey = 'plains';
    let pathBlock = 'dirt_path';
    let foundationBlock = 'cobblestone';

    if (villageBiome.includes('desert') || villageBiome.includes('badlands')) {
      biomeKey = 'desert';
      pathBlock = 'sandstone';
      foundationBlock = 'sandstone';
    } else if (villageBiome.includes('taiga')) {
      biomeKey = 'taiga';
      pathBlock = 'dirt_path';
      foundationBlock = 'cobblestone';
    } else if (villageBiome.includes('savanna')) {
      biomeKey = 'savanna';
      pathBlock = 'dirt_path';
      foundationBlock = 'acacia_planks';
    } else if (villageBiome.includes('snowy') || villageBiome.includes('ice')) {
      biomeKey = 'snowy';
      pathBlock = 'dirt_path';
      foundationBlock = 'diorite';
    }

    const pathId = Registries.getBlock(pathBlock)?.numId || Registries.getBlock('dirt_path')?.numId || 2;
    const fenceId = Registries.getBlock(biomeKey === 'taiga' ? 'spruce_fence' : biomeKey === 'savanna' ? 'acacia_fence' : 'oak_fence')?.numId || 10;
    const torchId = Registries.getBlock('torch')?.numId || 50;

    let templateKey = '';
    let spawnCount = 0;
    let spawnGolem = false;

    if (dx === 0 && dz === 0) {
      templateKey = `village/${biomeKey}/town_centers/${biomeKey}_meeting_point_1`;
      spawnCount = 2;
      spawnGolem = true;
    } else if (dx === 0 && dz === 1) {
      templateKey =
        biomeKey === 'snowy'
          ? 'village/snowy/houses/snowy_farm_1'
          : biomeKey === 'desert'
          ? 'village/desert/houses/desert_farm_1'
          : `village/${biomeKey}/houses/${biomeKey}_large_farm_1`;
      spawnCount = 1;
    } else if (dx === 1 && dz === 0) {
      templateKey =
        biomeKey === 'savanna' || biomeKey === 'snowy'
          ? `village/${biomeKey}/houses/${biomeKey}_butchers_shop_1`
          : `village/${biomeKey}/houses/${biomeKey}_butcher_shop_1`;
      spawnCount = 1;
    } else if (dx === -1 && dz === 0) {
      templateKey = `village/${biomeKey}/houses/${biomeKey}_small_house_1`;
      spawnCount = 1;
    } else if (dx === 0 && dz === -1) {
      templateKey = `village/${biomeKey}/houses/${biomeKey}_medium_house_1`;
      spawnCount = 1;
    } else if (Math.abs(dx) === 1 && Math.abs(dz) === 1) {
      const houseNum = ((Math.abs(dx * 3 + dz * 7)) % 3) + 2;
      templateKey = `village/${biomeKey}/houses/${biomeKey}_small_house_${houseNum}`;
      spawnCount = 1;
    }

    if (templateKey) {
      const nbt = this.structuresMap[templateKey];
      const sx = nbt?.size?.[0] || 8;
      const sz = nbt?.size?.[2] || 8;
      const offX = Math.max(0, Math.floor((16 - sx) / 2));
      const offZ = Math.max(0, Math.floor((16 - sz) / 2));
      this.applyStructureTemplate(chunk, templateKey, offX, baseY, offZ, foundationBlock);
    }

    // Street Pathways
    for (let i = 0; i < CHUNK_SIZE; i++) {
      if (dx === 0) {
        chunk.setBlock(7, baseY, i, pathId);
        chunk.setBlock(8, baseY, i, pathId);
      }
      if (dz === 0) {
        chunk.setBlock(i, baseY, 7, pathId);
        chunk.setBlock(i, baseY, 8, pathId);
      }
    }

    // Lamp Posts
    const lampX = dx <= 0 ? 5 : 10;
    const lampZ = dz <= 0 ? 5 : 10;
    chunk.setBlock(lampX, baseY + 1, lampZ, fenceId);
    chunk.setBlock(lampX, baseY + 2, lampZ, fenceId);
    chunk.setBlock(lampX, baseY + 3, lampZ, torchId);

    // Spawn authentic Villagers & Iron Golem
    const wx = cx * CHUNK_SIZE;
    const wz = cz * CHUNK_SIZE;
    for (let i = 0; i < spawnCount; i++) {
      villagers.push({
        type: 'villager',
        x: wx + 7.5 + i * 1.5,
        y: baseY + 1,
        z: wz + 7.5 + i * 1.0,
      });
    }
    if (spawnGolem) {
      villagers.push({
        type: 'iron_golem',
        x: wx + 8.5,
        y: baseY + 1,
        z: wz + 11.5,
      });
    }

    return { villagers };
  }

  static placeDesertPyramid(
    chunk: Chunk,
    cx: number,
    cz: number,
    baseY: number
  ): void {
    const sandstoneId = Registries.getBlock('sandstone').numId;
    const cutSandstoneId = Registries.getBlock('cut_sandstone')?.numId || sandstoneId;
    const chiseledSandstoneId = Registries.getBlock('chiseled_sandstone')?.numId || sandstoneId;
    const orangeTerracottaId = Registries.getBlock('orange_terracotta')?.numId || sandstoneId;
    const blueTerracottaId = Registries.getBlock('blue_terracotta')?.numId || sandstoneId;
    const stonePlateId = Registries.getBlock('stone_pressure_plate')?.numId || sandstoneId;
    const tntId = Registries.getBlock('tnt')?.numId || sandstoneId;
    const chestId = Registries.getBlock('chest').numId;

    const setBlock = (x: number, y: number, z: number, id: number, meta = 0) => {
      if (x >= 0 && x < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE && y >= 1 && y < CHUNK_HEIGHT) {
        chunk.setBlock(x, y, z, id, meta);
      }
    };

    // Foundation
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        for (let y = baseY - 1; y >= baseY - 15; y--) {
          if (y < 1) break;
          const c = chunk.getBlock(x, y, z);
          if (c === 0 || c === Registries.getBlock('water')?.numId) {
            setBlock(x, y, z, sandstoneId);
          }
        }
      }
    }

    // Pyramid tiers (height 9)
    for (let layer = 0; layer < 9; layer++) {
      const minC = layer;
      const maxC = 15 - layer;
      for (let x = minC; x <= maxC; x++) {
        for (let z = minC; z <= maxC; z++) {
          const isOuter = x === minC || x === maxC || z === minC || z === maxC;
          if (isOuter) {
            setBlock(x, baseY + layer, z, sandstoneId);
          } else if (layer === 0) {
            const isBlue = (x === 7 || x === 8) && (z === 7 || z === 8);
            const isOrange = (x === 6 || x === 9) || (z === 6 || z === 9);
            setBlock(x, baseY, z, isBlue ? blueTerracottaId : isOrange ? orangeTerracottaId : sandstoneId);
          } else {
            setBlock(x, baseY + layer, z, 0);
          }
        }
      }
    }

    // Entrance
    setBlock(7, baseY + 1, 0, 0);
    setBlock(8, baseY + 1, 0, 0);
    setBlock(7, baseY + 2, 0, 0);
    setBlock(8, baseY + 2, 0, 0);

    // Front Decorative Towers
    const towerCoords = [[1, 1], [11, 1]];
    for (const [tx, tz] of towerCoords) {
      for (let x = tx; x < tx + 4; x++) {
        for (let z = tz; z < tz + 4; z++) {
          for (let y = baseY; y <= baseY + 13; y++) {
            const isCorner = (x === tx || x === tx + 3) && (z === tz || z === tz + 3);
            if (y === baseY + 13) {
              setBlock(x, y, z, cutSandstoneId);
            } else if (y === baseY + 7 || y === baseY + 8) {
              setBlock(x, y, z, orangeTerracottaId);
            } else if (isCorner) {
              setBlock(x, y, z, chiseledSandstoneId);
            } else {
              setBlock(x, y, z, sandstoneId);
            }
          }
        }
      }
    }

    // 15-Block Drop Shaft
    const chamberY = baseY - 14;
    for (let y = baseY - 1; y >= chamberY; y--) {
      setBlock(7, y, 7, 0);
      setBlock(8, y, 7, 0);
      setBlock(7, y, 8, 0);
      setBlock(8, y, 8, 0);
    }

    // Secret Underground Chamber (6x6 at chamberY)
    for (let x = 5; x <= 10; x++) {
      for (let z = 5; z <= 10; z++) {
        for (let y = chamberY - 2; y <= chamberY + 4; y++) {
          const isWall = x === 5 || x === 10 || z === 5 || z === 10;
          const isFloor = y === chamberY;
          const isUnderFloor = y === chamberY - 1;
          const isBed = y === chamberY - 2;
          const isCeil = y === chamberY + 4;

          if (isBed || isWall || isCeil) {
            setBlock(x, y, z, cutSandstoneId);
          } else if (isUnderFloor) {
            const isTntArea = x >= 7 && x <= 8 && z >= 7 && z <= 8;
            setBlock(x, y, z, isTntArea ? tntId : sandstoneId);
          } else if (isFloor) {
            setBlock(x, y, z, sandstoneId);
          } else {
            setBlock(x, y, z, 0);
          }
        }
      }
    }

    setBlock(7, chamberY + 1, 7, stonePlateId);
    setBlock(5, chamberY + 1, 7, chestId, 1);
    setBlock(10, chamberY + 1, 8, chestId, 3);
    setBlock(7, chamberY + 1, 5, chestId, 2);
    setBlock(8, chamberY + 1, 10, chestId, 0);
  }

  static placeJunglePyramid(
    chunk: Chunk,
    cx: number,
    cz: number,
    baseY: number
  ): void {
    const cobbleId = Registries.getBlock('cobblestone').numId;
    const mossyId = Registries.getBlock('mossy_cobblestone')?.numId || cobbleId;
    const chiseledId = Registries.getBlock('chiseled_stone_bricks')?.numId || cobbleId;
    const chestId = Registries.getBlock('chest').numId;
    const leverId = Registries.getBlock('lever')?.numId || cobbleId;
    const dispenserId = Registries.getBlock('dispenser')?.numId || cobbleId;

    const setBlock = (x: number, y: number, z: number, id: number, meta = 0) => {
      if (x >= 0 && x < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE && y >= 1 && y < CHUNK_HEIGHT) {
        chunk.setBlock(x, y, z, id, meta);
      }
    };

    for (let x = 2; x <= 13; x++) {
      for (let z = 1; z <= 15; z++) {
        for (let y = baseY; y <= baseY + 9; y++) {
          const isOuter = x === 2 || x === 13 || z === 1 || z === 15;
          const isFloor = y === baseY;
          const isMidFloor = y === baseY + 4;
          const isCeil = y === baseY + 9;
          const blk = (x * 13 + y * 7 + z * 3) % 2 === 0 ? mossyId : cobbleId;

          if (isOuter || isFloor || isMidFloor || isCeil) {
            setBlock(x, y, z, blk);
          } else {
            setBlock(x, y, z, 0);
          }
        }
      }
    }

    setBlock(7, baseY + 1, 1, 0);
    setBlock(8, baseY + 1, 1, 0);
    setBlock(7, baseY + 2, 1, 0);
    setBlock(8, baseY + 2, 1, 0);

    setBlock(7, baseY + 5, 4, dispenserId, 2);
    setBlock(10, baseY + 5, 8, chestId, 3);

    for (let z = 5; z <= 7; z++) {
      setBlock(4, baseY + 2, z, chiseledId);
      setBlock(5, baseY + 2, z, leverId, 1);
    }
    setBlock(3, baseY + 1, 6, chestId, 1);
  }

  static placeSwampHut(
    chunk: Chunk,
    cx: number,
    cz: number,
    baseY: number
  ): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const sprucePlanksId = Registries.getBlock('spruce_planks')?.numId || Registries.getBlock('oak_planks').numId;
    const oakLogId = Registries.getBlock('oak_log').numId;
    const fenceId = Registries.getBlock('spruce_fence')?.numId || Registries.getBlock('oak_fence').numId;
    const craftingId = Registries.getBlock('crafting_table').numId;
    const cauldronId = Registries.getBlock('cauldron')?.numId || craftingId;
    const flowerPotId = Registries.getBlock('flower_pot')?.numId || craftingId;

    const setBlock = (x: number, y: number, z: number, id: number, meta = 0) => {
      if (x >= 0 && x < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE && y >= 1 && y < CHUNK_HEIGHT) {
        chunk.setBlock(x, y, z, id, meta);
      }
    };

    const stiltCoords = [[4, 4], [4, 11], [11, 4], [11, 11]];
    for (const [sx, sz] of stiltCoords) {
      for (let y = baseY - 5; y <= baseY; y++) {
        setBlock(sx, y, sz, oakLogId);
      }
    }

    for (let x = 4; x <= 11; x++) {
      for (let z = 4; z <= 11; z++) {
        for (let y = baseY; y <= baseY + 4; y++) {
          const isWall = x === 4 || x === 11 || z === 4 || z === 11;
          const isFloor = y === baseY;
          const isCeil = y === baseY + 4;

          if (isFloor || isCeil) {
            setBlock(x, y, z, sprucePlanksId);
          } else if (isWall) {
            if (y === baseY + 2 && (x === 4 && z === 7)) {
              setBlock(x, y, z, fenceId);
            } else if (x === 7 && z === 4 && (y === baseY + 1 || y === baseY + 2)) {
              setBlock(x, y, z, 0);
            } else {
              setBlock(x, y, z, sprucePlanksId);
            }
          } else {
            setBlock(x, y, z, 0);
          }
        }
      }
    }

    setBlock(10, baseY + 1, 10, craftingId);
    setBlock(10, baseY + 1, 9, cauldronId);
    setBlock(10, baseY + 1, 8, flowerPotId);

    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    mobs.push({
      type: 'witch',
      x: cx * CHUNK_SIZE + 7.5,
      y: baseY + 1,
      z: cz * CHUNK_SIZE + 7.5,
    });
    return { mobs };
  }

  static placeRuinedPortal(
    chunk: Chunk,
    cx: number,
    cz: number,
    baseY: number
  ): void {
    const templateKey = (cx + cz) % 2 === 0 ? 'ruined_portal/portal_1' : 'ruined_portal/giant_portal_1';
    if (this.structuresMap[templateKey]) {
      this.applyStructureTemplate(chunk, templateKey, 3, baseY, 3, 'netherrack');
      return;
    }

    const obsidianId = Registries.getBlock('obsidian').numId;
    const cryingId = Registries.getBlock('crying_obsidian')?.numId || obsidianId;
    const netherrackId = Registries.getBlock('netherrack')?.numId || obsidianId;
    const magmaId = Registries.getBlock('magma_block')?.numId || netherrackId;
    const goldId = Registries.getBlock('gold_block')?.numId || obsidianId;
    const chestId = Registries.getBlock('chest').numId;

    for (let x = 4; x <= 11; x++) {
      for (let z = 4; z <= 11; z++) {
        chunk.setBlock(x, baseY, z, (x + z) % 3 === 0 ? magmaId : netherrackId);
      }
    }

    for (let x = 6; x <= 10; x++) {
      for (let y = baseY + 1; y <= baseY + 6; y++) {
        const isFrame = x === 6 || x === 10 || y === baseY + 1 || y === baseY + 6;
        if (isFrame) {
          if (x === 10 && y === baseY + 6) continue;
          const isCrying = (x * 3 + y * 5) % 4 === 0;
          chunk.setBlock(x, y, 7, isCrying ? cryingId : obsidianId);
        }
      }
    }
    chunk.setBlock(6, baseY + 1, 5, goldId);
    chunk.setBlock(9, baseY + 1, 6, chestId);
  }

  static placeIgloo(
    chunk: Chunk,
    cx: number,
    cz: number,
    baseY: number
  ): { villagers: Array<{ type: string; x: number; y: number; z: number }> } {
    const villagers: Array<{ type: string; x: number; y: number; z: number }> = [];

    if (this.structuresMap['igloo/top']) {
      this.applyStructureTemplate(chunk, 'igloo/top', 4, baseY, 4, 'snow_block');
      if (this.structuresMap['igloo/bottom']) {
        const basementY = baseY - 12;
        this.applyStructureTemplate(chunk, 'igloo/bottom', 4, basementY, 4, 'stone_bricks');
        const ladderId = Registries.getBlock('ladder')?.numId || 0;
        for (let y = basementY + 5; y < baseY; y++) {
          chunk.setBlock(7, y, 7, ladderId, 2);
        }
        villagers.push({ type: 'villager', x: cx * CHUNK_SIZE + 6.5, y: basementY + 1, z: cz * CHUNK_SIZE + 6.5 });
        villagers.push({ type: 'zombie', x: cx * CHUNK_SIZE + 8.5, y: basementY + 1, z: cz * CHUNK_SIZE + 6.5 });
      }
      return { villagers };
    }

    const snowId = Registries.getBlock('snow_block').numId;
    const packedIceId = Registries.getBlock('packed_ice')?.numId || snowId;
    const bedId = Registries.getBlock('straw_bed').numId;
    const furnaceId = Registries.getBlock('furnace')?.numId || snowId;
    const craftingId = Registries.getBlock('crafting_table').numId;
    const torchId = Registries.getBlock('torch').numId;

    for (let x = 4; x <= 11; x++) {
      for (let z = 4; z <= 11; z++) {
        for (let y = baseY; y <= baseY + 4; y++) {
          const d = Math.hypot(x - 7.5, z - 7.5);
          if (y === baseY) {
            chunk.setBlock(x, y, z, snowId);
          } else if (d >= 2.5 && d <= 3.8 && y <= baseY + 3) {
            chunk.setBlock(x, y, z, (x === 7 && z === 4) ? 0 : (x === 4 && z === 7) ? packedIceId : snowId);
          } else if (y === baseY + 4 && d < 2.5) {
            chunk.setBlock(x, y, z, snowId);
          } else if (d < 2.5) {
            chunk.setBlock(x, y, z, 0);
          }
        }
      }
    }
    chunk.setBlock(9, baseY + 1, 9, bedId);
    chunk.setBlock(6, baseY + 1, 9, furnaceId);
    chunk.setBlock(5, baseY + 1, 9, craftingId);
    chunk.setBlock(5, baseY + 1, 6, torchId);

    return { villagers };
  }

  static placePillagerOutpost(
    chunk: Chunk,
    cx: number,
    cz: number,
    baseY: number
  ): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];

    if (this.structuresMap['pillager_outpost/watchtower']) {
      this.applyStructureTemplate(chunk, 'pillager_outpost/watchtower', 0, baseY, 0, 'cobblestone');
      const wx = cx * CHUNK_SIZE;
      const wz = cz * CHUNK_SIZE;
      mobs.push({ type: 'skeleton', x: wx + 7.5, y: baseY + 15, z: wz + 7.5 });
      mobs.push({ type: 'skeleton', x: wx + 4.5, y: baseY + 1, z: wz + 4.5 });
      mobs.push({ type: 'skeleton', x: wx + 11.5, y: baseY + 1, z: wz + 11.5 });
      return { mobs };
    }

    const cobbleId = Registries.getBlock('cobblestone').numId;
    const darkLogId = Registries.getBlock('dark_oak_log')?.numId || Registries.getBlock('oak_log').numId;
    const birchPlanksId = Registries.getBlock('birch_planks')?.numId || Registries.getBlock('oak_planks').numId;
    const chestId = Registries.getBlock('chest').numId;

    for (let x = 3; x <= 12; x++) {
      for (let z = 3; z <= 12; z++) {
        for (let y = baseY; y <= baseY + 14; y++) {
          const isCorner = (x === 3 || x === 12) && (z === 3 || z === 12);
          const isOuter = x === 3 || x === 12 || z === 3 || z === 12;
          const isFloor = y === baseY || y === baseY + 4 || y === baseY + 8 || y === baseY + 12;

          if (isCorner) {
            chunk.setBlock(x, y, z, darkLogId);
          } else if (isFloor) {
            chunk.setBlock(x, y, z, birchPlanksId);
          } else if (isOuter && y < baseY + 12) {
            chunk.setBlock(x, y, z, cobbleId);
          } else if (y === baseY + 13 && isOuter) {
            chunk.setBlock(x, y, z, cobbleId);
          } else {
            chunk.setBlock(x, y, z, 0);
          }
        }
      }
    }
    chunk.setBlock(7, baseY + 13, 7, chestId);

    const wx = cx * CHUNK_SIZE;
    const wz = cz * CHUNK_SIZE;
    mobs.push({ type: 'skeleton', x: wx + 7.5, y: baseY + 13, z: wz + 7.5 });
    return { mobs };
  }

  static generateChunk(cx: number, cz: number): {
    chunk: Chunk;
    cushions: CushionEntityData[];
    camp?: AbandonedCampLocation;
    mobs?: Array<{ type: string; x: number; y: number; z: number }>;
  } {
    const chunk = new Chunk(cx, cz);
    const cushions: CushionEntityData[] = [];
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
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

    if (this.worldType === 'superflat') {
      for (let lz = 0; lz < CHUNK_SIZE; lz++) {
        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
          chunk.setBiome(lx, lz, 'minecraft:plains');
          heightMap[lz * CHUNK_SIZE + lx] = 3;
          chunk.setBlock(lx, 0, lz, bedrockId);
          chunk.setBlock(lx, 1, lz, dirtId);
          chunk.setBlock(lx, 2, lz, dirtId);
          chunk.setBlock(lx, 3, lz, grassId);
        }
      }
      return { chunk, cushions, camp, mobs };
    }

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

        // 3D Cave Carver: authentic winding subterranean tunnels
        for (let y = 4; y < h; y++) {
          const c1 = this.smoothNoise3D(wx, y * 1.1, wz, 22, 333) * 2.0 - 1.0;
          const c2 = this.smoothNoise3D(wx, y * 1.1, wz, 22, 444) * 2.0 - 1.0;
          if (c1 * c1 + c2 * c2 < 0.038) {
            // Keep ocean floor intact under sea level lakes/rivers
            if (h >= SEA_LEVEL || y > SEA_LEVEL) {
              chunk.setBlock(lx, y, lz, 0);
            }
          }
        }
      }
    }

    // Authentic Minecraft 26.3 Ore Distributions
    const oreConfigs = [
      // 1. Coal (Y=0..128)
      { regular: coalOreId, deep: deepslateCoalOreId, count: 6, minY: 0, maxY: 128, radius: 1.4 },
      // 2. Iron (Y=0..72)
      { regular: ironOreId, deep: deepslateIronOreId, count: 4, minY: 0, maxY: 72, radius: 1.2 },
      // 3. Copper (Y=16..100)
      { regular: copperOreId, deep: deepslateCopperOreId, count: 3, minY: 16, maxY: 100, radius: 1.3 },
      // 4. Gold (Y=4..32)
      { regular: goldOreId, deep: deepslateGoldOreId, count: 2, minY: 4, maxY: 32, radius: 1.1 },
      // 5. Redstone (Y=1..16)
      { regular: redstoneOreId, deep: deepslateRedstoneOreId, count: 2, minY: 1, maxY: 16, radius: 1.1 },
      // 6. Diamond (Y=1..16) - 1 vein with air exposure reduction
      { regular: diamondOreId, deep: deepslateDiamondOreId, count: 1, minY: 1, maxY: 16, radius: 1.0 },
      // 7. Lapis (Y=8..36)
      { regular: lapisOreId, deep: deepslateLapisOreId, count: 1, minY: 8, maxY: 36, radius: 1.1 },
      // 8. Underground Dirt & Gravel pockets (Y=10..120)
      { regular: dirtId, deep: dirtId, count: 3, minY: 10, maxY: 120, radius: 1.8 },
      { regular: gravelId, deep: gravelId, count: 4, minY: 10, maxY: 120, radius: 1.8 },
      // 9. Granite, Diorite, Andesite pockets (Y=10..80)
      { regular: graniteId, deep: tuffId, count: 2, minY: 10, maxY: 80, radius: 1.6 },
      { regular: dioriteId, deep: tuffId, count: 2, minY: 10, maxY: 80, radius: 1.6 },
      { regular: andesiteId, deep: tuffId, count: 2, minY: 10, maxY: 80, radius: 1.6 },
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
                if (current === stoneId || current === deepslateId) {
                  // Official 26.3 Reduced Air Exposure: ores bordering open cave air have a 60% chance to be discarded
                  const isOre = cfg.regular !== dirtId && cfg.regular !== gravelId && cfg.regular !== graniteId && cfg.regular !== dioriteId && cfg.regular !== andesiteId;
                  if (isOre) {
                    const nearAir =
                      (bx > 0 && chunk.getBlock(bx - 1, by, bz) === 0) ||
                      (bx < 15 && chunk.getBlock(bx + 1, by, bz) === 0) ||
                      (by > 0 && chunk.getBlock(bx, by - 1, bz) === 0) ||
                      (by < 127 && chunk.getBlock(bx, by + 1, bz) === 0) ||
                      (bz > 0 && chunk.getBlock(bx, by, bz - 1) === 0) ||
                      (bz < 15 && chunk.getBlock(bx, by, bz + 1) === 0);
                    if (nearAir && ((bx * 31 + by * 17 + bz * 7) & 3) !== 0) {
                      continue; // Discard exposed ore in open cave air
                    }
                  }
                  if (current === stoneId) {
                    chunk.setBlock(bx, by, bz, cfg.regular);
                  } else {
                    chunk.setBlock(bx, by, bz, cfg.deep);
                  }
                }
              }
            }
          }
        }
      }
    }

    // Check if this chunk naturally hosts an Abandoned Camp structure using authentic 32x32 regional spacing
    const REGION_SIZE = 32;
    const rx = Math.floor(cx / REGION_SIZE);
    const rz = Math.floor(cz / REGION_SIZE);
    const centerBiome = this.getBiomeAt(cx * CHUNK_SIZE + 8, cz * CHUNK_SIZE + 8);

    // 1. Village Structure (authentic 3x3 multi-chunk layout with town center, houses, farms, butcher, and paths)
    const villageTarget = this.getStructureChunk(rx, rz, 'village');
    const vDx = cx - villageTarget.cx;
    const vDz = cz - villageTarget.cz;
    const isVillagePart = this.generateStructures && Math.abs(vDx) <= 1 && Math.abs(vDz) <= 1 && heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isVillagePart) {
      const centerH = Math.max(SEA_LEVEL + 2, this.getTerrainHeight(villageTarget.cx * CHUNK_SIZE + 8, villageTarget.cz * CHUNK_SIZE + 8));
      const villageBiome = this.getBiomeAt(villageTarget.cx * CHUNK_SIZE + 8, villageTarget.cz * CHUNK_SIZE + 8);
      const res = WorldGen26_3.placeVillagePiece(chunk, cx, cz, villageTarget.cx, villageTarget.cz, centerH, villageBiome);
      mobs.push(...res.villagers);
    }

    // 2. Abandoned Camp Structure
    const campTarget = this.getStructureChunk(rx, rz, 'abandoned_camp');
    const isWildernessCampChunk =
      this.generateStructures &&
      cx === campTarget.cx &&
      cz === campTarget.cz &&
      !isVillagePart &&
      (Math.abs(cx) > 1 || Math.abs(cz) > 1) &&
      heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isWildernessCampChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      const variant = Math.floor(this.hash2D(cx, cz, 7777) * 16);
      const res = this.placeOfficialAbandonedCamp(chunk, 3, centerH, 3, variant);
      cushions.push(...res.cushions);
      camp = res.campPos;
    }

    // 3. Desert Pyramid Structure
    const desertPyramidTarget = this.getStructureChunk(rx, rz, 'desert_pyramid');
    const isDesertPyramidChunk =
      this.generateStructures &&
      cx === desertPyramidTarget.cx &&
      cz === desertPyramidTarget.cz &&
      !isVillagePart &&
      !isWildernessCampChunk &&
      (centerBiome.includes('desert') || centerBiome.includes('badlands')) &&
      heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isDesertPyramidChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      WorldGen26_3.placeDesertPyramid(chunk, cx, cz, centerH);
    }

    // 4. Jungle Pyramid Structure
    const junglePyramidTarget = this.getStructureChunk(rx, rz, 'jungle_pyramid');
    const isJunglePyramidChunk =
      this.generateStructures &&
      cx === junglePyramidTarget.cx &&
      cz === junglePyramidTarget.cz &&
      !isVillagePart &&
      !isWildernessCampChunk &&
      centerBiome.includes('jungle') &&
      heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isJunglePyramidChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      WorldGen26_3.placeJunglePyramid(chunk, cx, cz, centerH);
    }

    // 5. Swamp Hut (Witch Hut) Structure
    const swampHutTarget = this.getStructureChunk(rx, rz, 'swamp_hut');
    const isSwampHutChunk =
      this.generateStructures &&
      cx === swampHutTarget.cx &&
      cz === swampHutTarget.cz &&
      !isVillagePart &&
      !isWildernessCampChunk &&
      centerBiome.includes('swamp');

    if (isSwampHutChunk) {
      const centerH = Math.max(SEA_LEVEL + 1, heightMap[7 * CHUNK_SIZE + 7]);
      const res = WorldGen26_3.placeSwampHut(chunk, cx, cz, centerH);
      mobs.push(...res.mobs);
    }

    // 6. Igloo Structure
    const iglooTarget = this.getStructureChunk(rx, rz, 'igloo');
    const isIglooChunk =
      this.generateStructures &&
      cx === iglooTarget.cx &&
      cz === iglooTarget.cz &&
      !isVillagePart &&
      !isWildernessCampChunk &&
      (centerBiome.includes('snowy') || centerBiome.includes('ice'));

    if (isIglooChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      const res = WorldGen26_3.placeIgloo(chunk, cx, cz, centerH);
      mobs.push(...res.villagers);
    }

    // 7. Ruined Portal Structure
    const portalTarget = this.getStructureChunk(rx, rz, 'ruined_portal');
    const isPortalChunk =
      this.generateStructures &&
      cx === portalTarget.cx &&
      cz === portalTarget.cz &&
      !isVillagePart &&
      !isWildernessCampChunk &&
      !isDesertPyramidChunk &&
      !isJunglePyramidChunk &&
      heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isPortalChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      WorldGen26_3.placeRuinedPortal(chunk, cx, cz, centerH);
    }

    // 8. Pillager Outpost Structure
    const outpostTarget = this.getStructureChunk(rx, rz, 'pillager_outpost');
    const isOutpostChunk =
      this.generateStructures &&
      cx === outpostTarget.cx &&
      cz === outpostTarget.cz &&
      !isVillagePart &&
      !isWildernessCampChunk &&
      !isDesertPyramidChunk &&
      !isJunglePyramidChunk &&
      heightMap[7 * CHUNK_SIZE + 7] > SEA_LEVEL + 2;

    if (isOutpostChunk) {
      const centerH = Math.max(SEA_LEVEL + 2, heightMap[7 * CHUNK_SIZE + 7]);
      const res = WorldGen26_3.placePillagerOutpost(chunk, cx, cz, centerH);
      mobs.push(...res.mobs);
    }

    const hasStructure =
      isVillagePart ||
      isWildernessCampChunk ||
      isDesertPyramidChunk ||
      isJunglePyramidChunk ||
      isSwampHutChunk ||
      isIglooChunk ||
      isPortalChunk ||
      isOutpostChunk;

    // Bonus Chest near spawn if enabled
    if (this.bonusChest && cx === 0 && cz === 0) {
      const topH = heightMap[2 * CHUNK_SIZE + 2];
      if (topH > 0 && topH < CHUNK_HEIGHT - 2) {
        const chestId = Registries.getBlock('chest')?.numId || Registries.getBlock('oak_planks').numId;
        const torchId = Registries.getBlock('torch')?.numId || 0;
        chunk.setBlock(2, topH + 1, 2, chestId);
        if (torchId) {
          chunk.setBlock(1, topH + 1, 2, torchId);
          chunk.setBlock(3, topH + 1, 2, torchId);
          chunk.setBlock(2, topH + 1, 1, torchId);
          chunk.setBlock(2, topH + 1, 3, torchId);
        }
      }
    }

    // Place Trees & Flora based on Biome
    for (let lz = 3; lz < CHUNK_SIZE - 3; lz += 4) {
      for (let lx = 3; lx < CHUNK_SIZE - 3; lx += 4) {
        if (hasStructure && lx >= 1 && lx <= 15 && lz >= 1 && lz <= 15) {
          continue; // Clear trees and flora inside structure footprints
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
        } else if ((biomeId === 'minecraft:jungle' || biomeId === 'minecraft:sparse_jungle') && treeRoll < 0.45) {
          this.placeJungleTree(chunk, lx, h + 1, lz, treeRoll);
        } else if (biomeId === 'minecraft:bamboo_jungle') {
          if (treeRoll < 0.15) {
            this.placeJungleTree(chunk, lx, h + 1, lz, treeRoll);
          } else if (treeRoll < 0.8) {
            this.placeBambooStalk(chunk, lx, h + 1, lz, 6 + Math.floor(treeRoll * 8));
          }
        } else if (biomeId === 'minecraft:forest' && treeRoll < 0.28) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'oak_log', 'oak_leaves', 5 + Math.floor(treeRoll * 7));
        } else if (biomeId === 'minecraft:plains' && treeRoll < 0.03) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'oak_log', 'oak_leaves', 5);
        } else if (biomeId === 'minecraft:birch_forest' && treeRoll < 0.25) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'birch_log', 'birch_leaves', 6);
        } else if (biomeId === 'minecraft:cherry_grove' && treeRoll < 0.22) {
          this.placeClassicTree(chunk, lx, h + 1, lz, 'cherry_log', 'cherry_leaves', 6);
        } else if ((biomeId === 'minecraft:snowy_plains' || biomeId === 'minecraft:grove') && treeRoll < 0.14) {
          this.placeSpruceTree(chunk, lx, h + 1, lz, 6 + Math.floor(treeRoll * 20), true);
        } else if ((biomeId.includes('taiga') || biomeId.includes('spruce')) && treeRoll < 0.28) {
          this.placeSpruceTree(chunk, lx, h + 1, lz, 7 + Math.floor(treeRoll * 20), biomeId.includes('snowy'));
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

    // Authentic Minecraft FreezeTopLayerFeature:
    // In cold biomes, freeze top water exposed to sky into ice, and cover solid blocks with snow
    const iceId = Registries.getBlock('ice')?.numId;
    const snowBlockId = Registries.getBlock('snow')?.numId;
    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx];
        const isCold =
          biomeId.includes('snowy') ||
          biomeId.includes('frozen') ||
          biomeId.includes('ice') ||
          biomeId.includes('grove') ||
          biomeId.includes('slopes') ||
          biomeId.includes('peaks');
        if (!isCold) continue;

        // Freeze surface water at sea level
        if (iceId) {
          const topWater = chunk.getBlock(lx, SEA_LEVEL, lz);
          if (topWater === waterId) {
            chunk.setBlock(lx, SEA_LEVEL, lz, iceId);
          }
        }

        if (snowBlockId) {
          // Find highest non-air block
          let topY = CHUNK_HEIGHT - 1;
          while (topY > 0 && chunk.getBlock(lx, topY, lz) === 0) {
            topY--;
          }
          if (topY <= 0) continue;

          const topB = chunk.getBlock(lx, topY, lz);
          if (topB === waterId && iceId) {
            chunk.setBlock(lx, topY, lz, iceId);
          } else if (topY + 1 < CHUNK_HEIGHT) {
            const topDef = Registries.getBlock(topB);
            if (topDef && topDef.solid && topDef.shape === 'cube') {
              if (chunk.getBlock(lx, topY + 1, lz) === 0) {
                chunk.setBlock(lx, topY + 1, lz, snowBlockId);
              }
            }
          }
        }
      }
    }

    return { chunk, cushions, camp, mobs };
  }

  static placeSpruceTree(
    chunk: Chunk,
    lx: number,
    baseY: number,
    lz: number,
    height: number,
    withSnow = true
  ) {
    const logId = Registries.getBlock('spruce_log')?.numId || Registries.getBlock('oak_log').numId;
    const leafId = Registries.getBlock('spruce_leaves')?.numId || Registries.getBlock('oak_leaves').numId;
    const snowId = Registries.getBlock('snow')?.numId || 0;

    for (let y = baseY; y < baseY + height; y++) {
      if (y < CHUNK_HEIGHT) chunk.setBlock(lx, y, lz, logId);
    }

    const topY = baseY + height;
    if (topY < CHUNK_HEIGHT) {
      chunk.setBlock(lx, topY, lz, leafId);
      if (withSnow && snowId && topY + 1 < CHUNK_HEIGHT) {
        chunk.setBlock(lx, topY + 1, lz, snowId);
      }
    }

    const maxRadius = height > 7 ? 2 : 1;
    for (let y = topY - 1; y >= baseY + 2; y--) {
      const distFromTop = topY - y;
      let r = 1;
      if (distFromTop === 1) {
        r = 1;
      } else if (distFromTop % 2 === 0) {
        r = maxRadius;
      } else {
        r = 1;
      }

      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          if (dx === 0 && dz === 0) continue;
          if (Math.abs(dx) === r && Math.abs(dz) === r && (r > 1 || distFromTop <= 2)) {
            continue;
          }
          const tx = lx + dx;
          const tz = lz + dz;
          if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && y < CHUNK_HEIGHT) {
            if (chunk.getBlock(tx, y, tz) === 0) {
              chunk.setBlock(tx, y, tz, leafId);
              if (withSnow && snowId && y + 1 < CHUNK_HEIGHT && chunk.getBlock(tx, y + 1, tz) === 0) {
                if (((tx * 13 + y * 7 + tz * 17) & 1) === 0) {
                  chunk.setBlock(tx, y + 1, tz, snowId);
                }
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

  static generateNetherChunk(cx: number, cz: number): { chunk: Chunk; cushions: CushionEntityData[] } {
    const chunk = new Chunk(cx, cz);
    const cushions: CushionEntityData[] = [];
    const bedrockId = Registries.getBlock('bedrock').numId;
    const netherrackId = Registries.getBlock('netherrack').numId;
    const lavaId = Registries.getBlock('lava').numId;
    const quartzId = Registries.getBlock('nether_quartz_ore')?.numId || netherrackId;
    const goldId = Registries.getBlock('nether_gold_ore')?.numId || netherrackId;
    const glowstoneId = Registries.getBlock('glowstone').numId;
    const soulSandId = Registries.getBlock('soul_sand')?.numId || netherrackId;

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        chunk.setBiome(lx, lz, 'minecraft:nether_wastes');

        // Bedrock floor and ceiling
        chunk.setBlock(lx, 0, lz, bedrockId);
        chunk.setBlock(lx, CHUNK_HEIGHT - 1, lz, bedrockId);

        // Solid netherrack baseline
        for (let y = 1; y < CHUNK_HEIGHT - 1; y++) {
          chunk.setBlock(lx, y, lz, netherrackId);
        }

        // 3D Nether Cavern Carver
        for (let y = 14; y < 118; y++) {
          const n1 = this.smoothNoise3D(wx, y * 0.9, wz, 20, 888) * 2.0 - 1.0;
          const n2 = this.smoothNoise3D(wx, y * 0.9, wz, 20, 999) * 2.0 - 1.0;
          if (n1 * n1 + n2 * n2 < 0.28) {
            chunk.setBlock(lx, y, lz, 0);
          }
        }

        // Lava sea at Y=1..31
        for (let y = 1; y <= 31; y++) {
          if (chunk.getBlock(lx, y, lz) === 0) {
            chunk.setBlock(lx, y, lz, lavaId);
          }
        }

        // Soul sand shores along lava
        if (chunk.getBlock(lx, 31, lz) === lavaId && chunk.getBlock(lx, 32, lz) === netherrackId) {
          chunk.setBlock(lx, 32, lz, soulSandId);
        }
      }
    }

    // Nether Quartz & Gold ore veins
    const netherOres = [
      { id: quartzId, count: 14, radius: 1.2 },
      { id: goldId, count: 8, radius: 1.1 },
    ];
    for (const ore of netherOres) {
      for (let v = 0; v < ore.count; v++) {
        const ox = Math.floor(this.hash2D(cx + v, cz, 401) * 16);
        const oz = Math.floor(this.hash2D(cx, cz + v, 402) * 16);
        const oy = Math.floor(10 + this.hash2D(cx + v, cz + v, 403) * 105);
        const rSq = ore.radius * ore.radius;
        const ceilR = Math.ceil(ore.radius);
        for (let dx = -ceilR; dx <= ceilR; dx++) {
          const bx = ox + dx;
          if (bx < 0 || bx >= CHUNK_SIZE) continue;
          for (let dz = -ceilR; dz <= ceilR; dz++) {
            const bz = oz + dz;
            if (bz < 0 || bz >= CHUNK_SIZE) continue;
            for (let dy = -ceilR; dy <= ceilR; dy++) {
              const by = oy + dy;
              if (by <= 1 || by >= 126) continue;
              if (dx * dx + dy * dy + dz * dz <= rSq) {
                if (chunk.getBlock(bx, by, bz) === netherrackId) {
                  chunk.setBlock(bx, by, bz, ore.id);
                }
              }
            }
          }
        }
      }
    }

    // Glowstone stalactites hanging from cavern ceilings
    for (let i = 0; i < 4; i++) {
      const gx = Math.floor(this.hash2D(cx * 7 + i, cz, 701) * 16);
      const gz = Math.floor(this.hash2D(cx, cz * 7 + i, 702) * 16);
      for (let gy = 110; gy >= 45; gy--) {
        if (chunk.getBlock(gx, gy, gz) === netherrackId && chunk.getBlock(gx, gy - 1, gz) === 0) {
          chunk.setBlock(gx, gy - 1, gz, glowstoneId);
          if (gy - 2 > 35) chunk.setBlock(gx, gy - 2, gz, glowstoneId);
          break;
        }
      }
    }

    return { chunk, cushions };
  }

  static generateEndChunk(
    cx: number,
    cz: number
  ): {
    chunk: Chunk;
    cushions: CushionEntityData[];
    crystals: Array<{ x: number; y: number; z: number }>;
  } {
    const chunk = new Chunk(cx, cz);
    const cushions: CushionEntityData[] = [];
    const crystals: Array<{ x: number; y: number; z: number }> = [];

    const endStoneId = Registries.getBlock('end_stone')?.numId || 1;
    const obsidianId = Registries.getBlock('obsidian')?.numId || 1;
    const bedrockId = Registries.getBlock('bedrock')?.numId || 1;

    // 10 Obsidian Pillars around (0, 0)
    const pillarPositions: Array<{ x: number; z: number; height: number }> = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI * 2) / 10;
      pillarPositions.push({
        x: Math.round(Math.cos(angle) * 42),
        z: Math.round(Math.sin(angle) * 42),
        height: 76 + (i % 5) * 5,
      });
    }

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        chunk.setBiome(lx, lz, 'minecraft:the_end');

        const dist = Math.hypot(wx, wz);

        // Main End Island: diameter ~150 blocks, thickness up to 28
        if (dist < 75) {
          const islandNoise = this.smoothNoise3D(wx, 60, wz, 18, 555) * 4.0;
          const topY = Math.floor(62 + islandNoise);
          const maxThickness = (1.0 - dist / 75) * 26.0;
          const bottomY = Math.max(30, Math.floor(topY - maxThickness));

          for (let y = bottomY; y <= topY; y++) {
            chunk.setBlock(lx, y, lz, endStoneId);
          }

          // Central Exit Portal structure at (0, 0)
          if (Math.abs(wx) <= 2 && Math.abs(wz) <= 2) {
            chunk.setBlock(lx, 60, lz, bedrockId);
            if (Math.abs(wx) === 2 || Math.abs(wz) === 2) {
              chunk.setBlock(lx, 61, lz, bedrockId);
            }
          }
        }

        // Obsidian Pillars
        for (const p of pillarPositions) {
          const pd = Math.hypot(wx - p.x, wz - p.z);
          if (pd <= 3.2) {
            for (let y = 55; y <= p.height; y++) {
              chunk.setBlock(lx, y, lz, obsidianId);
            }
            if (Math.abs(wx - p.x) <= 0.5 && Math.abs(wz - p.z) <= 0.5) {
              chunk.setBlock(lx, p.height, lz, bedrockId);
              crystals.push({ x: p.x + 0.5, y: p.height + 1, z: p.z + 0.5 });
            }
          }
        }
      }
    }

    return { chunk, cushions, crystals };
  }
}
