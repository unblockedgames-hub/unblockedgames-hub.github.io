import * as THREE from 'three';
import { Registries, BlockDefinition } from '../core/Registries';
import { TextureAtlas } from '../render/TextureAtlas';

export const CHUNK_SIZE = 16;
export const CHUNK_MIN_Y = -64;
export const CHUNK_MAX_Y = 320;
export const CHUNK_HEIGHT = 384; // CHUNK_MAX_Y - CHUNK_MIN_Y

export interface BiomeInfo {
  id: string;
  name: string;
  grassColor: [number, number, number];
  foliageColor: [number, number, number];
  waterColor: [number, number, number];
}

export const BIOMES_26_3: Record<string, BiomeInfo> = {
  'minecraft:dappled_forest': {
    id: 'minecraft:dappled_forest',
    name: 'Dappled Forest',
    grassColor: [0.64, 0.76, 0.34], // Warm autumn-tinted grass
    foliageColor: [0.42, 0.68, 0.24],
    waterColor: [0.24, 0.48, 0.89],
  },
  'minecraft:poplar_grove': {
    id: 'minecraft:poplar_grove',
    name: 'Poplar Grove',
    grassColor: [0.68, 0.78, 0.36],
    foliageColor: [0.55, 0.72, 0.26],
    waterColor: [0.24, 0.48, 0.89],
  },
  'minecraft:forest': {
    id: 'minecraft:forest',
    name: 'Forest',
    grassColor: [0.47, 0.74, 0.32],
    foliageColor: [0.44, 0.70, 0.27],
    waterColor: [0.24, 0.46, 0.89],
  },
  'minecraft:plains': {
    id: 'minecraft:plains',
    name: 'Plains',
    grassColor: [0.56, 0.74, 0.35],
    foliageColor: [0.47, 0.67, 0.28],
    waterColor: [0.24, 0.46, 0.89],
  },
  'minecraft:cherry_grove': {
    id: 'minecraft:cherry_grove',
    name: 'Cherry Grove',
    grassColor: [0.71, 0.86, 0.38],
    foliageColor: [0.71, 0.86, 0.38],
    waterColor: [0.36, 0.72, 0.94],
  },
  'minecraft:birch_forest': {
    id: 'minecraft:birch_forest',
    name: 'Birch Forest',
    grassColor: [0.53, 0.73, 0.40],
    foliageColor: [0.50, 0.65, 0.33],
    waterColor: [0.24, 0.46, 0.89],
  },
  'minecraft:desert': {
    id: 'minecraft:desert',
    name: 'Desert',
    grassColor: [0.75, 0.71, 0.38],
    foliageColor: [0.68, 0.65, 0.33],
    waterColor: [0.20, 0.42, 0.82],
  },
  'minecraft:nether_wastes': {
    id: 'minecraft:nether_wastes',
    name: 'Nether Wastes',
    grassColor: [0.55, 0.15, 0.15],
    foliageColor: [0.55, 0.15, 0.15],
    waterColor: [0.55, 0.15, 0.15],
  },
  'minecraft:savanna': {
    id: 'minecraft:savanna',
    name: 'Savanna',
    grassColor: [0.75, 0.71, 0.29],
    foliageColor: [0.67, 0.63, 0.25],
    waterColor: [0.24, 0.46, 0.89],
  },
  'minecraft:snowy_plains': {
    id: 'minecraft:snowy_plains',
    name: 'Snowy Plains',
    grassColor: [0.50, 0.68, 0.48],
    foliageColor: [0.40, 0.60, 0.45],
    waterColor: [0.24, 0.40, 0.88],
  },
  'minecraft:badlands': {
    id: 'minecraft:badlands',
    name: 'Badlands',
    grassColor: [0.56, 0.52, 0.34],
    foliageColor: [0.62, 0.53, 0.30],
    waterColor: [0.30, 0.44, 0.78],
  },
};

/**
 * Represents a 16x128x16 Chunk with block IDs, metadata (facing/orientation), biome map,
 * and builds optimized Three.js BufferGeometries using the official 26.3 TextureAtlas.
 */
export class Chunk {
  readonly cx: number;
  readonly cz: number;
  readonly blocks: Uint16Array;
  readonly meta: Uint8Array; // Lower 2 bits: facing (0=N,1=E,2=S,3=W), Bit 2: top half
  readonly biomes: string[]; // 16x16 biome IDs
  dirty = true;
  solidMesh: THREE.Mesh | null = null;
  waterMesh: THREE.Mesh | null = null;

  constructor(cx: number, cz: number) {
    this.cx = cx;
    this.cz = cz;
    this.blocks = new Uint16Array(CHUNK_SIZE * CHUNK_HEIGHT * CHUNK_SIZE);
    this.meta = new Uint8Array(CHUNK_SIZE * CHUNK_HEIGHT * CHUNK_SIZE);
    this.biomes = new Array(CHUNK_SIZE * CHUNK_SIZE).fill('minecraft:dappled_forest');
  }

  private idx(lx: number, y: number, lz: number): number {
    const localY = y - CHUNK_MIN_Y;
    return (localY * CHUNK_SIZE + lz) * CHUNK_SIZE + lx;
  }

  getBlock(lx: number, y: number, lz: number): number {
    if (lx < 0 || lx >= CHUNK_SIZE || y < CHUNK_MIN_Y || y >= CHUNK_MAX_Y || lz < 0 || lz >= CHUNK_SIZE) {
      return 0;
    }
    return this.blocks[this.idx(lx, y, lz)];
  }

  setBlock(lx: number, y: number, lz: number, blockNumId: number, metaVal = 0) {
    if (lx < 0 || lx >= CHUNK_SIZE || y < CHUNK_MIN_Y || y >= CHUNK_MAX_Y || lz < 0 || lz >= CHUNK_SIZE) {
      return;
    }
    const i = this.idx(lx, y, lz);
    this.blocks[i] = blockNumId;
    this.meta[i] = metaVal;
    this.dirty = true;
  }

  getMeta(lx: number, y: number, lz: number): number {
    if (lx < 0 || lx >= CHUNK_SIZE || y < CHUNK_MIN_Y || y >= CHUNK_MAX_Y || lz < 0 || lz >= CHUNK_SIZE) {
      return 0;
    }
    return this.meta[this.idx(lx, y, lz)];
  }

  getBiome(lx: number, lz: number): BiomeInfo {
    const bId = this.biomes[(lz & 15) * CHUNK_SIZE + (lx & 15)] || 'minecraft:dappled_forest';
    return BIOMES_26_3[bId] || BIOMES_26_3['minecraft:dappled_forest'];
  }

  setBiome(lx: number, lz: number, biomeId: string) {
    this.biomes[(lz & 15) * CHUNK_SIZE + (lx & 15)] = biomeId;
  }

  buildMeshes(
    getWorldBlock: (wx: number, wy: number, wz: number) => number,
    solidMaterial: THREE.Material,
    waterMaterial: THREE.Material
  ) {
    this.dirty = false;

    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    let vertCount = 0;

    const wPositions: number[] = [];
    const wNormals: number[] = [];
    const wUvs: number[] = [];
    const wColors: number[] = [];
    const wIndices: number[] = [];
    let wVertCount = 0;

    const pushQuad = (
      isWater: boolean,
      v0: [number, number, number],
      v1: [number, number, number],
      v2: [number, number, number],
      v3: [number, number, number],
      nx: number,
      ny: number,
      nz: number,
      texName: string,
      r: number,
      g: number,
      b: number,
      uvSub?: [number, number, number, number],
      uvRot = 0
    ) => {
      const uvBox = TextureAtlas.getUV(texName);
      let u0 = uvBox.u0;
      let vBottom = uvBox.v0;
      let u1 = uvBox.u1;
      let vTop = uvBox.v1;

      if (uvSub) {
        const du = uvBox.u1 - uvBox.u0;
        const dv = uvBox.v1 - uvBox.v0;
        u0 = uvBox.u0 + uvSub[0] * du;
        vBottom = uvBox.v0 + uvSub[1] * dv;
        u1 = uvBox.u0 + uvSub[2] * du;
        vTop = uvBox.v0 + uvSub[3] * dv;
      }

      let quadUvs: number[];
      if (uvRot === 1) {
        quadUvs = [u1, vBottom, u1, vTop, u0, vTop, u0, vBottom];
      } else if (uvRot === 2) {
        quadUvs = [u1, vTop, u0, vTop, u0, vBottom, u1, vBottom];
      } else if (uvRot === 3) {
        quadUvs = [u0, vTop, u0, vBottom, u1, vBottom, u1, vTop];
      } else {
        quadUvs = [u0, vBottom, u1, vBottom, u1, vTop, u0, vTop];
      }

      if (isWater) {
        wPositions.push(...v0, ...v1, ...v2, ...v3);
        for (let i = 0; i < 4; i++) {
          wNormals.push(nx, ny, nz);
          wColors.push(r, g, b);
        }
        wUvs.push(...quadUvs);
        wIndices.push(
          wVertCount,
          wVertCount + 1,
          wVertCount + 2,
          wVertCount,
          wVertCount + 2,
          wVertCount + 3
        );
        wVertCount += 4;
      } else {
        positions.push(...v0, ...v1, ...v2, ...v3);
        for (let i = 0; i < 4; i++) {
          normals.push(nx, ny, nz);
          colors.push(r, g, b);
        }
        uvs.push(...quadUvs);
        indices.push(
          vertCount,
          vertCount + 1,
          vertCount + 2,
          vertCount,
          vertCount + 2,
          vertCount + 3
        );
        vertCount += 4;
      }
    };

    const pushBox = (
      x0: number,
      y0: number,
      z0: number,
      x1: number,
      y1: number,
      z1: number,
      def: BlockDefinition,
      biome: BiomeInfo,
      cullMask = 0x3f,
      meta = 0,
      wx = 0,
      wz = 0
    ) => {
      const isWater = def.fluid === 'water';
      const hasRandomRotation =
        def.shortId === 'sand' ||
        def.shortId === 'red_sand';

      const rotTop = hasRandomRotation
        ? Math.abs((wx * 3129871) ^ (wz * 618791) ^ (Math.floor(y0) * 17)) & 3
        : 0;
      const rotBottom = hasRandomRotation
        ? Math.abs((wx * 189721) ^ (wz * 872191) ^ (Math.floor(y0) * 31)) & 3
        : 0;
      const getTint = (face: 'top' | 'bottom' | 'side', shade: number): [number, number, number] => {
        if (face === 'side' && isSnowyGrass) {
          return [shade, shade, shade];
        }
        if (def.tint === 'grass' && (face === 'top' || face === 'side')) {
          return [biome.grassColor[0] * shade, biome.grassColor[1] * shade, biome.grassColor[2] * shade];
        }
        if (def.tint === 'foliage') {
          return [biome.foliageColor[0] * shade, biome.foliageColor[1] * shade, biome.foliageColor[2] * shade];
        }
        if (def.tint === 'birch') {
          return [0.5 * shade, 0.66 * shade, 0.33 * shade];
        }
        if (def.tint === 'spruce') {
          return [0.38 * shade, 0.6 * shade, 0.38 * shade];
        }
        if (def.tint === 'water') {
          return [biome.waterColor[0] * shade, biome.waterColor[1] * shade, biome.waterColor[2] * shade];
        }
        return [shade, shade, shade];
      };

      const fx0 = x0 - Math.floor(x0);
      const fx1 = x1 - Math.floor(x0);
      const fy0 = y0 - Math.floor(y0);
      const fy1 = y1 - Math.floor(y0);
      const fz0 = z0 - Math.floor(z0);
      const fz1 = z1 - Math.floor(z0);

      const isSubBox = fx0 > 0.001 || fx1 < 0.999 || fy0 > 0.001 || fy1 < 0.999 || fz0 > 0.001 || fz1 < 0.999;
      const uvSubSouth: [number, number, number, number] | undefined = isSubBox ? [fx0, fy0, fx1, fy1] : undefined;
      const uvSubNorth: [number, number, number, number] | undefined = isSubBox ? [1.0 - fx1, fy0, 1.0 - fx0, fy1] : undefined;
      const uvSubEast: [number, number, number, number] | undefined = isSubBox ? [1.0 - fz1, fy0, 1.0 - fz0, fy1] : undefined;
      const uvSubWest: [number, number, number, number] | undefined = isSubBox ? [fz0, fy0, fz1, fy1] : undefined;
      const uvSubTop: [number, number, number, number] | undefined = isSubBox ? [fx0, 1.0 - fz1, fx1, 1.0 - fz0] : undefined;
      const uvSubBottom: [number, number, number, number] | undefined = isSubBox ? [fx0, fz0, fx1, fz1] : undefined;

      const isSnowyGrass =
        (def.shortId === 'grass_block' || def.shortId === 'grass_block_snow') &&
        (def.shortId === 'grass_block_snow' ||
          (() => {
            const aboveId = getBlockFast(x0, Math.floor(y0) + 1, z0);
            const aboveDef = Registries.getBlock(aboveId);
            return !!(aboveDef && (aboveDef.shortId === 'snow' || aboveDef.shortId === 'snow_block' || aboveDef.shortId === 'powder_snow'));
          })());

      // Top (+Y)
      if (cullMask & 1) {
        const topTex = isSnowyGrass ? 'snow' : def.textures.top;
        const [r, g, b] = isSnowyGrass ? [1.0, 1.0, 1.0] : getTint('top', 1.0);
        pushQuad(
          isWater,
          [x0, y1, z1],
          [x1, y1, z1],
          [x1, y1, z0],
          [x0, y1, z0],
          0,
          1,
          0,
          topTex,
          r,
          g,
          b,
          uvSubTop,
          rotTop
        );
      }
      // Bottom (-Y)
      if (cullMask & 2) {
        const [r, g, b] = getTint('bottom', 0.55);
        pushQuad(
          isWater,
          [x0, y0, z0],
          [x1, y0, z0],
          [x1, y0, z1],
          [x0, y0, z1],
          0,
          -1,
          0,
          def.textures.bottom,
          r,
          g,
          b,
          uvSubBottom,
          rotBottom
        );
      }
      let texNorth = def.textures.north;
      let texSouth = def.textures.south;
      let texEast = def.textures.east;
      let texWest = def.textures.west;

      if (isSnowyGrass) {
        texNorth = 'grass_block_snow';
        texSouth = 'grass_block_snow';
        texEast = 'grass_block_snow';
        texWest = 'grass_block_snow';
      }

      if (def.shortId === 'furnace' || def.shortId === 'barrel' || def.shortId === 'chest') {
        const facing = meta & 3;
        const front = def.textures.north;
        const side = def.textures.south || def.textures.east || def.textures.west;
        if (facing === 0) {
          texNorth = front;
          texSouth = side;
          texEast = side;
          texWest = side;
        } else if (facing === 1) {
          texEast = front;
          texWest = side;
          texNorth = side;
          texSouth = side;
        } else if (facing === 2) {
          texSouth = front;
          texNorth = side;
          texEast = side;
          texWest = side;
        } else if (facing === 3) {
          texWest = front;
          texEast = side;
          texNorth = side;
          texSouth = side;
        }
      }

      // South (+Z)
      if (cullMask & 4) {
        const [r, g, b] = getTint('side', 0.86);
        pushQuad(
          isWater,
          [x0, y0, z1],
          [x1, y0, z1],
          [x1, y1, z1],
          [x0, y1, z1],
          0,
          0,
          1,
          texSouth,
          r,
          g,
          b,
          uvSubSouth
        );
      }
      // North (-Z)
      if (cullMask & 8) {
        const [r, g, b] = getTint('side', 0.86);
        pushQuad(
          isWater,
          [x1, y0, z0],
          [x0, y0, z0],
          [x0, y1, z0],
          [x1, y1, z0],
          0,
          0,
          -1,
          texNorth,
          r,
          g,
          b,
          uvSubNorth
        );
      }
      // East (+X)
      if (cullMask & 16) {
        const [r, g, b] = getTint('side', 0.72);
        pushQuad(
          isWater,
          [x1, y0, z1],
          [x1, y0, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          1,
          0,
          0,
          texEast,
          r,
          g,
          b,
          uvSubEast
        );
      }
      // West (-X)
      if (cullMask & 32) {
        const [r, g, b] = getTint('side', 0.72);
        pushQuad(
          isWater,
          [x0, y0, z0],
          [x0, y0, z1],
          [x0, y1, z1],
          [x0, y1, z0],
          -1,
          0,
          0,
          texWest,
          r,
          g,
          b,
          uvSubWest
        );
      }
    };

    const baseX = this.cx * CHUNK_SIZE;
    const baseZ = this.cz * CHUNK_SIZE;
    const blocks = this.blocks;

    // High performance local/neighbor block reader:
    // Direct typed array memory access (0ms) for interior blocks (95%+ of queries),
    // only delegating to getWorldBlock on chunk borders.
    const getBlockFast = (x: number, y: number, z: number): number => {
      if (y < CHUNK_MIN_Y || y >= CHUNK_MAX_Y) return 0;
      if (x >= 0 && x < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE) {
        return blocks[((y - CHUNK_MIN_Y) * CHUNK_SIZE + z) * CHUNK_SIZE + x];
      }
      return getWorldBlock(baseX + x, y, baseZ + z);
    };

    const shouldRenderNeighborFace = (selfDef: BlockDefinition, neighborNum: number): boolean => {
      if (neighborNum === 0) return true;
      const nDef = Registries.getBlock(neighborNum);
      if (selfDef.fluid === 'water') {
        if (nDef.fluid === 'water') return false;
        if (nDef.shortId === 'ice') return false;
        if (nDef.solid && !nDef.transparent) return false;
      }
      // Cull adjacent leaves interior faces to drastically boost framerate in canopies
      if (selfDef.shortId.includes('leaves') && nDef.shortId.includes('leaves')) {
        return false;
      }
      if (nDef.transparent || nDef.shape !== 'cube') {
        // Cull identical leaves, glass, or ice interiors to keep framerate high while showing outer faces
        if (nDef.numId === selfDef.numId && (selfDef.shortId === 'glass' || selfDef.fluid || selfDef.shortId === 'ice')) {
          return false;
        }
        return true;
      }
      return false;
    };

    // Find maximum and minimum block height in chunk to skip looping over empty sky and void
    let maxY = CHUNK_MAX_Y - 1;
    while (maxY > CHUNK_MIN_Y) {
      let hasBlock = false;
      const yOffset = (maxY - CHUNK_MIN_Y) * CHUNK_SIZE * CHUNK_SIZE;
      for (let i = 0; i < CHUNK_SIZE * CHUNK_SIZE; i++) {
        if (blocks[yOffset + i] !== 0) {
          hasBlock = true;
          break;
        }
      }
      if (hasBlock) break;
      maxY--;
    }

    let minY = CHUNK_MIN_Y;
    while (minY < maxY) {
      let hasBlock = false;
      const yOffset = (minY - CHUNK_MIN_Y) * CHUNK_SIZE * CHUNK_SIZE;
      for (let i = 0; i < CHUNK_SIZE * CHUNK_SIZE; i++) {
        if (blocks[yOffset + i] !== 0) {
          hasBlock = true;
          break;
        }
      }
      if (hasBlock) break;
      minY++;
    }

    for (let y = minY; y <= maxY; y++) {
      const localY = y - CHUNK_MIN_Y;
      for (let lz = 0; lz < CHUNK_SIZE; lz++) {
        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
          const bNum = blocks[(localY * CHUNK_SIZE + lz) * CHUNK_SIZE + lx];
          if (bNum === 0) continue;

          const def = Registries.getBlock(bNum);
          if (def.shape === 'air') continue;

          const wx = baseX + lx;
          const wz = baseZ + lz;
          const biome = this.getBiome(lx, lz);
          const meta = this.getMeta(lx, y, lz);

          if (def.shape === 'cube' || def.shape === 'pillar') {
            let mask = 0;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y + 1, lz))) mask |= 1;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y - 1, lz))) mask |= 2;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y, lz + 1))) mask |= 4;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y, lz - 1))) mask |= 8;
            if (shouldRenderNeighborFace(def, getBlockFast(lx + 1, y, lz))) mask |= 16;
            if (shouldRenderNeighborFace(def, getBlockFast(lx - 1, y, lz))) mask |= 32;
            if (mask !== 0) {
              pushBox(lx, y, lz, lx + 1, y + 1, lz + 1, def, biome, mask, meta, wx, wz);
            }
          } else if (def.shape === 'fluid') {
            let mask = 0;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y + 1, lz))) mask |= 1;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y - 1, lz))) mask |= 2;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y, lz + 1))) mask |= 4;
            if (shouldRenderNeighborFace(def, getBlockFast(lx, y, lz - 1))) mask |= 8;
            if (shouldRenderNeighborFace(def, getBlockFast(lx + 1, y, lz))) mask |= 16;
            if (shouldRenderNeighborFace(def, getBlockFast(lx - 1, y, lz))) mask |= 32;
            if (mask !== 0) {
              const topY = getBlockFast(lx, y + 1, lz) === bNum ? y + 1 : y + 0.88;
              pushBox(lx, y, lz, lx + 1, topY, lz + 1, def, biome, mask);
            }
          } else if (def.shape === 'slab_bottom') {
            const topHalf = (meta & 4) !== 0;
            const y0 = topHalf ? y + 0.5 : y;
            const y1 = topHalf ? y + 1.0 : y + 0.5;
            let mask = 0x3f;
            if (!topHalf && !shouldRenderNeighborFace(def, getBlockFast(lx, y - 1, lz))) mask &= ~2;
            if (topHalf && !shouldRenderNeighborFace(def, getBlockFast(lx, y + 1, lz))) mask &= ~1;
            pushBox(lx, y0, lz, lx + 1, y1, lz + 1, def, biome, mask);
          } else if (def.shape === 'slab_top') {
            let mask = 0x3f;
            if (!shouldRenderNeighborFace(def, getBlockFast(lx, y + 1, lz))) mask &= ~1;
            pushBox(lx, y + 0.5, lz, lx + 1, y + 1.0, lz + 1, def, biome, mask);
          } else if (def.shape === 'trapdoor') {
            const isOpen = (meta & 8) !== 0;
            const isTop = (meta & 4) !== 0;
            const facing = meta & 3;
            if (!isOpen) {
              // Flat closed trapdoor (3/16 thick = 0.1875)
              const y0 = isTop ? y + 0.8125 : y;
              const y1 = isTop ? y + 1.0 : y + 0.1875;
              let mask = 0x3f;
              if (!isTop && !shouldRenderNeighborFace(def, getBlockFast(lx, y - 1, lz))) mask &= ~2;
              if (isTop && !shouldRenderNeighborFace(def, getBlockFast(lx, y + 1, lz))) mask &= ~1;
              pushBox(lx, y0, lz, lx + 1, y1, lz + 1, def, biome, mask);
            } else {
              // Upright open trapdoor against attached wall (3/16 thick)
              if (facing === 0) {
                pushBox(lx, y, lz, lx + 1, y + 1, lz + 0.1875, def, biome, 0x3f);
              } else if (facing === 1) {
                pushBox(lx + 0.8125, y, lz, lx + 1, y + 1, lz + 1, def, biome, 0x3f);
              } else if (facing === 2) {
                pushBox(lx, y, lz + 0.8125, lx + 1, y + 1, lz + 1, def, biome, 0x3f);
              } else {
                pushBox(lx, y, lz, lx + 0.1875, y + 1, lz + 1, def, biome, 0x3f);
              }
            }
          } else if (def.shape === 'stairs') {
            const isUpsideDown = (meta & 4) !== 0;
            const facing = meta & 3; // 0=North, 1=East, 2=South, 3=West
            const yBase0 = isUpsideDown ? y + 0.5 : y;
            const yBase1 = isUpsideDown ? y + 1.0 : y + 0.5;
            const yStep0 = isUpsideDown ? y : y + 0.5;
            const yStep1 = isUpsideDown ? y + 0.5 : y + 1.0;

            let baseMask = 0x3f;
            if (!isUpsideDown && !shouldRenderNeighborFace(def, getBlockFast(lx, y - 1, lz))) baseMask &= ~2;
            if (isUpsideDown && !shouldRenderNeighborFace(def, getBlockFast(lx, y + 1, lz))) baseMask &= ~1;

            let stepMask = 0x3f;
            if (!isUpsideDown) stepMask &= ~2; else stepMask &= ~1;

            if (facing === 0) {
              let underMask = baseMask;
              if (!isUpsideDown) underMask &= ~1; else underMask &= ~2;
              pushBox(lx, yBase0, lz, lx + 1, yBase1, lz + 0.5, def, biome, underMask & ~4);
              pushBox(lx, yBase0, lz + 0.5, lx + 1, yBase1, lz + 1, def, biome, baseMask & ~8);
              pushBox(lx, yStep0, lz, lx + 1, yStep1, lz + 0.5, def, biome, stepMask);
            } else if (facing === 1) {
              let underMask = baseMask;
              if (!isUpsideDown) underMask &= ~1; else underMask &= ~2;
              pushBox(lx + 0.5, yBase0, lz, lx + 1, yBase1, lz + 1, def, biome, underMask & ~32);
              pushBox(lx, yBase0, lz, lx + 0.5, yBase1, lz + 1, def, biome, baseMask & ~16);
              pushBox(lx + 0.5, yStep0, lz, lx + 1, yStep1, lz + 1, def, biome, stepMask);
            } else if (facing === 2) {
              let underMask = baseMask;
              if (!isUpsideDown) underMask &= ~1; else underMask &= ~2;
              pushBox(lx, yBase0, lz + 0.5, lx + 1, yBase1, lz + 1, def, biome, underMask & ~8);
              pushBox(lx, yBase0, lz, lx + 1, yBase1, lz + 0.5, def, biome, baseMask & ~4);
              pushBox(lx, yStep0, lz + 0.5, lx + 1, yStep1, lz + 1, def, biome, stepMask);
            } else {
              let underMask = baseMask;
              if (!isUpsideDown) underMask &= ~1; else underMask &= ~2;
              pushBox(lx, yBase0, lz, lx + 0.5, yBase1, lz + 1, def, biome, underMask & ~16);
              pushBox(lx + 0.5, yBase0, lz, lx + 1, yBase1, lz + 1, def, biome, baseMask & ~32);
              pushBox(lx, yStep0, lz, lx + 0.5, yStep1, lz + 1, def, biome, stepMask);
            }
          } else if (def.shape === 'bars') {
            const canConnectBars = (nb: number) => {
              if (nb === 0) return false;
              const nd = Registries.getBlock(nb);
              return nd.shape === 'bars' || nd.shape === 'cube' || nd.shape === 'pillar' || nd.shape === 'fence';
            };
            const cN = canConnectBars(getBlockFast(lx, y, lz - 1));
            const cS = canConnectBars(getBlockFast(lx, y, lz + 1));
            const cW = canConnectBars(getBlockFast(lx - 1, y, lz));
            const cE = canConnectBars(getBlockFast(lx + 1, y, lz));

            const tex = def.textures.north;
            const [r, g, b] = [0.95, 0.95, 0.95];

            if (!cN && !cS && !cW && !cE) {
              const x0 = lx + 0.5;
              const z0 = lz + 0.5;
              pushQuad(false, [x0, y, lz], [x0, y, lz + 1], [x0, y + 1, lz + 1], [x0, y + 1, lz], 1, 0, 0, tex, r, g, b);
              pushQuad(false, [x0, y, lz + 1], [x0, y, lz], [x0, y + 1, lz], [x0, y + 1, lz + 1], -1, 0, 0, tex, r, g, b);
              pushQuad(false, [lx, y, z0], [lx + 1, y, z0], [lx + 1, y + 1, z0], [lx, y + 1, z0], 0, 0, 1, tex, r, g, b);
              pushQuad(false, [lx + 1, y, z0], [lx, y, z0], [lx, y + 1, z0], [lx + 1, y + 1, z0], 0, 0, -1, tex, r, g, b);
            } else {
              pushBox(lx + 0.4375, y, lz + 0.4375, lx + 0.5625, y + 1, lz + 0.5625, def, biome, 0x3f);
              if (cN) pushBox(lx + 0.4375, y, lz, lx + 0.5625, y + 1, lz + 0.4375, def, biome, 0x3f);
              if (cS) pushBox(lx + 0.4375, y, lz + 0.5625, lx + 0.5625, y + 1, lz + 1, def, biome, 0x3f);
              if (cW) pushBox(lx, y, lz + 0.4375, lx + 0.4375, y + 1, lz + 0.5625, def, biome, 0x3f);
              if (cE) pushBox(lx + 0.5625, y, lz + 0.4375, lx + 1, y + 1, lz + 0.5625, def, biome, 0x3f);
            }
          } else if (def.shape === 'portal') {
            // Translucent purple nether portal plane
            const axisX = (meta & 1) === 0;
            if (axisX) {
              pushBox(lx, y, lz + 0.375, lx + 1, y + 1, lz + 0.625, def, biome, 0x3f);
            } else {
              pushBox(lx + 0.375, y, lz, lx + 0.625, y + 1, lz + 1, def, biome, 0x3f);
            }
          } else if (def.shape === 'door_bottom' || def.shape === 'door_top' || def.shape === 'door' || def.shortId.endsWith('_door')) {
            const isOpen = (meta & 8) !== 0;
            const isTop = (meta & 4) !== 0;
            const facing = meta & 3;
            // Use top half texture for upper door block, bottom texture for lower door block
            const doorTex = isTop ? def.textures.top : (def.textures.bottom || def.textures.north);
            const doorDef: BlockDefinition = {
              ...def,
              textures: {
                top: doorTex,
                bottom: doorTex,
                north: doorTex,
                south: doorTex,
                east: doorTex,
                west: doorTex,
              },
            };
            if (!isOpen) {
              if (facing === 0) pushBox(lx, y, lz, lx + 1, y + 1, lz + 0.1875, doorDef, biome, 0x3f);
              else if (facing === 1) pushBox(lx + 0.8125, y, lz, lx + 1, y + 1, lz + 1, doorDef, biome, 0x3f);
              else if (facing === 2) pushBox(lx, y, lz + 0.8125, lx + 1, y + 1, lz + 1, doorDef, biome, 0x3f);
              else pushBox(lx, y, lz, lx + 0.1875, y + 1, lz + 1, doorDef, biome, 0x3f);
            } else {
              if (facing === 0) pushBox(lx, y, lz, lx + 0.1875, y + 1, lz + 1, doorDef, biome, 0x3f);
              else if (facing === 1) pushBox(lx, y, lz, lx + 1, y + 1, lz + 0.1875, doorDef, biome, 0x3f);
              else if (facing === 2) pushBox(lx + 0.8125, y, lz, lx + 1, y + 1, lz + 1, doorDef, biome, 0x3f);
              else pushBox(lx, y, lz + 0.8125, lx + 1, y + 1, lz + 1, doorDef, biome, 0x3f);
            }
          } else if (def.shape === 'fence_gate' || def.shortId.endsWith('_fence_gate')) {
            const isOpen = (meta & 8) !== 0;
            const facing = meta & 1; // 0 = Z-axis, 1 = X-axis
            if (!isOpen) {
              if (facing === 0) {
                pushBox(lx, y + 0.25, lz + 0.375, lx + 1, y + 0.9375, lz + 0.625, def, biome, 0x3f);
              } else {
                pushBox(lx + 0.375, y + 0.25, lz, lx + 0.625, y + 0.9375, lz + 1, def, biome, 0x3f);
              }
            } else {
              if (facing === 0) {
                pushBox(lx, y + 0.25, lz + 0.05, lx + 0.1875, y + 0.9375, lz + 0.95, def, biome, 0x3f);
                pushBox(lx + 0.8125, y + 0.25, lz + 0.05, lx + 1, y + 0.9375, lz + 0.95, def, biome, 0x3f);
              } else {
                pushBox(lx + 0.05, y + 0.25, lz, lx + 0.95, y + 0.9375, lz + 0.1875, def, biome, 0x3f);
                pushBox(lx + 0.05, y + 0.25, lz + 0.8125, lx + 0.95, y + 0.9375, lz + 1, def, biome, 0x3f);
              }
            }
          } else if (def.shape === 'bed_foot' || def.shape === 'bed_head') {
            // 26.3 Straw Bed 9/16 (0.5625) height wilderness bed
            pushBox(lx + 0.001, y, lz + 0.001, lx + 0.999, y + 0.5625, lz + 0.999, def, biome, 0x3f);
          } else if (def.shape === 'path') {
            // 15/16 height path block - eliminates side-wall x-ray culling bugs
            pushBox(lx, y, lz, lx + 1, y + 0.9375, lz + 1, def, biome, 0x3f);
          } else if (def.shape === 'carpet') {
            if (def.shortId === 'leaf_litter') {
              // template_leaf_litter_1.json: flat 0.25/16 ground quad with dry autumn foliage tint (0xA37542)
              pushQuad(
                false,
                [lx, y + 0.016, lz + 1],
                [lx + 1, y + 0.016, lz + 1],
                [lx + 1, y + 0.016, lz],
                [lx, y + 0.016, lz],
                0,
                1,
                0,
                def.textures.top,
                0.64,
                0.46,
                0.26
              );
            } else if (def.shortId === 'lily_pad') {
              // Official Minecraft LilyPadBlock: flat horizontal quad hovering at y + 0.016 over water
              // With official Minecraft Lily Pad green foliage tint 0x208030 (RGB: 0.125, 0.502, 0.188)
              const lr = 0.125;
              const lg = 0.502;
              const lb = 0.188;
              const yOffset = y + 0.016;
              pushQuad(
                false,
                [lx, yOffset, lz + 1],
                [lx + 1, yOffset, lz + 1],
                [lx + 1, yOffset, lz],
                [lx, yOffset, lz],
                0,
                1,
                0,
                def.textures.top,
                lr,
                lg,
                lb
              );
              pushQuad(
                false,
                [lx, yOffset, lz],
                [lx + 1, yOffset, lz],
                [lx + 1, yOffset, lz + 1],
                [lx, yOffset, lz + 1],
                0,
                -1,
                0,
                def.textures.top,
                lr * 0.8,
                lg * 0.8,
                lb * 0.8
              );
            } else if (def.shortId === 'snow') {
              // Official Minecraft snow layer: 2/16 (0.125) height box
              pushBox(lx, y, lz, lx + 1, y + 0.125, lz + 1, def, biome, 0x3f, 0, wx, wz);
            } else {
              pushBox(lx, y, lz, lx + 1, y + 0.0625, lz + 1, def, biome, 0x3f, 0, wx, wz);
            }
          } else if (def.shape === 'fence') {
            // Center post + dynamic rails to adjacent solid/fence blocks
            pushBox(lx + 0.375, y, lz + 0.375, lx + 0.625, y + 1, lz + 0.625, def, biome, 0x3f);
            const canConnect = (nb: number) => {
              if (nb === 0) return false;
              const nd = Registries.getBlock(nb);
              return nd.shape === 'fence' || nd.shape === 'cube' || nd.shape === 'pillar';
            };
            if (canConnect(getWorldBlock(wx, y, wz - 1))) {
              pushBox(lx + 0.4375, y + 0.375, lz, lx + 0.5625, y + 0.5625, lz + 0.375, def, biome, 0x3f);
              pushBox(lx + 0.4375, y + 0.75, lz, lx + 0.5625, y + 0.9375, lz + 0.375, def, biome, 0x3f);
            }
            if (canConnect(getWorldBlock(wx, y, wz + 1))) {
              pushBox(lx + 0.4375, y + 0.375, lz + 0.625, lx + 0.5625, y + 0.5625, lz + 1, def, biome, 0x3f);
              pushBox(lx + 0.4375, y + 0.75, lz + 0.625, lx + 0.5625, y + 0.9375, lz + 1, def, biome, 0x3f);
            }
            if (canConnect(getWorldBlock(wx - 1, y, wz))) {
              pushBox(lx, y + 0.375, lz + 0.4375, lx + 0.375, y + 0.5625, lz + 0.5625, def, biome, 0x3f);
              pushBox(lx, y + 0.75, lz + 0.4375, lx + 0.375, y + 0.9375, lz + 0.5625, def, biome, 0x3f);
            }
            if (canConnect(getWorldBlock(wx + 1, y, wz))) {
              pushBox(lx + 0.625, y + 0.375, lz + 0.4375, lx + 1, y + 0.5625, lz + 0.5625, def, biome, 0x3f);
              pushBox(lx + 0.625, y + 0.75, lz + 0.4375, lx + 1, y + 0.9375, lz + 0.5625, def, biome, 0x3f);
            }
          } else if (def.shape === 'campfire') {
            // Official Minecraft template_campfire.json model: 4 logs + ash bed + intersecting fire quads
            // Log 1: bottom log Z (1/16..5/16, 0..4/16, 0..1)
            pushBox(lx + 0.0625, y, lz, lx + 0.3125, y + 0.25, lz + 1.0, def, biome, 0x3f);
            // Log 2: bottom log Z (11/16..15/16, 0..4/16, 0..1)
            pushBox(lx + 0.6875, y, lz, lx + 0.9375, y + 0.25, lz + 1.0, def, biome, 0x3f);
            // Log 3: top cross log X (0..1, 3/16..7/16, 1/16..5/16)
            pushBox(lx, y + 0.1875, lz + 0.0625, lx + 1.0, y + 0.4375, lz + 0.3125, def, biome, 0x3f);
            // Log 4: top cross log X (0..1, 3/16..7/16, 11/16..15/16)
            pushBox(lx, y + 0.1875, lz + 0.6875, lx + 1.0, y + 0.4375, lz + 0.9375, def, biome, 0x3f);
            // Ash coal bed (5/16..11/16, 0..1/16, 0..1)
            pushBox(lx + 0.3125, y, lz, lx + 0.6875, y + 0.0625, lz + 1.0, def, biome, 0x3f);
            // 2 Intersecting 45-degree campfire fire quads (double-sided)
            const fx0 = lx + 0.08;
            const fx1 = lx + 0.92;
            const fz0 = lz + 0.08;
            const fz1 = lz + 0.92;
            const fy0 = y + 0.08;
            const fy1 = y + 0.95;
            pushQuad(false, [fx0, fy0, fz0], [fx1, fy0, fz1], [fx1, fy1, fz1], [fx0, fy1, fz0], 0, 1, 0, 'campfire_fire', 1, 1, 1);
            pushQuad(false, [fx1, fy0, fz1], [fx0, fy0, fz0], [fx0, fy1, fz0], [fx1, fy1, fz1], 0, 1, 0, 'campfire_fire', 1, 1, 1);
            pushQuad(false, [fx0, fy0, fz1], [fx1, fy0, fz0], [fx1, fy1, fz0], [fx0, fy1, fz1], 0, 1, 0, 'campfire_fire', 1, 1, 1);
            pushQuad(false, [fx1, fy0, fz0], [fx0, fy0, fz1], [fx0, fy1, fz1], [fx1, fy1, fz0], 0, 1, 0, 'campfire_fire', 1, 1, 1);
          } else if (def.shape === 'torch') {
            pushBox(lx + 0.4375, y, lz + 0.4375, lx + 0.5625, y + 0.625, lz + 0.5625, def, biome, 0x3f);
          } else if (def.shape === 'cross') {
            // Intersecting diagonal quads (front & back faces)
            const [r, g, b] =
              def.tint === 'grass' ? biome.grassColor : [0.95, 0.95, 0.95];
            const x0 = lx + 0.15;
            const x1 = lx + 0.85;
            const z0 = lz + 0.15;
            const z1 = lz + 0.85;
            pushQuad(false, [x0, y, z0], [x1, y, z1], [x1, y + 0.9, z1], [x0, y + 0.9, z0], 0, 1, 0, def.textures.north, r, g, b);
            pushQuad(false, [x1, y, z1], [x0, y, z0], [x0, y + 0.9, z0], [x1, y + 0.9, z1], 0, 1, 0, def.textures.north, r, g, b);
            pushQuad(false, [x0, y, z1], [x1, y, z0], [x1, y + 0.9, z0], [x0, y + 0.9, z1], 0, 1, 0, def.textures.north, r, g, b);
            pushQuad(false, [x1, y, z0], [x0, y, z1], [x0, y + 0.9, z1], [x1, y + 0.9, z0], 0, 1, 0, def.textures.north, r, g, b);
          }
        }
      }
    }

    if (this.solidMesh) {
      this.solidMesh.geometry.dispose();
    }
    if (vertCount > 0) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geo.setIndex(indices);
      geo.computeBoundingSphere();
      if (!this.solidMesh) {
        this.solidMesh = new THREE.Mesh(geo, solidMaterial);
        this.solidMesh.position.set(baseX, 0, baseZ);
      } else {
        this.solidMesh.geometry = geo;
      }
    } else if (this.solidMesh) {
      this.solidMesh.geometry = new THREE.BufferGeometry();
    }

    if (this.waterMesh) {
      this.waterMesh.geometry.dispose();
    }
    if (wVertCount > 0) {
      const wGeo = new THREE.BufferGeometry();
      wGeo.setAttribute('position', new THREE.Float32BufferAttribute(wPositions, 3));
      wGeo.setAttribute('normal', new THREE.Float32BufferAttribute(wNormals, 3));
      wGeo.setAttribute('uv', new THREE.Float32BufferAttribute(wUvs, 2));
      wGeo.setAttribute('color', new THREE.Float32BufferAttribute(wColors, 3));
      wGeo.setIndex(wIndices);
      wGeo.computeBoundingSphere();
      if (!this.waterMesh) {
        this.waterMesh = new THREE.Mesh(wGeo, waterMaterial);
        this.waterMesh.position.set(baseX, 0, baseZ);
        this.waterMesh.renderOrder = 1;
      } else {
        this.waterMesh.geometry = wGeo;
      }
    } else if (this.waterMesh) {
      this.waterMesh.geometry = new THREE.BufferGeometry();
    }
  }
}
