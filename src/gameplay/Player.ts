import * as THREE from 'three';
import { World } from '../world/World';
import { Registries, BlockDefinition, ItemDefinition } from '../core/Registries';
import { Inventory } from './Inventory';
import { AudioEngine } from '../core/AudioEngine';
import { OptionsManager } from '../core/Options';
import { TextureAtlas } from '../render/TextureAtlas';
import { CushionEntityData } from '../world/WorldGen26_3';

export interface RaycastHit {
  bx: number;
  by: number;
  bz: number;
  nx: number;
  ny: number;
  nz: number;
  blockNumId: number;
  distance: number;
}

export class Player {
  camera: THREE.PerspectiveCamera;
  world: World;
  inventory: Inventory;

  position = new THREE.Vector3(0.5, 75, 0.5);
  velocity = new THREE.Vector3(0, 0, 0);
  yaw = 0;
  pitch = 0;

  // Default to Survival Mode like real Minecraft!
  gameMode: 'survival' | 'creative' | 'spectator' = 'survival';
  flying = false;
  onGround = false;
  inWater = false;
  isSprinting = false;
  isSneaking = false;

  health = 20;
  maxHealth = 20;
  hunger = 20;
  saturation = 5.0;
  exhaustion = 0.0;
  fallDistance = 0;
  hurtTimer = 0;
  hurtDirection = 1;
  invulnerableTimer = 0;
  regenTimer = 0;
  toggledSprint = false;
  toggledSneak = false;
  lastSprintPressed = false;
  lastSneakPressed = false;
  onPlayerDeath?: () => void;
  lastDeathCause = '';
  lastDeathMessage = 'Player died';
  xpLevel = 0;
  xpProgress = 0.0;

  // 26.3 Cushion Sitting State (`net.minecraft.world.entity.decoration.Cushion`)
  seatedCushion: CushionEntityData | null = null;

  // Input & animation state
  keys = new Set<string>();
  lastSpacePress = 0;
  lastWPress = 0;
  stepTimer = 0;
  walkBobPhase = 0;
  walkBobIntensity = 0;
  currentEyeHeight = 1.62;
  currentFovMultiplier = 1.0;
  swingProgress = 0;
  isSwinging = false;

  // Survival Mining / Block Breaking state
  isMining = false;
  miningTargetKey = '';
  miningProgress = 0; // 0.0 to 1.0
  miningHitSoundTimer = 0;
  creativeBreakCooldown = 0;

  // Target block highlight wireframe & 3D Destroy Stage Crack Overlay
  highlightBox: THREE.LineSegments;
  crackMesh: THREE.Mesh;
  private lastCrackStage = -1;
  currentHit: RaycastHit | null = null;

  constructor(camera: THREE.PerspectiveCamera, world: World, inventory: Inventory) {
    this.camera = camera;
    this.world = world;
    this.inventory = inventory;

    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.003, 1.003, 1.003));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 2,
      transparent: true,
      opacity: 0.45,
    });
    this.highlightBox = new THREE.LineSegments(edges, lineMat);
    this.highlightBox.visible = false;
    this.world.scene.add(this.highlightBox);

    // 3D Block Crack Overlay Mesh (destroy_stage_0..9)
    const crackGeo = new THREE.BoxGeometry(1.005, 1.005, 1.005);
    const crackMat = new THREE.MeshBasicMaterial({
      map: TextureAtlas.texture,
      transparent: true,
      opacity: 0.82,
      alphaTest: 0.05,
      depthWrite: false,
      blending: THREE.MultiplyBlending,
    });
    this.crackMesh = new THREE.Mesh(crackGeo, crackMat);
    this.crackMesh.visible = false;
    this.world.scene.add(this.crackMesh);
  }

  /** Find a dry land spawn point near (0, 0) in the newly generated random world */
  spawnAtWorldCenter() {
    let bestX = 0;
    let bestZ = 0;
    let bestY = 68;

    for (let r = 0; r <= 48; r += 4) {
      let found = false;
      for (const [dx, dz] of [
        [r, 0],
        [-r, 0],
        [0, r],
        [0, -r],
        [r, r],
        [-r, -r],
      ]) {
        const cx = dx >> 4;
        const cz = dz >> 4;
        this.world.ensureChunk(cx, cz);
        const topY = this.world.getTopSolidY(dx, dz);
        const surfaceBlock = this.world.getBlock(dx, topY - 1, dz);
        const aboveBlock = this.world.getBlock(dx, topY, dz);
        const surfaceDef = Registries.getBlock(surfaceBlock);
        const aboveDef = Registries.getBlock(aboveBlock);

        if (topY >= 63 && !surfaceDef.fluid && !aboveDef.fluid) {
          bestX = dx;
          bestZ = dz;
          bestY = topY;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    this.position.set(bestX + 0.5, bestY + 0.001, bestZ + 0.5);
    this.velocity.set(0, 0, 0);
    this.onGround = true;
    this.seatedCushion = null;
    this.yaw = 0;
    this.pitch = 0;
    this.resetMining();
  }

  sitOnCushion(cushion: CushionEntityData) {
    this.seatedCushion = cushion;
    this.position.set(cushion.x, cushion.blockY + 0.25, cushion.z);
    this.velocity.set(0, 0, 0);
    this.flying = false;
    AudioEngine.play('entity.cushion.sit', 0.85);
  }

  dismountCushion() {
    if (!this.seatedCushion) return;
    const cy = this.seatedCushion.blockY + 1.001;
    let targetX = this.seatedCushion.x;
    let targetY = cy;
    let targetZ = this.seatedCushion.z;

    // Verify dismount space is clear of solid collision
    if (this.collidesAt(targetX, targetY, targetZ)) {
      const offsets = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (const [ox, oz] of offsets) {
        if (!this.collidesAt(targetX + ox, targetY, targetZ + oz)) {
          targetX += ox;
          targetZ += oz;
          break;
        }
      }
    }
    this.position.set(targetX, targetY, targetZ);
    this.velocity.set(0, 0, 0);
    this.seatedCushion = null;
    this.currentEyeHeight = 1.62;
    AudioEngine.play('entity.cushion.get_up', 0.85);
  }

  applyDamage(amount: number, source: string) {
    if (this.gameMode === 'creative' || this.gameMode === 'spectator') return;
    if (this.invulnerableTimer > 0) return;

    this.invulnerableTimer = 0.5;
    this.hurtTimer = 0.45;
    this.hurtDirection = Math.random() < 0.5 ? -1 : 1;
    this.health = Math.max(0, this.health - amount);
    this.lastDeathCause = source;
    AudioEngine.play('entity.player.hurt', 0.9);

    if (this.health <= 0) {
      const username = OptionsManager.current.username || 'Player';
      if (source === 'fall') {
        this.lastDeathMessage = `${username} fell from a high place`;
      } else if (source === 'zombie') {
        this.lastDeathMessage = `${username} was slain by Zombie`;
      } else if (source === 'starvation') {
        this.lastDeathMessage = `${username} starved to death`;
      } else if (source === 'drown') {
        this.lastDeathMessage = `${username} drowned`;
      } else if (source === 'void') {
        this.lastDeathMessage = `${username} fell out of the world`;
      } else {
        this.lastDeathMessage = `${username} died`;
      }
      AudioEngine.play('entity.player.death', 1.0);
      this.onPlayerDeath?.();
    }
  }

  triggerSwing() {
    this.isSwinging = true;
    this.swingProgress = 0;
  }

  resetMining() {
    this.miningTargetKey = '';
    this.miningProgress = 0;
    this.miningHitSoundTimer = 0;
    this.crackMesh.visible = false;
    this.lastCrackStage = -1;
  }

  public updateCrackStageUVs(stage: number) {
    if (stage < 0 || stage > 9) {
      this.crackMesh.visible = false;
      this.lastCrackStage = -1;
      return;
    }
    this.crackMesh.visible = true;
    if (stage === this.lastCrackStage) return;
    this.lastCrackStage = stage;

    const uv = TextureAtlas.getUV(`destroy_stage_${stage}`);
    const uvAttr = this.crackMesh.geometry.attributes.uv as THREE.BufferAttribute;
    for (let f = 0; f < 6; f++) {
      const baseIdx = f * 4;
      uvAttr.setXY(baseIdx + 0, uv.u0, uv.v1);
      uvAttr.setXY(baseIdx + 1, uv.u1, uv.v1);
      uvAttr.setXY(baseIdx + 2, uv.u0, uv.v0);
      uvAttr.setXY(baseIdx + 3, uv.u1, uv.v0);
    }
    uvAttr.needsUpdate = true;
  }

  /** Calculate survival block break speed (progress per second, 1.0 = broken) */
  getDestroySpeedPerSecond(blockDef: BlockDefinition, heldItem: ItemDefinition | null): number {
    if (this.gameMode === 'creative') return 1000;
    if (blockDef.hardness < 0) return 0; // Unbreakable (bedrock)
    if (blockDef.hardness === 0) return 1000; // Instant break (short_grass, flowers, torches)

    // Determine effective tool type for block
    let effectiveTool: 'pickaxe' | 'axe' | 'shovel' | null = null;
    let requiresTool = false;

    if (blockDef.soundGroup === 'stone') {
      effectiveTool = 'pickaxe';
      requiresTool = true;
    } else if (blockDef.soundGroup === 'wood') {
      effectiveTool = 'axe';
    } else if (
      blockDef.soundGroup === 'grass' ||
      blockDef.soundGroup === 'sand' ||
      blockDef.soundGroup === 'gravel'
    ) {
      if (!blockDef.shortId.includes('leaves')) {
        effectiveTool = 'shovel';
      }
    }

    let speedMult = 1.0;
    let hasCorrectTool = false;
    if (heldItem && heldItem.toolType && heldItem.toolType === effectiveTool) {
      speedMult = heldItem.toolSpeed || 4.0;
      hasCorrectTool = true;
    } else if (
      heldItem &&
      heldItem.toolType === 'sword' &&
      blockDef.shortId.includes('leaves')
    ) {
      speedMult = 1.5;
    }

    // In vanilla Minecraft: if harvestable, time = hardness * 1.5 / speedMult; else hardness * 5.0
    const canHarvest = !requiresTool || hasCorrectTool;
    const baseSeconds = blockDef.hardness * (canHarvest ? 1.5 : 5.0);
    let rate = speedMult / Math.max(0.05, baseSeconds);

    if (this.inWater) rate *= 0.25;
    if (!this.onGround && !this.flying) rate *= 0.25;

    return rate;
  }

  private getBlockHeight(bx: number, by: number, bz: number): number {
    const b = this.world.getBlock(bx, by, bz);
    if (b === 0) return 0;
    const def = Registries.getBlock(b);
    if (!def.solid) return 0;
    if (def.shape === 'slab_bottom' || def.shape === 'trapdoor') {
      const meta = this.world.getMeta(bx, by, bz);
      return (meta & 4) !== 0 ? 1.0 : 0.5;
    }
    if (def.shape === 'bed_foot' || def.shape === 'bed_head' || def.shape === 'campfire') {
      return 0.45;
    }
    return 1.0;
  }

  public collidesAt(px: number, py: number, pz: number): boolean {
    if (this.gameMode === 'spectator') return false;
    const halfW = 0.295;
    const height = this.isSneaking ? 1.5 : 1.78;

    const minX = Math.floor(px - halfW);
    const maxX = Math.floor(px + halfW);
    const minY = Math.floor(py);
    const maxY = Math.floor(py + height);
    const minZ = Math.floor(pz - halfW);
    const maxZ = Math.floor(pz + halfW);

    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        for (let x = minX; x <= maxX; x++) {
          const bh = this.getBlockHeight(x, y, z);
          if (bh > 0 && py < y + bh - 0.0001 && py + height > y + 0.0001) {
            return true;
          }
        }
      }
    }
    return false;
  }

  update(dt: number, controlsActive: boolean) {
    if (this.creativeBreakCooldown > 0) {
      this.creativeBreakCooldown = Math.max(0, this.creativeBreakCooldown - dt);
    }

    if (this.hurtTimer > 0) this.hurtTimer -= dt;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    if (this.isSwinging) {
      this.swingProgress += dt * 4.5;
      if (this.swingProgress >= 1) {
        this.swingProgress = 0;
        this.isSwinging = false;
      }
    }

    // Dismount cushion if Sneak is pressed
    const kb = OptionsManager.current.keyBinds;
    const sneakPressed =
      this.keys.has(kb.sneak) ||
      this.keys.has('ShiftLeft') ||
      this.keys.has('ShiftRight');

    if (this.seatedCushion && controlsActive && sneakPressed) {
      this.dismountCushion();
    }

    if (this.seatedCushion) {
      this.position.set(
        this.seatedCushion.x,
        this.seatedCushion.blockY + 0.25,
        this.seatedCushion.z
      );
      this.updateCamera(dt, false);
      this.updateRaycast();
      return;
    }

    // 0. Unstick safeguard if embedded inside solid block
    if (this.collidesAt(this.position.x, this.position.y, this.position.z)) {
      for (let pop = 0.2; pop <= 2.0; pop += 0.2) {
        if (!this.collidesAt(this.position.x, this.position.y + pop, this.position.z)) {
          this.position.y += pop;
          this.velocity.y = 0;
          break;
        }
      }
    }

    // Input vector in local XZ
    let forward = 0;
    let strafe = 0;
    const forwardPressed =
      this.keys.has(kb.forward) || this.keys.has('KeyW') || this.keys.has('ArrowUp');
    const backPressed =
      this.keys.has(kb.back) || this.keys.has('KeyS') || this.keys.has('ArrowDown');
    const leftPressed =
      this.keys.has(kb.left) || this.keys.has('KeyA') || this.keys.has('ArrowLeft');
    const rightPressed =
      this.keys.has(kb.right) || this.keys.has('KeyD') || this.keys.has('ArrowRight');
    const sprintPressed =
      this.keys.has(kb.sprint) || this.keys.has('ControlLeft') || this.keys.has('KeyR');

    if (controlsActive) {
      if (forwardPressed) forward += 1;
      if (backPressed) forward -= 1;
      if (leftPressed) strafe -= 1;
      if (rightPressed) strafe += 1;
    }

    const len = Math.hypot(forward, strafe);
    if (len > 0) {
      forward /= len;
      strafe /= len;
    }

    if (OptionsManager.current.toggleSneak) {
      if (controlsActive && sneakPressed && !this.lastSneakPressed) {
        this.toggledSneak = !this.toggledSneak;
      }
      this.lastSneakPressed = sneakPressed;
      this.isSneaking = controlsActive && !this.flying && this.toggledSneak;
    } else {
      this.isSneaking = controlsActive && !this.flying && sneakPressed;
    }

    if (OptionsManager.current.toggleSprint) {
      if (controlsActive && sprintPressed && !this.lastSprintPressed) {
        this.toggledSprint = !this.toggledSprint;
      }
      this.lastSprintPressed = sprintPressed;
      if (forward <= 0 || this.isSneaking || this.hunger <= 6) {
        this.isSprinting = false;
        this.toggledSprint = false;
      } else if (this.toggledSprint) {
        this.isSprinting = true;
      }
    } else {
      if (forward <= 0 || this.isSneaking || this.hunger <= 6) {
        this.isSprinting = false;
      } else if (sprintPressed && this.hunger > 6) {
        this.isSprinting = true;
      }
    }

    // Vanilla Minecraft Movement Speeds:
    // Walking = 4.317 m/s, Sprinting = 5.612 m/s, Sneaking = 1.295 m/s, Flying = 10.89 m/s (21.78 sprint)
    let targetSpeed = 4.317;
    if (this.flying || this.gameMode === 'spectator') {
      targetSpeed = this.isSprinting ? 21.6 : 10.9;
    } else if (this.isSneaking) {
      targetSpeed = 1.31;
    } else if (this.isSprinting) {
      targetSpeed = 5.612;
    }

    const sinYaw = Math.sin(this.yaw);
    const cosYaw = Math.cos(this.yaw);
    const wishVx = (-sinYaw * forward + cosYaw * strafe) * targetSpeed;
    const wishVz = (-cosYaw * forward - sinYaw * strafe) * targetSpeed;

    // Check water state
    const feetBlock = this.world.getBlock(
      Math.floor(this.position.x),
      Math.floor(this.position.y + 0.35),
      Math.floor(this.position.z)
    );
    this.inWater = Registries.getBlock(feetBlock).fluid === 'water';

    if (this.flying || this.gameMode === 'spectator') {
      // Smooth flying inertia like Creative fly mode
      const flyAccel = Math.min(1, dt * 10.0);
      this.velocity.x += (wishVx - this.velocity.x) * flyAccel;
      this.velocity.z += (wishVz - this.velocity.z) * flyAccel;

      let wishVy = 0;
      if (controlsActive) {
        if (this.keys.has('Space')) wishVy += 7.5;
        if (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')) wishVy -= 7.5;
      }
      this.velocity.y += (wishVy - this.velocity.y) * Math.min(1, dt * 14.0);
    } else {
      // Ground vs Air horizontal acceleration (preserves jump momentum in air!)
      const accelRate = this.onGround ? 18.0 : 4.2;
      const blend = Math.min(1, dt * accelRate);
      this.velocity.x += (wishVx - this.velocity.x) * blend;
      this.velocity.z += (wishVz - this.velocity.z) * blend;

      if (this.inWater) {
        this.velocity.x *= Math.pow(0.8, dt * 20);
        this.velocity.z *= Math.pow(0.8, dt * 20);
        this.velocity.y -= 6.5 * dt;
        this.velocity.y = Math.max(-3.0, this.velocity.y);
        if (controlsActive && this.keys.has('Space')) {
          this.velocity.y = 4.2;
        }
      } else {
        // Vanilla Gravity (-28 m/s^2) and Jump (8.45 m/s -> 1.252m peak height)
        this.velocity.y -= 28.0 * dt;
        this.velocity.y = Math.max(-55.0, this.velocity.y);

        if (controlsActive && this.keys.has('Space') && this.onGround) {
          this.velocity.y = 8.45;
          this.onGround = false;
          // Vanilla sprint-jump horizontal impulse (+0.2 blocks/tick)
          if (this.isSprinting && forward > 0) {
            this.velocity.x += -sinYaw * 1.45;
            this.velocity.z += -cosYaw * 1.45;
          }
        }
      }
    }

    const oldX = this.position.x;
    const oldZ = this.position.z;

    // 1. Resolve X Movement (with Sneak Edge Guard & Slab/Stair 0.5m Step-Up)
    let dx = this.velocity.x * dt;
    if (this.isSneaking && this.onGround) {
      while (
        Math.abs(dx) > 0.001 &&
        !this.collidesAt(this.position.x + dx, this.position.y - 0.52, this.position.z)
      ) {
        dx = Math.abs(dx) < 0.02 ? 0 : dx * 0.5;
      }
    }
    const nextX = this.position.x + dx;
    if (!this.collidesAt(nextX, this.position.y, this.position.z)) {
      this.position.x = nextX;
    } else if (
      this.onGround &&
      !this.collidesAt(nextX, this.position.y + 0.52, this.position.z) &&
      this.collidesAt(nextX, this.position.y + 0.05, this.position.z)
    ) {
      this.position.x = nextX;
      this.position.y = Math.floor(this.position.y) + 0.501;
    } else {
      this.velocity.x = 0;
    }

    // 2. Resolve Z Movement (with Sneak Edge Guard & Slab/Stair 0.5m Step-Up)
    let dz = this.velocity.z * dt;
    if (this.isSneaking && this.onGround) {
      while (
        Math.abs(dz) > 0.001 &&
        !this.collidesAt(this.position.x, this.position.y - 0.52, this.position.z + dz)
      ) {
        dz = Math.abs(dz) < 0.02 ? 0 : dz * 0.5;
      }
    }
    const nextZ = this.position.z + dz;
    if (!this.collidesAt(this.position.x, this.position.y, nextZ)) {
      this.position.z = nextZ;
    } else if (
      this.onGround &&
      !this.collidesAt(this.position.x, this.position.y + 0.52, nextZ) &&
      this.collidesAt(this.position.x, this.position.y + 0.05, nextZ)
    ) {
      this.position.z = nextZ;
      this.position.y = Math.floor(this.position.y) + 0.501;
    } else {
      this.velocity.z = 0;
    }

    // 3. Resolve Y Movement with exact surface snapping so onGround never flickers!
    const dy = this.velocity.y * dt;
    const nextY = this.position.y + dy;
    if (!this.collidesAt(this.position.x, nextY, this.position.z)) {
      this.position.y = nextY;
      // Check if feet are resting within 0.015m of ground surface
      this.onGround =
        this.velocity.y <= 0 &&
        this.collidesAt(this.position.x, this.position.y - 0.015, this.position.z);
    } else {
      if (this.velocity.y < 0) {
        // Binary refine down to exact surface contact (within 0.001m)
        let low = nextY;
        let high = this.position.y;
        for (let i = 0; i < 8; i++) {
          const mid = (low + high) * 0.5;
          if (this.collidesAt(this.position.x, mid, this.position.z)) {
            low = mid;
          } else {
            high = mid;
          }
        }
        this.position.y = high;
        if (this.fallDistance > 3.0 && this.gameMode === 'survival') {
          const fallDmg = Math.floor(this.fallDistance - 3.0);
          if (fallDmg > 0) {
            this.applyDamage(fallDmg, 'fall');
          }
        }
        this.fallDistance = 0;
        this.onGround = true;
        if (this.flying && this.gameMode !== 'spectator') {
          this.flying = false; // Touching ground disables flying just like Minecraft!
        }
      }
      this.velocity.y = 0;
    }

    if (!this.onGround && !this.flying && !this.inWater) {
      if (this.velocity.y < 0) {
        this.fallDistance += -this.velocity.y * dt;
      }
    } else {
      this.fallDistance = 0;
    }

    // Footstep sound & View Bobbing distance
    const movedDist = Math.hypot(this.position.x - oldX, this.position.z - oldZ);
    const isWalkingOnGround = this.onGround && !this.flying && movedDist > 0.0005;

    // Survival Hunger & Exhaustion System
    if (this.gameMode === 'survival') {
      if (isWalkingOnGround) {
        this.exhaustion += movedDist * (this.isSprinting ? 0.08 : 0.01);
      }
      if (this.exhaustion >= 4.0) {
        this.exhaustion -= 4.0;
        if (this.saturation > 0) {
          this.saturation = Math.max(0, this.saturation - 1.0);
        } else if (this.hunger > 0) {
          this.hunger = Math.max(0, this.hunger - 1);
        }
      }

      this.regenTimer += dt;
      if (this.hunger >= 18 && this.health < this.maxHealth) {
        if (this.regenTimer >= 4.0) {
          this.regenTimer = 0;
          this.health = Math.min(this.maxHealth, this.health + 1);
          this.exhaustion += 3.0;
        }
      } else if (this.hunger === 0) {
        if (this.regenTimer >= 4.0) {
          this.regenTimer = 0;
          const diff = OptionsManager.current.difficulty;
          const minHealth = diff === 'Easy' ? 10 : diff === 'Normal' ? 1 : 0;
          if (this.health > minHealth) {
            this.applyDamage(1, 'starvation');
          }
        }
      } else {
        if (this.regenTimer > 4.0) this.regenTimer = 0;
      }
    }

    if (isWalkingOnGround) {
      this.walkBobPhase += movedDist * 3.6;
      this.walkBobIntensity += (1.0 - this.walkBobIntensity) * Math.min(1, dt * 10);

      this.stepTimer += movedDist;
      if (this.stepTimer >= (this.isSprinting ? 1.85 : 1.55)) {
        this.stepTimer = 0;
        const underBlock = this.world.getBlock(
          Math.floor(this.position.x),
          Math.floor(this.position.y - 0.15),
          Math.floor(this.position.z)
        );
        if (underBlock !== 0) {
          const def = Registries.getBlock(underBlock);
          AudioEngine.playBlockSound(def.soundGroup, 'step');
        }
      }
    } else {
      this.walkBobIntensity *= Math.pow(0.05, dt);
    }

    this.updateCamera(dt, isWalkingOnGround);
    this.updateRaycast();
  }

  updateCamera(dt: number, isWalkingOnGround: boolean) {
    const targetEye = this.seatedCushion
      ? 0.95
      : this.isSneaking
      ? 1.27
      : 1.62;
    this.currentEyeHeight +=
      (targetEye - this.currentEyeHeight) * Math.min(1, dt * 16);

    // Dynamic FOV kick for Sprinting / Flying
    const targetFovMult =
      this.flying && this.isSprinting
        ? 1.16
        : this.isSprinting || this.flying
        ? 1.1
        : 1.0;
    this.currentFovMultiplier +=
      (targetFovMult - this.currentFovMultiplier) * Math.min(1, dt * 10);
    const desiredFov = OptionsManager.current.fov * this.currentFovMultiplier;
    if (Math.abs(this.camera.fov - desiredFov) > 0.05) {
      this.camera.fov = desiredFov;
      this.camera.updateProjectionMatrix();
    }

    // Vanilla View Bobbing offset
    const bobX =
      Math.sin(this.walkBobPhase) * 0.045 * this.walkBobIntensity;
    const bobY =
      -Math.abs(Math.cos(this.walkBobPhase)) * 0.05 * this.walkBobIntensity;

    // Authentic Minecraft damage camera tilt (bobHurt)
    let hurtRoll = 0;
    if (this.hurtTimer > 0) {
      const hurtRatio = this.hurtTimer / 0.45;
      hurtRoll = Math.sin(hurtRatio * Math.PI) * (14.0 * Math.PI / 180.0) * this.hurtDirection;
    }

    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = this.pitch;
    euler.y = this.yaw;
    euler.z = hurtRoll;
    this.camera.quaternion.setFromEuler(euler);

    const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(
      this.camera.quaternion
    );
    this.camera.position.set(
      this.position.x + rightVec.x * bobX,
      this.position.y + this.currentEyeHeight + bobY,
      this.position.z + rightVec.z * bobX
    );
  }

  /**
   * High-precision Voxel Raycast (4.5 blocks in Survival, 5.0 blocks in Creative)
   */
  updateRaycast() {
    const dir = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(this.camera.quaternion)
      .normalize();
    const origin = this.camera.position.clone();
    const maxDist = this.gameMode === 'creative' ? 5.2 : 4.5;
    const step = 0.025;

    let prevBx = Math.floor(origin.x);
    let prevBy = Math.floor(origin.y);
    let prevBz = Math.floor(origin.z);

    this.currentHit = null;

    for (let d = 0.05; d <= maxDist; d += step) {
      const px = origin.x + dir.x * d;
      const py = origin.y + dir.y * d;
      const pz = origin.z + dir.z * d;
      const bx = Math.floor(px);
      const by = Math.floor(py);
      const bz = Math.floor(pz);

      const b = this.world.getBlock(bx, by, bz);
      if (b !== 0) {
        const def = Registries.getBlock(b);
        if (def.shape !== 'air' && def.shape !== 'fluid') {
          this.currentHit = {
            bx,
            by,
            bz,
            nx: prevBx - bx,
            ny: prevBy - by,
            nz: prevBz - bz,
            blockNumId: b,
            distance: d,
          };
          break;
        }
      }
      prevBx = bx;
      prevBy = by;
      prevBz = bz;
    }

    if (this.currentHit) {
      this.highlightBox.position.set(
        this.currentHit.bx + 0.5,
        this.currentHit.by + 0.5,
        this.currentHit.bz + 0.5
      );
      this.highlightBox.visible = true;
      this.crackMesh.position.set(
        this.currentHit.bx + 0.5,
        this.currentHit.by + 0.5,
        this.currentHit.bz + 0.5
      );
    } else {
      this.highlightBox.visible = false;
      this.crackMesh.visible = false;
    }
  }

  getCardinalFacingMeta(): number {
    // 0=North(-Z), 1=East(+X), 2=South(+Z), 3=West(-X)
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    if (Math.abs(dir.x) > Math.abs(dir.z)) {
      return dir.x > 0 ? 1 : 3;
    }
    return dir.z > 0 ? 2 : 0;
  }
}
