import * as THREE from 'three';
import { DYE_HEX_MAP, Registries } from '../core/Registries';
import { TextureAtlas } from './TextureAtlas';
import { CushionEntityData } from '../world/WorldGen26_3';

export interface DroppedItemEntity {
  id: string;
  itemId: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  age: number;
  mesh: THREE.Mesh;
}

export interface MobEntity {
  id: string;
  type: 'pig' | 'cow' | 'sheep' | 'remote_player';
  name?: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  yaw: number;
  walkPhase: number;
  aiTimer: number;
  health: number;
  maxHealth: number;
  hurtTimer: number;
  panicTimer: number;
  deathTimer: number;
  dead: boolean;
  mesh: THREE.Group;
  legs?: THREE.Mesh[];
}

/**
 * Renders Minecraft 26.3 Entities:
 * - `net.minecraft.world.entity.decoration.Cushion` (16 colors with official `/assets/minecraft/textures/entity/cushion/<color>_cushion.png`)
 * - Passive Mobs (`SheepModel` + `SheepWoolLayer`, `PigModel`, `CowModel`) & Remote Wispcraft Multiplayer Players (`PlayerModel`)
 *   with exact per-face `ModelPart$Cube` UV sub-region mapping from `/assets/minecraft/textures/entity/`.
 */
export class EntityRenderer {
  scene: THREE.Scene;
  cushions = new Map<string, { data: CushionEntityData; mesh: THREE.Mesh }>();
  mobs = new Map<string, MobEntity>();
  droppedItems = new Map<string, DroppedItemEntity>();
  cushionTextures = new Map<string, THREE.Texture>();
  entityImages = new Map<string, HTMLImageElement>();
  textureLoader = new THREE.TextureLoader();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  private loadEntityImage(url: string, onLoad: (img: HTMLImageElement) => void): void {
    const cached = this.entityImages.get(url);
    if (cached) {
      onLoad(cached);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.entityImages.set(url, img);
      onLoad(img);
    };
    img.src = url;
  }

  /** Crop a sub-rectangle (sx, sy, sw, sh) from an entity texture sheet into a Nearest-Filtered CanvasTexture */
  private cropSubTexture(
    img: HTMLImageElement,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    rotate90 = false
  ): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = Math.max(1, (rotate90 ? sh : sw) * 4);
    c.height = Math.max(1, (rotate90 ? sw : sh) * 4);
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    if (rotate90) {
      ctx.translate(c.width, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.height, c.width);
    } else {
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /**
   * Create an upright ModelPart$Cube mesh (head, snout, leg, torso, arm) where +Z is the front face (eyes/face).
   * Standard Minecraft UV layout at (u, v) for box of pixel dimensions (dx, dy, dz):
   * - +X (left side):  (u + dz + dx, v + dz, dz, dy)
   * - -X (right side): (u, v + dz, dz, dy)
   * - +Y (top):        (u + dz, v, dx, dz)
   * - -Y (bottom):     (u + dz + dx, v, dx, dz)
   * - +Z (front face): (u + dz, v + dz, dx, dy)
   * - -Z (back face):  (u + 2*dz + dx, v + dz, dx, dy)
   */
  private createUprightPartMesh(
    dx: number,
    dy: number,
    dz: number,
    inflate = 0,
    fallbackColor = 0xffffff
  ): {
    mesh: THREE.Mesh;
    applyTexture: (img: HTMLImageElement, u: number, v: number, transparent?: boolean) => void;
  } {
    const geo = new THREE.BoxGeometry(
      (dx + inflate * 2) / 16,
      (dy + inflate * 2) / 16,
      (dz + inflate * 2) / 16
    );
    const mats = Array.from(
      { length: 6 },
      () => new THREE.MeshLambertMaterial({ color: fallbackColor })
    );
    const mesh = new THREE.Mesh(geo, mats);

    const applyTexture = (img: HTMLImageElement, u: number, v: number, transparent = false) => {
      const faceTexs = [
        this.cropSubTexture(img, u + dz + dx, v + dz, dz, dy), // +X
        this.cropSubTexture(img, u, v + dz, dz, dy), // -X
        this.cropSubTexture(img, u + dz, v, dx, dz), // +Y
        this.cropSubTexture(img, u + dz + dx, v, dx, dz), // -Y
        this.cropSubTexture(img, u + dz, v + dz, dx, dy), // +Z (front)
        this.cropSubTexture(img, u + dz + dx + dz, v + dz, dx, dy), // -Z (back)
      ];
      for (let i = 0; i < 6; i++) {
        mats[i].map = faceTexs[i];
        mats[i].color.setHex(0xffffff);
        mats[i].transparent = transparent;
        mats[i].alphaTest = transparent ? 0.1 : 0;
        mats[i].needsUpdate = true;
      }
    };

    return { mesh, applyTexture };
  }

  /**
   * Create a Quadruped horizontal body box (which in Minecraft is a box of size (dx, dy_length, dz_height)
   * rotated +90° around X so the front face (u+dz, v+dz, dx, dy_length) becomes the animal's +Y top back).
   */
  private createQuadrupedBodyMesh(
    dx: number,
    dyLength: number,
    dzHeight: number,
    inflate = 0,
    fallbackColor = 0xffffff
  ): {
    mesh: THREE.Mesh;
    applyTexture: (img: HTMLImageElement, u: number, v: number, transparent?: boolean) => void;
  } {
    const geo = new THREE.BoxGeometry(
      (dx + inflate * 2) / 16,
      (dzHeight + inflate * 2) / 16,
      (dyLength + inflate * 2) / 16
    );
    const mats = Array.from(
      { length: 6 },
      () => new THREE.MeshLambertMaterial({ color: fallbackColor })
    );
    const mesh = new THREE.Mesh(geo, mats);

    const applyTexture = (img: HTMLImageElement, u: number, v: number, transparent = false) => {
      const dz = dzHeight;
      const dy = dyLength;
      const faceTexs = [
        this.cropSubTexture(img, u + dz + dx, v + dz, dz, dy, true), // +X (left flank)
        this.cropSubTexture(img, u, v + dz, dz, dy, true), // -X (right flank)
        this.cropSubTexture(img, u + dz, v + dz, dx, dy), // +Y (top back)
        this.cropSubTexture(img, u + dz + dx + dz, v + dz, dx, dy), // -Y (belly)
        this.cropSubTexture(img, u + dz, v, dx, dz), // +Z (front chest)
        this.cropSubTexture(img, u + dz + dx, v, dx, dz), // -Z (rear)
      ];
      for (let i = 0; i < 6; i++) {
        mats[i].map = faceTexs[i];
        mats[i].color.setHex(0xffffff);
        mats[i].transparent = transparent;
        mats[i].alphaTest = transparent ? 0.1 : 0;
        mats[i].needsUpdate = true;
      }
    };

    return { mesh, applyTexture };
  }

  private getCushionMaterial(color: string): THREE.MeshLambertMaterial {
    let tex = this.cushionTextures.get(color);
    if (!tex) {
      tex = this.textureLoader.load(`/assets/minecraft/textures/entity/cushion/${color}_cushion.png`);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      this.cushionTextures.set(color, tex);
    }
    return new THREE.MeshLambertMaterial({
      map: tex,
      color: 0xffffff,
    });
  }

  addCushion(data: CushionEntityData) {
    if (this.cushions.has(data.id)) return;

    const geo = new THREE.BoxGeometry(0.875, 0.375, 0.875);
    const mat = this.getCushionMaterial(data.color);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(data.x, data.blockY + 0.1875, data.z);
    mesh.rotation.y = (data.rotation * Math.PI) / 180;
    mesh.userData = { isCushion: true, cushionId: data.id };

    const tuftGeo = new THREE.BoxGeometry(0.16, 0.05, 0.16);
    const tuftMat = new THREE.MeshLambertMaterial({
      color: DYE_HEX_MAP[data.color] || 0xf9801d,
    });
    const tuft = new THREE.Mesh(tuftGeo, tuftMat);
    tuft.position.set(0, 0.2, 0);
    mesh.add(tuft);

    this.scene.add(mesh);
    this.cushions.set(data.id, { data, mesh });
  }

  removeCushion(id: string): CushionEntityData | undefined {
    const entry = this.cushions.get(id);
    if (!entry) return undefined;
    this.scene.remove(entry.mesh);
    entry.mesh.geometry.dispose();
    this.cushions.delete(id);
    return entry.data;
  }

  findCushionAtBlock(bx: number, by: number, bz: number): CushionEntityData | undefined {
    for (const [, entry] of this.cushions) {
      if (entry.data.blockX === bx && entry.data.blockY === by && entry.data.blockZ === bz) {
        return entry.data;
      }
    }
    return undefined;
  }

  spawnMob(id: string, type: MobEntity['type'], x: number, y: number, z: number, name?: string) {
    if (this.mobs.has(id)) return;
    const group = new THREE.Group();
    const legs: THREE.Mesh[] = [];

    if (type === 'remote_player') {
      const head = this.createUprightPartMesh(8, 8, 8, 0, 0xb58668);
      head.mesh.position.set(0, 28 / 16, 0);
      const hat = this.createUprightPartMesh(8, 8, 8, 0.5, 0x332211);
      hat.mesh.position.set(0, 28 / 16, 0);
      const body = this.createUprightPartMesh(8, 12, 4, 0, 0x00aaaa);
      body.mesh.position.set(0, 18 / 16, 0);
      const rArm = this.createUprightPartMesh(4, 12, 4, 0, 0xb58668);
      rArm.mesh.position.set(-6 / 16, 18 / 16, 0);
      const lArm = this.createUprightPartMesh(4, 12, 4, 0, 0xb58668);
      lArm.mesh.position.set(6 / 16, 18 / 16, 0);
      const rLeg = this.createUprightPartMesh(4, 12, 4, 0, 0x3333aa);
      rLeg.mesh.position.set(-2 / 16, 6 / 16, 0);
      const lLeg = this.createUprightPartMesh(4, 12, 4, 0, 0x3333aa);
      lLeg.mesh.position.set(2 / 16, 6 / 16, 0);

      legs.push(rLeg.mesh, lLeg.mesh);
      group.add(head.mesh, hat.mesh, body.mesh, rArm.mesh, lArm.mesh, rLeg.mesh, lLeg.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/player/wide/steve.png', (img) => {
        head.applyTexture(img, 0, 0);
        hat.applyTexture(img, 32, 0, true);
        body.applyTexture(img, 16, 16);
        rArm.applyTexture(img, 40, 16);
        lArm.applyTexture(img, 32, 48);
        rLeg.applyTexture(img, 0, 16);
        lLeg.applyTexture(img, 16, 48);
      });
    } else if (type === 'sheep') {
      // SheepModel (sheep.png 64x32) + SheepFurModel (sheep_wool.png 64x32)
      // Neck offset (0, 6, -8) => y = 18/16, z = +8/16.
      // Skin head addBox(-3, -4, -6, 6, 6, 8) => center (0, 19/16, 10/16)
      const head = this.createUprightPartMesh(6, 6, 8, 0, 0xe5c4a9);
      head.mesh.position.set(0, 19 / 16, 10 / 16);
      // Wool hood addBox(-3, -4, -4, 6, 6, 6, 0.6F) => center (0, 19/16, 9/16), leaving front 2px of face exposed!
      const headWool = this.createUprightPartMesh(6, 6, 6, 0.6, 0xf5f5f4);
      headWool.mesh.position.set(0, 19 / 16, 9 / 16);

      const body = this.createQuadrupedBodyMesh(8, 16, 6, 0, 0xe5c4a9);
      body.mesh.position.set(0, 15 / 16, 0);
      const bodyWool = this.createQuadrupedBodyMesh(8, 16, 6, 1.75, 0xf5f5f4);
      bodyWool.mesh.position.set(0, 15 / 16, 0);

      // Front legs at z = +5/16, Hind legs at z = -7/16, hip pivot at y = 12/16
      const legCoords: Array<[number, number]> = [
        [-3 / 16, 5 / 16],
        [3 / 16, 5 / 16],
        [-3 / 16, -7 / 16],
        [3 / 16, -7 / 16],
      ];
      const legParts = legCoords.map(([lx, lz]) => {
        const leg = this.createUprightPartMesh(4, 12, 4, 0, 0xe5c4a9);
        leg.mesh.geometry.translate(0, -6 / 16, 0);
        leg.mesh.position.set(lx, 12 / 16, lz);
        const wool = this.createUprightPartMesh(4, 6, 4, 0.5, 0xf5f5f4);
        wool.mesh.position.set(0, -3 / 16, 0);
        leg.mesh.add(wool.mesh);
        legs.push(leg.mesh);
        group.add(leg.mesh);
        return { leg, wool };
      });

      group.add(head.mesh, headWool.mesh, body.mesh, bodyWool.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/sheep/sheep.png', (img) => {
        head.applyTexture(img, 0, 0);
        body.applyTexture(img, 28, 8);
        for (const lp of legParts) lp.leg.applyTexture(img, 0, 16);
      });
      this.loadEntityImage('/assets/minecraft/textures/entity/sheep/sheep_wool.png', (img) => {
        headWool.applyTexture(img, 0, 0, true);
        bodyWool.applyTexture(img, 28, 8, true);
        for (const lp of legParts) lp.wool.applyTexture(img, 0, 16, true);
      });
    } else if (type === 'pig') {
      // PigModel (pig/pig_temperate.png 64x64)
      // Neck offset (0, 12, -6) => y = 12/16, z = +6/16.
      // Head addBox(-4, -4, -8, 8, 8, 8) => center (0, 12/16, 10/16)
      const head = this.createUprightPartMesh(8, 8, 8, 0, 0xf0a5a2);
      head.mesh.position.set(0, 12 / 16, 10 / 16);
      // Snout addBox(-2, 0, -9, 4, 3, 1) => center (0, 10.5/16, 14.5/16)
      const snout = this.createUprightPartMesh(4, 3, 1, 0, 0xf0a5a2);
      snout.mesh.position.set(0, 10.5 / 16, 14.5 / 16);
      const body = this.createQuadrupedBodyMesh(10, 16, 8, 0, 0xf0a5a2);
      body.mesh.position.set(0, 10 / 16, 0);

      // Front legs at z = +5/16, Hind legs at z = -7/16, hip pivot at y = 6/16
      const legCoords: Array<[number, number]> = [
        [-3 / 16, 5 / 16],
        [3 / 16, 5 / 16],
        [-3 / 16, -7 / 16],
        [3 / 16, -7 / 16],
      ];
      const legParts = legCoords.map(([lx, lz]) => {
        const leg = this.createUprightPartMesh(4, 6, 4, 0, 0xf0a5a2);
        leg.mesh.geometry.translate(0, -3 / 16, 0);
        leg.mesh.position.set(lx, 6 / 16, lz);
        legs.push(leg.mesh);
        group.add(leg.mesh);
        return leg;
      });

      group.add(head.mesh, snout.mesh, body.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/pig/pig_temperate.png', (img) => {
        head.applyTexture(img, 0, 0);
        snout.applyTexture(img, 16, 16);
        body.applyTexture(img, 28, 8);
        for (const l of legParts) l.applyTexture(img, 0, 16);
      });
    } else {
      // CowModel (cow/cow_temperate.png 64x64)
      // Neck offset (0, 4, -8) => y = 20/16, z = +8/16.
      // Head addBox(-4, -4, -6, 8, 8, 6) => center (0, 20/16, 11/16)
      const head = this.createUprightPartMesh(8, 8, 6, 0, 0x6b4c35);
      head.mesh.position.set(0, 20 / 16, 11 / 16);
      const rHorn = this.createUprightPartMesh(1, 3, 1, 0, 0x444444);
      rHorn.mesh.position.set(-4.5 / 16, 23.5 / 16, 11.5 / 16);
      const lHorn = this.createUprightPartMesh(1, 3, 1, 0, 0x444444);
      lHorn.mesh.position.set(4.5 / 16, 23.5 / 16, 11.5 / 16);

      const body = this.createQuadrupedBodyMesh(12, 18, 10, 0, 0x6b4c35);
      body.mesh.position.set(0, 17 / 16, -1 / 16);

      // Front legs at z = +6/16, Hind legs at z = -7/16, hip pivot at y = 12/16
      const legCoords: Array<[number, number]> = [
        [-4 / 16, 6 / 16],
        [4 / 16, 6 / 16],
        [-4 / 16, -7 / 16],
        [4 / 16, -7 / 16],
      ];
      const legParts = legCoords.map(([lx, lz]) => {
        const leg = this.createUprightPartMesh(4, 12, 4, 0, 0x6b4c35);
        leg.mesh.geometry.translate(0, -6 / 16, 0);
        leg.mesh.position.set(lx, 12 / 16, lz);
        legs.push(leg.mesh);
        group.add(leg.mesh);
        return leg;
      });

      group.add(head.mesh, rHorn.mesh, lHorn.mesh, body.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/cow/cow_temperate.png', (img) => {
        head.applyTexture(img, 0, 0);
        rHorn.applyTexture(img, 22, 0);
        lHorn.applyTexture(img, 22, 0);
        body.applyTexture(img, 18, 4);
        for (const l of legParts) l.applyTexture(img, 0, 16);
      });
    }

    const maxHealth = type === 'sheep' ? 8 : 10;
    group.position.set(x, y, z);
    this.scene.add(group);
    this.mobs.set(id, {
      id,
      type,
      name,
      x,
      y,
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      yaw: Math.random() * Math.PI * 2,
      walkPhase: 0,
      aiTimer: 2,
      health: maxHealth,
      maxHealth,
      hurtTimer: 0,
      panicTimer: 0,
      deathTimer: 0,
      dead: false,
      mesh: group,
      legs,
    });
  }

  /**
   * Raycast against all living MobEntity AABBs from camera origin along look direction.
   */
  raycastMob(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    maxDist: number
  ): { mob: MobEntity; distance: number } | null {
    let closest: { mob: MobEntity; distance: number } | null = null;
    let minDist = maxDist;

    for (const [, mob] of this.mobs) {
      if (mob.dead) continue;
      const halfW = mob.type === 'cow' ? 0.55 : 0.48;
      const height = mob.type === 'cow' ? 1.45 : mob.type === 'sheep' ? 1.35 : 1.05;
      const minX = mob.x - halfW;
      const maxX = mob.x + halfW;
      const minY = mob.y - 0.05;
      const maxY = mob.y + height;
      const minZ = mob.z - halfW;
      const maxZ = mob.z + halfW;

      let tmin = -Infinity;
      let tmax = Infinity;

      const axes: Array<[number, number, number, number]> = [
        [origin.x, dir.x, minX, maxX],
        [origin.y, dir.y, minY, maxY],
        [origin.z, dir.z, minZ, maxZ],
      ];

      let hit = true;
      for (const [o, d, bmin, bmax] of axes) {
        if (Math.abs(d) < 1e-6) {
          if (o < bmin || o > bmax) {
            hit = false;
            break;
          }
        } else {
          let t1 = (bmin - o) / d;
          let t2 = (bmax - o) / d;
          if (t1 > t2) {
            const tmp = t1;
            t1 = t2;
            t2 = tmp;
          }
          if (t1 > tmin) tmin = t1;
          if (t2 < tmax) tmax = t2;
          if (tmin > tmax) {
            hit = false;
            break;
          }
        }
      }

      if (hit && tmax >= 0) {
        const dist = tmin >= 0 ? tmin : 0;
        if (dist <= minDist) {
          minDist = dist;
          closest = { mob, distance: dist };
        }
      }
    }

    return closest;
  }

  private setMobHurtTint(mob: MobEntity, isHurt: boolean): void {
    const tintHex = isHurt ? 0xff5555 : 0xffffff;
    mob.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m && 'color' in m && m.color instanceof THREE.Color) {
            m.color.setHex(tintHex);
          }
        }
      }
    });
  }

  /**
   * Attack a mob, applying damage, red hurt flash, knockback impulse, panic fleeing, and loot drops on death.
   */
  attackMob(
    mobId: string,
    damage: number,
    attackerPos: THREE.Vector3,
    onDeathBurst?: (x: number, y: number, z: number) => void
  ): { hit: boolean; killed: boolean; mob?: MobEntity } {
    const mob = this.mobs.get(mobId);
    if (!mob || mob.dead || mob.hurtTimer > 0.22) {
      return { hit: false, killed: false };
    }

    mob.health = Math.max(0, mob.health - damage);
    mob.hurtTimer = 0.45;
    mob.panicTimer = 4.5;
    this.setMobHurtTint(mob, true);

    // Knockback away from attacker
    const dx = mob.x - attackerPos.x;
    const dz = mob.z - attackerPos.z;
    const len = Math.hypot(dx, dz) || 1;
    const nx = dx / len;
    const nz = dz / len;
    mob.vx = nx * 5.2;
    mob.vz = nz * 5.2;
    mob.vy = 4.2;
    mob.yaw = Math.atan2(nx, nz);

    if (mob.health <= 0) {
      mob.dead = true;
      mob.deathTimer = 0.55;
      onDeathBurst?.(mob.x, mob.y + 0.5, mob.z);

      // Spawn official mob loot drops!
      const bx = Math.floor(mob.x);
      const by = Math.floor(mob.y);
      const bz = Math.floor(mob.z);
      if (mob.type === 'sheep') {
        this.spawnDroppedItem(bx, by, bz, 'white_wool');
        const muttonCount = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < muttonCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'mutton');
        }
      } else if (mob.type === 'pig') {
        const porkCount = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < porkCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'porkchop');
        }
      } else if (mob.type === 'cow') {
        const beefCount = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < beefCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'beef');
        }
        const leatherCount = Math.floor(Math.random() * 3);
        for (let i = 0; i < leatherCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'leather');
        }
      }
      return { hit: true, killed: true, mob };
    }

    return { hit: true, killed: false, mob };
  }

  spawnDroppedItem(bx: number, by: number, bz: number, itemId: string) {
    const def = Registries.getItem(itemId);
    if (!def) return;
    const id = `item_${Date.now()}_${Math.random()}`;
    let geo: THREE.BufferGeometry;
    let mat: THREE.Material;

    if (def.isBlock && def.blockNumId !== undefined) {
      const bDef = Registries.getBlock(def.blockNumId);
      geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      const uvAttr = geo.attributes.uv as THREE.BufferAttribute;
      const faces = [
        bDef.textures.east,
        bDef.textures.west,
        bDef.textures.top,
        bDef.textures.bottom,
        bDef.textures.south,
        bDef.textures.north,
      ];
      const shades = [0.72, 0.72, 1.0, 0.55, 0.86, 0.86];
      const colors: number[] = [];
      for (let f = 0; f < 6; f++) {
        const uv = TextureAtlas.getUV(faces[f]);
        const idx = f * 4;
        uvAttr.setXY(idx + 0, uv.u0, uv.v1);
        uvAttr.setXY(idx + 1, uv.u1, uv.v1);
        uvAttr.setXY(idx + 2, uv.u0, uv.v0);
        uvAttr.setXY(idx + 3, uv.u1, uv.v0);

        let tr = 1.0,
          tg = 1.0,
          tb = 1.0;
        if (bDef.tint === 'grass' && f === 2) {
          tr = 0x79 / 255;
          tg = 0xc0 / 255;
          tb = 0x5a / 255;
        } else if (bDef.tint === 'foliage') {
          tr = 0x59 / 255;
          tg = 0xae / 255;
          tb = 0x30 / 255;
        } else if (bDef.tint === 'birch') {
          tr = 0x80 / 255;
          tg = 0xa7 / 255;
          tb = 0x55 / 255;
        } else if (bDef.tint === 'spruce') {
          tr = 0x61 / 255;
          tg = 0x99 / 255;
          tb = 0x61 / 255;
        }
        const sh = shades[f];
        for (let v = 0; v < 4; v++) {
          colors.push(tr * sh, tg * sh, tb * sh);
        }
      }
      uvAttr.needsUpdate = true;
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      mat = new THREE.MeshBasicMaterial({
        map: TextureAtlas.texture,
        vertexColors: true,
        transparent: true,
        alphaTest: 0.1,
      });
    } else {
      geo = new THREE.PlaneGeometry(0.35, 0.35);
      const tex = this.textureLoader.load(`/assets/minecraft/textures/${def.texture}.png`);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.1,
      });
    }

    const mesh = new THREE.Mesh(geo, mat);
    const x = bx + 0.5 + (Math.random() - 0.5) * 0.16;
    const y = by + 0.35;
    const z = bz + 0.5 + (Math.random() - 0.5) * 0.16;
    mesh.position.set(x, y, z);
    this.scene.add(mesh);

    this.droppedItems.set(id, {
      id,
      itemId: def.shortId,
      x,
      y,
      z,
      vx: (Math.random() - 0.5) * 1.1,
      vy: 2.2 + Math.random() * 0.6,
      vz: (Math.random() - 0.5) * 1.1,
      age: 0,
      mesh,
    });
  }

  update(
    dt: number,
    getGroundHeight: (x: number, z: number) => number,
    playerPos?: THREE.Vector3,
    onPickupItem?: (itemId: string) => boolean,
    isSolidAt?: (bx: number, by: number, bz: number) => boolean
  ) {
    // Update bobbing & rotating 3D dropped items + local block floor collision + magnetic pickup
    for (const [id, item] of this.droppedItems) {
      item.age += dt;
      item.vy = Math.max(-18.0, item.vy - 18.0 * dt);

      const nextX = item.x + item.vx * dt;
      if (!isSolidAt || !isSolidAt(Math.floor(nextX), Math.floor(item.y), Math.floor(item.z))) {
        item.x = nextX;
      } else {
        item.vx = -item.vx * 0.3;
      }

      const nextZ = item.z + item.vz * dt;
      if (!isSolidAt || !isSolidAt(Math.floor(item.x), Math.floor(item.y), Math.floor(nextZ))) {
        item.z = nextZ;
      } else {
        item.vz = -item.vz * 0.3;
      }

      const nextY = item.y + item.vy * dt;
      const belowBlockY = Math.floor(nextY - 0.16);
      const hitFloor = isSolidAt
        ? isSolidAt(Math.floor(item.x), belowBlockY, Math.floor(item.z))
        : nextY < getGroundHeight(Math.floor(item.x), Math.floor(item.z)) + 0.18;

      if (hitFloor && item.vy <= 0) {
        item.y = belowBlockY + 1 + 0.16;
        item.vy = 0;
        item.vx *= Math.pow(0.02, dt);
        item.vz *= Math.pow(0.02, dt);
      } else {
        item.y = nextY;
      }

      const bobOffset = Math.sin(item.age * 3.2) * 0.06 + 0.06;
      item.mesh.position.set(item.x, item.y + bobOffset, item.z);
      item.mesh.rotation.y = item.age * 1.8;

      if (playerPos && item.age > 0.2) {
        const dx = playerPos.x - item.x;
        const dy = playerPos.y + 0.75 - item.y;
        const dz = playerPos.z - item.z;
        const dist = Math.hypot(dx, dy, dz);
        if (dist < 2.35) {
          item.x += (dx / dist) * 11.0 * dt;
          item.y += (dy / dist) * 11.0 * dt;
          item.z += (dz / dist) * 11.0 * dt;
          if (dist < 0.95 && onPickupItem && onPickupItem(item.itemId)) {
            this.scene.remove(item.mesh);
            item.mesh.geometry.dispose();
            this.droppedItems.delete(id);
            continue;
          }
        }
      }

      if (item.age > 300) {
        this.scene.remove(item.mesh);
        item.mesh.geometry.dispose();
        this.droppedItems.delete(id);
      }
    }

    for (const [id, mob] of this.mobs) {
      if (mob.type === 'remote_player') continue;

      if (mob.hurtTimer > 0) {
        mob.hurtTimer -= dt;
        if (mob.hurtTimer <= 0) {
          this.setMobHurtTint(mob, false);
        }
      }

      if (mob.dead) {
        mob.deathTimer -= dt;
        const progress = Math.min(1, Math.max(0, 1 - mob.deathTimer / 0.55));
        mob.mesh.rotation.z = progress * (Math.PI / 2);
        if (mob.deathTimer <= 0) {
          this.scene.remove(mob.mesh);
          this.mobs.delete(id);
          // Respawn a new passive mob further away so the wilderness stays alive
          if (playerPos) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 14 + Math.random() * 10;
            const sx = Math.floor(playerPos.x + Math.cos(angle) * dist);
            const sz = Math.floor(playerPos.z + Math.sin(angle) * dist);
            const sy = getGroundHeight(sx, sz);
            this.spawnMob(`${mob.type}_${Date.now()}`, mob.type, sx, sy, sz);
          }
        }
        continue;
      }

      if (mob.panicTimer > 0) {
        mob.panicTimer -= dt;
      }

      mob.aiTimer -= dt;
      if (mob.aiTimer <= 0 && mob.hurtTimer <= 0) {
        if (mob.panicTimer > 0) {
          mob.aiTimer = 0.35 + Math.random() * 0.45;
          mob.yaw += (Math.random() - 0.5) * 2.4;
          const speed = 2.9;
          mob.vx = Math.sin(mob.yaw) * speed;
          mob.vz = Math.cos(mob.yaw) * speed;
        } else {
          mob.aiTimer = 2 + Math.random() * 4;
          if (Math.random() < 0.6) {
            mob.yaw += (Math.random() - 0.5) * 2.2;
            const speed = 1.2;
            mob.vx = Math.sin(mob.yaw) * speed;
            mob.vz = Math.cos(mob.yaw) * speed;
          } else {
            mob.vx = 0;
            mob.vz = 0;
          }
        }
      }

      // Dampen knockback velocity smoothly
      if (mob.hurtTimer > 0) {
        mob.vx *= Math.pow(0.08, dt);
        mob.vz *= Math.pow(0.08, dt);
      }

      const speedHoriz = Math.hypot(mob.vx, mob.vz);
      const isWalking = speedHoriz > 0.05;
      if (isWalking) {
        mob.walkPhase += dt * (mob.panicTimer > 0 ? 13.0 : 7.0);
      } else {
        mob.walkPhase *= 0.85;
      }

      if (mob.legs && mob.legs.length >= 4) {
        const swing = isWalking ? Math.sin(mob.walkPhase) * 0.55 : 0;
        mob.legs[0].rotation.x = swing;
        mob.legs[1].rotation.x = -swing;
        mob.legs[2].rotation.x = -swing;
        mob.legs[3].rotation.x = swing;
      }

      mob.x += mob.vx * dt;
      mob.z += mob.vz * dt;
      const groundY = getGroundHeight(Math.floor(mob.x), Math.floor(mob.z));
      if (mob.y > groundY || mob.vy > 0) {
        mob.vy -= 18.0 * dt;
        mob.y += mob.vy * dt;
        if (mob.y <= groundY) {
          mob.y = groundY;
          mob.vy = 0;
        }
      } else {
        mob.y += (groundY - mob.y) * Math.min(1, dt * 10);
      }

      mob.mesh.position.set(mob.x, mob.y, mob.z);
      mob.mesh.rotation.y = mob.yaw;
    }
  }

  clearAll() {
    for (const [, c] of this.cushions) {
      this.scene.remove(c.mesh);
      c.mesh.geometry.dispose();
    }
    this.cushions.clear();
    for (const [, m] of this.mobs) {
      this.scene.remove(m.mesh);
    }
    this.mobs.clear();
    for (const [, it] of this.droppedItems) {
      this.scene.remove(it.mesh);
      it.mesh.geometry.dispose();
    }
    this.droppedItems.clear();
  }
}
