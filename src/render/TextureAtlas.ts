import * as THREE from 'three';
import { Registries } from '../core/Registries';

export interface UVBox {
  u0: number;
  v0: number;
  u1: number;
  v1: number;
}

/**
 * Dynamically stitches official Minecraft 26.3 PNG textures from `/assets/minecraft/textures/block/*.png`
 * into a single WebGL2 Nearest-Filtered Texture Atlas with pixel-accurate UV coordinates.
 * Handles multi-layer composite block textures (`grass_block_side` + tinted `grass_block_side_overlay`)
 * and multi-tile 26.3 block sheets (`straw_bed.png` 64x64, `*_shelf.png` 32x32).
 */
export class TextureAtlas {
  static ATLAS_SIZE = 2048;
  static TILE_SIZE = 16;
  static TILES_PER_ROW = 128; // 128 * 16 = 2048 (up to 16,384 block tiles)

  static canvas: HTMLCanvasElement;
  static ctx: CanvasRenderingContext2D;
  static texture: THREE.CanvasTexture;
  static uvMap = new Map<string, UVBox>();
  static loadedImages = new Map<string, HTMLImageElement>();

  static async build(): Promise<THREE.CanvasTexture> {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.ATLAS_SIZE;
    this.canvas.height = this.ATLAS_SIZE;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.ctx.imageSmoothingEnabled = false;

    // Collect all unique block texture names referenced by registered blocks
    const neededTextures = new Set<string>();
    for (const b of Registries.allBlocks) {
      neededTextures.add(b.textures.top);
      neededTextures.add(b.textures.bottom);
      neededTextures.add(b.textures.north);
      neededTextures.add(b.textures.south);
      neededTextures.add(b.textures.east);
      neededTextures.add(b.textures.west);
    }
    neededTextures.add('grass_block_side_overlay');
    neededTextures.add('straw_bed');
    neededTextures.add('campfire_fire');
    for (let i = 0; i < 10; i++) {
      neededTextures.add(`destroy_stage_${i}`);
    }

    // Virtual composite tile names synthesized from multi-part 26.3 sheets
    const virtualTiles = new Set<string>([
      'straw_bed_foot_top',
      'straw_bed_head_top',
      'straw_bed_side',
      'poplar_shelf_front',
      'poplar_shelf_top',
    ]);

    const fileTexList = Array.from(neededTextures).filter((t) => !virtualTiles.has(t));

    const loadImg = (texName: string): Promise<[string, HTMLImageElement | null]> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve([texName, img]);
        img.onerror = () => resolve([texName, null]);
        img.src = `/assets/minecraft/textures/block/${texName}.png`;
      });
    };

    const results = await Promise.all(fileTexList.map(loadImg));
    const rawImages = new Map<string, HTMLImageElement>();
    for (const [texName, img] of results) {
      if (img) {
        this.loadedImages.set(texName, img);
        rawImages.set(texName, img);
      }
    }

    let tileIndex = 0;
    const registerCanvasTile = (texName: string, drawFn: (ctx: CanvasRenderingContext2D, px: number, py: number) => void) => {
      const col = tileIndex % this.TILES_PER_ROW;
      const row = Math.floor(tileIndex / this.TILES_PER_ROW);
      const px = col * this.TILE_SIZE;
      const py = row * this.TILE_SIZE;

      drawFn(this.ctx, px, py);

      // Also store a 16x16 HTMLImageElement/Canvas snapshot in loadedImages for ItemIconRenderer
      const snap = document.createElement('canvas');
      snap.width = 16;
      snap.height = 16;
      const sctx = snap.getContext('2d')!;
      sctx.imageSmoothingEnabled = false;
      sctx.drawImage(this.canvas, px, py, 16, 16, 0, 0, 16, 16);
      const snapImg = new Image();
      snapImg.src = snap.toDataURL();
      this.loadedImages.set(texName, snap as unknown as HTMLImageElement);

      const inset = 0.08 / this.ATLAS_SIZE;
      const u0 = px / this.ATLAS_SIZE + inset;
      const u1 = (px + this.TILE_SIZE) / this.ATLAS_SIZE - inset;
      const v1 = 1.0 - py / this.ATLAS_SIZE - inset;
      const v0 = 1.0 - (py + this.TILE_SIZE) / this.ATLAS_SIZE + inset;

      this.uvMap.set(texName, { u0, v0, u1, v1 });
      tileIndex++;
    };

    const grassOverlayImg = this.loadedImages.get('grass_block_side_overlay');

    for (const [texName, img] of results) {
      registerCanvasTile(texName, (ctx, px, py) => {
        if (!img) {
          ctx.fillStyle = '#ff00ff';
          ctx.fillRect(px, py, 16, 16);
          ctx.fillStyle = '#000000';
          ctx.fillRect(px, py, 8, 8);
          ctx.fillRect(px + 8, py + 8, 8, 8);
          return;
        }

        // Draw first 16x16 frame
        ctx.drawImage(img, 0, 0, 16, 16, px, py, 16, 16);

        // Official grass_block.json: composite tinted grass_block_side_overlay.png onto grass_block_side.png!
        if (texName === 'grass_block_side' && grassOverlayImg) {
          const tmp = document.createElement('canvas');
          tmp.width = 16;
          tmp.height = 16;
          const tctx = tmp.getContext('2d', { willReadFrequently: true })!;
          tctx.imageSmoothingEnabled = false;
          tctx.drawImage(grassOverlayImg, 0, 0, 16, 16, 0, 0, 16, 16);
          const idata = tctx.getImageData(0, 0, 16, 16);
          const d = idata.data;
          // Multiply grayscale overlay pixels by lush grass green (#79c05a)
          for (let i = 0; i < d.length; i += 4) {
            if (d[i + 3] > 0) {
              d[i] = Math.min(255, Math.floor((d[i] * 0x79) / 255));
              d[i + 1] = Math.min(255, Math.floor((d[i + 1] * 0xc0) / 255));
              d[i + 2] = Math.min(255, Math.floor((d[i + 2] * 0x5a) / 255));
            }
          }
          tctx.putImageData(idata, 0, 0);
          ctx.drawImage(tmp, 0, 0, 16, 16, px, py, 16, 16);
        }
      });
    }

    // Synthesize exact sub-tiles from 26.3's 64x64 straw_bed.png and 32x32 poplar_shelf.png
    const strawBedImg = rawImages.get('straw_bed');
    if (strawBedImg) {
      // Foot mattress top: UV [4..8, 6.25..10.25] in 64x64 => pixels (16, 25, 16, 16)
      registerCanvasTile('straw_bed_foot_top', (ctx, px, py) => {
        ctx.drawImage(strawBedImg, 16, 25, 16, 16, px, py, 16, 16);
      });
      // Head pillow + blanket top: pillow (8, 0, 16, 8) + blanket (8, 13, 16, 8)
      registerCanvasTile('straw_bed_head_top', (ctx, px, py) => {
        ctx.drawImage(strawBedImg, 8, 13, 16, 16, px, py, 16, 16);
        ctx.drawImage(strawBedImg, 8, 0, 16, 8, px, py, 16, 8);
      });
      // Bed side straw & frame: UV [4..8, 10.25..11.25]
      registerCanvasTile('straw_bed_side', (ctx, px, py) => {
        ctx.drawImage(strawBedImg, 16, 25, 16, 16, px, py, 16, 16);
        ctx.drawImage(strawBedImg, 16, 41, 16, 4, px, py + 12, 16, 4);
      });
    }

    const poplarShelfImg = rawImages.get('poplar_shelf');
    if (poplarShelfImg) {
      // template_shelf_body.json: back panel (16..32, 0..16) + top shelf (0..16, 0..4) + bottom shelf (0..16, 12..16)
      registerCanvasTile('poplar_shelf_front', (ctx, px, py) => {
        ctx.drawImage(poplarShelfImg, 16, 0, 16, 16, px, py, 16, 16);
        ctx.drawImage(poplarShelfImg, 0, 0, 16, 4, px, py, 16, 4);
        ctx.drawImage(poplarShelfImg, 0, 12, 16, 4, px, py + 12, 16, 4);
      });
      registerCanvasTile('poplar_shelf_top', (ctx, px, py) => {
        ctx.drawImage(poplarShelfImg, 16, 0, 16, 16, px, py, 16, 16);
      });
    }

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.needsUpdate = true;

    return this.texture;
  }

  static getUV(texName: string): UVBox {
    return (
      this.uvMap.get(texName) ||
      this.uvMap.get('stone') || { u0: 0, v0: 0, u1: 16 / this.ATLAS_SIZE, v1: 16 / this.ATLAS_SIZE }
    );
  }
}
