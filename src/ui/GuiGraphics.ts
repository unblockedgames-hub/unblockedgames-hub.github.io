// Official Minecraft 26.3 GuiGraphics Canvas 2D Renderer
// Handles GUI scale calculation, crisp nearest-neighbor sprite blitting, 9-slice widgets,
// tiled backgrounds, 3D isometric item rendering, stack counts, and vanilla tooltips.

import { MinecraftFont } from './MinecraftFont';
import { ItemIconRenderer } from '../render/ItemIconRenderer';
import { ItemDefinition } from '../core/Registries';

const PRELOAD_GUI_TEXTURES = [
  '/assets/minecraft/textures/gui/title/minecraft.png',
  '/assets/minecraft/textures/gui/title/edition.png',
  '/assets/minecraft/textures/gui/title/mojangstudios.png',
  '/assets/minecraft/textures/gui/panorama_overlay.png',
  '/assets/minecraft/textures/gui/menu_background.png',
  '/assets/minecraft/textures/gui/menu_list_background.png',
  '/assets/minecraft/textures/gui/inworld_menu_background.png',
  '/assets/minecraft/textures/gui/inworld_menu_list_background.png',
  '/assets/minecraft/textures/gui/header_separator.png',
  '/assets/minecraft/textures/gui/footer_separator.png',
  '/assets/minecraft/textures/gui/inworld_header_separator.png',
  '/assets/minecraft/textures/gui/inworld_footer_separator.png',
  '/assets/minecraft/textures/gui/tab_header_background.png',
  // Widgets
  '/assets/minecraft/textures/gui/sprites/widget/button.png',
  '/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/widget/button_disabled.png',
  '/assets/minecraft/textures/gui/sprites/widget/slider.png',
  '/assets/minecraft/textures/gui/sprites/widget/slider_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/widget/slider_handle.png',
  '/assets/minecraft/textures/gui/sprites/widget/slider_handle_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/widget/text_field.png',
  '/assets/minecraft/textures/gui/sprites/widget/text_field_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/widget/tab.png',
  '/assets/minecraft/textures/gui/sprites/widget/tab_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/widget/tab_selected.png',
  '/assets/minecraft/textures/gui/sprites/widget/tab_selected_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/widget/checkbox.png',
  '/assets/minecraft/textures/gui/sprites/widget/checkbox_selected.png',
  // Icons
  '/assets/minecraft/textures/gui/sprites/icon/language.png',
  '/assets/minecraft/textures/gui/sprites/icon/accessibility.png',
  '/assets/minecraft/textures/gui/sprites/icon/search.png',
  '/assets/minecraft/textures/gui/sprites/icon/checkmark.png',
  '/assets/minecraft/textures/gui/sprites/icon/unseen_notification.png',
  '/assets/minecraft/textures/gui/sprites/friends/button.png',
  '/assets/minecraft/textures/gui/sprites/friends/button_highlighted.png',
  // HUD
  '/assets/minecraft/textures/gui/sprites/hud/hotbar.png',
  '/assets/minecraft/textures/gui/sprites/hud/hotbar_selection.png',
  '/assets/minecraft/textures/gui/sprites/hud/hotbar_offhand_left.png',
  '/assets/minecraft/textures/gui/sprites/hud/crosshair.png',
  '/assets/minecraft/textures/gui/sprites/hud/experience_bar_background.png',
  '/assets/minecraft/textures/gui/sprites/hud/experience_bar_progress.png',
  '/assets/minecraft/textures/gui/sprites/hud/heart/container.png',
  '/assets/minecraft/textures/gui/sprites/hud/heart/full.png',
  '/assets/minecraft/textures/gui/sprites/hud/heart/half.png',
  '/assets/minecraft/textures/gui/sprites/hud/food_empty.png',
  '/assets/minecraft/textures/gui/sprites/hud/food_full.png',
  '/assets/minecraft/textures/gui/sprites/hud/food_half.png',
  '/assets/minecraft/textures/gui/sprites/hud/armor_empty.png',
  '/assets/minecraft/textures/gui/sprites/hud/armor_full.png',
  '/assets/minecraft/textures/gui/sprites/hud/armor_half.png',
  '/assets/minecraft/textures/gui/sprites/hud/air.png',
  '/assets/minecraft/textures/gui/sprites/hud/air_empty.png',
  // Containers
  '/assets/minecraft/textures/gui/container/inventory.png',
  '/assets/minecraft/textures/gui/container/crafting_table.png',
  '/assets/minecraft/textures/gui/container/stonecutter.png',
  '/assets/minecraft/textures/gui/container/furnace.png',
  '/assets/minecraft/textures/gui/container/generic_54.png',
  '/assets/minecraft/textures/gui/container/gamemode_switcher.png',
  '/assets/minecraft/textures/gui/container/creative_inventory/tab_items.png',
  '/assets/minecraft/textures/gui/container/creative_inventory/tab_item_search.png',
  '/assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/scroller_disabled.png',
  '/assets/minecraft/textures/gui/sprites/container/slot/helmet.png',
  '/assets/minecraft/textures/gui/sprites/container/slot/chestplate.png',
  '/assets/minecraft/textures/gui/sprites/container/slot/leggings.png',
  '/assets/minecraft/textures/gui/sprites/container/slot/boots.png',
  '/assets/minecraft/textures/gui/sprites/container/slot/shield.png',
  '/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe.png',
  '/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/container/stonecutter/recipe_selected.png',
  '/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller.png',
  '/assets/minecraft/textures/gui/sprites/container/stonecutter/scroller_disabled.png',
  '/assets/minecraft/textures/gui/sprites/container/furnace/lit_progress.png',
  '/assets/minecraft/textures/gui/sprites/container/furnace/burn_progress.png',
  '/assets/minecraft/textures/gui/sprites/recipe_book/button.png',
  '/assets/minecraft/textures/gui/sprites/recipe_book/button_highlighted.png',
  '/assets/minecraft/textures/gui/recipe_book.png',
  // Creative tabs 1..7
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_1.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_2.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_3.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_4.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_5.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_6.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_selected_7.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_1.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_2.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_3.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_4.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_5.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_6.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_top_unselected_7.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_1.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_2.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_3.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_4.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_5.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_6.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_selected_7.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_1.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_2.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_3.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_4.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_5.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_6.png',
  '/assets/minecraft/textures/gui/sprites/container/creative_inventory/tab_bottom_unselected_7.png',
  // Server list & World list
  '/assets/minecraft/textures/gui/sprites/server_list/ping_5.png',
  '/assets/minecraft/textures/gui/sprites/server_list/ping_4.png',
  '/assets/minecraft/textures/gui/sprites/server_list/ping_3.png',
  '/assets/minecraft/textures/gui/sprites/server_list/ping_2.png',
  '/assets/minecraft/textures/gui/sprites/server_list/ping_1.png',
  '/assets/minecraft/textures/gui/sprites/server_list/unreachable.png',
  '/assets/minecraft/textures/gui/sprites/server_list/join.png',
  '/assets/minecraft/textures/gui/sprites/server_list/join_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/world_list/join.png',
  '/assets/minecraft/textures/gui/sprites/world_list/join_highlighted.png',
  '/assets/minecraft/textures/gui/sprites/toast/advancement.png',
  '/assets/minecraft/textures/gui/sprites/toast/system.png',
  '/assets/minecraft/textures/gui/sprites/gamemode_switcher/slot.png',
  '/assets/minecraft/textures/gui/sprites/gamemode_switcher/selection.png',
  '/assets/minecraft/textures/misc/unknown_pack.png',
  '/assets/minecraft/textures/misc/unknown_server.png',
  '/assets/minecraft/textures/entity/player/wide/steve.png',
];

export class GuiGraphics {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public guiScale = 3;
  public scaledWidth = 640;
  public scaledHeight = 360;
  private images = new Map<string, HTMLImageElement>();
  private loading = new Set<string>();

  constructor(
    canvas: HTMLCanvasElement,
    public font: MinecraftFont,
    public itemRenderer: ItemIconRenderer
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;
  }

  public async preload(): Promise<void> {
    await Promise.all(PRELOAD_GUI_TEXTURES.map((url) => this.loadImage(url)));
  }

  private loadImage(url: string): Promise<HTMLImageElement | null> {
    if (this.images.has(url)) return Promise.resolve(this.images.get(url)!);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(url, img);
        resolve(img);
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  public getImage(url: string): HTMLImageElement | null {
    const img = this.images.get(url);
    if (img) return img;
    if (!this.loading.has(url)) {
      this.loading.add(url);
      this.loadImage(url).then(() => this.loading.delete(url));
    }
    return null;
  }

  /** Calculate GUI virtual resolution matching Window.calculateScale in Minecraft 26.3 */
  public updateScale(preferredScale = 0): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let maxScale = 1;
    while (
      maxScale < 4 &&
      w / (maxScale + 1) >= 320 &&
      h / (maxScale + 1) >= 240
    ) {
      maxScale++;
    }
    this.guiScale =
      preferredScale > 0 ? Math.min(preferredScale, maxScale) : maxScale;
    this.scaledWidth = Math.ceil(w / this.guiScale);
    this.scaledHeight = Math.ceil(h / this.guiScale);

    const targetW = this.scaledWidth * this.guiScale;
    const targetH = this.scaledHeight * this.guiScale;
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }

    this.ctx.setTransform(this.guiScale, 0, 0, this.guiScale, 0, 0);
    this.ctx.imageSmoothingEnabled = false;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.scaledWidth, this.scaledHeight);
  }

  public fill(x1: number, y1: number, x2: number, y2: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      Math.floor(x1),
      Math.floor(y1),
      Math.floor(x2 - x1),
      Math.floor(y2 - y1)
    );
  }

  public fillGradient(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    colorTop: string,
    colorBottom: string
  ): void {
    const grad = this.ctx.createLinearGradient(0, y1, 0, y2);
    grad.addColorStop(0, colorTop);
    grad.addColorStop(1, colorBottom);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(
      Math.floor(x1),
      Math.floor(y1),
      Math.floor(x2 - x1),
      Math.floor(y2 - y1)
    );
  }

  /**
   * Blit sub-region (u, v, width, height) of texture (with virtual dimensions texW x texH)
   * onto GUI coordinates (x, y, width, height), matching Minecraft's GuiGraphics.blit().
   */
  public blit(
    url: string,
    x: number,
    y: number,
    u: number,
    v: number,
    width: number,
    height: number,
    texW = 256,
    texH = 256
  ): void {
    const img = this.getImage(url);
    if (!img) return;
    const scaleX = img.width / texW;
    const scaleY = img.height / texH;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(
      img,
      u * scaleX,
      v * scaleY,
      width * scaleX,
      height * scaleY,
      Math.floor(x),
      Math.floor(y),
      Math.floor(width),
      Math.floor(height)
    );
  }

  /** Blit entire sprite image onto (x, y, width, height) */
  public blitSprite(url: string, x: number, y: number, width: number, height: number): void {
    const img = this.getImage(url);
    if (!img) return;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      Math.floor(x),
      Math.floor(y),
      Math.floor(width),
      Math.floor(height)
    );
  }

  /** Blit 9-slice sprite (used by buttons, sliders, text fields) */
  public blitNineSlice(
    url: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bL = 3,
    bT = 3,
    bR = 3,
    bB = 3
  ): void {
    const img = this.getImage(url);
    if (!img) {
      this.fill(x, y, x + w, y + h, '#555555');
      return;
    }
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    const sw = img.width;
    const sh = img.height;

    this.ctx.imageSmoothingEnabled = false;

    // For standard 200x20 button sprites where height is 20, horizontal 3-slice is fastest and crispest
    if (h === sh && w <= sw) {
      const halfW = Math.floor(w / 2);
      const remW = w - halfW;
      this.ctx.drawImage(img, 0, 0, halfW, sh, x, y, halfW, h);
      this.ctx.drawImage(img, sw - remW, 0, remW, sh, x + halfW, y, remW, h);
      return;
    }

    const cw = Math.max(0, w - bL - bR);
    const ch = Math.max(0, h - bT - bB);
    const scw = sw - bL - bR;
    const sch = sh - bT - bB;

    // Corners
    this.ctx.drawImage(img, 0, 0, bL, bT, x, y, bL, bT);
    this.ctx.drawImage(img, sw - bR, 0, bR, bT, x + w - bR, y, bR, bT);
    this.ctx.drawImage(img, 0, sh - bB, bL, bB, x, y + h - bB, bL, bB);
    this.ctx.drawImage(img, sw - bR, sh - bB, bR, bB, x + w - bR, y + h - bB, bR, bB);

    // Edges
    if (cw > 0) {
      this.ctx.drawImage(img, bL, 0, scw, bT, x + bL, y, cw, bT);
      this.ctx.drawImage(img, bL, sh - bB, scw, bB, x + bL, y + h - bB, cw, bB);
    }
    if (ch > 0) {
      this.ctx.drawImage(img, 0, bT, bL, sch, x, y + bT, bL, ch);
      this.ctx.drawImage(img, sw - bR, bT, bR, sch, x + w - bR, y + bT, bR, ch);
    }
    // Center
    if (cw > 0 && ch > 0) {
      this.ctx.drawImage(img, bL, bT, scw, sch, x + bL, y + bT, cw, ch);
    }
  }

  /** Tile a texture across a region (e.g. menu_background.png, header_separator.png) */
  public blitTiled(
    url: string,
    x: number,
    y: number,
    w: number,
    h: number,
    tileW = 16,
    tileH = 16
  ): void {
    const img = this.getImage(url);
    if (!img) return;
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.clip();
    this.ctx.imageSmoothingEnabled = false;
    for (let ty = y; ty < y + h; ty += tileH) {
      for (let tx = x; tx < x + w; tx += tileW) {
        this.ctx.drawImage(img, 0, 0, img.width, img.height, tx, ty, tileW, tileH);
      }
    }
    this.ctx.restore();
  }

  /** Render standard Minecraft 26.3 menu screen background + list area + top/bottom separators */
  public renderMenuBackground(inWorld: boolean, listTop?: number, listBottom?: number): void {
    const bgUrl = inWorld
      ? '/assets/minecraft/textures/gui/inworld_menu_background.png'
      : '/assets/minecraft/textures/gui/menu_background.png';
    this.blitTiled(bgUrl, 0, 0, this.scaledWidth, this.scaledHeight, 16, 16);

    if (listTop !== undefined && listBottom !== undefined) {
      const listBgUrl = inWorld
        ? '/assets/minecraft/textures/gui/inworld_menu_list_background.png'
        : '/assets/minecraft/textures/gui/menu_list_background.png';
      this.blitTiled(listBgUrl, 0, listTop, this.scaledWidth, listBottom - listTop, 16, 16);

      const headerSep = inWorld
        ? '/assets/minecraft/textures/gui/inworld_header_separator.png'
        : '/assets/minecraft/textures/gui/header_separator.png';
      const footerSep = inWorld
        ? '/assets/minecraft/textures/gui/inworld_footer_separator.png'
        : '/assets/minecraft/textures/gui/footer_separator.png';

      this.blitTiled(headerSep, 0, listTop - 2, this.scaledWidth, 2, 32, 2);
      this.blitTiled(footerSep, 0, listBottom, this.scaledWidth, 2, 32, 2);
    }
  }

  /** Draw official Minecraft AbstractButton */
  public drawButton(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    hovered: boolean,
    active = true
  ): void {
    const sprite = !active
      ? '/assets/minecraft/textures/gui/sprites/widget/button_disabled.png'
      : hovered
      ? '/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png'
      : '/assets/minecraft/textures/gui/sprites/widget/button.png';
    this.blitNineSlice(sprite, x, y, w, h, 3, 3, 3, 3);
    const textColor = !active ? '#A0A0A0' : '#FFFFFF';
    this.font.drawCentered(
      this.ctx,
      text,
      x + Math.floor(w / 2),
      y + Math.floor((h - 8) / 2),
      textColor,
      active
    );
  }

  /** Draw 20x20 SpriteIconButton (Language, Accessibility, Recipe Book) */
  public drawIconButton(
    x: number,
    y: number,
    w: number,
    h: number,
    iconUrl: string,
    iconW: number,
    iconH: number,
    hovered: boolean,
    active = true
  ): void {
    const sprite = !active
      ? '/assets/minecraft/textures/gui/sprites/widget/button_disabled.png'
      : hovered
      ? '/assets/minecraft/textures/gui/sprites/widget/button_highlighted.png'
      : '/assets/minecraft/textures/gui/sprites/widget/button.png';
    this.blitNineSlice(sprite, x, y, w, h, 3, 3, 3, 3);
    this.blitSprite(
      iconUrl,
      x + Math.floor((w - iconW) / 2),
      y + Math.floor((h - iconH) / 2),
      iconW,
      iconH
    );
  }

  /** Draw official Minecraft AbstractSliderButton */
  public drawSlider(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    normValue: number,
    hovered: boolean
  ): void {
    const trackSprite = hovered
      ? '/assets/minecraft/textures/gui/sprites/widget/slider_highlighted.png'
      : '/assets/minecraft/textures/gui/sprites/widget/slider.png';
    const handleSprite = hovered
      ? '/assets/minecraft/textures/gui/sprites/widget/slider_handle_highlighted.png'
      : '/assets/minecraft/textures/gui/sprites/widget/slider_handle.png';

    this.blitNineSlice(trackSprite, x, y, w, h, 3, 3, 3, 3);
    const clamped = Math.max(0, Math.min(1, normValue));
    const handleX = Math.floor(x + clamped * (w - 8));
    this.blitNineSlice(handleSprite, handleX, y, 8, h, 2, 3, 2, 3);
    this.font.drawCentered(
      this.ctx,
      text,
      x + Math.floor(w / 2),
      y + Math.floor((h - 8) / 2),
      '#FFFFFF',
      true
    );
  }

  /** Draw official Minecraft EditBox (text_field.png) */
  public drawEditBox(
    x: number,
    y: number,
    w: number,
    h: number,
    value: string,
    placeholder: string,
    focused: boolean,
    label?: string
  ): void {
    if (label) {
      this.font.draw(this.ctx, label, x, y - 11, '#A0A0A0', true);
    }
    const sprite = focused
      ? '/assets/minecraft/textures/gui/sprites/widget/text_field_highlighted.png'
      : '/assets/minecraft/textures/gui/sprites/widget/text_field.png';
    this.blitNineSlice(sprite, x, y, w, h, 2, 2, 2, 2);

    const textY = y + Math.floor((h - 8) / 2);
    if (value.length > 0 || focused) {
      const cursor = focused && Math.floor(performance.now() / 300) % 2 === 0 ? '_' : '';
      this.font.draw(this.ctx, value + cursor, x + 4, textY, '#E0E0E0', true);
    } else if (placeholder) {
      this.font.draw(this.ctx, placeholder, x + 4, textY, '#707070', true);
    }
  }

  /** Draw 16x16 item icon + stack count in GUI slot */
  public renderItem(item: ItemDefinition | null, count: number, x: number, y: number): void {
    if (!item || count <= 0) return;
    x = Math.floor(x);
    y = Math.floor(y);

    const icon = this.itemRenderer.getIcon(item);
    if (icon) {
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(icon, 0, 0, icon.width, icon.height, x, y, 16, 16);
    } else {
      this.fill(x + 2, y + 2, x + 14, y + 14, '#888888');
    }

    if (count > 1) {
      const s = String(count);
      const sw = this.font.width(s);
      this.font.draw(this.ctx, s, x + 17 - sw, y + 9, '#FFFFFF', true);
    }
  }

  /**
   * Render interactive 3D Steve doll in Survival/Creative Inventory (`InventoryScreen.renderEntityInInventoryFollowsMouse`).
   * Projects all 6 faces of each 3D `ModelPart$Cube` (Legs, Torso, Jacket, Arms, Head, Hat) with true 3D yaw & pitch
   * rotation toward the mouse cursor, back-face culling, painter's depth sorting, and affine nearest-neighbor texture mapping.
   */
  public renderPlayerDoll(
    boxX1: number,
    boxY1: number,
    boxX2: number,
    boxY2: number,
    mouseX: number,
    mouseY: number,
    heldItem: ItemDefinition | null
  ): void {
    const steve = this.getImage('/assets/minecraft/textures/entity/player/wide/steve.png');
    if (!steve) return;

    const cx = (boxX1 + boxX2) * 0.5;
    const neckY = Math.floor((boxY1 + boxY2) * 0.5) - 6;
    const eyeY = neckY - 6;

    // Exact Minecraft InventoryScreen atan angles: both body AND head rotate towards mouse
    const atanX = Math.atan((mouseX - cx) / 40.0);
    const atanY = Math.atan((mouseY - eyeY) / 40.0);

    // Body rotates noticeably with cursor (~25°), Head rotates further (~45°)
    const bodyYaw = atanX * 0.45;
    const bodyPitch = atanY * 0.20;
    const headYaw = atanX * 0.82;
    const headPitch = atanY * 0.50;

    const scale = 1.48;

    interface ProjectedFace {
      avgZ: number;
      u: number;
      v: number;
      uw: number;
      vh: number;
      p00: { sx: number; sy: number };
      p10: { sx: number; sy: number };
      p01: { sx: number; sy: number };
      shade: number;
      isOverlay: boolean;
    }

    const facesToDraw: ProjectedFace[] = [];

    const projectVertex = (
      x: number,
      y: number,
      z: number,
      yaw: number,
      pitch: number
    ): { sx: number; sy: number; z: number } => {
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y1 = y * cosP - z * sinP;
      const z1 = y * sinP + z * cosP;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      return {
        sx: cx + x2 * scale,
        sy: neckY - y1 * scale,
        z: z2,
      };
    };

    const addBox3D = (
      x0: number,
      y0: number,
      z0: number,
      x1: number,
      y1: number,
      z1: number,
      u: number,
      v: number,
      dx: number,
      dy: number,
      dz: number,
      yaw: number,
      pitch: number,
      zBias = 0,
      isOverlay = false
    ) => {
      const candidateFaces: Array<{
        v00: [number, number, number];
        v10: [number, number, number];
        v01: [number, number, number];
        v11: [number, number, number];
        u: number;
        v: number;
        uw: number;
        vh: number;
        shade: number;
      }> = [
        // Front (+Z)
        {
          v00: [x0, y1, z1],
          v10: [x1, y1, z1],
          v01: [x0, y0, z1],
          v11: [x1, y0, z1],
          u: u + dz,
          v: v + dz,
          uw: dx,
          vh: dy,
          shade: 1.0,
        },
        // Back (-Z)
        {
          v00: [x1, y1, z0],
          v10: [x0, y1, z0],
          v01: [x1, y0, z0],
          v11: [x0, y0, z0],
          u: u + 2 * dz + dx,
          v: v + dz,
          uw: dx,
          vh: dy,
          shade: 0.75,
        },
        // Right side (+X, Steve's left)
        {
          v00: [x1, y1, z1],
          v10: [x1, y1, z0],
          v01: [x1, y0, z1],
          v11: [x1, y0, z0],
          u: u + dz + dx,
          v: v + dz,
          uw: dz,
          vh: dy,
          shade: 0.82,
        },
        // Left side (-X, Steve's right)
        {
          v00: [x0, y1, z0],
          v10: [x0, y1, z1],
          v01: [x0, y0, z0],
          v11: [x0, y0, z1],
          u: u,
          v: v + dz,
          uw: dz,
          vh: dy,
          shade: 0.82,
        },
        // Top (+Y)
        {
          v00: [x0, y1, z0],
          v10: [x1, y1, z0],
          v01: [x0, y1, z1],
          v11: [x1, y1, z1],
          u: u + dz,
          v: v,
          uw: dx,
          vh: dz,
          shade: 1.0,
        },
        // Bottom (-Y)
        {
          v00: [x0, y0, z1],
          v10: [x1, y0, z1],
          v01: [x0, y0, z0],
          v11: [x1, y0, z0],
          u: u + dz + dx,
          v: v,
          uw: dx,
          vh: dz,
          shade: 0.65,
        },
      ];

      for (const f of candidateFaces) {
        const p00 = projectVertex(f.v00[0], f.v00[1], f.v00[2], yaw, pitch);
        const p10 = projectVertex(f.v10[0], f.v10[1], f.v10[2], yaw, pitch);
        const p01 = projectVertex(f.v01[0], f.v01[1], f.v01[2], yaw, pitch);
        const p11 = projectVertex(f.v11[0], f.v11[1], f.v11[2], yaw, pitch);

        const ux = p10.sx - p00.sx;
        const uy = p10.sy - p00.sy;
        const vx = p01.sx - p00.sx;
        const vy = p01.sy - p00.sy;
        const cross = ux * vy - uy * vx;

        if (cross > 0.05) {
          const avgZ = (p00.z + p10.z + p01.z + p11.z) * 0.25 + zBias;
          facesToDraw.push({
            avgZ,
            u: f.u,
            v: f.v,
            uw: f.uw,
            vh: f.vh,
            p00,
            p10,
            p01,
            shade: f.shade,
            isOverlay,
          });
        }
      }
    };

    // 1. Right Leg (-4..0, -24..-12, -2..2) & Left Leg (0..4, -24..-12, -2..2)
    addBox3D(-4, -24, -2, 0, -12, 2, 0, 16, 4, 12, 4, bodyYaw, bodyPitch);
    addBox3D(0, -24, -2, 4, -12, 2, 16, 48, 4, 12, 4, bodyYaw, bodyPitch);

    // 2. Torso (-4..4, -12..0.5, -2..2) + Jacket layer (overlaps neck collar seamlessly)
    addBox3D(-4, -12, -2, 4, 0.5, 2, 16, 16, 8, 12, 4, bodyYaw, bodyPitch);
    addBox3D(-4.15, -12.15, -2.15, 4.15, 0.65, 2.15, 16, 32, 8, 12, 4, bodyYaw, bodyPitch, 0.1, true);

    // 3. Right Arm (-8..-4, -12..0, -2..2) & Left Arm (4..8, -12..0, -2..2)
    addBox3D(-8, -12, -2, -4, 0, 2, 40, 16, 4, 12, 4, bodyYaw, bodyPitch);
    addBox3D(4, -12, -2, 8, 0, 2, 32, 48, 4, 12, 4, bodyYaw, bodyPitch);

    // 4. 3D Head (-4..4, -0.5..7.5, -4..4) + 3D Hat overlay (-4.35..4.35, -0.85..7.85, -4.35..4.35)
    // Anchored firmly to neck collar so head tilting never creates a gap or floating head
    addBox3D(-4, -0.5, -4, 4, 7.5, 4, 0, 0, 8, 8, 8, headYaw, headPitch, 0.5);
    addBox3D(-4.35, -0.85, -4.35, 4.35, 7.85, 4.35, 32, 0, 8, 8, 8, headYaw, headPitch, 0.7, true);

    // Sort all visible 3D faces back-to-front (Painter's Algorithm)
    facesToDraw.sort((a, b) => a.avgZ - b.avgZ);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(boxX1, boxY1, boxX2 - boxX1, boxY2 - boxY1);
    this.ctx.clip();
    this.ctx.imageSmoothingEnabled = false;

    for (const f of facesToDraw) {
      const a = (f.p10.sx - f.p00.sx) / f.uw;
      const b = (f.p10.sy - f.p00.sy) / f.uw;
      const c = (f.p01.sx - f.p00.sx) / f.vh;
      const d = (f.p01.sy - f.p00.sy) / f.vh;

      this.ctx.save();
      this.ctx.transform(a, b, c, d, f.p00.sx, f.p00.sy);
      this.ctx.drawImage(steve, f.u, f.v, f.uw, f.vh, 0, 0, f.uw, f.vh);
      if (!f.isOverlay && f.shade < 0.99) {
        this.ctx.fillStyle = `rgba(0, 0, 0, ${(1 - f.shade).toFixed(2)})`;
        this.ctx.fillRect(0, 0, f.uw, f.vh);
      }
      this.ctx.restore();
    }

    // Held item in right hand (projected at right hand 3D position (-6, -10, 2))
    if (heldItem) {
      const icon = this.itemRenderer.getIcon(heldItem);
      if (icon) {
        const handPos = projectVertex(-6, -10, 2.5, bodyYaw, bodyPitch);
        this.ctx.drawImage(
          icon,
          0,
          0,
          icon.width,
          icon.height,
          Math.round(handPos.sx - 6),
          Math.round(handPos.sy - 5),
          11,
          11
        );
      }
    }

    this.ctx.restore();
  }

  /** Draw vanilla slot highlight (white 50% overlay on 16x16 slot) */
  public renderSlotHighlight(x: number, y: number): void {
    this.fill(x, y, x + 16, y + 16, 'rgba(255, 255, 255, 0.5)');
  }

  /** Render authentic Minecraft tooltip box at cursor */
  public renderTooltip(lines: string[], mouseX: number, mouseY: number): void {
    if (lines.length === 0) return;
    let maxW = 0;
    for (const line of lines) {
      const w = this.font.width(line);
      if (w > maxW) maxW = w;
    }

    const boxW = maxW + 8;
    const boxH = lines.length * 10 + (lines.length > 1 ? 2 : 0) + 6;
    let tx = Math.floor(mouseX + 12);
    let ty = Math.floor(mouseY - 12);
    if (tx + boxW > this.scaledWidth - 4) tx = Math.max(4, Math.floor(mouseX - boxW - 12));
    if (ty + boxH > this.scaledHeight - 4) ty = this.scaledHeight - boxH - 4;
    if (ty < 4) ty = 4;

    // Classic Minecraft purple/dark tooltip border & fill
    this.fill(tx + 1, ty, tx + boxW - 1, ty + boxH, 'rgba(16, 0, 16, 0.94)');
    this.fill(tx, ty + 1, tx + 1, ty + boxH - 1, 'rgba(16, 0, 16, 0.94)');
    this.fill(tx + boxW - 1, ty + 1, tx + boxW, ty + boxH - 1, 'rgba(16, 0, 16, 0.94)');

    // Inner purple gradient frame
    this.fill(tx + 1, ty + 1, tx + boxW - 1, ty + 2, 'rgba(80, 0, 255, 0.5)');
    this.fill(tx + 1, ty + boxH - 2, tx + boxW - 1, ty + boxH - 1, 'rgba(40, 0, 127, 0.5)');
    this.fillGradient(
      tx + 1,
      ty + 2,
      tx + 2,
      ty + boxH - 2,
      'rgba(80, 0, 255, 0.5)',
      'rgba(40, 0, 127, 0.5)'
    );
    this.fillGradient(
      tx + boxW - 2,
      ty + 2,
      tx + boxW - 1,
      ty + boxH - 2,
      'rgba(80, 0, 255, 0.5)',
      'rgba(40, 0, 127, 0.5)'
    );

    let curY = ty + 4;
    for (let i = 0; i < lines.length; i++) {
      this.font.draw(this.ctx, lines[i], tx + 4, curY, i === 0 ? '#FFFFFF' : '#AAAAAA', true);
      curY += i === 0 && lines.length > 1 ? 12 : 10;
    }
  }
}
