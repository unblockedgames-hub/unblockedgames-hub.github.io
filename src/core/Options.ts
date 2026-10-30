/**
 * Parses and manages official `options.txt` from `/.minecraft/options.txt`
 */
export interface KeyBinds {
  // Movement
  forward: string;
  back: string;
  left: string;
  right: string;
  jump: string;
  sneak: string;
  sprint: string;

  // Gameplay
  attack: string;
  use: string;
  pickItem: string;
  drop: string;
  inventory: string;
  swapOffhand: string;

  // Inventory / Hotbar
  hotbar1: string;
  hotbar2: string;
  hotbar3: string;
  hotbar4: string;
  hotbar5: string;
  hotbar6: string;
  hotbar7: string;
  hotbar8: string;
  hotbar9: string;

  // Multiplayer
  chat: string;
  command: string;
  playerlist: string;

  // Miscellaneous
  advancements: string;
  togglePerspective: string;
  fullscreen: string;
  debugOverlay: string;
}

export const DEFAULT_KEYBINDS: KeyBinds = {
  forward: 'KeyW',
  back: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
  jump: 'Space',
  sneak: 'ShiftLeft',
  sprint: 'ControlLeft',
  attack: 'Mouse0',
  use: 'Mouse2',
  pickItem: 'Mouse1',
  drop: 'KeyQ',
  inventory: 'KeyE',
  swapOffhand: 'KeyF',
  hotbar1: 'Digit1',
  hotbar2: 'Digit2',
  hotbar3: 'Digit3',
  hotbar4: 'Digit4',
  hotbar5: 'Digit5',
  hotbar6: 'Digit6',
  hotbar7: 'Digit7',
  hotbar8: 'Digit8',
  hotbar9: 'Digit9',
  chat: 'KeyT',
  command: 'Slash',
  playerlist: 'Tab',
  advancements: 'KeyL',
  togglePerspective: 'F5',
  fullscreen: 'F11',
  debugOverlay: 'F3',
};

export interface GameOptions {
  fov: number;
  renderDistance: number;
  simulationDistance: number;
  mouseSensitivity: number;
  invertMouse: boolean;
  mouseWheelSensitivity: number;
  discreteMouseScroll: boolean;
  touchscreen: boolean;
  soundVolume: number;
  musicVolume: number;
  blocksVolume: number;
  hostileVolume: number;
  friendlyVolume: number;
  guiScale: number;
  fullscreen: boolean;
  ao: boolean;
  clouds: boolean;
  graphics: 'fast' | 'fancy';
  difficulty: 'Peaceful' | 'Easy' | 'Normal' | 'Hard';
  toggleSprint: boolean;
  toggleSneak: boolean;
  autoJump: boolean;
  operatorItemsTab: boolean;
  viewBobbing: boolean;
  entityShadows: boolean;
  distortionEffects: number;
  textBackground: number;
  chatOpacity: number;
  maxFps: number;
  smoothLighting: 'off' | 'min' | 'max';
  particles: 'all' | 'decreased' | 'minimal';
  wispServerUrl: string;
  username: string;
  keyBinds: KeyBinds;
}

export class OptionsManager {
  static current: GameOptions = {
    fov: 75,
    renderDistance: 6,
    simulationDistance: 12,
    mouseSensitivity: 0.5,
    invertMouse: false,
    mouseWheelSensitivity: 1.0,
    discreteMouseScroll: false,
    touchscreen: false,
    soundVolume: 0.8,
    musicVolume: 0.6,
    blocksVolume: 0.8,
    hostileVolume: 0.8,
    friendlyVolume: 0.8,
    guiScale: 2,
    fullscreen: false,
    ao: true,
    clouds: true,
    graphics: 'fancy',
    difficulty: 'Normal',
    toggleSprint: false,
    toggleSneak: false,
    autoJump: false,
    operatorItemsTab: false,
    viewBobbing: true,
    entityShadows: true,
    distortionEffects: 1.0,
    textBackground: 0.5,
    chatOpacity: 1.0,
    maxFps: 120,
    smoothLighting: 'max',
    particles: 'all',
    wispServerUrl:
      typeof window !== 'undefined' && window.location.protocol === 'https:'
        ? 'wss://anura.pro/'
        : `ws://${(typeof window !== 'undefined' && window.location.host) || 'localhost:3000'}/wisp/`,
    username: 'Steve',
    keyBinds: { ...DEFAULT_KEYBINDS },
  };

  static async init() {
    try {
      const saved = localStorage.getItem('mc_26_3_options');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sanitize any previous hardcoded username
        if (parsed.username === 'Anders_26_3') {
          parsed.username = 'Steve';
        }
        this.current = {
          ...this.current,
          ...parsed,
          keyBinds: { ...this.current.keyBinds, ...(parsed.keyBinds || {}) },
        };
      } else {
        const res = await fetch('/options.txt');
        if (res.ok) {
          const text = await res.text();
          this.parseOfficialOptionsTxt(text);
        }
      }
    } catch {}
  }

  static parseOfficialOptionsTxt(text: string) {
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();

      if (key === 'fov') {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          this.current.fov = num <= 2.0 ? Math.round(70 + num * 40) : Math.round(num);
        }
      } else if (key === 'renderDistance') {
        const rd = parseInt(val, 10);
        if (!isNaN(rd)) this.current.renderDistance = Math.min(8, Math.max(3, rd));
      } else if (key === 'mouseSensitivity') {
        const ms = parseFloat(val);
        if (!isNaN(ms)) this.current.mouseSensitivity = ms;
      } else if (key === 'mouseWheelSensitivity') {
        const mws = parseFloat(val);
        if (!isNaN(mws)) this.current.mouseWheelSensitivity = mws;
      } else if (key === 'invertYMouse' || key === 'invertMouse') {
        this.current.invertMouse = val === 'true';
      } else if (key === 'discrete_mouse_scroll') {
        this.current.discreteMouseScroll = val === 'true';
      } else if (key === 'autoJump') {
        this.current.autoJump = val === 'true';
      } else if (key === 'operatorItemsTab') {
        this.current.operatorItemsTab = val === 'true';
      } else if (key === 'toggleSprint') {
        this.current.toggleSprint = val === 'true';
      } else if (key === 'toggleCrouch' || key === 'toggleSneak') {
        this.current.toggleSneak = val === 'true';
      }
    }
  }

  static save() {
    try {
      localStorage.setItem('mc_26_3_options', JSON.stringify(this.current));
    } catch {}
  }
}
