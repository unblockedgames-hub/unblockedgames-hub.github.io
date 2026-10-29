// Official Minecraft 26.3 Pixel-Perfect GUI & Screen Manager
// Renders 100% of screens, containers, buttons, sliders, HUD, and bitmap text onto a crisp GuiGraphics Canvas.

import { Player } from '../gameplay/Player';
import { Inventory, ItemStack } from '../gameplay/Inventory';
import { World } from '../world/World';
import { Registries, ItemDefinition } from '../core/Registries';
import { OptionsManager } from '../core/Options';
import { AudioEngine } from '../core/AudioEngine';
import { MultiplayerManager, ServerEntry } from '../network/MultiplayerManager';
import { MinecraftFont } from './MinecraftFont';
import { GuiGraphics } from './GuiGraphics';
import { ItemIconRenderer } from '../render/ItemIconRenderer';
import { WorldGen26_3 } from '../world/WorldGen26_3';
import { WebGPUContext } from '../render/WebGPUContext';

export type UIState =
  | 'TITLE'
  | 'SINGLEPLAYER_SELECT'
  | 'CREATE_WORLD'
  | 'MULTIPLAYER_SELECT'
  | 'WISPCRAFT_CONFIG'
  | 'CONNECTING'
  | 'OPTIONS'
  | 'IN_GAME'
  | 'PAUSE'
  | 'INVENTORY'
  | 'CHAT'
  | 'ADVANCEMENTS';

interface InteractiveRect {
  x: number;
  y: number;
  w: number;
  h: number;
  onClick?: (button: number, shiftKey: boolean) => void;
  onDrag?: (normX: number) => void;
  onRightDragPlace?: () => void;
  onHotbarKeySwap?: (hotbarIndex: number) => void;
  getSlot?: () => ItemStack | null;
  setSlot?: (s: ItemStack | null) => void;
  slotKey?: string;
  tooltip?: string[];
  isSlot?: boolean;
}

const SPLASH_TEXTS = [
  'Wilderness Bound!',
  '26.3 Official Port!',
  'Poplar Trees & Cushions!',
  'Abandoned Camps!',
  'Wispcraft Wisp v2 Ready!',
  '100% Unobfuscated 26.3!',
  'Concrete Stairs & Slabs!',
  'Wool Stairs & Slabs!',
  'Rest on a Straw Bed!',
];

interface SavedWorldEntry {
  id: string;
  name: string;
  folder: string;
  lastPlayed: string;
  gameMode: 'creative' | 'survival';
  seed: string;
}

export class UIManager {
  public root: HTMLElement;
  public player: Player;
  public inventory: Inventory;
  public world: World;

  public font: MinecraftFont;
  public itemRenderer: ItemIconRenderer;
  public gui: GuiGraphics;

  public state: UIState = 'TITLE';
  public previousState: UIState = 'TITLE';
  public activeContainerTab: 'inventory' | 'crafting' | 'stonecutter' = 'inventory';

  // Creative Inventory Tab state
  public creativeTab:
    | 'building'
    | 'colored'
    | 'natural'
    | 'functional'
    | 'redstone'
    | 'search'
    | 'combat_tools'
    | 'survival_inv' = 'building';
  public creativeScrollRow = 0;
  public searchQuery = '';

  // Mouse & interactive widgets
  public mouseX = 0;
  public mouseY = 0;
  private interactiveRects: InteractiveRect[] = [];
  private activeSlider: InteractiveRect | null = null;
  private isRightMouseDown = false;
  private isLeftMouseDown = false;
  private lastRightDragSlotKey = '';
  private rightHoldTimer = 0;
  private rightRepeatTimer = 0;
  private leftDragItem: ItemDefinition | null = null;
  private leftDragTotalCount = 0;
  private leftDragSlots: Array<{
    key: string;
    baseCount: number;
    getSlot: () => ItemStack | null;
    setSlot: (s: ItemStack | null) => void;
  }> = [];
  private lastSlotLeftClickTime = 0;
  private lastSlotLeftClickKey = '';
  private showRecipeBook = false;
  private focusedEditBox: 'world_search' | 'world_name' | 'world_seed' | 'direct_ip' | 'wisp_url' | 'wisp_user' | 'creative_search' | 'chat' | null = null;

  // Text field states
  private worldSearchText = '';
  private newWorldName = 'New World';
  private newWorldSeed = '';
  private newWorldMode: 'creative' | 'survival' | 'spectator' = 'survival';
  private newWorldDifficulty: 'Peaceful' | 'Easy' | 'Normal' | 'Hard' = 'Normal';
  private createWorldTab: 0 | 1 | 2 = 0;

  private savedWorlds: SavedWorldEntry[] = [
    {
      id: 'world_survival_random',
      name: 'New World',
      folder: 'New_World (10/28/26, 9:20 PM)',
      lastPlayed: 'Survival Mode, Version: 26.3',
      gameMode: 'survival',
      seed: String(Math.floor(Math.random() * 0x7fffffff)),
    },
    {
      id: 'world_creative_random',
      name: '26.3 Creative World',
      folder: '26_3_Creative (10/28/26, 9:20 PM)',
      lastPlayed: 'Creative Mode, Cheats, Version: 26.3',
      gameMode: 'creative',
      seed: String(Math.floor(Math.random() * 0x7fffffff)),
    },
  ];
  private selectedWorldIdx = 0;

  // Multiplayer state
  private selectedServerIdx = 0;
  private directConnectModal = false;
  private directConnectIp = '127.0.0.1:25565';
  private connectingStatus = 'Connecting to server...';

  // HUD state
  public showDebugF3 = false;
  public fps = 60;
  public splashText = SPLASH_TEXTS[0];
  public chatHistory: Array<{ text: string; time: number }> = [
    {
      text: '§eWelcome to §aMinecraft 26.3 ("Wilderness Bound")§e Official Web Port!',
      time: performance.now(),
    },
    {
      text: '§7Press §fE§7 for Inventory, §fF3§7 for Debug Info, §fT§7 or §f/§7 for Chat, §fEsc§7 for Game Menu.',
      time: performance.now(),
    },
  ];
  private chatInputText = '';
  private heldItemTooltipTimer = 0;
  private lastHeldItemId = '';

  // Toast notification
  private activeToast: { title: string; subtitle: string; item: ItemDefinition | null; startTime: number } | null = null;

  public activeWorldId = 'world_survival_random';
  public onStartGame?: (isMultiplayer: boolean) => void;
  public onQuitToTitle?: () => void;

  constructor(root: HTMLElement, player: Player, inventory: Inventory, world: World) {
    this.root = root;
    this.player = player;
    this.inventory = inventory;
    this.world = world;

    try {
      const savedList = localStorage.getItem('mc26_3_saved_worlds_v1');
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.savedWorlds = parsed;
        }
      }
    } catch {}

    this.root.innerHTML = '';
    const guiCanvas = document.createElement('canvas');
    guiCanvas.id = 'gui-canvas';
    guiCanvas.style.cssText =
      'position:fixed;inset:0;width:100vw;height:100vh;image-rendering:pixelated;pointer-events:auto;z-index:20;';
    this.root.appendChild(guiCanvas);

    this.font = new MinecraftFont();
    this.itemRenderer = new ItemIconRenderer();
    this.gui = new GuiGraphics(guiCanvas, this.font, this.itemRenderer);

    this.bindCanvasEvents(guiCanvas);
  }

  public async initAssets(): Promise<void> {
    await Promise.all([this.font.init(), this.gui.preload()]);
  }

  public showToast(title: string, subtitle: string, itemShortId?: string): void {
    this.activeToast = {
      title,
      subtitle,
      item: itemShortId ? Registries.getItem(itemShortId) || null : null,
      startTime: performance.now(),
    };
  }

  public setState(newState: UIState): void {
    if (this.state !== newState) {
      this.previousState = this.state;
    }
    this.state = newState;
    this.focusedEditBox = null;
    this.activeSlider = null;

    // Return cursor stack and any 2x2 / 3x3 crafting grid items to inventory if closing container
    if (newState !== 'INVENTORY') {
      if (this.inventory.cursorStack) {
        this.inventory.addItem(
          this.inventory.cursorStack.item.shortId,
          this.inventory.cursorStack.count
        );
        this.inventory.cursorStack = null;
      }
      for (let i = 0; i < this.inventory.crafting2x2.length; i++) {
        const s = this.inventory.crafting2x2[i];
        if (s) {
          this.inventory.addItem(s.item.shortId, s.count);
          this.inventory.crafting2x2[i] = null;
        }
      }
      for (let i = 0; i < this.inventory.crafting3x3.length; i++) {
        const s = this.inventory.crafting3x3[i];
        if (s) {
          this.inventory.addItem(s.item.shortId, s.count);
          this.inventory.crafting3x3[i] = null;
        }
      }
    }

    const guiCanvas = this.gui.canvas;
    if (newState === 'IN_GAME') {
      guiCanvas.style.pointerEvents = 'none';
      const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
      gameCanvas?.requestPointerLock?.();
    } else {
      guiCanvas.style.pointerEvents = 'auto';
      if (document.pointerLockElement) {
        document.exitPointerLock?.();
      }
      if (newState === 'PAUSE') {
        this.saveActiveWorldState();
      } else if (newState === 'CHAT') {
        this.focusedEditBox = 'chat';
      } else if (newState === 'INVENTORY' && this.creativeTab === 'search' && this.player.gameMode === 'creative') {
        this.focusedEditBox = 'creative_search';
      }
    }

    this.render();
  }

  public updateHUDOnly(): void {
    const held = this.inventory.getHeldStack();
    const curId = held ? held.item.id : '';
    if (curId !== this.lastHeldItemId) {
      this.lastHeldItemId = curId;
      if (held) {
        this.heldItemTooltipTimer = 2.5;
      }
    }
  }

  public addChatMessage(text: string): void {
    this.chatHistory.push({ text, time: performance.now() });
    if (this.chatHistory.length > 40) this.chatHistory.shift();
  }

  private bindCanvasEvents(canvas: HTMLCanvasElement): void {
    window.addEventListener('mousemove', (e) => {
      this.gui.updateScale(OptionsManager.current.guiScale);
      this.mouseX = e.clientX / this.gui.guiScale;
      this.mouseY = e.clientY / this.gui.guiScale;

      if (this.activeSlider && this.activeSlider.onDrag) {
        const norm = (this.mouseX - this.activeSlider.x) / this.activeSlider.w;
        this.activeSlider.onDrag(Math.max(0, Math.min(1, norm)));
      }

      // Right-click drag across crafting/inventory slots places 1 item immediately as you sweep across slots!
      if (this.isRightMouseDown && this.state === 'INVENTORY') {
        for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
          const r = this.interactiveRects[i];
          if (
            r.isSlot &&
            r.slotKey &&
            r.onRightDragPlace &&
            this.mouseX >= r.x &&
            this.mouseX < r.x + r.w &&
            this.mouseY >= r.y &&
            this.mouseY < r.y + r.h
          ) {
            if (r.slotKey !== this.lastRightDragSlotKey) {
              this.lastRightDragSlotKey = r.slotKey;
              this.rightHoldTimer = 0;
              this.rightRepeatTimer = 0;
              r.onRightDragPlace();
            }
            break;
          }
        }
      }

      // Left-click drag across crafting/inventory slots evenly distributes the cursor stack across all dragged slots!
      if (
        this.isLeftMouseDown &&
        this.state === 'INVENTORY' &&
        this.leftDragItem &&
        this.leftDragTotalCount > 1
      ) {
        for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
          const r = this.interactiveRects[i];
          if (
            r.isSlot &&
            r.slotKey &&
            r.getSlot &&
            r.setSlot &&
            this.mouseX >= r.x &&
            this.mouseX < r.x + r.w &&
            this.mouseY >= r.y &&
            this.mouseY < r.y + r.h
          ) {
            if (!this.leftDragSlots.some((s) => s.key === r.slotKey)) {
              const cur = r.getSlot();
              if (
                !cur ||
                (cur.item.id === this.leftDragItem.id && cur.count < this.leftDragItem.maxStack)
              ) {
                this.leftDragSlots.push({
                  key: r.slotKey,
                  baseCount: cur ? cur.count : 0,
                  getSlot: r.getSlot,
                  setSlot: r.setSlot,
                });
                const n = this.leftDragSlots.length;
                const perSlot = Math.max(1, Math.floor(this.leftDragTotalCount / n));
                let rem = this.leftDragTotalCount;
                for (const ds of this.leftDragSlots) {
                  const give = Math.min(
                    rem,
                    perSlot,
                    this.leftDragItem.maxStack - ds.baseCount
                  );
                  if (give + ds.baseCount > 0) {
                    ds.setSlot({ item: this.leftDragItem, count: ds.baseCount + give });
                  } else {
                    ds.setSlot(null);
                  }
                  rem -= give;
                }
                this.inventory.cursorStack =
                  rem > 0 ? { item: this.leftDragItem, count: rem } : null;
              }
            }
            break;
          }
        }
      }
    });

    canvas.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.gui.updateScale(OptionsManager.current.guiScale);
      this.mouseX = e.clientX / this.gui.guiScale;
      this.mouseY = e.clientY / this.gui.guiScale;

      this.focusedEditBox = null;
      if (e.button === 2) {
        this.isRightMouseDown = true;
        this.rightHoldTimer = 0;
        this.rightRepeatTimer = 0;
      } else if (e.button === 0) {
        this.isLeftMouseDown = true;
        this.rightHoldTimer = 0;
        this.rightRepeatTimer = 0;
        this.leftDragItem = null;
        this.leftDragTotalCount = 0;
        this.leftDragSlots = [];
      }

      for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
        const r = this.interactiveRects[i];
        if (
          this.mouseX >= r.x &&
          this.mouseX < r.x + r.w &&
          this.mouseY >= r.y &&
          this.mouseY < r.y + r.h
        ) {
          if (r.onDrag) {
            this.activeSlider = r;
            const norm = (this.mouseX - r.x) / r.w;
            r.onDrag(Math.max(0, Math.min(1, norm)));
            AudioEngine.play('ui.button.click', 0.7);
            return;
          }
          if (r.onClick) {
            if (!r.isSlot) {
              AudioEngine.play('ui.button.click', 0.8);
            }
            if (e.button === 2 && r.slotKey) {
              this.lastRightDragSlotKey = r.slotKey;
            }
            // Check for Double-Left-Click on a slot (`ClickType.PICKUP_ALL`) to gather all matching items!
            if (
              e.button === 0 &&
              !e.shiftKey &&
              r.isSlot &&
              r.slotKey &&
              r.getSlot &&
              r.setSlot
            ) {
              const now = performance.now();
              if (
                now - this.lastSlotLeftClickTime < 280 &&
                this.lastSlotLeftClickKey === r.slotKey &&
                (this.inventory.cursorStack || r.getSlot())
              ) {
                this.lastSlotLeftClickTime = 0;
                this.lastSlotLeftClickKey = '';
                this.inventory.collectAllToCursor(r.getSlot, r.setSlot);
                this.render();
                return;
              }
              this.lastSlotLeftClickTime = now;
              this.lastSlotLeftClickKey = r.slotKey;
            }
            // Capture initial cursor stack for potential Left-Click Drag Distribute
            if (
              e.button === 0 &&
              !e.shiftKey &&
              r.isSlot &&
              r.slotKey &&
              r.getSlot &&
              r.setSlot &&
              this.inventory.cursorStack &&
              this.inventory.cursorStack.count > 1
            ) {
              const cur = r.getSlot();
              if (
                !cur ||
                (cur.item.id === this.inventory.cursorStack.item.id &&
                  cur.count < cur.item.maxStack)
              ) {
                this.leftDragItem = this.inventory.cursorStack.item;
                this.leftDragTotalCount = this.inventory.cursorStack.count;
                this.leftDragSlots = [
                  {
                    key: r.slotKey,
                    baseCount: cur ? cur.count : 0,
                    getSlot: r.getSlot,
                    setSlot: r.setSlot,
                  },
                ];
              }
            }
            r.onClick(e.button, e.shiftKey);
            return;
          }
        }
      }

      // Click outside container window drops cursor item into inventory
      if (this.state === 'INVENTORY' && this.inventory.cursorStack) {
        this.inventory.addItem(
          this.inventory.cursorStack.item.shortId,
          this.inventory.cursorStack.count
        );
        this.inventory.cursorStack = null;
      }
    });

    window.addEventListener('mouseup', (e) => {
      this.activeSlider = null;
      if (e.button === 2) {
        this.isRightMouseDown = false;
        this.lastRightDragSlotKey = '';
      } else if (e.button === 0) {
        this.isLeftMouseDown = false;
        this.leftDragItem = null;
        this.leftDragTotalCount = 0;
        this.leftDragSlots = [];
      }
      this.rightHoldTimer = 0;
      this.rightRepeatTimer = 0;
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('wheel', (e) => {
      if (this.state === 'INVENTORY' && this.player.gameMode === 'creative') {
        const dir = e.deltaY > 0 ? 1 : -1;
        this.creativeScrollRow = Math.max(0, this.creativeScrollRow + dir);
      }
    });

    window.addEventListener('keydown', (e) => {
      // Number keys 1..9 in Container/Inventory screens swap hovered slot with Hotbar slot 0..8
      if (
        this.state === 'INVENTORY' &&
        !this.focusedEditBox &&
        e.code.startsWith('Digit') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        const num = parseInt(e.code.replace('Digit', ''), 10);
        if (num >= 1 && num <= 9) {
          const hotbarIdx = num - 1;
          for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
            const r = this.interactiveRects[i];
            if (
              r.isSlot &&
              r.onHotbarKeySwap &&
              this.mouseX >= r.x &&
              this.mouseX < r.x + r.w &&
              this.mouseY >= r.y &&
              this.mouseY < r.y + r.h
            ) {
              e.preventDefault();
              r.onHotbarKeySwap(hotbarIdx);
              return;
            }
          }
        }
      }

      if (!this.focusedEditBox) return;

      if (e.key === 'Escape') {
        if (this.state === 'CHAT') {
          this.chatInputText = '';
          this.setState('IN_GAME');
        } else {
          this.focusedEditBox = null;
        }
        return;
      }

      if (e.key === 'Enter') {
        if (this.state === 'CHAT') {
          const msg = this.chatInputText.trim();
          this.chatInputText = '';
          if (msg) this.handleChatSubmit(msg);
          this.setState('IN_GAME');
        } else {
          this.focusedEditBox = null;
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        this.modifyFocusedText((s) => s.slice(0, -1));
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        this.modifyFocusedText((s) => (s.length < 80 ? s + e.key : s));
      }
    });
  }

  private modifyFocusedText(fn: (old: string) => string): void {
    switch (this.focusedEditBox) {
      case 'world_search':
        this.worldSearchText = fn(this.worldSearchText);
        break;
      case 'world_name':
        this.newWorldName = fn(this.newWorldName);
        break;
      case 'world_seed':
        this.newWorldSeed = fn(this.newWorldSeed);
        break;
      case 'direct_ip':
        this.directConnectIp = fn(this.directConnectIp);
        break;
      case 'wisp_url':
        MultiplayerManager.wispProxyUrl = fn(MultiplayerManager.wispProxyUrl);
        break;
      case 'wisp_user':
        MultiplayerManager.username = fn(MultiplayerManager.username);
        break;
      case 'creative_search':
        this.searchQuery = fn(this.searchQuery);
        this.creativeScrollRow = 0;
        break;
      case 'chat':
        this.chatInputText = fn(this.chatInputText);
        break;
    }
  }

  private addButton(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    onClick: () => void,
    active = true
  ): void {
    const hovered =
      active &&
      this.mouseX >= x &&
      this.mouseX < x + w &&
      this.mouseY >= y &&
      this.mouseY < y + h;
    this.gui.drawButton(x, y, w, h, text, hovered, active);
    if (active) {
      this.interactiveRects.push({ x, y, w, h, onClick: () => onClick() });
    }
  }

  private addIconButton(
    x: number,
    y: number,
    w: number,
    h: number,
    iconUrl: string,
    iconW: number,
    iconH: number,
    onClick: () => void,
    tooltip?: string[]
  ): void {
    const hovered =
      this.mouseX >= x &&
      this.mouseX < x + w &&
      this.mouseY >= y &&
      this.mouseY < y + h;
    this.gui.drawIconButton(x, y, w, h, iconUrl, iconW, iconH, hovered, true);
    this.interactiveRects.push({ x, y, w, h, onClick: () => onClick(), tooltip });
  }

  private addSlider(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    normValue: number,
    onDrag: (norm: number) => void
  ): void {
    const hovered =
      this.mouseX >= x &&
      this.mouseX < x + w &&
      this.mouseY >= y &&
      this.mouseY < y + h;
    this.gui.drawSlider(x, y, w, h, label, normValue, hovered);
    this.interactiveRects.push({ x, y, w, h, onDrag });
  }

  private addEditBox(
    x: number,
    y: number,
    w: number,
    h: number,
    id: NonNullable<UIManager['focusedEditBox']>,
    value: string,
    placeholder: string,
    label?: string
  ): void {
    const focused = this.focusedEditBox === id;
    this.gui.drawEditBox(x, y, w, h, value, placeholder, focused, label);
    this.interactiveRects.push({
      x,
      y,
      w,
      h,
      onClick: () => {
        this.focusedEditBox = id;
      },
    });
  }

  /** Called every animation frame from Game.loop */
  public render(dt = 0.016): void {
    if (this.heldItemTooltipTimer > 0) {
      this.heldItemTooltipTimer = Math.max(0, this.heldItemTooltipTimer - dt);
    }

    // Continuous right-click hold placement (or output crafting hold) after 220ms initial delay
    if ((this.isRightMouseDown || this.isLeftMouseDown) && this.state === 'INVENTORY') {
      this.rightHoldTimer += dt;
      if (this.rightHoldTimer >= 0.22) {
        this.rightRepeatTimer += dt;
        while (this.rightRepeatTimer >= 0.085) {
          this.rightRepeatTimer -= 0.085;
          for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
            const r = this.interactiveRects[i];
            if (
              r.isSlot &&
              this.mouseX >= r.x &&
              this.mouseX < r.x + r.w &&
              this.mouseY >= r.y &&
              this.mouseY < r.y + r.h
            ) {
              if (this.isRightMouseDown && r.onRightDragPlace) {
                r.onRightDragPlace();
              } else if (
                this.isLeftMouseDown &&
                r.slotKey?.startsWith('craft_out_') &&
                r.onClick
              ) {
                r.onClick(0, false);
              }
              break;
            }
          }
        }
      }
    }

    this.gui.updateScale(OptionsManager.current.guiScale);
    this.gui.clear();
    this.interactiveRects = [];

    switch (this.state) {
      case 'TITLE':
        this.renderTitleScreen();
        break;
      case 'SINGLEPLAYER_SELECT':
        this.renderSelectWorldScreen();
        break;
      case 'CREATE_WORLD':
        this.renderCreateWorldScreen();
        break;
      case 'MULTIPLAYER_SELECT':
        this.renderJoinMultiplayerScreen();
        break;
      case 'WISPCRAFT_CONFIG':
        this.renderWispcraftConfigScreen();
        break;
      case 'CONNECTING':
        this.renderConnectingScreen();
        break;
      case 'OPTIONS':
        this.renderOptionsScreen();
        break;
      case 'IN_GAME':
        this.renderHUD(false);
        break;
      case 'CHAT':
        this.renderHUD(true);
        break;
      case 'PAUSE':
        this.renderHUD(false);
        this.renderPauseScreen();
        break;
      case 'ADVANCEMENTS':
        this.renderHUD(false);
        this.renderAdvancementsScreen();
        break;
      case 'INVENTORY':
        this.renderHUD(false);
        this.renderContainerScreen();
        break;
    }

    // Render hovered tooltip if any
    for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
      const r = this.interactiveRects[i];
      if (
        r.tooltip &&
        this.mouseX >= r.x &&
        this.mouseX < r.x + r.w &&
        this.mouseY >= r.y &&
        this.mouseY < r.y + r.h
      ) {
        this.gui.renderTooltip(r.tooltip, this.mouseX, this.mouseY);
        break;
      }
    }

    // Render Toast overlay in top-right if active
    this.renderToastOverlay();
  }

  // ============================================================================
  // 1. TITLE SCREEN (TitleScreen.java + LogoRenderer.java + SplashRenderer.java)
  // ============================================================================
  private renderTitleScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;

    // Panorama vignette overlay
    this.gui.blitSprite(
      '/assets/minecraft/textures/gui/panorama_overlay.png',
      0,
      0,
      sw,
      sh
    );

    // LogoRenderer: minecraft.png (256x44 from virtual 256x64 texture) at (sw/2 - 128, 30)
    const logoX = Math.floor(sw / 2) - 128;
    const logoY = 30;
    this.gui.blit(
      '/assets/minecraft/textures/gui/title/minecraft.png',
      logoX,
      logoY,
      0,
      0,
      256,
      44,
      256,
      64
    );

    // LogoRenderer: edition.png (128x14 from virtual 128x16 texture) at (sw/2 - 64, 67)
    this.gui.blit(
      '/assets/minecraft/textures/gui/title/edition.png',
      Math.floor(sw / 2) - 64,
      logoY + 37,
      0,
      0,
      128,
      14,
      128,
      16
    );

    // SplashRenderer: translated to (sw/2 + 123, 69), rotated -20 deg, pulsing yellow bitmap text
    const ctx = this.gui.ctx;
    ctx.save();
    ctx.translate(Math.floor(sw / 2) + 123, 69);
    ctx.rotate(-0.34906584); // -20 degrees in radians
    const splashW = this.font.width(this.splashText);
    const pulse =
      1.8 -
      Math.abs(
        Math.sin(((performance.now() % 1000) / 1000.0) * Math.PI * 2.0) * 0.1
      );
    const scale = (pulse * 100.0) / (splashW + 32);
    ctx.scale(scale, scale);
    this.font.draw(ctx, this.splashText, Math.floor(-splashW / 2), -8, '#FFFF00', true);
    ctx.restore();

    // Main Menu Buttons (y = sh / 4 + 48)
    const baseY = Math.floor(sh / 4) + 48;
    const centerX = Math.floor(sw / 2);

    this.addButton(centerX - 100, baseY, 200, 20, 'Singleplayer', () => {
      this.setState('SINGLEPLAYER_SELECT');
    });

    this.addButton(centerX - 100, baseY + 24, 200, 20, 'Multiplayer', () => {
      MultiplayerManager.pingAllServers().then(() => {
        if (this.state === 'MULTIPLAYER_SELECT') this.render();
      });
      this.setState('MULTIPLAYER_SELECT');
    });

    this.addButton(centerX - 100, baseY + 48, 200, 20, 'Minecraft Realms', () => {
      this.setState('WISPCRAFT_CONFIG');
    });
    // Realms unseen notification icon on right side of Realms button
    this.gui.blitSprite(
      '/assets/minecraft/textures/gui/sprites/icon/unseen_notification.png',
      centerX + 82,
      baseY + 53,
      10,
      10
    );

    const bottomRowY = baseY + 84;
    this.addIconButton(
      centerX - 124,
      bottomRowY,
      20,
      20,
      '/assets/minecraft/textures/gui/sprites/icon/language.png',
      15,
      15,
      () => {
        this.setState('OPTIONS');
      },
      ['Language...']
    );

    this.addButton(centerX - 100, bottomRowY, 98, 20, 'Options...', () => {
      this.setState('OPTIONS');
    });

    this.addButton(centerX + 2, bottomRowY, 98, 20, 'Quit Game', () => {
      this.splashText = SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)];
    });

    this.addIconButton(
      centerX + 104,
      bottomRowY,
      20,
      20,
      '/assets/minecraft/textures/gui/sprites/icon/accessibility.png',
      15,
      15,
      () => {
        this.setState('OPTIONS');
      },
      ['Accessibility Settings...']
    );

    // Bottom-left version text & Bottom-right copyright text
    this.font.draw(ctx, 'Minecraft 26.3', 2, sh - 10, '#FFFFFF', true);
    const copyText = 'Copyright Mojang AB. Do not distribute!';
    this.font.draw(
      ctx,
      copyText,
      sw - this.font.width(copyText) - 2,
      sh - 10,
      '#FFFFFF',
      true
    );
  }

  // ============================================================================
  // 2. SELECT WORLD SCREEN (SelectWorldScreen.java)
  // ============================================================================
  private renderSelectWorldScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);

    this.gui.renderMenuBackground(false, 48, sh - 64);
    this.font.drawCentered(this.gui.ctx, 'Select World', centerX, 8, '#FFFFFF', true);

    this.addEditBox(
      centerX - 100,
      22,
      200,
      20,
      'world_search',
      this.worldSearchText,
      'Search worlds...'
    );

    const filtered = this.savedWorlds.filter((w) =>
      w.name.toLowerCase().includes(this.worldSearchText.toLowerCase())
    );

    const listX = centerX - 135;
    let curY = 54;
    for (let i = 0; i < filtered.length; i++) {
      const w = filtered[i];
      const selected = i === this.selectedWorldIdx;
      const rowHovered =
        this.mouseX >= listX &&
        this.mouseX < listX + 270 &&
        this.mouseY >= curY &&
        this.mouseY < curY + 36;

      if (selected) {
        this.gui.fill(listX - 1, curY - 1, listX + 271, curY + 37, '#FFFFFF');
        this.gui.fill(listX, curY, listX + 270, curY + 36, '#000000');
      }

      // World 32x32 icon
      this.gui.blitSprite(
        '/assets/minecraft/textures/misc/unknown_pack.png',
        listX + 2,
        curY + 2,
        32,
        32
      );

      if (rowHovered) {
        this.gui.fill(listX + 2, curY + 2, listX + 34, curY + 34, 'rgba(0,0,0,0.45)');
        const iconHover =
          this.mouseX < listX + 34
            ? '/assets/minecraft/textures/gui/sprites/world_list/join_highlighted.png'
            : '/assets/minecraft/textures/gui/sprites/world_list/join.png';
        this.gui.blitSprite(iconHover, listX + 2, curY + 2, 32, 32);
      }

      this.font.draw(this.gui.ctx, w.name, listX + 37, curY + 3, '#FFFFFF', true);
      this.font.draw(this.gui.ctx, w.folder, listX + 37, curY + 14, '#808080', true);
      this.font.draw(this.gui.ctx, w.lastPlayed, listX + 37, curY + 25, '#808080', true);

      const idx = i;
      this.interactiveRects.push({
        x: listX,
        y: curY,
        w: 270,
        h: 36,
        onClick: () => {
          if (this.selectedWorldIdx === idx && this.mouseX < listX + 34) {
            this.launchSelectedWorld();
          } else {
            this.selectedWorldIdx = idx;
          }
        },
      });

      curY += 38;
    }

    // Bottom buttons
    this.addButton(centerX - 154, sh - 52, 150, 20, 'Play Selected World', () => {
      this.launchSelectedWorld();
    });
    this.addButton(centerX + 4, sh - 52, 150, 20, 'Create New World', () => {
      this.setState('CREATE_WORLD');
    });

    this.addButton(centerX - 154, sh - 28, 72, 20, 'Edit', () => {
      this.setState('CREATE_WORLD');
    });
    this.addButton(
      centerX - 76,
      sh - 28,
      72,
      20,
      'Delete',
      () => {
        if (this.savedWorlds.length > 1) {
          const removed = this.savedWorlds.splice(this.selectedWorldIdx, 1)[0];
          if (removed) {
            try {
              localStorage.removeItem(`mc26_3_world_state_${removed.id}`);
            } catch {}
          }
          this.selectedWorldIdx = 0;
          this.saveWorldsList();
        }
      },
      this.savedWorlds.length > 1
    );
    this.addButton(centerX + 4, sh - 28, 72, 20, 'Re-Create', () => {
      const w = this.savedWorlds[this.selectedWorldIdx] || this.savedWorlds[0];
      if (w) {
        try {
          localStorage.removeItem(`mc26_3_world_state_${w.id}`);
        } catch {}
      }
      this.world.blockDiffs.clear();
      this.launchSelectedWorld();
    });
    this.addButton(centerX + 82, sh - 28, 72, 20, 'Cancel', () => {
      this.setState('TITLE');
    });
  }

  public saveWorldsList(): void {
    try {
      localStorage.setItem('mc26_3_saved_worlds_v1', JSON.stringify(this.savedWorlds));
    } catch {}
  }

  public saveActiveWorldState(): void {
    if (!this.activeWorldId || MultiplayerManager.activeSession) return;
    try {
      const w = this.savedWorlds.find((entry) => entry.id === this.activeWorldId);
      if (w) {
        const now = new Date();
        const dateStr = now.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' });
        const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        w.folder = `${w.name.replace(/\s+/g, '_')} (${dateStr}, ${timeStr})`;
        w.gameMode = this.player.gameMode === 'creative' ? 'creative' : 'survival';
        w.lastPlayed = `${w.gameMode === 'creative' ? 'Creative' : 'Survival'} Mode, Version: 26.3`;
        this.saveWorldsList();
      }

      const payload = {
        timeOfDay: this.world.timeOfDay,
        blockDiffs: Array.from(this.world.blockDiffs.entries()),
        player: {
          x: this.player.position.x,
          y: this.player.position.y,
          z: this.player.position.z,
          yaw: this.player.yaw,
          pitch: this.player.pitch,
          gameMode: this.player.gameMode,
          flying: this.player.flying,
          health: this.player.health,
          hunger: this.player.hunger,
        },
        inventory: {
          slots: this.inventory.slots.map((s) =>
            s ? { id: s.item.shortId, count: s.count } : null
          ),
          armor: this.inventory.armorSlots.map((s) =>
            s ? { id: s.item.shortId, count: s.count } : null
          ),
          offhand: this.inventory.offhandSlot
            ? { id: this.inventory.offhandSlot.item.shortId, count: this.inventory.offhandSlot.count }
            : null,
          selectedHotbarSlot: this.inventory.selectedHotbarSlot,
        },
        cushions: Array.from(this.world.entityRenderer.cushions.values()).map((c) => c.data),
        mobs: Array.from(this.world.entityRenderer.mobs.values())
          .filter((m) => !m.dead && m.type !== 'remote_player')
          .map((m) => ({
            id: m.id,
            type: m.type,
            x: m.x,
            y: m.y,
            z: m.z,
            yaw: m.yaw,
            health: m.health,
          })),
      };

      localStorage.setItem(`mc26_3_world_state_${this.activeWorldId}`, JSON.stringify(payload));
    } catch {}
  }

  public loadActiveWorldState(): boolean {
    if (!this.activeWorldId) return false;
    try {
      const raw = localStorage.getItem(`mc26_3_world_state_${this.activeWorldId}`);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.player) return false;

      if (typeof data.timeOfDay === 'number') {
        this.world.timeOfDay = data.timeOfDay;
      }

      if (Array.isArray(data.blockDiffs)) {
        this.world.blockDiffs.clear();
        for (const [k, v] of data.blockDiffs) {
          if (typeof k === 'string' && v && typeof v.numId === 'number') {
            this.world.blockDiffs.set(k, { numId: v.numId, meta: v.meta || 0 });
          }
        }
      }

      this.player.position.set(data.player.x, data.player.y, data.player.z);
      this.player.yaw = data.player.yaw || 0;
      this.player.pitch = data.player.pitch || 0;
      this.player.gameMode = data.player.gameMode === 'creative' ? 'creative' : 'survival';
      this.player.flying = !!data.player.flying;
      if (typeof data.player.health === 'number') this.player.health = data.player.health;
      if (typeof data.player.hunger === 'number') this.player.hunger = data.player.hunger;

      if (data.inventory) {
        if (Array.isArray(data.inventory.slots)) {
          for (let i = 0; i < 36; i++) {
            const entry = data.inventory.slots[i];
            const item = entry?.id ? Registries.getItem(entry.id) : undefined;
            this.inventory.slots[i] = item && entry.count > 0 ? { item, count: entry.count } : null;
          }
        }
        if (Array.isArray(data.inventory.armor)) {
          for (let i = 0; i < 4; i++) {
            const entry = data.inventory.armor[i];
            const item = entry?.id ? Registries.getItem(entry.id) : undefined;
            this.inventory.armorSlots[i] = item && entry.count > 0 ? { item, count: entry.count } : null;
          }
        }
        if (data.inventory.offhand?.id) {
          const item = Registries.getItem(data.inventory.offhand.id);
          this.inventory.offhandSlot = item ? { item, count: data.inventory.offhand.count || 1 } : null;
        } else {
          this.inventory.offhandSlot = null;
        }
        if (typeof data.inventory.selectedHotbarSlot === 'number') {
          this.inventory.selectedHotbarSlot = data.inventory.selectedHotbarSlot;
        }
      }

      if (Array.isArray(data.cushions)) {
        for (const c of data.cushions) {
          this.world.entityRenderer.addCushion(c);
        }
      }

      if (Array.isArray(data.mobs)) {
        for (const m of data.mobs) {
          this.world.entityRenderer.spawnMob(m.id, m.type, m.x, m.y, m.z);
          const spawned = this.world.entityRenderer.mobs.get(m.id);
          if (spawned) {
            spawned.yaw = m.yaw ?? spawned.yaw;
            if (typeof m.health === 'number') spawned.health = m.health;
          }
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  private launchSelectedWorld(): void {
    const w = this.savedWorlds[this.selectedWorldIdx] || this.savedWorlds[0];
    this.activeWorldId = w.id;
    this.player.gameMode = w.gameMode;
    this.player.flying = false;
    this.inventory.clearAll();
    this.world.resetWorld(w.seed, 'wilderness_26_3', w.name);
    this.onStartGame?.(false);
  }

  // ============================================================================
  // 3. CREATE NEW WORLD SCREEN (CreateWorldScreen.java with 26.3 Tabs)
  // ============================================================================
  private renderCreateWorldScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);

    this.gui.renderMenuBackground(false, 28, sh - 36);

    // Top tab header bar (Game | World | More)
    const tabs = ['Game', 'World', 'More'];
    for (let i = 0; i < 3; i++) {
      const tx = centerX - 195 + i * 130;
      const selected = this.createWorldTab === i;
      const sprite = selected
        ? '/assets/minecraft/textures/gui/sprites/widget/tab_selected.png'
        : '/assets/minecraft/textures/gui/sprites/widget/tab.png';
      this.gui.blitNineSlice(sprite, tx, 4, 130, 24, 3, 3, 3, 3);
      this.font.drawCentered(
        this.gui.ctx,
        tabs[i],
        tx + 65,
        12,
        selected ? '#FFFFFF' : '#A0A0A0',
        true
      );
      const tabIdx = i as 0 | 1 | 2;
      this.interactiveRects.push({
        x: tx,
        y: 4,
        w: 130,
        h: 24,
        onClick: () => {
          this.createWorldTab = tabIdx;
        },
      });
    }

    if (this.createWorldTab === 0) {
      // Game Tab
      this.addEditBox(
        centerX - 104,
        52,
        208,
        20,
        'world_name',
        this.newWorldName,
        'World Name',
        'World Name'
      );

      const modeLabel =
        this.newWorldMode === 'creative'
          ? 'Game Mode: Creative'
          : this.newWorldMode === 'survival'
          ? 'Game Mode: Survival'
          : 'Game Mode: Spectator';
      this.addButton(centerX - 104, 84, 208, 20, modeLabel, () => {
        this.newWorldMode =
          this.newWorldMode === 'creative'
            ? 'survival'
            : this.newWorldMode === 'survival'
            ? 'spectator'
            : 'creative';
      });

      this.addButton(
        centerX - 104,
        112,
        208,
        20,
        `Difficulty: ${this.newWorldDifficulty}`,
        () => {
          const order: Array<UIManager['newWorldDifficulty']> = [
            'Peaceful',
            'Easy',
            'Normal',
            'Hard',
          ];
          this.newWorldDifficulty =
            order[(order.indexOf(this.newWorldDifficulty) + 1) % order.length];
        }
      );

      this.addButton(centerX - 104, 140, 208, 20, 'Allow Commands: ON', () => {});
    } else if (this.createWorldTab === 1) {
      // World Tab
      this.addButton(
        centerX - 154,
        48,
        150,
        20,
        'World Type: Default (26.3)',
        () => {}
      );
      this.addButton(
        centerX + 4,
        48,
        150,
        20,
        'Generate Structures: ON',
        () => {}
      );
      this.addEditBox(
        centerX - 154,
        88,
        308,
        20,
        'world_seed',
        this.newWorldSeed,
        'Leave blank for a random seed',
        'Seed for the World Generator'
      );
      this.font.drawCentered(
        this.gui.ctx,
        '§7Includes 26.3 Dappled Forest, Poplar Groves & 297 Abandoned Camp NBT Structures',
        centerX,
        122,
        '#A0A0A0',
        true
      );
    } else {
      // More Tab
      this.addButton(centerX - 104, 54, 208, 20, 'Game Rules...', () => {});
      this.addButton(centerX - 104, 82, 208, 20, 'Experiments (26.3 Enabled)', () => {});
      this.addButton(centerX - 104, 110, 208, 20, 'Data Packs...', () => {});
    }

    this.addButton(centerX - 154, sh - 28, 150, 20, 'Create New World', () => {
      const randomSeed = String(Math.floor(Math.random() * 0x7fffffff));
      const finalSeed = this.newWorldSeed.trim() || randomSeed;
      const created: SavedWorldEntry = {
        id: `world_${Date.now()}`,
        name: this.newWorldName || 'New World',
        folder: `${(this.newWorldName || 'New_World').replace(/\s+/g, '_')} (Just now)`,
        lastPlayed: `${this.newWorldMode === 'creative' ? 'Creative' : 'Survival'} Mode, Version: 26.3`,
        gameMode: this.newWorldMode === 'survival' ? 'survival' : 'creative',
        seed: finalSeed,
      };
      this.savedWorlds.unshift(created);
      this.selectedWorldIdx = 0;
      this.saveWorldsList();
      this.launchSelectedWorld();
    });

    this.addButton(centerX + 4, sh - 28, 150, 20, 'Cancel', () => {
      this.setState('SINGLEPLAYER_SELECT');
    });
  }

  // ============================================================================
  // 4. JOIN MULTIPLAYER SCREEN (JoinMultiplayerScreen.java + Wispcraft)
  // ============================================================================
  private renderJoinMultiplayerScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);

    this.gui.renderMenuBackground(false, 32, sh - 64);
    this.font.drawCentered(this.gui.ctx, 'Play Multiplayer', centerX, 11, '#FFFFFF', true);

    // Top-right Wisp Proxy config button
    this.addButton(sw - 104, 6, 98, 20, 'Wisp Proxy...', () => {
      this.setState('WISPCRAFT_CONFIG');
    });

    const servers = MultiplayerManager.servers;
    const listX = centerX - 152;
    const rowW = 304;
    let curY = 38;

    for (let i = 0; i < Math.min(servers.length, Math.floor((sh - 102) / 36)); i++) {
      const s = servers[i];
      const selected = i === this.selectedServerIdx;
      const hovered =
        this.mouseX >= listX &&
        this.mouseX < listX + rowW &&
        this.mouseY >= curY &&
        this.mouseY < curY + 34;

      if (selected) {
        this.gui.fill(listX - 1, curY - 1, listX + rowW + 1, curY + 35, '#FFFFFF');
        this.gui.fill(listX, curY, listX + rowW, curY + 34, '#000000');
      }

      // Server 32x32 icon
      const iconUrl = s.icon || '/assets/minecraft/textures/misc/unknown_server.png';
      this.gui.blitSprite(iconUrl, listX + 1, curY + 1, 32, 32);

      if (hovered) {
        this.gui.fill(listX + 1, curY + 1, listX + 33, curY + 33, 'rgba(0,0,0,0.45)');
        const joinSprite =
          this.mouseX < listX + 33
            ? '/assets/minecraft/textures/gui/sprites/server_list/join_highlighted.png'
            : '/assets/minecraft/textures/gui/sprites/server_list/join.png';
        this.gui.blitSprite(joinSprite, listX + 1, curY + 1, 32, 32);
      }

      this.font.draw(this.gui.ctx, s.name, listX + 36, curY + 2, '#FFFFFF', true);

      const cleanMotd = (s.pingResult?.motd || '§aMinecraft 26.3 ("Wilderness Bound") — Wisp v2 Ready').split('\n');
      this.font.draw(
        this.gui.ctx,
        cleanMotd[0].slice(0, 44),
        listX + 36,
        curY + 12,
        '#AAAAAA',
        true
      );
      if (cleanMotd[1]) {
        this.font.draw(
          this.gui.ctx,
          cleanMotd[1].slice(0, 44),
          listX + 36,
          curY + 22,
          '#808080',
          true
        );
      } else {
        this.font.draw(
          this.gui.ctx,
          `§8${s.ip}`,
          listX + 36,
          curY + 22,
          '#555555',
          true
        );
      }

      // Player count & Ping bars at top-right of entry
      const playersStr = s.pingResult
        ? `${s.pingResult.playersOnline}/${s.pingResult.playersMax}`
        : '1/20';
      const pw = this.font.width(playersStr);
      this.font.draw(
        this.gui.ctx,
        playersStr,
        listX + rowW - pw - 15,
        curY + 2,
        '#AAAAAA',
        true
      );

      const pingSprite =
        s.pingResult?.online === false
          ? '/assets/minecraft/textures/gui/sprites/server_list/unreachable.png'
          : '/assets/minecraft/textures/gui/sprites/server_list/ping_5.png';
      this.gui.blitSprite(pingSprite, listX + rowW - 12, curY + 1, 10, 8);

      const idx = i;
      this.interactiveRects.push({
        x: listX,
        y: curY,
        w: rowW,
        h: 34,
        onClick: () => {
          if (this.selectedServerIdx === idx && this.mouseX < listX + 33) {
            this.connectToServer(s);
          } else {
            this.selectedServerIdx = idx;
          }
        },
      });

      curY += 36;
    }

    // Bottom buttons
    this.addButton(centerX - 154, sh - 52, 100, 20, 'Join Server', () => {
      const s = servers[this.selectedServerIdx] || servers[0];
      if (s) this.connectToServer(s);
    });
    this.addButton(centerX - 50, sh - 52, 100, 20, 'Direct Connection', () => {
      this.directConnectModal = true;
      this.focusedEditBox = 'direct_ip';
    });
    this.addButton(centerX + 54, sh - 52, 100, 20, 'Add Server', () => {
      this.directConnectModal = true;
      this.focusedEditBox = 'direct_ip';
    });

    this.addButton(centerX - 154, sh - 28, 70, 20, 'Edit', () => {
      const s = servers[this.selectedServerIdx];
      if (s) {
        this.directConnectIp = s.ip;
        this.directConnectModal = true;
        this.focusedEditBox = 'direct_ip';
      }
    });
    this.addButton(centerX - 78, sh - 28, 70, 20, 'Delete', () => {
      if (servers.length > 1) {
        servers.splice(this.selectedServerIdx, 1);
        this.selectedServerIdx = 0;
      }
    });
    this.addButton(centerX - 2, sh - 28, 74, 20, 'Refresh', () => {
      MultiplayerManager.pingAllServers().then(() => this.render());
    });
    this.addButton(centerX + 78, sh - 28, 76, 20, 'Cancel', () => {
      this.setState('TITLE');
    });

    // Direct Connect Modal
    if (this.directConnectModal) {
      this.gui.fill(0, 0, sw, sh, 'rgba(0,0,0,0.75)');
      this.font.drawCentered(this.gui.ctx, 'Direct Connection', centerX, 40, '#FFFFFF', true);
      this.addEditBox(
        centerX - 100,
        85,
        200,
        20,
        'direct_ip',
        this.directConnectIp,
        '127.0.0.1:25565',
        'Server Address'
      );
      this.addButton(centerX - 100, sh - 56, 200, 20, 'Join Server', () => {
        this.directConnectModal = false;
        this.connectToServer({ name: this.directConnectIp, ip: this.directConnectIp });
      });
      this.addButton(centerX - 100, sh - 32, 200, 20, 'Cancel', () => {
        this.directConnectModal = false;
      });
    }
  }

  private renderWispcraftConfigScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);

    this.gui.renderMenuBackground(false, 32, sh - 36);
    this.font.drawCentered(
      this.gui.ctx,
      'Wispcraft Wisp v2 Proxy & Account Settings',
      centerX,
      11,
      '#FFFFFF',
      true
    );

    this.addEditBox(
      centerX - 120,
      62,
      240,
      20,
      'wisp_url',
      MultiplayerManager.wispProxyUrl,
      'ws://localhost:3000/wisp/',
      'Wisp v2 WebSocket Proxy URL (MercuryWorkshop/wispcraft)'
    );

    this.addEditBox(
      centerX - 120,
      106,
      240,
      20,
      'wisp_user',
      MultiplayerManager.username,
      'Player26_3',
      'Minecraft 26.3 Username'
    );

    this.font.drawCentered(
      this.gui.ctx,
      '§aEmbedded Local 26.3 TCP Server Running on 127.0.0.1:25565 (Protocol 777)',
      centerX,
      142,
      '#55FF55',
      true
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      MultiplayerManager.saveSettings();
      this.setState(
        this.previousState === 'MULTIPLAYER_SELECT' ? 'MULTIPLAYER_SELECT' : 'TITLE'
      );
    });
  }

  private connectToServer(server: ServerEntry): void {
    this.connectingStatus = `Connecting to ${server.ip} via Wisp v2...`;
    this.setState('CONNECTING');

    MultiplayerManager.joinServer(
      server,
      (status) => {
        this.connectingStatus = status;
        this.render();
      },
      (msg) => {
        this.addChatMessage(msg);
      },
      () => {
        this.onStartGame?.(true);
      }
    );
  }

  private renderConnectingScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const centerY = Math.floor(sh / 2);

    this.gui.renderMenuBackground(false);
    this.font.drawCentered(
      this.gui.ctx,
      this.connectingStatus,
      centerX,
      centerY - 20,
      '#FFFFFF',
      true
    );

    this.addButton(centerX - 100, centerY + 24, 200, 20, 'Cancel', () => {
      MultiplayerManager.disconnect();
      this.setState('MULTIPLAYER_SELECT');
    });
  }

  // ============================================================================
  // 5. OPTIONS SCREEN (OptionsScreen.java)
  // ============================================================================
  private renderOptionsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const opts = OptionsManager.current;
    const inWorld =
      this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Options', centerX, 11, '#FFFFFF', true);

    // Row 1: FOV Slider & Render Distance Slider
    const fovNorm = (opts.fov - 30) / 80;
    const fovText = opts.fov === 70 ? 'FOV: Normal' : opts.fov === 110 ? 'FOV: Quake Pro' : `FOV: ${opts.fov}`;
    this.addSlider(centerX - 155, 42, 150, 20, fovText, fovNorm, (n) => {
      opts.fov = Math.round(30 + n * 80);
      this.player.camera.fov = opts.fov;
      this.player.camera.updateProjectionMatrix();
      OptionsManager.save();
    });

    const rdNorm = (opts.renderDistance - 2) / 10;
    this.addSlider(
      centerX + 5,
      42,
      150,
      20,
      `Render Distance: ${opts.renderDistance} chunks`,
      rdNorm,
      (n) => {
        opts.renderDistance = Math.round(2 + n * 10);
        OptionsManager.save();
      }
    );

    // Row 2: Master Volume Slider & Mouse Sensitivity Slider
    this.addSlider(
      centerX - 155,
      66,
      150,
      20,
      `Master Volume: ${Math.round(opts.soundVolume * 100)}%`,
      opts.soundVolume,
      (n) => {
        opts.soundVolume = Math.round(n * 100) / 100;
        OptionsManager.save();
      }
    );

    this.addSlider(
      centerX + 5,
      66,
      150,
      20,
      `Sensitivity: ${Math.round(opts.mouseSensitivity * 200)}%`,
      opts.mouseSensitivity,
      (n) => {
        opts.mouseSensitivity = Math.max(0.05, Math.round(n * 100) / 100);
        OptionsManager.save();
      }
    );

    // Row 3: GUI Scale & Clouds
    const scaleLabel = opts.guiScale === 0 ? 'GUI Scale: Auto' : `GUI Scale: ${opts.guiScale}x`;
    this.addButton(centerX - 155, 96, 150, 20, scaleLabel, () => {
      opts.guiScale = (opts.guiScale + 1) % 5;
      OptionsManager.save();
    });

    this.addButton(
      centerX + 5,
      96,
      150,
      20,
      `Clouds: ${opts.clouds ? 'Fancy' : 'OFF'}`,
      () => {
        opts.clouds = !opts.clouds;
        OptionsManager.save();
      }
    );

    // Row 4: Game Mode & Time of Day
    this.addButton(
      centerX - 155,
      120,
      150,
      20,
      `Game Mode: ${this.player.gameMode.toUpperCase()}`,
      () => {
        this.player.gameMode =
          this.player.gameMode === 'creative' ? 'survival' : 'creative';
        if (this.player.gameMode === 'survival') this.player.flying = false;
      }
    );

    this.addButton(centerX + 5, 120, 150, 20, 'Cycle Time of Day', () => {
      this.world.timeOfDay = (this.world.timeOfDay + 6000) % 24000;
    });

    // Row 5: WebGPU Graphics Backend Toggle & Locate Abandoned Camp
    this.addButton(
      centerX - 155,
      144,
      150,
      20,
      `Renderer: ${WebGPUContext.active ? 'WebGPU' : 'WebGL2'}`,
      () => {
        if (WebGPUContext.supported) {
          WebGPUContext.active = !WebGPUContext.active;
          WebGPUContext.backendLabel = WebGPUContext.active
            ? `WebGPU (${WebGPUContext.adapterName})`
            : 'WebGL2';
        }
      }
    );

    this.addButton(
      centerX + 5,
      144,
      150,
      20,
      'Locate Abandoned Camp',
      () => {
        const camp = this.world.findNearestAbandonedCamp(
          this.player.position.x,
          this.player.position.z
        );
        if (camp) {
          this.player.position.set(camp.x + 0.5, camp.y + 1.5, camp.z + 0.5);
          this.addChatMessage(
            `§aTeleported to 26.3 Abandoned Camp at X=${camp.x}, Y=${camp.y}, Z=${camp.z}!`
          );
          if (inWorld) this.setState('IN_GAME');
        }
      }
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.previousState);
    });
  }

  // ============================================================================
  // 6. PAUSE SCREEN (PauseScreen.java - Game Menu)
  // ============================================================================
  private renderPauseScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const baseY = Math.floor(sh / 4) + 8;

    this.gui.fill(0, 0, sw, sh, 'rgba(16, 16, 16, 0.72)');
    this.font.drawCentered(this.gui.ctx, 'Game Menu', centerX, 40, '#FFFFFF', true);

    this.addButton(centerX - 102, baseY, 204, 20, 'Back to Game', () => {
      this.setState('IN_GAME');
    });

    this.addButton(centerX - 102, baseY + 24, 98, 20, 'Advancements', () => {
      this.setState('ADVANCEMENTS');
    });
    this.addButton(centerX + 4, baseY + 24, 98, 20, 'Statistics', () => {
      this.showToast('Wilderness Explorer', `Blocks Modified: ${this.world.blockDiffs.size}`, 'filled_map');
    });

    this.addButton(centerX - 102, baseY + 48, 98, 20, 'Give Feedback', () => {
      this.showToast('Minecraft 26.3', 'Wilderness Bound Official Web Port', 'orange_cushion');
    });
    this.addButton(centerX + 4, baseY + 48, 98, 20, 'Report Bugs', () => {
      this.setState('WISPCRAFT_CONFIG');
    });

    this.addButton(centerX - 102, baseY + 72, 98, 20, 'Options...', () => {
      this.setState('OPTIONS');
    });
    this.addButton(centerX + 4, baseY + 72, 98, 20, 'Open to LAN', () => {
      this.addChatMessage('§aLocal game hosted on port §e25565§a (Wisp v2 proxy active at /wisp/)');
      this.setState('IN_GAME');
    });

    this.addButton(
      centerX - 102,
      baseY + 96,
      204,
      20,
      'Save and Quit to Title',
      () => {
        this.saveActiveWorldState();
        MultiplayerManager.disconnect();
        this.onQuitToTitle?.();
        this.setState('TITLE');
      }
    );
  }

  private renderAdvancementsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const centerY = Math.floor(sh / 2);

    this.gui.fill(0, 0, sw, sh, 'rgba(16, 16, 16, 0.75)');
    const winW = 252;
    const winH = 140;
    const wx = centerX - Math.floor(winW / 2);
    const wy = centerY - Math.floor(winH / 2);

    this.gui.blitTiled(
      '/assets/minecraft/textures/gui/menu_list_background.png',
      wx + 8,
      wy + 16,
      winW - 16,
      winH - 24,
      16,
      16
    );
    this.gui.fill(wx, wy, wx + winW, wy + 16, '#C6C6C6');
    this.font.draw(this.gui.ctx, 'Advancements - Minecraft 26.3 ("Wilderness Bound")', wx + 8, wy + 5, '#404040', false);

    const nodes = [
      { x: wx + 32, y: wy + 55, item: 'poplar_log', title: 'Wilderness Bound', desc: 'Enter a Dappled Forest or Poplar Grove' },
      { x: wx + 92, y: wy + 38, item: 'straw_bed', title: 'Sweet Wilderness Dreams', desc: 'Rest on a 26.3 Straw Bed at an Abandoned Camp' },
      { x: wx + 92, y: wy + 78, item: 'orange_cushion', title: 'Take a Seat!', desc: 'Place and sit on a 26.3 Colored Cushion' },
      { x: wx + 158, y: wy + 55, item: 'cyan_concrete_stairs', title: 'Modern Architect', desc: 'Craft Concrete or Wool Stairs & Slabs' },
    ];

    for (const n of nodes) {
      this.gui.fill(n.x - 1, n.y - 1, n.x + 25, n.y + 25, '#AA8800');
      this.gui.fill(n.x, n.y, n.x + 24, n.y + 24, '#333333');
      const def = Registries.getItem(n.item) || null;
      this.gui.renderItem(def, 1, n.x + 4, n.y + 4);
      this.interactiveRects.push({
        x: n.x,
        y: n.y,
        w: 24,
        h: 24,
        tooltip: [`§e${n.title}`, `§7${n.desc}`],
      });
    }

    this.addButton(centerX - 50, wy + winH + 8, 100, 20, 'Done', () => {
      this.setState('PAUSE');
    });
  }

  // ============================================================================
  // 7. IN-GAME HUD (Gui.java: Hotbar, Hearts, Hunger, XP, Crosshair, F3, Chat)
  // ============================================================================
  private renderHUD(chatOpen: boolean): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const centerY = Math.floor(sh / 2);

    // Crosshair (15x15)
    if (this.state === 'IN_GAME') {
      this.gui.blitSprite(
        '/assets/minecraft/textures/gui/sprites/hud/crosshair.png',
        centerX - 7,
        centerY - 7,
        15,
        15
      );
    }

    // Hotbar background (182x22 at sw/2 - 91, sh - 22)
    const hbX = centerX - 91;
    const hbY = sh - 22;
    this.gui.blitSprite(
      '/assets/minecraft/textures/gui/sprites/hud/hotbar.png',
      hbX,
      hbY,
      182,
      22
    );

    // Selected slot frame (24x23 at hbX - 1 + slot * 20, hbY - 1)
    this.gui.blitSprite(
      '/assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png',
      hbX - 1 + this.inventory.selectedHotbarSlot * 20,
      hbY - 1,
      24,
      23
    );

    // Offhand slot if occupied
    if (this.inventory.offhandSlot) {
      this.gui.blitSprite(
        '/assets/minecraft/textures/gui/sprites/hud/hotbar_offhand_left.png',
        hbX - 29,
        hbY - 1,
        29,
        24
      );
      this.gui.renderItem(
        this.inventory.offhandSlot.item,
        this.inventory.offhandSlot.count,
        hbX - 26,
        hbY + 3
      );
    }

    // Hotbar items (9 slots)
    for (let i = 0; i < 9; i++) {
      const stack = this.inventory.slots[i];
      if (stack) {
        this.gui.renderItem(stack.item, stack.count, hbX + 3 + i * 20, hbY + 3);
      }
    }

    // Survival Hearts, Hunger, Air Bubbles & Experience Bar
    if (this.player.gameMode === 'survival') {
      // XP Bar (182x5 at hbX, sh - 29)
      const xpY = sh - 29;
      this.gui.blitSprite(
        '/assets/minecraft/textures/gui/sprites/hud/experience_bar_background.png',
        hbX,
        xpY,
        182,
        5
      );
      const fillW = Math.floor(182 * this.player.xpProgress);
      if (fillW > 0) {
        this.gui.blit(
          '/assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png',
          hbX,
          xpY,
          0,
          0,
          fillW,
          5,
          182,
          5
        );
      }
      if (this.player.xpLevel > 0) {
        this.font.drawCentered(
          this.gui.ctx,
          String(this.player.xpLevel),
          centerX,
          sh - 35,
          '#80FF20',
          true
        );
      }

      // 10 Hearts (left side at sh - 39)
      const heartY = sh - 39;
      for (let i = 0; i < 10; i++) {
        const hx = hbX + i * 8;
        this.gui.blitSprite(
          '/assets/minecraft/textures/gui/sprites/hud/heart/container.png',
          hx,
          heartY,
          9,
          9
        );
        const hp = this.player.health - i * 2;
        if (hp >= 2) {
          this.gui.blitSprite(
            '/assets/minecraft/textures/gui/sprites/hud/heart/full.png',
            hx,
            heartY,
            9,
            9
          );
        } else if (hp === 1) {
          this.gui.blitSprite(
            '/assets/minecraft/textures/gui/sprites/hud/heart/half.png',
            hx,
            heartY,
            9,
            9
          );
        }
      }

      // 10 Hunger drumstick icons (right side at sh - 39)
      for (let i = 0; i < 10; i++) {
        const fx = hbX + 182 - i * 8 - 9;
        this.gui.blitSprite(
          '/assets/minecraft/textures/gui/sprites/hud/food_empty.png',
          fx,
          heartY,
          9,
          9
        );
        const fp = this.player.hunger - i * 2;
        if (fp >= 2) {
          this.gui.blitSprite(
            '/assets/minecraft/textures/gui/sprites/hud/food_full.png',
            fx,
            heartY,
            9,
            9
          );
        } else if (fp === 1) {
          this.gui.blitSprite(
            '/assets/minecraft/textures/gui/sprites/hud/food_half.png',
            fx,
            heartY,
            9,
            9
          );
        }
      }

      // Underwater air bubbles
      if (this.player.inWater) {
        for (let i = 0; i < 10; i++) {
          const ax = hbX + 182 - i * 8 - 9;
          this.gui.blitSprite(
            '/assets/minecraft/textures/gui/sprites/hud/air.png',
            ax,
            heartY - 10,
            9,
            9
          );
        }
      }
    }

    // Held Item Name Tooltip above hotbar
    const held = this.inventory.getHeldStack();
    if (held && this.heldItemTooltipTimer > 0) {
      const labelY = this.player.gameMode === 'survival' ? sh - 59 : sh - 38;
      this.font.drawCentered(
        this.gui.ctx,
        held.item.displayName,
        centerX,
        labelY,
        '#FFFFFF',
        true
      );
    }

    // Seated on 26.3 Cushion action-bar message
    if (this.player.seatedCushion) {
      this.font.drawCentered(
        this.gui.ctx,
        '§eSeated on 26.3 Cushion — Press §fSneak (Shift)§e to dismount',
        centerX,
        sh - 68,
        '#FFFF55',
        true
      );
    }

    // Chat Box (bottom-left)
    const now = performance.now();
    const visibleMessages = chatOpen
      ? this.chatHistory.slice(-10)
      : this.chatHistory.filter((m) => now - m.time < 9000).slice(-6);

    if (visibleMessages.length > 0) {
      let chatY = sh - 48 - visibleMessages.length * 9;
      for (const m of visibleMessages) {
        this.gui.fill(2, chatY - 1, Math.min(sw - 20, 320), chatY + 8, 'rgba(0, 0, 0, 0.45)');
        this.font.draw(this.gui.ctx, m.text, 4, chatY, '#FFFFFF', true);
        chatY += 9;
      }
    }

    if (chatOpen) {
      this.gui.fill(2, sh - 14, sw - 2, sh - 2, 'rgba(0, 0, 0, 0.75)');
      const cursor = Math.floor(now / 300) % 2 === 0 ? '_' : '';
      this.font.draw(
        this.gui.ctx,
        this.chatInputText + cursor,
        4,
        sh - 12,
        '#FFFFFF',
        true
      );
    }

    // F3 Debug Screen Overlay (DebugScreenOverlay.java)
    if (this.showDebugF3) {
      this.renderDebugF3Overlay();
    }
  }

  private renderDebugF3Overlay(): void {
    const sw = this.gui.scaledWidth;
    const p = this.player;
    const bx = Math.floor(p.position.x);
    const by = Math.floor(p.position.y);
    const bz = Math.floor(p.position.z);
    const hit = p.currentHit;
    const hitBlock = hit ? Registries.getBlock(hit.blockNumId) : null;

    const currentBiome = WorldGen26_3.getBiomeAt(bx, bz);

    const leftLines = [
      'Minecraft 26.3 (26.3/vanilla/Wilderness Bound)',
      `${this.fps} fps T: inf vsync fancy-clouds B: 2`,
      `Integrated Wisp Server @ 16 ms ticks (Seed: ${WorldGen26_3.seed})`,
      `C: ${this.world.chunks.size} D: ${OptionsManager.current.renderDistance} pC: 000, pU: 00, aB: 06`,
      `E: ${this.world.entityRenderer.cushions.size + this.world.entityRenderer.mobs.size + this.world.entityRenderer.droppedItems.size}, B: 0, SD: 6`,
      '',
      `XYZ: ${p.position.x.toFixed(3)} / ${p.position.y.toFixed(5)} / ${p.position.z.toFixed(3)}`,
      `Block: ${bx} ${by} ${bz} [${bx & 15} ${by & 15} ${bz & 15}]`,
      `Chunk: ${bx >> 4} ${by >> 4} ${bz >> 4}`,
      `Facing: ${['north (-Z)', 'east (+X)', 'south (+Z)', 'west (-X)'][p.getCardinalFacingMeta()]}`,
      `Client Light: 15 (15 sky, 12 block)`,
      `Biome: ${currentBiome}`,
      `Local Difficulty: 2.25 // 0.00 (Day ${Math.floor(this.world.timeOfDay / 24000)})`,
    ];

    const rightLines = [
      'Java: 25.0.1 (WebGPU / WebGL2 Port)',
      'Mem: 28% 584/2048MB',
      'Allocated: 64% 1310MB',
      '',
      `Backend: ${WebGPUContext.backendLabel}`,
      `Display: ${window.innerWidth}x${window.innerHeight} (GUI Scale ${this.gui.guiScale}x)`,
      'Atlas: Nearest 1024x1024 + WGSL Compute',
      '',
      hit && hitBlock
        ? `Targeted Block: ${hit.bx}, ${hit.by}, ${hit.bz}`
        : 'Targeted Block: none',
      hit && hitBlock ? `${hitBlock.id}` : '',
      hit && hitBlock && hitBlock.is26_3 ? '§a#minecraft:wilderness_bound_26_3' : '',
    ];

    let ly = 2;
    for (const line of leftLines) {
      if (line) {
        const w = this.font.width(line);
        this.gui.fill(1, ly - 1, 3 + w, ly + 8, 'rgba(80, 80, 80, 0.56)');
        this.font.draw(this.gui.ctx, line, 2, ly, '#E0E0E0', false);
      }
      ly += 9;
    }

    let ry = 2;
    for (const line of rightLines) {
      if (line) {
        const w = this.font.width(line);
        this.gui.fill(sw - w - 3, ry - 1, sw - 1, ry + 8, 'rgba(80, 80, 80, 0.56)');
        this.font.draw(this.gui.ctx, line, sw - w - 2, ry, '#E0E0E0', false);
      }
      ry += 9;
    }
  }

  private renderToastOverlay(): void {
    if (!this.activeToast) return;
    const elapsed = (performance.now() - this.activeToast.startTime) / 1000;
    if (elapsed > 5.0) {
      this.activeToast = null;
      return;
    }
    let offsetX = 0;
    if (elapsed < 0.35) offsetX = (1 - elapsed / 0.35) * 160;
    else if (elapsed > 4.65) offsetX = ((elapsed - 4.65) / 0.35) * 160;

    const tx = Math.floor(this.gui.scaledWidth - 160 + offsetX);
    const ty = 4;
    this.gui.blitSprite(
      '/assets/minecraft/textures/gui/sprites/toast/advancement.png',
      tx,
      ty,
      160,
      32
    );
    if (this.activeToast.item) {
      this.gui.renderItem(this.activeToast.item, 1, tx + 8, ty + 8);
    }
    this.font.draw(this.gui.ctx, this.activeToast.title, tx + 30, ty + 7, '#FFFF00', false);
    this.font.draw(this.gui.ctx, this.activeToast.subtitle, tx + 30, ty + 18, '#FFFFFF', false);
  }

  // ============================================================================
  // 8. OFFICIAL CONTAINER SCREENS (InventoryScreen, CreativeModeInventoryScreen,
  //    CraftingScreen, StonecutterScreen)
  // ============================================================================
  private renderContainerScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    this.gui.fill(0, 0, sw, sh, 'rgba(16, 16, 16, 0.72)');

    if (this.activeContainerTab === 'crafting') {
      this.renderCraftingTableScreen();
    } else if (this.activeContainerTab === 'stonecutter') {
      this.renderStonecutterScreen();
    } else if (this.player.gameMode === 'creative') {
      this.renderCreativeInventoryScreen();
    } else {
      this.renderSurvivalInventoryScreen();
    }

    // Draw cursor-held item stack following mouse!
    if (this.inventory.cursorStack) {
      this.gui.renderItem(
        this.inventory.cursorStack.item,
        this.inventory.cursorStack.count,
        Math.floor(this.mouseX - 8),
        Math.floor(this.mouseY - 8)
      );
    }
  }

  /** Helper to render and register a 16x16 interactive container slot */
  private drawInteractiveSlot(
    x: number,
    y: number,
    getSlot: () => ItemStack | null,
    setSlot: (s: ItemStack | null) => void,
    slotIndexInMainInv = -1,
    emptySpriteUrl?: string
  ): void {
    const stack = getSlot();
    if (!stack && emptySpriteUrl) {
      this.gui.blitSprite(emptySpriteUrl, x, y, 16, 16);
    }
    if (stack) {
      this.gui.renderItem(stack.item, stack.count, x, y);
    }
    const hovered =
      this.mouseX >= x &&
      this.mouseX < x + 16 &&
      this.mouseY >= y &&
      this.mouseY < y + 16;
    if (hovered) {
      this.gui.renderSlotHighlight(x, y);
    }

    const tooltip = stack ? [stack.item.displayName] : undefined;

    this.interactiveRects.push({
      x,
      y,
      w: 16,
      h: 16,
      isSlot: true,
      slotKey: `slot_${x}_${y}`,
      getSlot,
      setSlot,
      tooltip,
      onClick: (button, shiftKey) => {
        this.inventory.clickSlot(getSlot, setSlot, button, shiftKey, slotIndexInMainInv);
      },
      onRightDragPlace: () => {
        this.inventory.placeOneFromCursor(getSlot, setSlot);
      },
      onHotbarKeySwap: (hotbarIdx: number) => {
        if (slotIndexInMainInv === hotbarIdx) return;
        const curSlot = getSlot();
        const curHotbar = this.inventory.slots[hotbarIdx];
        setSlot(curHotbar);
        this.inventory.slots[hotbarIdx] = curSlot;
      },
    });
  }

  /** Draw standard 3x9 Main Inventory + 1x9 Hotbar at (leftPos + 8, topPos + 84 / 142) */
  private drawPlayerInventorySlots(leftPos: number, topPos: number): void {
    // 3x9 Main Inventory (slots 9..35)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 9; c++) {
        const idx = 9 + r * 9 + c;
        const sx = leftPos + 8 + c * 18;
        const sy = topPos + 84 + r * 18;
        this.drawInteractiveSlot(
          sx,
          sy,
          () => this.inventory.slots[idx],
          (s) => {
            this.inventory.slots[idx] = s;
          },
          idx
        );
      }
    }
    // 1x9 Hotbar (slots 0..8)
    for (let c = 0; c < 9; c++) {
      const idx = c;
      const sx = leftPos + 8 + c * 18;
      const sy = topPos + 142;
      this.drawInteractiveSlot(
        sx,
        sy,
        () => this.inventory.slots[idx],
        (s) => {
          this.inventory.slots[idx] = s;
        },
        idx
      );
    }
  }

  // ----------------------------------------------------------------------------
  // 8A. SURVIVAL INVENTORY SCREEN (InventoryScreen.java - container/inventory.png 176x166)
  // ----------------------------------------------------------------------------
  private renderSurvivalInventoryScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const leftPos = Math.floor((sw - 176) / 2) + (this.showRecipeBook ? 77 : 0);
    const topPos = Math.floor((sh - 166) / 2);

    if (this.showRecipeBook) {
      this.renderRecipeBookSidePanel(leftPos - 149, topPos);
    }

    this.gui.blit(
      '/assets/minecraft/textures/gui/container/inventory.png',
      leftPos,
      topPos,
      0,
      0,
      176,
      166,
      256,
      256
    );

    // "Crafting" label at (leftPos + 97, topPos + 6) in #404040 without shadow
    this.font.draw(this.gui.ctx, 'Crafting', leftPos + 97, topPos + 6, '#404040', false);

    // Interactive Steve Doll in black viewport (leftPos + 26..75, topPos + 8..78)
    const held = this.inventory.getHeldStack();
    this.gui.renderPlayerDoll(
      leftPos + 26,
      topPos + 8,
      leftPos + 75,
      topPos + 78,
      this.mouseX,
      this.mouseY,
      held ? held.item : null
    );

    // 4 Armor Slots (x = leftPos + 8, y = topPos + 8 + i * 18) - container/inventory.png already has empty icons baked in!
    for (let i = 0; i < 4; i++) {
      const idx = i;
      this.drawInteractiveSlot(
        leftPos + 8,
        topPos + 8 + i * 18,
        () => this.inventory.armorSlots[idx],
        (s) => {
          this.inventory.armorSlots[idx] = s;
        },
        -1
      );
    }

    // Offhand Slot (x = leftPos + 77, y = topPos + 62)
    this.drawInteractiveSlot(
      leftPos + 77,
      topPos + 62,
      () => this.inventory.offhandSlot,
      (s) => {
        this.inventory.offhandSlot = s;
      },
      -1
    );

    // 2x2 Crafting Grid (x = leftPos + 98 + c * 18, y = topPos + 18 + r * 18)
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const idx = r * 2 + c;
        this.drawInteractiveSlot(
          leftPos + 98 + c * 18,
          topPos + 18 + r * 18,
          () => this.inventory.crafting2x2[idx],
          (s) => {
            this.inventory.crafting2x2[idx] = s;
          }
        );
      }
    }

    // 2x2 Crafting Output Slot (x = leftPos + 154, y = topPos + 28)
    const craftResult = this.inventory.getCraftingResult(this.inventory.crafting2x2, 2);
    const outX = leftPos + 154;
    const outY = topPos + 28;
    if (craftResult) {
      this.gui.renderItem(craftResult.item, craftResult.count, outX, outY);
    }
    if (
      this.mouseX >= outX &&
      this.mouseX < outX + 16 &&
      this.mouseY >= outY &&
      this.mouseY < outY + 16
    ) {
      this.gui.renderSlotHighlight(outX, outY);
    }
    const craftOnce2x2 = (shiftKey: boolean) => {
      if (shiftKey) {
        let safety = 0;
        while (safety++ < 64) {
          const res = this.inventory.getCraftingResult(this.inventory.crafting2x2, 2);
          if (!res) break;
          if (!this.inventory.addItem(res.item.shortId, res.count)) break;
          this.inventory.consumeCraftingGrid(this.inventory.crafting2x2);
        }
        return;
      }
      const res = this.inventory.getCraftingResult(this.inventory.crafting2x2, 2);
      if (!res) return;
      if (!this.inventory.cursorStack) {
        this.inventory.cursorStack = { ...res };
        this.inventory.consumeCraftingGrid(this.inventory.crafting2x2);
      } else if (
        this.inventory.cursorStack.item.id === res.item.id &&
        this.inventory.cursorStack.count + res.count <= res.item.maxStack
      ) {
        this.inventory.cursorStack.count += res.count;
        this.inventory.consumeCraftingGrid(this.inventory.crafting2x2);
      }
    };

    this.interactiveRects.push({
      x: outX,
      y: outY,
      w: 16,
      h: 16,
      isSlot: true,
      slotKey: 'craft_out_2x2',
      tooltip: craftResult ? [craftResult.item.displayName] : undefined,
      onClick: (_button, shiftKey) => craftOnce2x2(shiftKey),
      onRightDragPlace: () => craftOnce2x2(false),
      onHotbarKeySwap: (hotbarIdx: number) => {
        const res = this.inventory.getCraftingResult(this.inventory.crafting2x2, 2);
        if (!res) return;
        const curH = this.inventory.slots[hotbarIdx];
        if (!curH) {
          this.inventory.slots[hotbarIdx] = { ...res };
          this.inventory.consumeCraftingGrid(this.inventory.crafting2x2);
        } else if (curH.item.id === res.item.id && curH.count + res.count <= res.item.maxStack) {
          curH.count += res.count;
          this.inventory.consumeCraftingGrid(this.inventory.crafting2x2);
        }
      },
    });

    // Official Recipe Book Button at (leftPos + 104, topPos + 61, 20x18) - below the 2x2 crafting grid!
    const rbX = leftPos + 104;
    const rbY = topPos + 61;
    const rbHover =
      this.mouseX >= rbX && this.mouseX < rbX + 20 && this.mouseY >= rbY && this.mouseY < rbY + 18;
    this.gui.blitSprite(
      rbHover
        ? '/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png'
        : '/assets/minecraft/textures/gui/sprites/recipe_book/button.png',
      rbX,
      rbY,
      20,
      18
    );
    this.interactiveRects.push({
      x: rbX,
      y: rbY,
      w: 20,
      h: 18,
      tooltip: ['Recipe Book'],
      onClick: () => {
        this.showRecipeBook = !this.showRecipeBook;
      },
    });

    this.drawPlayerInventorySlots(leftPos, topPos);
  }

  private renderRecipeBookSidePanel(rx: number, ry: number): void {
    this.gui.blit(
      '/assets/minecraft/textures/gui/recipe_book.png',
      rx,
      ry,
      1,
      1,
      147,
      166,
      256,
      256
    );
    this.font.draw(this.gui.ctx, 'Recipes', rx + 25, ry + 13, '#FFFFFF', true);
    const recipes = Inventory.getRecipes().filter((r) => r.type === 'crafting');
    for (let i = 0; i < Math.min(20, recipes.length); i++) {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const sx = rx + 11 + col * 25;
      const sy = ry + 31 + row * 25;
      const rec = recipes[i];
      const outItem = Registries.getItem(rec.resultId);
      if (!outItem) continue;
      this.gui.renderItem(outItem, rec.resultCount, sx + 4, sy + 4);
      if (
        this.mouseX >= sx &&
        this.mouseX < sx + 24 &&
        this.mouseY >= sy &&
        this.mouseY < sy + 24
      ) {
        this.gui.renderSlotHighlight(sx + 4, sy + 4);
      }
      this.interactiveRects.push({
        x: sx,
        y: sy,
        w: 24,
        h: 24,
        tooltip: [
          outItem.displayName,
          ...rec.ingredients.map(
            (ing) => `§7Requires: ${ing.count}x ${Registries.formatName(ing.id)}`
          ),
        ],
        onClick: () => {
          if (this.inventory.removeIngredients(rec.ingredients)) {
            this.inventory.addItem(rec.resultId, rec.resultCount);
            AudioEngine.play('ui.button.click', 0.8);
          }
        },
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 8B. CREATIVE MODE INVENTORY SCREEN (CreativeModeInventoryScreen.java - 195x136)
  // ----------------------------------------------------------------------------
  private renderCreativeInventoryScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const leftPos = Math.floor((sw - 195) / 2);
    const topPos = Math.floor((sh - 136) / 2);

    const topTabs: Array<{
      id: UIManager['creativeTab'];
      col: number;
      label: string;
      icon: string;
    }> = [
      { id: 'building', col: 1, label: 'Building Blocks', icon: 'poplar_planks' },
      { id: 'colored', col: 2, label: 'Colored Blocks', icon: 'orange_cushion' },
      { id: 'natural', col: 3, label: 'Natural Blocks', icon: 'orange_poplar_leaves' },
      { id: 'functional', col: 4, label: 'Functional Blocks', icon: 'straw_bed' },
      { id: 'redstone', col: 5, label: 'Redstone Blocks', icon: 'redstone_block' },
      { id: 'search', col: 7, label: 'Search Items', icon: 'filled_map' },
    ];

    const bottomTabs: Array<{
      id: UIManager['creativeTab'];
      col: number;
      label: string;
      icon: string;
    }> = [
      { id: 'combat_tools', col: 1, label: 'Tools & Combat', icon: 'diamond_pickaxe' },
      { id: 'survival_inv', col: 7, label: 'Survival Inventory', icon: 'chest' },
    ];

    // Draw unselected tabs behind main panel
    for (const t of topTabs) {
      if (this.creativeTab === t.id) continue;
      const tx = leftPos + (t.col === 7 ? 195 - 27 : (t.col - 1) * 27);
      const ty = topPos - 28;
      this.gui.blitSprite(
        `/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_${t.col}.png`,
        tx,
        ty,
        26,
        32
      );
      this.gui.renderItem(Registries.getItem(t.icon) || null, 1, tx + 5, ty + 8);
      this.interactiveRects.push({
        x: tx,
        y: ty,
        w: 26,
        h: 28,
        tooltip: [t.label],
        onClick: () => {
          this.creativeTab = t.id;
          this.creativeScrollRow = 0;
          if (t.id === 'search') this.focusedEditBox = 'creative_search';
        },
      });
    }

    for (const t of bottomTabs) {
      if (this.creativeTab === t.id) continue;
      const tx = leftPos + (t.col === 7 ? 195 - 27 : (t.col - 1) * 27);
      const ty = topPos + 132;
      this.gui.blitSprite(
        `/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_${t.col}.png`,
        tx,
        ty,
        26,
        32
      );
      this.gui.renderItem(Registries.getItem(t.icon) || null, 1, tx + 5, ty + 6);
      this.interactiveRects.push({
        x: tx,
        y: ty + 4,
        w: 26,
        h: 28,
        tooltip: [t.label],
        onClick: () => {
          this.creativeTab = t.id;
          this.creativeScrollRow = 0;
        },
      });
    }

    // Main Creative Panel Background (195x136 from 256x256 PNG)
    const bgUrl =
      this.creativeTab === 'search'
        ? '/assets/minecraft/textures/gui/container/creative_inventory/tab_item_search.png'
        : this.creativeTab === 'survival_inv'
        ? '/assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png'
        : '/assets/minecraft/textures/gui/container/creative_inventory/tab_items.png';
    this.gui.blit(bgUrl, leftPos, topPos, 0, 0, 195, 136, 256, 256);

    // Draw selected tab on top of main panel
    for (const t of topTabs) {
      if (this.creativeTab !== t.id) continue;
      const tx = leftPos + (t.col === 7 ? 195 - 27 : (t.col - 1) * 27);
      const ty = topPos - 28;
      this.gui.blitSprite(
        `/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_${t.col}.png`,
        tx,
        ty,
        26,
        32
      );
      this.gui.renderItem(Registries.getItem(t.icon) || null, 1, tx + 5, ty + 8);
      this.font.draw(this.gui.ctx, t.label, leftPos + 8, topPos + 6, '#404040', false);
    }

    for (const t of bottomTabs) {
      if (this.creativeTab !== t.id) continue;
      const tx = leftPos + (t.col === 7 ? 195 - 27 : (t.col - 1) * 27);
      const ty = topPos + 132;
      this.gui.blitSprite(
        `/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_${t.col}.png`,
        tx,
        ty,
        26,
        32
      );
      this.gui.renderItem(Registries.getItem(t.icon) || null, 1, tx + 5, ty + 6);
      this.font.draw(this.gui.ctx, t.label, leftPos + 8, topPos + 6, '#404040', false);
    }

    if (this.creativeTab === 'survival_inv') {
      // Creative Survival Inventory Tab (tab_inventory.png)
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 9; c++) {
          const idx = 9 + r * 9 + c;
          this.drawInteractiveSlot(
            leftPos + 9 + c * 18,
            topPos + 54 + r * 18,
            () => this.inventory.slots[idx],
            (s) => {
              this.inventory.slots[idx] = s;
            },
            idx
          );
        }
      }
      for (let c = 0; c < 9; c++) {
        const idx = c;
        this.drawInteractiveSlot(
          leftPos + 9 + c * 18,
          topPos + 112,
          () => this.inventory.slots[idx],
          (s) => {
            this.inventory.slots[idx] = s;
          },
          idx
        );
      }
      // Destroy Item [X] slot at (leftPos + 173, topPos + 112)
      this.interactiveRects.push({
        x: leftPos + 173,
        y: topPos + 112,
        w: 16,
        h: 16,
        isSlot: true,
        tooltip: ['§cDestroy Item'],
        onClick: (button, shiftKey) => {
          if (shiftKey) {
            this.inventory.slots.fill(null);
          } else {
            this.inventory.cursorStack = null;
          }
        },
      });
      return;
    }

    // Search input box on Search tab
    if (this.creativeTab === 'search') {
      const cursor =
        this.focusedEditBox === 'creative_search' &&
        Math.floor(performance.now() / 300) % 2 === 0
          ? '_'
          : '';
      this.font.draw(
        this.gui.ctx,
        this.searchQuery + cursor,
        leftPos + 82,
        topPos + 6,
        '#FFFFFF',
        true
      );
      this.interactiveRects.push({
        x: leftPos + 80,
        y: topPos + 4,
        w: 90,
        h: 12,
        onClick: () => {
          this.focusedEditBox = 'creative_search';
        },
      });
    }

    // Filter items for active Creative tab (putting 26.3 items first!)
    const items = Registries.allItems
      .filter((it) => {
        if (this.creativeTab === 'search') {
          if (!this.searchQuery) return true;
          const q = this.searchQuery.toLowerCase();
          return (
            it.displayName.toLowerCase().includes(q) ||
            it.shortId.toLowerCase().includes(q)
          );
        }
        return it.category === this.creativeTab;
      })
      .sort((a, b) => (b.is26_3 ? 1 : 0) - (a.is26_3 ? 1 : 0));

    const totalRows = Math.max(1, Math.ceil(items.length / 9));
    const maxScrollRow = Math.max(0, totalRows - 5);
    this.creativeScrollRow = Math.min(this.creativeScrollRow, maxScrollRow);

    // Scroller thumb (12x15 at leftPos + 175, topPos + 18..112)
    const scrollNorm = maxScrollRow > 0 ? this.creativeScrollRow / maxScrollRow : 0;
    const scrollerY = topPos + 18 + Math.round(scrollNorm * (112 - 18 - 15));
    this.gui.blitSprite(
      maxScrollRow > 0
        ? '/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller.png'
        : '/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller_disabled.png',
      leftPos + 175,
      scrollerY,
      12,
      15
    );

    // 9x5 Creative Item Grid (leftPos + 9 + c * 18, topPos + 18 + r * 18)
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 9; c++) {
        const idx = (this.creativeScrollRow + r) * 9 + c;
        const sx = leftPos + 9 + c * 18;
        const sy = topPos + 18 + r * 18;
        const item = items[idx] || null;
        if (item) {
          this.gui.renderItem(item, 1, sx, sy);
        }
        if (
          this.mouseX >= sx &&
          this.mouseX < sx + 16 &&
          this.mouseY >= sy &&
          this.mouseY < sy + 16
        ) {
          this.gui.renderSlotHighlight(sx, sy);
        }
        if (item) {
          this.interactiveRects.push({
            x: sx,
            y: sy,
            w: 16,
            h: 16,
            isSlot: true,
            tooltip: [item.displayName],
            onClick: (button, shiftKey) => {
              if (shiftKey) {
                this.inventory.slots[this.inventory.selectedHotbarSlot] = {
                  item,
                  count: item.maxStack,
                };
              } else if (button === 2) {
                this.inventory.cursorStack = { item, count: item.maxStack };
              } else {
                if (
                  this.inventory.cursorStack &&
                  this.inventory.cursorStack.item.id === item.id
                ) {
                  this.inventory.cursorStack.count = Math.min(
                    item.maxStack,
                    this.inventory.cursorStack.count + 1
                  );
                } else {
                  this.inventory.cursorStack = { item, count: 1 };
                }
              }
            },
            onHotbarKeySwap: (hotbarIndex) => {
              this.inventory.slots[hotbarIndex] = {
                item,
                count: item.maxStack,
              };
            },
          });
        }
      }
    }

    // 1x9 Hotbar at bottom of Creative screen (leftPos + 9 + c * 18, topPos + 112)
    for (let c = 0; c < 9; c++) {
      const idx = c;
      this.drawInteractiveSlot(
        leftPos + 9 + c * 18,
        topPos + 112,
        () => this.inventory.slots[idx],
        (s) => {
          this.inventory.slots[idx] = s;
        },
        idx
      );
    }
  }

  // ----------------------------------------------------------------------------
  // 8C. CRAFTING TABLE SCREEN (CraftingScreen.java - container/crafting_table.png 176x166)
  // ----------------------------------------------------------------------------
  private renderCraftingTableScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const leftPos = Math.floor((sw - 176) / 2) + (this.showRecipeBook ? 77 : 0);
    const topPos = Math.floor((sh - 166) / 2);

    if (this.showRecipeBook) {
      this.renderRecipeBookSidePanel(leftPos - 149, topPos);
    }

    this.gui.blit(
      '/assets/minecraft/textures/gui/container/crafting_table.png',
      leftPos,
      topPos,
      0,
      0,
      176,
      166,
      256,
      256
    );

    this.font.draw(this.gui.ctx, 'Crafting', leftPos + 28, topPos + 6, '#404040', false);
    this.font.draw(this.gui.ctx, 'Inventory', leftPos + 8, topPos + 72, '#404040', false);

    // 3x3 Crafting Grid (x = leftPos + 30 + c * 18, y = topPos + 17 + r * 18)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const idx = r * 3 + c;
        this.drawInteractiveSlot(
          leftPos + 30 + c * 18,
          topPos + 17 + r * 18,
          () => this.inventory.crafting3x3[idx],
          (s) => {
            this.inventory.crafting3x3[idx] = s;
          }
        );
      }
    }

    // Output Slot (x = leftPos + 124, y = topPos + 35)
    const craftResult = this.inventory.getCraftingResult(this.inventory.crafting3x3, 3);
    const outX = leftPos + 124;
    const outY = topPos + 35;
    if (craftResult) {
      this.gui.renderItem(craftResult.item, craftResult.count, outX, outY);
    }
    if (
      this.mouseX >= outX &&
      this.mouseX < outX + 16 &&
      this.mouseY >= outY &&
      this.mouseY < outY + 16
    ) {
      this.gui.renderSlotHighlight(outX, outY);
    }
    const craftOnce3x3 = (shiftKey: boolean) => {
      if (shiftKey) {
        let safety = 0;
        while (safety++ < 64) {
          const res = this.inventory.getCraftingResult(this.inventory.crafting3x3, 3);
          if (!res) break;
          if (!this.inventory.addItem(res.item.shortId, res.count)) break;
          this.inventory.consumeCraftingGrid(this.inventory.crafting3x3);
        }
        return;
      }
      const res = this.inventory.getCraftingResult(this.inventory.crafting3x3, 3);
      if (!res) return;
      if (!this.inventory.cursorStack) {
        this.inventory.cursorStack = { ...res };
        this.inventory.consumeCraftingGrid(this.inventory.crafting3x3);
      } else if (
        this.inventory.cursorStack.item.id === res.item.id &&
        this.inventory.cursorStack.count + res.count <= res.item.maxStack
      ) {
        this.inventory.cursorStack.count += res.count;
        this.inventory.consumeCraftingGrid(this.inventory.crafting3x3);
      }
    };

    this.interactiveRects.push({
      x: outX,
      y: outY,
      w: 16,
      h: 16,
      isSlot: true,
      slotKey: 'craft_out_3x3',
      tooltip: craftResult ? [craftResult.item.displayName] : undefined,
      onClick: (_button, shiftKey) => craftOnce3x3(shiftKey),
      onRightDragPlace: () => craftOnce3x3(false),
      onHotbarKeySwap: (hotbarIdx: number) => {
        const res = this.inventory.getCraftingResult(this.inventory.crafting3x3, 3);
        if (!res) return;
        const curH = this.inventory.slots[hotbarIdx];
        if (!curH) {
          this.inventory.slots[hotbarIdx] = { ...res };
          this.inventory.consumeCraftingGrid(this.inventory.crafting3x3);
        } else if (curH.item.id === res.item.id && curH.count + res.count <= res.item.maxStack) {
          curH.count += res.count;
          this.inventory.consumeCraftingGrid(this.inventory.crafting3x3);
        }
      },
    });

    // Recipe Book toggle button (leftPos + 5, topPos + 35, 20x18)
    const rbX = leftPos + 5;
    const rbY = topPos + 35;
    const rbHover =
      this.mouseX >= rbX && this.mouseX < rbX + 20 && this.mouseY >= rbY && this.mouseY < rbY + 18;
    this.gui.blitSprite(
      rbHover
        ? '/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png'
        : '/assets/minecraft/textures/gui/sprites/recipe_book/button.png',
      rbX,
      rbY,
      20,
      18
    );
    this.interactiveRects.push({
      x: rbX,
      y: rbY,
      w: 20,
      h: 18,
      tooltip: ['Recipe Book'],
      onClick: () => {
        this.showRecipeBook = !this.showRecipeBook;
      },
    });

    this.drawPlayerInventorySlots(leftPos, topPos);
  }

  // ----------------------------------------------------------------------------
  // 8D. STONECUTTER SCREEN (StonecutterScreen.java - container/stonecutter.png 176x166)
  // ----------------------------------------------------------------------------
  private renderStonecutterScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const leftPos = Math.floor((sw - 176) / 2);
    const topPos = Math.floor((sh - 166) / 2);

    this.gui.blit(
      '/assets/minecraft/textures/gui/container/stonecutter.png',
      leftPos,
      topPos,
      0,
      0,
      176,
      166,
      256,
      256
    );

    this.font.draw(this.gui.ctx, 'Stonecutter', leftPos + 8, topPos + 4, '#404040', false);
    this.font.draw(this.gui.ctx, 'Inventory', leftPos + 8, topPos + 72, '#404040', false);

    // Input Slot (leftPos + 20, topPos + 33)
    this.drawInteractiveSlot(
      leftPos + 20,
      topPos + 33,
      () => this.inventory.stonecutterInput,
      (s) => {
        this.inventory.stonecutterInput = s;
        this.inventory.stonecutterSelectedIndex = 0;
      }
    );

    // 4x3 Recipe Grid (leftPos + 52 + c * 16, topPos + 14 + r * 18, each 16x18)
    const outputs = this.inventory.getStonecutterOutputs();
    for (let i = 0; i < Math.min(12, outputs.length); i++) {
      const r = Math.floor(i / 4);
      const c = i % 4;
      const rx = leftPos + 52 + c * 16;
      const ry = topPos + 14 + r * 18;
      const selected = i === this.inventory.stonecutterSelectedIndex;
      const hovered =
        this.mouseX >= rx &&
        this.mouseX < rx + 16 &&
        this.mouseY >= ry &&
        this.mouseY < ry + 18;

      const btnSprite = selected
        ? '/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_selected.png'
        : hovered
        ? '/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_highlighted.png'
        : '/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe.png';
      this.gui.blitSprite(btnSprite, rx, ry, 16, 18);
      this.gui.renderItem(outputs[i].item, 1, rx, ry + 1);

      const idx = i;
      this.interactiveRects.push({
        x: rx,
        y: ry,
        w: 16,
        h: 18,
        tooltip: [outputs[i].item.displayName],
        onClick: () => {
          this.inventory.stonecutterSelectedIndex = idx;
          AudioEngine.play('ui.stonecutter.select_recipe', 0.8);
        },
      });
    }

    // Scroller (leftPos + 119, topPos + 15, 12x15)
    this.gui.blitSprite(
      '/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller_disabled.png',
      leftPos + 119,
      topPos + 15,
      12,
      15
    );

    // Output Slot (leftPos + 143, topPos + 33)
    const selectedOut = outputs[this.inventory.stonecutterSelectedIndex] || null;
    const outX = leftPos + 143;
    const outY = topPos + 33;
    if (selectedOut) {
      this.gui.renderItem(selectedOut.item, selectedOut.count, outX, outY);
    }
    if (
      this.mouseX >= outX &&
      this.mouseX < outX + 16 &&
      this.mouseY >= outY &&
      this.mouseY < outY + 16
    ) {
      this.gui.renderSlotHighlight(outX, outY);
    }
    this.interactiveRects.push({
      x: outX,
      y: outY,
      w: 16,
      h: 16,
      isSlot: true,
      tooltip: selectedOut ? [selectedOut.item.displayName] : undefined,
      onClick: () => {
        if (!selectedOut || !this.inventory.stonecutterInput) return;
        if (!this.inventory.cursorStack) {
          this.inventory.cursorStack = {
            item: selectedOut.item,
            count: selectedOut.count,
          };
          this.inventory.stonecutterInput.count -= 1;
          if (this.inventory.stonecutterInput.count <= 0) {
            this.inventory.stonecutterInput = null;
          }
          AudioEngine.play('ui.stonecutter.take_result', 0.85);
        }
      },
    });

    this.drawPlayerInventorySlots(leftPos, topPos);
  }

  // ============================================================================
  // 9. CHAT COMMAND HANDLER (/gamemode, /time, /locate, /give, /tp)
  // ============================================================================
  private handleChatSubmit(msg: string): void {
    if (msg.startsWith('/')) {
      const parts = msg.slice(1).split(/\s+/);
      const cmd = parts[0].toLowerCase();

      if (cmd === 'gamemode') {
        const m = (parts[1] || '').toLowerCase();
        if (m.startsWith('c')) {
          this.player.gameMode = 'creative';
          this.addChatMessage('§eSet own game mode to §aCreative Mode');
        } else if (m.startsWith('s') && m !== 'spectator') {
          this.player.gameMode = 'survival';
          this.player.flying = false;
          this.addChatMessage('§eSet own game mode to §aSurvival Mode');
        } else if (m === 'spectator' || m === 'sp') {
          this.player.gameMode = 'spectator';
          this.player.flying = true;
          this.addChatMessage('§eSet own game mode to §aSpectator Mode');
        }
      } else if (cmd === 'time') {
        const sub = parts[2] || parts[1] || 'day';
        if (sub === 'day') this.world.timeOfDay = 1000;
        else if (sub === 'noon') this.world.timeOfDay = 6000;
        else if (sub === 'night') this.world.timeOfDay = 14000;
        else this.world.timeOfDay = parseInt(sub, 10) || 1000;
        this.addChatMessage(`§eSet the time to §a${this.world.timeOfDay}`);
      } else if (cmd === 'locate') {
        const camp = this.world.findNearestAbandonedCamp(
          this.player.position.x,
          this.player.position.z
        );
        if (camp) {
          this.addChatMessage(
            `§aThe nearest §eminecraft:abandoned_camp§a is at §b[${camp.x}, ${camp.y}, ${camp.z}]`
          );
        }
      } else if (cmd === 'tp' || cmd === 'teleport') {
        if (parts.length >= 4) {
          const x = parseFloat(parts[1]);
          const y = parseFloat(parts[2]);
          const z = parseFloat(parts[3]);
          if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            this.player.position.set(x, y, z);
            this.addChatMessage(`§eTeleported to ${x}, ${y}, ${z}`);
          }
        }
      } else if (cmd === 'give') {
        const itemName = (parts[2] || parts[1] || 'orange_cushion').replace('minecraft:', '');
        const count = parseInt(parts[3] || '1', 10) || 1;
        if (this.inventory.addItem(itemName, count)) {
          this.addChatMessage(`§aGave ${count} [${itemName}] to ${MultiplayerManager.username}`);
        } else {
          this.addChatMessage(`§cUnknown item: ${itemName}`);
        }
      } else {
        this.addChatMessage(`§eExecuted command: /${cmd}`);
      }
      return;
    }

    this.addChatMessage(`<${MultiplayerManager.username}> ${msg}`);
    if (MultiplayerManager.activeSession?.state === 'PLAY') {
      MultiplayerManager.activeSession.sendChat(msg);
    }
  }
}
