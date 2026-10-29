// Official Minecraft 26.3 Isometric 3D Block & Item Icon Renderer for GUI Slots
// Renders blocks with orthographic [30°, 225°, 0°] projection and directional face shading (top: 1.0, left: 0.8, right: 0.6)
// and flat items directly from their 16x16 item textures.

import { Registries, ItemDefinition } from '../core/Registries';
import { TextureAtlas } from './TextureAtlas';

export class ItemIconRenderer {
  private iconCache = new Map<string, HTMLCanvasElement>();
  private itemImageCache = new Map<string, HTMLImageElement>();
  private loadingImages = new Set<string>();

  /** Get or render a 32x32 crisp icon canvas (drawn at 16x16 in GUI coordinates) for any ItemDefinition */
  public getIcon(item: ItemDefinition): HTMLCanvasElement | null {
    if (!item) return null;
    const cached = this.iconCache.get(item.id);
    if (cached) return cached;

    const shortName = item.shortId;

    // 1. Non-block items or flat/cross blocks use their 2D sprite texture directly
    const blockDef =
      item.isBlock && item.blockNumId !== undefined
        ? Registries.getBlock(item.blockNumId)
        : null;

    const isFlatSprite =
      !blockDef ||
      blockDef.shape === 'cross' ||
      blockDef.shape === 'torch' ||
      blockDef.shape === 'campfire' ||
      blockDef.shape === 'door_bottom' ||
      shortName.endsWith('_cushion') ||
      shortName === 'torch' ||
      shortName === 'campfire' ||
      shortName === 'lantern';

    if (isFlatSprite) {
      let url = `/assets/minecraft/textures/${item.texture}.png`;
      if (shortName === 'campfire') url = '/assets/minecraft/textures/item/campfire.png';
      else if (shortName === 'lantern') url = '/assets/minecraft/textures/item/lantern.png';
      const img = this.getOrLoadImage(url, item.id);
      if (img) {
        const canvas = this.renderFlatIcon(img, blockDef?.tint);
        this.iconCache.set(item.id, canvas);
        return canvas;
      }
      return null;
    }

    // 2. 3D Isometric Block Rendering using TextureAtlas.loadedImages
    const topKey = shortName === 'straw_bed' ? 'straw_bed_head_top' : blockDef.textures.top;
    const topImg =
      TextureAtlas.loadedImages.get(topKey) ||
      this.getOrLoadImage(`/assets/minecraft/textures/block/${topKey}.png`, item.id);
    const frontImg =
      TextureAtlas.loadedImages.get(blockDef.textures.north) ||
      this.getOrLoadImage(`/assets/minecraft/textures/block/${blockDef.textures.north}.png`, item.id);
    const sideImg =
      TextureAtlas.loadedImages.get(blockDef.textures.east) ||
      this.getOrLoadImage(`/assets/minecraft/textures/block/${blockDef.textures.east}.png`, item.id);

    if (!topImg || !frontImg || !sideImg) {
      return null;
    }

    const isSlab = blockDef.shape === 'slab_bottom' || shortName.endsWith('_slab');
    const isBed = blockDef.shape === 'bed_foot' || shortName === 'straw_bed';
    const isStairs = blockDef.shape === 'stairs' || shortName.endsWith('_stairs');
    const isCarpet = blockDef.shape === 'carpet' || shortName.endsWith('_carpet') || shortName.endsWith('_trapdoor');
    const heightRatio = isBed ? 0.5 : isSlab ? 0.5 : isCarpet ? 0.18 : 1.0;

    const canvas = this.renderIsometricBlock(
      blockDef.tint,
      topImg,
      frontImg,
      sideImg,
      heightRatio,
      isStairs
    );
    this.iconCache.set(item.id, canvas);
    return canvas;
  }

  private getOrLoadImage(url: string, cacheKey: string): HTMLImageElement | null {
    const cached = this.itemImageCache.get(url);
    if (cached) return cached;

    if (!this.loadingImages.has(url)) {
      this.loadingImages.add(url);
      const img = new Image();
      img.onload = () => {
        this.itemImageCache.set(url, img);
        this.loadingImages.delete(url);
        this.iconCache.delete(cacheKey);
      };
      img.onerror = () => {
        this.loadingImages.delete(url);
      };
      img.src = url;
    }
    return null;
  }

  private tintBiomeFace(
    img: HTMLImageElement,
    tint: string | undefined,
    isTop: boolean,
    brightness: number
  ): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 16;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, 16, 16, 0, 0, 16, 16);

    const imgData = ctx.getImageData(0, 0, 16, 16);
    const d = imgData.data;

    let tintR = 1.0;
    let tintG = 1.0;
    let tintB = 1.0;
    if (tint === 'grass' && isTop) {
      tintR = 0x79 / 255;
      tintG = 0xc0 / 255;
      tintB = 0x5a / 255;
    } else if (tint === 'foliage') {
      tintR = 0x59 / 255;
      tintG = 0xae / 255;
      tintB = 0x30 / 255;
    } else if (tint === 'birch') {
      tintR = 0x80 / 255;
      tintG = 0xa7 / 255;
      tintB = 0x55 / 255;
    } else if (tint === 'spruce') {
      tintR = 0x61 / 255;
      tintG = 0x99 / 255;
      tintB = 0x61 / 255;
    } else if (tint === 'water') {
      tintR = 0x3f / 255;
      tintG = 0x76 / 255;
      tintB = 0xe4 / 255;
    }

    for (let i = 0; i < d.length; i += 4) {
      d[i] = Math.min(255, Math.floor(d[i] * tintR * brightness));
      d[i + 1] = Math.min(255, Math.floor(d[i + 1] * tintG * brightness));
      d[i + 2] = Math.min(255, Math.floor(d[i + 2] * tintB * brightness));
    }
    ctx.putImageData(imgData, 0, 0);
    return c;
  }

  private renderFlatIcon(img: HTMLImageElement, tint?: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    const tinted = this.tintBiomeFace(img, tint, true, 1.0);
    ctx.drawImage(tinted, 0, 0, 16, 16, 0, 0, 32, 32);
    return canvas;
  }

  private renderIsometricBlock(
    tint: string | undefined,
    topImg: HTMLImageElement,
    frontImg: HTMLImageElement,
    sideImg: HTMLImageElement,
    heightRatio: number,
    isStairs: boolean
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const topFace = this.tintBiomeFace(topImg, tint, true, 1.0);
    const leftFace = this.tintBiomeFace(frontImg, tint, false, 0.8);
    const rightFace = this.tintBiomeFace(sideImg, tint, false, 0.6);

    const yOffset = Math.round((1 - heightRatio) * 14);

    if (isStairs) {
      // Lower slab half (by: 0..8, bx: 0..16, bz: 0..16)
      ctx.save();
      ctx.transform(0.875, 0.4375, 0, 0.875, 2, 16);
      ctx.drawImage(leftFace, 0, 8, 16, 8, 0, 0, 16, 8);
      ctx.restore();

      ctx.save();
      ctx.transform(0.875, -0.4375, 0, 0.875, 16, 23);
      ctx.drawImage(rightFace, 0, 8, 16, 8, 0, 0, 16, 8);
      ctx.restore();

      ctx.save();
      ctx.transform(0.875, -0.4375, 0.875, 0.4375, 2, 16);
      ctx.drawImage(topFace, 0, 0, 16, 16, 0, 0, 16, 16);
      ctx.restore();

      // Upper back step (bz: 8..16, bx: 0..16, by: 8..16)
      // 1. Front-left vertical riser at bz = 8 (width 16 along bx, height 8 along by)
      ctx.save();
      ctx.transform(0.875, 0.4375, 0, 0.875, 9, 5.5);
      ctx.drawImage(leftFace, 0, 0, 16, 8, 0, 0, 16, 8);
      ctx.restore();

      // 2. Front-right vertical side at bx = 16 (width 8 along bz 8..16, height 8 along by)
      ctx.save();
      ctx.transform(0.875, -0.4375, 0, 0.875, 23, 12.5);
      ctx.drawImage(rightFace, 8, 0, 8, 8, 0, 0, 8, 8);
      ctx.restore();

      // 3. Upper step top tread at by = 16 (u: 8..16 along bz, v: 0..16 along bx -> 8x16!)
      ctx.save();
      ctx.transform(0.875, -0.4375, 0.875, 0.4375, 9, 5.5);
      ctx.drawImage(topFace, 8, 0, 8, 16, 0, 0, 8, 16);
      ctx.restore();

      return canvas;
    }

    const srcH = Math.max(2, Math.round(16 * heightRatio));
    const srcY = 16 - srcH;

    // Left face (front-left)
    ctx.save();
    ctx.transform(0.875, 0.4375, 0, 0.875, 2, 9 + yOffset);
    ctx.drawImage(leftFace, 0, srcY, 16, srcH, 0, 0, 16, srcH);
    ctx.restore();

    // Right face (front-right)
    ctx.save();
    ctx.transform(0.875, -0.4375, 0, 0.875, 16, 16 + yOffset);
    ctx.drawImage(rightFace, 0, srcY, 16, srcH, 0, 0, 16, srcH);
    ctx.restore();

    // Top face (diamond)
    ctx.save();
    ctx.transform(0.875, -0.4375, 0.875, 0.4375, 2, 9 + yOffset);
    ctx.drawImage(topFace, 0, 0, 16, 16, 0, 0, 16, 16);
    ctx.restore();

    return canvas;
  }
}
