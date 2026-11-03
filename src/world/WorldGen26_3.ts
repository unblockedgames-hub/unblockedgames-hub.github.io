import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT } from './Chunk';
import { Registries } from '../core/Registries';
import structuresBundle from './structures_bundle.json';
import { VanillaClimate } from './VanillaNoise';
import { SurfaceSystem } from './SurfaceSystem';
import { FeaturePlacer } from './FeaturePlacer';

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

  static getNearestStronghold(px: number, pz: number): { x: number; z: number; dist: number } {
    const angleOffset = (((this.seed % 628) + 628) % 628) / 100.0;
    const r = 1200 + (Math.abs(this.seed) % 300);
    const strongholds = [
      { x: Math.round(Math.cos(angleOffset) * r), z: Math.round(Math.sin(angleOffset) * r) },
      {
        x: Math.round(Math.cos(angleOffset + (Math.PI * 2) / 3) * r),
        z: Math.round(Math.sin(angleOffset + (Math.PI * 2) / 3) * r),
      },
      {
        x: Math.round(Math.cos(angleOffset + (Math.PI * 4) / 3) * r),
        z: Math.round(Math.sin(angleOffset + (Math.PI * 4) / 3) * r),
      },
    ];

    let nearest = strongholds[0];
    let minDist = Math.hypot(px - nearest.x, pz - nearest.z);
    for (let i = 1; i < strongholds.length; i++) {
      const d = Math.hypot(px - strongholds[i].x, pz - strongholds[i].z);
      if (d < minDist) {
        minDist = d;
        nearest = strongholds[i];
      }
    }
    return { x: nearest.x, z: nearest.z, dist: Math.round(minDist) };
  }


  static placeMineshaft(chunk: Chunk, cx: number, cz: number, baseY = 24): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    const oakPlanksId = Registries.getBlock('oak_planks')?.numId || 1;
    const oakFenceId = Registries.getBlock('oak_fence')?.numId || oakPlanksId;
    const railId = Registries.getBlock('rail')?.numId || 0;
    const cobwebId = Registries.getBlock('cobweb')?.numId || 0;
    const chestId = Registries.getBlock('chest')?.numId || 0;
    const spawnerId = Registries.getBlock('spawner')?.numId || oakPlanksId;

    // Corridor 3x3 carved along Z axis
    for (let x = 6; x <= 8; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        for (let y = baseY; y <= baseY + 3; y++) {
          if (y === baseY) {
            chunk.setBlock(x, y, z, oakPlanksId);
            if (x === 7 && railId && z % 2 === 0) chunk.setBlock(x, y + 1, z, railId);
          } else {
            chunk.setBlock(x, y, z, 0);
          }
        }
        // Wooden support arches every 4 blocks
        if (z % 4 === 0) {
          chunk.setBlock(6, baseY + 1, z, oakFenceId);
          chunk.setBlock(6, baseY + 2, z, oakFenceId);
          chunk.setBlock(8, baseY + 1, z, oakFenceId);
          chunk.setBlock(8, baseY + 2, z, oakFenceId);
          chunk.setBlock(6, baseY + 3, z, oakPlanksId);
          chunk.setBlock(7, baseY + 3, z, oakPlanksId);
          chunk.setBlock(8, baseY + 3, z, oakPlanksId);
        }
      }
    }
    // Cobwebs & Cave Spider Spawner
    if (cobwebId) {
      chunk.setBlock(6, baseY + 2, 8, cobwebId);
      chunk.setBlock(8, baseY + 2, 9, cobwebId);
    }
    chunk.setBlock(7, baseY + 1, 8, spawnerId);
    if (chestId) chunk.setBlock(7, baseY + 1, 12, chestId);
    mobs.push({ type: 'spider', x: cx * CHUNK_SIZE + 7.5, y: baseY + 1, z: cz * CHUNK_SIZE + 8.5 });
    return { mobs };
  }

  static placeAncientCity(chunk: Chunk, cx: number, cz: number, baseY = 16): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    const deepslateId = Registries.getBlock('deepslate')?.numId || 1;
    const deepslateBricksId = Registries.getBlock('deepslate_bricks')?.numId || deepslateId;
    const sculkId = Registries.getBlock('sculk')?.numId || deepslateId;
    const sculkSensorId = Registries.getBlock('sculk_sensor')?.numId || sculkId;
    const sculkShriekerId = Registries.getBlock('sculk_shrieker')?.numId || sculkId;
    const sculkCatalystId = Registries.getBlock('sculk_catalyst')?.numId || sculkId;
    const chestId = Registries.getBlock('chest')?.numId || 0;

    // Grand hall with reinforced deepslate portal frame
    for (let x = 1; x <= 14; x++) {
      for (let z = 1; z <= 14; z++) {
        for (let y = baseY; y <= baseY + 9; y++) {
          const isFloor = y === baseY;
          const isRoof = y === baseY + 9;
          const isWall = x === 1 || x === 14 || z === 1 || z === 14;
          if (isFloor) {
            const isSculk = (x * 7 + z * 11) % 3 === 0;
            chunk.setBlock(x, y, z, isSculk ? sculkId : deepslateBricksId);
          } else if (isRoof || isWall) {
            chunk.setBlock(x, y, z, deepslateBricksId);
          } else {
            chunk.setBlock(x, y, z, 0);
          }
        }
      }
    }
    // Reinforced portal frame in center
    for (let py = baseY + 1; py <= baseY + 7; py++) {
      chunk.setBlock(5, py, 7, deepslateId);
      chunk.setBlock(10, py, 7, deepslateId);
    }
    for (let px = 5; px <= 10; px++) {
      chunk.setBlock(px, baseY + 7, 7, deepslateId);
    }
    // Sculk shrieker & sensor & chest
    chunk.setBlock(7, baseY + 1, 9, sculkShriekerId);
    chunk.setBlock(8, baseY + 1, 9, sculkSensorId);
    chunk.setBlock(9, baseY + 1, 9, sculkCatalystId);
    if (chestId) chunk.setBlock(6, baseY + 1, 10, chestId);
    mobs.push({ type: 'warden', x: cx * CHUNK_SIZE + 7.5, y: baseY + 1, z: cz * CHUNK_SIZE + 7.5 });
    return { mobs };
  }

  static placeTrialChambers(chunk: Chunk, cx: number, cz: number, baseY = 20): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    const copperId = Registries.getBlock('copper_block')?.numId || 1;
    const tuffId = Registries.getBlock('tuff')?.numId || copperId;
    const spawnerId = Registries.getBlock('trial_spawner')?.numId || copperId;
    const vaultId = Registries.getBlock('vault')?.numId || copperId;

    for (let x = 2; x <= 13; x++) {
      for (let z = 2; z <= 13; z++) {
        for (let y = baseY; y <= baseY + 6; y++) {
          const isBorder = x === 2 || x === 13 || z === 2 || z === 13 || y === baseY || y === baseY + 6;
          chunk.setBlock(x, y, z, isBorder ? ((x + z) % 2 === 0 ? copperId : tuffId) : 0);
        }
      }
    }
    chunk.setBlock(7, baseY + 1, 7, spawnerId);
    chunk.setBlock(8, baseY + 1, 7, vaultId);
    mobs.push({ type: 'breeze', x: cx * CHUNK_SIZE + 7.5, y: baseY + 1, z: cz * CHUNK_SIZE + 7.5 });
    return { mobs };
  }

  static placeOceanMonument(chunk: Chunk, cx: number, cz: number, baseY = 36): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    const prismarineId = Registries.getBlock('prismarine')?.numId || 1;
    const seaLanternId = Registries.getBlock('sea_lantern')?.numId || prismarineId;
    const goldBlockId = Registries.getBlock('gold_block')?.numId || prismarineId;

    for (let x = 1; x <= 14; x++) {
      for (let z = 1; z <= 14; z++) {
        for (let y = baseY; y <= baseY + 12; y++) {
          const isEdge = x === 1 || x === 14 || z === 1 || z === 14 || y === baseY || y === baseY + 12;
          chunk.setBlock(x, y, z, isEdge ? prismarineId : 0);
        }
      }
    }
    // 8 Gold block core
    for (let gx = 7; gx <= 8; gx++) {
      for (let gz = 7; gz <= 8; gz++) {
        chunk.setBlock(gx, baseY + 1, gz, goldBlockId);
        chunk.setBlock(gx, baseY + 2, gz, goldBlockId);
      }
    }
    chunk.setBlock(4, baseY + 2, 4, seaLanternId);
    chunk.setBlock(11, baseY + 2, 11, seaLanternId);
    mobs.push({ type: 'elder_guardian' as any, x: cx * CHUNK_SIZE + 7.5, y: baseY + 3, z: cz * CHUNK_SIZE + 7.5 });
    return { mobs };
  }

  static placeWoodlandMansion(chunk: Chunk, cx: number, cz: number, baseY = 65): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    const darkOakId = Registries.getBlock('dark_oak_planks')?.numId || Registries.getBlock('oak_planks').numId;
    const cobblestoneId = Registries.getBlock('cobblestone')?.numId || 1;

    for (let x = 1; x <= 14; x++) {
      for (let z = 1; z <= 14; z++) {
        for (let y = baseY; y <= baseY + 14; y++) {
          const isWall = x === 1 || x === 14 || z === 1 || z === 14;
          const isFloor = y === baseY || y === baseY + 7 || y === baseY + 14;
          chunk.setBlock(x, y, z, (isWall || isFloor) ? (y < baseY + 3 ? cobblestoneId : darkOakId) : 0);
        }
      }
    }
    mobs.push({ type: 'evoker', x: cx * CHUNK_SIZE + 5.5, y: baseY + 1, z: cz * CHUNK_SIZE + 5.5 });
    mobs.push({ type: 'pillager', x: cx * CHUNK_SIZE + 9.5, y: baseY + 1, z: cz * CHUNK_SIZE + 9.5 });
    return { mobs };
  }

  static placeStrongholdPiece(chunk: Chunk, cx: number, cz: number, shX: number, shZ: number): { mobs: Array<{ type: string; x: number; y: number; z: number }> } {
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];
    const stoneBrickId = Registries.getBlock('stone_bricks')?.numId || 1;
    const mossyBrickId = Registries.getBlock('mossy_stone_bricks')?.numId || stoneBrickId;
    const crackedBrickId = Registries.getBlock('cracked_stone_bricks')?.numId || stoneBrickId;
    const frameId = Registries.getBlock('end_portal_frame')?.numId || 1;
    const lavaId = Registries.getBlock('lava')?.numId || 1;
    const barsId = Registries.getBlock('iron_bars')?.numId || 1;
    const spawnerId = Registries.getBlock('spawner')?.numId || stoneBrickId;
    const torchId = Registries.getBlock('torch')?.numId || 0;
    const chestId = Registries.getBlock('chest')?.numId || 0;
    const bookshelfId = Registries.getBlock('bookshelf')?.numId || 0;
    const cobwebId = Registries.getBlock('cobweb')?.numId || 0;

    const shChunkX = Math.floor(shX / CHUNK_SIZE);
    const shChunkZ = Math.floor(shZ / CHUNK_SIZE);

    // End Portal Room in the center stronghold chunk
    if (cx === shChunkX && cz === shChunkZ) {
      const roomY = 30;
      // Hollow 11x11 room
      for (let rx = 2; rx <= 14; rx++) {
        for (let rz = 2; rz <= 14; rz++) {
          for (let ry = roomY; ry <= roomY + 6; ry++) {
            const isBorder = rx === 2 || rx === 14 || rz === 2 || rz === 14 || ry === roomY || ry === roomY + 6;
            if (isBorder) {
              const rand = (rx * 17 + ry * 31 + rz * 13) % 10;
              const brick = rand === 0 ? mossyBrickId : rand === 1 ? crackedBrickId : stoneBrickId;
              chunk.setBlock(rx, ry, rz, brick);
            } else {
              chunk.setBlock(rx, ry, rz, 0);
            }
          }
        }
      }

      // 3x3 Lava pool in center at roomY + 1
      for (let lx = 7; lx <= 9; lx++) {
        for (let lz = 7; lz <= 9; lz++) {
          chunk.setBlock(lx, roomY, lz, stoneBrickId);
          chunk.setBlock(lx, roomY + 1, lz, lavaId);
        }
      }

      // 12 End Portal Frames surrounding the 3x3 lava pool at roomY + 2
      // North and South edges (z=6 and z=10, x from 7 to 9)
      for (let x = 7; x <= 9; x++) {
        const eyeN = ((x * 13 + cx * 7) % 10 === 0) ? 4 : 0;
        const eyeS = ((x * 19 + cz * 11) % 10 === 0) ? 4 : 0;
        chunk.setBlock(x, roomY + 2, 6, frameId, eyeN);
        chunk.setBlock(x, roomY + 2, 10, frameId, eyeS);
      }
      // West and East edges (x=6 and x=10, z from 7 to 9)
      for (let z = 7; z <= 9; z++) {
        const eyeW = ((z * 23 + cx * 5) % 10 === 0) ? 4 : 0;
        const eyeE = ((z * 29 + cz * 13) % 10 === 0) ? 4 : 0;
        chunk.setBlock(6, roomY + 2, z, frameId, eyeW);
        chunk.setBlock(10, roomY + 2, z, frameId, eyeE);
      }

      // Silverfish spawner hovering above stairs
      chunk.setBlock(8, roomY + 3, 4, spawnerId);

      // Torches around room
      if (torchId) {
        chunk.setBlock(3, roomY + 3, 3, torchId);
        chunk.setBlock(13, roomY + 3, 3, torchId);
        chunk.setBlock(3, roomY + 3, 13, torchId);
        chunk.setBlock(13, roomY + 3, 13, torchId);
      }
    }
    // Adjacent stronghold chunk: Library Room with bookshelves and chests
    else if (cx === shChunkX + 1 && cz === shChunkZ) {
      const roomY = 30;
      for (let rx = 1; rx <= 14; rx++) {
        for (let rz = 1; rz <= 14; rz++) {
          for (let ry = roomY; ry <= roomY + 8; ry++) {
            const isWall = rx === 1 || rx === 14 || rz === 1 || rz === 14 || ry === roomY || ry === roomY + 8;
            if (isWall) {
              chunk.setBlock(rx, ry, rz, stoneBrickId);
            } else {
              chunk.setBlock(rx, ry, rz, 0);
            }
          }
        }
      }
      // Bookshelves lining walls
      if (bookshelfId) {
        for (let x = 2; x <= 13; x++) {
          chunk.setBlock(x, roomY + 1, 2, bookshelfId);
          chunk.setBlock(x, roomY + 2, 2, bookshelfId);
          chunk.setBlock(x, roomY + 1, 13, bookshelfId);
          chunk.setBlock(x, roomY + 2, 13, bookshelfId);
        }
      }
      if (cobwebId) {
        chunk.setBlock(3, roomY + 3, 3, cobwebId);
        chunk.setBlock(12, roomY + 3, 12, cobwebId);
        chunk.setBlock(3, roomY + 7, 3, cobwebId);
      }
      if (chestId) {
        chunk.setBlock(8, roomY + 1, 8, chestId);
      }
    }
    // Corridors in adjacent chunks
    else {
      const corY = 32;
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let y = corY; y <= corY + 4; y++) {
          const isBorder = y === corY || y === corY + 4;
          if (isBorder) {
            chunk.setBlock(x, y, 7, stoneBrickId);
            chunk.setBlock(x, y, 8, stoneBrickId);
          } else {
            chunk.setBlock(x, y, 7, 0);
            chunk.setBlock(x, y, 8, 0);
          }
        }
      }
    }

    return { mobs };
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
    const h = this.vanillaClimate.getTerrainHeight(x, z);
    if (this.worldType === 'amplified' && h > 62) {
      return Math.min(256, Math.round(62 + (h - 62) * 2.0));
    }
    return h;
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
    let heightMap = new Int32Array(CHUNK_SIZE * CHUNK_SIZE);

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

    const getBlockId = (name: string) => Registries.getBlock(name)?.numId || 0;
    const setBlock = (lx: number, y: number, lz: number, numId: number) => chunk.setBlock(lx, y, lz, numId);
    const setBiome = (lx: number, lz: number, biomeId: string) => chunk.setBiome(lx, lz, biomeId);

    // Authentic Minecraft Java 3D Terrain + Aquifers + Surface Rules + 3D Biomes
    heightMap = this.vanillaClimate.buildTerrainAndSurface(cx, cz, setBlock, setBiome, getBlockId);

    // Authentic Minecraft Java Placed Ore Features (step 6: underground_ores)
    FeaturePlacer.placeOres(chunk, cx, cz, this.seed);

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


    // 10. Abandoned Mineshaft
    if (this.generateStructures && Math.abs(((cx % 18) + 18) % 18) === 7 && Math.abs(((cz % 18) + 18) % 18) === 7) {
      const res = WorldGen26_3.placeMineshaft(chunk, cx, cz, 24);
      mobs.push(...res.mobs);
    }

    // 11. Ancient City (Deep underground)
    if (this.generateStructures && Math.abs(((cx % 36) + 36) % 36) === 18 && Math.abs(((cz % 36) + 36) % 36) === 18) {
      const res = WorldGen26_3.placeAncientCity(chunk, cx, cz, 16);
      mobs.push(...res.mobs);
    }

    // 12. Trial Chambers
    if (this.generateStructures && Math.abs(((cx % 28) + 28) % 28) === 12 && Math.abs(((cz % 28) + 28) % 28) === 12) {
      const res = WorldGen26_3.placeTrialChambers(chunk, cx, cz, 22);
      mobs.push(...res.mobs);
    }

    // 13. Ocean Monument (Deep ocean biomes)
    if (this.generateStructures && centerBiome.includes('ocean') && Math.abs(((cx % 32) + 32) % 32) === 16 && Math.abs(((cz % 32) + 32) % 32) === 16) {
      const res = WorldGen26_3.placeOceanMonument(chunk, cx, cz, 36);
      mobs.push(...res.mobs);
    }

    // 14. Woodland Mansion (Roofed forest / dark forest)
    if (this.generateStructures && centerBiome.includes('dark_forest') && Math.abs(((cx % 48) + 48) % 48) === 24 && Math.abs(((cz % 48) + 48) % 48) === 24) {
      const res = WorldGen26_3.placeWoodlandMansion(chunk, cx, cz, Math.max(65, heightMap[7 * CHUNK_SIZE + 7]));
      mobs.push(...res.mobs);
    }

        // 9. Stronghold Structure (End Portal Room, Silverfish Spawner, Library, Corridors)
    const nearestSh = WorldGen26_3.getNearestStronghold(cx * CHUNK_SIZE + 8, cz * CHUNK_SIZE + 8);
    const shChunkX = Math.floor(nearestSh.x / CHUNK_SIZE);
    const shChunkZ = Math.floor(nearestSh.z / CHUNK_SIZE);
    const isStrongholdChunk = this.generateStructures && Math.abs(cx - shChunkX) <= 1 && Math.abs(cz - shChunkZ) <= 1;

    if (isStrongholdChunk) {
      const res = WorldGen26_3.placeStrongholdPiece(chunk, cx, cz, nearestSh.x, nearestSh.z);
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
      isOutpostChunk || isStrongholdChunk;

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

    // Authentic Minecraft 26.3 Features & Vegetation (trees, flora, cover)
    FeaturePlacer.placeFeatures(chunk, cx, cz, heightMap, this.seed, hasStructure);

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

  static generateNetherChunk(cx: number, cz: number): {
    chunk: Chunk;
    cushions: CushionEntityData[];
    mobs: Array<{ type: string; x: number; y: number; z: number }>;
  } {
    const chunk = new Chunk(cx, cz);
    const cushions: CushionEntityData[] = [];
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];

    const bedrockId = Registries.getBlock('bedrock').numId;
    const netherrackId = Registries.getBlock('netherrack').numId;
    const lavaId = Registries.getBlock('lava').numId;
    const quartzId = Registries.getBlock('nether_quartz_ore')?.numId || netherrackId;
    const goldId = Registries.getBlock('nether_gold_ore')?.numId || netherrackId;
    const glowstoneId = Registries.getBlock('glowstone').numId;
    const soulSandId = Registries.getBlock('soul_sand')?.numId || netherrackId;
    const soulSoilId = Registries.getBlock('soul_soil')?.numId || soulSandId;
    const crimsonNyliumId = Registries.getBlock('crimson_nylium')?.numId || netherrackId;
    const warpedNyliumId = Registries.getBlock('warped_nylium')?.numId || netherrackId;
    const crimsonStemId = Registries.getBlock('crimson_stem')?.numId || netherrackId;
    const warpedStemId = Registries.getBlock('warped_stem')?.numId || netherrackId;
    const netherWartBlockId = Registries.getBlock('nether_wart_block')?.numId || netherrackId;
    const warpedWartBlockId = Registries.getBlock('warped_wart_block')?.numId || netherrackId;
    const shroomlightId = Registries.getBlock('shroomlight')?.numId || glowstoneId;
    const basaltId = Registries.getBlock('basalt')?.numId || netherrackId;
    const smoothBasaltId = Registries.getBlock('smooth_basalt')?.numId || basaltId;
    const blackstoneId = Registries.getBlock('blackstone')?.numId || netherrackId;
    const magmaId = Registries.getBlock('magma_block')?.numId || netherrackId;
    const boneId = Registries.getBlock('bone_block')?.numId || netherrackId;
    const ancientDebrisId = Registries.getBlock('ancient_debris')?.numId || netherrackId;
    const netherBricksId = Registries.getBlock('nether_bricks')?.numId || netherrackId;
    const goldBlockId = Registries.getBlock('gold_block')?.numId || netherrackId;
    const spawnerId = Registries.getBlock('spawner')?.numId || netherBricksId;
    const weepingVinesId = Registries.getBlock('weeping_vines')?.numId || 0;
    const twistingVinesId = Registries.getBlock('twisting_vines')?.numId || 0;

    // Check for Nether Fortress or Bastion Remnant in this chunk region
    const isFortress = Math.abs(((cx % 20) + 20) % 20) === 6 && Math.abs(((cz % 20) + 20) % 20) === 6;
    const isBastion = Math.abs(((cx % 24) + 24) % 24) === 14 && Math.abs(((cz % 24) + 24) % 24) === 14;

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;

        // Biome climate determination
        const cTemp = this.smoothNoise(wx, wz, 140, this.seed + 111);
        const cHumid = this.smoothNoise(wx, wz, 140, this.seed + 222);

        let biomeId = 'minecraft:nether_wastes';
        if (cTemp > 0.6 && cHumid > 0.52) biomeId = 'minecraft:crimson_forest';
        else if (cTemp < 0.42 && cHumid > 0.52) biomeId = 'minecraft:warped_forest';
        else if (cTemp > 0.6 && cHumid < 0.38) biomeId = 'minecraft:soul_sand_valley';
        else if (cTemp < 0.42 && cHumid < 0.38) biomeId = 'minecraft:basalt_deltas';

        chunk.setBiome(lx, lz, biomeId);

        // Solid bedrock ceiling (Y=127) and floor (Y=0)
        chunk.setBlock(lx, 0, lz, bedrockId);
        chunk.setBlock(lx, CHUNK_HEIGHT - 1, lz, bedrockId);

        // Fill solid nether baseline
        for (let y = 1; y < CHUNK_HEIGHT - 1; y++) {
          chunk.setBlock(lx, y, lz, netherrackId);
        }

        // 3D Nether Caverns
        for (let y = 12; y < 118; y++) {
          const n1 = this.smoothNoise3D(wx, y * 0.9, wz, 22, this.seed + 888) * 2.0 - 1.0;
          const n2 = this.smoothNoise3D(wx, y * 0.9, wz, 22, this.seed + 999) * 2.0 - 1.0;
          if (n1 * n1 + n2 * n2 < 0.32) {
            chunk.setBlock(lx, y, lz, 0);
          }
        }

        // Lava sea at Y=1..31
        for (let y = 1; y <= 31; y++) {
          if (chunk.getBlock(lx, y, lz) === 0) {
            chunk.setBlock(lx, y, lz, lavaId);
          }
        }

        // Apply Biome Surface Materials
        for (let y = 32; y < 115; y++) {
          if (chunk.getBlock(lx, y, lz) === 0 && chunk.getBlock(lx, y - 1, lz) === netherrackId) {
            // Cavern Floor
            if (biomeId === 'minecraft:crimson_forest') {
              chunk.setBlock(lx, y - 1, lz, crimsonNyliumId);
            } else if (biomeId === 'minecraft:warped_forest') {
              chunk.setBlock(lx, y - 1, lz, warpedNyliumId);
            } else if (biomeId === 'minecraft:soul_sand_valley') {
              const useSoil = (lx * 7 + lz * 13) % 2 === 0;
              chunk.setBlock(lx, y - 1, lz, useSoil ? soulSoilId : soulSandId);
            } else if (biomeId === 'minecraft:basalt_deltas') {
              chunk.setBlock(lx, y - 1, lz, (lx * 3 + lz * 5) % 3 === 0 ? blackstoneId : basaltId);
            }
          }
        }
      }
    }

    // Biome Features: Huge Fungi, Basalt Columns, Bone Fossils
    for (let lx = 3; lx < 13; lx += 4) {
      for (let lz = 3; lz < 13; lz += 4) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const biome = chunk.getBiome(lx, lz).id;

        // Find floor around Y=32..80
        for (let y = 32; y < 80; y++) {
          if (chunk.getBlock(lx, y - 1, lz) !== 0 && chunk.getBlock(lx, y, lz) === 0 && chunk.getBlock(lx, y + 6, lz) === 0) {
            if (biome === 'minecraft:crimson_forest') {
              // Huge Crimson Fungus
              const h = 5 + ((lx * 7 + lz * 11) % 4);
              for (let fy = 0; fy < h; fy++) chunk.setBlock(lx, y + fy, lz, crimsonStemId);
              for (let dx = -2; dx <= 2; dx++) {
                for (let dz = -2; dz <= 2; dz++) {
                  for (let dy = h - 2; dy <= h + 1; dy++) {
                    if (Math.abs(dx) === 2 && Math.abs(dz) === 2 && dy > h) continue;
                    const tx = lx + dx, tz = lz + dz, ty = y + dy;
                    if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && ty < CHUNK_HEIGHT) {
                      chunk.setBlock(tx, ty, tz, (dx === 0 && dz === 0 && dy === h) ? shroomlightId : netherWartBlockId);
                    }
                  }
                }
              }
              // Weeping vines hanging down
              if (weepingVinesId && y + h - 3 > y) {
                chunk.setBlock(lx + 1, y + h - 3, lz, weepingVinesId);
                chunk.setBlock(lx + 1, y + h - 4, lz, weepingVinesId);
              }
              break;
            } else if (biome === 'minecraft:warped_forest') {
              // Huge Warped Fungus
              const h = 5 + ((lx * 13 + lz * 7) % 4);
              for (let fy = 0; fy < h; fy++) chunk.setBlock(lx, y + fy, lz, warpedStemId);
              for (let dx = -2; dx <= 2; dx++) {
                for (let dz = -2; dz <= 2; dz++) {
                  for (let dy = h - 2; dy <= h + 1; dy++) {
                    if (Math.abs(dx) === 2 && Math.abs(dz) === 2 && dy > h) continue;
                    const tx = lx + dx, tz = lz + dz, ty = y + dy;
                    if (tx >= 0 && tx < CHUNK_SIZE && tz >= 0 && tz < CHUNK_SIZE && ty < CHUNK_HEIGHT) {
                      chunk.setBlock(tx, ty, tz, (dx === 0 && dz === 0 && dy === h) ? shroomlightId : warpedWartBlockId);
                    }
                  }
                }
              }
              // Twisting vines growing up
              if (twistingVinesId) {
                chunk.setBlock(lx - 1, y, lz, twistingVinesId);
                chunk.setBlock(lx - 1, y + 1, lz, twistingVinesId);
              }
              break;
            } else if (biome === 'minecraft:soul_sand_valley' && (lx + lz) % 6 === 0) {
              // Bone fossil rib cage
              for (let dy = 0; dy < 5; dy++) {
                chunk.setBlock(lx - 2, y + dy, lz, boneId);
                chunk.setBlock(lx + 2, y + dy, lz, boneId);
              }
              chunk.setBlock(lx - 1, y + 5, lz, boneId);
              chunk.setBlock(lx, y + 5, lz, boneId);
              chunk.setBlock(lx + 1, y + 5, lz, boneId);
              break;
            } else if (biome === 'minecraft:basalt_deltas') {
              // Basalt column
              for (let dy = -1; dy < 7; dy++) {
                chunk.setBlock(lx, y + dy, lz, basaltId);
                chunk.setBlock(lx + 1, y + dy, lz, smoothBasaltId);
              }
              break;
            }
          }
        }
      }
    }

    // Nether Fortress Structure
    if (isFortress) {
      const bridgeY = 56;
      // East-West bridge walkway
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let z = 5; z <= 10; z++) {
          chunk.setBlock(x, bridgeY, z, netherBricksId);
          // Balustrades
          if (z === 5 || z === 10) {
            chunk.setBlock(x, bridgeY + 1, z, netherBricksId);
          }
          // Air space above bridge
          for (let y = bridgeY + 1; y <= bridgeY + 4; y++) {
            if (z > 5 && z < 10) chunk.setBlock(x, y, z, 0);
          }
        }
      }
      // Blaze Spawner balcony at center
      chunk.setBlock(8, bridgeY + 2, 7, spawnerId);
      mobs.push({ type: 'blaze', x: cx * CHUNK_SIZE + 8.5, y: bridgeY + 3, z: cz * CHUNK_SIZE + 7.5 });
      mobs.push({ type: 'wither_skeleton', x: cx * CHUNK_SIZE + 4.5, y: bridgeY + 1, z: cz * CHUNK_SIZE + 7.5 });
    }

    // Bastion Remnant Structure
    if (isBastion) {
      const baseY = 45;
      for (let rx = 1; rx <= 14; rx++) {
        for (let rz = 1; rz <= 14; rz++) {
          for (let ry = baseY; ry <= baseY + 10; ry++) {
            const isWall = rx === 1 || rx === 14 || rz === 1 || rz === 14 || ry === baseY;
            chunk.setBlock(rx, ry, rz, isWall ? blackstoneId : 0);
          }
        }
      }
      // Gold block treasure hoard
      chunk.setBlock(7, baseY + 1, 7, goldBlockId);
      chunk.setBlock(8, baseY + 1, 7, goldBlockId);
      chunk.setBlock(7, baseY + 1, 8, goldBlockId);
      chunk.setBlock(8, baseY + 1, 8, goldBlockId);
      mobs.push({ type: 'piglin', x: cx * CHUNK_SIZE + 7.5, y: baseY + 2, z: cz * CHUNK_SIZE + 7.5 });
    }

    // Ancient Debris veins (rare, embedded deep at Y=8..22)
    if ((cx * 17 + cz * 23) % 4 === 0) {
      const ax = Math.floor(this.hash2D(cx, cz, 301) * 14) + 1;
      const az = Math.floor(this.hash2D(cx, cz, 302) * 14) + 1;
      const ay = 8 + Math.floor(this.hash2D(cx, cz, 303) * 14);
      chunk.setBlock(ax, ay, az, ancientDebrisId);
      if (this.hash2D(cx, cz, 304) > 0.5) chunk.setBlock(ax, ay + 1, az, ancientDebrisId);
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
        if (chunk.getBlock(ox, oy, oz) === netherrackId) {
          chunk.setBlock(ox, oy, oz, ore.id);
        }
      }
    }

    // Glowstone stalactites
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

    return { chunk, cushions, mobs };
  }

  static generateEndChunk(
    cx: number,
    cz: number
  ): {
    chunk: Chunk;
    cushions: CushionEntityData[];
    crystals: Array<{ x: number; y: number; z: number }>;
    mobs: Array<{ type: string; x: number; y: number; z: number }>;
  } {
    const chunk = new Chunk(cx, cz);
    const cushions: CushionEntityData[] = [];
    const crystals: Array<{ x: number; y: number; z: number }> = [];
    const mobs: Array<{ type: string; x: number; y: number; z: number }> = [];

    const endStoneId = Registries.getBlock('end_stone')?.numId || 1;
    const endStoneBricksId = Registries.getBlock('end_stone_bricks')?.numId || endStoneId;
    const obsidianId = Registries.getBlock('obsidian')?.numId || 1;
    const bedrockId = Registries.getBlock('bedrock')?.numId || 1;
    const endPortalId = Registries.getBlock('end_portal')?.numId || 1;
    const endGatewayId = Registries.getBlock('end_gateway')?.numId || 1;
    const purpurId = Registries.getBlock('purpur_block')?.numId || endStoneId;
    const purpurPillarId = Registries.getBlock('purpur_pillar')?.numId || purpurId;
    const chorusPlantId = Registries.getBlock('chorus_plant')?.numId || endStoneId;
    const chorusFlowerId = Registries.getBlock('chorus_flower')?.numId || chorusPlantId;
    const barsId = Registries.getBlock('iron_bars')?.numId || 1;
    const chestId = Registries.getBlock('chest')?.numId || 1;

    // 10 Obsidian Pillars around (0, 0)
    const pillarPositions: Array<{ x: number; z: number; height: number; caged: boolean }> = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI * 2) / 10;
      pillarPositions.push({
        x: Math.round(Math.cos(angle) * 42),
        z: Math.round(Math.sin(angle) * 42),
        height: 72 + (i % 5) * 6,
        caged: i === 2 || i === 7, // 2 pillars with iron bar cages
      });
    }

    const distFromOrigin = Math.hypot(cx * CHUNK_SIZE + 8, cz * CHUNK_SIZE + 8);
    const isCentralIsland = distFromOrigin < 120;
    const isOuterIslands = distFromOrigin > 750;

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const dist = Math.hypot(wx, wz);

        chunk.setBiome(lx, lz, isCentralIsland ? 'minecraft:the_end' : 'minecraft:end_highlands');

        // Central Island (R < 80)
        if (dist < 80) {
          const islandNoise = this.smoothNoise3D(wx, 60, wz, 18, 555) * 4.0;
          const topY = Math.floor(62 + islandNoise);
          const maxThickness = (1.0 - dist / 80) * 28.0;
          const bottomY = Math.max(30, Math.floor(topY - maxThickness));

          for (let y = bottomY; y <= topY; y++) {
            chunk.setBlock(lx, y, lz, endStoneId);
          }

          // Central Exit Portal Fountain at (0, 0)
          if (Math.abs(wx) <= 3 && Math.abs(wz) <= 3) {
            const rad = Math.hypot(wx, wz);
            if (rad <= 2.8) {
              chunk.setBlock(lx, 60, lz, bedrockId);
              if (rad >= 2.0) {
                chunk.setBlock(lx, 61, lz, bedrockId);
              }
            }
            // Center bedrock pillar with dragon egg
            if (wx === 0 && wz === 0) {
              chunk.setBlock(lx, 61, lz, bedrockId);
              chunk.setBlock(lx, 62, lz, bedrockId);
              chunk.setBlock(lx, 63, lz, bedrockId);
              chunk.setBlock(lx, 64, lz, Registries.getBlock('dragon_egg')?.numId || bedrockId);
            }
          }

          // Central Island End Gateway at (72, 70, 0)
          if (wx === 72 && wz === 0) {
            for (let y = 68; y <= 72; y++) {
              chunk.setBlock(lx, y, lz, y === 70 ? endGatewayId : bedrockId);
            }
          }
        }

        // Obsidian Pillars
        if (isCentralIsland) {
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
              // Iron bar cage around crystal
              if (p.caged && Math.abs(wx - p.x) <= 1.5 && Math.abs(wz - p.z) <= 1.5) {
                for (let y = p.height + 1; y <= p.height + 3; y++) {
                  if (Math.abs(wx - p.x) > 0.5 || Math.abs(wz - p.z) > 0.5) {
                    chunk.setBlock(lx, y, lz, barsId);
                  }
                }
                chunk.setBlock(lx, p.height + 4, lz, barsId);
              }
            }
          }
        }

        // Outer End Islands (R > 750)
        if (isOuterIslands) {
          const islandDensity = this.smoothNoise(wx, wz, 95, 777);
          if (islandDensity > 0.48) {
            const topY = Math.floor(58 + this.smoothNoise(wx, wz, 24, 888) * 8.0);
            const thickness = Math.floor((islandDensity - 0.48) * 45.0);
            const botY = Math.max(25, topY - thickness);

            for (let y = botY; y <= topY; y++) {
              chunk.setBlock(lx, y, lz, endStoneId);
            }
          }
        }
      }
    }

    // Outer Islands Chorus Plants, End Cities & End Ships
    if (isOuterIslands) {
      // 1. Chorus Plants
      for (let lx = 2; lx < 14; lx += 5) {
        for (let lz = 2; lz < 14; lz += 5) {
          if (this.hash2D(cx * 11 + lx, cz * 13 + lz, 919) > 0.65) {
            for (let y = 45; y < 70; y++) {
              if (chunk.getBlock(lx, y, lz) === endStoneId && chunk.getBlock(lx, y + 1, lz) === 0) {
                const plantH = 4 + Math.floor(this.hash2D(cx + lx, cz + lz, 920) * 5);
                for (let py = 1; py <= plantH; py++) {
                  chunk.setBlock(lx, y + py, lz, chorusPlantId);
                }
                // Chorus flower on top
                chunk.setBlock(lx, y + plantH + 1, lz, chorusFlowerId);
                // Branches
                if (plantH >= 5) {
                  if (lx + 1 < CHUNK_SIZE) {
                    chunk.setBlock(lx + 1, y + plantH - 1, lz, chorusPlantId);
                    chunk.setBlock(lx + 1, y + plantH, lz, chorusFlowerId);
                  }
                }
                break;
              }
            }
          }
        }
      }

      // 2. End City & End Ship Structure (spaced every ~22 chunks)
      const isEndCityChunk = Math.abs(((cx % 22) + 22) % 22) === 10 && Math.abs(((cz % 22) + 22) % 22) === 10;
      if (isEndCityChunk) {
        let cityBaseY = 0;
        for (let y = 70; y >= 40; y--) {
          if (chunk.getBlock(8, y, 8) === endStoneId) {
            cityBaseY = y;
            break;
          }
        }

        if (cityBaseY > 0) {
          // Central Purpur Tower
          for (let y = cityBaseY + 1; y <= cityBaseY + 18; y++) {
            for (let x = 4; x <= 12; x++) {
              for (let z = 4; z <= 12; z++) {
                const isWall = x === 4 || x === 12 || z === 4 || z === 12;
                const isCorner = (x === 4 || x === 12) && (z === 4 || z === 12);
                if (isCorner) {
                  chunk.setBlock(x, y, z, purpurPillarId);
                } else if (isWall) {
                  chunk.setBlock(x, y, z, purpurId);
                } else {
                  chunk.setBlock(x, y, z, 0);
                }
              }
            }
          }

          // Shulker mobs guarding the tower walls
          mobs.push({ type: 'shulker', x: cx * CHUNK_SIZE + 4, y: cityBaseY + 6, z: cz * CHUNK_SIZE + 8 });
          mobs.push({ type: 'shulker', x: cx * CHUNK_SIZE + 12, y: cityBaseY + 12, z: cz * CHUNK_SIZE + 8 });

          // End Ship docked beside tower (at cx + 1, cz)
          // Ship features: purpur hull, dragon head on bow, elytra in cabin
          const shipY = cityBaseY + 15;
          for (let x = 1; x <= 15; x++) {
            chunk.setBlock(x, shipY, 2, purpurId);
            chunk.setBlock(x, shipY, 3, purpurPillarId);
            chunk.setBlock(x, shipY, 4, purpurId);
          }
          // Bow dragon head
          chunk.setBlock(15, shipY + 1, 3, Registries.getBlock('dragon_head')?.numId || purpurId);
          // Cabin treasure chest
          if (chestId) {
            chunk.setBlock(5, shipY + 1, 3, chestId);
          }
        }
      }

      // 3. Return End Gateway at (1200, 70, 1200)
      if (Math.abs(cx * CHUNK_SIZE - 1200) < CHUNK_SIZE && Math.abs(cz * CHUNK_SIZE - 1200) < CHUNK_SIZE) {
        const lx = ((1200 % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
        const lz = ((1200 % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
        for (let y = 68; y <= 72; y++) {
          chunk.setBlock(lx, y, lz, y === 70 ? endGatewayId : bedrockId);
        }
      }
    }

    return { chunk, cushions, crystals, mobs };
  }
}
