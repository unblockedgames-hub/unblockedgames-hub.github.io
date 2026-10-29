export type BlockShapeType =
  | 'air'
  | 'cube'
  | 'pillar'
  | 'stairs'
  | 'slab_bottom'
  | 'slab_top'
  | 'fence'
  | 'cross'
  | 'carpet'
  | 'bed_foot'
  | 'bed_head'
  | 'campfire'
  | 'path'
  | 'torch'
  | 'fluid'
  | 'door_bottom'
  | 'door_top'
  | 'trapdoor';

export interface BlockDefinition {
  numId: number;
  id: string; // e.g. "minecraft:poplar_log"
  shortId: string; // e.g. "poplar_log"
  displayName: string;
  shape: BlockShapeType;
  transparent: boolean;
  solid: boolean;
  fluid?: 'water' | 'lava';
  lightEmission: number;
  hardness: number;
  soundGroup: 'stone' | 'wood' | 'grass' | 'poplar_leaves' | 'straw_bed' | 'wool' | 'sand' | 'gravel' | 'glass';
  tint?: 'grass' | 'foliage' | 'birch' | 'spruce' | 'water';
  textures: {
    top: string;
    bottom: string;
    north: string;
    south: string;
    east: string;
    west: string;
  };
  category: 'building' | 'colored' | 'natural' | 'functional' | 'redstone' | 'combat_tools';
  is26_3?: boolean;
}

export interface ItemDefinition {
  id: string;
  shortId: string;
  displayName: string;
  isBlock: boolean;
  blockNumId?: number;
  texture: string; // path relative to assets/minecraft/textures/ (e.g. "item/red_cushion" or "block/poplar_log")
  category: 'building' | 'colored' | 'natural' | 'functional' | 'redstone' | 'combat_tools';
  maxStack: number;
  is26_3?: boolean;
  cushionColor?: string;
  toolType?: 'pickaxe' | 'axe' | 'shovel' | 'sword' | 'hoe';
  toolSpeed?: number;
  isHandheld?: boolean;
}

const DYE_COLORS = [
  'white',
  'light_gray',
  'gray',
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'cyan',
  'light_blue',
  'blue',
  'purple',
  'magenta',
  'pink',
] as const;

export const DYE_HEX_MAP: Record<string, number> = {
  white: 0xf9fffe,
  light_gray: 0x9d9d97,
  gray: 0x474f52,
  black: 0x1d1d21,
  brown: 0x835432,
  red: 0xb02e26,
  orange: 0xf9801d,
  yellow: 0xfed83d,
  lime: 0x80c71f,
  green: 0x5e7c16,
  cyan: 0x169c9c,
  light_blue: 0x3ab3da,
  blue: 0x3c44aa,
  purple: 0x8932b8,
  magenta: 0xc74ebd,
  pink: 0xf38baa,
};

export class Registries {
  static blocksByNum = new Map<number, BlockDefinition>();
  static blocksById = new Map<string, BlockDefinition>();
  static itemsById = new Map<string, ItemDefinition>();
  static allBlocks: BlockDefinition[] = [];
  static allItems: ItemDefinition[] = [];
  static langMap: Record<string, string> = {};
  static officialBlocksSummary: Record<string, any> = {};
  static officialRegistries: Record<string, any> = {};
  static officialPackets: Record<string, any> = {};

  static nextBlockNumId = 0;

  static formatName(shortId: string): string {
    const langKeyBlock = `block.minecraft.${shortId}`;
    const langKeyItem = `item.minecraft.${shortId}`;
    if (this.langMap[langKeyBlock]) return this.langMap[langKeyBlock];
    if (this.langMap[langKeyItem]) return this.langMap[langKeyItem];
    return shortId
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  static registerBlock(def: Omit<BlockDefinition, 'numId' | 'id' | 'displayName'> & { displayName?: string }): BlockDefinition {
    const existing = this.blocksById.get(`minecraft:${def.shortId}`);
    if (existing) return existing;

    const numId = this.nextBlockNumId++;
    const fullId = `minecraft:${def.shortId}`;
    const fullDef: BlockDefinition = {
      ...def,
      numId,
      id: fullId,
      displayName: def.displayName || this.formatName(def.shortId),
    };
    this.blocksByNum.set(numId, fullDef);
    this.blocksById.set(fullId, fullDef);
    this.blocksById.set(def.shortId, fullDef);
    this.allBlocks.push(fullDef);

    // Also register corresponding BlockItem unless air or fluid or head part
    if (def.shape !== 'air' && def.shape !== 'fluid' && def.shape !== 'bed_head') {
      const itemTex =
        def.shortId === 'straw_bed'
          ? 'block/straw_bed_particle'
          : def.shape === 'cross' || def.shape === 'torch'
          ? `block/${def.textures.north}`
          : `block/${def.textures.north}`;
      this.registerItem({
        shortId: def.shortId,
        displayName: fullDef.displayName,
        isBlock: true,
        blockNumId: numId,
        texture: itemTex,
        category: def.category,
        maxStack: def.shortId.endsWith('_bed') ? 1 : 64,
        is26_3: def.is26_3,
      });
    }
    return fullDef;
  }

  static registerItem(def: Omit<ItemDefinition, 'id' | 'displayName'> & { displayName?: string }): ItemDefinition {
    const fullId = `minecraft:${def.shortId}`;
    const existing = this.itemsById.get(fullId);
    if (existing) return existing;

    const fullItem: ItemDefinition = {
      ...def,
      id: fullId,
      displayName: def.displayName || this.formatName(def.shortId),
    };
    this.itemsById.set(fullId, fullItem);
    this.itemsById.set(def.shortId, fullItem);
    this.allItems.push(fullItem);
    return fullItem;
  }

  static allFaces(tex: string) {
    return { top: tex, bottom: tex, north: tex, south: tex, east: tex, west: tex };
  }

  static topBottomSide(top: string, bottom: string, side: string) {
    return { top, bottom, north: side, south: side, east: side, west: side };
  }

  static async init() {
    // Load official en_us.json, blocks_summary.json, registries.json, packets.json, texture_manifest.json, and resolved 26.3 block/item models
    const [langRes, blocksRes, regRes, pktRes, texManifestRes, resolvedBlockModels, resolvedItemModels] = await Promise.all([
      fetch('/assets/minecraft/lang/en_us.json').then((r) => r.json()).catch(() => ({})),
      fetch('/reports/blocks_summary.json').then((r) => r.json()).catch(() => ({})),
      fetch('/reports/registries.json').then((r) => r.json()).catch(() => ({})),
      fetch('/reports/packets.json').then((r) => r.json()).catch(() => ({})),
      fetch('/reports/texture_manifest.json').then((r) => r.json()).catch(() => ({ block: [], item: [] })),
      fetch('/reports/resolved_block_models.json').then((r) => r.json()).catch(() => ({})),
      fetch('/reports/resolved_item_models.json').then((r) => r.json()).catch(() => ({})),
    ]);

    this.langMap = langRes;
    this.officialBlocksSummary = blocksRes;
    this.officialRegistries = regRes;
    this.officialPackets = pktRes;

    const blockTexSet = new Set<string>(texManifestRes.block || []);

    // ID 0: Air
    this.registerBlock({
      shortId: 'air',
      shape: 'air',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0,
      soundGroup: 'stone',
      textures: this.allFaces('stone'),
      category: 'natural',
    });

    // Core Terrain & Natural Blocks
    this.registerBlock({
      shortId: 'stone',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 1.5,
      soundGroup: 'stone',
      textures: this.allFaces('stone'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'grass_block',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.6,
      soundGroup: 'grass',
      tint: 'grass',
      textures: this.topBottomSide('grass_block_top', 'dirt', 'grass_block_side'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'dirt',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'gravel',
      textures: this.allFaces('dirt'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'coarse_dirt',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'gravel',
      textures: this.allFaces('coarse_dirt'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'podzol',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'gravel',
      textures: this.topBottomSide('podzol_top', 'dirt', 'podzol_side'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'dirt_path',
      shape: 'path',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0.65,
      soundGroup: 'grass',
      textures: this.topBottomSide('dirt_path_top', 'dirt', 'dirt_path_side'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'cobblestone',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'stone',
      textures: this.allFaces('cobblestone'),
      category: 'building',
    });
    this.registerBlock({
      shortId: 'bedrock',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: -1,
      soundGroup: 'stone',
      textures: this.allFaces('bedrock'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'sand',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'sand',
      textures: this.allFaces('sand'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'gravel',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.6,
      soundGroup: 'gravel',
      textures: this.allFaces('gravel'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'water',
      shape: 'fluid',
      fluid: 'water',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 100,
      soundGroup: 'stone',
      tint: 'water',
      textures: this.allFaces('water_still'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'lava',
      shape: 'fluid',
      fluid: 'lava',
      transparent: false,
      solid: false,
      lightEmission: 15,
      hardness: 100,
      soundGroup: 'stone',
      textures: this.allFaces('lava_still'),
      category: 'natural',
    });

    // =========================================================================
    // MINECRAFT 26.3 ("WILDERNESS BOUND") SIGNATURE BLOCKS & ITEMS
    // =========================================================================
    // 1. Poplar Wood Set & Dappled Forest Autumn Leaves
    this.registerBlock({
      shortId: 'poplar_log',
      shape: 'pillar',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.topBottomSide('poplar_log_top', 'poplar_log_top', 'poplar_log'),
      category: 'natural',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'stripped_poplar_log',
      shape: 'pillar',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.topBottomSide('stripped_poplar_log_top', 'stripped_poplar_log_top', 'stripped_poplar_log'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_wood',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.allFaces('poplar_log'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'stripped_poplar_wood',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.allFaces('stripped_poplar_log'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_planks',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.allFaces('poplar_planks'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_stairs',
      shape: 'stairs',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.allFaces('poplar_planks'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_slab',
      shape: 'slab_bottom',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.allFaces('poplar_planks'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_fence',
      shape: 'fence',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.allFaces('poplar_planks'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_trapdoor',
      shape: 'trapdoor',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 3.0,
      soundGroup: 'wood',
      textures: this.allFaces('poplar_trapdoor'),
      category: 'building',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_shelf',
      shape: 'slab_top',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.topBottomSide('poplar_shelf_top', 'poplar_shelf_top', 'poplar_shelf_front'),
      category: 'functional',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'orange_poplar_leaves',
      shape: 'cube',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0.2,
      soundGroup: 'poplar_leaves',
      textures: this.allFaces('orange_poplar_leaves'),
      category: 'natural',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'red_poplar_leaves',
      shape: 'cube',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0.2,
      soundGroup: 'poplar_leaves',
      textures: this.allFaces('red_poplar_leaves'),
      category: 'natural',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'yellow_poplar_leaves',
      shape: 'cube',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0.2,
      soundGroup: 'poplar_leaves',
      textures: this.allFaces('yellow_poplar_leaves'),
      category: 'natural',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'poplar_sapling',
      shape: 'cross',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0,
      soundGroup: 'grass',
      textures: this.allFaces('poplar_sapling'),
      category: 'natural',
      is26_3: true,
    });

    // 2. Straw Bed (26.3 Functional Wilderness Bed - mapped from 64x64 block/straw_bed.png)
    this.registerBlock({
      shortId: 'straw_bed',
      shape: 'bed_foot',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0.2,
      soundGroup: 'straw_bed',
      textures: this.topBottomSide('straw_bed_foot_top', 'oak_planks', 'straw_bed_side'),
      category: 'functional',
      is26_3: true,
    });
    this.registerBlock({
      shortId: 'straw_bed_head',
      shape: 'bed_head',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0.2,
      soundGroup: 'straw_bed',
      textures: this.topBottomSide('straw_bed_head_top', 'oak_planks', 'straw_bed_side'),
      category: 'functional',
      is26_3: true,
    });

    // 3. 16 Colored Cushions (26.3 Entity/Block Interactive Seating)
    for (const color of DYE_COLORS) {
      this.registerItem({
        shortId: `${color}_cushion`,
        isBlock: false,
        texture: `item/${color}_cushion`,
        category: 'colored',
        maxStack: 16,
        is26_3: true,
        cushionColor: color,
      });
    }

    // 4. 26.3 Wool Blocks, Wool Stairs (16), Wool Slabs (16), Concrete Blocks, Concrete Stairs (16), Concrete Slabs (16)
    for (const color of DYE_COLORS) {
      const woolTex = `${color}_wool`;
      this.registerBlock({
        shortId: `${color}_wool`,
        shape: 'cube',
        transparent: false,
        solid: true,
        lightEmission: 0,
        hardness: 0.8,
        soundGroup: 'wool',
        textures: this.allFaces(woolTex),
        category: 'colored',
      });
      this.registerBlock({
        shortId: `${color}_wool_stairs`,
        shape: 'stairs',
        transparent: true,
        solid: true,
        lightEmission: 0,
        hardness: 0.8,
        soundGroup: 'wool',
        textures: this.allFaces(woolTex),
        category: 'colored',
        is26_3: true,
      });
      this.registerBlock({
        shortId: `${color}_wool_slab`,
        shape: 'slab_bottom',
        transparent: true,
        solid: true,
        lightEmission: 0,
        hardness: 0.8,
        soundGroup: 'wool',
        textures: this.allFaces(woolTex),
        category: 'colored',
        is26_3: true,
      });

      const concreteTex = `${color}_concrete`;
      this.registerBlock({
        shortId: `${color}_concrete`,
        shape: 'cube',
        transparent: false,
        solid: true,
        lightEmission: 0,
        hardness: 1.8,
        soundGroup: 'stone',
        textures: this.allFaces(concreteTex),
        category: 'colored',
      });
      this.registerBlock({
        shortId: `${color}_concrete_stairs`,
        shape: 'stairs',
        transparent: true,
        solid: true,
        lightEmission: 0,
        hardness: 1.8,
        soundGroup: 'stone',
        textures: this.allFaces(concreteTex),
        category: 'colored',
        is26_3: true,
      });
      this.registerBlock({
        shortId: `${color}_concrete_slab`,
        shape: 'slab_bottom',
        transparent: true,
        solid: true,
        lightEmission: 0,
        hardness: 1.8,
        soundGroup: 'stone',
        textures: this.allFaces(concreteTex),
        category: 'colored',
        is26_3: true,
      });
    }

    // Other Wood Sets (Oak, Birch, Spruce, Cherry, Pale Oak, Dark Oak)
    const woods = ['oak', 'birch', 'spruce', 'cherry', 'pale_oak', 'dark_oak', 'jungle', 'acacia', 'mangrove'];
    for (const w of woods) {
      if (blockTexSet.has(`${w}_log`)) {
        this.registerBlock({
          shortId: `${w}_log`,
          shape: 'pillar',
          transparent: false,
          solid: true,
          lightEmission: 0,
          hardness: 2.0,
          soundGroup: 'wood',
          textures: this.topBottomSide(`${w}_log_top`, `${w}_log_top`, `${w}_log`),
          category: 'natural',
        });
      }
      if (blockTexSet.has(`${w}_planks`)) {
        this.registerBlock({
          shortId: `${w}_planks`,
          shape: 'cube',
          transparent: false,
          solid: true,
          lightEmission: 0,
          hardness: 2.0,
          soundGroup: 'wood',
          textures: this.allFaces(`${w}_planks`),
          category: 'building',
        });
        this.registerBlock({
          shortId: `${w}_stairs`,
          shape: 'stairs',
          transparent: true,
          solid: true,
          lightEmission: 0,
          hardness: 2.0,
          soundGroup: 'wood',
          textures: this.allFaces(`${w}_planks`),
          category: 'building',
        });
        this.registerBlock({
          shortId: `${w}_slab`,
          shape: 'slab_bottom',
          transparent: true,
          solid: true,
          lightEmission: 0,
          hardness: 2.0,
          soundGroup: 'wood',
          textures: this.allFaces(`${w}_planks`),
          category: 'building',
        });
        this.registerBlock({
          shortId: `${w}_fence`,
          shape: 'fence',
          transparent: true,
          solid: true,
          lightEmission: 0,
          hardness: 2.0,
          soundGroup: 'wood',
          textures: this.allFaces(`${w}_planks`),
          category: 'building',
        });
      }
      if (blockTexSet.has(`${w}_leaves`)) {
        this.registerBlock({
          shortId: `${w}_leaves`,
          shape: 'cube',
          transparent: true,
          solid: true,
          lightEmission: 0,
          hardness: 0.2,
          soundGroup: 'grass',
          tint: w === 'cherry' || w === 'pale_oak' ? undefined : w === 'birch' ? 'birch' : w === 'spruce' ? 'spruce' : 'foliage',
          textures: this.allFaces(`${w}_leaves`),
          category: 'natural',
        });
      }
    }

    // Abandoned Camp & Functional Blocks
    this.registerBlock({
      shortId: 'campfire',
      shape: 'campfire',
      transparent: true,
      solid: true,
      lightEmission: 15,
      hardness: 2.0,
      soundGroup: 'wood',
      textures: this.topBottomSide('campfire_log_lit', 'campfire_log', 'campfire_log'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'barrel',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.5,
      soundGroup: 'wood',
      textures: this.topBottomSide('barrel_top', 'barrel_bottom', 'barrel_side'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'chest',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.5,
      soundGroup: 'wood',
      textures: this.topBottomSide('oak_planks', 'oak_planks', 'oak_planks'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'crafting_table',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 2.5,
      soundGroup: 'wood',
      textures: {
        top: 'crafting_table_top',
        bottom: 'oak_planks',
        north: 'crafting_table_front',
        south: 'crafting_table_side',
        east: 'crafting_table_side',
        west: 'crafting_table_front',
      },
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'stonecutter',
      shape: 'slab_bottom',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 3.5,
      soundGroup: 'stone',
      textures: this.topBottomSide('stonecutter_top', 'stonecutter_bottom', 'stonecutter_side'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'furnace',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 3.5,
      soundGroup: 'stone',
      textures: {
        top: 'furnace_top',
        bottom: 'furnace_top',
        north: 'furnace_front',
        south: 'furnace_side',
        east: 'furnace_side',
        west: 'furnace_side',
      },
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'torch',
      shape: 'torch',
      transparent: true,
      solid: false,
      lightEmission: 14,
      hardness: 0,
      soundGroup: 'wood',
      textures: this.allFaces('torch'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'lantern',
      shape: 'cross',
      transparent: true,
      solid: true,
      lightEmission: 15,
      hardness: 3.5,
      soundGroup: 'stone',
      textures: this.allFaces('lantern'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'cauldron',
      shape: 'cube',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'stone',
      textures: this.topBottomSide('cauldron_top', 'cauldron_bottom', 'cauldron_side'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'water_cauldron',
      shape: 'cube',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 2.0,
      soundGroup: 'stone',
      textures: this.topBottomSide('cauldron_top', 'cauldron_bottom', 'cauldron_side'),
      category: 'functional',
    });

    // Flora & Dappled Forest Ground Cover
    this.registerBlock({
      shortId: 'leaf_litter',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0,
      soundGroup: 'poplar_leaves',
      tint: 'foliage',
      textures: this.allFaces(blockTexSet.has('leaf_litter') ? 'leaf_litter' : 'orange_poplar_leaves'),
      category: 'natural',
      is26_3: true,
    });
    const plants = [
      'short_grass',
      'fern',
      'dandelion',
      'poppy',
      'blue_orchid',
      'allium',
      'azure_bluet',
      'red_tulip',
      'orange_tulip',
      'white_tulip',
      'pink_tulip',
      'oxeye_daisy',
      'cornflower',
      'lily_of_the_valley',
      'brown_mushroom',
      'red_mushroom',
      'dead_bush',
      'wildflowers',
      'bush',
    ];
    for (const p of plants) {
      if (blockTexSet.has(p)) {
        this.registerBlock({
          shortId: p,
          shape: 'cross',
          transparent: true,
          solid: false,
          lightEmission: 0,
          hardness: 0,
          soundGroup: 'grass',
          tint: p === 'short_grass' || p === 'fern' || p === 'bush' ? 'grass' : undefined,
          textures: this.allFaces(p),
          category: 'natural',
        });
      }
    }

    // Ores, Bricks, Glass, Building Blocks
    const simpleCubes: Array<[string, BlockDefinition['category'], BlockDefinition['soundGroup'], number, boolean?]> = [
      ['stone_bricks', 'building', 'stone', 1.5],
      ['mossy_stone_bricks', 'building', 'stone', 1.5],
      ['cracked_stone_bricks', 'building', 'stone', 1.5],
      ['chiseled_stone_bricks', 'building', 'stone', 1.5],
      ['mossy_cobblestone', 'building', 'stone', 2.0],
      ['smooth_stone', 'building', 'stone', 2.0],
      ['granite', 'natural', 'stone', 1.5],
      ['polished_granite', 'building', 'stone', 1.5],
      ['diorite', 'natural', 'stone', 1.5],
      ['polished_diorite', 'building', 'stone', 1.5],
      ['andesite', 'natural', 'stone', 1.5],
      ['polished_andesite', 'building', 'stone', 1.5],
      ['deepslate', 'natural', 'stone', 3.0],
      ['cobbled_deepslate', 'building', 'stone', 3.5],
      ['deepslate_bricks', 'building', 'stone', 3.5],
      ['tuff', 'natural', 'stone', 1.5],
      ['bricks', 'building', 'stone', 2.0],
      ['mud_bricks', 'building', 'stone', 1.5],
      ['coal_ore', 'natural', 'stone', 3.0],
      ['iron_ore', 'natural', 'stone', 3.0],
      ['copper_ore', 'natural', 'stone', 3.0],
      ['gold_ore', 'natural', 'stone', 3.0],
      ['redstone_ore', 'natural', 'stone', 3.0],
      ['emerald_ore', 'natural', 'stone', 3.0],
      ['lapis_ore', 'natural', 'stone', 3.0],
      ['diamond_ore', 'natural', 'stone', 3.0],
      ['deepslate_coal_ore', 'natural', 'stone', 4.5],
      ['deepslate_iron_ore', 'natural', 'stone', 4.5],
      ['deepslate_copper_ore', 'natural', 'stone', 4.5],
      ['deepslate_gold_ore', 'natural', 'stone', 4.5],
      ['deepslate_redstone_ore', 'natural', 'stone', 4.5],
      ['deepslate_diamond_ore', 'natural', 'stone', 4.5],
      ['coal_block', 'building', 'stone', 5.0],
      ['iron_block', 'building', 'stone', 5.0],
      ['gold_block', 'building', 'stone', 3.0],
      ['diamond_block', 'building', 'stone', 5.0],
      ['emerald_block', 'building', 'stone', 5.0],
      ['copper_block', 'building', 'stone', 3.0],
      ['amethyst_block', 'natural', 'glass', 1.5],
      ['glass', 'colored', 'glass', 0.3, true],
      ['glowstone', 'functional', 'glass', 0.3],
      ['shroomlight', 'natural', 'grass', 1.0],
      ['sea_lantern', 'functional', 'glass', 0.3],
      ['obsidian', 'natural', 'stone', 50.0],
      ['crying_obsidian', 'natural', 'stone', 50.0],
      ['netherrack', 'natural', 'stone', 0.4],
      ['end_stone', 'natural', 'stone', 3.0],
      ['moss_block', 'natural', 'grass', 0.1],
      ['snow_block', 'natural', 'wool', 0.2],
      ['ice', 'natural', 'glass', 0.5, true],
      ['packed_ice', 'natural', 'glass', 0.5],
      ['blue_ice', 'natural', 'glass', 2.8],
      ['bookshelf', 'functional', 'wood', 1.5],
    ];

    for (const [shortId, category, soundGroup, hardness, transparent] of simpleCubes) {
      if (blockTexSet.has(shortId)) {
        const tex =
          shortId === 'bookshelf'
            ? this.topBottomSide('oak_planks', 'oak_planks', 'bookshelf')
            : this.allFaces(shortId);
        this.registerBlock({
          shortId,
          shape: 'cube',
          transparent: !!transparent,
          solid: true,
          lightEmission:
            shortId === 'glowstone' || shortId === 'shroomlight' || shortId === 'sea_lantern'
              ? 15
              : shortId === 'crying_obsidian'
              ? 10
              : 0,
          hardness,
          soundGroup,
          textures: tex,
          category,
        });
      }
    }

    // Hay Block & Bone Block
    this.registerBlock({
      shortId: 'hay_block',
      shape: 'pillar',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'grass',
      textures: this.topBottomSide('hay_block_top', 'hay_block_top', 'hay_block_side'),
      category: 'natural',
    });

    // Dynamically register any remaining official blocks from blocks_summary.json using resolved_block_models.json!
    for (const fullId of Object.keys(this.officialBlocksSummary)) {
      const shortId = fullId.replace('minecraft:', '');
      if (this.blocksById.has(fullId)) continue;
      const modelInfo = resolvedBlockModels[shortId];
      if (modelInfo && blockTexSet.has(modelInfo.top) && blockTexSet.has(modelInfo.north)) {
        this.registerBlock({
          shortId,
          shape: modelInfo.isCross ? 'cross' : shortId.endsWith('_slab') ? 'slab_bottom' : shortId.endsWith('_stairs') ? 'stairs' : 'cube',
          transparent:
            modelInfo.isCross ||
            shortId.includes('glass') ||
            shortId.includes('leaves') ||
            shortId.includes('grate') ||
            shortId.endsWith('_slab') ||
            shortId.endsWith('_stairs'),
          solid: !modelInfo.isCross,
          lightEmission: shortId.includes('froglight') || shortId.includes('lamp') || shortId.includes('lantern') ? 15 : 0,
          hardness: 1.5,
          soundGroup: shortId.includes('wood') || shortId.includes('planks') || shortId.includes('log') ? 'wood' : 'stone',
          tint:
            shortId.includes('leaves') && !shortId.includes('cherry') && !shortId.includes('poplar') && !shortId.includes('pale_oak')
              ? 'foliage'
              : modelInfo.isTinted
              ? 'grass'
              : undefined,
          textures: {
            top: modelInfo.top,
            bottom: blockTexSet.has(modelInfo.bottom) ? modelInfo.bottom : modelInfo.top,
            north: modelInfo.north,
            south: blockTexSet.has(modelInfo.south) ? modelInfo.south : modelInfo.north,
            east: blockTexSet.has(modelInfo.east) ? modelInfo.east : modelInfo.north,
            west: blockTexSet.has(modelInfo.west) ? modelInfo.west : modelInfo.north,
          },
          category: 'building',
          is26_3: shortId.includes('poplar') || shortId.includes('straw') || shortId.includes('cushion'),
        });
      } else if (blockTexSet.has(shortId)) {
        this.registerBlock({
          shortId,
          shape: 'cube',
          transparent: shortId.includes('glass') || shortId.includes('leaves') || shortId.includes('grate'),
          solid: true,
          lightEmission: shortId.includes('froglight') || shortId.includes('lamp') ? 15 : 0,
          hardness: 1.5,
          soundGroup: shortId.includes('wood') || shortId.includes('planks') ? 'wood' : 'stone',
          textures: this.allFaces(shortId),
          category: 'building',
          is26_3: shortId.includes('poplar') || shortId.includes('straw') || shortId.includes('cushion'),
        });
      }
    }

    // Register Tools, Weapons, Food & Explorer Map Items
    const tools: Array<[string, ItemDefinition['toolType'], number]> = [
      ['diamond_pickaxe', 'pickaxe', 8],
      ['diamond_axe', 'axe', 8],
      ['diamond_shovel', 'shovel', 8],
      ['diamond_sword', 'sword', 8],
      ['iron_pickaxe', 'pickaxe', 6],
      ['iron_axe', 'axe', 6],
      ['iron_shovel', 'shovel', 6],
      ['iron_sword', 'sword', 6],
      ['wooden_pickaxe', 'pickaxe', 2],
      ['wooden_axe', 'axe', 2],
      ['wooden_shovel', 'shovel', 2],
      ['wooden_sword', 'sword', 2],
      ['stone_pickaxe', 'pickaxe', 4],
      ['stone_axe', 'axe', 4],
      ['stone_shovel', 'shovel', 4],
      ['stone_sword', 'sword', 4],
    ];
    for (const [shortId, toolType, toolSpeed] of tools) {
      this.registerItem({
        shortId,
        isBlock: false,
        texture: `item/${shortId}`,
        category: 'combat_tools',
        maxStack: 1,
        toolType,
        toolSpeed,
        isHandheld: true,
      });
    }

    const miscItems: Array<[string, ItemDefinition['category'], boolean?]> = [
      ['poplar_boat', 'combat_tools', true],
      ['poplar_chest_boat', 'combat_tools', true],
      ['poplar_sign', 'functional', true],
      ['poplar_hanging_sign', 'functional', true],
      ['filled_map', 'combat_tools', true], // Abandoned Camp Explorer Map!
      ['wheat', 'natural'],
      ['stick', 'natural'],
      ['coal', 'natural'],
      ['iron_ingot', 'natural'],
      ['gold_ingot', 'natural'],
      ['diamond', 'natural'],
      ['emerald', 'natural'],
      ['apple', 'natural'],
      ['bread', 'natural'],
      ['porkchop', 'natural'],
      ['cooked_porkchop', 'natural'],
      ['beef', 'natural'],
      ['cooked_beef', 'natural'],
      ['mutton', 'natural'],
      ['cooked_mutton', 'natural'],
      ['leather', 'natural'],
      ['feather', 'natural'],
      ['string', 'natural'],
      ['bone', 'natural'],
      ['flint', 'natural'],
      ['shears', 'combat_tools'],
      ['water_bucket', 'combat_tools'],
      ['lava_bucket', 'combat_tools'],
      ['compass', 'combat_tools'],
      ['clock', 'combat_tools'],
    ];
    for (const [shortId, category, is26_3] of miscItems) {
      this.registerItem({
        shortId,
        displayName: shortId === 'filled_map' ? 'Abandoned Camp Explorer Map' : undefined,
        isBlock: false,
        texture: `item/${shortId}`,
        category,
        maxStack: shortId.includes('boat') || shortId.includes('bucket') ? 1 : 64,
        is26_3,
        isHandheld: shortId === 'stick',
      });
    }

    // Apply resolved item model properties (isHandheld & official layer0 texture) to all registered items
    for (const item of this.allItems) {
      const rm = resolvedItemModels[item.shortId];
      if (rm) {
        if (rm.isHandheld) item.isHandheld = true;
        if (!item.isBlock && rm.tex) item.texture = rm.tex;
      }
      if (item.toolType || item.shortId === 'stick') {
        item.isHandheld = true;
      }
    }
  }

  static getBlock(idOrNum: number | string): BlockDefinition {
    if (typeof idOrNum === 'number') {
      return this.blocksByNum.get(idOrNum) || this.blocksByNum.get(0)!;
    }
    const clean = idOrNum.startsWith('minecraft:') ? idOrNum : `minecraft:${idOrNum}`;
    return this.blocksById.get(clean) || this.blocksByNum.get(1)!;
  }

  static getItem(id: string): ItemDefinition | undefined {
    const clean = id.startsWith('minecraft:') ? id : `minecraft:${id}`;
    return this.itemsById.get(clean);
  }
}
