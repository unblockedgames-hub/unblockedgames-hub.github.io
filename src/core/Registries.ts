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
  | 'door'
  | 'fence_gate'
  | 'trapdoor'
  | 'portal';

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
  soundGroup: 'stone' | 'deepslate' | 'wood' | 'grass' | 'poplar_leaves' | 'straw_bed' | 'wool' | 'sand' | 'gravel' | 'glass';
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
      shortId: 'grass_block_snow',
      displayName: 'Grass Block',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.6,
      soundGroup: 'grass',
      textures: this.topBottomSide('snow', 'dirt', 'grass_block_snow'),
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

    this.registerBlock({
      shortId: 'nether_portal',
      shape: 'portal',
      transparent: true,
      solid: false,
      lightEmission: 11,
      hardness: -1,
      soundGroup: 'glass',
      textures: this.allFaces('nether_portal'),
      category: 'functional',
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
      shortId: 'redstone_torch',
      shape: 'torch',
      transparent: true,
      solid: false,
      lightEmission: 7,
      hardness: 0,
      soundGroup: 'wood',
      textures: this.allFaces('redstone_torch'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'lever',
      shape: 'torch',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'wood',
      textures: this.allFaces('lever'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'redstone_wire',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0,
      soundGroup: 'sand',
      textures: this.allFaces('redstone_dust_dot'),
      category: 'redstone',
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
    this.registerBlock({
      shortId: 'snow',
      displayName: 'Snow',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.1,
      soundGroup: 'wool',
      textures: this.allFaces(blockTexSet.has('snow') ? 'snow' : 'snow_block'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'lily_pad',
      displayName: 'Lily Pad',
      shape: 'carpet',
      transparent: true,
      solid: true,
      lightEmission: 0,
      hardness: 0,
      soundGroup: 'grass',
      tint: 'foliage',
      textures: this.allFaces('lily_pad'),
      category: 'natural',
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

    // Official Minecraft Saplings: instant break (hardness 0), cross shape, grass sound
    const saplings = [
      'oak_sapling',
      'spruce_sapling',
      'birch_sapling',
      'jungle_sapling',
      'acacia_sapling',
      'dark_oak_sapling',
      'cherry_sapling',
      'pale_oak_sapling',
    ];
    for (const s of saplings) {
      if (blockTexSet.has(s) && !this.blocksById.has(`minecraft:${s}`)) {
        this.registerBlock({
          shortId: s,
          shape: 'cross',
          transparent: true,
          solid: false,
          lightEmission: 0,
          hardness: 0,
          soundGroup: 'grass',
          textures: this.allFaces(s),
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
      ['deepslate', 'natural', 'deepslate', 3.0],
      ['cobbled_deepslate', 'building', 'deepslate', 3.5],
      ['deepslate_bricks', 'building', 'deepslate', 3.5],
      ['tuff', 'natural', 'deepslate', 1.5],
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
      ['deepslate_coal_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_iron_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_copper_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_gold_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_redstone_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_diamond_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_lapis_ore', 'natural', 'deepslate', 4.5],
      ['deepslate_emerald_ore', 'natural', 'deepslate', 4.5],
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
      ['nether_quartz_ore', 'natural', 'stone', 3.0],
      ['nether_gold_ore', 'natural', 'stone', 3.0],
      ['soul_sand', 'natural', 'sand', 0.5],
      ['end_stone', 'natural', 'stone', 3.0],
      ['moss_block', 'natural', 'grass', 0.1],
      ['snow_block', 'natural', 'wool', 0.2],
      ['ice', 'natural', 'glass', 0.5, true],
      ['packed_ice', 'natural', 'glass', 0.5],
      ['blue_ice', 'natural', 'glass', 2.8],
      ['bookshelf', 'functional', 'wood', 1.5],
      ['tnt', 'redstone', 'grass', 0.0],
      ['redstone_block', 'redstone', 'stone', 5.0],
      ['redstone_lamp', 'redstone', 'glass', 0.3],
      ['redstone_lamp_on', 'redstone', 'glass', 0.3],
      ['dragon_egg', 'natural', 'stone', 3.0],
      ['end_portal_frame', 'functional', 'glass', -1.0],
      ['soul_soil', 'natural', 'sand', 0.5],
      ['nether_bricks', 'building', 'stone', 2.0],
      ['red_nether_bricks', 'building', 'stone', 2.0],
      ['chiseled_nether_bricks', 'building', 'stone', 2.0],
      ['cracked_nether_bricks', 'building', 'stone', 2.0],
      ['crimson_nylium', 'natural', 'stone', 0.4],
      ['warped_nylium', 'natural', 'stone', 0.4],
      ['crimson_stem', 'building', 'wood', 2.0],
      ['warped_stem', 'building', 'wood', 2.0],
      ['crimson_planks', 'building', 'wood', 2.0],
      ['warped_planks', 'building', 'wood', 2.0],
      ['nether_wart_block', 'building', 'grass', 1.0],
      ['warped_wart_block', 'building', 'grass', 1.0],
      ['basalt', 'building', 'stone', 1.25],
      ['polished_basalt', 'building', 'stone', 1.25],
      ['smooth_basalt', 'building', 'stone', 1.25],
      ['blackstone', 'building', 'stone', 1.5],
      ['polished_blackstone', 'building', 'stone', 1.5],
      ['polished_blackstone_bricks', 'building', 'stone', 1.5],
      ['gilded_blackstone', 'building', 'stone', 1.5],
      ['ancient_debris', 'natural', 'stone', 30.0],
      ['end_stone_bricks', 'building', 'stone', 3.0],
      ['purpur_block', 'building', 'stone', 1.5],
      ['purpur_pillar', 'building', 'stone', 1.5],
      ['iron_bars', 'building', 'metal', 5.0, true],
      ['bone_block', 'building', 'stone', 2.0],
      ['spawner', 'functional', 'metal', 5.0, true],
    ];

    for (const [shortId, category, soundGroup, hardness, transparent] of simpleCubes) {
      if (blockTexSet.has(shortId)) {
        const tex =
          shortId === 'bookshelf'
            ? this.topBottomSide('oak_planks', 'oak_planks', 'bookshelf')
            : shortId === 'deepslate'
            ? this.topBottomSide('deepslate_top', 'deepslate_top', 'deepslate')
            : shortId === 'tnt'
            ? this.topBottomSide('tnt_top', 'tnt_bottom', 'tnt_side')
            : shortId === 'end_portal_frame'
            ? this.topBottomSide('end_portal_frame_top', 'end_stone', 'end_portal_frame_side')
            : shortId === 'crimson_nylium'
            ? this.topBottomSide('crimson_nylium', 'netherrack', 'crimson_nylium_side')
            : shortId === 'warped_nylium'
            ? this.topBottomSide('warped_nylium', 'netherrack', 'warped_nylium_side')
            : shortId === 'basalt'
            ? this.topBottomSide('basalt_top', 'basalt_top', 'basalt_side')
            : shortId === 'polished_basalt'
            ? this.topBottomSide('polished_basalt_top', 'polished_basalt_top', 'polished_basalt_side')
            : shortId === 'ancient_debris'
            ? this.topBottomSide('ancient_debris_top', 'ancient_debris_top', 'ancient_debris_side')
            : shortId === 'bone_block'
            ? this.topBottomSide('bone_block_top', 'bone_block_top', 'bone_block_side')
            : shortId === 'purpur_pillar'
            ? this.topBottomSide('purpur_pillar_top', 'purpur_pillar_top', 'purpur_pillar')
            : this.allFaces(shortId);
        this.registerBlock({
          shortId,
          shape: 'cube',
          transparent: !!transparent,
          solid: true,
          lightEmission:
            shortId === 'glowstone' ||
            shortId === 'shroomlight' ||
            shortId === 'sea_lantern' ||
            shortId === 'redstone_lamp_on'
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

    // End Portal & End Gateway (Special starry/void planes)
    this.registerBlock({
      shortId: 'end_portal',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 15,
      hardness: -1,
      soundGroup: 'glass',
      textures: this.allFaces('obsidian'),
      category: 'functional',
    });
    this.registerBlock({
      shortId: 'end_gateway',
      shape: 'cube',
      transparent: true,
      solid: false,
      lightEmission: 15,
      hardness: -1,
      soundGroup: 'glass',
      textures: this.allFaces('obsidian'),
      category: 'functional',
    });

    // Chorus Plant & Flower
    this.registerBlock({
      shortId: 'chorus_plant',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.4,
      soundGroup: 'wool',
      textures: this.allFaces('chorus_plant'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'chorus_flower',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.4,
      soundGroup: 'wool',
      textures: this.allFaces('chorus_flower'),
      category: 'natural',
    });

    // Pistons & Redstone components
    this.registerBlock({
      shortId: 'piston',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'stone',
      textures: this.topBottomSide('piston_top', 'piston_bottom', 'piston_side'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'sticky_piston',
      shape: 'cube',
      transparent: false,
      solid: true,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'stone',
      textures: this.topBottomSide('piston_top_sticky', 'piston_bottom', 'piston_side'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'repeater',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.1,
      soundGroup: 'stone',
      textures: this.allFaces('repeater'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'lever',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'wood',
      textures: this.allFaces('lever'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'stone_button',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'stone',
      textures: this.allFaces('stone'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'oak_button',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'wood',
      textures: this.allFaces('oak_planks'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'stone_pressure_plate',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'stone',
      textures: this.allFaces('stone'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'oak_pressure_plate',
      shape: 'carpet',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.5,
      soundGroup: 'wood',
      textures: this.allFaces('oak_planks'),
      category: 'redstone',
    });
    this.registerBlock({
      shortId: 'weeping_vines',
      shape: 'cross',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.1,
      soundGroup: 'grass',
      textures: this.allFaces('weeping_vines'),
      category: 'natural',
    });
    this.registerBlock({
      shortId: 'twisting_vines',
      shape: 'cross',
      transparent: true,
      solid: false,
      lightEmission: 0,
      hardness: 0.1,
      soundGroup: 'grass',
      textures: this.allFaces('twisting_vines'),
      category: 'natural',
    });


    // Redstone Automation & Power Devices
    const redstoneBlocks: Array<{ id: string; top?: string; bot?: string; side?: string; all?: string; shape?: string; solid?: boolean; transparent?: boolean; light?: number }> = [
      { id: 'observer', top: 'observer_top', bot: 'observer_top', side: 'observer_front' },
      { id: 'hopper', top: 'hopper_top', bot: 'hopper_inside', side: 'hopper_outside' },
      { id: 'dispenser', top: 'furnace_top', bot: 'furnace_top', side: 'dispenser_front' },
      { id: 'dropper', top: 'furnace_top', bot: 'furnace_top', side: 'dropper_front' },
      { id: 'comparator', all: 'comparator', shape: 'carpet', solid: false, transparent: true },
      { id: 'target', top: 'target_top', bot: 'target_top', side: 'target_side' },
      { id: 'daylight_detector', top: 'daylight_detector_top', bot: 'oak_planks', side: 'daylight_detector_side', shape: 'slab' },
      { id: 'daylight_detector_inverted', top: 'daylight_detector_inverted_top', bot: 'oak_planks', side: 'daylight_detector_side', shape: 'slab' },
      { id: 'note_block', all: 'note_block' },
      { id: 'crafter', top: 'crafter_top', bot: 'crafter_bottom', side: 'crafter_side' },
    ];

    for (const b of redstoneBlocks) {
      this.registerBlock({
        shortId: b.id,
        shape: (b.shape as any) || 'cube',
        transparent: b.transparent ?? false,
        solid: b.solid ?? true,
        lightEmission: b.light || 0,
        hardness: 1.5,
        soundGroup: 'stone',
        textures: b.all ? this.allFaces(b.all) : this.topBottomSide(b.top!, b.bot!, b.side!),
        category: 'redstone',
      });
    }

    // Workstations & Functional Blocks
    const workstations: Array<{ id: string; top?: string; bot?: string; side?: string; all?: string; shape?: string; solid?: boolean; transparent?: boolean; light?: number }> = [
      { id: 'enchanting_table', top: 'enchanting_table_top', bot: 'obsidian', side: 'enchanting_table_side' },
      { id: 'anvil', top: 'anvil_top', bot: 'anvil', side: 'anvil' },
      { id: 'chipped_anvil', top: 'chipped_anvil_top', bot: 'anvil', side: 'anvil' },
      { id: 'damaged_anvil', top: 'damaged_anvil_top', bot: 'anvil', side: 'anvil' },
      { id: 'brewing_stand', all: 'brewing_stand', shape: 'carpet', solid: false, transparent: true },
      { id: 'grindstone', top: 'grindstone_round', bot: 'dark_oak_planks', side: 'grindstone_side' },
      { id: 'smithing_table', top: 'smithing_table_top', bot: 'smithing_table_bottom', side: 'smithing_table_front' },
      { id: 'lectern', top: 'lectern_top', bot: 'lectern_base', side: 'lectern_sides' },
      { id: 'composter', top: 'composter_top', bot: 'composter_bottom', side: 'composter_side' },
      { id: 'cauldron', top: 'cauldron_top', bot: 'cauldron_bottom', side: 'cauldron_side' },
      { id: 'bell', top: 'bell_top', bot: 'bell_bottom', side: 'bell_side' },
      { id: 'respawn_anchor', top: 'respawn_anchor_top_off', bot: 'respawn_anchor_bottom', side: 'respawn_anchor_side0', light: 3 },
      { id: 'lodestone', top: 'lodestone_top', bot: 'lodestone_top', side: 'lodestone_side' },
    ];

    for (const b of workstations) {
      this.registerBlock({
        shortId: b.id,
        shape: (b.shape as any) || 'cube',
        transparent: b.transparent ?? false,
        solid: b.solid ?? true,
        lightEmission: b.light || 0,
        hardness: 2.0,
        soundGroup: b.id.includes('anvil') || b.id === 'cauldron' || b.id === 'bell' ? 'metal' : 'stone',
        textures: b.all ? this.allFaces(b.all) : this.topBottomSide(b.top!, b.bot!, b.side!),
        category: 'functional',
      });
    }

    // Sculk & Trial Chamber Blocks
    const sculkTrial: Array<{ id: string; top?: string; bot?: string; side?: string; all?: string; light?: number }> = [
      { id: 'sculk', all: 'sculk' },
      { id: 'sculk_catalyst', top: 'sculk_catalyst_top', bot: 'sculk_catalyst_bottom', side: 'sculk_catalyst_side', light: 6 },
      { id: 'sculk_sensor', top: 'sculk_sensor_tendril_active', bot: 'sculk', side: 'sculk_sensor_side', light: 1 },
      { id: 'sculk_shrieker', top: 'sculk_shrieker_top', bot: 'sculk_shrieker_bottom', side: 'sculk_shrieker_side' },
      { id: 'trial_spawner', top: 'trial_spawner_top_inactive', bot: 'trial_spawner_bottom', side: 'trial_spawner_side_inactive', light: 4 },
      { id: 'vault', top: 'vault_top', bot: 'vault_bottom', side: 'vault_front_off', light: 6 },
      { id: 'heavy_core', all: 'heavy_core' },
    ];

    for (const b of sculkTrial) {
      this.registerBlock({
        shortId: b.id,
        shape: 'cube',
        transparent: false,
        solid: true,
        lightEmission: b.light || 0,
        hardness: 3.0,
        soundGroup: 'stone',
        textures: b.all ? this.allFaces(b.all) : this.topBottomSide(b.top!, b.bot!, b.side!),
        category: 'natural',
      });
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
          shape: modelInfo.isCross
            ? 'cross'
            : shortId.endsWith('_slab')
            ? 'slab_bottom'
            : shortId.endsWith('_stairs')
            ? 'stairs'
            : shortId.endsWith('_trapdoor')
            ? 'trapdoor'
            : shortId.endsWith('_fence_gate')
            ? 'fence_gate'
            : shortId.endsWith('_fence')
            ? 'fence'
            : shortId.endsWith('_door')
            ? 'door'
            : 'cube',
          transparent:
            modelInfo.isCross ||
            shortId.includes('glass') ||
            shortId.includes('leaves') ||
            shortId.includes('grate') ||
            shortId.endsWith('_slab') ||
            shortId.endsWith('_stairs') ||
            shortId.endsWith('_trapdoor') ||
            shortId.endsWith('_fence_gate') ||
            shortId.endsWith('_fence') ||
            shortId.endsWith('_door'),
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
        const isStair = shortId.endsWith('_stairs');
        const isTrapdoor = shortId.endsWith('_trapdoor');
        const isSlab = shortId.endsWith('_slab');
        const isFence = shortId.endsWith('_fence');
        const isFenceGate = shortId.endsWith('_fence_gate');
        const isDoor = shortId.endsWith('_door');
        this.registerBlock({
          shortId,
          shape: isStair ? 'stairs' : isTrapdoor ? 'trapdoor' : isSlab ? 'slab_bottom' : isFence ? 'fence' : isFenceGate ? 'fence_gate' : isDoor ? 'door' : 'cube',
          transparent: isStair || isTrapdoor || isSlab || isFence || isFenceGate || isDoor || shortId.includes('glass') || shortId.includes('leaves') || shortId.includes('grate'),
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
      ['golden_pickaxe', 'pickaxe', 12],
      ['golden_axe', 'axe', 12],
      ['golden_shovel', 'shovel', 12],
      ['golden_sword', 'sword', 12],
      ['netherite_pickaxe', 'pickaxe', 9],
      ['netherite_axe', 'axe', 9],
      ['netherite_shovel', 'shovel', 9],
      ['netherite_sword', 'sword', 9],
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
      ['filled_map', 'combat_tools', true],
      ['ender_eye', 'combat_tools'],
      ['ender_pearl', 'combat_tools'],
      ['blaze_rod', 'natural'],
      ['blaze_powder', 'natural'],
      ['magma_cream', 'natural'],
      ['ghast_tear', 'natural'],
      ['nether_wart', 'natural'],
      ['chorus_fruit', 'natural'],
      ['elytra', 'combat_tools'],
      ['shulker_shell', 'natural'],
      ['dragon_breath', 'natural'],
      ['wither_skeleton_skull', 'combat_tools'],
      ['nether_star', 'natural'],
      ['totem_of_undying', 'combat_tools'],
      ['shield', 'combat_tools'],
      ['trident', 'combat_tools'],
      ['crossbow', 'combat_tools'],
      ['mace', 'combat_tools'],
      ['breeze_rod', 'natural'],
      ['wind_charge', 'combat_tools'],
      ['trial_key', 'combat_tools'],
      ['ominous_trial_key', 'combat_tools'],
      ['ominous_bottle', 'combat_tools'],
      ['potion', 'combat_tools'],
      ['splash_potion', 'combat_tools'],
      ['lingering_potion', 'combat_tools'],
      ['glass_bottle', 'combat_tools'],
      ['snowball', 'combat_tools'],
 // Abandoned Camp Explorer Map!
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
      ['flint_and_steel', 'combat_tools'],
      ['bucket', 'combat_tools'],
      ['raw_iron', 'natural'],
      ['raw_gold', 'natural'],
      ['raw_copper', 'natural'],
      ['copper_ingot', 'natural'],
      ['redstone', 'redstone'],
      ['lapis_lazuli', 'natural'],
      ['gold_nugget', 'natural'],
      ['iron_nugget', 'natural'],
      ['quartz', 'natural'],
      ['clay_ball', 'natural'],
      ['glowstone_dust', 'natural'],
      ['wheat_seeds', 'natural'],
      ['rotten_flesh', 'combat_tools'],
      ['bow', 'combat_tools'],
      ['arrow', 'combat_tools'],
      ['iron_helmet', 'combat_tools'],
      ['iron_chestplate', 'combat_tools'],
      ['iron_leggings', 'combat_tools'],
      ['iron_boots', 'combat_tools'],
      ['diamond_helmet', 'combat_tools'],
      ['diamond_chestplate', 'combat_tools'],
      ['diamond_leggings', 'combat_tools'],
      ['diamond_boots', 'combat_tools'],
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
