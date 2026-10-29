import { Registries, ItemDefinition } from '../core/Registries';

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

  /** Match 2x2 or 3x3 Crafting Grid against official 26.3 & vanilla recipes */
  getCraftingResult(grid: Array<ItemStack | null>, size: 2 | 3): ItemStack | null {
    const ids = grid.map((s) => (s ? s.item.shortId : ''));
    const nonEmpty = ids.filter((x) => x !== '');
    if (nonEmpty.length === 0) return null;

    const makeResult = (shortId: string, count: number): ItemStack | null => {
      const def = Registries.getItem(shortId);
      return def ? { item: def, count } : null;
    };

    // Single item shapeless recipes
    if (nonEmpty.length === 1) {
      const item = nonEmpty[0];
      if (item.endsWith('_log') || item.endsWith('_wood')) {
        const prefix = item.replace(/^stripped_/, '').replace(/_(log|wood)$/, '');
        return makeResult(`${prefix}_planks`, 4);
      }
    }

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
    const h = maxR - minR + 1;
    const w = maxC - minC + 1;
    const pat: string[][] = [];
    for (let r = minR; r <= maxR; r++) {
      const row: string[] = [];
      for (let c = minC; c <= maxC; c++) {
        row.push(ids[r * size + c]);
      }
      pat.push(row);
    }

    const first = nonEmpty[0];
    const allSame = (match: string) =>
      nonEmpty.every(
        (x) =>
          x === match ||
          (match === '_planks' && x.endsWith('_planks')) ||
          (match === '_log' && x.endsWith('_log'))
      );

    // 2x2 full
    if (w === 2 && h === 2 && nonEmpty.length === 4) {
      if (allSame('_planks')) return makeResult('crafting_table', 1);
      if (first.endsWith('_log') && allSame(first)) {
        return makeResult(first.replace('_log', '_wood'), 3);
      }
      if (allSame('stone')) return makeResult('stone_bricks', 4);
      if (allSame('sand')) return makeResult('sandstone', 1);
      if (allSame('granite')) return makeResult('polished_granite', 4);
      if (allSame('diorite')) return makeResult('polished_diorite', 4);
      if (allSame('andesite')) return makeResult('polished_andesite', 4);
    }

    // 1x2 Vertical (Sticks & Torches)
    if (w === 1 && h === 2 && nonEmpty.length === 2) {
      if (pat[0][0].endsWith('_planks') && pat[1][0].endsWith('_planks')) {
        return makeResult('stick', 4);
      }
      if ((pat[0][0] === 'coal' || pat[0][0] === 'charcoal') && pat[1][0] === 'stick') {
        return makeResult('torch', 4);
      }
    }

    // 1x3 Vertical (Shovel & Sword)
    if (w === 1 && h === 3 && nonEmpty.length === 3) {
      const matTier = (id: string) =>
        id.endsWith('_planks')
          ? 'wooden'
          : id === 'cobblestone' || id === 'cobbled_deepslate'
          ? 'stone'
          : id === 'iron_ingot'
          ? 'iron'
          : id === 'diamond'
          ? 'diamond'
          : null;
      // Shovel: 1 head + 2 sticks
      const shvTier = matTier(pat[0][0]);
      if (shvTier && pat[1][0] === 'stick' && pat[2][0] === 'stick') {
        return makeResult(`${shvTier}_shovel`, 1);
      }
      // Sword: 2 blades + 1 stick
      const swdTier = matTier(pat[0][0]);
      if (swdTier && matTier(pat[1][0]) === swdTier && pat[2][0] === 'stick') {
        return makeResult(`${swdTier}_sword`, 1);
      }
    }

    // 3x3 Pickaxe (3 head across top + 2 sticks down middle)
    if (w === 3 && h === 3 && nonEmpty.length === 5) {
      const matTier = (id: string) =>
        id.endsWith('_planks')
          ? 'wooden'
          : id === 'cobblestone' || id === 'cobbled_deepslate'
          ? 'stone'
          : id === 'iron_ingot'
          ? 'iron'
          : id === 'diamond'
          ? 'diamond'
          : null;
      const tier = matTier(pat[0][0]);
      if (
        tier &&
        matTier(pat[0][1]) === tier &&
        matTier(pat[0][2]) === tier &&
        pat[1][1] === 'stick' &&
        pat[2][1] === 'stick'
      ) {
        return makeResult(`${tier}_pickaxe`, 1);
      }
    }

    // 2x3 Axe (3 head in corner + 2 sticks)
    if (w === 2 && h === 3 && nonEmpty.length === 5) {
      const matTier = (id: string) =>
        id.endsWith('_planks')
          ? 'wooden'
          : id === 'cobblestone' || id === 'cobbled_deepslate'
          ? 'stone'
          : id === 'iron_ingot'
          ? 'iron'
          : id === 'diamond'
          ? 'diamond'
          : null;
      const tL = matTier(pat[0][0]);
      if (
        tL &&
        matTier(pat[0][1]) === tL &&
        matTier(pat[1][0]) === tL &&
        pat[1][1] === 'stick' &&
        pat[2][1] === 'stick'
      ) {
        return makeResult(`${tL}_axe`, 1);
      }
      const tR = matTier(pat[0][1]);
      if (
        tR &&
        matTier(pat[0][0]) === tR &&
        matTier(pat[1][1]) === tR &&
        pat[1][0] === 'stick' &&
        pat[2][0] === 'stick'
      ) {
        return makeResult(`${tR}_axe`, 1);
      }
    }

    // 2x1 Horizontal (Cushions & Carpets)
    if (w === 2 && h === 1 && nonEmpty.length === 2 && allSame(first)) {
      if (first.endsWith('_wool')) {
        const color = first.replace('_wool', '');
        return makeResult(`${color}_cushion`, 1) || makeResult(`${color}_carpet`, 3);
      }
    }

    // 3x1 Horizontal (Slabs / Shelf / Straw Bed)
    if (w === 3 && h === 1 && nonEmpty.length === 3 && allSame(first)) {
      if (first === 'poplar_slab') return makeResult('poplar_shelf', 2);
      const base = first.replace(/_planks$/, '');
      return (
        makeResult(`${first}_slab`, 6) ||
        makeResult(`${base}_slab`, 6) ||
        makeResult(`${first.replace(/s$/, '')}_slab`, 6)
      );
    }

    // 3x2 (Straw Bed: 3 wheat on top of 3 planks, or Trapdoor / Fence)
    if (w === 3 && h === 2 && nonEmpty.length === 6) {
      if (
        pat[0].every((x) => x === 'wheat') &&
        pat[1].every((x) => x.endsWith('_planks'))
      ) {
        return makeResult('straw_bed', 1);
      }
      if (
        pat[0][0].endsWith('_planks') &&
        pat[0][1] === 'stick' &&
        pat[0][2].endsWith('_planks') &&
        pat[1][0].endsWith('_planks') &&
        pat[1][1] === 'stick' &&
        pat[1][2].endsWith('_planks')
      ) {
        const wood = pat[0][0].replace('_planks', '');
        return makeResult(`${wood}_fence`, 3);
      }
      if (allSame(first) && first.endsWith('_planks')) {
        const wood = first.replace('_planks', '');
        return makeResult(`${wood}_trapdoor`, 2);
      }
    }

    // 3x3 Stair Pattern (6 blocks -> 4 stairs, including 26.3 Wool Stairs & Poplar Stairs)
    if (w === 3 && h === 3 && nonEmpty.length === 6 && allSame(first)) {
      const isLeftStair =
        pat[0][0] !== '' &&
        pat[0][1] === '' &&
        pat[0][2] === '' &&
        pat[1][0] !== '' &&
        pat[1][1] !== '' &&
        pat[1][2] === '' &&
        pat[2][0] !== '' &&
        pat[2][1] !== '' &&
        pat[2][2] !== '';
      const isRightStair =
        pat[0][0] === '' &&
        pat[0][1] === '' &&
        pat[0][2] !== '' &&
        pat[1][0] === '' &&
        pat[1][1] !== '' &&
        pat[1][2] !== '' &&
        pat[2][0] !== '' &&
        pat[2][1] !== '' &&
        pat[2][2] !== '';
      if (isLeftStair || isRightStair) {
        const base = first.replace(/_planks$/, '');
        return (
          makeResult(`${first}_stairs`, 4) ||
          makeResult(`${base}_stairs`, 4) ||
          makeResult(`${first.replace(/s$/, '')}_stairs`, 4)
        );
      }
    }

    // 3x3 Ring (8 items around empty center -> Furnace or Chest)
    if (w === 3 && h === 3 && nonEmpty.length === 8 && pat[1][1] === '') {
      if (allSame('cobblestone')) return makeResult('furnace', 1);
      if (allSame('_planks')) return makeResult('chest', 1);
    }

    // Also fallback to any recipe in getRecipes() whose ingredient counts match
    for (const r of Inventory.getRecipes()) {
      if (r.type !== 'crafting') continue;
      let matches = true;
      let totalRequired = 0;
      for (const ing of r.ingredients) {
        const countInGrid = nonEmpty.filter((x) => x === ing.id).length;
        if (countInGrid !== ing.count) {
          matches = false;
          break;
        }
        totalRequired += ing.count;
      }
      if (matches && totalRequired === nonEmpty.length) {
        return makeResult(r.resultId, r.resultCount);
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
    ];
    return recipes;
  }
}
