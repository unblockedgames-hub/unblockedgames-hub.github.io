// Official Minecraft 26.3 FirstPersonHandsAndItemsRenderer
// Bytecode-accurate implementation of:
// - renderPlayerArm + AvatarRenderer.renderRightHand + PlayerModel.rightArm & rightSleeve
// - submitArmWithItem + applyItemArmTransform + swingArm + applyItemArmAttackTransform
// - ItemModelGenerator 3D pixel-extruded item meshes + block.json / handheld.json / generated.json display transforms

import * as THREE from 'three';
import { Registries, ItemDefinition } from '../core/Registries';
import { TextureAtlas } from './TextureAtlas';

const DEG_TO_RAD = Math.PI / 180;

export class FirstPersonHand {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  private armPoseGroup: THREE.Group;
  private armMesh!: THREE.Mesh;
  private sleeveMesh!: THREE.Mesh;
  private itemPoseGroup: THREE.Group;
  private itemDisplayGroup: THREE.Group;
  private currentItemId = '__uninit__';
  private swingProgress = 0;
  private isSwinging = false;
  private equipProgress = 1.0;
  private bobPhase = 0;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.05,
      10
    );

    const ambient = new THREE.AmbientLight(0xffffff, 0.92);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.55);
    dirLight.position.set(0.5, 1.5, 1.0);
    this.scene.add(ambient, dirLight);

    this.armPoseGroup = new THREE.Group();
    this.armPoseGroup.matrixAutoUpdate = false;
    this.scene.add(this.armPoseGroup);

    this.itemPoseGroup = new THREE.Group();
    this.itemPoseGroup.matrixAutoUpdate = false;
    this.itemDisplayGroup = new THREE.Group();
    this.itemPoseGroup.add(this.itemDisplayGroup);
    this.scene.add(this.itemPoseGroup);

    this.buildPlayerArm();
    this.updateHeldItem(null);
  }

  private cropArmFaceTexture(
    img: HTMLImageElement,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    flipVertical: boolean,
    flipHorizontal = false
  ): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = sw * 4;
    c.height = sh * 4;
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.translate(flipHorizontal ? c.width : 0, flipVertical ? c.height : 0);
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  private buildPlayerArm(): void {
    // PlayerModel.rightArm: addBox(-3.0F, -2.0F, -2.0F, 4.0F, 12.0F, 4.0F) in 1/16 model units
    // Box spans x: [-3/16..1/16], y: [-2/16..10/16], z: [-2/16..2/16] => center is (-1/16, +4/16, 0)
    // In ModelPart$Cube: y = -2/16 (-Y) is the shoulder (texY=20) and y = +10/16 (+Y) is the fist (texY=32)
    const armGeo = new THREE.BoxGeometry(4 / 16, 12 / 16, 4 / 16);
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xb58668 });
    const sleeveCapMat = new THREE.MeshLambertMaterial({ color: 0x00aaaa });

    // Order of BoxGeometry faces: +X (east/inner), -X (west/outer), +Y (fist cap), -Y (shoulder cap), +Z (south/back), -Z (north/front)
    const armMaterials: THREE.MeshLambertMaterial[] = [
      skinMat.clone(),
      skinMat.clone(),
      skinMat.clone(),
      sleeveCapMat.clone(),
      skinMat.clone(),
      skinMat.clone(),
    ];

    this.armMesh = new THREE.Mesh(armGeo, armMaterials);
    this.armMesh.position.set(-1 / 16, 4 / 16, 0);
    this.armPoseGroup.add(this.armMesh);

    // PlayerModel.rightSleeve: addBox(-3.0F, -2.0F, -2.0F, 4.0F, 12.0F, 4.0F, CubeDeformation(0.25F)) at UV (40, 32)
    const sleeveGeo = new THREE.BoxGeometry(4.5 / 16, 12.5 / 16, 4.5 / 16);
    const sleeveMats: THREE.MeshLambertMaterial[] = Array.from({ length: 6 }, () =>
      new THREE.MeshLambertMaterial({
        transparent: true,
        alphaTest: 0.1,
        opacity: 0,
      })
    );
    this.sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMats);
    this.sleeveMesh.position.set(-1 / 16, 4 / 16, 0);
    this.armPoseGroup.add(this.sleeveMesh);

    const texLoader = new THREE.TextureLoader();
    texLoader.load(
      '/assets/minecraft/textures/entity/player/wide/steve.png',
      (tex) => {
        const img = tex.image as HTMLImageElement;
        // Map rightArm (u=40, v=16) so -Y (y=-2/16) is shoulder (sy=20) and +Y (y=+10/16) is fist (sy=32)
        const eastInner = this.cropArmFaceTexture(img, 48, 20, 4, 12, true);
        const westOuter = this.cropArmFaceTexture(img, 40, 20, 4, 12, true);
        const upFistCap = this.cropArmFaceTexture(img, 48, 16, 4, 4, false);
        const downShoulderCap = this.cropArmFaceTexture(img, 44, 16, 4, 4, false);
        const southBack = this.cropArmFaceTexture(img, 52, 20, 4, 12, true);
        const northFront = this.cropArmFaceTexture(img, 44, 20, 4, 12, true);

        const armTexs = [
          eastInner,
          westOuter,
          upFistCap,
          downShoulderCap,
          southBack,
          northFront,
        ];
        for (let i = 0; i < 6; i++) {
          armMaterials[i].map = armTexs[i];
          armMaterials[i].color.setHex(0xffffff);
          armMaterials[i].needsUpdate = true;
        }

        // Map rightSleeve (u=40, v=32) 3D outer layer
        const slEast = this.cropArmFaceTexture(img, 48, 36, 4, 12, true);
        const slWest = this.cropArmFaceTexture(img, 40, 36, 4, 12, true);
        const slUp = this.cropArmFaceTexture(img, 48, 32, 4, 4, false);
        const slDown = this.cropArmFaceTexture(img, 44, 32, 4, 4, false);
        const slSouth = this.cropArmFaceTexture(img, 52, 36, 4, 12, true);
        const slNorth = this.cropArmFaceTexture(img, 44, 36, 4, 12, true);
        const slTexs = [slEast, slWest, slUp, slDown, slSouth, slNorth];
        for (let i = 0; i < 6; i++) {
          sleeveMats[i].map = slTexs[i];
          sleeveMats[i].opacity = 1;
          sleeveMats[i].needsUpdate = true;
        }
      },
      undefined,
      () => {}
    );
  }

  /**
   * Build a 3D pixel-extruded item mesh matching `net.minecraft.client.renderer.block.model.ItemModelGenerator`:
   * Front face at z = +0.5/16, back face at z = -0.5/16, and 1-texel-thick 3D perimeter quads for every opaque pixel.
   */
  private buildExtruded2DItemMesh(img: HTMLImageElement): THREE.Mesh {
    const w = 16;
    const h = 16;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;

    const isOpaque = (px: number, py: number): boolean => {
      if (px < 0 || px >= w || py < 0 || py >= h) return false;
      return data[(py * w + px) * 4 + 3] >= 25;
    };

    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    let vertCount = 0;

    const zFront = 0.5 / 16;
    const zBack = -0.5 / 16;

    const addQuad = (
      p0: [number, number, number],
      p1: [number, number, number],
      p2: [number, number, number],
      p3: [number, number, number],
      nx: number,
      ny: number,
      nz: number,
      u0: number,
      v0: number,
      u1: number,
      v1: number,
      shade: number
    ) => {
      positions.push(...p0, ...p1, ...p2, ...p3);
      for (let i = 0; i < 4; i++) {
        normals.push(nx, ny, nz);
        colors.push(shade, shade, shade);
      }
      uvs.push(u0, v0, u1, v0, u1, v1, u0, v1);
      indices.push(
        vertCount,
        vertCount + 1,
        vertCount + 2,
        vertCount,
        vertCount + 2,
        vertCount + 3
      );
      vertCount += 4;
    };

    // Front (+Z) and Back (-Z) full 1x1 faces
    addQuad(
      [-0.5, -0.5, zFront],
      [0.5, -0.5, zFront],
      [0.5, 0.5, zFront],
      [-0.5, 0.5, zFront],
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1.0
    );
    addQuad(
      [0.5, -0.5, zBack],
      [-0.5, -0.5, zBack],
      [-0.5, 0.5, zBack],
      [0.5, 0.5, zBack],
      0,
      0,
      -1,
      1,
      0,
      0,
      1,
      1.0
    );

    // 3D pixel edge strips around every opaque texel
    const inset = 0.002;
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        if (!isOpaque(px, py)) continue;

        const x0 = -0.5 + px / w;
        const x1 = -0.5 + (px + 1) / w;
        const y1 = 0.5 - py / h;
        const y0 = 0.5 - (py + 1) / h;

        const u0 = (px + inset) / w;
        const u1 = (px + 1 - inset) / w;
        const v1 = 1 - (py + inset) / h;
        const v0 = 1 - (py + 1 - inset) / h;

        // Top edge (+Y)
        if (!isOpaque(px, py - 1)) {
          addQuad(
            [x0, y1, zFront],
            [x1, y1, zFront],
            [x1, y1, zBack],
            [x0, y1, zBack],
            0,
            1,
            0,
            u0,
            v0,
            u1,
            v1,
            0.95
          );
        }
        // Bottom edge (-Y)
        if (!isOpaque(px, py + 1)) {
          addQuad(
            [x0, y0, zBack],
            [x1, y0, zBack],
            [x1, y0, zFront],
            [x0, y0, zFront],
            0,
            -1,
            0,
            u0,
            v0,
            u1,
            v1,
            0.65
          );
        }
        // Left edge (-X)
        if (!isOpaque(px - 1, py)) {
          addQuad(
            [x0, y0, zBack],
            [x0, y0, zFront],
            [x0, y1, zFront],
            [x0, y1, zBack],
            -1,
            0,
            0,
            u0,
            v0,
            u1,
            v1,
            0.8
          );
        }
        // Right edge (+X)
        if (!isOpaque(px + 1, py)) {
          addQuad(
            [x1, y0, zFront],
            [x1, y0, zBack],
            [x1, y1, zBack],
            [x1, y1, zFront],
            1,
            0,
            0,
            u0,
            v0,
            u1,
            v1,
            0.8
          );
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);

    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;

    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.1,
    });

    return new THREE.Mesh(geo, mat);
  }

  public triggerSwing(): void {
    if (!this.isSwinging || this.swingProgress > 0.35) {
      this.isSwinging = true;
      this.swingProgress = 0;
    }
  }

  public updateHeldItem(item: ItemDefinition | null): void {
    const id = item ? item.id : '';
    if (id === this.currentItemId) return;
    this.currentItemId = id;
    this.equipProgress = 0.0;

    while (this.itemDisplayGroup.children.length > 0) {
      const child = this.itemDisplayGroup.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      this.itemDisplayGroup.remove(child);
    }

    this.itemDisplayGroup.position.set(0, 0, 0);
    this.itemDisplayGroup.rotation.set(0, 0, 0);
    this.itemDisplayGroup.scale.set(1, 1, 1);

    if (!item) return;

    const blockDef =
      item.isBlock && item.blockNumId !== undefined
        ? Registries.getBlock(item.blockNumId)
        : null;

    // 1. 2D Generated or Handheld Items (Tools, Weapons, Sticks, Cushions, Campfire, Torch, Cross plants)
    const is2DItem =
      !blockDef ||
      blockDef.shape === 'cross' ||
      blockDef.shape === 'torch' ||
      blockDef.shape === 'campfire';

    if (is2DItem) {
      // Official firstperson_righthand transform from models/item/handheld.json & generated.json:
      // translation: [1.13, 3.2, 1.13] / 16, rotation: [0, -90, 25], scale: [0.68, 0.68, 0.68]
      this.itemDisplayGroup.position.set(1.13 / 16, 3.2 / 16, 1.13 / 16);
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0 * DEG_TO_RAD, -90 * DEG_TO_RAD, 25 * DEG_TO_RAD, 'ZYX')
      );
      this.itemDisplayGroup.quaternion.copy(q);
      this.itemDisplayGroup.scale.set(0.68, 0.68, 0.68);

      let url = `/assets/minecraft/textures/${item.texture}.png`;
      if (item.shortId === 'campfire') url = '/assets/minecraft/textures/item/campfire.png';
      else if (item.shortId === 'lantern') url = '/assets/minecraft/textures/item/lantern.png';

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (this.currentItemId !== item.id) return;
        const mesh = this.buildExtruded2DItemMesh(img);
        this.itemDisplayGroup.add(mesh);
      };
      img.src = url;
      return;
    }

    // 2. 3D Block Item: Official firstperson_righthand transform from models/block/block.json:
    // rotation: [0, 45, 0], translation: [0, 0, 0], scale: [0.40, 0.40, 0.40]
    this.itemDisplayGroup.position.set(0, 0, 0);
    this.itemDisplayGroup.rotation.set(0, 45 * DEG_TO_RAD, 0, 'ZYX');
    this.itemDisplayGroup.scale.set(0.4, 0.4, 0.4);

    const isSlab = blockDef.shape === 'slab_bottom' || item.shortId.endsWith('_slab');
    const isBed = blockDef.shape === 'bed_foot' || item.shortId === 'straw_bed';
    const isCarpet = blockDef.shape === 'carpet' || blockDef.shape === 'trapdoor';
    const h = isBed ? 0.28 : isSlab ? 0.5 : isCarpet ? 0.1875 : 1.0;

    const geo = new THREE.BoxGeometry(1.0, h, 1.0);
    const uvAttr = geo.attributes.uv as THREE.BufferAttribute;
    // BoxGeometry face order: 0:+X(east), 1:-X(west), 2:+Y(top), 3:-Y(bottom), 4:+Z(south), 5:-Z(north)
    const faceTexs = [
      blockDef.textures.east,
      blockDef.textures.west,
      blockDef.textures.top,
      blockDef.textures.bottom,
      blockDef.textures.south,
      blockDef.textures.north,
    ];
    const faceShades = [0.72, 0.72, 1.0, 0.55, 0.86, 0.86];
    const colors: number[] = [];

    for (let f = 0; f < 6; f++) {
      const uv = TextureAtlas.getUV(faceTexs[f]);
      const dv = (uv.v1 - uv.v0) * (f === 2 || f === 3 ? 1.0 : h);
      const vTop = uv.v0 + dv;
      const baseIdx = f * 4;
      uvAttr.setXY(baseIdx + 0, uv.u0, vTop);
      uvAttr.setXY(baseIdx + 1, uv.u1, vTop);
      uvAttr.setXY(baseIdx + 2, uv.u0, uv.v0);
      uvAttr.setXY(baseIdx + 3, uv.u1, uv.v0);

      // Per-face biome tint (grass_block only tints face 2 (+Y top); sides use pre-composited grass_block_side!)
      let tr = 1.0,
        tg = 1.0,
        tb = 1.0;
      if (blockDef.tint === 'grass' && f === 2) {
        tr = 0x79 / 255;
        tg = 0xc0 / 255;
        tb = 0x5a / 255;
      } else if (blockDef.tint === 'foliage') {
        tr = 0x59 / 255;
        tg = 0xae / 255;
        tb = 0x30 / 255;
      } else if (blockDef.tint === 'birch') {
        tr = 0x80 / 255;
        tg = 0xa7 / 255;
        tb = 0x55 / 255;
      } else if (blockDef.tint === 'spruce') {
        tr = 0x61 / 255;
        tg = 0x99 / 255;
        tb = 0x61 / 255;
      }
      const sh = faceShades[f];
      for (let v = 0; v < 4; v++) {
        colors.push(tr * sh, tg * sh, tb * sh);
      }
    }
    uvAttr.needsUpdate = true;
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.MeshBasicMaterial({
      map: TextureAtlas.texture,
      vertexColors: true,
      alphaTest: 0.1,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    this.itemDisplayGroup.add(mesh);
  }

  public update(dt: number, isMoving: boolean, isSprinting: boolean): void {
    if (this.equipProgress < 1.0) {
      this.equipProgress = Math.min(1.0, this.equipProgress + dt * 6.0);
    }

    if (this.isSwinging) {
      this.swingProgress += dt * 4.5;
      if (this.swingProgress >= 1.0) {
        this.swingProgress = 0;
        this.isSwinging = false;
      }
    }

    if (isMoving) {
      this.bobPhase += dt * (isSprinting ? 13 : 9);
    } else {
      this.bobPhase *= 0.9;
    }

    const bobX = isMoving ? Math.sin(this.bobPhase * 0.5) * 0.025 : 0;
    const bobY = isMoving ? -Math.abs(Math.cos(this.bobPhase * 0.5)) * 0.025 : 0;

    const s = this.swingProgress;
    const sqrtS = Math.sqrt(s);
    const equipOffset = 1.0 - this.equipProgress; // 0 when fully equipped, 1 when unequipped

    if (!this.currentItemId) {
      this.armPoseGroup.visible = true;
      this.itemPoseGroup.visible = false;

      // Exact PoseStack matrix sequence from FirstPersonHandsAndItemsRenderer.renderPlayerArm (26.3.jar)
      const dx = -0.3 * Math.sin(sqrtS * Math.PI);
      const dy = 0.4 * Math.sin(sqrtS * Math.PI * 2.0);
      const dz = -0.4 * Math.sin(s * Math.PI);
      const f5 = Math.sin(s * s * Math.PI);
      const f6 = Math.sin(sqrtS * Math.PI);

      const m = new THREE.Matrix4();
      const tmp = new THREE.Matrix4();

      // 1. poseStack.translate(dx + 0.64F, dy - 0.6F + equipProgress * -0.6F, dz - 0.72F)
      m.makeTranslation(
        0.64 + dx + bobX,
        -0.6 + dy + equipOffset * -0.6 + bobY,
        -0.72 + dz
      );
      // 2. poseStack.rotateDegrees(Axis.YP, 45.0F)
      m.multiply(tmp.makeRotationY(45.0 * DEG_TO_RAD));
      // 3. poseStack.rotateDegrees(Axis.YP, f6 * 70.0F)
      m.multiply(tmp.makeRotationY(f6 * 70.0 * DEG_TO_RAD));
      // 4. poseStack.rotateDegrees(Axis.ZP, f5 * -20.0F)
      m.multiply(tmp.makeRotationZ(f5 * -20.0 * DEG_TO_RAD));
      // 5. poseStack.translate(-1.0F, 3.6F, 3.5F)
      m.multiply(tmp.makeTranslation(-1.0, 3.6, 3.5));
      // 6. poseStack.rotateDegrees(Axis.ZP, 120.0F)
      m.multiply(tmp.makeRotationZ(120.0 * DEG_TO_RAD));
      // 7. poseStack.rotateDegrees(Axis.XP, 200.0F)
      m.multiply(tmp.makeRotationX(200.0 * DEG_TO_RAD));
      // 8. poseStack.rotateDegrees(Axis.YP, -135.0F)
      m.multiply(tmp.makeRotationY(-135.0 * DEG_TO_RAD));
      // 9. poseStack.translate(5.6F, 0.0F, 0.0F)
      m.multiply(tmp.makeTranslation(5.6, 0.0, 0.0));
      // 10. AvatarRenderer.renderHand -> ModelPart.translateAndRotate: translate(-5/16, 2/16, 0), rotateZ(0.1)
      m.multiply(tmp.makeTranslation(-5 / 16, 2 / 16, 0));
      m.multiply(tmp.makeRotationZ(0.1));

      this.armPoseGroup.matrix.copy(m);
    } else {
      this.armPoseGroup.visible = false;
      this.itemPoseGroup.visible = true;

      // Exact PoseStack matrix sequence from FirstPersonHandsAndItemsRenderer.submitArmWithItem + swingArm (26.3.jar)
      const m = new THREE.Matrix4();
      const tmp = new THREE.Matrix4();

      // 1. applyItemArmTransform: translate(0.56F, -0.52F + equipProgress * -0.6F, -0.72F)
      m.makeTranslation(
        0.56 + bobX,
        -0.52 + equipOffset * -0.6 + bobY,
        -0.72
      );

      // 2. swingArm translation: translate(-0.4 * sin(sqrt(s)*PI), 0.2 * sin(sqrt(s)*PI*2), -0.2 * sin(s*PI))
      const sx = -0.4 * Math.sin(sqrtS * Math.PI);
      const sy = 0.2 * Math.sin(sqrtS * Math.PI * 2.0);
      const sz = -0.2 * Math.sin(s * Math.PI);
      m.multiply(tmp.makeTranslation(sx, sy, sz));

      // 3. applyItemArmAttackTransform:
      const f = Math.sin(s * s * Math.PI);
      const f1 = Math.sin(sqrtS * Math.PI);
      m.multiply(tmp.makeRotationY((45.0 + f * -20.0) * DEG_TO_RAD));
      m.multiply(tmp.makeRotationZ(f1 * -20.0 * DEG_TO_RAD));
      m.multiply(tmp.makeRotationX(f1 * -80.0 * DEG_TO_RAD));
      m.multiply(tmp.makeRotationY(-45.0 * DEG_TO_RAD));

      this.itemPoseGroup.matrix.copy(m);
    }
  }

  public render(renderer: THREE.WebGLRenderer): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    const prevAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(this.scene, this.camera);
    renderer.autoClear = prevAutoClear;
  }
}
