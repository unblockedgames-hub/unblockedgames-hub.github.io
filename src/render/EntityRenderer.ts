import * as THREE from 'three';
import { DYE_HEX_MAP, Registries } from '../core/Registries';
import { AudioEngine } from '../core/AudioEngine';
import { TextureAtlas } from './TextureAtlas';
import { CushionEntityData } from '../world/WorldGen26_3';

export interface DroppedItemEntity {
  id: string;
  itemId: string;
  count: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  age: number;
  pickupDelay: number;
  mesh: THREE.Mesh;
}

export interface FallingBlockEntity {
  id: string;
  blockId: string;
  blockNumId: number;
  blockMeta: number;
  x: number;
  y: number;
  z: number;
  targetY: number;
  vy: number;
  mesh: THREE.Mesh;
}

export interface ArrowEntity {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  damage: number;
  isCrit: boolean;
  inGround: boolean;
  age: number;
  mesh: THREE.Group;
}

export interface MobEntity {
  id: string;
  type:
    | 'pig'
    | 'cow'
    | 'sheep'
    | 'remote_player'
    | 'zombie'
    | 'skeleton'
    | 'creeper'
    | 'spider'
    | 'enderman'
    | 'slime'
    | 'iron_golem'
    | 'villager'
    | 'ender_dragon'
    | 'end_crystal';
  name?: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  yaw: number;
  pitch?: number;
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
  fuseTimer?: number;
  shootTimer?: number;
  burnTimer?: number;
  teleportTimer?: number;
  slimeSize?: number;
  isBaby?: boolean;
  growthTimer?: number;
  inLoveTimer?: number;
  breedCooldown?: number;
  targetMobId?: string;
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
  fallingBlocks = new Map<string, FallingBlockEntity>();
  arrows = new Map<string, ArrowEntity>();
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
      // In Minecraft QuadrupedModel, the body box is rotated xRot = PI/2 (90 deg).
      // - The unrotated -Z face rotates to +Y (top back): (u + dz + dx + dz, v + dz, dx, dy)
      // - The unrotated +Z face rotates to -Y (belly): (u + dz, v + dz, dx, dy)
      // - The unrotated top (+Y) rotates to +Z (front chest): (u + dz, v, dx, dz)
      // - The unrotated bottom (-Y) rotates to -Z (rear): (u + dz + dx, v, dx, dz)
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

    // Official 26.3 CushionModel (net.minecraft.client.model.object.cushion.CushionModel)
    // 16x4x16 box at y=0..4, texture 64x64 at (0, 0)
    const part = this.createUprightPartMesh(16, 4, 16, 0, DYE_HEX_MAP[data.color] || 0xf9801d);
    const mesh = part.mesh;
    mesh.position.set(data.x, data.blockY + 0.125, data.z);
    mesh.rotation.y = (data.rotation * Math.PI) / 180;
    mesh.userData = { isCushion: true, cushionId: data.id };

    this.loadEntityImage(
      `/assets/minecraft/textures/entity/cushion/${data.color}_cushion.png`,
      (img) => {
        part.applyTexture(img, 0, 0);
      }
    );

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

  spawnMob(
    id: string,
    type: MobEntity['type'],
    x: number,
    y: number,
    z: number,
    name?: string,
    slimeSize = 4,
    isBaby = false
  ) {
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
    } else if (type === 'cow') {
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

      // Official Cow udder: texOffs(52, 0) box (-2, 2, -8, 4, 6, 1) under belly towards rear
      const udderGeo = new THREE.BoxGeometry(4 / 16, 1.5 / 16, 6 / 16);
      const udderMats = Array.from(
        { length: 6 },
        () => new THREE.MeshLambertMaterial({ color: 0xf0a5a2 })
      );
      const udderMesh = new THREE.Mesh(udderGeo, udderMats);
      udderMesh.position.set(0, 11.25 / 16, -4 / 16);

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

      group.add(head.mesh, rHorn.mesh, lHorn.mesh, body.mesh, udderMesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/cow/cow_temperate.png', (img) => {
        head.applyTexture(img, 0, 0);
        rHorn.applyTexture(img, 22, 0);
        lHorn.applyTexture(img, 22, 0);
        body.applyTexture(img, 18, 4);
        // Map udder textures (bottom face at index 3 displays the 4 teats)
        const udderBottom = this.cropSubTexture(img, 52, 0, 4, 6);
        const udderSide = this.cropSubTexture(img, 52, 0, 4, 2);
        for (let i = 0; i < 6; i++) {
          udderMats[i].map = i === 3 ? udderBottom : udderSide;
          udderMats[i].color.setHex(0xffffff);
          udderMats[i].needsUpdate = true;
        }
        for (const l of legParts) l.applyTexture(img, 0, 16);
      });
    } else if (type === 'zombie') {
      // Zombie Model: Steve humanoid frame with arms permanently held horizontally forward
      const head = this.createUprightPartMesh(8, 8, 8, 0, 0x55aa55);
      head.mesh.position.set(0, 28 / 16, 0);
      const body = this.createUprightPartMesh(8, 12, 4, 0, 0x448888);
      body.mesh.position.set(0, 18 / 16, 0);

      const rArm = this.createUprightPartMesh(4, 12, 4, 0, 0x55aa55);
      rArm.mesh.geometry.translate(0, -6 / 16, 0);
      rArm.mesh.position.set(-6 / 16, 22 / 16, 0);
      rArm.mesh.rotation.x = -Math.PI / 2; // Arms raised forward towards victim

      const lArm = this.createUprightPartMesh(4, 12, 4, 0, 0x55aa55);
      lArm.mesh.geometry.translate(0, -6 / 16, 0);
      lArm.mesh.position.set(6 / 16, 22 / 16, 0);
      lArm.mesh.rotation.x = -Math.PI / 2; // Arms raised forward towards victim

      const rLeg = this.createUprightPartMesh(4, 12, 4, 0, 0x333366);
      rLeg.mesh.geometry.translate(0, -6 / 16, 0);
      rLeg.mesh.position.set(-2 / 16, 12 / 16, 0);

      const lLeg = this.createUprightPartMesh(4, 12, 4, 0, 0x333366);
      lLeg.mesh.geometry.translate(0, -6 / 16, 0);
      lLeg.mesh.position.set(2 / 16, 12 / 16, 0);

      legs.push(rLeg.mesh, lLeg.mesh);
      group.add(head.mesh, body.mesh, rArm.mesh, lArm.mesh, rLeg.mesh, lLeg.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/zombie/zombie.png', (img) => {
        head.applyTexture(img, 0, 0);
        body.applyTexture(img, 16, 16);
        rArm.applyTexture(img, 40, 16);
        lArm.applyTexture(img, 40, 16);
        rLeg.applyTexture(img, 0, 16);
        lLeg.applyTexture(img, 0, 16);
      });
    } else if (type === 'skeleton') {
      const head = this.createUprightPartMesh(8, 8, 8, 0, 0xcccccc);
      head.mesh.position.set(0, 28 / 16, 0);
      const body = this.createUprightPartMesh(8, 12, 4, 0, 0xbbbbbb);
      body.mesh.position.set(0, 18 / 16, 0);

      const rArm = this.createUprightPartMesh(2, 12, 2, 0, 0xcccccc);
      rArm.mesh.geometry.translate(0, -6 / 16, 0);
      rArm.mesh.position.set(-5 / 16, 22 / 16, 0);
      rArm.mesh.rotation.x = -Math.PI / 2;

      const lArm = this.createUprightPartMesh(2, 12, 2, 0, 0xcccccc);
      lArm.mesh.geometry.translate(0, -6 / 16, 0);
      lArm.mesh.position.set(5 / 16, 22 / 16, 0);
      lArm.mesh.rotation.x = -Math.PI / 2;

      const rLeg = this.createUprightPartMesh(2, 12, 2, 0, 0xcccccc);
      rLeg.mesh.geometry.translate(0, -6 / 16, 0);
      rLeg.mesh.position.set(-2 / 16, 12 / 16, 0);

      const lLeg = this.createUprightPartMesh(2, 12, 2, 0, 0xcccccc);
      lLeg.mesh.geometry.translate(0, -6 / 16, 0);
      lLeg.mesh.position.set(2 / 16, 12 / 16, 0);

      legs.push(rLeg.mesh, lLeg.mesh);
      group.add(head.mesh, body.mesh, rArm.mesh, lArm.mesh, rLeg.mesh, lLeg.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/skeleton/skeleton.png', (img) => {
        head.applyTexture(img, 0, 0);
        body.applyTexture(img, 16, 16);
        rArm.applyTexture(img, 40, 16);
        lArm.applyTexture(img, 40, 16);
        rLeg.applyTexture(img, 0, 16);
        lLeg.applyTexture(img, 0, 16);
      });
    } else if (type === 'creeper') {
      const head = this.createUprightPartMesh(8, 8, 8, 0, 0x2e8b57);
      head.mesh.position.set(0, 24 / 16, 0);
      const body = this.createUprightPartMesh(8, 12, 4, 0, 0x3cb371);
      body.mesh.position.set(0, 14 / 16, 0);

      const legPositions = [
        [-2 / 16, 6 / 16, -4 / 16],
        [2 / 16, 6 / 16, -4 / 16],
        [-2 / 16, 6 / 16, 4 / 16],
        [2 / 16, 6 / 16, 4 / 16],
      ];
      for (const [lx, ly, lz] of legPositions) {
        const leg = this.createUprightPartMesh(4, 6, 4, 0, 0x2e8b57);
        leg.mesh.geometry.translate(0, -3 / 16, 0);
        leg.mesh.position.set(lx, ly, lz);
        legs.push(leg.mesh);
        group.add(leg.mesh);
      }
      group.add(head.mesh, body.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/creeper/creeper.png', (img) => {
        head.applyTexture(img, 0, 0);
        body.applyTexture(img, 16, 16);
        for (const l of legs) {
          for (let i = 0; i < 6; i++) {
            (l.material as THREE.MeshLambertMaterial[])[i].map = this.cropSubTexture(img, 0, 16, 4, 6);
            (l.material as THREE.MeshLambertMaterial[])[i].needsUpdate = true;
          }
        }
      });
    } else if (type === 'spider') {
      const head = this.createUprightPartMesh(6, 6, 6, 0, 0x332222);
      head.mesh.position.set(0, 6 / 16, -6 / 16);
      const body = this.createUprightPartMesh(10, 6, 12, 0, 0x2a1a1a);
      body.mesh.position.set(0, 6 / 16, 3 / 16);

      for (let i = 0; i < 8; i++) {
        const side = i < 4 ? -1 : 1;
        const legIdx = i % 4;
        const leg = this.createUprightPartMesh(12, 2, 2, 0, 0x111111);
        leg.mesh.geometry.translate((side * 6) / 16, 0, 0);
        leg.mesh.position.set((side * 4) / 16, 4 / 16, ((legIdx - 1.5) * 4) / 16);
        leg.mesh.rotation.z = side * 0.25;
        legs.push(leg.mesh);
        group.add(leg.mesh);
      }
      group.add(head.mesh, body.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/spider/spider.png', (img) => {
        head.applyTexture(img, 32, 4);
        body.applyTexture(img, 0, 12);
        for (const l of legs) {
          for (let i = 0; i < 6; i++) {
            (l.material as THREE.MeshLambertMaterial[])[i].color.setHex(0x1a1a1a);
            (l.material as THREE.MeshLambertMaterial[])[i].needsUpdate = true;
          }
        }
      });
    } else if (type === 'enderman') {
      const head = this.createUprightPartMesh(8, 8, 8, 0, 0x161616);
      head.mesh.position.set(0, 44 / 16, 0);
      const body = this.createUprightPartMesh(8, 12, 4, 0, 0x161616);
      body.mesh.position.set(0, 32 / 16, 0);

      const rArm = this.createUprightPartMesh(2, 30, 2, 0, 0x161616);
      rArm.mesh.geometry.translate(0, -14 / 16, 0);
      rArm.mesh.position.set(-5 / 16, 36 / 16, 0);

      const lArm = this.createUprightPartMesh(2, 30, 2, 0, 0x161616);
      lArm.mesh.geometry.translate(0, -14 / 16, 0);
      lArm.mesh.position.set(5 / 16, 36 / 16, 0);

      const rLeg = this.createUprightPartMesh(2, 30, 2, 0, 0x161616);
      rLeg.mesh.geometry.translate(0, -15 / 16, 0);
      rLeg.mesh.position.set(-2 / 16, 26 / 16, 0);

      const lLeg = this.createUprightPartMesh(2, 30, 2, 0, 0x161616);
      lLeg.mesh.geometry.translate(0, -15 / 16, 0);
      lLeg.mesh.position.set(2 / 16, 26 / 16, 0);

      legs.push(rLeg.mesh, lLeg.mesh);
      group.add(head.mesh, body.mesh, rArm.mesh, lArm.mesh, rLeg.mesh, lLeg.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/enderman/enderman.png', (img) => {
        head.applyTexture(img, 0, 0);
        body.applyTexture(img, 32, 16);
        rArm.applyTexture(img, 56, 0);
        lArm.applyTexture(img, 56, 0);
        rLeg.applyTexture(img, 56, 0);
        lLeg.applyTexture(img, 56, 0);
      });
    } else if (type === 'slime') {
      const s = Math.max(0.25, slimeSize * 0.25);
      const outerPart = this.createUprightPartMesh(8, 8, 8, 0, 0x7fff7f);
      outerPart.mesh.geometry.translate(0, 4 / 16, 0);
      const innerPart = this.createUprightPartMesh(4, 4, 4, 0, 0x4ca84c);
      innerPart.mesh.geometry.translate(0, 4 / 16, 0);

      outerPart.mesh.scale.set(s, s, s);
      innerPart.mesh.scale.set(s, s, s);
      group.add(outerPart.mesh, innerPart.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/slime/slime.png', (img) => {
        outerPart.applyTexture(img, 0, 0, true);
        const mats = outerPart.mesh.material as THREE.MeshLambertMaterial[];
        for (const m of mats) {
          m.transparent = true;
          m.opacity = 0.72;
        }
        innerPart.applyTexture(img, 0, 16, true);
      });
    } else if (type === 'iron_golem') {
      const head = this.createUprightPartMesh(8, 10, 8, 0, 0xd4c2b0);
      head.mesh.position.set(0, 33 / 16, 0);
      const nose = this.createUprightPartMesh(2, 4, 2, 0, 0xb89f8a);
      nose.mesh.position.set(0, 31 / 16, 5 / 16);

      const torso = this.createUprightPartMesh(18, 12, 11, 0, 0xd4c2b0);
      torso.mesh.position.set(0, 23 / 16, 0);
      const waist = this.createUprightPartMesh(9, 5, 6, 0, 0xb89f8a);
      waist.mesh.position.set(0, 14.5 / 16, 0);

      const rArm = this.createUprightPartMesh(4, 30, 4, 0, 0xd4c2b0);
      rArm.mesh.geometry.translate(0, -13 / 16, 0);
      rArm.mesh.position.set(-11 / 16, 23 / 16, 0);

      const lArm = this.createUprightPartMesh(4, 30, 4, 0, 0xd4c2b0);
      lArm.mesh.geometry.translate(0, -13 / 16, 0);
      lArm.mesh.position.set(11 / 16, 23 / 16, 0);

      const rLeg = this.createUprightPartMesh(6, 16, 5, 0, 0xb89f8a);
      rLeg.mesh.geometry.translate(0, -8 / 16, 0);
      rLeg.mesh.position.set(-4.5 / 16, 8 / 16, 0);

      const lLeg = this.createUprightPartMesh(6, 16, 5, 0, 0xb89f8a);
      lLeg.mesh.geometry.translate(0, -8 / 16, 0);
      lLeg.mesh.position.set(4.5 / 16, 8 / 16, 0);

      legs.push(rLeg.mesh, lLeg.mesh);
      group.add(head.mesh, nose.mesh, torso.mesh, waist.mesh, rArm.mesh, lArm.mesh, rLeg.mesh, lLeg.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/iron_golem/iron_golem.png', (img) => {
        head.applyTexture(img, 0, 0);
        nose.applyTexture(img, 24, 0);
        torso.applyTexture(img, 0, 40);
        waist.applyTexture(img, 0, 70);
        rArm.applyTexture(img, 60, 21);
        lArm.applyTexture(img, 60, 58);
        rLeg.applyTexture(img, 37, 0);
        lLeg.applyTexture(img, 60, 0);
      });
    } else if (type === 'villager') {
      const head = this.createUprightPartMesh(8, 10, 8, 0, 0xbd8b72);
      head.mesh.position.set(0, 24 / 16, 0);
      const nose = this.createUprightPartMesh(2, 4, 2, 0, 0xbd8b72);
      nose.mesh.position.set(0, 22.5 / 16, 5 / 16);

      const body = this.createUprightPartMesh(8, 12, 6, 0, 0x6e4a30);
      body.mesh.position.set(0, 14 / 16, 0);
      const robe = this.createUprightPartMesh(10, 18, 8, 0.2, 0x5a3d28);
      robe.mesh.position.set(0, 11 / 16, 0);

      const arms = this.createUprightPartMesh(8, 8, 4, 0, 0x5a3d28);
      arms.mesh.position.set(0, 14 / 16, 3 / 16);

      const rLeg = this.createUprightPartMesh(4, 12, 4, 0, 0x3d281a);
      rLeg.mesh.geometry.translate(0, -6 / 16, 0);
      rLeg.mesh.position.set(-2 / 16, 6 / 16, 0);

      const lLeg = this.createUprightPartMesh(4, 12, 4, 0, 0x3d281a);
      lLeg.mesh.geometry.translate(0, -6 / 16, 0);
      lLeg.mesh.position.set(2 / 16, 6 / 16, 0);

      legs.push(rLeg.mesh, lLeg.mesh);
      group.add(head.mesh, nose.mesh, body.mesh, robe.mesh, arms.mesh, rLeg.mesh, lLeg.mesh);

      this.loadEntityImage('/assets/minecraft/textures/entity/villager/villager.png', (img) => {
        head.applyTexture(img, 0, 0);
        nose.applyTexture(img, 24, 0);
        body.applyTexture(img, 16, 20);
        robe.applyTexture(img, 0, 38);
        arms.applyTexture(img, 40, 38);
        rLeg.applyTexture(img, 0, 22);
        lLeg.applyTexture(img, 0, 22);
      });
    } else if (type === 'ender_dragon') {
      const head = this.createUprightPartMesh(16, 16, 16, 0, 0x141414);
      head.mesh.position.set(0, 8 / 16, 40 / 16);
      const body = this.createUprightPartMesh(24, 24, 40, 0, 0x141414);
      body.mesh.position.set(0, 1.5, 0);

      const rWing = this.createUprightPartMesh(40, 4, 24, 0, 0x222222);
      rWing.mesh.position.set(-28 / 16, 1.8, 0);
      const lWing = this.createUprightPartMesh(40, 4, 24, 0, 0x222222);
      lWing.mesh.position.set(28 / 16, 1.8, 0);

      group.add(head.mesh, body.mesh, rWing.mesh, lWing.mesh);
      group.scale.set(0.65, 0.65, 0.65);

      this.loadEntityImage('/assets/minecraft/textures/entity/enderdragon/dragon.png', (img) => {
        head.applyTexture(img, 176, 44);
        body.applyTexture(img, 0, 0);
        rWing.applyTexture(img, 112, 88);
        lWing.applyTexture(img, 112, 88);
      });
    } else if (type === 'end_crystal') {
      const outerBox = this.createUprightPartMesh(12, 12, 12, 0, 0xd0a0ff);
      outerBox.mesh.position.set(0, 0.6, 0);
      const innerCore = this.createUprightPartMesh(6, 6, 6, 0, 0x301040);
      innerCore.mesh.position.set(0, 0.6, 0);

      group.add(outerBox.mesh, innerCore.mesh);
      this.loadEntityImage('/assets/minecraft/textures/entity/end_crystal/end_crystal.png', (img) => {
        outerPartTex: outerBox.applyTexture(img, 32, 0, true);
        const mats = outerBox.mesh.material as THREE.MeshLambertMaterial[];
        for (const m of mats) {
          m.transparent = true;
          m.opacity = 0.8;
        }
        innerCore.applyTexture(img, 0, 16);
      });
    }

    if (isBaby) {
      group.scale.set(0.5, 0.5, 0.5);
    }

    const maxHealth =
      type === 'ender_dragon'
        ? 200
        : type === 'iron_golem'
        ? 100
        : type === 'enderman'
        ? 40
        : type === 'zombie' || type === 'skeleton' || type === 'creeper' || type === 'villager'
        ? 20
        : type === 'spider'
        ? 16
        : type === 'slime'
        ? Math.max(1, slimeSize * 4)
        : type === 'sheep'
        ? 8
        : type === 'end_crystal'
        ? 1
        : 10;
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
      slimeSize,
      isBaby,
      growthTimer: isBaby ? 120 : undefined,
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
      const halfW =
        mob.type === 'ender_dragon'
          ? 3.2
          : mob.type === 'iron_golem'
          ? 0.75
          : mob.type === 'cow'
          ? 0.55
          : mob.type === 'spider'
          ? 0.7
          : mob.type === 'slime'
          ? (mob.slimeSize || 4) * 0.25
          : mob.type === 'end_crystal'
          ? 0.6
          : mob.type === 'enderman'
          ? 0.35
          : mob.type === 'zombie' || mob.type === 'skeleton' || mob.type === 'creeper' || mob.type === 'remote_player' || mob.type === 'villager'
          ? 0.35
          : 0.48;
      const height =
        mob.type === 'ender_dragon'
          ? 3.0
          : mob.type === 'enderman'
          ? 2.9
          : mob.type === 'iron_golem'
          ? 2.7
          : mob.type === 'slime'
          ? (mob.slimeSize || 4) * 0.5
          : mob.type === 'cow'
          ? 1.45
          : mob.type === 'sheep'
          ? 1.35
          : mob.type === 'spider'
          ? 0.8
          : mob.type === 'creeper'
          ? 1.7
          : mob.type === 'end_crystal'
          ? 1.2
          : mob.type === 'zombie' || mob.type === 'skeleton' || mob.type === 'remote_player' || mob.type === 'villager'
          ? 1.95
          : 1.05;
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
    mob.panicTimer = 6.0; // Panic fleeing for 6 seconds on damage
    mob.aiTimer = 0; // Trigger panic movement immediately
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
      } else if (mob.type === 'zombie') {
        const fleshCount = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < fleshCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'rotten_flesh');
        }
        if (Math.random() < 0.08) {
          this.spawnDroppedItem(bx, by, bz, 'iron_ingot');
        }
      } else if (mob.type === 'skeleton') {
        const boneCount = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < boneCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'bone');
        }
        const arrowCount = Math.floor(Math.random() * 3);
        for (let i = 0; i < arrowCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'arrow');
        }
      } else if (mob.type === 'creeper') {
        const powderCount = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < powderCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'gunpowder');
        }
      } else if (mob.type === 'spider') {
        const strCount = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < strCount; i++) {
          this.spawnDroppedItem(bx, by, bz, 'string');
        }
        if (Math.random() < 0.33) {
          this.spawnDroppedItem(bx, by, bz, 'spider_eye');
        }
      } else if (mob.type === 'enderman') {
        if (Math.random() < 0.6) {
          this.spawnDroppedItem(bx, by, bz, 'ender_pearl');
        }
      } else if (mob.type === 'slime') {
        const curSize = mob.slimeSize || 4;
        if (curSize > 1) {
          const splitSize = Math.floor(curSize / 2);
          const splitCount = 2 + Math.floor(Math.random() * 3);
          for (let i = 0; i < splitCount; i++) {
            const sid = `slime_${Date.now()}_${Math.random()}`;
            this.spawnMob(
              sid,
              'slime',
              mob.x + (Math.random() - 0.5) * 0.8,
              mob.y,
              mob.z + (Math.random() - 0.5) * 0.8,
              undefined,
              splitSize
            );
          }
        } else {
          const ballCount = Math.floor(Math.random() * 3);
          for (let i = 0; i < ballCount; i++) {
            this.spawnDroppedItem(bx, by, bz, 'slime_ball');
          }
        }
      } else if (mob.type === 'iron_golem') {
        const ingots = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < ingots; i++) {
          this.spawnDroppedItem(bx, by, bz, 'iron_ingot');
        }
        const poppies = Math.floor(Math.random() * 3);
        for (let i = 0; i < poppies; i++) {
          this.spawnDroppedItem(bx, by, bz, 'poppy');
        }
      }
      return { hit: true, killed: true, mob };
    }

    return { hit: true, killed: false, mob };
  }

  spawnDroppedItem(
    bx: number,
    by: number,
    bz: number,
    itemId: string,
    count = 1,
    vx?: number,
    vy?: number,
    vz?: number,
    pickupDelay = 0.5
  ) {
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
      count,
      x,
      y,
      z,
      vx: vx !== undefined ? vx : (Math.random() - 0.5) * 1.1,
      vy: vy !== undefined ? vy : 2.2 + Math.random() * 0.6,
      vz: vz !== undefined ? vz : (Math.random() - 0.5) * 1.1,
      age: 0,
      pickupDelay,
      mesh,
    });
  }

  spawnFallingBlock(
    bx: number,
    by: number,
    bz: number,
    blockId: string,
    targetY: number,
    meta = 0
  ) {
    const id = `falling_${bx}_${by}_${bz}_${Date.now()}_${Math.random()}`;
    const blockDef = Registries.getBlock(blockId);
    if (!blockDef) return;

    const geo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const topUv = TextureAtlas.getUV(blockDef.textures.top);
    const sideUv = TextureAtlas.getUV(blockDef.textures.north || blockDef.textures.top);
    const bottomUv = TextureAtlas.getUV(blockDef.textures.bottom || blockDef.textures.top);

    const uvAttr = geo.attributes.uv as THREE.BufferAttribute;
    const uvs = [sideUv, sideUv, topUv, bottomUv, sideUv, sideUv];
    for (let f = 0; f < 6; f++) {
      const u = uvs[f];
      const base = f * 4;
      uvAttr.setXY(base + 0, u.u0, u.v1);
      uvAttr.setXY(base + 1, u.u1, u.v1);
      uvAttr.setXY(base + 2, u.u0, u.v0);
      uvAttr.setXY(base + 3, u.u1, u.v0);
    }
    uvAttr.needsUpdate = true;

    const mat = new THREE.MeshLambertMaterial({
      map: TextureAtlas.texture,
      color: 0xffffff,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(bx + 0.5, by + 0.5, bz + 0.5);
    this.scene.add(mesh);

    this.fallingBlocks.set(id, {
      id,
      blockId,
      blockNumId: blockDef.numId,
      blockMeta: meta,
      x: bx,
      y: by,
      z: bz,
      targetY,
      vy: 0,
      mesh,
    });
  }

  spawnArrow(
    x: number,
    y: number,
    z: number,
    vx: number,
    vy: number,
    vz: number,
    damage: number,
    isCrit = false
  ) {
    const id = `arrow_${Date.now()}_${Math.random()}`;
    const group = new THREE.Group();

    const shaftGeo = new THREE.BoxGeometry(0.06, 0.06, 0.6);
    const arrowTex = this.textureLoader.load('/assets/minecraft/textures/entity/projectiles/arrow.png');
    arrowTex.magFilter = THREE.NearestFilter;
    arrowTex.minFilter = THREE.NearestFilter;
    arrowTex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshLambertMaterial({
      map: arrowTex,
      transparent: true,
      alphaTest: 0.1,
    });
    const shaft = new THREE.Mesh(shaftGeo, mat);
    shaft.position.set(0, 0, -0.3);
    group.add(shaft);

    group.position.set(x, y, z);
    const yaw = Math.atan2(vx, vz);
    const pitch = -Math.atan2(vy, Math.hypot(vx, vz));
    group.rotation.set(pitch, yaw, 0, 'YXZ');

    this.scene.add(group);
    this.arrows.set(id, {
      id,
      x,
      y,
      z,
      vx,
      vy,
      vz,
      damage,
      isCrit,
      inGround: false,
      age: 0,
      mesh: group,
    });
  }

  teleportEnderman(mob: MobEntity) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 8 + Math.random() * 8;
    mob.x += Math.cos(angle) * dist;
    mob.z += Math.sin(angle) * dist;
    mob.vx = 0;
    mob.vz = 0;
    mob.mesh.position.set(mob.x, mob.y, mob.z);
    AudioEngine.play('entity.enderman.teleport', 0.9);
  }

  update(
    dt: number,
    getGroundHeight: (x: number, z: number) => number,
    playerPos?: THREE.Vector3,
    onPickupItem?: (itemId: string, count: number) => boolean,
    isSolidAt?: (bx: number, by: number, bz: number) => boolean,
    onMobAttackPlayer?: (damage: number, mobType: string) => void,
    onFallingBlockLanded?: (bx: number, by: number, bz: number, numId: number, meta: number, blockId: string) => void,
    daylight?: number,
    heldItemId?: string,
    onBreed?: (x: number, y: number, z: number, type: string) => void
  ) {
    // Update Arrow Projectiles with ballistics, mob collisions, and block embedding
    for (const [aid, arrow] of this.arrows) {
      arrow.age += dt;
      if (!arrow.inGround) {
        arrow.vy -= 18.0 * dt;
        arrow.vx *= Math.pow(0.99, dt * 20);
        arrow.vy *= Math.pow(0.99, dt * 20);
        arrow.vz *= Math.pow(0.99, dt * 20);

        const nextX = arrow.x + arrow.vx * dt;
        const nextY = arrow.y + arrow.vy * dt;
        const nextZ = arrow.z + arrow.vz * dt;

        // Mob collision along flight trajectory
        const rayDir = new THREE.Vector3(arrow.vx, arrow.vy, arrow.vz).normalize();
        const distStep = Math.hypot(arrow.vx * dt, arrow.vy * dt, arrow.vz * dt);
        const hit = this.raycastMob(new THREE.Vector3(arrow.x, arrow.y, arrow.z), rayDir, distStep);

        if (hit && !hit.mob.dead) {
          if (hit.mob.type === 'enderman') {
            this.teleportEnderman(hit.mob);
          } else {
            this.attackMob(hit.mob.id, arrow.damage, new THREE.Vector3(arrow.x, arrow.y, arrow.z));
            AudioEngine.play('entity.arrow.hit_player', 0.9);
            this.scene.remove(arrow.mesh);
            this.arrows.delete(aid);
            continue;
          }
        }

        const bx = Math.floor(nextX);
        const by = Math.floor(nextY);
        const bz = Math.floor(nextZ);
        if (isSolidAt && isSolidAt(bx, by, bz)) {
          arrow.inGround = true;
          arrow.x = nextX;
          arrow.y = nextY;
          arrow.z = nextZ;
          AudioEngine.play('entity.arrow.hit', 0.7);
        } else {
          arrow.x = nextX;
          arrow.y = nextY;
          arrow.z = nextZ;
          arrow.mesh.position.set(arrow.x, arrow.y, arrow.z);
          const yaw = Math.atan2(arrow.vx, arrow.vz);
          const pitch = -Math.atan2(arrow.vy, Math.hypot(arrow.vx, arrow.vz));
          arrow.mesh.rotation.set(pitch, yaw, 0, 'YXZ');
        }
      } else {
        if (playerPos) {
          const pdist = Math.hypot(playerPos.x - arrow.x, playerPos.y - arrow.y, playerPos.z - arrow.z);
          if (pdist < 1.2 && onPickupItem && onPickupItem('arrow', 1)) {
            this.scene.remove(arrow.mesh);
            this.arrows.delete(aid);
            continue;
          }
        }
        if (arrow.age > 60) {
          this.scene.remove(arrow.mesh);
          this.arrows.delete(aid);
        }
      }
    }
    // Smooth Gravity Physics for Falling Sand & Gravel Entities
    for (const [id, fb] of this.fallingBlocks) {
      fb.vy = Math.max(-36.0, fb.vy - 32.0 * dt);
      fb.y += fb.vy * dt;
      fb.mesh.position.y = fb.y + 0.5;

      if (fb.y <= fb.targetY + 0.05) {
        this.scene.remove(fb.mesh);
        fb.mesh.geometry.dispose();
        this.fallingBlocks.delete(id);
        onFallingBlockLanded?.(fb.x, fb.targetY, fb.z, fb.blockNumId, fb.blockMeta, fb.blockId);
      }
    }
    // Update bobbing & rotating 3D dropped items + local block floor collision + magnetic pickup
    for (const [id, item] of this.droppedItems) {
      item.age += dt;
      item.pickupDelay = Math.max(0, item.pickupDelay - dt);
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

      if (playerPos && item.pickupDelay <= 0 && item.age > 0.15) {
        const dx = playerPos.x - item.x;
        const dy = playerPos.y + 0.75 - item.y;
        const dz = playerPos.z - item.z;
        const dist = Math.hypot(dx, dy, dz);
        if (dist < 2.35) {
          item.x += (dx / dist) * 11.0 * dt;
          item.y += (dy / dist) * 11.0 * dt;
          item.z += (dz / dist) * 11.0 * dt;
          if (dist < 0.95 && onPickupItem && onPickupItem(item.itemId, item.count)) {
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

      if (mob.type === 'end_crystal') {
        if (mob.mesh.children.length >= 2) {
          mob.mesh.children[0].rotation.y += dt * 1.5;
          mob.mesh.children[1].rotation.y -= dt * 2.2;
        }
        continue;
      }

      if (mob.type === 'ender_dragon') {
        mob.walkPhase = (mob.walkPhase || 0) + dt * 0.45;
        const flightRadius = 38;
        mob.x = Math.cos(mob.walkPhase) * flightRadius;
        mob.z = Math.sin(mob.walkPhase) * flightRadius;
        mob.y = 74 + Math.sin(mob.walkPhase * 2.5) * 6;
        mob.yaw = -mob.walkPhase + Math.PI / 2;
        mob.mesh.position.set(mob.x, mob.y, mob.z);
        mob.mesh.rotation.y = mob.yaw;

        const flap = Math.sin(mob.walkPhase * 8.0) * 0.4;
        if (mob.mesh.children[2]) mob.mesh.children[2].rotation.z = flap;
        if (mob.mesh.children[3]) mob.mesh.children[3].rotation.z = -flap;

        if (playerPos) {
          const pdist = Math.hypot(playerPos.x - mob.x, playerPos.y - mob.y, playerPos.z - mob.z);
          if (pdist < 4.5 && onMobAttackPlayer) {
            onMobAttackPlayer(8, 'ender_dragon');
          }
        }
        continue;
      }

      // Animal Food Lure & Breeding System
      const isLurable = mob.type === 'cow' || mob.type === 'sheep' || mob.type === 'pig';
      let isLured = false;
      if (isLurable && playerPos && heldItemId) {
        const wantsWheat = (mob.type === 'cow' || mob.type === 'sheep') && heldItemId === 'wheat';
        const wantsCarrot =
          mob.type === 'pig' &&
          (heldItemId === 'carrot' || heldItemId === 'potato' || heldItemId === 'beetroot');
        if (wantsWheat || wantsCarrot) {
          const ldx = playerPos.x - mob.x;
          const ldz = playerPos.z - mob.z;
          const ldist = Math.hypot(ldx, ldz);
          if (ldist < 10.0) {
            mob.yaw = Math.atan2(ldx, ldz);
            if (ldist > 2.0) {
              mob.vx = Math.sin(mob.yaw) * 1.8;
              mob.vz = Math.cos(mob.yaw) * 1.8;
            } else {
              mob.vx = 0;
              mob.vz = 0;
            }
            isLured = true;
          }
        }
      }

      if (mob.inLoveTimer && mob.inLoveTimer > 0) {
        mob.inLoveTimer -= dt;
        for (const [, other] of this.mobs) {
          if (other.id !== mob.id && other.type === mob.type && other.inLoveTimer && other.inLoveTimer > 0) {
            const bdx = other.x - mob.x;
            const bdz = other.z - mob.z;
            const bdist = Math.hypot(bdx, bdz);
            mob.yaw = Math.atan2(bdx, bdz);
            mob.vx = Math.sin(mob.yaw) * 1.5;
            mob.vz = Math.cos(mob.yaw) * 1.5;
            if (bdist < 1.1) {
              mob.inLoveTimer = 0;
              other.inLoveTimer = 0;
              mob.breedCooldown = 300;
              other.breedCooldown = 300;
              const babyId = `${mob.type}_baby_${Date.now()}`;
              this.spawnMob(
                babyId,
                mob.type,
                (mob.x + other.x) / 2,
                mob.y,
                (mob.z + other.z) / 2,
                undefined,
                undefined,
                true
              );
              onBreed?.((mob.x + other.x) / 2, mob.y + 0.5, (mob.z + other.z) / 2, mob.type);
              AudioEngine.play('entity.player.levelup', 0.5);
              break;
            }
          }
        }
      }
      if (mob.breedCooldown && mob.breedCooldown > 0) {
        mob.breedCooldown -= dt;
      }
      if (mob.isBaby && mob.growthTimer) {
        mob.growthTimer -= dt;
        if (mob.growthTimer <= 0) {
          mob.isBaby = false;
          mob.mesh.scale.set(1.0, 1.0, 1.0);
        }
      }

      if (mob.panicTimer > 0) {
        mob.panicTimer -= dt;
      }

      const groundY = getGroundHeight(Math.floor(mob.x), Math.floor(mob.z));

      // Sunlight Burning for Zombies and Skeletons during day
      if (daylight !== undefined && daylight > 0.8 && (mob.type === 'zombie' || mob.type === 'skeleton')) {
        const topY = getGroundHeight(Math.floor(mob.x), Math.floor(mob.z));
        if (mob.y >= topY - 0.5) {
          mob.burnTimer = (mob.burnTimer || 0.8) - dt;
          if (mob.burnTimer <= 0) {
            mob.health -= 1;
            mob.hurtTimer = 0.25;
            this.setMobHurtTint(mob, true);
            AudioEngine.play(mob.type === 'zombie' ? 'entity.zombie.hurt' : 'entity.skeleton.hurt', 0.6);
            mob.burnTimer = 0.8;
            if (mob.health <= 0) {
              mob.dead = true;
              mob.deathTimer = 0.55;
              continue;
            }
          }
        }
      }

      mob.aiTimer -= dt;
      const isHostile =
        mob.type === 'zombie' ||
        mob.type === 'skeleton' ||
        mob.type === 'creeper' ||
        mob.type === 'spider' ||
        mob.type === 'enderman' ||
        mob.type === 'slime';
      if (isHostile && playerPos && mob.hurtTimer <= 0) {
        const pdx = playerPos.x - mob.x;
        const pdy = playerPos.y - mob.y;
        const pdz = playerPos.z - mob.z;
        const distHoriz = Math.hypot(pdx, pdz);
        const dist3D = Math.hypot(pdx, pdy, pdz);

        if (distHoriz < 16 && Math.abs(pdy) < 6.0) {
          mob.yaw = Math.atan2(pdx, pdz);

          if (mob.type === 'zombie') {
            mob.vx = Math.sin(mob.yaw) * 2.3;
            mob.vz = Math.cos(mob.yaw) * 2.3;
            if (dist3D < 1.6 && Math.abs(pdy) < 1.8 && onMobAttackPlayer) {
              onMobAttackPlayer(3, 'zombie');
            }
          } else if (mob.type === 'skeleton') {
            if (distHoriz > 10) {
              mob.vx = Math.sin(mob.yaw) * 2.2;
              mob.vz = Math.cos(mob.yaw) * 2.2;
            } else if (distHoriz < 6) {
              mob.vx = -Math.sin(mob.yaw) * 1.8;
              mob.vz = -Math.cos(mob.yaw) * 1.8;
            } else {
              mob.vx = 0;
              mob.vz = 0;
            }
            mob.shootTimer = (mob.shootTimer !== undefined ? mob.shootTimer : 2.0) - dt;
            if (mob.shootTimer <= 0) {
              mob.shootTimer = 2.0 + Math.random() * 0.5;
              AudioEngine.play('entity.skeleton.shoot', 0.85);
              if (onMobAttackPlayer) onMobAttackPlayer(3, 'skeleton');
            }
          } else if (mob.type === 'creeper') {
            if (dist3D < 3.2) {
              mob.vx = 0;
              mob.vz = 0;
              mob.fuseTimer = (mob.fuseTimer !== undefined ? mob.fuseTimer : 1.5) - dt;
              const flash = Math.floor(mob.fuseTimer * 8) % 2 === 0;
              for (const part of mob.mesh.children) {
                if (part instanceof THREE.Mesh) {
                  const mats = Array.isArray(part.material) ? part.material : [part.material];
                  for (const m of mats) {
                    if (m instanceof THREE.MeshLambertMaterial) {
                      m.color.setHex(flash ? 0xffffff : 0x2e8b57);
                    }
                  }
                }
              }
              if (mob.fuseTimer === 1.5 - dt || Math.abs(mob.fuseTimer - 1.4) < dt) {
                AudioEngine.play('entity.creeper.primed', 0.95);
              }
              if (mob.fuseTimer <= 0) {
                AudioEngine.play('entity.generic.explode', 1.0);
                if (onMobAttackPlayer) onMobAttackPlayer(12, 'creeper');
                mob.dead = true;
                mob.deathTimer = 0.1;
                this.scene.remove(mob.mesh);
                this.mobs.delete(id);
                continue;
              }
            } else {
              mob.fuseTimer = undefined;
              mob.vx = Math.sin(mob.yaw) * 2.1;
              mob.vz = Math.cos(mob.yaw) * 2.1;
            }
          } else if (mob.type === 'spider') {
            mob.vx = Math.sin(mob.yaw) * 3.4;
            mob.vz = Math.cos(mob.yaw) * 3.4;
            if (distHoriz < 5 && mob.y <= groundY + 0.1 && Math.random() < 0.08) {
              mob.vy = 4.2;
            }
            if (dist3D < 1.7 && Math.abs(pdy) < 1.6 && onMobAttackPlayer) {
              onMobAttackPlayer(2, 'spider');
            }
          } else if (mob.type === 'enderman') {
            mob.vx = Math.sin(mob.yaw) * 4.8;
            mob.vz = Math.cos(mob.yaw) * 4.8;
            if (dist3D < 2.0 && Math.abs(pdy) < 2.0 && onMobAttackPlayer) {
              onMobAttackPlayer(7, 'enderman');
            }
            if (Math.random() < 0.01) {
              this.teleportEnderman(mob);
            }
          } else if (mob.type === 'slime') {
            const sSize = mob.slimeSize || 4;
            if (mob.y <= groundY + 0.1 && mob.aiTimer <= 0) {
              mob.vy = 4.0 * Math.sqrt(sSize * 0.25);
              mob.aiTimer = 1.0 + Math.random() * 0.8;
              AudioEngine.play('entity.slime.jump', 0.6);
            }
            mob.vx = Math.sin(mob.yaw) * (1.5 + sSize * 0.3);
            mob.vz = Math.cos(mob.yaw) * (1.5 + sSize * 0.3);
            if (dist3D < 1.2 + sSize * 0.2 && onMobAttackPlayer) {
              onMobAttackPlayer(sSize, 'slime');
            }
          }
        }
      } else if (mob.aiTimer <= 0 && mob.hurtTimer <= 0) {
        if (mob.panicTimer > 0) {
          mob.aiTimer = 0.35 + Math.random() * 0.35;
          const awayX = playerPos ? mob.x - playerPos.x : mob.vx;
          const awayZ = playerPos ? mob.z - playerPos.z : mob.vz;
          const baseAngle = Math.atan2(awayX, awayZ);
          mob.yaw = baseAngle + (Math.random() - 0.5) * 1.0;
          const speed = 5.2; // Vanilla panic sprint speed
          mob.vx = Math.sin(mob.yaw) * speed;
          mob.vz = Math.cos(mob.yaw) * speed;
          if (mob.y <= groundY + 0.1 && Math.random() < 0.3) {
            mob.vy = 4.0;
          }
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

      if (mob.type === 'iron_golem') {
        let nearestTarget: MobEntity | null = null;
        let minTdist = 14.0;
        for (const [, candidate] of this.mobs) {
          if (
            !candidate.dead &&
            (candidate.type === 'zombie' ||
              candidate.type === 'skeleton' ||
              candidate.type === 'spider' ||
              candidate.type === 'creeper')
          ) {
            const cdist = Math.hypot(candidate.x - mob.x, candidate.z - mob.z);
            if (cdist < minTdist) {
              minTdist = cdist;
              nearestTarget = candidate;
            }
          }
        }
        if (nearestTarget) {
          const tdx = nearestTarget.x - mob.x;
          const tdz = nearestTarget.z - mob.z;
          mob.yaw = Math.atan2(tdx, tdz);
          mob.vx = Math.sin(mob.yaw) * 2.8;
          mob.vz = Math.cos(mob.yaw) * 2.8;
          if (minTdist < 1.8) {
            AudioEngine.play('entity.iron_golem.attack', 0.9);
            this.attackMob(nearestTarget.id, 14, new THREE.Vector3(mob.x, mob.y, mob.z));
            nearestTarget.vy = 6.5;
          }
        }
      }

      // Dampen knockback velocity smoothly during hurt timer
      if (mob.hurtTimer > 0) {
        mob.vx *= Math.pow(0.12, dt);
        mob.vz *= Math.pow(0.12, dt);
      }

      const speedHoriz = Math.hypot(mob.vx, mob.vz);
      const isWalking = speedHoriz > 0.05;
      if (isWalking) {
        mob.walkPhase += dt * (mob.panicTimer > 0 ? 18.0 : 7.0);
      } else {
        mob.walkPhase *= 0.85;
      }

      const swing = isWalking ? Math.sin(mob.walkPhase) * 0.55 : 0;
      if (mob.legs && mob.legs.length >= 4) {
        mob.legs[0].rotation.x = swing;
        mob.legs[1].rotation.x = -swing;
        mob.legs[2].rotation.x = -swing;
        mob.legs[3].rotation.x = swing;
      } else if (mob.legs && mob.legs.length === 2) {
        mob.legs[0].rotation.x = swing;
        mob.legs[1].rotation.x = -swing;
      }

      mob.x += mob.vx * dt;
      mob.z += mob.vz * dt;
      const targetGroundY = getGroundHeight(Math.floor(mob.x), Math.floor(mob.z));
      if (mob.y > targetGroundY || mob.vy > 0) {
        mob.vy -= 18.0 * dt;
        mob.y += mob.vy * dt;
        if (mob.y <= targetGroundY) {
          mob.y = targetGroundY;
          mob.vy = 0;
        }
      } else {
        mob.y += (targetGroundY - mob.y) * Math.min(1, dt * 10);
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
    for (const [, a] of this.arrows) {
      this.scene.remove(a.mesh);
    }
    this.arrows.clear();
  }
}
