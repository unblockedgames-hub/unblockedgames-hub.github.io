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
      const opts = OptionsManager.current;
      const sens = (opts.mouseSensitivity || 0.5) * 0.0045;
      this.player.yaw -= e.movementX * sens;
      const pitchDelta = (opts.invertMouse ? -1 : 1) * e.movementY * sens;
      this.player.pitch = Math.max(
        -Math.PI / 2 + 0.01,
        Math.min(Math.PI / 2 - 0.01, this.player.pitch - pitchDelta)
      );
    });

    window.addEventListener('keydown', (e) => {
      if (this.ui.state === 'CHAT') return;
      const kb = OptionsManager.current.keyBinds;

      if (e.code === (kb?.debugOverlay || 'F3')) {
        e.preventDefault();
        this.ui.showDebugF3 = !this.ui.showDebugF3;
        return;
      }

      if (e.code === (kb?.fullscreen || 'F11')) {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
          OptionsManager.current.fullscreen = true;
        } else {
          document.exitFullscreen?.().catch(() => {});
          OptionsManager.current.fullscreen = false;
        }
        OptionsManager.save();
        return;
      }

      if (e.code === (kb?.togglePerspective || 'F5') && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        this.player.perspective = ((this.player.perspective + 1) % 3) as (0 | 1 | 2);
        return;
      }

      if (e.code === (kb?.playerlist || 'Tab') && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        this.ui.showPlayerList = true;
        return;
      }

      // Keyboard keybind support for Attack / Destroy
      if (kb?.attack && e.code === kb.attack && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        this.player.triggerSwing();
        this.firstPersonHand.triggerSwing();
        this.player.isMining = true;
        if (this.player.gameMode === 'creative') {
          this.completeBlockBreak();
          this.player.creativeBreakCooldown = 0.22;
        }
        return;
      }

      // Keyboard keybind support for Use Item / Place Block
      if (kb?.use && e.code === kb.use && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        const held = this.inventory.getHeldStack();
        const offhand = this.inventory.offhandSlot;
        if (held && held.item.shortId === 'bow') {
          const hasArrow =
            this.inventory.countItem('arrow') > 0 || this.player.gameMode === 'creative';
          if (hasArrow) {
            this.player.isPullingBow = true;
            this.player.bowPullTime = 0.0;
            return;
          }
        } else if (held?.item.shortId === 'shield' || offhand?.item.shortId === 'shield') {
          this.player.isBlocking = true;
          return;
        }
        this.handleRightClickInteractOrPlace();
        return;
      }

      // Keyboard keybind support for Pick Block
      if (kb?.pickItem && e.code === kb.pickItem && this.ui.state === 'IN_GAME') {
        e.preventDefault();
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
        return;
      }

      if (e.code === (kb?.inventory || 'KeyE')) {
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

      if (e.code === (kb?.swapOffhand || 'KeyF') && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        const mainIdx = this.inventory.selectedHotbarSlot;
        const mainStack = this.inventory.slots[mainIdx];
        const offStack = this.inventory.offhandSlot;
        this.inventory.slots[mainIdx] = offStack;
        this.inventory.offhandSlot = mainStack;
        AudioEngine.play('item.armor.equip_generic', 0.6);
        this.ui.updateHUDOnly();
        return;
      }

      if (e.code === (kb?.advancements || 'KeyL') && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        this.player.isMining = false;
        this.player.resetMining();
        this.ui.setState('ADVANCEMENTS');
        return;
      }

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

      // Use Item / Place Block keyboard keybind
      const useKey = kb?.use || 'Mouse2';
      if (e.code === useKey && this.ui.state === 'IN_GAME') {
        e.preventDefault();
        this.handleRightClickInteractOrPlace();
        return;
      }

      const chatKey = kb?.chat || 'KeyT';
      const cmdKey = kb?.command || 'Slash';
      if (
        (e.code === chatKey || e.code === cmdKey) &&
        this.ui.state === 'IN_GAME'
      ) {
        e.preventDefault();
        this.player.isMining = false;
        this.player.resetMining();
        if (e.code === cmdKey) {
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

      // Hotbar keys
      const hotbarMap = [
        kb?.hotbar1 || 'Digit1',
        kb?.hotbar2 || 'Digit2',
        kb?.hotbar3 || 'Digit3',
        kb?.hotbar4 || 'Digit4',
        kb?.hotbar5 || 'Digit5',
        kb?.hotbar6 || 'Digit6',
        kb?.hotbar7 || 'Digit7',
        kb?.hotbar8 || 'Digit8',
        kb?.hotbar9 || 'Digit9',
      ];
      const hbIdx = hotbarMap.indexOf(e.code);
      if (hbIdx !== -1 && this.ui.state === 'IN_GAME') {
        this.inventory.selectedHotbarSlot = hbIdx;
        this.ui.updateHUDOnly();
        return;
      }

      // Double-tap Forward key to Sprint!
      const fwdKey = kb?.forward || 'KeyW';
      if (e.code === fwdKey && !e.repeat && this.ui.state === 'IN_GAME') {
        const now = performance.now();
        if (now - this.player.lastWPress < 280) {
          this.player.isSprinting = true;
        }
        this.player.lastWPress = now;
      }

      // Double-tap Jump key to toggle flying in Creative mode
      const jmpKey = kb?.jump || 'Space';
      if (e.code === jmpKey && !e.repeat && this.ui.state === 'IN_GAME') {
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
      const kb = OptionsManager.current.keyBinds;
      const plistKey = kb?.playerlist || 'Tab';
      if (e.code === plistKey) {
        this.ui.showPlayerList = false;
      }
      if (kb?.attack && e.code === kb.attack) {
        this.player.isMining = false;
        this.player.resetMining();
      }
      if (kb?.use && e.code === kb.use) {
        if (this.player.isBlocking) {
          this.player.isBlocking = false;
        }
        if (this.player.isPullingBow) {
          const pull = Math.min(1.0, this.player.bowPullTime);
          this.player.isPullingBow = false;
          this.player.bowPullTime = 0;
          if (pull >= 0.1) {
            this.shootBow(pull);
          }
        }
      }
    });

    window.addEventListener('blur', () => {
      this.player.keys.clear();
      this.ui.showPlayerList = false;
      this.player.isMining = false;
      this.player.resetMining();
      if (this.ui.state === 'IN_GAME') {
        this.ui.setState('PAUSE');
      }
    });

    let wheelAccumulator = 0;
    window.addEventListener('wheel', (e) => {
      if (this.ui.state !== 'IN_GAME') return;
      const opts = OptionsManager.current;
      const sens = opts.mouseWheelSensitivity || 1.0;
      if (opts.discreteMouseScroll) {
        const dir = e.deltaY > 0 ? 1 : -1;
        this.inventory.selectedHotbarSlot = (this.inventory.selectedHotbarSlot + dir + 9) % 9;
      } else {
        wheelAccumulator += e.deltaY * sens;
        if (Math.abs(wheelAccumulator) >= 60) {
          const dir = wheelAccumulator > 0 ? 1 : -1;
          this.inventory.selectedHotbarSlot = (this.inventory.selectedHotbarSlot + dir + 9) % 9;
          wheelAccumulator = 0;
        }
      }
      this.ui.updateHUDOnly();
    });

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.canvas.addEventListener('mousedown', (e) => {
      if (this.ui.state !== 'IN_GAME') return;
      if (document.pointerLockElement !== this.canvas) {
        this.canvas.requestPointerLock?.();
        return;
      }

      const kb = OptionsManager.current.keyBinds;
      const isAttackMatch = kb?.attack
        ? kb.attack === `Mouse${e.button}`
        : e.button === 0;
      const isUseMatch = kb?.use
        ? kb.use === `Mouse${e.button}`
        : e.button === 2;
      const isPickMatch = kb?.pickItem
        ? kb.pickItem === `Mouse${e.button}`
        : e.button === 1;

      if (isAttackMatch) {
        this.player.triggerSwing();
        this.firstPersonHand.triggerSwing();

        // 1. Check if attacking a Mob Entity in front of the player (3.5m reach)
        const lookDir = new THREE.Vector3();
        this.camera.getWorldDirection(lookDir);
        const mobHit = this.entityRenderer.raycastMob(
          this.camera.position,
          lookDir,
          3.5
        );
        const blockDist = this.player.currentHit
          ? Math.hypot(
              this.player.currentHit.bx + 0.5 - this.camera.position.x,
              this.player.currentHit.by + 0.5 - this.camera.position.y,
              this.player.currentHit.bz + 0.5 - this.camera.position.z
            )
          : Infinity;

        if (mobHit && mobHit.distance <= blockDist + 0.35) {
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
            if (this.player.gameMode === 'survival') {
              this.inventory.damageHeldItem(1);
            }
            const hurtSound =
              mobHit.mob.type === 'cow'
                ? 'entity.cow.hurt'
                : mobHit.mob.type === 'pig'
                ? 'entity.pig.hurt'
                : mobHit.mob.type === 'sheep'
                ? 'entity.sheep.hurt'
                : mobHit.mob.type === 'zombie'
                ? 'entity.zombie.hurt'
                : mobHit.mob.type === 'skeleton'
                ? 'entity.skeleton.hurt'
                : mobHit.mob.type === 'spider'
                ? 'entity.spider.hurt'
                : mobHit.mob.type === 'creeper'
                ? 'entity.creeper.hurt'
                : 'entity.player.hurt';
            AudioEngine.play(hurtSound, 0.85);
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
            if (res.killed) {
              this.player.addExperience(
                mobHit.mob.type === 'zombie' ||
                mobHit.mob.type === 'skeleton' ||
                mobHit.mob.type === 'spider' ||
                mobHit.mob.type === 'creeper'
                  ? 5
                  : 2
              );
              if (mobHit.mob.type === 'zombie') {
                this.ui.unlockAdvancement('monster_hunter');
              }
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
      } else if (isUseMatch) {
        const held = this.inventory.getHeldStack();
        const offhand = this.inventory.offhandSlot;
        if (held && held.item.shortId === 'bow') {
          const hasArrow =
            this.inventory.countItem('arrow') > 0 || this.player.gameMode === 'creative';
          if (hasArrow) {
            this.player.isPullingBow = true;
            this.player.bowPullTime = 0.0;
            return;
          }
        } else if (held?.item.shortId === 'shield' || offhand?.item.shortId === 'shield') {
          this.player.isBlocking = true;
          return;
        }
        this.handleRightClickInteractOrPlace();
      } else if (isPickMatch) {
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
      const kb = OptionsManager.current.keyBinds;
      const isAttackMatch = kb?.attack
        ? kb.attack === `Mouse${e.button}`
        : e.button === 0;
      if (isAttackMatch) {
        this.player.isMining = false;
        this.player.resetMining();
      }
      const isUseMatch = kb?.use ? kb.use === `Mouse${e.button}` : e.button === 2;
      if (isUseMatch) {
        if (this.player.isBlocking) {
          this.player.isBlocking = false;
        }
        if (this.player.isPullingBow) {
          const pull = Math.min(1.0, this.player.bowPullTime);
          this.player.isPullingBow = false;
          this.player.bowPullTime = 0;
          if (pull >= 0.1) {
            this.shootBow(pull);
          }
        }
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

    // If breaking a 2-block door, remove both bottom and top halves
    if (blockDef.shape === 'door_bottom' || blockDef.shape === 'door_top' || blockDef.shape === 'door' || blockDef.shortId.endsWith('_door')) {
      const curMeta = this.world.getMeta(hit.bx, hit.by, hit.bz);
      const isTop = (curMeta & 4) !== 0;
      const otherY = isTop ? hit.by - 1 : hit.by + 1;
      const otherBlock = this.world.getBlock(hit.bx, otherY, hit.bz);
      if (otherBlock === hit.blockNumId) {
        this.world.setBlock(hit.bx, otherY, hit.bz, 0);
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
      const tool = held?.item;
      const toolType = tool?.toolType;
      const toolSpeed = tool?.toolSpeed || 1; // 2=wood, 4=stone, 6=iron, 8=diamond, 9=netherite, 12=gold

      // Harvest level checks
      let canHarvest = true;
      const id = blockDef.shortId;
      if (id.includes('diamond_ore') || id.includes('gold_ore') || id.includes('redstone_ore') || id.includes('emerald_ore')) {
        canHarvest = toolType === 'pickaxe' && toolSpeed >= 6; // Iron+ pickaxe
      } else if (id.includes('iron_ore') || id.includes('lapis_ore') || id.includes('copper_ore')) {
        canHarvest = toolType === 'pickaxe' && toolSpeed >= 4; // Stone+ pickaxe
      } else if (id === 'obsidian' || id === 'crying_obsidian') {
        canHarvest = toolType === 'pickaxe' && toolSpeed >= 8; // Diamond+ pickaxe
      } else if (blockDef.soundGroup === 'stone') {
        canHarvest = toolType === 'pickaxe' && toolSpeed >= 2; // Wood+ pickaxe
      }

      if (canHarvest && id !== 'short_grass' && id !== 'leaf_litter' && id !== 'nether_portal') {
        let dropId = id;
        let dropCount = 1;

        if (id === 'stone') dropId = 'cobblestone';
        else if (id === 'deepslate') dropId = 'cobbled_deepslate';
        else if (id === 'grass_block' || id === 'podzol' || id.includes('dirt_path') || id === 'farmland') dropId = 'dirt';
        else if (id === 'coal_ore' || id === 'deepslate_coal_ore') dropId = 'coal';
        else if (id === 'diamond_ore' || id === 'deepslate_diamond_ore') dropId = 'diamond';
        else if (id === 'iron_ore' || id === 'deepslate_iron_ore') dropId = 'raw_iron';
        else if (id === 'copper_ore' || id === 'deepslate_copper_ore') {
          dropId = 'raw_copper';
          dropCount = 2 + Math.floor(Math.random() * 4); // 2..5
        } else if (id === 'gold_ore' || id === 'deepslate_gold_ore') dropId = 'raw_gold';
        else if (id === 'redstone_ore' || id === 'deepslate_redstone_ore') {
          dropId = 'redstone';
          dropCount = 4 + Math.floor(Math.random() * 2); // 4..5
        } else if (id === 'lapis_ore' || id === 'deepslate_lapis_ore') {
          dropId = 'lapis_lazuli';
          dropCount = 4 + Math.floor(Math.random() * 6); // 4..9
        } else if (id === 'emerald_ore' || id === 'deepslate_emerald_ore') dropId = 'emerald';
        else if (id === 'nether_gold_ore') {
          dropId = 'gold_nugget';
          dropCount = 2 + Math.floor(Math.random() * 5); // 2..6
        } else if (id === 'nether_quartz_ore') dropId = 'quartz';
        else if (id === 'glowstone') {
          dropId = 'glowstone_dust';
          dropCount = 2 + Math.floor(Math.random() * 3); // 2..4
        } else if (id === 'clay') {
          dropId = 'clay_ball';
          dropCount = 4;
        } else if (id === 'gravel') {
          dropId = Math.random() < 0.1 ? 'flint' : 'gravel';
        } else if (id === 'straw_bed_head') dropId = 'straw_bed';
        else if (id.endsWith('_door')) dropId = id;
        else if (id === 'glass' || id.endsWith('_glass') || id === 'glass_pane' || id.endsWith('_glass_pane')) {
          dropId = ''; // Glass drops nothing without silk touch
        } else if (id.includes('leaves')) {
          const roll = Math.random();
          if (roll < 0.05) dropId = 'oak_sapling';
          else if (roll < 0.07 && (id.includes('oak') || id.includes('dark_oak'))) dropId = 'apple';
          else if (roll < 0.28) dropId = 'stick';
          else dropId = '';
        }

        if (dropId) {
          this.entityRenderer.spawnDroppedItem(hit.bx, hit.by, hit.bz, dropId, dropCount);
        }

        // Damage tool durability in survival mode
        this.inventory.damageHeldItem(1);

        // Authentic XP award for mining ore blocks
        if (id === 'coal_ore' || id === 'deepslate_coal_ore') this.player.addExperience(1);
        else if (id === 'diamond_ore' || id === 'deepslate_diamond_ore') this.player.addExperience(5);
        else if (id === 'emerald_ore' || id === 'deepslate_emerald_ore') this.player.addExperience(5);
        else if (id === 'lapis_ore' || id === 'deepslate_lapis_ore') this.player.addExperience(3);
        else if (id === 'redstone_ore' || id === 'deepslate_redstone_ore') this.player.addExperience(3);
        else if (id === 'nether_quartz_ore') this.player.addExperience(3);
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

  private shootBow(pull: number) {
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    const speed = pull * 45;
    const isCrit = pull >= 0.95;
    const damage = Math.ceil(pull * 9) + (isCrit ? Math.floor(Math.random() * 3 + 1) : 0);
    this.entityRenderer.spawnArrow(
      this.camera.position.x,
      this.camera.position.y - 0.1,
      this.camera.position.z,
      dir.x * speed,
      dir.y * speed,
      dir.z * speed,
      damage,
      isCrit
    );
    AudioEngine.play('entity.arrow.shoot', 0.95, 1.0 / (Math.random() * 0.4 + 1.2));
    if (this.player.gameMode === 'survival') {
      this.inventory.consumeItem('arrow', 1);
      this.inventory.damageHeldItem(1);
      this.ui.updateHUDOnly();
    }
  }

  private handleRightClickInteractOrPlace() {
    const held = this.inventory.getHeldStack();

    // Check right-clicking a mob within reach (Animal breeding / Villager trade)
    const lookDir = new THREE.Vector3();
    this.camera.getWorldDirection(lookDir);
    const mobHit = this.entityRenderer.raycastMob(this.camera.position, lookDir, 3.8);
    if (mobHit && !mobHit.mob.dead) {
      const mob = mobHit.mob;
      const hId = held?.item.shortId;
      const isCowOrSheep = (mob.type === 'cow' || mob.type === 'sheep') && hId === 'wheat';
      const isPig =
        mob.type === 'pig' &&
        (hId === 'carrot' || hId === 'potato' || hId === 'beetroot');
      if (
        (isCowOrSheep || isPig) &&
        !mob.isBaby &&
        (!mob.breedCooldown || mob.breedCooldown <= 0) &&
        (!mob.inLoveTimer || mob.inLoveTimer <= 0)
      ) {
        mob.inLoveTimer = 30;
        if (this.player.gameMode === 'survival') {
          this.inventory.consumeHeld(1);
        }
        AudioEngine.play('entity.generic.eat', 0.85);
        this.particleSystem.spawnHeartBurst(mob.x, mob.y + 0.8, mob.z);
        this.firstPersonHand.triggerSwing();
        this.player.triggerSwing();
        this.ui.updateHUDOnly();
        return;
      }
      if (mob.type === 'villager') {
        AudioEngine.play('entity.villager.trade', 0.85);
        this.firstPersonHand.triggerSwing();
        return;
      }
    }

    const FOOD_PROPERTIES: Record<string, { hunger: number; saturation: number }> = {
      apple: { hunger: 4, saturation: 2.4 },
      bread: { hunger: 5, saturation: 6.0 },
      cooked_beef: { hunger: 8, saturation: 12.8 },
      cooked_porkchop: { hunger: 8, saturation: 12.8 },
      cooked_mutton: { hunger: 6, saturation: 9.6 },
      beef: { hunger: 3, saturation: 1.8 },
      raw_beef: { hunger: 3, saturation: 1.8 },
      porkchop: { hunger: 3, saturation: 1.8 },
      raw_porkchop: { hunger: 3, saturation: 1.8 },
      mutton: { hunger: 2, saturation: 1.2 },
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

    // Trapdoor Interaction (Toggle open/close)
    if (targetDef.shape === 'trapdoor' || targetDef.shortId.endsWith('_trapdoor')) {
      const curMeta = this.world.getMeta(hit.bx, hit.by, hit.bz);
      const newMeta = curMeta ^ 8;
      this.world.setBlock(hit.bx, hit.by, hit.bz, hit.blockNumId, newMeta);
      const open = (newMeta & 8) !== 0;
      AudioEngine.play(open ? 'block.wooden_trapdoor.open' : 'block.wooden_trapdoor.close', 0.85);
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      this.player.updateRaycast();
      return;
    }

    // Door Interaction (Toggle open/close on both halves)
    if (targetDef.shape === 'door_bottom' || targetDef.shape === 'door_top' || targetDef.shape === 'door' || targetDef.shortId.endsWith('_door')) {
      const curMeta = this.world.getMeta(hit.bx, hit.by, hit.bz);
      const isTop = (curMeta & 4) !== 0;
      const otherY = isTop ? hit.by - 1 : hit.by + 1;
      const otherBlock = this.world.getBlock(hit.bx, otherY, hit.bz);
      const newMeta = curMeta ^ 8;
      this.world.setBlock(hit.bx, hit.by, hit.bz, hit.blockNumId, newMeta);
      if (otherBlock === hit.blockNumId) {
        const otherMeta = this.world.getMeta(hit.bx, otherY, hit.bz);
        this.world.setBlock(hit.bx, otherY, hit.bz, otherBlock, otherMeta ^ 8);
      }
      const open = (newMeta & 8) !== 0;
      AudioEngine.play(open ? 'block.wooden_door.open' : 'block.wooden_door.close', 0.85);
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      this.player.updateRaycast();
      return;
    }

    // Fence Gate Interaction (Toggle open/close)
    if (targetDef.shape === 'fence_gate' || targetDef.shortId.endsWith('_fence_gate')) {
      const curMeta = this.world.getMeta(hit.bx, hit.by, hit.bz);
      const newMeta = curMeta ^ 8;
      this.world.setBlock(hit.bx, hit.by, hit.bz, hit.blockNumId, newMeta);
      const open = (newMeta & 8) !== 0;
      AudioEngine.play(open ? 'block.fence_gate.open' : 'block.fence_gate.close', 0.85);
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      this.player.updateRaycast();
      return;
    }

    // Bucket Fill (Water or Lava)
    if (held && held.item.shortId === 'bucket') {
      if (targetDef.fluid === 'water' || targetDef.shortId === 'water') {
        this.world.setBlock(hit.bx, hit.by, hit.bz, 0);
        AudioEngine.play('item.bucket.fill', 0.9);
        this.player.triggerSwing();
        this.firstPersonHand.triggerSwing();
        if (this.player.gameMode === 'survival') {
          this.inventory.consumeHeld(1);
          this.inventory.addItem('water_bucket', 1);
        }
        return;
      }
      if (targetDef.fluid === 'lava' || targetDef.shortId === 'lava') {
        this.world.setBlock(hit.bx, hit.by, hit.bz, 0);
        AudioEngine.play('item.bucket.fill_lava', 0.9);
        this.player.triggerSwing();
        this.firstPersonHand.triggerSwing();
        if (this.player.gameMode === 'survival') {
          this.inventory.consumeHeld(1);
          this.inventory.addItem('lava_bucket', 1);
        }
        return;
      }
    }

    // Flint and Steel Usage (Ignite Nether Portal)
    if (held && held.item.shortId === 'flint_and_steel') {
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      AudioEngine.play('item.flintandsteel.use', 0.9);
      if (this.tryIgniteNetherPortal(hit.bx, hit.by, hit.bz, hit.nx, hit.ny, hit.nz)) {
        return;
      }
      return;
    }

    // 2. Check if Right-Clicking Bed / Straw Bed
    if (
      targetDef.shortId === 'straw_bed' ||
      targetDef.shortId === 'straw_bed_head' ||
      targetDef.shortId.endsWith('_bed')
    ) {
      if (this.world.dimension === 'nether') {
        // Authentic Nether Bed explosion!
        AudioEngine.play('entity.generic.explode', 1.0);
        this.world.setBlock(hit.bx, hit.by, hit.bz, 0);
        for (let ox = -2; ox <= 2; ox++) {
          for (let oy = -2; oy <= 2; oy++) {
            for (let oz = -2; oz <= 2; oz++) {
              if (ox * ox + oy * oy + oz * oz <= 5) {
                const b = this.world.getBlock(hit.bx + ox, hit.by + oy, hit.bz + oz);
                if (b !== Registries.getBlock('bedrock').numId) {
                  this.world.setBlock(hit.bx + ox, hit.by + oy, hit.bz + oz, 0);
                }
              }
            }
          }
        }
        for (let i = 0; i < 20; i++) {
          this.particleSystem.spawnBlockBreakBurst(hit.bx, hit.by, hit.bz, 'netherrack', 0x771111);
        }
        this.player.applyDamage(16, 'explosion');
        return;
      }
      AudioEngine.playBlockSound('straw_bed', 'place');
      this.world.timeOfDay = 1000;
      if (targetDef.shortId.includes('straw')) {
        this.world.setBlock(hit.bx, hit.by, hit.bz, 0);
        this.ui.addChatMessage('§6[Straw Bed] §eThe straw bed crumbled after your rest!');
      }
      this.ui.unlockAdvancement('straw_dreams');
      this.ui.showToast(
        'Sweet Wilderness Dreams!',
        'Rested on a Bed',
        'straw_bed'
      );
      this.ui.addChatMessage(
        '§6[Bed] §aRespawn point set & morning has arrived.'
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

    // Water Bucket Usage
    if (held.item.shortId === 'water_bucket') {
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      if (this.world.dimension === 'nether') {
        AudioEngine.play('block.fire.extinguish', 0.9);
        for (let i = 0; i < 8; i++) {
          this.world.particleSystem.spawnCampfireSmoke(placeX, placeY, placeZ);
        }
      } else {
        const waterId = Registries.getBlock('water').numId;
        this.world.setBlock(placeX, placeY, placeZ, waterId);
        AudioEngine.play('item.bucket.empty', 0.9);
      }
      if (this.player.gameMode === 'survival') {
        this.inventory.consumeHeld(1);
        this.inventory.addItem('bucket', 1);
      }
      this.ui.updateHUDOnly();
      return;
    }

    // Lava Bucket Usage
    if (held.item.shortId === 'lava_bucket') {
      this.player.triggerSwing();
      this.firstPersonHand.triggerSwing();
      const lavaId = Registries.getBlock('lava')?.numId || Registries.getBlock('water').numId;
      this.world.setBlock(placeX, placeY, placeZ, lavaId);
      AudioEngine.play('item.bucket.empty_lava', 0.9);
      if (this.player.gameMode === 'survival') {
        this.inventory.consumeHeld(1);
        this.inventory.addItem('bucket', 1);
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
      } else if (placeDef.shape === 'stairs') {
        const yawDeg = (((this.player.yaw * 180) / Math.PI) % 360 + 360) % 360;
        let stairFacing = 0; // 0=North, 1=East, 2=South, 3=West
        if (yawDeg >= 45 && yawDeg < 135) stairFacing = 1;
        else if (yawDeg >= 135 && yawDeg < 225) stairFacing = 2;
        else if (yawDeg >= 225 && yawDeg < 315) stairFacing = 3;
        const isUpsideDown = hit.ny === -1;
        facingMeta = stairFacing | (isUpsideDown ? 4 : 0);
      } else if (placeDef.shape === 'trapdoor') {
        const yawDeg = (((this.player.yaw * 180) / Math.PI) % 360 + 360) % 360;
        let tdFacing = 0;
        if (yawDeg >= 45 && yawDeg < 135) tdFacing = 1;
        else if (yawDeg >= 135 && yawDeg < 225) tdFacing = 2;
        else if (yawDeg >= 225 && yawDeg < 315) tdFacing = 3;
        const isTop = hit.ny === -1;
        facingMeta = tdFacing | (isTop ? 4 : 0);
      }

      if (placeDef.shortId.endsWith('_door')) {
        const yawDeg = (((this.player.yaw * 180) / Math.PI) % 360 + 360) % 360;
        let doorFacing = 0;
        if (yawDeg >= 45 && yawDeg < 135) doorFacing = 1;
        else if (yawDeg >= 135 && yawDeg < 225) doorFacing = 2;
        else if (yawDeg >= 225 && yawDeg < 315) doorFacing = 3;
        this.world.setBlock(placeX, placeY, placeZ, held.item.blockNumId, doorFacing);
        this.world.setBlock(placeX, placeY + 1, placeZ, held.item.blockNumId, doorFacing | 4);
        AudioEngine.play('block.wooden_door.open', 0.85);
        this.player.triggerSwing();
        this.firstPersonHand.triggerSwing();
        if (this.player.gameMode === 'survival') {
          this.inventory.consumeHeld(1);
        }
        this.ui.updateHUDOnly();
        return;
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
      this.world.checkFluidContact(placeX, placeY, placeZ);
      this.world.checkRedstone(placeX, placeY, placeZ, (tx, ty, tz) => {
        AudioEngine.play('entity.creeper.primed', 1.0);
        setTimeout(() => {
          AudioEngine.play('entity.generic.explode', 1.0);
          this.particleSystem.spawnDeathPoof(tx, ty, tz);
          for (let ex = -3; ex <= 3; ex++) {
            for (let ey = -3; ey <= 3; ey++) {
              for (let ez = -3; ez <= 3; ez++) {
                if (ex * ex + ey * ey + ez * ez <= 9) {
                  const b = this.world.getBlock(
                    Math.floor(tx + ex),
                    Math.floor(ty + ey),
                    Math.floor(tz + ez)
                  );
                  const bDef = Registries.getBlock(b);
                  if (bDef && bDef.hardness >= 0 && bDef.shortId !== 'bedrock') {
                    this.world.setBlock(
                      Math.floor(tx + ex),
                      Math.floor(ty + ey),
                      Math.floor(tz + ez),
                      0
                    );
                  }
                }
              }
            }
          }
        }, 3000);
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

  private tryIgniteNetherPortal(bx: number, by: number, bz: number, nx: number, ny: number, nz: number): boolean {
    const obsidianId = Registries.getBlock('obsidian')?.numId;
    const portalId = Registries.getBlock('nether_portal')?.numId;
    if (!obsidianId || !portalId) return false;

    let startX = bx + nx;
    let startY = by + ny;
    let startZ = bz + nz;
    if (this.world.getBlock(bx, by, bz) === obsidianId && ny === 1) {
      startX = bx;
      startY = by + 1;
      startZ = bz;
    }

    // Check both X-axis and Z-axis frames
    for (const axis of ['x', 'z'] as const) {
      const isX = axis === 'x';
      const currZ = startZ;
      const currX = startX;

      let floorY = -1;
      for (let y = startY; y >= Math.max(1, startY - 10); y--) {
        const b = this.world.getBlock(currX, y, currZ);
        if (b === obsidianId) {
          floorY = y;
          break;
        }
      }
      if (floorY === -1) continue;

      const innerBottomY = floorY + 1;
      let minPos = isX ? currX : currZ;
      let maxPos = isX ? currX : currZ;

      while (minPos > (isX ? currX : currZ) - 15) {
        const checkPos = minPos - 1;
        const b = isX
          ? this.world.getBlock(checkPos, innerBottomY, currZ)
          : this.world.getBlock(currX, innerBottomY, checkPos);
        if (b === obsidianId) break;
        minPos--;
      }
      while (maxPos < (isX ? currX : currZ) + 15) {
        const checkPos = maxPos + 1;
        const b = isX
          ? this.world.getBlock(checkPos, innerBottomY, currZ)
          : this.world.getBlock(currX, innerBottomY, checkPos);
        if (b === obsidianId) break;
        maxPos++;
      }

      const innerWidth = maxPos - minPos + 1;
      if (innerWidth < 2 || innerWidth > 21) continue;

      let topY = -1;
      for (let y = innerBottomY; y <= innerBottomY + 21; y++) {
        const b = isX
          ? this.world.getBlock(minPos, y, currZ)
          : this.world.getBlock(currX, y, minPos);
        if (b === obsidianId) {
          topY = y;
          break;
        }
      }
      if (topY === -1) continue;
      const innerHeight = topY - innerBottomY;
      if (innerHeight < 3 || innerHeight > 21) continue;

      let valid = true;
      for (let p = minPos; p <= maxPos; p++) {
        const bot = isX ? this.world.getBlock(p, floorY, currZ) : this.world.getBlock(currX, floorY, p);
        const top = isX ? this.world.getBlock(p, topY, currZ) : this.world.getBlock(currX, topY, p);
        if (bot !== obsidianId || top !== obsidianId) {
          valid = false;
          break;
        }
      }
      if (!valid) continue;

      for (let y = innerBottomY; y < topY; y++) {
        const left = isX ? this.world.getBlock(minPos - 1, y, currZ) : this.world.getBlock(currX, y, minPos - 1);
        const right = isX ? this.world.getBlock(maxPos + 1, y, currZ) : this.world.getBlock(currX, y, maxPos + 1);
        if (left !== obsidianId || right !== obsidianId) {
          valid = false;
          break;
        }
      }
      if (!valid) continue;

      const meta = isX ? 0 : 1;
      for (let p = minPos; p <= maxPos; p++) {
        for (let y = innerBottomY; y < topY; y++) {
          const px = isX ? p : currX;
          const pz = isX ? currZ : p;
          this.world.setBlock(px, y, pz, portalId, meta);
        }
      }
      AudioEngine.play('block.portal.trigger', 0.9);
      this.ui.unlockAdvancement('nether');
      this.ui.showToast('We Need to Go Deeper', 'Build a Nether Portal', 'obsidian');
      return true;
    }
    return false;
  }

  public teleportDimension(targetDimension: 'overworld' | 'nether') {
    if (this.world.dimension === targetDimension) return;
    const oldX = this.player.position.x;
    const oldZ = this.player.position.z;

    const newX = targetDimension === 'nether' ? Math.floor(oldX / 8) : Math.floor(oldX * 8);
    const newZ = targetDimension === 'nether' ? Math.floor(oldZ / 8) : Math.floor(oldZ * 8);

    this.world.switchDimension(targetDimension);
    this.world.updateChunksAroundPlayer(newX, newZ);

    let arrivalY = 64;
    if (targetDimension === 'nether') {
      for (let y = 40; y <= 85; y++) {
        if (this.world.getBlock(newX, y, newZ) === 0 && this.world.getBlock(newX, y + 1, newZ) === 0) {
          arrivalY = y;
          break;
        }
      }
    } else {
      arrivalY = Math.max(64, this.world.getTopSolidY(newX, newZ));
    }

    const obsidianId = Registries.getBlock('obsidian').numId;
    const portalId = Registries.getBlock('nether_portal').numId;
    const floorY = arrivalY - 1;
    for (let x = -1; x <= 2; x++) {
      this.world.setBlock(newX + x, floorY, newZ, obsidianId);
      this.world.setBlock(newX + x, floorY + 4, newZ, obsidianId);
    }
    for (let y = 1; y <= 3; y++) {
      this.world.setBlock(newX - 1, floorY + y, newZ, obsidianId);
      this.world.setBlock(newX + 2, floorY + y, newZ, obsidianId);
      this.world.setBlock(newX, floorY + y, newZ, portalId, 0);
      this.world.setBlock(newX + 1, floorY + y, newZ, portalId, 0);
    }

    this.player.position.set(newX + 0.5, arrivalY, newZ + 0.5);
    this.player.velocity.set(0, 0, 0);
    this.player.portalTimer = 0;
    this.player.inPortal = false;

    if (targetDimension === 'nether') {
      this.skyColor.setRGB(0.2, 0.03, 0.03);
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.copy(this.skyColor);
        this.scene.fog.density = 0.035;
      }
      this.ui.addChatMessage('§cEntered The Nether dimension.');
      this.ui.unlockAdvancement('nether');
    } else {
      this.skyColor.setRGB(0.47, 0.65, 1.0);
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.copy(this.skyColor);
        this.scene.fog.density = 0.015;
      }
      this.ui.addChatMessage('§aReturned to the Overworld.');
    }

    AudioEngine.play('block.portal.travel', 0.9);
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
        this.ui.state === 'MOUSE_SETTINGS' ||
        this.ui.state === 'KEY_BINDS' ||
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

        // Peaceful difficulty: immediately purge all hostile mobs
        if (OptionsManager.current.difficulty === 'Peaceful') {
          for (const [id, m] of this.entityRenderer.mobs) {
            if (['zombie', 'skeleton', 'creeper', 'spider', 'enderman', 'slime'].includes(m.type)) {
              this.entityRenderer.scene.remove(m.mesh);
              this.entityRenderer.mobs.delete(id);
            }
          }
        }

        const isNight = this.world.timeOfDay >= 13000 && this.world.timeOfDay < 23000;
        let hostiles = 0;
        let passives = 0;
        for (const [, m] of this.entityRenderer.mobs) {
          if (['zombie', 'skeleton', 'creeper', 'spider', 'enderman', 'slime'].includes(m.type)) hostiles++;
          else if (['pig', 'cow', 'sheep'].includes(m.type)) passives++;
        }

        const px = Math.floor(this.player.position.x);
        const py = Math.floor(this.player.position.y);
        const pz = Math.floor(this.player.position.z);
        const hostilePool: ('zombie' | 'skeleton' | 'creeper' | 'spider' | 'enderman')[] = [
          'zombie',
          'skeleton',
          'creeper',
          'spider',
          'enderman',
        ];

        // Surface & Underground Cave Hostile Mob Spawning (Respects Vanilla 24-block exclusion sphere)
        const canSpawnHostile = OptionsManager.current.difficulty !== 'Peaceful' && hostiles < 16;
        if (canSpawnHostile) {
          // 1. Underground Cave Spawning (Day or Night): must have solid roof over head
          const angle = Math.random() * Math.PI * 2;
          const dist = 26 + Math.random() * 22;
          const cx = Math.floor(px + Math.cos(angle) * dist);
          const cz = Math.floor(pz + Math.sin(angle) * dist);
          const topSolidY = this.world.getTopSolidY(cx, cz);
          const startY = Math.min(topSolidY - 3, py + 12);
          const endY = Math.max(4, py - 16);

          if (startY > endY) {
            for (let testY = startY; testY >= endY; testY--) {
              const floor = this.world.getBlock(cx, testY - 1, cz);
              const cur = this.world.getBlock(cx, testY, cz);
              const ceil = this.world.getBlock(cx, testY + 1, cz);
              const floorDef = Registries.getBlock(floor);
              if (floor !== 0 && floorDef?.solid && !floorDef?.fluid && cur === 0 && ceil === 0) {
                const packCount = 1 + Math.floor(Math.random() * 2);
                for (let p = 0; p < packCount; p++) {
                  const ox = (Math.random() - 0.5) * 2;
                  const oz = (Math.random() - 0.5) * 2;
                  const chosen =
                    testY < 40 && Math.random() < 0.25
                      ? 'slime'
                      : hostilePool[Math.floor(Math.random() * hostilePool.length)];
                  this.entityRenderer.spawnMob(
                    `${chosen}_${Date.now()}_${p}`,
                    chosen,
                    cx + 0.5 + ox,
                    testY,
                    cz + 0.5 + oz
                  );
                }
                break;
              }
            }
          }

          // 2. Surface Night Spawning (Strictly ONLY at night, r >= 26 blocks)
          if (isNight) {
            const sAngle = Math.random() * Math.PI * 2;
            const sDist = 26 + Math.random() * 22;
            const sx = Math.floor(px + Math.cos(sAngle) * sDist);
            const sz = Math.floor(pz + Math.sin(sAngle) * sDist);
            const sy = this.world.getTopSolidY(sx, sz);
            if (sy >= 62) {
              const floor = this.world.getBlock(sx, sy - 1, sz);
              const cur = this.world.getBlock(sx, sy, sz);
              const ceil = this.world.getBlock(sx, sy + 1, sz);
              const floorDef = Registries.getBlock(floor);
              if (floor !== 0 && floorDef?.solid && !floorDef?.fluid && cur === 0 && ceil === 0) {
                const chosen = hostilePool[Math.floor(Math.random() * hostilePool.length)];
                this.entityRenderer.spawnMob(`${chosen}_${Date.now()}`, chosen, sx + 0.5, sy, sz + 0.5);
              }
            }
          }
        }

        // 3. Independent Daytime Passive Mob Spawning (Grass blocks, sky view, pack herds)
        if (!isNight && passives < 12) {
          const pAngle = Math.random() * Math.PI * 2;
          const pDist = 26 + Math.random() * 20;
          const sx = Math.floor(px + Math.cos(pAngle) * pDist);
          const sz = Math.floor(pz + Math.sin(pAngle) * pDist);
          const sy = this.world.getTopSolidY(sx, sz);
          if (sy >= 62) {
            const floor = this.world.getBlock(sx, sy - 1, sz);
            const cur = this.world.getBlock(sx, sy, sz);
            const ceil = this.world.getBlock(sx, sy + 1, sz);
            const floorDef = Registries.getBlock(floor);
            if (floorDef?.shortId === 'grass_block' && cur === 0 && ceil === 0) {
              const types: ('sheep' | 'cow' | 'pig')[] = ['sheep', 'cow', 'pig'];
              const t = types[Math.floor(Math.random() * types.length)];
              const packSize = 2 + Math.floor(Math.random() * 2);
              for (let p = 0; p < packSize; p++) {
                const ox = (Math.random() - 0.5) * 3;
                const oz = (Math.random() - 0.5) * 3;
                const pyPack = this.world.getTopSolidY(Math.floor(sx + ox), Math.floor(sz + oz));
                this.entityRenderer.spawnMob(
                  `${t}_${Date.now()}_${p}`,
                  t,
                  sx + 0.5 + ox,
                  pyPack,
                  sz + 0.5 + oz
                );
              }
            }
          }
        }
      }

      this.player.update(dt, controlsActive);

      // Check Nether Portal Automatic Teleportation Trigger
      if (this.player.inPortal && controlsActive) {
        if (this.player.portalTimer >= (this.player.gameMode === 'creative' ? 0.2 : 3.5)) {
          this.player.portalTimer = 0;
          this.teleportDimension(this.world.dimension === 'overworld' ? 'nether' : 'overworld');
        }
      }
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
      const curDaylight = this.sunLight.intensity / 0.95;
      const heldStack = this.inventory.getHeldStack();
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
          if (this.player.isBlocking) {
            AudioEngine.play('item.shield.block', 1.0);
            if (this.player.gameMode === 'survival') {
              this.inventory.damageHeldItem(1);
            }
            return;
          }
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
        },
        curDaylight,
        heldStack?.item.shortId,
        (bx, by, bz) => {
          this.particleSystem.spawnHeartBurst(bx, by, bz);
          this.player.addExperience(1 + Math.floor(Math.random() * 7));
        },
        this.camera.getWorldDirection(new THREE.Vector3())
      );

      if (this.player.isPullingBow) {
        this.player.bowPullTime += dt;
      }
      let textureOverride: string | undefined = undefined;
      if (heldStack?.item.shortId === 'bow' && this.player.isPullingBow) {
        if (this.player.bowPullTime >= 0.9) textureOverride = 'item/bow_pulling_2';
        else if (this.player.bowPullTime >= 0.65) textureOverride = 'item/bow_pulling_1';
        else textureOverride = 'item/bow_pulling_0';
      }
      this.firstPersonHand.updateHeldItem(heldStack ? heldStack.item : null, textureOverride);
      const kb = OptionsManager.current.keyBinds;
      const isMoving =
        controlsActive &&
        (this.player.keys.has(kb?.forward || 'KeyW') ||
          this.player.keys.has(kb?.back || 'KeyS') ||
          this.player.keys.has(kb?.left || 'KeyA') ||
          this.player.keys.has(kb?.right || 'KeyD') ||
          this.player.keys.has('KeyW') ||
          this.player.keys.has('KeyS') ||
          this.player.keys.has('KeyA') ||
          this.player.keys.has('KeyD'));
      this.firstPersonHand.update(
        dt,
        isMoving,
        this.player.isSprinting,
        this.player.isBlocking,
        this.player.isPullingBow,
        this.player.bowPullTime
      );

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
    if (this.player.perspective === 0) {
      this.firstPersonHand.render(this.renderer);
    }
    this.ui.render(dt);
  }
}
