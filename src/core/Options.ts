/**
 * Parses and manages official `options.txt` from `/.minecraft/options.txt`
 */
export interface GameOptions {
  fov: number;
  renderDistance: number;
  mouseSensitivity: number;
  soundVolume: number;
  guiScale: number;
  fullscreen: boolean;
  ao: boolean;
  clouds: boolean;
  particles: 'all' | 'decreased' | 'minimal';
  wispServerUrl: string;
  username: string;
}

export class OptionsManager {
  static current: GameOptions = {
    fov: 75,
    renderDistance: 5,
    mouseSensitivity: 0.5,
    soundVolume: 0.8,
    guiScale: 2,
    fullscreen: false,
    ao: true,
    clouds: true,
    particles: 'all',
    wispServerUrl: `ws://${window.location.host || 'localhost:3000'}/wisp/`,
    username: 'Anders_26_3',
  };

  static async init() {
    try {
      const saved = localStorage.getItem('mc_26_3_options');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.current = { ...this.current, ...parsed };
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
        // Minecraft stores fov as (degrees - 70) / 40 or direct float
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
