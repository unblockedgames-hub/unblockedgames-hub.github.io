import * as THREE from 'three';
import { Registries } from './core/Registries';
import { TextureAtlas } from './render/TextureAtlas';
import { AudioEngine } from './core/AudioEngine';
import { OptionsManager } from './core/Options';
import { ResourcePackManager } from './core/ResourcePackManager';
import { WorldGen26_3 } from './world/WorldGen26_3';
import { World } from './world/World';
import { EntityRenderer } from './render/EntityRenderer';
import { ParticleSystem } from './render/ParticleSystem';
import { PanoramaRenderer } from './render/PanoramaRenderer';
import { SkyRenderer } from './render/SkyRenderer';
import { FirstPersonHand } from './render/FirstPersonHand';
import { WebGPUContext } from './render/WebGPUContext';
import { Inventory, ContainerManager, ItemStack } from './gameplay/Inventory';
import { Player } from './gameplay/Player';
import { UIManager } from './ui/UIManager';
import { MultiplayerManager } from './network/MultiplayerManager';

export class Game {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  ambientLight: THREE.AmbientLight;
  sunLight: THREE.DirectionalLight;
  skyColor = new THREE.Color(0x78a7ff);

  panorama: PanoramaRenderer;
  skyRenderer: SkyRenderer;
  firstPersonHand!: FirstPersonHand;
  entityRenderer: EntityRenderer;
  particleSystem: ParticleSystem;
  world!: World;
  inventory!: Inventory;
  player!: Player;
  ui!: UIManager;

  inWorld = false;
  lastTime = performance.now();
  frameCount = 0;
  fpsTimer = 0;
  ambientTickTimer = 0;
  autoSaveTimer = 0;
  mobSpawnTimer = 0;

  constructor(canvas: HTMLCanvasElement, uiRoot: HTMLElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.background = this.skyColor;
    this.scene.fog = new THREE.FogExp2(0x78a7ff, 0.011);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 0.85);
    this.sunLight.position.set(80, 140, 60);
    this.scene.add(this.sunLight);

    this.panorama = new PanoramaRenderer();
    this.skyRenderer = new SkyRenderer(this.scene);
    this.entityRenderer = new EntityRenderer(this.scene);
    this.particleSystem = new ParticleSystem(this.scene);

    this.init(uiRoot);

    window.addEventListener('beforeunload', () => {
      if (this.inWorld && this.ui) {
        this.ui.saveActiveWorldState();
      }
    });
  }

  async init(uiRoot: HTMLElement) {
    uiRoot.innerHTML = `
      <div style="position:fixed;inset:0;background:#ef323d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:50;">
        <img src="./assets/minecraft/textures/gui/title/mojangstudios.png" alt="Mojang Studios" style="width:420px;max-width:85vw;image-rendering:pixelated;" />
        <div style="width:360px;height:14px;border:2px solid #ffffff;padding:2px;">
          <div id="mojang-load-bar" style="width:20%;height:100%;background:#ffffff;transition:width 0.15s;"></div>
        </div>
      </div>
    `;

    const setProgress = (pct: number) => {
      const bar = document.getElementById('mojang-load-bar');
      if (bar) bar.style.width = `${pct}%`;
    };

    await Promise.all([OptionsManager.init(), WebGPUContext.init()]);
    setProgress(25);
    await Registries.init();

    setProgress(45);
    await ResourcePackManager.init();

    setProgress(55);
    await TextureAtlas.build();

    setProgress(80);
    await Promise.all([
      WorldGen26_3.init(),
      AudioEngine.init(),
      MultiplayerManager.init(),
    ]);

    this.world = new World(this.scene, this.entityRenderer, this.particleSystem);
    this.inventory = new Inventory();
    this.player = new Player(this.camera, this.world, this.inventory);
    this.player.onPlayerDeath = () => {
      const px = this.player.position.x;
      const py = this.player.position.y + 0.5;
      const pz = this.player.position.z;

      // Keep inventory is OFF by default: Drop all items at death location
      const dropStack = (s: ItemStack | null) => {
        if (!s || s.count <= 0) return;
        const vx = (Math.random() - 0.5) * 2.5;
        const vy = 2.5 + Math.random() * 2.0;
        const vz = (Math.random() - 0.5) * 2.5;
        this.entityRenderer.spawnDroppedItem(px, py, pz, s.item.shortId, s.count, vx, vy, vz);
      };

      for (let i = 0; i < this.inventory.slots.length; i++) {
        dropStack(this.inventory.slots[i]);
        this.inventory.slots[i] = null;
      }
      for (let i = 0; i < this.inventory.armorSlots.length; i++) {
        dropStack(this.inventory.armorSlots[i]);
        this.inventory.armorSlots[i] = null;
      }
      dropStack(this.inventory.offhandSlot);
      this.inventory.offhandSlot = null;
      dropStack(this.inventory.cursorStack);
      this.inventory.cursorStack = null;

      // Reset XP
      this.player.xpLevel = 0;
      this.player.xpProgress = 0;

      // Log death message in chat
      this.ui.addChatMessage(`§c${this.player.lastDeathMessage}`);
      this.ui.setState('GAME_OVER');
    };
    this.firstPersonHand = new FirstPersonHand();
    this.ui = new UIManager(uiRoot, this.player, this.inventory, this.world);

    setProgress(95);
    await this.ui.initAssets();
    setProgress(100);

    this.ui.onStartGame = (isMultiplayer) => {
      this.enterWorld(isMultiplayer);
    };
    this.ui.onQuitToTitle = () => {
      this.inWorld = false;
      this.player.isMining = false;
      this.player.resetMining();
    };

    this.bindInputEvents();

    (window as any).__MC_26_3__ = this;

    this.ui.setState('TITLE');
    requestAnimationFrame((t) => this.loop(t));
  }

  enterWorld(isMultiplayer = false) {
    this.inWorld = true;
    const restored = !isMultiplayer && this.ui.loadActiveWorldState();
    if (!restored) {
      this.player.spawnAtWorldCenter();
    }
    this.world.updateChunksAroundPlayer(
      this.player.position.x,
      this.player.position.z
    );

    // Spawn passive mobs nearby on dry terrain around player spawn if none exist
    const px = Math.floor(this.player.position.x);
    const pz = Math.floor(this.player.position.z);
    if (this.entityRenderer.mobs.size === 0) {
      this.entityRenderer.spawnMob(
        'sheep_1',
        'sheep',
        px + 8,
        this.world.getTopSolidY(px + 8, pz + 6),
        pz + 6
      );
      this.entityRenderer.spawnMob(
        'pig_1',
        'pig',
        px - 7,
        this.world.getTopSolidY(px - 7, pz + 5),
        pz + 5
      );
      this.entityRenderer.spawnMob(
        'cow_1',
        'cow',
        px + 12,
        this.world.getTopSolidY(px + 12, pz - 6),
        pz - 6
      );
    }
    if (!isMultiplayer) {
      this.ui.saveActiveWorldState();
    }
    this.ui.setState('IN_GAME');
    this.ui.updateHUDOnly();
    if (isMultiplayer) {
      this.ui.addChatMessage(
        '§b[Wispcraft] §fSynchronized world state over Wisp v2 TCP multiplexer!'
      );
    }
  }

  private bindInputEvents() {
    window.addEventListener('beforeunload', () => {
      if (this.inWorld) {
        this.ui.saveActiveWorldState();
      }
    });

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.renderer.setSize(w, h);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.panorama.resize(w, h);
    });

    document.addEventListener('pointerlockchange', () => {
      if (!document.pointerLockElement && this.ui.state === 'IN_GAME') {
        this.player.isMining = false;
        this.player.resetMining();
        this.ui.setState('PAUSE');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (
        this.ui.state !== 'IN_GAME' ||
        document.pointerLockElement !== this.canvas
      )
        return;
      const sens = OptionsManager.current.mouseSensitivity * 0.0045;
      this.player.yaw -= e.movementX * sens;
      this.player.pitch = Math.max(
        -Math.PI / 2 + 0.01,
        Math.min(Math.PI / 2 - 0.01, this.player.pitch - e.movementY * sens)
      );
    });

    window.addEventListener('keydown', (e) => {
      if (this.ui.state === 'CHAT') return;

      if (e.code === 'F3') {
        e.preventDefault();
        this.ui.showDebugF3 = !this.ui.showDebugF3;
        return;
      }

      if (e.code === 'KeyE') {
        if (this.ui.state === 'IN_GAME') {
          e.preventDefault();
          this.player.isMining = false;
          this.player.resetMining();
          this.ui.activeContainerTab = 'inventory';
          this.ui.setState('INVENTORY');
          return;
        } else if (this.ui.state === 'INVENTORY' && !this.ui['focusedEditBox']) {
          e.preventDefault();
          this.ui.setState('IN_GAME');
          return;
        }
      }

      const kb = OptionsManager.current.keyBinds;
      const dropKey = kb?.drop || 'KeyQ';
      if (e.code === dropKey && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        const dropped = this.inventory.dropHeldItem(e.ctrlKey);
        if (dropped) {
          this.firstPersonHand.triggerSwing();
          const yaw = this.player.yaw;
          const pitch = this.player.pitch;
          const f1 = Math.cos(pitch);
          const tossSpeed = 0.38;
          const vx = -Math.sin(yaw) * f1 * tossSpeed + this.player.velocity.x * 0.2;
          const vy = -Math.sin(pitch) * tossSpeed + 0.18;
          const vz = -Math.cos(yaw) * f1 * tossSpeed + this.player.velocity.z * 0.2;
          this.entityRenderer.spawnDroppedItem(
            this.player.position.x - Math.sin(yaw) * 0.3,
            this.player.position.y + 1.25,
            this.player.position.z - Math.cos(yaw) * 0.3,
            dropped.item.shortId,
            dropped.count,
            vx * 15.0,
            vy * 16.0,
            vz * 15.0,
            1.8
          );
          AudioEngine.play('entity.item.pickup', 0.5, 0.8);
          this.ui.updateHUDOnly();
        }
        return;
      }

      if (
        (e.code === 'KeyT' || e.code === 'Slash') &&
        this.ui.state === 'IN_GAME'
      ) {
        e.preventDefault();
        this.player.isMining = false;
        this.player.resetMining();
        if (e.code === 'Slash') {
          (this.ui as any).chatInputText = '/';
        } else {
          (this.ui as any).chatInputText = '';
        }
        this.ui.setState('CHAT');
        return;
      }

      if (e.code === 'Escape') {
        if (this.ui.state === 'INVENTORY') {
          this.ui.setState('IN_GAME');
          return;
        } else if (this.ui.state === 'PAUSE') {
          this.ui.setState('IN_GAME');
          return;
        } else if (this.ui.state === 'ADVANCEMENTS') {
          this.ui.setState('PAUSE');
          return;
        }
      }

      // Hotbar keys Digit1..Digit9
      if (e.code.startsWith('Digit') && this.ui.state === 'IN_GAME') {
        const n = parseInt(e.code.slice(5), 10);
        if (n >= 1 && n <= 9) {
          this.inventory.selectedHotbarSlot = n - 1;
          this.ui.updateHUDOnly();
        }
      }

      // Double-tap W to Sprint!
      if (e.code === 'KeyW' && !e.repeat && this.ui.state === 'IN_GAME') {
        const now = performance.now();
        if (now - this.player.lastWPress < 280) {
          this.player.isSprinting = true;
        }
        this.player.lastWPress = now;
      }

      // Double-tap Space to toggle flying in Creative mode
      if (e.code === 'Space' && !e.repeat && this.ui.state === 'IN_GAME') {
        const now = performance.now();
        if (
          now - this.player.lastSpacePress < 300 &&
          this.player.gameMode === 'creative'
        ) {
          this.player.flying = !this.player.flying;
        }
        this.player.lastSpacePress = now;
      }

      this.player.keys.add(e.code);
    });

    window.addEventListener('keyup', (e) => {
      this.player.keys.delete(e.code);
    });

    window.addEventListener('blur', () => {
      this.player.keys.clear();
      this.player.isMining = false;
      this.player.resetMining();
      if (this.ui.state === 'IN_GAME') {
        this.ui.setState('PAUSE');
      }
    });

    window.addEventListener('wheel', (e) => {
      if (this.ui.state !== 'IN_GAME') return;
      const dir = e.deltaY > 0 ? 1 : -1;
      this.inventory.selectedHotbarSlot =
        (this.inventory.selectedHotbarSlot + dir + 9) % 9;
      this.ui.updateHUDOnly();
    });

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.ui.state !== 'IN_GAME') return;
      if (document.pointerLockElement !== this.canvas) {
        this.canvas.requestPointerLock?.();
        return;
      }

      if (e.button === 0) {
        this.player.triggerSwing();
        this.firstPersonHand.triggerSwing();

        // 1. Check if attacking a Mob Entity in front of the player
        const lookDir = new THREE.Vector3();
        this.camera.getWorldDirection(lookDir);
        const maxMobReach = this.player.currentHit
          ? Math.min(
              3.5,
              Math.hypot(
                this.player.currentHit.bx + 0.5 - this.camera.position.x,
                this.player.currentHit.by + 0.5 - this.camera.position.y,
                this.player.currentHit.bz + 0.5 - this.camera.position.z
              )
            )
          : 3.5;
        const mobHit = this.entityRenderer.raycastMob(
          this.camera.position,
          lookDir,
          maxMobReach
        );
        if (mobHit) {
          this.player.isMining = false;
          this.player.resetMining();
          const held = this.inventory.getHeldStack();
          let damage = 2; // Fist
          if (held) {
            const id = held.item.shortId;
            if (id === 'diamond_sword') damage = 7;
            else if (id === 'iron_sword') damage = 6;
            else if (id === 'stone_sword') damage = 5;
            else if (id === 'wooden_sword') damage = 4;
            else if (id.endsWith('_axe')) damage = 8;
            else if (id.endsWith('_pickaxe')) damage = 4;
            else if (id.endsWith('_shovel')) damage = 3;
          }
          // Critical hit when falling!
          const isCrit =
            this.player.velocity.y < -0.1 &&
            !this.player.onGround &&
            !this.player.flying;
          if (isCrit) {
            damage = Math.ceil(damage * 1.5);
          }

          const res = this.entityRenderer.attackMob(
            mobHit.mob.id,
            damage,
            this.player.position,
            (x, y, z) => {
              this.particleSystem.spawnDeathPoof(x, y, z);
            }
          );
          if (res.hit) {
            AudioEngine.playBlockSound('wool', 'break');
            const heartCount = Math.max(1, Math.min(6, Math.round(damage / 2)));
            this.particleSystem.spawnDamageIndicator(
              mobHit.mob.x,
              mobHit.mob.y + 0.7,
              mobHit.mob.z,
              heartCount
            );
            if (isCrit) {
              this.particleSystem.spawnCritBurst(
                mobHit.mob.x,
                mobHit.mob.y + 0.65,
                mobHit.mob.z
              );
            }
            if (res.killed && mobHit.mob.type === 'zombie') {
              this.ui.unlockAdvancement('monster_hunter');
            }
          }
          return;
        }

        // 2. Otherwise start mining targeted block
        this.player.isMining = true;
        if (this.player.gameMode === 'creative') {
          this.completeBlockBreak();
          this.player.creativeBreakCooldown = 0.22;
        }
      } else if (e.button === 2) {
        this.handleRightClickInteractOrPlace();
      } else if (e.button === 1) {
        // Middle click Pick Block (Creative only or switch to matching slot in Survival)
        const hit = this.player.currentHit;
        if (hit) {
          const def = Registries.getBlock(hit.blockNumId);
          const itemDef = Registries.getItem(def.shortId);
          if (itemDef) {
            if (this.player.gameMode === 'creative') {
              this.inventory.slots[this.inventory.selectedHotbarSlot] = {
                item: itemDef,
                count: itemDef.maxStack,
              };
            } else {
              const existingIdx = this.inventory.slots.findIndex(
                (s) => s && s.item.id === itemDef.id
              );
              if (existingIdx >= 0 && existingIdx < 9) {
                this.inventory.selectedHotbarSlot = existingIdx;
              }
            }
            this.ui.updateHUDOnly();
          }
        }
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.player.isMining = false;
        this.player.resetMining();
      }
    });
  }

  /** Tick Survival & Creative block mining progress while left-click is held */
  private updateMining(dt: number) {
    if (!this.player.isMining) {
      if (this.player.miningProgress > 0) {
        this.player.resetMining();
      }
      return;
    }

    // Continuous arm swing while holding left-click
    this.player.miningHitSoundTimer += dt;
    if (this.player.miningHitSoundTimer >= 0.22) {
      this.player.miningHitSoundTimer = 0;
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();

      const hit = this.player.currentHit;
      if (hit && this.player.gameMode === 'survival') {
        const blockDef = Registries.getBlock(hit.blockNumId);
        AudioEngine.playBlockSound(blockDef.soundGroup, 'step');
      }
    }

    if (this.player.gameMode === 'creative') {
      if (this.player.creativeBreakCooldown <= 0) {
        this.completeBlockBreak();
        this.player.creativeBreakCooldown = 0.22;
      }
      return;
    }

    // Survival Mode Hold-to-Mine
    const hit = this.player.currentHit;
    if (!hit) {
      this.player.resetMining();
      return;
    }

    // Check if breaking a 26.3 Cushion sitting on the targeted block
    const cushionAbove =
      this.entityRenderer.findCushionAtBlock(hit.bx, hit.by + 1, hit.bz) ||
      this.entityRenderer.findCushionAtBlock(hit.bx, hit.by, hit.bz);
    if (cushionAbove) {
      this.completeBlockBreak();
      this.player.isMining = false;
      this.player.resetMining();
      return;
    }

    const targetKey = `${hit.bx},${hit.by},${hit.bz}`;
    if (this.player.miningTargetKey !== targetKey) {
      this.player.miningTargetKey = targetKey;
      this.player.miningProgress = 0;
    }

    const blockDef = Registries.getBlock(hit.blockNumId);
    const held = this.inventory.getHeldStack();
    const rate = this.player.getDestroySpeedPerSecond(
      blockDef,
      held ? held.item : null
    );

    if (rate <= 0) {
      this.player.resetMining();
      return;
    }

    this.player.miningProgress += rate * dt;

    if (this.player.miningProgress >= 1.0) {
      this.completeBlockBreak();
      this.player.resetMining();
    } else {
      const stage = Math.min(9, Math.floor(this.player.miningProgress * 10));
      this.player.updateCrackStageUVs(stage);
    }
  }

  private completeBlockBreak() {
    const hit = this.player.currentHit;
    if (!hit) return;

    // 1. Check if breaking a 26.3 Cushion entity
    const cushionAbove =
      this.entityRenderer.findCushionAtBlock(hit.bx, hit.by + 1, hit.bz) ||
      this.entityRenderer.findCushionAtBlock(hit.bx, hit.by, hit.bz);
    if (cushionAbove) {
      if (this.player.seatedCushion?.id === cushionAbove.id) {
        this.player.dismountCushion();
      }
      this.entityRenderer.removeCushion(cushionAbove.id);
      AudioEngine.play('entity.cushion.break', 0.85);
      this.particleSystem.spawnBlockBreakBurst(
        cushionAbove.blockX,
        cushionAbove.blockY,
        cushionAbove.blockZ,
        `${cushionAbove.color}_wool`,
        0xf9801d
      );
      if (this.player.gameMode === 'survival') {
        this.entityRenderer.spawnDroppedItem(
          cushionAbove.blockX,
          cushionAbove.blockY,
          cushionAbove.blockZ,
          `${cushionAbove.color}_cushion`
        );
      }
      return;
    }

    const blockDef = Registries.getBlock(hit.blockNumId);
    if (blockDef.hardness < 0 && this.player.gameMode !== 'creative') return;

    // If breaking a 2-block Straw Bed, remove both foot and head parts
    if (
      blockDef.shortId === 'straw_bed' ||
      blockDef.shortId === 'straw_bed_head'
    ) {
      for (const [dx, dz] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nb = this.world.getBlock(hit.bx + dx, hit.by, hit.bz + dz);
        const nbDef = Registries.getBlock(nb);
        if (
          nbDef.shortId === 'straw_bed' ||
          nbDef.shortId === 'straw_bed_head'
        ) {
          this.world.setBlock(hit.bx + dx, hit.by, hit.bz + dz, 0);
        }
      }
    }

    this.world.setBlock(hit.bx, hit.by, hit.bz, 0);

    // Drop container contents if breaking a furnace, chest, or barrel
    const posKey = `${hit.bx}_${hit.by}_${hit.bz}`;
    if (blockDef.shortId === 'furnace') {
      const f = ContainerManager.furnaces.get(posKey);
      if (f) {
        if (f.input) this.entityRenderer.spawnDroppedItem(hit.bx, hit.by, hit.bz, f.input.item.shortId, f.input.count);
        if (f.fuel) this.entityRenderer.spawnDroppedItem(hit.bx, hit.by, hit.bz, f.fuel.item.shortId, f.fuel.count);
        if (f.output) this.entityRenderer.spawnDroppedItem(hit.bx, hit.by, hit.bz, f.output.item.shortId, f.output.count);
        ContainerManager.furnaces.delete(posKey);
      }
    } else if (blockDef.shortId === 'chest' || blockDef.shortId === 'barrel') {
      const c = ContainerManager.chests.get(posKey);
      if (c) {
        for (const stack of c) {
          if (stack) {
            this.entityRenderer.spawnDroppedItem(hit.bx, hit.by, hit.bz, stack.item.shortId, stack.count);
          }
        }
        ContainerManager.chests.delete(posKey);
      }
    }

    this.world.checkGravity(hit.bx, hit.by + 1, hit.bz, (bx, by, bz, blockId, targetY, meta) => {
      this.entityRenderer.spawnFallingBlock(bx, by, bz, blockId, targetY, meta);
    });
    AudioEngine.playBlockSound(blockDef.soundGroup, 'break');
    this.particleSystem.spawnBlockBreakBurst(
      hit.bx,
      hit.by,
      hit.bz,
      blockDef.textures.north || blockDef.textures.top,
      this.getBlockParticleColor(blockDef)
    );

    if (blockDef.shortId === 'stone' || blockDef.shortId === 'cobblestone') {
      this.ui.unlockAdvancement('stone_age');
    } else if (blockDef.shortId === 'poplar_log') {
      this.ui.unlockAdvancement('wilderness');
    } else if (blockDef.shortId === 'orange_poplar_leaves' || blockDef.shortId === 'yellow_poplar_leaves') {
      this.ui.unlockAdvancement('canopy');
    }

    // Spawn 3D Dropped Item in Survival Mode (respecting tool harvest requirements!)
    if (this.player.gameMode === 'survival') {
      const held = this.inventory.getHeldStack();
      const requiresPickaxe = blockDef.soundGroup === 'stone';
      const canHarvest =
        !requiresPickaxe || (held && held.item.toolType === 'pickaxe');

      if (canHarvest && blockDef.shortId !== 'short_grass' && blockDef.shortId !== 'leaf_litter') {
        let dropId = blockDef.shortId;
        if (dropId === 'stone') dropId = 'cobblestone';
        else if (dropId === 'grass_block' || dropId === 'podzol') dropId = 'dirt';
        else if (dropId === 'coal_ore') dropId = 'coal';
        else if (dropId === 'diamond_ore') dropId = 'diamond';
        else if (dropId === 'straw_bed_head') dropId = 'straw_bed';
        else if (dropId.includes('leaves')) {
          dropId = Math.random() < 0.25 ? 'stick' : '';
        }

        if (dropId) {
          this.entityRenderer.spawnDroppedItem(hit.bx, hit.by, hit.bz, dropId);
        }
      }
    }

    if (MultiplayerManager.activeSession?.state === 'PLAY') {
      MultiplayerManager.activeSession.sendBlockChange(
        hit.bx,
        hit.by,
        hit.bz,
        'minecraft:air'
      );
    }

    this.player.updateRaycast();
    this.ui.updateHUDOnly();
  }

  private getBlockParticleColor(def: { shortId: string; soundGroup: string }): number {
    if (def.soundGroup === 'grass') {
      return def.shortId.includes('path') ? 0x866043 : 0x5d9134;
    }
    if (def.soundGroup === 'stone') {
      return def.shortId.includes('deepslate') ? 0x484848 : 0x828282;
    }
    if (def.soundGroup === 'wood') return 0x9d7f57;
    if (def.soundGroup === 'sand') return 0xd8cb9d;
    if (def.soundGroup === 'gravel') return 0x736d6c;
    if (def.soundGroup === 'wool') return 0xdedede;
    if (def.soundGroup === 'glass') return 0xc0e4ea;
    if (def.soundGroup === 'poplar_leaves') {
      if (def.shortId.includes('orange')) return 0xdf7a28;
      if (def.shortId.includes('yellow')) return 0xe5b230;
      if (def.shortId.includes('red')) return 0xb8332a;
      return 0x42772a;
    }
    if (def.soundGroup === 'straw_bed') return 0xd4a558;
    return 0x888888;
  }

  private handleRightClickInteractOrPlace() {
    const held = this.inventory.getHeldStack();

    const FOOD_PROPERTIES: Record<string, { hunger: number; saturation: number }> = {
      apple: { hunger: 4, saturation: 2.4 },
      bread: { hunger: 5, saturation: 6.0 },
      cooked_beef: { hunger: 8, saturation: 12.8 },
      cooked_porkchop: { hunger: 8, saturation: 12.8 },
      cooked_mutton: { hunger: 6, saturation: 9.6 },
      raw_beef: { hunger: 3, saturation: 1.8 },
      raw_porkchop: { hunger: 3, saturation: 1.8 },
      raw_mutton: { hunger: 2, saturation: 1.2 },
      rotten_flesh: { hunger: 4, saturation: 0.8 },
      golden_apple: { hunger: 4, saturation: 9.6 },
      baked_potato: { hunger: 5, saturation: 6.0 },
      potato: { hunger: 1, saturation: 0.6 },
      carrot: { hunger: 3, saturation: 3.6 },
      sweet_berries: { hunger: 2, saturation: 0.4 },
      cookie: { hunger: 2, saturation: 0.4 },
      melon_slice: { hunger: 2, saturation: 1.2 },
    };

    const hit = this.player.currentHit;
    const food = held ? FOOD_PROPERTIES[held.item.shortId] : null;
    const canEat = food && (this.player.hunger < 20 || held!.item.shortId === 'golden_apple');

    // If holding food, check if we should eat (when aiming at air, sneaking, or clicking non-container block)
    const isClickingContainer =
      hit &&
      ['crafting_table', 'furnace', 'chest', 'barrel', 'stonecutter', 'straw_bed', 'straw_bed_head'].includes(
        Registries.getBlock(hit.blockNumId).shortId
      );

    if (canEat && (!hit || this.player.isSneaking || !isClickingContainer)) {
      if (this.player.gameMode === 'survival') {
        this.inventory.consumeHeld(1);
      }
      this.player.hunger = Math.min(20, this.player.hunger + food.hunger);
      this.player.saturation = Math.min(this.player.hunger, this.player.saturation + food.saturation);
      this.firstPersonHand.triggerSwing();
      this.player.triggerSwing();
      AudioEngine.play('entity.generic.eat', 0.85);
      setTimeout(() => AudioEngine.play('entity.player.burp', 0.7), 250);
      this.ui.updateHUDOnly();
      return;
    }

    if (held && held.item.shortId === 'filled_map') {
      this.firstPersonHand.triggerSwing();
      const camp = this.world.findNearestAbandonedCamp(
        this.player.position.x,
        this.player.position.z
      );
      if (camp) {
        const dist = Math.round(
          Math.hypot(
            camp.x - this.player.position.x,
            camp.z - this.player.position.z
          )
        );
        this.ui.addChatMessage(
          `§6[Abandoned Camp Explorer Map] §eNearest Wilderness Camp located at §bX=${camp.x}, Y=${camp.y}, Z=${camp.z} §7(${dist}m away)!`
        );
        AudioEngine.play('ui.button.click', 0.8);
      }
      return;
    }

    if (!hit) return;

    // 1. Check if Right-Clicking an existing 26.3 Cushion to sit down!
    const clickedCushion =
      this.entityRenderer.findCushionAtBlock(hit.bx, hit.by, hit.bz) ||
      this.entityRenderer.findCushionAtBlock(hit.bx, hit.by + 1, hit.bz);
    if (clickedCushion) {
      this.player.sitOnCushion(clickedCushion);
      this.ui.unlockAdvancement('take_a_seat');
      this.ui.showToast(
        'Take a Seat!',
        `Seated on ${Registries.formatName(clickedCushion.color + '_cushion')}`,
        `${clickedCushion.color}_cushion`
      );
      this.ui.addChatMessage(
        `§aYou sat down on a §e${Registries.formatName(clickedCushion.color + '_cushion')}§a! (Press Shift to stand up)`
      );
      return;
    }

    const targetDef = Registries.getBlock(hit.blockNumId);

    // 2. Check if Right-Clicking a 26.3 Straw Bed -> Set Spawn & Rest!
    if (
      targetDef.shortId === 'straw_bed' ||
      targetDef.shortId === 'straw_bed_head'
    ) {
      AudioEngine.playBlockSound('straw_bed', 'place');
      this.world.timeOfDay = 1000;
      this.ui.unlockAdvancement('straw_dreams');
      this.ui.showToast(
        'Sweet Wilderness Dreams!',
        'Rested on a 26.3 Straw Bed',
        'straw_bed'
      );
      this.ui.addChatMessage(
        '§6[Straw Bed] §aRested in the wilderness Straw Bed! Respawn point set & morning has arrived.'
      );
      return;
    }

    // 3. Check if Right-Clicking Crafting Table, Furnace, Chest, Barrel, or Stonecutter
    if (!this.player.isSneaking) {
      if (targetDef.shortId === 'crafting_table') {
        this.player.isMining = false;
        this.player.resetMining();
        this.ui.activeContainerTab = 'crafting';
        this.ui.setState('INVENTORY');
        return;
      }
      if (targetDef.shortId === 'furnace') {
        this.player.isMining = false;
        this.player.resetMining();
        this.ui.activeContainerBlockPos = `${hit.bx}_${hit.by}_${hit.bz}`;
        this.ui.activeContainerTab = 'furnace';
        this.ui.setState('INVENTORY');
        return;
      }
      if (targetDef.shortId === 'chest' || targetDef.shortId === 'barrel') {
        this.player.isMining = false;
        this.player.resetMining();
        this.ui.activeContainerBlockPos = `${hit.bx}_${hit.by}_${hit.bz}`;
        this.ui.activeContainerTab = targetDef.shortId as any;
        this.ui.setState('INVENTORY');
        return;
      }
      if (targetDef.shortId === 'stonecutter') {
        this.player.isMining = false;
        this.player.resetMining();
        this.ui.activeContainerTab = 'stonecutter';
        this.ui.setState('INVENTORY');
        return;
      }
    }

    if (!held) return;

    const placeX = hit.bx + hit.nx;
    const placeY = hit.by + hit.ny;
    const placeZ = hit.bz + hit.nz;

    // 4. Check if placing a 26.3 Colored Cushion Item!
    if (held.item.cushionColor) {
      const cushionData = {
        id: `cushion_${placeX}_${placeY}_${placeZ}_${Date.now()}`,
        x: placeX + 0.5,
        y: placeY,
        z: placeZ + 0.5,
        blockX: placeX,
        blockY: placeY,
        blockZ: placeZ,
        color: held.item.cushionColor,
        rotation: (this.player.getCardinalFacingMeta() * 90) % 360,
      };
      this.entityRenderer.addCushion(cushionData);
      AudioEngine.play('entity.cushion.place', 0.85);
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      if (this.player.gameMode === 'survival') {
        this.inventory.consumeHeld(1);
      }
      this.ui.updateHUDOnly();
      return;
    }

    // 5. Place BlockItem
    if (held.item.isBlock && held.item.blockNumId !== undefined) {
      const dx = Math.abs(placeX + 0.5 - this.player.position.x);
      const dz = Math.abs(placeZ + 0.5 - this.player.position.z);
      const dy = placeY - this.player.position.y;
      if (dx < 0.7 && dz < 0.7 && dy >= -0.9 && dy <= 1.6) {
        return;
      }

      const placeDef = Registries.getBlock(held.item.blockNumId);
      let facingMeta = this.player.getCardinalFacingMeta();
      if (placeDef.shortId === 'furnace' || placeDef.shortId === 'chest' || placeDef.shortId === 'barrel') {
        // Place directional container blocks facing TOWARDS the player
        facingMeta = (facingMeta + 2) % 4;
      }

      if (placeDef.shortId === 'straw_bed') {
        const offsets = [
          [0, -1],
          [1, 0],
          [0, 1],
          [-1, 0],
        ];
        const [ox, oz] = offsets[facingMeta];
        this.world.setBlock(placeX, placeY, placeZ, placeDef.numId, facingMeta);
        this.world.setBlock(
          placeX + ox,
          placeY,
          placeZ + oz,
          Registries.getBlock('straw_bed_head').numId,
          facingMeta
        );
      } else {
        this.world.setBlock(placeX, placeY, placeZ, placeDef.numId, facingMeta);
      }
      this.world.checkGravity(placeX, placeY, placeZ, (bx, by, bz, blockId, targetY, meta) => {
        this.entityRenderer.spawnFallingBlock(bx, by, bz, blockId, targetY, meta);
      });

      AudioEngine.playBlockSound(placeDef.soundGroup, 'place');
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();

      if (this.player.gameMode === 'survival') {
        this.inventory.consumeHeld(1);
      }

      if (MultiplayerManager.activeSession?.state === 'PLAY') {
        MultiplayerManager.activeSession.sendBlockChange(
          placeX,
          placeY,
          placeZ,
          placeDef.id
        );
      }

      this.player.updateRaycast();
      this.ui.updateHUDOnly();
    }
  }

  private updateDayNightCycle(dt: number) {
    this.world.timeOfDay = (this.world.timeOfDay + dt * 20) % 24000;
    const t = this.world.timeOfDay;

    let daylight = 1.0;
    if (t >= 12000 && t < 13500) {
      daylight = 1.0 - ((t - 12000) / 1500) * 0.85;
    } else if (t >= 13500 && t < 22500) {
      daylight = 0.15;
    } else if (t >= 22500) {
      daylight = 0.15 + ((t - 22500) / 1500) * 0.85;
    }

    this.skyColor.setRGB(0.47 * daylight, 0.65 * daylight, 1.0 * daylight);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.copy(this.skyColor);
    }
    this.ambientLight.intensity = 0.18 + 0.62 * daylight;
    this.sunLight.intensity = 0.95 * daylight;

    this.skyRenderer.update(
      dt,
      this.player.position,
      this.world.timeOfDay,
      OptionsManager.current.clouds ? 'FANCY' : 'OFF'
    );
  }

  private loop(now: number) {
    requestAnimationFrame((t) => this.loop(t));

    const dt = Math.min(0.1, (now - this.lastTime) / 1000);
    this.lastTime = now;

    this.frameCount++;
    this.fpsTimer += dt;
    if (this.fpsTimer >= 0.5) {
      this.ui.fps = Math.round(this.frameCount / this.fpsTimer);
      this.frameCount = 0;
      this.fpsTimer = 0;
    }

    const onMenuWithPanorama =
      !this.inWorld ||
      this.ui.state === 'TITLE' ||
      this.ui.state === 'SINGLEPLAYER_SELECT' ||
      this.ui.state === 'CREATE_WORLD' ||
      this.ui.state === 'MULTIPLAYER_SELECT' ||
      this.ui.state === 'WISPCRAFT_CONFIG' ||
      this.ui.state === 'CONNECTING' ||
      (this.ui.state === 'OPTIONS' && !this.inWorld);

    if (onMenuWithPanorama) {
      this.panorama.render(this.renderer, dt);
      this.ui.render(dt);
      return;
    }

    const isSingleplayerPaused =
      this.inWorld &&
      MultiplayerManager.activeSession?.state !== 'PLAY' &&
      (this.ui.state === 'PAUSE' ||
        this.ui.state === 'OPTIONS' ||
        this.ui.state === 'ADVANCEMENTS' ||
        this.ui.state === 'VIDEO_SETTINGS' ||
        this.ui.state === 'CONTROLS' ||
        this.ui.state === 'SOUND_OPTIONS' ||
        this.ui.state === 'SKIN_CUSTOMIZATION' ||
        this.ui.state === 'CHAT_SETTINGS' ||
        this.ui.state === 'RESOURCE_PACKS' ||
        this.ui.state === 'ACCESSIBILITY' ||
        this.ui.state === 'LANGUAGE' ||
        this.ui.state === 'TELEMETRY' ||
        this.ui.state === 'CREDITS' ||
        this.ui.state === 'CONFIRM_DELETE_WORLD' ||
        this.ui.state === 'GAME_OVER');

    const controlsActive = this.ui.state === 'IN_GAME';

    this.world.updateChunksAroundPlayer(
      this.player.position.x,
      this.player.position.z
    );

    if (!isSingleplayerPaused) {
      ContainerManager.tickFurnaces(dt);

      this.mobSpawnTimer += dt;
      if (this.mobSpawnTimer >= 2.5) {
        this.mobSpawnTimer = 0;
        const isNight = this.world.timeOfDay >= 13000 && this.world.timeOfDay < 23000;
        let zombies = 0;
        let passives = 0;
        for (const [, m] of this.entityRenderer.mobs) {
          if (m.type === 'zombie') zombies++;
          else if (m.type === 'pig' || m.type === 'cow' || m.type === 'sheep') passives++;
        }

        // Surface & Underground Cave Zombie Spawning
        const canSpawnHostile = OptionsManager.current.difficulty !== 'Peaceful' && zombies < 8;
        if (canSpawnHostile) {
          const px = Math.floor(this.player.position.x);
          const py = Math.floor(this.player.position.y);
          const pz = Math.floor(this.player.position.z);

          if (py < 58) {
            // Cave spawn candidate in dark hollows near player
            const angle = Math.random() * Math.PI * 2;
            const dist = 10 + Math.random() * 14;
            const cx = Math.floor(px + Math.cos(angle) * dist);
            const cz = Math.floor(pz + Math.sin(angle) * dist);
            const cy = Math.max(5, Math.min(py + Math.floor((Math.random() - 0.5) * 8), 55));
            const curB = this.world.getBlock(cx, cy, cz);
            const floorB = this.world.getBlock(cx, cy - 1, cz);
            const ceilB = this.world.getBlock(cx, cy + 1, cz);
            if (curB === 0 && ceilB === 0 && floorB !== 0 && Registries.getBlock(floorB)?.solid) {
              this.entityRenderer.spawnMob(`zombie_${Date.now()}`, 'zombie', cx, cy, cz);
            }
          } else if (isNight) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 24 + Math.random() * 16;
            const sx = Math.floor(px + Math.cos(angle) * dist);
            const sz = Math.floor(pz + Math.sin(angle) * dist);
            const sy = this.world.getTopSolidY(sx, sz);
            if (sy >= 62) {
              this.entityRenderer.spawnMob(`zombie_${Date.now()}`, 'zombie', sx, sy, sz);
            }
          }
        } else if (!isNight && passives < 12) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 18 + Math.random() * 18;
          const sx = Math.floor(this.player.position.x + Math.cos(angle) * dist);
          const sz = Math.floor(this.player.position.z + Math.sin(angle) * dist);
          const sy = this.world.getTopSolidY(sx, sz);
          if (sy >= 62) {
            const types: ('sheep' | 'cow' | 'pig')[] = ['sheep', 'cow', 'pig'];
            const t = types[Math.floor(Math.random() * types.length)];
            this.entityRenderer.spawnMob(`${t}_${Date.now()}`, t, sx, sy, sz);
          }
        }
      }

      this.player.update(dt, controlsActive);
      if (controlsActive) {
        this.updateMining(dt);
      } else {
        this.player.resetMining();
      }

      this.updateDayNightCycle(dt);

      this.ambientTickTimer += dt;
      if (this.ambientTickTimer >= 0.18) {
        this.ambientTickTimer = 0;
        this.world.tickAmbientParticles(
          this.player.position.x,
          this.player.position.y,
          this.player.position.z
        );
      }

      this.particleSystem.update(dt);
      this.entityRenderer.update(
        dt,
        (x, z) => this.world.getTopSolidY(x, z),
        this.player.position,
        (itemId, count) => {
          if (this.player.health <= 0 || this.ui.state === 'GAME_OVER') {
            return false;
          }
          const added = this.inventory.addItem(itemId, count);
          if (added) {
            AudioEngine.play('entity.item.pickup', 0.55);
            this.ui.updateHUDOnly();
            this.ui.saveActiveWorldState();
          }
          return added;
        },
        (bx, by, bz) => {
          const b = this.world.getBlock(bx, by, bz);
          return b !== 0 && Registries.getBlock(b).solid;
        },
        (dmg, mobType) => {
          this.player.applyDamage(dmg, mobType);
        },
        (bx, by, bz, numId, meta, blockId) => {
          this.world.setBlock(bx, by, bz, numId, meta);
          const sound = blockId === 'sand' ? 'block.sand.fall' : 'block.gravel.fall';
          AudioEngine.play(sound, 0.85);
          this.particleSystem.spawnBlockBreakBurst(
            bx,
            by,
            bz,
            blockId,
            blockId === 'sand' ? 0xe3d8a8 : 0x888484
          );
        }
      );

      const heldStack = this.inventory.getHeldStack();
      this.firstPersonHand.updateHeldItem(heldStack ? heldStack.item : null);
      const isMoving =
        controlsActive &&
        (this.player.keys.has('KeyW') ||
          this.player.keys.has('KeyS') ||
          this.player.keys.has('KeyA') ||
          this.player.keys.has('KeyD'));
      this.firstPersonHand.update(dt, isMoving, this.player.isSprinting);

      this.autoSaveTimer += dt;
      if (this.autoSaveTimer >= 3.0) {
        this.autoSaveTimer = 0;
        this.ui.saveActiveWorldState();
      }
    } else {
      this.player.resetMining();
      const heldStack = this.inventory.getHeldStack();
      this.firstPersonHand.updateHeldItem(heldStack ? heldStack.item : null);
    }

    this.renderer.render(this.scene, this.camera);
    this.firstPersonHand.render(this.renderer);
    this.ui.render(dt);
  }
}
