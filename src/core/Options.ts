/**
 * Parses and manages official `options.txt` from `/.minecraft/options.txt`
 */
export interface KeyBinds {
  forward: string;
  back: string;
  left: string;
  right: string;
  jump: string;
  sneak: string;
  sprint: string;
  drop: string;
  inventory: string;
  chat: string;
  command: string;
}

export interface GameOptions {
  fov: number;
  renderDistance: number;
  mouseSensitivity: number;
  invertMouse: boolean;
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
  particles: 'all' | 'decreased' | 'minimal';
  wispServerUrl: string;
  username: string;
  keyBinds: KeyBinds;
}

export class OptionsManager {
  static current: GameOptions = {
    fov: 75,
    renderDistance: 6,
    mouseSensitivity: 0.5,
    invertMouse: false,
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
    particles: 'all',
    wispServerUrl: `ws://${window.location.host || 'localhost:3000'}/wisp/`,
    username: 'Steve',
    keyBinds: {
      forward: 'KeyW',
      back: 'KeyS',
      left: 'KeyA',
      right: 'KeyD',
      jump: 'Space',
      sneak: 'ShiftLeft',
      sprint: 'ControlLeft',
      drop: 'KeyQ',
      inventory: 'KeyE',
      chat: 'KeyT',
      command: 'Slash',
    },
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
      }
    }
  }

  static save() {
    try {
      localStorage.setItem('mc_26_3_options', JSON.stringify(this.current));
    } catch {}
  }
}
