import * as THREE from 'three';
import { Registries, BlockDefinition } from '../core/Registries';
import { TextureAtlas } from '../render/TextureAtlas';

export const CHUNK_SIZE = 16;
export const CHUNK_HEIGHT = 128;

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
    return (y * CHUNK_SIZE + lz) * CHUNK_SIZE + lx;
  }

  getBlock(lx: number, y: number, lz: number): number {
    if (lx < 0 || lx >= CHUNK_SIZE || y < 0 || y >= CHUNK_HEIGHT || lz < 0 || lz >= CHUNK_SIZE) {
      return 0;
    }
    return this.blocks[this.idx(lx, y, lz)];
  }

  setBlock(lx: number, y: number, lz: number, blockNumId: number, metaVal = 0) {
    if (lx < 0 || lx >= CHUNK_SIZE || y < 0 || y >= CHUNK_HEIGHT || lz < 0 || lz >= CHUNK_SIZE) {
      return;
    }
    const i = this.idx(lx, y, lz);
    this.blocks[i] = blockNumId;
    this.meta[i] = metaVal;
    this.dirty = true;
  }

  getMeta(lx: number, y: number, lz: number): number {
    if (lx < 0 || lx >= CHUNK_SIZE || y < 0 || y >= CHUNK_HEIGHT || lz < 0 || lz >= CHUNK_SIZE) {
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
        if (def.tint === 'grass' && face === 'top') {
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

      const dy = y1 - y0;
      const uvSubSide: [number, number, number, number] | undefined =
        dy < 1.0 ? [0, 0, 1, dy] : undefined;

      // Top (+Y)
      if (cullMask & 1) {
        const [r, g, b] = getTint('top', 1.0);
        pushQuad(
          isWater,
          [x0, y1, z1],
          [x1, y1, z1],
          [x1, y1, z0],
          [x0, y1, z0],
          0,
          1,
          0,
          def.textures.top,
          r,
          g,
          b,
          undefined,
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
          undefined,
          rotBottom
        );
      }
      let texNorth = def.textures.north;
      let texSouth = def.textures.south;
      let texEast = def.textures.east;
      let texWest = def.textures.west;

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
          uvSubSide
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
          uvSubSide
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
          uvSubSide
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
          uvSubSide
        );
      }
    };

    const baseX = this.cx * CHUNK_SIZE;
    const baseZ = this.cz * CHUNK_SIZE;

    const shouldRenderNeighborFace = (selfDef: BlockDefinition, neighborNum: number): boolean => {
      if (neighborNum === 0) return true;
      const nDef = Registries.getBlock(neighborNum);
      if (selfDef.fluid === 'water') {
        if (nDef.fluid === 'water') return false;
        if (nDef.solid && !nDef.transparent) return false;
      }
      // Cull adjacent leaves interior faces to drastically boost framerate in canopies
      if (selfDef.shortId.includes('leaves') && nDef.shortId.includes('leaves')) {
        return false;
      }
      if (nDef.transparent || nDef.shape !== 'cube') {
        // Cull identical leaves or glass interiors to keep framerate high while showing outer faces
        if (nDef.numId === selfDef.numId && (selfDef.shortId === 'glass' || selfDef.fluid)) {
          return false;
        }
        return true;
      }
      return false;
    };

    for (let y = 0; y < CHUNK_HEIGHT; y++) {
      for (let lz = 0; lz < CHUNK_SIZE; lz++) {
        for (let lx = 0; lx < CHUNK_SIZE; lx++) {
          const bNum = this.getBlock(lx, y, lz);
          if (bNum === 0) continue;

          const def = Registries.getBlock(bNum);
          if (def.shape === 'air') continue;

          const wx = baseX + lx;
          const wz = baseZ + lz;
          const biome = this.getBiome(lx, lz);
          const meta = this.getMeta(lx, y, lz);

          if (def.shape === 'cube' || def.shape === 'pillar') {
            let mask = 0;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y + 1, wz))) mask |= 1;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y - 1, wz))) mask |= 2;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y, wz + 1))) mask |= 4;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y, wz - 1))) mask |= 8;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx + 1, y, wz))) mask |= 16;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx - 1, y, wz))) mask |= 32;
            if (mask !== 0) {
              pushBox(lx, y, lz, lx + 1, y + 1, lz + 1, def, biome, mask, meta, wx, wz);
            }
          } else if (def.shape === 'fluid') {
            let mask = 0;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y + 1, wz))) mask |= 1;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y - 1, wz))) mask |= 2;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y, wz + 1))) mask |= 4;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx, y, wz - 1))) mask |= 8;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx + 1, y, wz))) mask |= 16;
            if (shouldRenderNeighborFace(def, getWorldBlock(wx - 1, y, wz))) mask |= 32;
            if (mask !== 0) {
              const topY = getWorldBlock(wx, y + 1, wz) === bNum ? y + 1 : y + 0.88;
              pushBox(lx, y, lz, lx + 1, topY, lz + 1, def, biome, mask);
            }
          } else if (def.shape === 'slab_bottom') {
            const topHalf = (meta & 4) !== 0;
            const y0 = topHalf ? y + 0.5 : y;
            const y1 = topHalf ? y + 1.0 : y + 0.5;
            let mask = 0x3f;
            if (!topHalf && !shouldRenderNeighborFace(def, getWorldBlock(wx, y - 1, wz))) mask &= ~2;
            if (topHalf && !shouldRenderNeighborFace(def, getWorldBlock(wx, y + 1, wz))) mask &= ~1;
            pushBox(lx, y0, lz, lx + 1, y1, lz + 1, def, biome, mask);
          } else if (def.shape === 'slab_top') {
            let mask = 0x3f;
            if (!shouldRenderNeighborFace(def, getWorldBlock(wx, y + 1, wz))) mask &= ~1;
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
              if (!isTop && !shouldRenderNeighborFace(def, getWorldBlock(wx, y - 1, wz))) mask &= ~2;
              if (isTop && !shouldRenderNeighborFace(def, getWorldBlock(wx, y + 1, wz))) mask &= ~1;
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
            // Render bottom half + upper step based on facing & upside-down (meta: facing=0..3, upsideDown=meta&4)
            const isUpsideDown = (meta & 4) !== 0;
            const facing = meta & 3;
            const yBase0 = isUpsideDown ? y + 0.5 : y;
            const yBase1 = isUpsideDown ? y + 1.0 : y + 0.5;
            const yStep0 = isUpsideDown ? y : y + 0.5;
            const yStep1 = isUpsideDown ? y + 0.5 : y + 1.0;

            let baseMask = 0x3f;
            if (!isUpsideDown && !shouldRenderNeighborFace(def, getWorldBlock(wx, y - 1, wz))) baseMask &= ~2;
            if (isUpsideDown && !shouldRenderNeighborFace(def, getWorldBlock(wx, y + 1, wz))) baseMask &= ~1;
            pushBox(lx, yBase0, lz, lx + 1, yBase1, lz + 1, def, biome, baseMask);

            if (facing === 0) {
              pushBox(lx, yStep0, lz, lx + 1, yStep1, lz + 0.5, def, biome, 0x3f);
            } else if (facing === 1) {
              pushBox(lx + 0.5, yStep0, lz, lx + 1, yStep1, lz + 1, def, biome, 0x3f);
            } else if (facing === 2) {
              pushBox(lx, yStep0, lz + 0.5, lx + 1, yStep1, lz + 1, def, biome, 0x3f);
            } else {
              pushBox(lx, yStep0, lz, lx + 0.5, yStep1, lz + 1, def, biome, 0x3f);
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
            } else {
              pushBox(lx, y, lz, lx + 1, y + 0.0625, lz + 1, def, biome, 0x3f);
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
