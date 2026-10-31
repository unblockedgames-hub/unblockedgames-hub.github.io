import { Registries, ItemDefinition } from '../core/Registries';
import officialRecipesData from '../data/official_recipes_26_3.json';

export interface ItemStack {
  item: ItemDefinition;
  count: number;
}

export interface CraftingRecipe {
  id: string;
  resultId: string;
  resultCount: number;
  ingredients: Array<{ id: string; count: number }>;
  type: 'crafting' | 'stonecutting';
}

interface OfficialRecipeRaw {
  id: string;
  type: 'shaped' | 'shapeless' | 'smelting' | 'stonecutting';
  pattern?: string[];
  key?: Record<string, string[]>;
  ingredients?: string[][];
  ingredient?: string[];
  resultId: string;
  resultCount?: number;
  cookTicks?: number;
}

const shapedByDim = new Map<string, OfficialRecipeRaw[]>();
const shapelessByCount = new Map<number, OfficialRecipeRaw[]>();
const officialCraftingRecipes: CraftingRecipe[] = [];

for (const raw of officialRecipesData as OfficialRecipeRaw[]) {
  if (raw.type === 'shaped' && raw.pattern && raw.key) {
    const dim = `${raw.pattern.length}x${raw.pattern[0].length}`;
    let list = shapedByDim.get(dim);
    if (!list) {
      list = [];
      shapedByDim.set(dim, list);
    }
    list.push(raw);

    const ingCounts = new Map<string, number>();
    for (const row of raw.pattern) {
      for (let c = 0; c < row.length; c++) {
        const ch = row[c];
        if (ch !== ' ' && raw.key[ch] && raw.key[ch].length > 0) {
          const item = raw.key[ch][0];
          ingCounts.set(item, (ingCounts.get(item) || 0) + 1);
        }
      }
    }
    officialCraftingRecipes.push({
      id: raw.id,
      resultId: raw.resultId,
      resultCount: raw.resultCount || 1,
      ingredients: Array.from(ingCounts.entries()).map(([id, count]) => ({ id, count })),
      type: 'crafting',
    });
  } else if (raw.type === 'shapeless' && raw.ingredients) {
    let list = shapelessByCount.get(raw.ingredients.length);
    if (!list) {
      list = [];
      shapelessByCount.set(raw.ingredients.length, list);
    }
    list.push(raw);

    const ingCounts = new Map<string, number>();
    for (const ing of raw.ingredients) {
      if (ing.length > 0) {
        const item = ing[0];
        ingCounts.set(item, (ingCounts.get(item) || 0) + 1);
      }
    }
    officialCraftingRecipes.push({
      id: raw.id,
      resultId: raw.resultId,
      resultCount: raw.resultCount || 1,
      ingredients: Array.from(ingCounts.entries()).map(([id, count]) => ({ id, count })),
      type: 'crafting',
    });
  }
}

export class Inventory {
  slots: Array<ItemStack | null> = new Array(36).fill(null); // 0..8 = Hotbar, 9..35 = Main Inventory
  armorSlots: Array<ItemStack | null> = new Array(4).fill(null); // 0=Helmet, 1=Chestplate, 2=Leggings, 3=Boots
  offhandSlot: ItemStack | null = null;
  crafting2x2: Array<ItemStack | null> = new Array(4).fill(null);
  crafting3x3: Array<ItemStack | null> = new Array(9).fill(null);
  stonecutterInput: ItemStack | null = null;
  stonecutterSelectedIndex = 0;
  furnaceInput: ItemStack | null = null;
  furnaceFuel: ItemStack | null = null;
  furnaceOutput: ItemStack | null = null;
  chestSlots: Array<ItemStack | null> = new Array(27).fill(null);

  cursorStack: ItemStack | null = null;
  selectedHotbarSlot = 0;

  constructor() {
    // Real Minecraft starts with an empty inventory in a new world!
  }

  clearAll() {
    this.slots.fill(null);
    this.armorSlots.fill(null);
    this.offhandSlot = null;
    this.crafting2x2.fill(null);
    this.crafting3x3.fill(null);
    this.stonecutterInput = null;
    this.furnaceInput = null;
    this.furnaceFuel = null;
    this.furnaceOutput = null;
    this.cursorStack = null;
    this.selectedHotbarSlot = 0;
  }

  populateDefault26_3Loadout() {
    const starterItems: Array<[string, number]> = [
      ['poplar_log', 64],
      ['poplar_planks', 64],
      ['orange_poplar_leaves', 64],
      ['straw_bed', 1],
      ['orange_cushion', 16],
      ['red_wool_stairs', 64],
      ['cyan_concrete_slab', 64],
      ['stonecutter', 1],
      ['filled_map', 1], // Abandoned Camp Explorer Map
      ['yellow_poplar_leaves', 64],
      ['red_poplar_leaves', 64],
      ['poplar_stairs', 64],
      ['poplar_slab', 64],
      ['poplar_fence', 64],
      ['poplar_trapdoor', 64],
      ['poplar_shelf', 64],
      ['yellow_cushion', 16],
      ['red_cushion', 16],
      ['cyan_cushion', 16],
      ['lime_wool_stairs', 64],
      ['yellow_wool_slab', 64],
      ['white_concrete_stairs', 64],
      ['orange_concrete_slab', 64],
      ['cyan_concrete', 64],
      ['white_concrete', 64],
      ['campfire', 16],
      ['torch', 64],
      ['crafting_table', 1],
      ['diamond_pickaxe', 1],
      ['diamond_axe', 1],
    ];

    for (let i = 0; i < Math.min(this.slots.length, starterItems.length); i++) {
      const [id, count] = starterItems[i];
      const def = Registries.getItem(id);
      if (def) {
        this.slots[i] = { item: def, count };
      }
    }
  }

  getHeldStack(): ItemStack | null {
    return this.slots[this.selectedHotbarSlot];
  }

  /** Standard Minecraft slot click interaction (button 0 = left click, button 2 = right click, shiftKey = quick move) */
  clickSlot(
    getSlot: () => ItemStack | null,
    setSlot: (s: ItemStack | null) => void,
    button: number,
    shiftKey = false,
    slotIndexInMainInv = -1
  ): void {
    const current = getSlot();

    if (shiftKey && current) {
      if (slotIndexInMainInv >= 0 && slotIndexInMainInv < 9) {
        // Move from hotbar (0..8) to main inventory (9..35)
        const rem = this.moveStackToRange(current, 9, 36);
        setSlot(rem);
      } else if (slotIndexInMainInv >= 9 && slotIndexInMainInv < 36) {
        // Move from main inventory (9..35) to hotbar (0..8)
        const rem = this.moveStackToRange(current, 0, 9);
        setSlot(rem);
      } else {
        // Move from container slot into player inventory
        if (this.addItem(current.item.shortId, current.count)) {
          setSlot(null);
        }
      }
      return;
    }

    if (button === 0) {
      // Left click: swap or merge stacks
      if (!this.cursorStack && current) {
        this.cursorStack = current;
        setSlot(null);
      } else if (this.cursorStack && !current) {
        setSlot(this.cursorStack);
        this.cursorStack = null;
      } else if (this.cursorStack && current) {
        if (
          this.cursorStack.item.id === current.item.id &&
          current.count < current.item.maxStack
        ) {
          const space = current.item.maxStack - current.count;
          const transfer = Math.min(space, this.cursorStack.count);
          current.count += transfer;
          this.cursorStack.count -= transfer;
          if (this.cursorStack.count <= 0) this.cursorStack = null;
          setSlot(current);
        } else {
          const tmp = current;
          setSlot(this.cursorStack);
          this.cursorStack = tmp;
        }
      }
    } else if (button === 2) {
      // Right click: split half or place 1
      if (!this.cursorStack && current) {
        const take = Math.ceil(current.count / 2);
        this.cursorStack = { item: current.item, count: take };
        current.count -= take;
        setSlot(current.count > 0 ? current : null);
      } else if (this.cursorStack && !current) {
        setSlot({ item: this.cursorStack.item, count: 1 });
        this.cursorStack.count -= 1;
        if (this.cursorStack.count <= 0) this.cursorStack = null;
      } else if (
        this.cursorStack &&
        current &&
        this.cursorStack.item.id === current.item.id &&
        current.count < current.item.maxStack
      ) {
        current.count += 1;
        this.cursorStack.count -= 1;
        if (this.cursorStack.count <= 0) this.cursorStack = null;
        setSlot(current);
      }
    }
  }

  /** Place 1 item from cursorStack into the target slot (used when holding/dragging right-click across crafting slots) */
  placeOneFromCursor(
    getSlot: () => ItemStack | null,
    setSlot: (s: ItemStack | null) => void
  ): void {
    if (!this.cursorStack || this.cursorStack.count <= 0) return;
    const current = getSlot();
    if (!current) {
      setSlot({ item: this.cursorStack.item, count: 1 });
      this.cursorStack.count -= 1;
      if (this.cursorStack.count <= 0) this.cursorStack = null;
    } else if (
      current.item.id === this.cursorStack.item.id &&
      current.count < current.item.maxStack
    ) {
      current.count += 1;
      this.cursorStack.count -= 1;
      if (this.cursorStack.count <= 0) this.cursorStack = null;
      setSlot(current);
    }
  }

  /**
   * Double-left-click (`ClickType.PICKUP_ALL` in `AbstractContainerMenu.java`):
   * Gathers all matching item stacks from crafting grids and inventory into `cursorStack` up to `maxStack`
   * (pulling from partial stacks first, then full stacks).
   */
  collectAllToCursor(
    getSlot?: () => ItemStack | null,
    setSlot?: (s: ItemStack | null) => void
  ): void {
    if (!this.cursorStack && getSlot && setSlot) {
      const clicked = getSlot();
      if (clicked) {
        this.cursorStack = clicked;
        setSlot(null);
      }
    }
    if (!this.cursorStack) return;

    const targetId = this.cursorStack.item.id;
    const maxStack = this.cursorStack.item.maxStack;
    if (this.cursorStack.count >= maxStack) return;

    const pullFromArray = (arr: Array<ItemStack | null>, partialOnly: boolean) => {
      for (let i = 0; i < arr.length; i++) {
        if (!this.cursorStack || this.cursorStack.count >= maxStack) return;
        const s = arr[i];
        if (!s || s.item.id !== targetId) continue;
        if (partialOnly && s.count >= maxStack) continue;

        const take = Math.min(maxStack - this.cursorStack.count, s.count);
        this.cursorStack.count += take;
        s.count -= take;
        if (s.count <= 0) {
          arr[i] = null;
        }
      }
    };

    // Pass 1: partial stacks first (crafting grids, then main inventory)
    pullFromArray(this.crafting2x2, true);
    pullFromArray(this.crafting3x3, true);
    pullFromArray(this.slots, true);

    // Pass 2: full stacks if cursorStack is still < maxStack
    pullFromArray(this.crafting2x2, false);
    pullFromArray(this.crafting3x3, false);
    pullFromArray(this.slots, false);
  }

  private moveStackToRange(stack: ItemStack, startIdx: number, endIdx: number): ItemStack | null {
    let rem = stack.count;
    for (let i = startIdx; i < endIdx && rem > 0; i++) {
      const s = this.slots[i];
      if (s && s.item.id === stack.item.id && s.count < stack.item.maxStack) {
        const add = Math.min(stack.item.maxStack - s.count, rem);
        s.count += add;
        rem -= add;
      }
    }
    for (let i = startIdx; i < endIdx && rem > 0; i++) {
      if (!this.slots[i]) {
        const add = Math.min(stack.item.maxStack, rem);
        this.slots[i] = { item: stack.item, count: add };
        rem -= add;
      }
    }
    return rem > 0 ? { item: stack.item, count: rem } : null;
  }

  /** Total armor defense points (0..20) based on equipped helmet, chestplate, leggings, boots */
  getArmorValue(): number {
    let total = 0;
    for (const s of this.armorSlots) {
      if (!s) continue;
      const id = s.item.shortId;
      if (id.includes('helmet') || id.includes('cap')) {
        total += id.includes('diamond') || id.includes('netherite') ? 3 : id.includes('iron') ? 2 : id.includes('golden') ? 2 : 1;
      } else if (id.includes('chestplate') || id.includes('tunic')) {
        total += id.includes('diamond') || id.includes('netherite') ? 8 : id.includes('iron') ? 6 : id.includes('golden') ? 5 : 3;
      } else if (id.includes('leggings') || id.includes('pants')) {
        total += id.includes('diamond') || id.includes('netherite') ? 6 : id.includes('iron') ? 5 : id.includes('golden') ? 3 : 2;
      } else if (id.includes('boots')) {
        total += id.includes('diamond') || id.includes('netherite') ? 3 : id.includes('iron') ? 2 : 1;
      }
    }
    return total;
  }

  /** Match 2x2 or 3x3 Crafting Grid against official 26.3 & vanilla recipes */
  getCraftingResult(grid: Array<ItemStack | null>, size: 2 | 3): ItemStack | null {
    const ids = grid.map((s) => (s ? s.item.shortId : ''));
    const nonEmpty = ids.filter((x) => x !== '');
    if (nonEmpty.length === 0) return null;

    const makeResult = (shortId: string, count: number): ItemStack | null => {
      const def = Registries.getItem(shortId);
      return def ? { item: def, count } : null;
    };

    // Bounding box of pattern
    let minR: number = size,
      maxR = -1,
      minC: number = size,
      maxC = -1;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (ids[r * size + c] !== '') {
          if (r < minR) minR = r;
          if (r > maxR) maxR = r;
          if (c < minC) minC = c;
          if (c > maxC) maxC = c;
        }
      }
    }
    const boxH = maxR - minR + 1;
    const boxW = maxC - minC + 1;
    const pat: string[][] = [];
    for (let r = minR; r <= maxR; r++) {
      const row: string[] = [];
      for (let c = minC; c <= maxC; c++) {
        row.push(ids[r * size + c]);
      }
      pat.push(row);
    }

    // 1. Check official shaped recipes matching bounding box dimensions
    const shapedList = shapedByDim.get(`${boxH}x${boxW}`);
    if (shapedList) {
      for (const r of shapedList) {
        // Normal orientation match
        let normalMatch = true;
        for (let row = 0; row < boxH && normalMatch; row++) {
          for (let col = 0; col < boxW; col++) {
            const ch = r.pattern![row][col];
            const actual = pat[row][col];
            if (ch === ' ') {
              if (actual !== '') { normalMatch = false; break; }
            } else {
              const allowed = r.key![ch];
              if (!allowed || !allowed.includes(actual)) { normalMatch = false; break; }
            }
          }
        }
        if (normalMatch) return makeResult(r.resultId, r.resultCount || 1);

        // Horizontally mirrored orientation match
        let mirrorMatch = true;
        for (let row = 0; row < boxH && mirrorMatch; row++) {
          for (let col = 0; col < boxW; col++) {
            const ch = r.pattern![row][boxW - 1 - col];
            const actual = pat[row][col];
            if (ch === ' ') {
              if (actual !== '') { mirrorMatch = false; break; }
            } else {
              const allowed = r.key![ch];
              if (!allowed || !allowed.includes(actual)) { mirrorMatch = false; break; }
            }
          }
        }
        if (mirrorMatch) return makeResult(r.resultId, r.resultCount || 1);
      }
    }

    // 2. Check official shapeless recipes matching non-empty count
    const shapelessList = shapelessByCount.get(nonEmpty.length);
    if (shapelessList) {
      for (const r of shapelessList) {
        const avail = [...nonEmpty];
        let matched = true;
        for (const ingList of r.ingredients!) {
          const idx = avail.findIndex((item) => ingList.includes(item));
          if (idx === -1) { matched = false; break; }
          avail.splice(idx, 1);
        }
        if (matched) return makeResult(r.resultId, r.resultCount || 1);
      }
    }

    return null;
  }



  consumeCraftingGrid(grid: Array<ItemStack | null>): void {
    for (let i = 0; i < grid.length; i++) {
      const s = grid[i];
      if (s) {
        s.count -= 1;
        if (s.count <= 0) grid[i] = null;
      }
    }
  }

  /** Get all valid Stonecutter outputs for the item in stonecutterInput (including 26.3 Concrete Stairs & Slabs!) */
  getStonecutterOutputs(): Array<{ item: ItemDefinition; count: number }> {
    if (!this.stonecutterInput) return [];
    const inId = this.stonecutterInput.item.shortId;
    const out: Array<{ item: ItemDefinition; count: number }> = [];

    const tryAdd = (shortId: string, count: number) => {
      if (shortId === inId) return;
      const def = Registries.getItem(shortId);
      if (def && !out.some((o) => o.item.id === def.id)) {
        out.push({ item: def, count });
      }
    };

    const base = inId.replace(/_block$/, '').replace(/s$/, '');
    tryAdd(`${inId}_slab`, 2);
    tryAdd(`${inId}_stairs`, 1);
    tryAdd(`${base}_slab`, 2);
    tryAdd(`${base}_stairs`, 1);
    tryAdd(`polished_${inId}`, 1);
    tryAdd(`polished_${inId}_slab`, 2);
    tryAdd(`polished_${inId}_stairs`, 1);
    tryAdd(`chiseled_${inId}`, 1);
    tryAdd(`chiseled_${base}`, 1);

    if (inId === 'stone') {
      tryAdd('stone_bricks', 1);
      tryAdd('stone_brick_slab', 2);
      tryAdd('stone_brick_stairs', 1);
      tryAdd('chiseled_stone_bricks', 1);
    }

    return out;
  }

  addItem(itemId: string, count = 1): boolean {
    const def = Registries.getItem(itemId);
    if (!def) return false;

    // Stack with existing slots first
    for (let i = 0; i < this.slots.length; i++) {
      const s = this.slots[i];
      if (s && s.item.id === def.id && s.count < def.maxStack) {
        const space = def.maxStack - s.count;
        const add = Math.min(space, count);
        s.count += add;
        count -= add;
        if (count <= 0) return true;
      }
    }

    // Place in empty slot
    for (let i = 0; i < this.slots.length; i++) {
      if (!this.slots[i]) {
        const add = Math.min(def.maxStack, count);
        this.slots[i] = { item: def, count: add };
        count -= add;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  consumeHeld(amount = 1) {
    const s = this.slots[this.selectedHotbarSlot];
    if (!s) return;
    s.count -= amount;
    if (s.count <= 0) {
      this.slots[this.selectedHotbarSlot] = null;
    }
  }

  countItem(shortOrFullId: string): number {
    const def = Registries.getItem(shortOrFullId);
    if (!def) return 0;
    let total = 0;
    for (const s of this.slots) {
      if (s && s.item.id === def.id) total += s.count;
    }
    return total;
  }

  removeIngredients(ingredients: Array<{ id: string; count: number }>): boolean {
    for (const ing of ingredients) {
      if (this.countItem(ing.id) < ing.count) return false;
    }
    for (const ing of ingredients) {
      const def = Registries.getItem(ing.id)!;
      let rem = ing.count;
      for (let i = 0; i < this.slots.length && rem > 0; i++) {
        const s = this.slots[i];
        if (s && s.item.id === def.id) {
          const take = Math.min(s.count, rem);
          s.count -= take;
          rem -= take;
          if (s.count <= 0) this.slots[i] = null;
        }
      }
    }
    return true;
  }

  static getRecipes(): CraftingRecipe[] {
    return officialCraftingRecipes;
  }

  private static _legacyUnusedRecipes() {
    const recipes: CraftingRecipe[] = [
      // 26.3 Poplar Wood Set Recipes
      {
        id: 'poplar_planks',
        resultId: 'poplar_planks',
        resultCount: 4,
        ingredients: [{ id: 'poplar_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'poplar_stairs',
        resultId: 'poplar_stairs',
        resultCount: 4,
        ingredients: [{ id: 'poplar_planks', count: 6 }],
        type: 'crafting',
      },
      {
        id: 'poplar_slab',
        resultId: 'poplar_slab',
        resultCount: 6,
        ingredients: [{ id: 'poplar_planks', count: 3 }],
        type: 'crafting',
      },
      {
        id: 'poplar_fence',
        resultId: 'poplar_fence',
        resultCount: 3,
        ingredients: [
          { id: 'poplar_planks', count: 4 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'poplar_shelf',
        resultId: 'poplar_shelf',
        resultCount: 2,
        ingredients: [{ id: 'poplar_slab', count: 3 }],
        type: 'crafting',
      },
      {
        id: 'poplar_boat',
        resultId: 'poplar_boat',
        resultCount: 1,
        ingredients: [{ id: 'poplar_planks', count: 5 }],
        type: 'crafting',
      },
      // 26.3 Straw Bed Recipe
      {
        id: 'straw_bed',
        resultId: 'straw_bed',
        resultCount: 1,
        ingredients: [
          { id: 'wheat', count: 3 },
          { id: 'poplar_planks', count: 3 },
        ],
        type: 'crafting',
      },
      // 26.3 Cushions (Wool + Slab)
      {
        id: 'orange_cushion',
        resultId: 'orange_cushion',
        resultCount: 1,
        ingredients: [{ id: 'orange_wool', count: 2 }],
        type: 'crafting',
      },
      {
        id: 'red_cushion',
        resultId: 'red_cushion',
        resultCount: 1,
        ingredients: [{ id: 'red_wool', count: 2 }],
        type: 'crafting',
      },
      {
        id: 'yellow_cushion',
        resultId: 'yellow_cushion',
        resultCount: 1,
        ingredients: [{ id: 'yellow_wool', count: 2 }],
        type: 'crafting',
      },
      {
        id: 'cyan_cushion',
        resultId: 'cyan_cushion',
        resultCount: 1,
        ingredients: [{ id: 'cyan_wool', count: 2 }],
        type: 'crafting',
      },
      {
        id: 'white_cushion',
        resultId: 'white_cushion',
        resultCount: 1,
        ingredients: [{ id: 'white_wool', count: 2 }],
        type: 'crafting',
      },
      // 26.3 Wool Stairs & Slabs
      {
        id: 'red_wool_stairs',
        resultId: 'red_wool_stairs',
        resultCount: 4,
        ingredients: [{ id: 'red_wool', count: 6 }],
        type: 'crafting',
      },
      {
        id: 'red_wool_slab',
        resultId: 'red_wool_slab',
        resultCount: 6,
        ingredients: [{ id: 'red_wool', count: 3 }],
        type: 'crafting',
      },
      {
        id: 'orange_wool_stairs',
        resultId: 'orange_wool_stairs',
        resultCount: 4,
        ingredients: [{ id: 'orange_wool', count: 6 }],
        type: 'crafting',
      },
      {
        id: 'white_wool_stairs',
        resultId: 'white_wool_stairs',
        resultCount: 4,
        ingredients: [{ id: 'white_wool', count: 6 }],
        type: 'crafting',
      },
      // 26.3 Concrete Stairs & Slabs via Stonecutter!
      {
        id: 'cyan_concrete_stairs_sc',
        resultId: 'cyan_concrete_stairs',
        resultCount: 1,
        ingredients: [{ id: 'cyan_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'cyan_concrete_slab_sc',
        resultId: 'cyan_concrete_slab',
        resultCount: 2,
        ingredients: [{ id: 'cyan_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'white_concrete_stairs_sc',
        resultId: 'white_concrete_stairs',
        resultCount: 1,
        ingredients: [{ id: 'white_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'white_concrete_slab_sc',
        resultId: 'white_concrete_slab',
        resultCount: 2,
        ingredients: [{ id: 'white_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'orange_concrete_stairs_sc',
        resultId: 'orange_concrete_stairs',
        resultCount: 1,
        ingredients: [{ id: 'orange_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'orange_concrete_slab_sc',
        resultId: 'orange_concrete_slab',
        resultCount: 2,
        ingredients: [{ id: 'orange_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'red_concrete_stairs_sc',
        resultId: 'red_concrete_stairs',
        resultCount: 1,
        ingredients: [{ id: 'red_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'red_concrete_slab_sc',
        resultId: 'red_concrete_slab',
        resultCount: 2,
        ingredients: [{ id: 'red_concrete', count: 1 }],
        type: 'stonecutting',
      },
      {
        id: 'stick',
        resultId: 'stick',
        resultCount: 4,
        ingredients: [{ id: 'poplar_planks', count: 2 }],
        type: 'crafting',
      },
      {
        id: 'stick_oak',
        resultId: 'stick',
        resultCount: 4,
        ingredients: [{ id: 'oak_planks', count: 2 }],
        type: 'crafting',
      },
      // Core Vanilla Minecraft Recipes
      {
        id: 'flint_and_steel',
        resultId: 'flint_and_steel',
        resultCount: 1,
        ingredients: [
          { id: 'iron_ingot', count: 1 },
          { id: 'flint', count: 1 },
        ],
        type: 'crafting',
      },
      {
        id: 'crafting_table',
        resultId: 'crafting_table',
        resultCount: 1,
        ingredients: [{ id: 'oak_planks', count: 4 }],
        type: 'crafting',
      },
      {
        id: 'crafting_table_poplar',
        resultId: 'crafting_table',
        resultCount: 1,
        ingredients: [{ id: 'poplar_planks', count: 4 }],
        type: 'crafting',
      },
      {
        id: 'furnace',
        resultId: 'furnace',
        resultCount: 1,
        ingredients: [{ id: 'cobblestone', count: 8 }],
        type: 'crafting',
      },
      {
        id: 'chest',
        resultId: 'chest',
        resultCount: 1,
        ingredients: [{ id: 'oak_planks', count: 8 }],
        type: 'crafting',
      },
      {
        id: 'chest_poplar',
        resultId: 'chest',
        resultCount: 1,
        ingredients: [{ id: 'poplar_planks', count: 8 }],
        type: 'crafting',
      },
      {
        id: 'torch',
        resultId: 'torch',
        resultCount: 4,
        ingredients: [
          { id: 'coal', count: 1 },
          { id: 'stick', count: 1 },
        ],
        type: 'crafting',
      },
      {
        id: 'campfire',
        resultId: 'campfire',
        resultCount: 1,
        ingredients: [
          { id: 'stick', count: 3 },
          { id: 'coal', count: 1 },
          { id: 'oak_log', count: 3 },
        ],
        type: 'crafting',
      },
      {
        id: 'bread',
        resultId: 'bread',
        resultCount: 1,
        ingredients: [{ id: 'wheat', count: 3 }],
        type: 'crafting',
      },
      {
        id: 'bucket',
        resultId: 'bucket',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 3 }],
        type: 'crafting',
      },
      {
        id: 'shears',
        resultId: 'shears',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 2 }],
        type: 'crafting',
      },
      {
        id: 'bow',
        resultId: 'bow',
        resultCount: 1,
        ingredients: [
          { id: 'stick', count: 3 },
          { id: 'string', count: 3 },
        ],
        type: 'crafting',
      },
      {
        id: 'arrow',
        resultId: 'arrow',
        resultCount: 4,
        ingredients: [
          { id: 'flint', count: 1 },
          { id: 'stick', count: 1 },
          { id: 'feather', count: 1 },
        ],
        type: 'crafting',
      },
      // Wood Planks from Logs
      {
        id: 'oak_planks',
        resultId: 'oak_planks',
        resultCount: 4,
        ingredients: [{ id: 'oak_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'birch_planks',
        resultId: 'birch_planks',
        resultCount: 4,
        ingredients: [{ id: 'birch_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'spruce_planks',
        resultId: 'spruce_planks',
        resultCount: 4,
        ingredients: [{ id: 'spruce_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'jungle_planks',
        resultId: 'jungle_planks',
        resultCount: 4,
        ingredients: [{ id: 'jungle_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'acacia_planks',
        resultId: 'acacia_planks',
        resultCount: 4,
        ingredients: [{ id: 'acacia_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'dark_oak_planks',
        resultId: 'dark_oak_planks',
        resultCount: 4,
        ingredients: [{ id: 'dark_oak_log', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'cherry_planks',
        resultId: 'cherry_planks',
        resultCount: 4,
        ingredients: [{ id: 'cherry_log', count: 1 }],
        type: 'crafting',
      },
      // Tools & Weapons
      {
        id: 'wooden_pickaxe',
        resultId: 'wooden_pickaxe',
        resultCount: 1,
        ingredients: [
          { id: 'oak_planks', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'wooden_axe',
        resultId: 'wooden_axe',
        resultCount: 1,
        ingredients: [
          { id: 'oak_planks', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'wooden_sword',
        resultId: 'wooden_sword',
        resultCount: 1,
        ingredients: [
          { id: 'oak_planks', count: 2 },
          { id: 'stick', count: 1 },
        ],
        type: 'crafting',
      },
      {
        id: 'wooden_shovel',
        resultId: 'wooden_shovel',
        resultCount: 1,
        ingredients: [
          { id: 'oak_planks', count: 1 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'stone_pickaxe',
        resultId: 'stone_pickaxe',
        resultCount: 1,
        ingredients: [
          { id: 'cobblestone', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'stone_axe',
        resultId: 'stone_axe',
        resultCount: 1,
        ingredients: [
          { id: 'cobblestone', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'stone_sword',
        resultId: 'stone_sword',
        resultCount: 1,
        ingredients: [
          { id: 'cobblestone', count: 2 },
          { id: 'stick', count: 1 },
        ],
        type: 'crafting',
      },
      {
        id: 'stone_shovel',
        resultId: 'stone_shovel',
        resultCount: 1,
        ingredients: [
          { id: 'cobblestone', count: 1 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'iron_pickaxe',
        resultId: 'iron_pickaxe',
        resultCount: 1,
        ingredients: [
          { id: 'iron_ingot', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'iron_axe',
        resultId: 'iron_axe',
        resultCount: 1,
        ingredients: [
          { id: 'iron_ingot', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'iron_sword',
        resultId: 'iron_sword',
        resultCount: 1,
        ingredients: [
          { id: 'iron_ingot', count: 2 },
          { id: 'stick', count: 1 },
        ],
        type: 'crafting',
      },
      {
        id: 'iron_shovel',
        resultId: 'iron_shovel',
        resultCount: 1,
        ingredients: [
          { id: 'iron_ingot', count: 1 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'diamond_pickaxe',
        resultId: 'diamond_pickaxe',
        resultCount: 1,
        ingredients: [
          { id: 'diamond', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'diamond_axe',
        resultId: 'diamond_axe',
        resultCount: 1,
        ingredients: [
          { id: 'diamond', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'diamond_sword',
        resultId: 'diamond_sword',
        resultCount: 1,
        ingredients: [
          { id: 'diamond', count: 2 },
          { id: 'stick', count: 1 },
        ],
        type: 'crafting',
      },
      {
        id: 'diamond_shovel',
        resultId: 'diamond_shovel',
        resultCount: 1,
        ingredients: [
          { id: 'diamond', count: 1 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'golden_pickaxe',
        resultId: 'golden_pickaxe',
        resultCount: 1,
        ingredients: [
          { id: 'gold_ingot', count: 3 },
          { id: 'stick', count: 2 },
        ],
        type: 'crafting',
      },
      {
        id: 'golden_sword',
        resultId: 'golden_sword',
        resultCount: 1,
        ingredients: [
          { id: 'gold_ingot', count: 2 },
          { id: 'stick', count: 1 },
        ],
        type: 'crafting',
      },
      // Armor
      {
        id: 'iron_helmet',
        resultId: 'iron_helmet',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 5 }],
        type: 'crafting',
      },
      {
        id: 'iron_chestplate',
        resultId: 'iron_chestplate',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 8 }],
        type: 'crafting',
      },
      {
        id: 'iron_leggings',
        resultId: 'iron_leggings',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 7 }],
        type: 'crafting',
      },
      {
        id: 'iron_boots',
        resultId: 'iron_boots',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 4 }],
        type: 'crafting',
      },
      {
        id: 'diamond_helmet',
        resultId: 'diamond_helmet',
        resultCount: 1,
        ingredients: [{ id: 'diamond', count: 5 }],
        type: 'crafting',
      },
      {
        id: 'diamond_chestplate',
        resultId: 'diamond_chestplate',
        resultCount: 1,
        ingredients: [{ id: 'diamond', count: 8 }],
        type: 'crafting',
      },
      {
        id: 'diamond_leggings',
        resultId: 'diamond_leggings',
        resultCount: 1,
        ingredients: [{ id: 'diamond', count: 7 }],
        type: 'crafting',
      },
      {
        id: 'diamond_boots',
        resultId: 'diamond_boots',
        resultCount: 1,
        ingredients: [{ id: 'diamond', count: 4 }],
        type: 'crafting',
      },
      // Compacting & Decompacting
      {
        id: 'iron_block',
        resultId: 'iron_block',
        resultCount: 1,
        ingredients: [{ id: 'iron_ingot', count: 9 }],
        type: 'crafting',
      },
      {
        id: 'iron_ingot_from_block',
        resultId: 'iron_ingot',
        resultCount: 9,
        ingredients: [{ id: 'iron_block', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'diamond_block',
        resultId: 'diamond_block',
        resultCount: 1,
        ingredients: [{ id: 'diamond', count: 9 }],
        type: 'crafting',
      },
      {
        id: 'diamond_from_block',
        resultId: 'diamond',
        resultCount: 9,
        ingredients: [{ id: 'diamond_block', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'gold_block',
        resultId: 'gold_block',
        resultCount: 1,
        ingredients: [{ id: 'gold_ingot', count: 9 }],
        type: 'crafting',
      },
      {
        id: 'gold_ingot_from_block',
        resultId: 'gold_ingot',
        resultCount: 9,
        ingredients: [{ id: 'gold_block', count: 1 }],
        type: 'crafting',
      },
      {
        id: 'coal_block',
        resultId: 'coal_block',
        resultCount: 1,
        ingredients: [{ id: 'coal', count: 9 }],
        type: 'crafting',
      },
      {
        id: 'coal_from_block',
        resultId: 'coal',
        resultCount: 9,
        ingredients: [{ id: 'coal_block', count: 1 }],
        type: 'crafting',
      },
      // Stairs, Slabs & Trapdoors
      {
        id: 'oak_stairs',
        resultId: 'oak_stairs',
        resultCount: 4,
        ingredients: [{ id: 'oak_planks', count: 6 }],
        type: 'crafting',
      },
      {
        id: 'oak_slab',
        resultId: 'oak_slab',
        resultCount: 6,
        ingredients: [{ id: 'oak_planks', count: 3 }],
        type: 'crafting',
      },
      {
        id: 'oak_trapdoor',
        resultId: 'oak_trapdoor',
        resultCount: 2,
        ingredients: [{ id: 'oak_planks', count: 6 }],
        type: 'crafting',
      },
      {
        id: 'cobblestone_stairs',
        resultId: 'cobblestone_stairs',
        resultCount: 4,
        ingredients: [{ id: 'cobblestone', count: 6 }],
        type: 'crafting',
      },
      {
        id: 'cobblestone_slab',
        resultId: 'cobblestone_slab',
        resultCount: 6,
        ingredients: [{ id: 'cobblestone', count: 3 }],
        type: 'crafting',
      },
    ];
    return recipes;
  }

  dropHeldItem(wholeStack: boolean): ItemStack | null {
    const held = this.getHeldStack();
    if (!held || held.count <= 0) return null;
    const dropCount = wholeStack ? held.count : 1;
    held.count -= dropCount;
    const resultItem: ItemStack = { item: held.item, count: dropCount };
    if (held.count <= 0) {
      this.slots[this.selectedHotbarSlot] = null;
    }
    return resultItem;
  }
}

export interface FurnaceData {
  input: ItemStack | null;
  fuel: ItemStack | null;
  output: ItemStack | null;
  burnTime: number; // remaining burn ticks
  maxBurnTime: number; // total burn ticks of current fuel
  cookTime: number; // progress 0..200 ticks
}

export const SMELTING_RECIPES: Record<string, { result: string; cookTicks: number }> = {
  // Ores to ingots
  iron_ore: { result: 'iron_ingot', cookTicks: 200 },
  deepslate_iron_ore: { result: 'iron_ingot', cookTicks: 200 },
  raw_iron: { result: 'iron_ingot', cookTicks: 200 },
  gold_ore: { result: 'gold_ingot', cookTicks: 200 },
  deepslate_gold_ore: { result: 'gold_ingot', cookTicks: 200 },
  raw_gold: { result: 'gold_ingot', cookTicks: 200 },
  copper_ore: { result: 'copper_ingot', cookTicks: 200 },
  deepslate_copper_ore: { result: 'copper_ingot', cookTicks: 200 },
  raw_copper: { result: 'copper_ingot', cookTicks: 200 },
  // Building blocks
  sand: { result: 'glass', cookTicks: 200 },
  red_sand: { result: 'glass', cookTicks: 200 },
  cobblestone: { result: 'stone', cookTicks: 200 },
  stone: { result: 'smooth_stone', cookTicks: 200 },
  clay_ball: { result: 'brick', cookTicks: 200 },
  clay: { result: 'terracotta', cookTicks: 200 },
  netherrack: { result: 'nether_brick', cookTicks: 200 },
  // Logs to charcoal
  oak_log: { result: 'charcoal', cookTicks: 200 },
  poplar_log: { result: 'charcoal', cookTicks: 200 },
  birch_log: { result: 'charcoal', cookTicks: 200 },
  spruce_log: { result: 'charcoal', cookTicks: 200 },
  jungle_log: { result: 'charcoal', cookTicks: 200 },
  acacia_log: { result: 'charcoal', cookTicks: 200 },
  dark_oak_log: { result: 'charcoal', cookTicks: 200 },
  stripped_oak_log: { result: 'charcoal', cookTicks: 200 },
  stripped_poplar_log: { result: 'charcoal', cookTicks: 200 },
  // Food
  raw_beef: { result: 'cooked_beef', cookTicks: 200 },
  raw_porkchop: { result: 'cooked_porkchop', cookTicks: 200 },
  raw_mutton: { result: 'cooked_mutton', cookTicks: 200 },
  raw_chicken: { result: 'cooked_chicken', cookTicks: 200 },
  raw_salmon: { result: 'cooked_salmon', cookTicks: 200 },
  raw_cod: { result: 'cooked_cod', cookTicks: 200 },
  potato: { result: 'baked_potato', cookTicks: 200 },
  kelp: { result: 'dried_kelp', cookTicks: 200 },
};

// Populate official smelting recipes from 26.3
for (const raw of officialRecipesData as OfficialRecipeRaw[]) {
  if (raw.type === 'smelting' && raw.ingredient && raw.resultId) {
    for (const ing of raw.ingredient) {
      if (!SMELTING_RECIPES[ing]) {
        SMELTING_RECIPES[ing] = { result: raw.resultId, cookTicks: raw.cookTicks || 200 };
      }
    }
  }
}

export const FUEL_VALUES: Record<string, number> = {
  coal: 1600,
  charcoal: 1600,
  coal_block: 16000,
  oak_log: 300,
  poplar_log: 300,
  birch_log: 300,
  spruce_log: 300,
  oak_planks: 300,
  poplar_planks: 300,
  birch_planks: 300,
  stick: 100,
  straw_bed: 400,
  crafting_table: 300,
  wooden_pickaxe: 200,
  wooden_axe: 200,
  wooden_sword: 200,
  wooden_shovel: 200,
  wooden_hoe: 200,
  barrel: 300,
  chest: 300,
};

export class ContainerManager {
  static furnaces = new Map<string, FurnaceData>();
  static chests = new Map<string, (ItemStack | null)[]>(); // 27 slots per chest/barrel

  static getFurnace(key: string): FurnaceData {
    let f = this.furnaces.get(key);
    if (!f) {
      f = { input: null, fuel: null, output: null, burnTime: 0, maxBurnTime: 0, cookTime: 0 };
      this.furnaces.set(key, f);
    }
    return f;
  }

  static getChest(key: string): (ItemStack | null)[] {
    let c = this.chests.get(key);
    if (!c) {
      c = new Array(27).fill(null);
      this.chests.set(key, c);
    }
    return c;
  }

  static furnaceTickAccumulator = 0;
  static tickFurnaces(dt: number) {
    this.furnaceTickAccumulator += dt;
    // Tick exactly 20 times per second (1 tick per 0.05s) matching authentic Minecraft
    while (this.furnaceTickAccumulator >= 0.05) {
      this.furnaceTickAccumulator -= 0.05;
      for (const [, f] of this.furnaces) {
        if (!f.input) {
          if (f.burnTime > 0) f.burnTime = Math.max(0, f.burnTime - 1);
          f.cookTime = 0;
          continue;
        }
        const recipe = SMELTING_RECIPES[f.input.item.shortId];
        if (!recipe) {
          if (f.burnTime > 0) f.burnTime = Math.max(0, f.burnTime - 1);
          f.cookTime = 0;
          continue;
        }
        if (f.output && (f.output.item.shortId !== recipe.result || f.output.count >= f.output.item.maxStack)) {
          continue;
        }

        if (f.burnTime <= 0) {
          if (f.fuel && f.fuel.count > 0) {
            const fuelVal = FUEL_VALUES[f.fuel.item.shortId] || 0;
            if (fuelVal > 0) {
              f.burnTime = fuelVal;
              f.maxBurnTime = fuelVal;
              f.fuel.count--;
              if (f.fuel.count <= 0) f.fuel = null;
            }
          }
        }

        if (f.burnTime > 0) {
          f.burnTime = Math.max(0, f.burnTime - 1);
          f.cookTime += 1;
          if (f.cookTime >= recipe.cookTicks) {
            f.cookTime = 0;
            f.input.count--;
            if (f.input.count <= 0) f.input = null;
            if (!f.output) {
              const outDef = Registries.getItem(recipe.result);
              if (outDef) f.output = { item: outDef, count: 1 };
            } else {
              f.output.count++;
            }
          }
        } else {
          if (f.cookTime > 0) f.cookTime = Math.max(0, f.cookTime - 2);
        }
      }
    }
  }
}
