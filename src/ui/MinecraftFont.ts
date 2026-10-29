// Official Minecraft 26.3 Bitmap Font Renderer (assets/minecraft/font/include/default.json + textures/font/ascii.png)
// Renders pixel-perfect bitmap characters with exact per-glyph pixel widths, 1px drop shadows, and § formatting codes.

export interface GlyphInfo {
  sheetIndex: number;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  advance: number;
  ascent: number;
}

const MC_COLOR_CODES: Record<string, string> = {
  '0': '#000000',
  '1': '#0000AA',
  '2': '#00AA00',
  '3': '#00AAAA',
  '4': '#AA0000',
  '5': '#AA00AA',
  '6': '#FFAA00',
  '7': '#AAAAAA',
  '8': '#555555',
  '9': '#5555FF',
  'a': '#55FF55',
  'b': '#55FFFF',
  'c': '#FF5555',
  'd': '#FF55FF',
  'e': '#FFFF55',
  'f': '#FFFFFF',
};

const MC_SHADOW_CODES: Record<string, string> = {
  '0': '#000000',
  '1': '#00002A',
  '2': '#002A00',
  '3': '#002A2A',
  '4': '#2A0000',
  '5': '#2A002A',
  '6': '#2A2A00',
  '7': '#2A2A2A',
  '8': '#151515',
  '9': '#15153F',
  'a': '#153F15',
  'b': '#153F3F',
  'c': '#3F1515',
  'd': '#3F153F',
  'e': '#3F3F15',
  'f': '#3F3F3F',
};

export class MinecraftFont {
  private glyphs = new Map<number, GlyphInfo>();
  private sheets: HTMLCanvasElement[] = [];
  private tintedSheetCache = new Map<string, HTMLCanvasElement>();
  public ready = false;
  public readonly lineHeight = 9;

  async init(): Promise<void> {
    try {
      const res = await fetch('/assets/minecraft/font/include/default.json');
      const data = await res.json();
      const providers = data.providers || [];

      for (const provider of providers) {
        if (provider.type === 'space' && provider.advances) {
          for (const [ch, adv] of Object.entries(provider.advances)) {
            const cp = ch.codePointAt(0);
            if (cp !== undefined) {
              this.glyphs.set(cp, {
                sheetIndex: -1,
                sx: 0,
                sy: 0,
                sw: 0,
                sh: 0,
                advance: Number(adv),
                ascent: 0,
              });
            }
          }
        } else if (provider.type === 'bitmap' && provider.file && Array.isArray(provider.chars)) {
          const filePath = provider.file.replace('minecraft:', '/assets/minecraft/textures/');
          const img = await this.loadImage(filePath);
          if (!img) continue;

          const sheetCanvas = document.createElement('canvas');
          sheetCanvas.width = img.width;
          sheetCanvas.height = img.height;
          const sctx = sheetCanvas.getContext('2d', { willReadFrequently: true })!;
          sctx.drawImage(img, 0, 0);
          const imgData = sctx.getImageData(0, 0, img.width, img.height);
          const sheetIndex = this.sheets.length;
          this.sheets.push(sheetCanvas);

          const rows = provider.chars.length;
          const firstRowChars = Array.from(provider.chars[0] as string);
          const cols = firstRowChars.length;
          const cellW = Math.floor(img.width / cols);
          const cellH = Math.floor(img.height / rows);
          const height = provider.height ?? 8;
          const ascent = provider.ascent ?? 7;

          for (let r = 0; r < rows; r++) {
            const rowCodePoints = Array.from(provider.chars[r] as string);
            for (let c = 0; c < rowCodePoints.length; c++) {
              const ch = rowCodePoints[c];
              const cp = ch.codePointAt(0);
              if (!cp || cp === 0 || this.glyphs.has(cp)) continue;

              const sx = c * cellW;
              const sy = r * cellH;
              // Scan rightmost non-transparent pixel column in cell (like BitmapProvider.java)
              let maxCol = -1;
              for (let x = cellW - 1; x >= 0; x--) {
                let colHasPixel = false;
                for (let y = 0; y < cellH; y++) {
                  const alpha = imgData.data[((sy + y) * img.width + (sx + x)) * 4 + 3];
                  if (alpha > 0) {
                    colHasPixel = true;
                    break;
                  }
                }
                if (colHasPixel) {
                  maxCol = x;
                  break;
                }
              }

              const actualWidthPx = maxCol + 1;
              const scale = height / cellH;
              const advance = Math.round(actualWidthPx * scale) + 1;

              this.glyphs.set(cp, {
                sheetIndex,
                sx,
                sy,
                sw: cellW,
                sh: cellH,
                advance: Math.max(2, advance),
                ascent,
              });
            }
          }
        }
      }

      // Ensure space (32) always exists with advance 4
      if (!this.glyphs.has(32)) {
        this.glyphs.set(32, { sheetIndex: -1, sx: 0, sy: 0, sw: 0, sh: 0, advance: 4, ascent: 0 });
      }
      this.ready = true;
    } catch (e) {
      console.warn('Failed to initialize MinecraftFont:', e);
    }
  }

  private loadImage(url: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  private getTintedSheet(sheetIndex: number, color: string): HTMLCanvasElement {
    const key = `${sheetIndex}:${color}`;
    let cached = this.tintedSheetCache.get(key);
    if (cached) return cached;

    const base = this.sheets[sheetIndex];
    const canvas = document.createElement('canvas');
    canvas.width = base.width;
    canvas.height = base.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(base, 0, 0);
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cap cache size
    if (this.tintedSheetCache.size > 160) {
      const firstKey = this.tintedSheetCache.keys().next().value;
      if (firstKey) this.tintedSheetCache.delete(firstKey);
    }
    this.tintedSheetCache.set(key, canvas);
    return canvas;
  }

  public static darkenColor(hex: string): string {
    const clean = hex.replace('#', '');
    if (clean.length === 6) {
      const r = Math.floor(parseInt(clean.slice(0, 2), 16) / 4);
      const g = Math.floor(parseInt(clean.slice(2, 4), 16) / 4);
      const b = Math.floor(parseInt(clean.slice(4, 6), 16) / 4);
      return `rgb(${r},${g},${b})`;
    }
    return '#202020';
  }

  /** Compute exact width in GUI pixels (ignoring § formatting codes) */
  public width(text: string): number {
    if (!text) return 0;
    let total = 0;
    let bold = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '§' && i + 1 < text.length) {
        const code = text[i + 1].toLowerCase();
        if (code === 'l') bold = true;
        else if (code === 'r' || (code >= '0' && code <= '9') || (code >= 'a' && code <= 'f')) bold = false;
        i++;
        continue;
      }
      const cp = text.codePointAt(i) || 32;
      if (cp > 0xffff) i++;
      const g = this.glyphs.get(cp) || this.glyphs.get(63); // '?' fallback
      total += (g ? g.advance : 6) + (bold ? 1 : 0);
    }
    return total;
  }

  /** Draw string at GUI coordinates (x, y) */
  public draw(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color = '#FFFFFF',
    shadow = true
  ): number {
    if (!text) return x;
    x = Math.floor(x);
    y = Math.floor(y);

    if (!this.ready || this.sheets.length === 0) {
      ctx.save();
      ctx.font = '8px monospace';
      if (shadow) {
        ctx.fillStyle = MinecraftFont.darkenColor(color);
        ctx.fillText(text.replace(/§[0-9a-fk-or]/gi, ''), x + 1, y + 7);
      }
      ctx.fillStyle = color;
      ctx.fillText(text.replace(/§[0-9a-fk-or]/gi, ''), x, y + 6);
      ctx.restore();
      return x + text.length * 6;
    }

    ctx.imageSmoothingEnabled = false;

    if (shadow) {
      this.drawPass(ctx, text, x + 1, y + 1, color, true);
    }
    return this.drawPass(ctx, text, x, y, color, false);
  }

  private drawPass(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    baseColor: string,
    isShadowPass: boolean
  ): number {
    let curX = x;
    let curColor = isShadowPass ? MinecraftFont.darkenColor(baseColor) : baseColor;
    let bold = false;
    let underline = false;
    let strikethrough = false;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '§' && i + 1 < text.length) {
        const code = text[i + 1].toLowerCase();
        if (MC_COLOR_CODES[code]) {
          curColor = isShadowPass ? MC_SHADOW_CODES[code] : MC_COLOR_CODES[code];
          bold = false;
          underline = false;
          strikethrough = false;
        } else if (code === 'l') {
          bold = true;
        } else if (code === 'n') {
          underline = true;
        } else if (code === 'm') {
          strikethrough = true;
        } else if (code === 'r') {
          curColor = isShadowPass ? MinecraftFont.darkenColor(baseColor) : baseColor;
          bold = false;
          underline = false;
          strikethrough = false;
        }
        i++;
        continue;
      }

      const cp = text.codePointAt(i) || 32;
      if (cp > 0xffff) i++;
      const g = this.glyphs.get(cp) || this.glyphs.get(63);
      if (!g) {
        curX += 6;
        continue;
      }

      if (g.sheetIndex >= 0 && g.sw > 0 && g.sh > 0) {
        const sheet = this.getTintedSheet(g.sheetIndex, curColor);
        const drawY = y + (7 - g.ascent);
        ctx.drawImage(sheet, g.sx, g.sy, g.sw, g.sh, curX, drawY, 8, 8);
        if (bold) {
          ctx.drawImage(sheet, g.sx, g.sy, g.sw, g.sh, curX + 1, drawY, 8, 8);
        }
      }

      const adv = g.advance + (bold ? 1 : 0);
      if (underline) {
        ctx.fillStyle = curColor;
        ctx.fillRect(curX, y + 8, adv, 1);
      }
      if (strikethrough) {
        ctx.fillStyle = curColor;
        ctx.fillRect(curX, y + 3, adv, 1);
      }
      curX += adv;
    }

    return curX;
  }

  public drawCentered(
    ctx: CanvasRenderingContext2D,
    text: string,
    centerX: number,
    y: number,
    color = '#FFFFFF',
    shadow = true
  ): void {
    const w = this.width(text);
    this.draw(ctx, text, Math.floor(centerX - w / 2), y, color, shadow);
  }

  public split(text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    for (const rawLine of text.split('\n')) {
      const words = rawLine.split(' ');
      let current = '';
      for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (this.width(candidate) <= maxWidth || !current) {
          current = candidate;
        } else {
          lines.push(current);
          current = word;
        }
      }
      if (current || rawLine === '') lines.push(current);
    }
    return lines;
  }
}
