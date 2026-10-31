import * as THREE from 'three';
import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT, BIOMES_26_3 } from './Chunk';
import { WorldGen26_3, AbandonedCampLocation, CushionEntityData } from './WorldGen26_3';
import { Registries } from '../core/Registries';
import { TextureAtlas } from '../render/TextureAtlas';
import { EntityRenderer } from '../render/EntityRenderer';
import { ParticleSystem } from '../render/ParticleSystem';
import { OptionsManager } from '../core/Options';
import { AudioEngine } from '../core/AudioEngine';

export class World {
  scene: THREE.Scene;
  chunks = new Map<string, Chunk>();
  abandonedCamps: AbandonedCampLocation[] = [];
  solidMaterial: THREE.MeshLambertMaterial;
  waterMaterial: THREE.MeshLambertMaterial;
  entityRenderer: EntityRenderer;
  particleSystem: ParticleSystem;
  timeOfDay = 1000; // 0..24000 ticks (1000 = Morning, 6000 = Noon, 13000 = Dusk, 18000 = Midnight)
  worldName = 'Wilderness Bound (26.3)';
  blockDiffs = new Map<string, { numId: number; meta: number }>();
  dimension: 'overworld' | 'nether' | 'the_end' = 'overworld';
  allowCommands: boolean = true;
  overworldChunks = new Map<string, Chunk>();
  netherChunks = new Map<string, Chunk>();
  endChunks = new Map<string, Chunk>();
  overworldDiffs = new Map<string, { numId: number; meta: number }>();
  netherDiffs = new Map<string, { numId: number; meta: number }>();
  endDiffs = new Map<string, { numId: number; meta: number }>();
  dragonSpawned = false;

  constructor(scene: THREE.Scene, entityRenderer: EntityRenderer, particleSystem: ParticleSystem) {
    this.scene = scene;
    this.entityRenderer = entityRenderer;
    this.particleSystem = particleSystem;

    this.solidMaterial = new THREE.MeshLambertMaterial({
      map: TextureAtlas.texture,
      vertexColors: true,
      alphaTest: 0.15,
    });

    this.waterMaterial = new THREE.MeshLambertMaterial({
      map: TextureAtlas.texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    });
  }

  private chunkKey(cx: number, cz: number): string {
    return `${cx},${cz}`;
  }

  getChunk(cx: number, cz: number): Chunk | undefined {
    return this.chunks.get(this.chunkKey(cx, cz));
  }

  ensureChunk(cx: number, cz: number): Chunk {
    const key = this.chunkKey(cx, cz);
    let chunk = this.chunks.get(key);
    if (!chunk) {
      if (this.dimension === 'nether') {
        const gen = WorldGen26_3.generateNetherChunk(cx, cz);
        chunk = gen.chunk;
      } else if (this.dimension === 'the_end') {
        const gen = WorldGen26_3.generateEndChunk(cx, cz);
        chunk = gen.chunk;
        for (const cry of gen.crystals) {
          const cid = `crystal_${cry.x}_${cry.y}_${cry.z}`;
          this.entityRenderer.spawnMob(cid, 'end_crystal', cry.x, cry.y, cry.z);
        }
        if (!this.dragonSpawned && Math.abs(cx) <= 1 && Math.abs(cz) <= 1) {
          this.dragonSpawned = true;
          this.entityRenderer.spawnMob('ender_dragon_boss', 'ender_dragon', 0, 75, 0, 'Ender Dragon');
        }
      } else {
        const gen = WorldGen26_3.generateChunk(cx, cz);
        chunk = gen.chunk;
        for (const c of gen.cushions) {
          this.entityRenderer.addCushion(c);
        }
        if (gen.camp) {
          this.abandonedCamps.push(gen.camp);
        }
      }
      this.chunks.set(key, chunk);

      // Apply any saved player block edits in this chunk
      for (let lz = 0; lz < CHUNK_SIZE; lz++) {
        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
          const wx = cx * CHUNK_SIZE + lx;
          const wz = cz * CHUNK_SIZE + lz;
          for (let y = 0; y < CHUNK_HEIGHT; y++) {
            const diff = this.blockDiffs.get(`${wx},${y},${wz}`);
            if (diff) {
              chunk.setBlock(lx, y, lz, diff.numId, diff.meta);
            }
          }
        }
      }

      // Mark adjacent chunks dirty so their borders re-cull against this newly generated chunk!
      const north = this.getChunk(cx, cz - 1);
      if (north) north.dirty = true;
      const south = this.getChunk(cx, cz + 1);
      if (south) south.dirty = true;
      const east = this.getChunk(cx + 1, cz);
      if (east) east.dirty = true;
      const west = this.getChunk(cx - 1, cz);
      if (west) west.dirty = true;
    }
    return chunk;
  }

  switchDimension(target: 'overworld' | 'nether' | 'the_end'): void {
    if (this.dimension === target) return;
    for (const chunk of this.chunks.values()) {
      if (chunk.solidMesh) this.scene.remove(chunk.solidMesh);
      if (chunk.waterMesh) this.scene.remove(chunk.waterMesh);
    }
    if (this.dimension === 'overworld') {
      this.overworldChunks = new Map(this.chunks);
      this.overworldDiffs = new Map(this.blockDiffs);
    } else if (this.dimension === 'nether') {
      this.netherChunks = new Map(this.chunks);
      this.netherDiffs = new Map(this.blockDiffs);
    } else {
      this.endChunks = new Map(this.chunks);
      this.endDiffs = new Map(this.blockDiffs);
    }
    this.dimension = target;
    this.chunks.clear();
    this.blockDiffs.clear();
    const sourceChunks =
      target === 'overworld'
        ? this.overworldChunks
        : target === 'nether'
        ? this.netherChunks
        : this.endChunks;
    const sourceDiffs =
      target === 'overworld'
        ? this.overworldDiffs
        : target === 'nether'
        ? this.netherDiffs
        : this.endDiffs;
    for (const [k, v] of sourceChunks) {
      v.dirty = true;
      this.chunks.set(k, v);
    }
    for (const [k, v] of sourceDiffs) {
      this.blockDiffs.set(k, v);
    }
  }

  getBlock(wx: number, wy: number, wz: number): number {
    if (wy < 0 || wy >= CHUNK_HEIGHT) return 0;
    const cx = Math.floor(wx / CHUNK_SIZE);
    const cz = Math.floor(wz / CHUNK_SIZE);
    const chunk = this.chunks.get(this.chunkKey(cx, cz));
    if (!chunk) {
      if (this.dimension === 'nether') {
        if (wy <= 0 || wy >= 127) return Registries.getBlock('bedrock').numId;
        if (wy <= 31) return Registries.getBlock('lava').numId;
        return Registries.getBlock('netherrack').numId;
      }
      if (this.dimension === 'the_end') {
        const d = Math.hypot(wx, wz);
        if (d < 75 && wy >= 35 && wy <= 62) return Registries.getBlock('end_stone')?.numId || 1;
        return 0;
      }
      return WorldGen26_3.getBlockAt(wx, Math.floor(wy), wz);
    }
    const lx = ((wx % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const lz = ((wz % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    return chunk.getBlock(lx, Math.floor(wy), lz);
  }

  getMeta(wx: number, wy: number, wz: number): number {
    if (wy < 0 || wy >= CHUNK_HEIGHT) return 0;
    const cx = Math.floor(wx / CHUNK_SIZE);
    const cz = Math.floor(wz / CHUNK_SIZE);
    const chunk = this.chunks.get(this.chunkKey(cx, cz));
    if (!chunk) return 0;
    const lx = ((wx % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const lz = ((wz % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    return chunk.getMeta(lx, Math.floor(wy), lz);
  }

  setBlock(wx: number, wy: number, wz: number, blockNumId: number, meta = 0, recordDiff = true) {
    if (wy < 0 || wy >= CHUNK_HEIGHT) return;
    const bx = Math.floor(wx);
    const by = Math.floor(wy);
    const bz = Math.floor(wz);
    const cx = Math.floor(bx / CHUNK_SIZE);
    const cz = Math.floor(bz / CHUNK_SIZE);
    const chunk = this.ensureChunk(cx, cz);
    const lx = ((bx % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const lz = ((bz % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;

    chunk.setBlock(lx, by, lz, blockNumId, meta);
    if (recordDiff) {
      this.blockDiffs.set(`${bx},${by},${bz}`, { numId: blockNumId, meta });
    }

    // Mark adjacent chunks dirty if on chunk border
    if (lx === 0) {
      const nb = this.getChunk(cx - 1, cz);
      if (nb) nb.dirty = true;
    } else if (lx === CHUNK_SIZE - 1) {
      const nb = this.getChunk(cx + 1, cz);
      if (nb) nb.dirty = true;
    }
    if (lz === 0) {
      const nb = this.getChunk(cx, cz - 1);
      if (nb) nb.dirty = true;
    } else if (lz === CHUNK_SIZE - 1) {
      const nb = this.getChunk(cx, cz + 1);
      if (nb) nb.dirty = true;
    }
  }

  checkGravity(
    wx: number,
    wy: number,
    wz: number,
    onSpawnFalling?: (bx: number, by: number, bz: number, blockId: string, targetY: number, meta: number) => void
  ) {
    const sandId = Registries.getBlock('sand')?.numId;
    const gravelId = Registries.getBlock('gravel')?.numId;
    if (!sandId && !gravelId) return;

    let curY = Math.max(1, Math.floor(wy));
    const bx = Math.floor(wx);
    const bz = Math.floor(wz);

    while (curY < CHUNK_HEIGHT) {
      const b = this.getBlock(bx, curY, bz);
      if (b === sandId || b === gravelId) {
        let fallY = curY;
        while (fallY > 0) {
          const below = this.getBlock(bx, fallY - 1, bz);
          const belowDef = Registries.getBlock(below);
          if (below === 0 || (belowDef && (!belowDef.solid || belowDef.soundGroup === 'grass'))) {
            fallY--;
          } else {
            break;
          }
        }
        if (fallY < curY) {
          const meta = this.getMeta(bx, curY, bz);
          const blockDef = Registries.getBlock(b);
          this.setBlock(bx, curY, bz, 0);
          if (onSpawnFalling && blockDef) {
            onSpawnFalling(bx, curY, bz, blockDef.shortId, fallY, meta);
          } else {
            this.setBlock(bx, fallY, bz, b, meta);
          }
        }
      } else if (b !== 0) {
        const def = Registries.getBlock(b);
        if (def && def.solid) break;
      }
      curY++;
    }
  }

  checkFluidContact(bx: number, by: number, bz: number) {
    const curBlock = this.getBlock(bx, by, bz);
    const curDef = Registries.getBlock(curBlock);
    if (!curDef) return;

    const waterId = Registries.getBlock('water')?.numId;
    const lavaId = Registries.getBlock('lava')?.numId;
    const obsidianId = Registries.getBlock('obsidian')?.numId;
    const cobblestoneId = Registries.getBlock('cobblestone')?.numId;

    if (!waterId || !lavaId || !obsidianId || !cobblestoneId) return;

    const neighbors = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];

    if (curDef.fluid === 'water' || curDef.shortId === 'water') {
      for (const [dx, dy, dz] of neighbors) {
        const nb = this.getBlock(bx + dx, by + dy, bz + dz);
        const nbDef = Registries.getBlock(nb);
        if (nbDef && (nbDef.fluid === 'lava' || nbDef.shortId === 'lava')) {
          this.setBlock(bx + dx, by + dy, bz + dz, obsidianId);
          AudioEngine.play('block.lava.extinguish', 0.85);
          this.particleSystem.spawnDeathPoof(bx + dx + 0.5, by + dy + 1.0, bz + dz + 0.5);
        }
      }
    } else if (curDef.fluid === 'lava' || curDef.shortId === 'lava') {
      for (const [dx, dy, dz] of neighbors) {
        const nb = this.getBlock(bx + dx, by + dy, bz + dz);
        const nbDef = Registries.getBlock(nb);
        if (nbDef && (nbDef.fluid === 'water' || nbDef.shortId === 'water')) {
          this.setBlock(bx, by, bz, obsidianId);
          AudioEngine.play('block.lava.extinguish', 0.85);
          this.particleSystem.spawnDeathPoof(bx + 0.5, by + 1.0, bz + 0.5);
          break;
        }
      }
    }
  }

  checkRedstone(
    bx: number,
    by: number,
    bz: number,
    onTntIgnite?: (x: number, y: number, z: number) => void
  ) {
    const lampOff = Registries.getBlock('redstone_lamp')?.numId;
    const lampOn = Registries.getBlock('redstone_lamp_on')?.numId;
    const tntId = Registries.getBlock('tnt')?.numId;
    const redstoneBlockId = Registries.getBlock('redstone_block')?.numId;
    const redstoneTorchId = Registries.getBlock('redstone_torch')?.numId;
    const leverId = Registries.getBlock('lever')?.numId;

    const isPowered = (x: number, y: number, z: number): boolean => {
      const neighbors = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ];
      for (const [dx, dy, dz] of neighbors) {
        const nb = this.getBlock(x + dx, y + dy, z + dz);
        if (nb === redstoneBlockId || nb === redstoneTorchId) return true;
        if (nb === leverId) {
          const meta = this.getMeta(x + dx, y + dy, z + dz);
          if (meta === 1) return true;
        }
      }
      return false;
    };

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const tx = bx + dx;
          const ty = by + dy;
          const tz = bz + dz;
          const b = this.getBlock(tx, ty, tz);
          const powered = isPowered(tx, ty, tz);
          if (lampOff && lampOn) {
            if (b === lampOff && powered) {
              this.setBlock(tx, ty, tz, lampOn);
            } else if (b === lampOn && !powered) {
              this.setBlock(tx, ty, tz, lampOff);
            }
          }
          if (tntId && b === tntId && powered) {
            this.setBlock(tx, ty, tz, 0);
            onTntIgnite?.(tx + 0.5, ty + 0.5, tz + 0.5);
          }
        }
      }
    }
  }

  getBiomeName(wx: number, wz: number): string {
    const cx = Math.floor(wx / CHUNK_SIZE);
    const cz = Math.floor(wz / CHUNK_SIZE);
    const chunk = this.getChunk(cx, cz);
    if (!chunk) return 'minecraft:dappled_forest';
    const lx = ((Math.floor(wx) % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const lz = ((Math.floor(wz) % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    return chunk.getBiome(lx, lz).id;
  }

  getTopSolidY(wx: number, wz: number): number {
    const bx = Math.floor(wx);
    const bz = Math.floor(wz);
    this.ensureChunk(Math.floor(bx / CHUNK_SIZE), Math.floor(bz / CHUNK_SIZE));
    for (let y = CHUNK_HEIGHT - 1; y >= 1; y--) {
      const b = this.getBlock(bx, y, bz);
      if (b !== 0) {
        const def = Registries.getBlock(b);
        if (def.solid && !def.shortId.includes('leaves')) {
          return y + 1;
        }
      }
    }
    return 65;
  }

  updateChunksAroundPlayer(px: number, pz: number) {
    const centerCx = Math.floor(px / CHUNK_SIZE);
    const centerCz = Math.floor(pz / CHUNK_SIZE);
    const radius = OptionsManager.current.renderDistance || 4;

    // Ensure chunks within radius + 1 exist so all meshed chunks have neighbor data
    const genRadius = radius + 1;
    for (let dz = -genRadius; dz <= genRadius; dz++) {
      for (let dx = -genRadius; dx <= genRadius; dx++) {
        if (dx * dx + dz * dz <= (genRadius + 0.5) * (genRadius + 0.5)) {
          this.ensureChunk(centerCx + dx, centerCz + dz);
        }
      }
    }

    // Rebuild up to 3 dirty chunks per frame for smooth FPS
    let rebuilt = 0;
    const boundGetBlock = (wx: number, wy: number, wz: number): number => {
      return this.getBlock(wx, wy, wz);
    };

    for (let dz = -radius; dz <= radius; dz++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const chunk = this.getChunk(centerCx + dx, centerCz + dz);
        if (chunk && chunk.dirty) {
          const hadSolid = !!chunk.solidMesh;
          const hadWater = !!chunk.waterMesh;
          chunk.buildMeshes(boundGetBlock, this.solidMaterial, this.waterMaterial);
          if (!hadSolid && chunk.solidMesh) this.scene.add(chunk.solidMesh);
          if (!hadWater && chunk.waterMesh) this.scene.add(chunk.waterMesh);
          rebuilt++;
          if (rebuilt >= 3) break;
        }
      }
      if (rebuilt >= 3) break;
    }

    // Hide far chunks outside radius + 2
    for (const [, chunk] of this.chunks) {
      const distSq = (chunk.cx - centerCx) ** 2 + (chunk.cz - centerCz) ** 2;
      const visible = distSq <= (radius + 1.5) ** 2;
      if (chunk.solidMesh) chunk.solidMesh.visible = visible;
      if (chunk.waterMesh) chunk.waterMesh.visible = visible;
    }
  }

  tickAmbientParticles(px: number, py: number, pz: number) {
    const orangeId = Registries.getBlock('orange_poplar_leaves').numId;
    const redId = Registries.getBlock('red_poplar_leaves').numId;
    const yellowId = Registries.getBlock('yellow_poplar_leaves').numId;
    const campfireId = Registries.getBlock('campfire').numId;

    // Sample random nearby blocks for falling poplar leaves and campfire smoke
    for (let i = 0; i < 6; i++) {
      const rx = Math.floor(px + (Math.random() - 0.5) * 28);
      const ry = Math.floor(py + (Math.random() - 0.3) * 18);
      const rz = Math.floor(pz + (Math.random() - 0.5) * 28);
      const b = this.getBlock(rx, ry, rz);
      if (b === orangeId && this.getBlock(rx, ry - 1, rz) === 0) {
        this.particleSystem.spawnPoplarLeaf(rx, ry, rz, 'orange');
      } else if (b === redId && this.getBlock(rx, ry - 1, rz) === 0) {
        this.particleSystem.spawnPoplarLeaf(rx, ry, rz, 'red');
      } else if (b === yellowId && this.getBlock(rx, ry - 1, rz) === 0) {
        this.particleSystem.spawnPoplarLeaf(rx, ry, rz, 'yellow');
      } else if (b === campfireId) {
        this.particleSystem.spawnCampfireSmoke(rx, ry, rz);
      }
    }
  }

  findNearestAbandonedCamp(px: number, pz: number): AbandonedCampLocation | null {
    // Search spiral chunks around player to ensure at least one camp is discovered
    const centerCx = Math.floor(px / CHUNK_SIZE);
    const centerCz = Math.floor(pz / CHUNK_SIZE);
    for (let r = 0; r <= 6; r++) {
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          this.ensureChunk(centerCx + dx, centerCz + dz);
        }
      }
    }
    if (this.abandonedCamps.length === 0) return null;
    let best = this.abandonedCamps[0];
    let bestDist = Infinity;
    for (const c of this.abandonedCamps) {
      const d = Math.hypot(c.x - px, c.z - pz);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    return best;
  }

  resetWorld(seed: string | number, worldType: typeof WorldGen26_3.worldType, name: string) {
    for (const [, chunk] of this.chunks) {
      if (chunk.solidMesh) {
        this.scene.remove(chunk.solidMesh);
        chunk.solidMesh.geometry.dispose();
      }
      if (chunk.waterMesh) {
        this.scene.remove(chunk.waterMesh);
        chunk.waterMesh.geometry.dispose();
      }
    }
    this.chunks.clear();
    this.abandonedCamps = [];
    this.blockDiffs.clear();
    this.entityRenderer.clearAll();
    WorldGen26_3.setSeed(seed);
    WorldGen26_3.worldType = worldType;
    this.worldName = name;
  }
}
