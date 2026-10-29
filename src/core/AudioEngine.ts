/**
 * Web Audio API 3D Sound Engine backed by official `/assets/minecraft/sounds.json`
 * and extracted `.ogg` files from `/.minecraft/assets/objects/` (index `34.json`).
 */
export class AudioEngine {
  static ctx: AudioContext | null = null;
  static soundsMap: Record<string, any> = {};
  static audioBufferCache = new Map<string, AudioBuffer>();
  static masterVolume = 0.8;

  static async init() {
    try {
      const res = await fetch('/assets/minecraft/sounds.json');
      if (res.ok) {
        this.soundsMap = await res.json();
      }
    } catch {
      // Ignore if sounds.json not loaded yet
    }
  }

  private static ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  static async play(eventName: string, volume = 0.7, pitch = 1.0) {
    if (this.masterVolume <= 0) return;
    this.ensureContext();
    if (!this.ctx) return;

    const entry = this.soundsMap[eventName];
    if (!entry || !entry.sounds || entry.sounds.length === 0) {
      this.playProceduralFallback(eventName, volume);
      return;
    }

    const chosen = entry.sounds[Math.floor(Math.random() * entry.sounds.length)];
    const soundPath = typeof chosen === 'string' ? chosen : chosen.name;
    if (!soundPath) return;

    const url = `/assets/minecraft/sounds/${soundPath}.ogg`;
    try {
      let buffer = this.audioBufferCache.get(url);
      if (!buffer) {
        const resp = await fetch(url);
        if (!resp.ok) {
          this.playProceduralFallback(eventName, volume);
          return;
        }
        const arr = await resp.arrayBuffer();
        buffer = await this.ctx.decodeAudioData(arr);
        this.audioBufferCache.set(url, buffer);
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = pitch * (0.92 + Math.random() * 0.16);

      const gain = this.ctx.createGain();
      gain.gain.value = Math.min(1.0, volume * this.masterVolume);

      source.connect(gain);
      gain.connect(this.ctx.destination);
      source.start(0);
    } catch {
      this.playProceduralFallback(eventName, volume);
    }
  }

  private static playProceduralFallback(eventName: string, volume: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = eventName.includes('click') ? 'triangle' : 'sine';
      osc.frequency.value = eventName.includes('click') ? 520 : 220 + Math.random() * 120;
      gain.gain.setValueAtTime(0.12 * volume * this.masterVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  static playBlockSound(
    soundGroup: string,
    action: 'break' | 'place' | 'step' | 'hit'
  ) {
    const mapGroup: Record<string, string> = {
      poplar_leaves: `block.poplar_leaves.${action}`,
      straw_bed: `block.straw_bed.${action}`,
      wood: `block.wood.${action}`,
      grass: `block.grass.${action}`,
      stone: `block.stone.${action}`,
      wool: `block.wool.${action}`,
      sand: `block.sand.${action}`,
      gravel: `block.gravel.${action}`,
      glass: `block.glass.${action}`,
    };
    const ev = mapGroup[soundGroup] || `block.stone.${action}`;
    this.play(ev, action === 'step' ? 0.25 : 0.65);
  }
}
