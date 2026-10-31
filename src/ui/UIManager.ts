// Official Minecraft 26.3 Pixel-Perfect GUI & Screen Manager
// Renders 100% of screens, containers, buttons, sliders, HUD, and bitmap text onto a crisp GuiGraphics Canvas.

import { Player } from '../gameplay/Player';
import { Inventory, ItemStack, ContainerManager } from '../gameplay/Inventory';
import { World } from '../world/World';
import { Registries, ItemDefinition } from '../core/Registries';
import { OptionsManager, DEFAULT_KEYBINDS, KeyBinds } from '../core/Options';
import { AudioEngine } from '../core/AudioEngine';
import { MultiplayerManager, ServerEntry } from '../network/MultiplayerManager';
import { MinecraftFont } from './MinecraftFont';
import { GuiGraphics } from './GuiGraphics';
import { ItemIconRenderer } from '../render/ItemIconRenderer';
import { WorldGen26_3 } from '../world/WorldGen26_3';
import { WebGPUContext } from '../render/WebGPUContext';
import { TextureAtlas } from '../render/TextureAtlas';
import { ResourcePackManager } from '../core/ResourcePackManager';
import { CommandEngine } from '../gameplay/CommandEngine';

export type UIState =
  | 'TITLE'
  | 'SINGLEPLAYER_SELECT'
  | 'CONFIRM_DELETE_WORLD'
  | 'CREATE_WORLD'
  | 'MULTIPLAYER_SELECT'
  | 'WISPCRAFT_CONFIG'
  | 'CONNECTING'
  | 'OPTIONS'
  | 'CONTROLS'
  | 'MOUSE_SETTINGS'
  | 'KEY_BINDS'
  | 'SOUND_OPTIONS'
  | 'VIDEO_SETTINGS'
  | 'SKIN_CUSTOMIZATION'
  | 'CHAT_SETTINGS'
  | 'RESOURCE_PACKS'
  | 'ACCESSIBILITY'
  | 'LANGUAGE'
  | 'TELEMETRY'
  | 'CREDITS'
  | 'GAME_OVER'
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
  gameMode: 'creative' | 'survival' | 'spectator';
  isHardcore?: boolean;
  allowCommands?: boolean;
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
  public activeWorldIsHardcore = false;
  public activeContainerTab: 'inventory' | 'crafting' | 'stonecutter' | 'furnace' | 'chest' | 'barrel' = 'inventory';
  public activeContainerBlockPos: string = '';
  public rebindingKey: keyof typeof OptionsManager.current.keyBinds | null = null;
  public keyBindsScrollY = 0;
  public keyBindsMaxScrollY = 0;

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
  private recipeBookPage = 0;
  private focusedEditBox: 'world_search' | 'world_name' | 'world_seed' | 'direct_ip' | 'wisp_url' | 'wisp_user' | 'creative_search' | 'chat' | null = null;
  public optionsReturnState: UIState = 'TITLE';

  // Text field states
  private worldSearchText = '';
  private newWorldName = 'New World';
  private newWorldSeed = '';
  private newWorldMode: 'survival' | 'hardcore' | 'creative' = 'survival';
  private newWorldDifficulty: 'Peaceful' | 'Easy' | 'Normal' | 'Hard' = 'Normal';
  private newWorldAllowCommands = true;
  private createWorldTab: 0 | 1 | 2 = 0;

  private savedWorlds: SavedWorldEntry[] = [];
  private selectedWorldIdx = 0;

  // Multiplayer state
  private selectedServerIdx = 0;
  private directConnectModal = false;
  private directConnectIp = '127.0.0.1:25565';
  private connectingStatus = 'Connecting to server...';

  // HUD state
  public showDebugF3 = false;
  public showPlayerList = false;
  public fps = 60;
  public splashText = SPLASH_TEXTS[0];
  public chatHistory: Array<{ text: string; time: number }> = [];
  public chatInputText = '';
  public commandSuggestions: string[] = [];
  public commandSuggestionIndex = 0;
  public commandSuggestionHint = '';
  public commandTokenStart = 0;
  public commandTokenEnd = 0;
  private commandHistory: string[] = [];
  private commandHistoryIdx = -1;
  private heldItemTooltipTimer = 0;
  private lastHeldItemId = '';

  // Toast notification
  private activeToast: { title: string; subtitle: string; item: ItemDefinition | null; startTime: number } | null = null;

  public activeWorldId = 'world_survival_random';
  public unlockedAdvancements = new Set<string>(['root']);
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
        if (Array.isArray(parsed)) {
          this.savedWorlds = parsed.filter(
            (w: SavedWorldEntry) =>
              !w.folder?.includes('10/28/26') &&
              w.id !== 'world_survival_random' &&
              w.id !== 'world_creative_random'
          );
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
    if (newState === 'OPTIONS' && (this.state === 'PAUSE' || this.state === 'TITLE')) {
      this.optionsReturnState = this.state;
    }
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
        this.updateCommandAutofill();
      } else if (newState === 'INVENTORY' && this.creativeTab === 'search' && this.player.gameMode === 'creative') {
        this.focusedEditBox = 'creative_search';
      }
    }

    if (newState !== 'CHAT') {
      this.commandSuggestions = [];
      this.commandSuggestionHint = '';
      this.commandSuggestionIndex = 0;
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

      if (this.state === 'CHAT') {
        if (this.mouseY < this.gui.scaledHeight - 20) {
          this.chatInputText = '';
          this.setState('IN_GAME');
          return;
        } else {
          this.focusedEditBox = 'chat';
        }
      } else {
        this.focusedEditBox = null;
      }
      if (this.rebindingKey) {
        OptionsManager.current.keyBinds[this.rebindingKey] = `Mouse${e.button}`;
        OptionsManager.save();
        this.rebindingKey = null;
        return;
      }
      const kb = OptionsManager.current.keyBinds;
      const isUseButton = kb?.use ? kb.use === `Mouse${e.button}` : e.button === 2;
      const isAttackButton = kb?.attack ? kb.attack === `Mouse${e.button}` : e.button === 0;

      if (isUseButton) {
        this.isRightMouseDown = true;
        this.rightHoldTimer = 0;
        this.rightRepeatTimer = 0;
      } else if (isAttackButton) {
        this.isLeftMouseDown = true;
        this.rightHoldTimer = 0;
        this.rightRepeatTimer = 0;
        this.leftDragItem = null;
        this.leftDragTotalCount = 0;
        this.leftDragSlots = [];
      }

      // Check click on Command Suggestion item if chat is open
      if (this.state === 'CHAT' && this.commandSuggestions.length > 0 && e.button === 0) {
        const sh = this.gui.scaledHeight;
        const maxVisible = Math.min(10, this.commandSuggestions.length);
        let startIdx = 0;
        if (this.commandSuggestionIndex >= maxVisible) {
          startIdx = this.commandSuggestionIndex - maxVisible + 1;
        }
        const boxH = maxVisible * 12 + 4;
        const boxY = sh - 16 - boxH;
        let maxTextW = 120;
        for (let i = 0; i < maxVisible; i++) {
          const s = this.commandSuggestions[startIdx + i];
          if (s) {
            const w = this.font.width(s);
            if (w > maxTextW) maxTextW = w;
          }
        }
        const boxW = Math.min(this.gui.scaledWidth - 20, maxTextW + 16);
        if (
          this.mouseX >= 2 &&
          this.mouseX <= 2 + boxW &&
          this.mouseY >= boxY &&
          this.mouseY <= boxY + boxH
        ) {
          const clickedRow = Math.floor((this.mouseY - (boxY + 2)) / 12);
          const targetIdx = startIdx + clickedRow;
          if (targetIdx >= 0 && targetIdx < this.commandSuggestions.length) {
            const selected = this.commandSuggestions[targetIdx];
            if (selected && !selected.startsWith('<')) {
              const before = this.chatInputText.slice(0, this.commandTokenStart);
              this.chatInputText = before + selected + ' ';
              this.updateCommandAutofill();
              AudioEngine.play('ui.button.click', 0.6);
            }
          }
          return;
        }
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
            if (isUseButton && r.slotKey) {
              this.lastRightDragSlotKey = r.slotKey;
            }
            // Check for Double-Left-Click on a slot (`ClickType.PICKUP_ALL`) to gather all matching items!
            if (
              isAttackButton &&
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
              isAttackButton &&
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
            const effectiveButton = isUseButton ? 2 : (isAttackButton ? 0 : e.button);
            r.onClick(effectiveButton, e.shiftKey);
            return;
          }
        }
      }

      // Click outside container window drops cursor item into the world as a 3D dropped item entity!
      if (this.state === 'INVENTORY' && this.inventory.cursorStack) {
        const dropCount = isUseButton ? 1 : this.inventory.cursorStack.count;
        const dropId = this.inventory.cursorStack.item.shortId;
        this.inventory.cursorStack.count -= dropCount;
        if (this.inventory.cursorStack.count <= 0) {
          this.inventory.cursorStack = null;
        }
        const yaw = this.player.yaw;
        const pitch = this.player.pitch;
        const f1 = Math.cos(pitch);
        const tossSpeed = 0.38;
        const vx = -Math.sin(yaw) * f1 * tossSpeed;
        const vy = -Math.sin(pitch) * tossSpeed + 0.18;
        const vz = -Math.cos(yaw) * f1 * tossSpeed;
        this.world.entityRenderer.spawnDroppedItem(
          this.player.position.x - Math.sin(yaw) * 0.4,
          this.player.position.y + 1.25,
          this.player.position.z - Math.cos(yaw) * 0.4,
          dropId,
          dropCount,
          vx * 15.0,
          vy * 16.0,
          vz * 15.0,
          1.8
        );
        AudioEngine.play('entity.item.pickup', 0.5, 0.8);
      }
    });

    window.addEventListener('mouseup', (e) => {
      this.activeSlider = null;
      const kb = OptionsManager.current.keyBinds;
      const isUseButton = kb?.use ? kb.use === `Mouse${e.button}` : e.button === 2;
      const isAttackButton = kb?.attack ? kb.attack === `Mouse${e.button}` : e.button === 0;
      if (isUseButton) {
        this.isRightMouseDown = false;
        this.lastRightDragSlotKey = '';
      }
      if (isAttackButton) {
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
      } else if (this.state === 'KEY_BINDS') {
        const dir = e.deltaY > 0 ? 24 : -24;
        this.keyBindsScrollY = Math.max(
          0,
          Math.min(this.keyBindsMaxScrollY, this.keyBindsScrollY + dir)
        );
      }
    });

    window.addEventListener('keydown', (e) => {
      if (this.rebindingKey) {
        e.preventDefault();
        if (e.code !== 'Escape') {
          OptionsManager.current.keyBinds[this.rebindingKey] = e.code;
          OptionsManager.save();
        }
        this.rebindingKey = null;
        return;
      }

      // Escape always closes Chat or releases focused EditBox
      if (e.key === 'Escape') {
        if (this.state === 'CHAT') {
          if (this.commandSuggestions.length > 0) {
            this.commandSuggestions = [];
            this.commandSuggestionHint = '';
          } else {
            this.chatInputText = '';
            this.setState('IN_GAME');
          }
          return;
        } else if (this.focusedEditBox) {
          this.focusedEditBox = null;
          return;
        }
      }

      // Tab key autocompletes selected command suggestion
      if (this.state === 'CHAT' && e.key === 'Tab') {
        e.preventDefault();
        if (this.commandSuggestions.length > 0) {
          const selected = this.commandSuggestions[this.commandSuggestionIndex];
          if (selected && !selected.startsWith('<')) {
            const before = this.chatInputText.slice(0, this.commandTokenStart);
            this.chatInputText = before + selected + ' ';
            this.updateCommandAutofill();
          }
        }
        return;
      }

      // Arrow keys navigate command suggestions or history
      if (this.state === 'CHAT' && e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.commandSuggestions.length > 0) {
          this.commandSuggestionIndex =
            (this.commandSuggestionIndex - 1 + this.commandSuggestions.length) %
            this.commandSuggestions.length;
        } else if (this.commandHistory.length > 0) {
          if (this.commandHistoryIdx === -1) {
            this.commandHistoryIdx = this.commandHistory.length - 1;
          } else if (this.commandHistoryIdx > 0) {
            this.commandHistoryIdx--;
          }
          this.chatInputText = this.commandHistory[this.commandHistoryIdx] || '';
          this.updateCommandAutofill();
        }
        return;
      }

      if (this.state === 'CHAT' && e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.commandSuggestions.length > 0) {
          this.commandSuggestionIndex =
            (this.commandSuggestionIndex + 1) % this.commandSuggestions.length;
        } else if (this.commandHistoryIdx !== -1) {
          if (this.commandHistoryIdx < this.commandHistory.length - 1) {
            this.commandHistoryIdx++;
            this.chatInputText = this.commandHistory[this.commandHistoryIdx] || '';
          } else {
            this.commandHistoryIdx = -1;
            this.chatInputText = '';
          }
          this.updateCommandAutofill();
        }
        return;
      }

      // Pressing Q / Ctrl+Q in Container/Inventory screen drops hovered slot item(s)
      const kbDrop = OptionsManager.current.keyBinds?.drop || 'KeyQ';
      if (
        this.state === 'INVENTORY' &&
        !this.focusedEditBox &&
        e.code === kbDrop
      ) {
        for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
          const r = this.interactiveRects[i];
          if (
            r.isSlot &&
            r.getSlot &&
            r.setSlot &&
            this.mouseX >= r.x &&
            this.mouseX < r.x + r.w &&
            this.mouseY >= r.y &&
            this.mouseY < r.y + r.h
          ) {
            const current = r.getSlot();
            if (current && current.count > 0) {
              e.preventDefault();
              const dropCount = e.ctrlKey ? current.count : 1;
              const dropId = current.item.shortId;
              current.count -= dropCount;
              if (current.count <= 0) {
                r.setSlot(null);
              }
              const yaw = this.player.yaw;
              const pitch = this.player.pitch;
              const f1 = Math.cos(pitch);
              const tossSpeed = 0.38;
              const vx = -Math.sin(yaw) * f1 * tossSpeed;
              const vy = -Math.sin(pitch) * tossSpeed + 0.18;
              const vz = -Math.cos(yaw) * f1 * tossSpeed;
              this.world.entityRenderer.spawnDroppedItem(
                this.player.position.x - Math.sin(yaw) * 0.4,
                this.player.position.y + 1.25,
                this.player.position.z - Math.cos(yaw) * 0.4,
                dropId,
                dropCount,
                vx * 15.0,
                vy * 16.0,
                vz * 15.0,
                1.8
              );
              AudioEngine.play('entity.item.pickup', 0.5, 0.8);
              this.updateHUDOnly();
              return;
            }
          }
        }
      }

      // Pressing Attack Key (e.g. custom keyboard keybind) in Container/Inventory screen handles slot left-click
      const kbAttack = OptionsManager.current.keyBinds?.attack || 'Mouse0';
      if (
        this.state === 'INVENTORY' &&
        !this.focusedEditBox &&
        kbAttack &&
        !kbAttack.startsWith('Mouse') &&
        e.code === kbAttack
      ) {
        for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
          const r = this.interactiveRects[i];
          if (
            r.isSlot &&
            this.mouseX >= r.x &&
            this.mouseX < r.x + r.w &&
            this.mouseY >= r.y &&
            this.mouseY < r.y + r.h
          ) {
            e.preventDefault();
            r.onClick?.(0, e.shiftKey);
            this.updateHUDOnly();
            this.render();
            return;
          }
        }
      }

      // Pressing Use Key (e.g. custom keybind like KeyR) in Container/Inventory screen handles slot interaction
      const kbUse = OptionsManager.current.keyBinds?.use || 'Mouse2';
      if (
        this.state === 'INVENTORY' &&
        !this.focusedEditBox &&
        e.code === kbUse
      ) {
        for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
          const r = this.interactiveRects[i];
          if (
            r.isSlot &&
            this.mouseX >= r.x &&
            this.mouseX < r.x + r.w &&
            this.mouseY >= r.y &&
            this.mouseY < r.y + r.h
          ) {
            e.preventDefault();
            this.isRightMouseDown = true;
            this.lastRightDragSlotKey = r.slotKey || '';
            this.rightHoldTimer = 0;
            this.rightRepeatTimer = 0;
            if (this.inventory.cursorStack) {
              if (r.onRightDragPlace) {
                r.onRightDragPlace();
              } else if (r.onClick) {
                r.onClick(2, e.shiftKey);
              }
            } else {
              r.onClick?.(2, e.shiftKey);
            }
            this.updateHUDOnly();
            this.render();
            return;
          }
        }
      }

      // Hotbar keys in Container/Inventory screens swap hovered slot with Hotbar slot 0..8
      const hotbarKeyCodes = [
        OptionsManager.current.keyBinds?.hotbar1 || 'Digit1',
        OptionsManager.current.keyBinds?.hotbar2 || 'Digit2',
        OptionsManager.current.keyBinds?.hotbar3 || 'Digit3',
        OptionsManager.current.keyBinds?.hotbar4 || 'Digit4',
        OptionsManager.current.keyBinds?.hotbar5 || 'Digit5',
        OptionsManager.current.keyBinds?.hotbar6 || 'Digit6',
        OptionsManager.current.keyBinds?.hotbar7 || 'Digit7',
        OptionsManager.current.keyBinds?.hotbar8 || 'Digit8',
        OptionsManager.current.keyBinds?.hotbar9 || 'Digit9',
      ];
      const hbSlotIdx = hotbarKeyCodes.indexOf(e.code);
      if (
        this.state === 'INVENTORY' &&
        !this.focusedEditBox &&
        hbSlotIdx !== -1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
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
            r.onHotbarKeySwap(hbSlotIdx);
            return;
          }
        }
      }

      // Swap Offhand Key in Container/Inventory screens swaps hovered slot with Offhand slot
      const kbOffhand = OptionsManager.current.keyBinds?.swapOffhand || 'KeyF';
      if (
        this.state === 'INVENTORY' &&
        !this.focusedEditBox &&
        e.code === kbOffhand &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        for (let i = this.interactiveRects.length - 1; i >= 0; i--) {
          const r = this.interactiveRects[i];
          if (
            r.isSlot &&
            r.getSlot &&
            r.setSlot &&
            this.mouseX >= r.x &&
            this.mouseX < r.x + r.w &&
            this.mouseY >= r.y &&
            this.mouseY < r.y + r.h
          ) {
            e.preventDefault();
            const slotStack = r.getSlot();
            const offhandStack = this.inventory.offhandSlot;
            r.setSlot(offhandStack);
            this.inventory.offhandSlot = slotStack;
            AudioEngine.play('item.armor.equip_generic', 0.6);
            this.updateHUDOnly();
            this.render();
            return;
          }
        }
      }

      if (!this.focusedEditBox) return;

      if (e.key === 'Enter') {
        if (this.state === 'CHAT') {
          const msg = this.chatInputText.trim();
          this.chatInputText = '';
          this.commandSuggestions = [];
          this.commandSuggestionHint = '';
          this.commandHistoryIdx = -1;
          if (msg) {
            if (this.commandHistory[this.commandHistory.length - 1] !== msg) {
              this.commandHistory.push(msg);
            }
            this.handleChatSubmit(msg);
          }
          this.setState('IN_GAME');
          return;
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

    window.addEventListener('keyup', (e) => {
      const kbUse = OptionsManager.current.keyBinds?.use || 'Mouse2';
      if (e.code === kbUse) {
        this.isRightMouseDown = false;
        this.lastRightDragSlotKey = '';
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
        this.updateCommandAutofill();
        break;
    }
  }

  public updateCommandAutofill(): void {
    if (this.chatInputText.startsWith('/')) {
      const res = CommandEngine.getSuggestions(this.chatInputText);
      this.commandSuggestions = res.suggestions;
      this.commandTokenStart = res.tokenStart;
      this.commandTokenEnd = res.tokenEnd;
      this.commandSuggestionHint = res.hint;
      if (this.commandSuggestionIndex >= this.commandSuggestions.length) {
        this.commandSuggestionIndex = 0;
      }
    } else {
      this.commandSuggestions = [];
      this.commandSuggestionHint = '';
      this.commandSuggestionIndex = 0;
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
      case 'CONFIRM_DELETE_WORLD':
        this.renderConfirmDeleteWorldScreen();
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
      case 'CONTROLS':
        this.renderControlsScreen();
        break;
      case 'MOUSE_SETTINGS':
        this.renderMouseSettingsScreen();
        break;
      case 'KEY_BINDS':
        this.renderKeyBindsScreen();
        break;
      case 'SOUND_OPTIONS':
        this.renderSoundOptionsScreen();
        break;
      case 'VIDEO_SETTINGS':
        this.renderVideoSettingsScreen();
        break;
      case 'SKIN_CUSTOMIZATION':
        this.renderSkinCustomizationScreen();
        break;
      case 'CHAT_SETTINGS':
        this.renderChatSettingsScreen();
        break;
      case 'RESOURCE_PACKS':
        this.renderResourcePacksScreen();
        break;
      case 'ACCESSIBILITY':
        this.renderAccessibilityScreen();
        break;
      case 'LANGUAGE':
        this.renderLanguageScreen();
        break;
      case 'TELEMETRY':
        this.renderTelemetryScreen();
        break;
      case 'CREDITS':
        this.renderCreditsScreen();
        break;
      case 'GAME_OVER':
        this.renderGameOverScreen();
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
        this.optionsReturnState = 'TITLE';
        this.setState('LANGUAGE');
      },
      ['Language...']
    );

    this.addButton(centerX - 100, bottomRowY, 98, 20, 'Options...', () => {
      this.optionsReturnState = 'TITLE';
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
        this.optionsReturnState = 'TITLE';
        this.setState('ACCESSIBILITY');
      },
      ['Accessibility Settings...']
    );

    // Bottom-left version text & Bottom-right copyright text
    this.font.draw(ctx, 'Minecraft 26.3 (Web Port by BroChilllz)', 2, sh - 10, '#FFFFFF', true);
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
        if (this.savedWorlds.length > 0) {
          this.setState('CONFIRM_DELETE_WORLD');
        }
      },
      this.savedWorlds.length > 0
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

  private renderConfirmDeleteWorldScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const centerY = Math.floor(sh / 2);

    this.gui.renderMenuBackground(false);
    this.font.drawCentered(
      this.gui.ctx,
      'Are you sure you want to delete this world?',
      centerX,
      centerY - 45,
      '#FFFFFF',
      true
    );

    const w = this.savedWorlds[this.selectedWorldIdx];
    const worldName = w ? w.name : 'This world';
    this.font.drawCentered(
      this.gui.ctx,
      `'${worldName}' will be lost forever! (A long time!)`,
      centerX,
      centerY - 25,
      '#AAAAAA',
      true
    );

    this.addButton(centerX - 105, centerY + 20, 100, 20, 'Delete', () => {
      if (this.savedWorlds.length > 0) {
        const removed = this.savedWorlds.splice(this.selectedWorldIdx, 1)[0];
        if (removed) {
          try {
            localStorage.removeItem(`mc26_3_world_state_${removed.id}`);
          } catch {}
        }
        this.selectedWorldIdx = Math.max(0, Math.min(this.selectedWorldIdx, this.savedWorlds.length - 1));
        this.saveWorldsList();
      }
      this.setState('SINGLEPLAYER_SELECT');
    });

    this.addButton(centerX + 5, centerY + 20, 100, 20, 'Cancel', () => {
      this.setState('SINGLEPLAYER_SELECT');
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
        w.gameMode = this.player.gameMode;
        w.lastPlayed = `${dateStr}, ${timeStr} - ${w.isHardcore ? 'Hardcore' : w.gameMode === 'creative' ? 'Creative' : w.gameMode === 'spectator' ? 'Spectator' : 'Survival'} Mode`;
        this.saveWorldsList();
      }

      const payload = {
        timeOfDay: this.world.timeOfDay,
        blockDiffs: Array.from(this.world.blockDiffs.entries()),
        unlockedAdvancements: Array.from(this.unlockedAdvancements),
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

      if (Array.isArray(data.unlockedAdvancements)) {
        this.unlockedAdvancements = new Set(data.unlockedAdvancements);
      } else {
        this.unlockedAdvancements = new Set(['root']);
      }

      this.player.position.set(data.player.x, data.player.y, data.player.z);
      this.player.yaw = data.player.yaw || 0;
      this.player.pitch = data.player.pitch || 0;
      const w = this.savedWorlds.find((entry) => entry.id === this.activeWorldId);
      this.player.gameMode = data.player?.gameMode || w?.gameMode || 'survival';
      this.player.flying = !!data.player.flying || this.player.gameMode === 'spectator';
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
    if (!w) return;
    this.activeWorldId = w.id;
    this.activeWorldIsHardcore = !!w.isHardcore;
    if (w.isHardcore) {
      OptionsManager.current.difficulty = 'Hard';
    }
    this.player.gameMode = w.gameMode;
    this.player.flying = false;
    this.world.allowCommands = w.allowCommands !== undefined ? w.allowCommands : true;
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
          : this.newWorldMode === 'hardcore'
          ? 'Game Mode: Hardcore'
          : 'Game Mode: Survival';
      this.addButton(centerX - 104, 82, 208, 20, modeLabel, () => {
        this.newWorldMode =
          this.newWorldMode === 'survival'
            ? 'hardcore'
            : this.newWorldMode === 'hardcore'
            ? 'creative'
            : 'survival';
        if (this.newWorldMode === 'hardcore') {
          this.newWorldDifficulty = 'Hard';
        }
      });

      const modeDesc =
        this.newWorldMode === 'hardcore'
          ? '§7Same as survival mode, locked at hardest difficulty, and one life only'
          : this.newWorldMode === 'creative'
          ? '§7Unlimited resources, free flying and destroy blocks instantly'
          : '§7Search for resources, crafting, gain levels, health and hunger';
      this.font.drawCentered(this.gui.ctx, modeDesc, centerX, 106, '#808080', true);

      const diffLabel =
        this.newWorldMode === 'hardcore'
          ? 'Difficulty: Hard'
          : `Difficulty: ${this.newWorldDifficulty}`;
      this.addButton(
        centerX - 104,
        118,
        208,
        20,
        diffLabel,
        () => {
          if (this.newWorldMode === 'hardcore') return;
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

      this.addButton(
        centerX - 104,
        144,
        208,
        20,
        `Allow Commands: ${this.newWorldAllowCommands ? 'ON' : 'OFF'}`,
        () => {
          this.newWorldAllowCommands = !this.newWorldAllowCommands;
        }
      );
    } else if (this.createWorldTab === 1) {
      // World Tab
      this.addButton(
        centerX - 154,
        48,
        150,
        20,
        'World Type: Default',
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
    } else {
      // More Tab
      this.addButton(centerX - 104, 54, 208, 20, 'Game Rules...', () => {});
      this.addButton(centerX - 104, 82, 208, 20, 'Experiments...', () => {});
      this.addButton(centerX - 104, 110, 208, 20, 'Data Packs...', () => {});
    }

    this.addButton(centerX - 154, sh - 28, 150, 20, 'Create New World', () => {
      const randomSeed = String(Math.floor(Math.random() * 0x7fffffff));
      const finalSeed = this.newWorldSeed.trim() || randomSeed;
      const isHardcore = this.newWorldMode === 'hardcore';
      const created: SavedWorldEntry = {
        id: `world_${Date.now()}`,
        name: this.newWorldName.trim() || 'New World',
        folder: `${(this.newWorldName.trim() || 'New_World').replace(/[^a-zA-Z0-9_-]/g, '_')}`,
        lastPlayed: `${isHardcore ? 'Hardcore' : this.newWorldMode === 'creative' ? 'Creative' : 'Survival'} Mode`,
        gameMode: this.newWorldMode === 'creative' ? 'creative' : 'survival',
        isHardcore,
        allowCommands: this.newWorldAllowCommands,
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
      this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Options', centerX, 11, '#FFFFFF', true);

    // Row 1: FOV Slider & Difficulty Toggle
    const fovNorm = (opts.fov - 30) / 80;
    const fovText = opts.fov === 70 ? 'FOV: Normal' : opts.fov === 110 ? 'FOV: Quake Pro' : `FOV: ${opts.fov}`;
    this.addSlider(centerX - 155, 42, 150, 20, fovText, fovNorm, (n) => {
      opts.fov = Math.round(30 + n * 80);
      this.player.camera.fov = opts.fov;
      this.player.camera.updateProjectionMatrix();
      OptionsManager.save();
    });

    const diffLabel = this.activeWorldIsHardcore
      ? 'Difficulty: Hard'
      : `Difficulty: ${opts.difficulty}`;
    this.addButton(centerX + 5, 42, 150, 20, diffLabel, () => {
      if (this.activeWorldIsHardcore) return;
      const order: Array<typeof opts.difficulty> = ['Peaceful', 'Easy', 'Normal', 'Hard'];
      opts.difficulty = order[(order.indexOf(opts.difficulty) + 1) % order.length];
      OptionsManager.save();
    });

    // Row 2: Skin Customization... & Music & Sounds...
    this.addButton(centerX - 155, 66, 150, 20, 'Skin Customization...', () => {
      this.setState('SKIN_CUSTOMIZATION');
    });
    this.addButton(centerX + 5, 66, 150, 20, 'Music & Sounds...', () => {
      this.setState('SOUND_OPTIONS');
    });

    // Row 3: Video Settings... & Controls...
    this.addButton(centerX - 155, 90, 150, 20, 'Video Settings...', () => {
      this.setState('VIDEO_SETTINGS');
    });
    this.addButton(centerX + 5, 90, 150, 20, 'Controls...', () => {
      this.setState('CONTROLS');
    });

    // Row 4: Language... & Chat Settings...
    this.addButton(centerX - 155, 114, 150, 20, 'Language...', () => {
      this.setState('LANGUAGE');
    });
    this.addButton(centerX + 5, 114, 150, 20, 'Chat Settings...', () => {
      this.setState('CHAT_SETTINGS');
    });

    // Row 5: Resource Packs... & Accessibility Settings...
    this.addButton(centerX - 155, 138, 150, 20, 'Resource Packs...', () => {
      this.setState('RESOURCE_PACKS');
    });
    this.addButton(centerX + 5, 138, 150, 20, 'Accessibility Settings...', () => {
      this.setState('ACCESSIBILITY');
    });

    // Row 6: Telemetry Data... & Credits and Attribution...
    this.addButton(centerX - 155, 162, 150, 20, 'Telemetry Data...', () => {
      this.setState('TELEMETRY');
    });
    this.addButton(centerX + 5, 162, 150, 20, 'Credits and Attribution...', () => {
      this.setState('CREDITS');
    });

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.optionsReturnState || 'TITLE');
    });
  }

  // ============================================================================
  // 5a-1. SKIN CUSTOMIZATION SCREEN (SkinCustomizationScreen.java)
  // ============================================================================
  private skinLayers = {
    cape: true,
    jacket: true,
    leftSleeve: true,
    rightSleeve: true,
    leftPants: true,
    rightPants: true,
    hat: true,
    mainHand: 'Right' as 'Right' | 'Left',
  };

  private renderSkinCustomizationScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Skin Customization', centerX, 11, '#FFFFFF', true);

    const s = this.skinLayers;
    this.addButton(centerX - 155, 42, 150, 20, `Cape: ${s.cape ? 'ON' : 'OFF'}`, () => { s.cape = !s.cape; });
    this.addButton(centerX + 5, 42, 150, 20, `Jacket: ${s.jacket ? 'ON' : 'OFF'}`, () => { s.jacket = !s.jacket; });

    this.addButton(centerX - 155, 66, 150, 20, `Left Sleeve: ${s.leftSleeve ? 'ON' : 'OFF'}`, () => { s.leftSleeve = !s.leftSleeve; });
    this.addButton(centerX + 5, 66, 150, 20, `Right Sleeve: ${s.rightSleeve ? 'ON' : 'OFF'}`, () => { s.rightSleeve = !s.rightSleeve; });

    this.addButton(centerX - 155, 90, 150, 20, `Left Pants Leg: ${s.leftPants ? 'ON' : 'OFF'}`, () => { s.leftPants = !s.leftPants; });
    this.addButton(centerX + 5, 90, 150, 20, `Right Pants Leg: ${s.rightPants ? 'ON' : 'OFF'}`, () => { s.rightPants = !s.rightPants; });

    this.addButton(centerX - 155, 114, 150, 20, `Hat: ${s.hat ? 'ON' : 'OFF'}`, () => { s.hat = !s.hat; });
    this.addButton(centerX + 5, 114, 150, 20, `Main Hand: ${s.mainHand}`, () => {
      s.mainHand = s.mainHand === 'Right' ? 'Left' : 'Right';
    });

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState('OPTIONS');
    });
  }

  // ============================================================================
  // 5a-2. CHAT SETTINGS SCREEN (ChatOptionsScreen.java)
  // ============================================================================
  private chatSettings = {
    visibility: 'Shown' as 'Shown' | 'Commands Only' | 'Hidden',
    colors: true,
    webLinks: true,
    promptLinks: true,
    opacity: 1.0,
  };

  private renderChatSettingsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Chat Settings', centerX, 11, '#FFFFFF', true);

    const c = this.chatSettings;
    this.addButton(centerX - 155, 42, 150, 20, `Chat: ${c.visibility}`, () => {
      const order: Array<typeof c.visibility> = ['Shown', 'Commands Only', 'Hidden'];
      c.visibility = order[(order.indexOf(c.visibility) + 1) % order.length];
    });
    this.addButton(centerX + 5, 42, 150, 20, `Colors: ${c.colors ? 'ON' : 'OFF'}`, () => { c.colors = !c.colors; });

    this.addButton(centerX - 155, 66, 150, 20, `Web Links: ${c.webLinks ? 'ON' : 'OFF'}`, () => { c.webLinks = !c.webLinks; });
    this.addButton(centerX + 5, 66, 150, 20, `Prompt on Links: ${c.promptLinks ? 'ON' : 'OFF'}`, () => { c.promptLinks = !c.promptLinks; });

    this.addSlider(centerX - 155, 90, 150, 20, `Chat Opacity: ${Math.round(c.opacity * 100)}%`, c.opacity, (n) => {
      c.opacity = Math.max(0.1, Math.round(n * 100) / 100);
    });
    this.addButton(centerX + 5, 90, 150, 20, 'Text Background: Everywhere', () => {});

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState('OPTIONS');
    });
  }

  // ============================================================================
  // 5a-3. ACCESSIBILITY SETTINGS SCREEN (AccessibilityOptionsScreen.java)
  // ============================================================================
  private accessibilitySettings = {
    subtitles: false,
    highContrast: false,
    autoJump: false,
    sprintToggle: true,
    sneakToggle: false,
  };

  private renderAccessibilityScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Accessibility Settings', centerX, 11, '#FFFFFF', true);

    const a = this.accessibilitySettings;
    this.addButton(centerX - 155, 42, 150, 20, `Show Subtitles: ${a.subtitles ? 'ON' : 'OFF'}`, () => {
      a.subtitles = !a.subtitles;
    });
    this.addButton(centerX + 5, 42, 150, 20, `High Contrast: ${a.highContrast ? 'ON' : 'OFF'}`, () => {
      a.highContrast = !a.highContrast;
    });

    this.addButton(centerX - 155, 66, 150, 20, `Auto-Jump: ${a.autoJump ? 'ON' : 'OFF'}`, () => {
      a.autoJump = !a.autoJump;
    });
    this.addButton(centerX + 5, 66, 150, 20, `Sprint: ${a.sprintToggle ? 'Toggle' : 'Hold'}`, () => {
      a.sprintToggle = !a.sprintToggle;
    });

    this.addButton(centerX - 155, 90, 150, 20, `Sneak: ${a.sneakToggle ? 'Toggle' : 'Hold'}`, () => {
      a.sneakToggle = !a.sneakToggle;
    });
    this.addButton(
      centerX + 5,
      90,
      150,
      20,
      `Distortion Effects: ${Math.round(OptionsManager.current.distortionEffects * 100)}%`,
      () => {
        let cur = Math.round(OptionsManager.current.distortionEffects * 100);
        cur = (cur + 25) % 125;
        OptionsManager.current.distortionEffects = cur / 100;
        OptionsManager.save();
      }
    );
    this.addButton(
      centerX - 155,
      114,
      150,
      20,
      `Text Background: ${Math.round(OptionsManager.current.textBackground * 100)}%`,
      () => {
        let cur = Math.round(OptionsManager.current.textBackground * 100);
        cur = (cur + 25) % 125;
        OptionsManager.current.textBackground = cur / 100;
        OptionsManager.save();
      }
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.optionsReturnState || 'OPTIONS');
    });
  }

  // ============================================================================
  // 5a-4. LANGUAGE SCREEN (LanguageSelectScreen.java)
  // ============================================================================
  private renderLanguageScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Language', centerX, 11, '#FFFFFF', true);

    // List box
    const listTop = 36;
    const listBottom = sh - 40;
    this.gui.fill(centerX - 150, listTop + 6, centerX + 150, listTop + 36, '#282828');
    this.font.draw(this.gui.ctx, '§a✔ English (US)', centerX - 140, listTop + 14, '#FFFFFF', true);
    this.font.draw(this.gui.ctx, '§7Default (en_us)', centerX - 140, listTop + 24, '#AAAAAA', false);

    this.font.drawCentered(
      this.gui.ctx,
      '§7(Language translations may not be 100% accurate)',
      centerX,
      sh - 52,
      '#808080',
      false
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.optionsReturnState || 'OPTIONS');
    });
  }

  // ============================================================================
  // 5a-5. TELEMETRY DATA SETTINGS SCREEN
  // ============================================================================
  private renderTelemetryScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Telemetry Data Settings', centerX, 11, '#FFFFFF', true);

    this.font.drawCentered(this.gui.ctx, '§7Mojang Studios collects gameplay telemetry to improve Minecraft.', centerX, 55, '#AAAAAA', false);
    this.font.drawCentered(this.gui.ctx, '§aOptional telemetry is disabled.', centerX, 75, '#55FF55', true);
    this.font.drawCentered(this.gui.ctx, '§7Web port runs 100% client-side with no tracking.', centerX, 95, '#AAAAAA', false);

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState('OPTIONS');
    });
  }

  // ============================================================================
  // 5a-6. CREDITS & ATTRIBUTION SCREEN
  // ============================================================================
  private renderCreditsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Credits & Attribution', centerX, 11, '#FFFFFF', true);

    this.font.drawCentered(this.gui.ctx, '§eMinecraft 26.3 ("Wilderness Bound")', centerX, 44, '#FFFF55', true);
    this.font.drawCentered(this.gui.ctx, '§6Official Web Port & Engine by BroChilllz', centerX, 62, '#FFAA00', true);
    this.font.drawCentered(this.gui.ctx, 'Original Game & Assets by Mojang Studios', centerX, 80, '#FFFFFF', true);
    this.font.drawCentered(this.gui.ctx, '§7Poplar Trees, Autumn Foliage, Cushions & Straw Beds', centerX, 98, '#AAAAAA', false);
    this.font.drawCentered(this.gui.ctx, '§7Full WebGPU / WebGL2 Three.js Client Architecture', centerX, 116, '#AAAAAA', false);
    this.font.drawCentered(this.gui.ctx, '§7Multiplayer powered by Wispcraft Protocol v2 & Wisp Relays', centerX, 134, '#AAAAAA', false);
    this.font.drawCentered(this.gui.ctx, '§aSpecial thanks to community playtesters & contributors!', centerX, 152, '#55FF55', false);

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.optionsReturnState || 'OPTIONS');
    });
  }

  // ============================================================================
  // 5a-7. OFFICIAL RESOURCE PACKS SCREEN (ResourcePackSelectScreen.java)
  // Supports uploading .zip packs, extracting textures via JSZip, and saving in IndexedDB!
  // ============================================================================
  private renderResourcePacksScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const inWorld = this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Select Resource Packs', centerX, 11, '#FFFFFF', true);

    const colW = Math.min(160, Math.floor(sw * 0.44));
    const leftColX = centerX - colW - 6;
    const rightColX = centerX + 6;

    this.font.drawCentered(this.gui.ctx, 'Available', leftColX + Math.floor(colW / 2), 34, '#AAAAAA', true);
    this.font.drawCentered(this.gui.ctx, 'Selected', rightColX + Math.floor(colW / 2), 34, '#AAAAAA', true);

    // 1. Right Column (Selected): Always includes Default 26.3 Pack at top
    let rightY = 48;
    this.gui.fill(rightColX, rightY, rightColX + colW, rightY + 36, '#282828');
    this.gui.blitSprite('/assets/minecraft/textures/gui/sprites/widget/button.png', rightColX + 2, rightY + 2, 32, 32);
    this.font.draw(this.gui.ctx, 'Default', rightColX + 38, rightY + 6, '#FFFFFF', true);
    this.font.draw(this.gui.ctx, '§7The default look of MC 26.3', rightColX + 38, rightY + 18, '#888888', false);
    rightY += 40;

    // Enabled custom packs in Selected column
    const enabledPacks = ResourcePackManager.availablePacks.filter((p) => p.enabled);
    for (const pack of enabledPacks) {
      this.gui.fill(rightColX, rightY, rightColX + colW, rightY + 36, '#333333');
      if (pack.iconDataUrl) {
        this.gui.blitSprite(pack.iconDataUrl, rightColX + 2, rightY + 2, 32, 32);
      }
      this.font.draw(this.gui.ctx, pack.name.slice(0, 16), rightColX + 38, rightY + 6, '#FFFF55', true);
      this.font.draw(this.gui.ctx, pack.description.slice(0, 22), rightColX + 38, rightY + 18, '#AAAAAA', false);

      // Disable button (< arrow)
      this.addButton(rightColX + colW - 22, rightY + 8, 18, 18, '<', async () => {
        await ResourcePackManager.togglePack(pack.id);
        await TextureAtlas.build();
      });

      rightY += 40;
    }

    // 2. Left Column (Available): Custom packs not enabled
    let leftY = 48;
    const disabledPacks = ResourcePackManager.availablePacks.filter((p) => !p.enabled);
    if (disabledPacks.length === 0) {
      this.font.drawCentered(this.gui.ctx, '§7No additional packs', leftColX + Math.floor(colW / 2), 70, '#666666', false);
    } else {
      for (const pack of disabledPacks) {
        this.gui.fill(leftColX, leftY, leftColX + colW, leftY + 36, '#222222');
        if (pack.iconDataUrl) {
          this.gui.blitSprite(pack.iconDataUrl, leftColX + 2, leftY + 2, 32, 32);
        }
        this.font.draw(this.gui.ctx, pack.name.slice(0, 16), leftColX + 38, leftY + 6, '#FFFFFF', true);
        this.font.draw(this.gui.ctx, pack.description.slice(0, 22), leftColX + 38, leftY + 18, '#888888', false);

        // Enable button (> arrow)
        this.addButton(leftColX + colW - 40, leftY + 8, 18, 18, '>', async () => {
          await ResourcePackManager.togglePack(pack.id);
          await TextureAtlas.build();
        });

        // Delete pack button (X)
        this.addButton(leftColX + colW - 20, leftY + 8, 16, 18, '§cX', async () => {
          await ResourcePackManager.deletePack(pack.id);
          await TextureAtlas.build();
        });

        leftY += 40;
      }
    }

    // Bottom action buttons: Upload Resource Pack (.zip) & Done
    this.addButton(centerX - 155, sh - 28, 150, 20, 'Upload Pack (.zip)...', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.zip';
      input.onchange = async () => {
        if (input.files && input.files[0]) {
          await ResourcePackManager.importZipFile(input.files[0]);
          await ResourcePackManager.refreshActiveOverrides();
          await TextureAtlas.build();
        }
      };
      input.click();
    });

    this.addButton(centerX + 5, sh - 28, 150, 20, 'Done', async () => {
      await ResourcePackManager.refreshActiveOverrides();
      await TextureAtlas.build();
      this.setState('OPTIONS');
    });
  }

  // ============================================================================
  // 5b. VIDEO SETTINGS SCREEN (VideoSettingsScreen.java)
  // ============================================================================
  private renderVideoSettingsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const opts = OptionsManager.current;
    const inWorld =
      this.optionsReturnState === 'PAUSE' || this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Video Settings', centerX, 11, '#FFFFFF', true);

    // Row 1: Render Distance slider (2..32 chunks) & Simulation Distance slider (5..32 chunks)
    const rdNorm = Math.max(0, Math.min(1, (opts.renderDistance - 2) / 30));
    this.addSlider(
      centerX - 155,
      42,
      150,
      20,
      `Render Distance: ${opts.renderDistance} chunks`,
      rdNorm,
      (n) => {
        opts.renderDistance = Math.round(2 + n * 30);
        OptionsManager.save();
      }
    );

    const sdNorm = Math.max(0, Math.min(1, ((opts.simulationDistance || 12) - 5) / 27));
    this.addSlider(
      centerX + 5,
      42,
      150,
      20,
      `Simulation Distance: ${opts.simulationDistance || 12} chunks`,
      sdNorm,
      (n) => {
        opts.simulationDistance = Math.round(5 + n * 27);
        OptionsManager.save();
      }
    );

    // Row 2: Graphics: Fancy & Smooth Lighting
    this.addButton(centerX - 155, 66, 150, 20, `Graphics: ${opts.graphics === 'fancy' ? 'Fancy' : 'Fast'}`, () => {
      opts.graphics = opts.graphics === 'fancy' ? 'fast' : 'fancy';
      OptionsManager.save();
    });
    const slMap = { off: 'OFF', min: 'Minimum', max: 'Maximum' };
    this.addButton(centerX + 5, 66, 150, 20, `Smooth Lighting: ${slMap[opts.smoothLighting || 'max']}`, () => {
      opts.smoothLighting = opts.smoothLighting === 'max' ? 'off' : opts.smoothLighting === 'off' ? 'min' : 'max';
      OptionsManager.save();
    });

    // Row 3: Max Framerate & View Bobbing
    const fpsNorm = Math.max(0, Math.min(1, ((opts.maxFps || 120) - 10) / 250));
    this.addSlider(
      centerX - 155,
      90,
      150,
      20,
      (opts.maxFps || 120) >= 260 ? 'Max Framerate: Unlimited' : `Max Framerate: ${opts.maxFps || 120} fps`,
      fpsNorm,
      (n) => {
        const val = Math.round((10 + n * 250) / 10) * 10;
        opts.maxFps = val >= 260 ? 260 : val;
        OptionsManager.save();
      }
    );
    this.addButton(centerX + 5, 90, 150, 20, `View Bobbing: ${opts.viewBobbing ? 'ON' : 'OFF'}`, () => {
      opts.viewBobbing = !opts.viewBobbing;
      OptionsManager.save();
    });

    // Row 4: GUI Scale & Clouds
    const scaleLabel = opts.guiScale === 0 ? 'GUI Scale: Auto' : `GUI Scale: ${opts.guiScale}x`;
    this.addButton(centerX - 155, 114, 150, 20, scaleLabel, () => {
      opts.guiScale = (opts.guiScale + 1) % 5;
      OptionsManager.save();
    });
    this.addButton(centerX + 5, 114, 150, 20, `Clouds: ${opts.clouds ? 'Fancy' : 'OFF'}`, () => {
      opts.clouds = !opts.clouds;
      OptionsManager.save();
    });

    // Row 5: Fullscreen & Particles
    const isFs = typeof document !== 'undefined' && (!!document.fullscreenElement || opts.fullscreen);
    this.addButton(centerX - 155, 138, 150, 20, `Fullscreen: ${isFs ? 'ON' : 'OFF'}`, () => {
      if (typeof document !== 'undefined') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
          opts.fullscreen = true;
        } else {
          document.exitFullscreen?.().catch(() => {});
          opts.fullscreen = false;
        }
      } else {
        opts.fullscreen = !opts.fullscreen;
      }
      OptionsManager.save();
    });
    const partLabels = { all: 'All', decreased: 'Decreased', minimal: 'Minimal' };
    this.addButton(centerX + 5, 138, 150, 20, `Particles: ${partLabels[opts.particles || 'all']}`, () => {
      opts.particles = opts.particles === 'all' ? 'decreased' : opts.particles === 'decreased' ? 'minimal' : 'all';
      OptionsManager.save();
    });

    // Row 6: Backend & Entity Shadows
    this.addButton(
      centerX - 155,
      162,
      150,
      20,
      `Backend: ${WebGPUContext.active ? 'WebGPU' : 'WebGL2'}`,
      () => {
        if (WebGPUContext.supported) {
          WebGPUContext.active = !WebGPUContext.active;
          WebGPUContext.backendLabel = WebGPUContext.active
            ? `WebGPU (${WebGPUContext.adapterName})`
            : 'WebGL2';
        }
      }
    );
    this.addButton(centerX + 5, 162, 150, 20, `Entity Shadows: ${opts.entityShadows ? 'ON' : 'OFF'}`, () => {
      opts.entityShadows = !opts.entityShadows;
      OptionsManager.save();
    });

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.optionsReturnState || 'OPTIONS');
    });
  }

  // ============================================================================
  // 5a. CONTROLS SCREEN (ControlsScreen.java in Minecraft 26.3)
  // ============================================================================
  private renderControlsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const opts = OptionsManager.current;
    const inWorld = this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Controls', centerX, 11, '#FFFFFF', true);

    // Row 1: Mouse Settings... & Key Binds...
    this.addButton(centerX - 155, 42, 150, 20, 'Mouse Settings...', () => {
      this.setState('MOUSE_SETTINGS');
    });
    this.addButton(centerX + 5, 42, 150, 20, 'Key Binds...', () => {
      this.keyBindsScrollY = 0;
      this.setState('KEY_BINDS');
    });

    // Row 2: Auto-Jump & Operator Items Tab
    this.addButton(
      centerX - 155,
      66,
      150,
      20,
      `Auto-Jump: ${opts.autoJump ? 'ON' : 'OFF'}`,
      () => {
        opts.autoJump = !opts.autoJump;
        OptionsManager.save();
      }
    );
    this.addButton(
      centerX + 5,
      66,
      150,
      20,
      `Operator Items Tab: ${opts.operatorItemsTab ? 'ON' : 'OFF'}`,
      () => {
        opts.operatorItemsTab = !opts.operatorItemsTab;
        OptionsManager.save();
      }
    );

    // Row 3: Sneak & Sprint
    this.addButton(
      centerX - 155,
      90,
      150,
      20,
      `Sneak: ${opts.toggleSneak ? 'Toggle' : 'Hold'}`,
      () => {
        opts.toggleSneak = !opts.toggleSneak;
        OptionsManager.save();
      }
    );
    this.addButton(
      centerX + 5,
      90,
      150,
      20,
      `Sprint: ${opts.toggleSprint ? 'Toggle' : 'Hold'}`,
      () => {
        opts.toggleSprint = !opts.toggleSprint;
        OptionsManager.save();
      }
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState(this.optionsReturnState || 'OPTIONS');
    });
  }

  // ============================================================================
  // 5a-1. MOUSE SETTINGS SCREEN (MouseSettingsScreen.java in Minecraft 26.3)
  // ============================================================================
  private renderMouseSettingsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const opts = OptionsManager.current;
    const inWorld = this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Mouse Settings', centerX, 11, '#FFFFFF', true);

    // Row 1: Mouse Sensitivity & Invert Mouse
    this.addSlider(
      centerX - 155,
      42,
      150,
      20,
      `Sensitivity: ${Math.round(opts.mouseSensitivity * 200)}%`,
      opts.mouseSensitivity,
      (n) => {
        opts.mouseSensitivity = Math.max(0.05, Math.round(n * 100) / 100);
        OptionsManager.save();
      }
    );
    this.addButton(
      centerX + 5,
      42,
      150,
      20,
      `Invert Mouse: ${opts.invertMouse ? 'ON' : 'OFF'}`,
      () => {
        opts.invertMouse = !opts.invertMouse;
        OptionsManager.save();
      }
    );

    // Row 2: Mouse Wheel Sensitivity & Discrete Scrolling
    const mwsNorm = Math.max(0, Math.min(1, ((opts.mouseWheelSensitivity || 1.0) - 0.2) / 1.8));
    this.addSlider(
      centerX - 155,
      66,
      150,
      20,
      `Mouse Wheel Sensitivity: ${Math.round((opts.mouseWheelSensitivity || 1.0) * 100)}%`,
      mwsNorm,
      (n) => {
        opts.mouseWheelSensitivity = Math.round((0.2 + n * 1.8) * 10) / 10;
        OptionsManager.save();
      }
    );
    this.addButton(
      centerX + 5,
      66,
      150,
      20,
      `Discrete Scrolling: ${opts.discreteMouseScroll ? 'ON' : 'OFF'}`,
      () => {
        opts.discreteMouseScroll = !opts.discreteMouseScroll;
        OptionsManager.save();
      }
    );

    // Row 3: Touchscreen Mode
    this.addButton(
      centerX - 155,
      90,
      150,
      20,
      `Touchscreen Mode: ${opts.touchscreen ? 'ON' : 'OFF'}`,
      () => {
        opts.touchscreen = !opts.touchscreen;
        OptionsManager.save();
      }
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState('CONTROLS');
    });
  }

  // ============================================================================
  // 5a-2. KEY BINDS SCREEN (KeyBindsScreen.java with full scrollable categories)
  // ============================================================================
  private renderKeyBindsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const opts = OptionsManager.current;
    const inWorld = this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Key Binds', centerX, 11, '#FFFFFF', true);

    const formatKey = (code: string) => {
      if (!code) return 'None';
      if (code.startsWith('Key')) return code.slice(3).toUpperCase();
      if (code.startsWith('Digit')) return code.slice(5);
      if (code === 'Space') return 'SPACE';
      if (code === 'ShiftLeft') return 'LSHIFT';
      if (code === 'ShiftRight') return 'RSHIFT';
      if (code === 'ControlLeft') return 'LCTRL';
      if (code === 'ControlRight') return 'RCTRL';
      if (code === 'AltLeft') return 'LALT';
      if (code === 'AltRight') return 'RALT';
      if (code === 'Slash') return '/';
      if (code === 'Tab') return 'TAB';
      if (code === 'Mouse0') return 'Left Click';
      if (code === 'Mouse1') return 'Middle Click';
      if (code === 'Mouse2') return 'Right Click';
      return code.toUpperCase();
    };

    const entries: Array<
      | { type: 'header'; label: string }
      | { type: 'binding'; key: keyof KeyBinds; label: string }
    > = [
      { type: 'header', label: 'Movement' },
      { type: 'binding', key: 'jump', label: 'Jump' },
      { type: 'binding', key: 'sneak', label: 'Sneak' },
      { type: 'binding', key: 'sprint', label: 'Sprint' },
      { type: 'binding', key: 'left', label: 'Strafe Left' },
      { type: 'binding', key: 'right', label: 'Strafe Right' },
      { type: 'binding', key: 'back', label: 'Walk Backward' },
      { type: 'binding', key: 'forward', label: 'Walk Forward' },

      { type: 'header', label: 'Gameplay' },
      { type: 'binding', key: 'attack', label: 'Attack / Destroy' },
      { type: 'binding', key: 'pickItem', label: 'Pick Block' },
      { type: 'binding', key: 'use', label: 'Use Item / Place Block' },
      { type: 'binding', key: 'drop', label: 'Drop Selected Item' },
      { type: 'binding', key: 'inventory', label: 'Open/Close Inventory' },
      { type: 'binding', key: 'swapOffhand', label: 'Swap Item In Hands' },

      { type: 'header', label: 'Inventory' },
      { type: 'binding', key: 'hotbar1', label: 'Hotbar Slot 1' },
      { type: 'binding', key: 'hotbar2', label: 'Hotbar Slot 2' },
      { type: 'binding', key: 'hotbar3', label: 'Hotbar Slot 3' },
      { type: 'binding', key: 'hotbar4', label: 'Hotbar Slot 4' },
      { type: 'binding', key: 'hotbar5', label: 'Hotbar Slot 5' },
      { type: 'binding', key: 'hotbar6', label: 'Hotbar Slot 6' },
      { type: 'binding', key: 'hotbar7', label: 'Hotbar Slot 7' },
      { type: 'binding', key: 'hotbar8', label: 'Hotbar Slot 8' },
      { type: 'binding', key: 'hotbar9', label: 'Hotbar Slot 9' },

      { type: 'header', label: 'Multiplayer' },
      { type: 'binding', key: 'chat', label: 'Open Chat' },
      { type: 'binding', key: 'command', label: 'Open Command' },
      { type: 'binding', key: 'playerlist', label: 'Player List' },

      { type: 'header', label: 'Miscellaneous' },
      { type: 'binding', key: 'advancements', label: 'Advancements' },
      { type: 'binding', key: 'togglePerspective', label: 'Toggle Perspective' },
      { type: 'binding', key: 'fullscreen', label: 'Toggle Fullscreen' },
      { type: 'binding', key: 'debugOverlay', label: 'Debug Screen' },
    ];

    const rowH = 22;
    const totalListH = entries.length * rowH;
    const visibleH = sh - 70;
    const maxScroll = Math.max(0, totalListH - visibleH);
    this.keyBindsMaxScrollY = maxScroll;
    this.keyBindsScrollY = Math.max(0, Math.min(maxScroll, this.keyBindsScrollY));

    // Clip rendering to inner viewport
    this.gui.ctx.save();
    this.gui.ctx.beginPath();
    this.gui.ctx.rect(0, 32, sw, sh - 68);
    this.gui.ctx.clip();

    let curY = 36 - this.keyBindsScrollY;
    for (const item of entries) {
      if (curY + rowH >= 32 && curY <= sh - 36) {
        if (item.type === 'header') {
          this.font.drawCentered(this.gui.ctx, `§e${item.label}`, centerX, curY + 6, '#FFFF55', true);
        } else {
          this.font.draw(this.gui.ctx, item.label, centerX - 155, curY + 6, '#FFFFFF', true);
          const isRebinding = this.rebindingKey === item.key;
          const currentBind = opts.keyBinds[item.key] || DEFAULT_KEYBINDS[item.key];
          const btnText = isRebinding ? '§e> ??? <' : formatKey(currentBind);

          this.addButton(centerX + 15, curY, 80, 20, btnText, () => {
            this.rebindingKey = item.key;
          });

          const isDefault = currentBind === DEFAULT_KEYBINDS[item.key];
          const resetLabel = isDefault ? '§7Reset' : 'Reset';
          this.addButton(centerX + 100, curY, 48, 20, resetLabel, () => {
            if (!isDefault) {
              opts.keyBinds[item.key] = DEFAULT_KEYBINDS[item.key];
              OptionsManager.save();
            }
          });
        }
      }
      curY += rowH;
    }

    this.gui.ctx.restore();

    // Scrollbar track & thumb
    if (maxScroll > 0) {
      const trackH = sh - 72;
      const thumbH = Math.max(20, Math.round((trackH / totalListH) * trackH));
      const thumbY = 34 + Math.round((this.keyBindsScrollY / maxScroll) * (trackH - thumbH));
      this.gui.fill(centerX + 158, 34, centerX + 164, sh - 38, '#000000');
      this.gui.fill(centerX + 158, thumbY, centerX + 164, thumbY + thumbH, '#808080');
      this.gui.fill(centerX + 158, thumbY, centerX + 163, thumbY + thumbH - 1, '#C0C0C0');
    }

    // Bottom action buttons: Reset All Keys & Done
    this.addButton(centerX - 155, sh - 28, 150, 20, 'Reset All Keys', () => {
      opts.keyBinds = { ...DEFAULT_KEYBINDS };
      OptionsManager.save();
    });

    this.addButton(centerX + 5, sh - 28, 150, 20, 'Done', () => {
      this.rebindingKey = null;
      this.setState('CONTROLS');
    });
  }

  // ============================================================================
  // 5b. SOUND OPTIONS SCREEN
  // ============================================================================
  private renderSoundOptionsScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const opts = OptionsManager.current;
    const inWorld = this.previousState === 'PAUSE' || this.previousState === 'IN_GAME';

    this.gui.renderMenuBackground(inWorld, 32, sh - 36);
    this.font.drawCentered(this.gui.ctx, 'Music & Sounds', centerX, 11, '#FFFFFF', true);

    this.addSlider(
      centerX - 155,
      48,
      310,
      20,
      `Master Volume: ${Math.round(opts.soundVolume * 100)}%`,
      opts.soundVolume,
      (n) => {
        opts.soundVolume = Math.round(n * 100) / 100;
        OptionsManager.save();
      }
    );

    this.addSlider(
      centerX - 155,
      76,
      150,
      20,
      `Music: ${Math.round(opts.musicVolume * 100)}%`,
      opts.musicVolume,
      (n) => {
        opts.musicVolume = Math.round(n * 100) / 100;
        OptionsManager.save();
      }
    );

    this.addSlider(
      centerX + 5,
      76,
      150,
      20,
      `Blocks: ${Math.round(opts.blocksVolume * 100)}%`,
      opts.blocksVolume,
      (n) => {
        opts.blocksVolume = Math.round(n * 100) / 100;
        OptionsManager.save();
      }
    );

    this.addSlider(
      centerX - 155,
      102,
      150,
      20,
      `Hostile Creatures: ${Math.round(opts.hostileVolume * 100)}%`,
      opts.hostileVolume,
      (n) => {
        opts.hostileVolume = Math.round(n * 100) / 100;
        OptionsManager.save();
      }
    );

    this.addSlider(
      centerX + 5,
      102,
      150,
      20,
      `Friendly Creatures: ${Math.round(opts.friendlyVolume * 100)}%`,
      opts.friendlyVolume,
      (n) => {
        opts.friendlyVolume = Math.round(n * 100) / 100;
        OptionsManager.save();
      }
    );

    this.addButton(centerX - 100, sh - 28, 200, 20, 'Done', () => {
      this.setState('OPTIONS');
    });
  }

  // ============================================================================
  // 5c. GAME OVER SCREEN (Survival vs. Hardcore)
  // ============================================================================
  private renderGameOverScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const centerY = Math.floor(sh / 2);

    this.gui.fill(0, 0, sw, sh, 'rgba(100, 10, 10, 0.72)');

    if (this.activeWorldIsHardcore) {
      this.font.drawCentered(this.gui.ctx, '§4Game Over!', centerX, centerY - 45, '#FFFFFF', true);
      this.font.drawCentered(
        this.gui.ctx,
        '§eYou cannot respawn in hardcore mode!',
        centerX,
        centerY - 25,
        '#AAAAAA',
        true
      );

      this.addButton(centerX - 100, centerY + 10, 200, 20, 'Spectate World', () => {
        this.player.gameMode = 'spectator';
        this.player.flying = true;
        this.player.health = 20;
        this.setState('IN_GAME');
      });

      this.addButton(centerX - 100, centerY + 36, 200, 20, 'Delete World', () => {
        if (this.activeWorldId) {
          const idx = this.savedWorlds.findIndex((w) => w.id === this.activeWorldId);
          if (idx >= 0) this.savedWorlds.splice(idx, 1);
          localStorage.removeItem(`mc26_3_world_state_${this.activeWorldId}`);
          this.saveWorldsList();
        }
        this.setState('TITLE');
      });
    } else {
      this.font.drawCentered(this.gui.ctx, '§4You died!', centerX, centerY - 50, '#FFFFFF', true);
      this.font.drawCentered(
        this.gui.ctx,
        this.player.lastDeathMessage || 'Player died',
        centerX,
        centerY - 32,
        '#E0E0E0',
        true
      );
      this.font.drawCentered(
        this.gui.ctx,
        `Score: §e${this.player.xpLevel * 10}`,
        centerX,
        centerY - 16,
        '#FFFFFF',
        true
      );

      this.addButton(centerX - 100, centerY + 10, 200, 20, 'Respawn', () => {
        this.player.health = 20;
        this.player.hunger = 20;
        this.player.saturation = 5.0;
        this.player.fallDistance = 0;
        this.player.invulnerableTimer = 1.0;
        this.player.position.set(0, this.world.getTopSolidY(0, 0) + 1.0, 0);
        this.player.velocity.set(0, 0, 0);
        this.setState('IN_GAME');
      });

      this.addButton(centerX - 100, centerY + 36, 200, 20, 'Title Screen', () => {
        this.setState('TITLE');
      });
    }
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
      this.optionsReturnState = 'PAUSE';
      this.setState('OPTIONS');
    });
    this.addButton(centerX + 4, baseY + 72, 98, 20, `Allow Commands: ${this.world.allowCommands ? 'ON' : 'OFF'}`, () => {
      this.world.allowCommands = !this.world.allowCommands;
      this.addChatMessage(`§eCommands are now ${this.world.allowCommands ? 'allowed' : 'disabled'} for this session.`);
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

    // Official Advancements window background texture
    this.gui.blitTiled(
      '/assets/minecraft/textures/gui/menu_list_background.png',
      wx + 9,
      wy + 18,
      winW - 18,
      winH - 27,
      16,
      16
    );

    const nodes: Array<{
      id: string;
      parentId?: string;
      x: number;
      y: number;
      item: string;
      frame: 'task' | 'goal' | 'challenge';
      title: string;
      desc: string;
    }> = [
      { id: 'root', x: wx + 20, y: wy + 55, item: 'grass_block', frame: 'task', title: 'Minecraft', desc: 'The heart and story of the game' },
      { id: 'stone_age', parentId: 'root', x: wx + 58, y: wy + 32, item: 'wooden_pickaxe', frame: 'task', title: 'Stone Age', desc: 'Mine stone with your new pickaxe' },
      { id: 'upgrade', parentId: 'stone_age', x: wx + 96, y: wy + 32, item: 'stone_pickaxe', frame: 'task', title: 'Getting an Upgrade', desc: 'Construct a better pickaxe' },
      { id: 'acquire_hardware', parentId: 'upgrade', x: wx + 134, y: wy + 32, item: 'iron_ingot', frame: 'task', title: 'Acquire Hardware', desc: 'Smelt an iron ingot in a furnace' },
      { id: 'suit_up', parentId: 'acquire_hardware', x: wx + 172, y: wy + 22, item: 'iron_chestplate', frame: 'task', title: 'Suit Up', desc: 'Protect yourself with a piece of iron armor' },
      { id: 'hot_stuff', parentId: 'acquire_hardware', x: wx + 172, y: wy + 44, item: 'cobblestone', frame: 'task', title: 'Hot Stuff', desc: 'Construct a furnace with stone' },
      { id: 'monster_hunter', parentId: 'root', x: wx + 58, y: wy + 78, item: 'iron_sword', frame: 'task', title: 'Monster Hunter', desc: 'Attack and defeat a hostile zombie' },
      { id: 'wilderness', parentId: 'root', x: wx + 96, y: wy + 78, item: 'poplar_log', frame: 'task', title: 'Wilderness Bound', desc: 'Fell a Poplar tree in a Dappled Forest' },
      { id: 'canopy', parentId: 'wilderness', x: wx + 134, y: wy + 78, item: 'orange_poplar_leaves', frame: 'goal', title: 'Autumn Canopy', desc: 'Collect vibrant autumnal leaves' },
      { id: 'straw_dreams', parentId: 'canopy', x: wx + 172, y: wy + 68, item: 'straw_bed', frame: 'task', title: 'Sweet Wilderness Dreams', desc: 'Rest on a 26.3 Straw Bed at an Abandoned Camp' },
      { id: 'take_a_seat', parentId: 'canopy', x: wx + 172, y: wy + 92, item: 'orange_cushion', frame: 'task', title: 'Take a Seat!', desc: 'Place and sit on a 26.3 Colored Cushion' },
      { id: 'architect', parentId: 'take_a_seat', x: wx + 210, y: wy + 80, item: 'poplar_planks', frame: 'challenge', title: 'Wilderness Architect', desc: 'Craft Poplar wood, stairs and slabs' },
    ];

    // Connecting branches
    for (const n of nodes) {
      if (n.parentId) {
        const p = nodes.find((node) => node.id === n.parentId);
        if (p) {
          this.gui.ctx.strokeStyle = '#000000';
          this.gui.ctx.lineWidth = 3;
          this.gui.ctx.beginPath();
          this.gui.ctx.moveTo(p.x + 13, p.y + 13);
          this.gui.ctx.lineTo(n.x + 13, n.y + 13);
          this.gui.ctx.stroke();

          this.gui.ctx.strokeStyle = '#A0A0A0';
          this.gui.ctx.lineWidth = 1;
          this.gui.ctx.beginPath();
          this.gui.ctx.moveTo(p.x + 13, p.y + 13);
          this.gui.ctx.lineTo(n.x + 13, n.y + 13);
          this.gui.ctx.stroke();
        }
      }
    }

    // Advancement Nodes
    for (const n of nodes) {
      const isUnlocked = this.unlockedAdvancements.has(n.id);
      const frameUrl = `/assets/minecraft/textures/gui/sprites/advancements/${n.frame}_frame_${isUnlocked ? 'obtained' : 'unobtained'}.png`;
      this.gui.blitSprite(frameUrl, n.x, n.y, 26, 26);
      const def = Registries.getItem(n.item) || null;
      if (isUnlocked) {
        this.gui.renderItem(def, 1, n.x + 5, n.y + 5);
      } else {
        this.gui.ctx.save();
        this.gui.ctx.globalAlpha = 0.4;
        this.gui.renderItem(def, 1, n.x + 5, n.y + 5);
        this.gui.ctx.restore();
      }
      this.interactiveRects.push({
        x: n.x,
        y: n.y,
        w: 26,
        h: 26,
        tooltip: [
          isUnlocked ? `§e${n.title}` : `§8${n.title}`,
          isUnlocked ? `§7${n.desc}` : `§8${n.desc}`,
        ],
      });
    }

    // Outer window border frame
    this.gui.blit(
      '/assets/minecraft/textures/gui/advancements/window.png',
      wx,
      wy,
      0,
      0,
      winW,
      winH,
      256,
      256
    );

    this.font.draw(this.gui.ctx, 'Advancements', wx + 9, wy + 6, '#404040', false);

    this.addButton(centerX - 50, wy + winH + 8, 100, 20, 'Done', () => {
      this.setState('PAUSE');
    });
  }

  public unlockAdvancement(id: string): void {
    if (this.unlockedAdvancements.has(id)) return;
    this.unlockedAdvancements.add(id);
    const titles: Record<string, { title: string; desc: string; icon: string }> = {
      root: { title: 'Minecraft', desc: 'The heart and story of the game', icon: 'grass_block' },
      stone_age: { title: 'Stone Age', desc: 'Mine stone with your new pickaxe', icon: 'wooden_pickaxe' },
      upgrade: { title: 'Getting an Upgrade', desc: 'Construct a better pickaxe', icon: 'stone_pickaxe' },
      acquire_hardware: { title: 'Acquire Hardware', desc: 'Smelt an iron ingot in a furnace', icon: 'iron_ingot' },
      suit_up: { title: 'Suit Up', desc: 'Protect yourself with a piece of iron armor', icon: 'iron_chestplate' },
      hot_stuff: { title: 'Hot Stuff', desc: 'Construct a furnace with stone', icon: 'cobblestone' },
      monster_hunter: { title: 'Monster Hunter', desc: 'Attack and defeat a hostile zombie', icon: 'iron_sword' },
      wilderness: { title: 'Wilderness Bound', desc: 'Fell a Poplar tree in a Dappled Forest', icon: 'poplar_log' },
      canopy: { title: 'Autumn Canopy', desc: 'Collect vibrant autumnal leaves', icon: 'orange_poplar_leaves' },
      straw_dreams: { title: 'Sweet Wilderness Dreams', desc: 'Rest on a 26.3 Straw Bed at an Abandoned Camp', icon: 'straw_bed' },
      take_a_seat: { title: 'Take a Seat!', desc: 'Place and sit on a 26.3 Colored Cushion', icon: 'orange_cushion' },
      architect: { title: 'Wilderness Architect', desc: 'Craft Poplar wood, stairs and slabs', icon: 'poplar_planks' },
    };
    const adv = titles[id];
    if (adv) {
      this.showToast('Advancement Made!', adv.title, adv.icon);
      this.addChatMessage(`§a${MultiplayerManager.username} has made the advancement §e[${adv.title}]`);
      AudioEngine.play('ui.toast.challenge_complete', 0.9);
    }
    this.saveActiveWorldState();
  }

  // ============================================================================
  // 7. IN-GAME HUD (Gui.java: Hotbar, Hearts, Hunger, XP, Crosshair, F3, Chat)
  // ============================================================================
  private renderHUD(chatOpen: boolean): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const centerX = Math.floor(sw / 2);
    const centerY = Math.floor(sh / 2);

    // Red screen hurt vignette flash on damage (authentic subtle red vignette)
    if (this.player.hurtTimer > 0) {
      const alpha = Math.min(0.15, (this.player.hurtTimer / 0.45) * 0.15);
      this.gui.fill(0, 0, sw, sh, `rgba(180, 0, 0, ${alpha.toFixed(3)})`);
    }

    // Purple nether portal swirl vignette when standing in portal
    if (this.player.portalTimer > 0) {
      const pAlpha = Math.min(0.65, this.player.portalTimer * 0.25);
      this.gui.fill(0, 0, sw, sh, `rgba(80, 16, 110, ${pAlpha.toFixed(3)})`);
    }

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

      // 10 Hearts (left side at sh - 39) with damage blinking & shake
      const heartY = sh - 39;
      const isHurt = this.player.hurtTimer > 0;
      const isBlinking = this.player.hurtTimer > 0.2;
      const isHardcore = this.activeWorldIsHardcore;
      const containerSprite = isHardcore
        ? (isBlinking ? '/assets/minecraft/textures/gui/sprites/hud/heart/container_hardcore_blinking.png' : '/assets/minecraft/textures/gui/sprites/hud/heart/container_hardcore.png')
        : (isBlinking ? '/assets/minecraft/textures/gui/sprites/hud/heart/container_blinking.png' : '/assets/minecraft/textures/gui/sprites/hud/heart/container.png');
      const fullSprite = isHardcore
        ? (isBlinking ? '/assets/minecraft/textures/gui/sprites/hud/heart/hardcore_full_blinking.png' : '/assets/minecraft/textures/gui/sprites/hud/heart/hardcore_full.png')
        : (isBlinking ? '/assets/minecraft/textures/gui/sprites/hud/heart/full_blinking.png' : '/assets/minecraft/textures/gui/sprites/hud/heart/full.png');
      const halfSprite = isHardcore
        ? (isBlinking ? '/assets/minecraft/textures/gui/sprites/hud/heart/hardcore_half_blinking.png' : '/assets/minecraft/textures/gui/sprites/hud/heart/hardcore_half.png')
        : (isBlinking ? '/assets/minecraft/textures/gui/sprites/hud/heart/half_blinking.png' : '/assets/minecraft/textures/gui/sprites/hud/heart/half.png');

      for (let i = 0; i < 10; i++) {
        const shakeY = isHurt ? (Math.random() > 0.5 ? -1 : 1) : 0;
        const curY = sh - 39 + shakeY;
        const hx = hbX + i * 8;
        this.gui.blitSprite(containerSprite, hx, curY, 9, 9);
        const hp = this.player.health - i * 2;
        if (hp >= 2) {
          this.gui.blitSprite(fullSprite, hx, curY, 9, 9);
        } else if (hp === 1) {
          this.gui.blitSprite(halfSprite, hx, curY, 9, 9);
        }
      }

      // Armor Bar above hearts
      const armorVal = this.inventory.getArmorValue();
      if (armorVal > 0) {
        const armorY = heartY - 10;
        for (let i = 0; i < 10; i++) {
          const ax = hbX + i * 8;
          this.gui.blitSprite(
            '/assets/minecraft/textures/gui/sprites/hud/armor_empty.png',
            ax,
            armorY,
            9,
            9
          );
          const pts = armorVal - i * 2;
          if (pts >= 2) {
            this.gui.blitSprite(
              '/assets/minecraft/textures/gui/sprites/hud/armor_full.png',
              ax,
              armorY,
              9,
              9
            );
          } else if (pts === 1) {
            this.gui.blitSprite(
              '/assets/minecraft/textures/gui/sprites/hud/armor_half.png',
              ax,
              armorY,
              9,
              9
            );
          }
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
      // 1. Suggestions popup box if typing a command and suggestions are available
      if (this.commandSuggestions.length > 0) {
        const maxVisible = Math.min(10, this.commandSuggestions.length);
        let startIdx = 0;
        if (this.commandSuggestionIndex >= maxVisible) {
          startIdx = this.commandSuggestionIndex - maxVisible + 1;
        }
        const visibleList = this.commandSuggestions.slice(startIdx, startIdx + maxVisible);
        const boxH = maxVisible * 12 + 4;
        let maxTextW = 120;
        for (const s of visibleList) {
          const w = this.font.width(s);
          if (w > maxTextW) maxTextW = w;
        }
        const boxW = Math.min(sw - 20, maxTextW + 16);
        const boxY = sh - 16 - boxH;

        // Background box
        this.gui.fill(2, boxY, 2 + boxW, boxY + boxH, 'rgba(12, 12, 18, 0.94)');
        this.gui.ctx.strokeStyle = '#202028';
        this.gui.ctx.strokeRect(2, boxY, boxW, boxH);

        // Render each suggestion
        for (let i = 0; i < visibleList.length; i++) {
          const actualIdx = startIdx + i;
          const isSelected = actualIdx === this.commandSuggestionIndex;
          const itemY = boxY + 2 + i * 12;
          const s = visibleList[i];

          if (isSelected) {
            this.gui.fill(3, itemY - 1, 2 + boxW - 1, itemY + 11, 'rgba(50, 75, 130, 0.9)');
            this.font.draw(this.gui.ctx, s, 6, itemY + 1, '#FFFF55', true);
          } else {
            this.font.draw(
              this.gui.ctx,
              s,
              6,
              itemY + 1,
              s.startsWith('<') ? '#808080' : '#CCCCCC',
              true
            );
          }
        }
      }

      // 2. Chat Input Bar
      this.gui.fill(2, sh - 14, sw - 2, sh - 2, 'rgba(0, 0, 0, 0.75)');

      // Inline Ghost Text / Brigadier Hint
      if (this.commandSuggestionHint) {
        const textW = this.font.width(this.chatInputText);
        this.font.draw(
          this.gui.ctx,
          this.commandSuggestionHint,
          4 + textW,
          sh - 12,
          '#808080',
          true
        );
      }

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

    // Player List Overlay (Tab / playerlist keybind)
    if (this.showPlayerList) {
      this.renderPlayerListOverlay();
    }
  }

  private renderPlayerListOverlay(): void {
    const sw = this.gui.scaledWidth;
    const centerX = Math.floor(sw / 2);

    const players: string[] = [MultiplayerManager.username || 'Steve'];
    for (const [, mob] of this.world.entityRenderer.mobs) {
      if (mob.type === 'remote_player' && mob.name && !players.includes(mob.name)) {
        players.push(mob.name);
      }
    }

    const boxW = Math.max(180, players.length > 0 ? 210 : 180);
    const boxH = 24 + players.length * 13;
    const boxX = centerX - Math.floor(boxW / 2);
    const boxY = 14;

    this.gui.fill(boxX, boxY, boxX + boxW, boxY + boxH, 'rgba(0, 0, 0, 0.70)');
    this.gui.ctx.strokeStyle = '#303038';
    this.gui.ctx.strokeRect(boxX, boxY, boxW, boxH);

    const header = MultiplayerManager.activeSession?.state === 'PLAY'
      ? 'Integrated Wisp Multiplayer Server'
      : 'Integrated 26.3 Server';
    this.font.drawCentered(this.gui.ctx, header, centerX, boxY + 4, '#FFFF55', true);

    let rowY = boxY + 18;
    for (const name of players) {
      this.gui.fill(boxX + 4, rowY - 1, boxX + boxW - 4, rowY + 10, 'rgba(255, 255, 255, 0.08)');
      this.font.draw(this.gui.ctx, name, boxX + 8, rowY + 1, '#FFFFFF', true);
      this.font.draw(this.gui.ctx, '0ms §a||||', boxX + boxW - 44, rowY + 1, '#55FF55', true);
      rowY += 13;
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
    } else if (this.activeContainerTab === 'furnace') {
      this.renderFurnaceScreen();
    } else if (this.activeContainerTab === 'chest' || this.activeContainerTab === 'barrel') {
      this.renderChestScreen();
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
    const totalPages = Math.max(1, Math.ceil(recipes.length / 20));
    this.recipeBookPage = Math.max(0, Math.min(totalPages - 1, this.recipeBookPage));
    const startIdx = this.recipeBookPage * 20;
    const endIdx = Math.min(recipes.length, startIdx + 20);

    for (let i = startIdx; i < endIdx; i++) {
      const slotPos = i - startIdx;
      const col = slotPos % 5;
      const row = Math.floor(slotPos / 5);
      const sx = rx + 11 + col * 25;
      const sy = ry + 28 + row * 25;
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

    // Page indicator and navigation buttons
    const pageText = `${this.recipeBookPage + 1}/${totalPages}`;
    this.font.drawCentered(this.gui.ctx, pageText, rx + 73, ry + 142, '#555555', false);

    if (this.recipeBookPage > 0) {
      this.addButton(rx + 16, ry + 136, 16, 16, '<', () => {
        this.recipeBookPage--;
      });
    }
    if (this.recipeBookPage < totalPages - 1) {
      this.addButton(rx + 116, ry + 136, 16, 16, '>', () => {
        this.recipeBookPage++;
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

  private renderFurnaceScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const leftPos = Math.floor((sw - 176) / 2);
    const topPos = Math.floor((sh - 166) / 2);

    this.gui.blit(
      '/assets/minecraft/textures/gui/container/furnace.png',
      leftPos,
      topPos,
      0,
      0,
      176,
      166,
      256,
      256
    );

    this.font.draw(this.gui.ctx, 'Furnace', leftPos + 60, topPos + 6, '#404040', false);
    this.font.draw(this.gui.ctx, 'Inventory', leftPos + 8, topPos + 72, '#404040', false);

    const furnace = ContainerManager.getFurnace(this.activeContainerBlockPos);

    // Animated flame: burn progress (bottom-up from lit_progress.png 14x14)
    if (furnace.burnTime > 0 && furnace.maxBurnTime > 0) {
      const burnRatio = Math.min(1, furnace.burnTime / furnace.maxBurnTime);
      const flameH = Math.max(1, Math.round(14 * burnRatio));
      this.gui.blit(
        '/assets/minecraft/textures/gui/sprites/container/furnace/lit_progress.png',
        leftPos + 56,
        topPos + 36 + (14 - flameH),
        0,
        14 - flameH,
        14,
        flameH,
        14,
        14
      );
    }

    // Animated arrow: cook progress (left-to-right from burn_progress.png 24x16)
    if (furnace.cookTime > 0) {
      const cookRatio = Math.min(1, furnace.cookTime / 200);
      const arrowW = Math.max(1, Math.round(24 * cookRatio));
      this.gui.blit(
        '/assets/minecraft/textures/gui/sprites/container/furnace/burn_progress.png',
        leftPos + 79,
        topPos + 34,
        0,
        0,
        arrowW,
        16,
        24,
        16
      );
    }

    // Input slot (56, 17)
    this.drawInteractiveSlot(
      leftPos + 56,
      topPos + 17,
      () => furnace.input,
      (s) => {
        furnace.input = s;
      }
    );

    // Fuel slot (56, 53)
    this.drawInteractiveSlot(
      leftPos + 56,
      topPos + 53,
      () => furnace.fuel,
      (s) => {
        furnace.fuel = s;
      }
    );

    // Output slot (116, 35)
    this.drawInteractiveSlot(
      leftPos + 116,
      topPos + 35,
      () => furnace.output,
      (s) => {
        furnace.output = s;
      }
    );

    this.drawPlayerInventorySlots(leftPos, topPos);
  }

  private renderChestScreen(): void {
    const sw = this.gui.scaledWidth;
    const sh = this.gui.scaledHeight;
    const leftPos = Math.floor((sw - 176) / 2);
    const topPos = Math.floor((sh - 166) / 2);

    this.gui.blit(
      '/assets/minecraft/textures/gui/container/generic_54.png',
      leftPos,
      topPos,
      0,
      0,
      176,
      166,
      256,
      256
    );

    const title = this.activeContainerTab === 'barrel' ? 'Barrel' : 'Chest';
    this.font.draw(this.gui.ctx, title, leftPos + 8, topPos + 6, '#404040', false);
    this.font.draw(this.gui.ctx, 'Inventory', leftPos + 8, topPos + 72, '#404040', false);

    const chestSlots = ContainerManager.getChest(this.activeContainerBlockPos);

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 9; c++) {
        const idx = r * 9 + c;
        const sx = leftPos + 8 + c * 18;
        const sy = topPos + 18 + r * 18;
        this.drawInteractiveSlot(
          sx,
          sy,
          () => chestSlots[idx],
          (s) => {
            chestSlots[idx] = s;
          }
        );
      }
    }

    this.drawPlayerInventorySlots(leftPos, topPos);
  }

  // ============================================================================
  // 9. CHAT COMMAND HANDLER (Brigadier Command Engine with all 94 commands)
  // ============================================================================
  private handleChatSubmit(msg: string): void {
    if (msg.startsWith('/')) {
      if (
        !this.world.allowCommands &&
        this.player.gameMode !== 'creative' &&
        !msg.startsWith('/help') &&
        !msg.startsWith('/me') &&
        !msg.startsWith('/msg') &&
        !msg.startsWith('/tell')
      ) {
        this.addChatMessage('§cCommands are not allowed in this world.');
        this.updateHUDOnly();
        return;
      }
      CommandEngine.execute(
        msg,
        this.player,
        this.inventory,
        this.world,
        (m) => this.addChatMessage(m),
        () => this.saveActiveWorldState()
      );
      this.updateHUDOnly();
      return;
    }

    this.addChatMessage(`<${MultiplayerManager.username}> ${msg}`);
    if (MultiplayerManager.activeSession?.state === 'PLAY') {
      MultiplayerManager.activeSession.sendChat(msg);
    }
  }
}
