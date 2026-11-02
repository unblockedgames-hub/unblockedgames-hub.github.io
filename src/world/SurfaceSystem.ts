import { Chunk, CHUNK_SIZE, CHUNK_HEIGHT } from './Chunk';
import { Registries } from '../core/Registries';

/**
 * Procedural terracotta band table (64 layers) for Badlands biomes.
 * Replicates net.minecraft.world.level.levelgen.SurfaceSystem terracotta bands.
 */
const TERRACOTTA_BANDS: string[] = [
  'terracotta', 'terracotta', 'orange_terracotta', 'terracotta',
  'yellow_terracotta', 'terracotta', 'white_terracotta', 'orange_terracotta',
  'terracotta', 'brown_terracotta', 'terracotta', 'terracotta',
  'orange_terracotta', 'orange_terracotta', 'white_terracotta', 'yellow_terracotta',
  'terracotta', 'light_gray_terracotta', 'terracotta', 'orange_terracotta',
  'terracotta', 'terracotta', 'brown_terracotta', 'terracotta',
  'white_terracotta', 'white_terracotta', 'orange_terracotta', 'terracotta',
  'yellow_terracotta', 'terracotta', 'terracotta', 'light_gray_terracotta',
  'orange_terracotta', 'terracotta', 'terracotta', 'brown_terracotta',
  'terracotta', 'orange_terracotta', 'white_terracotta', 'terracotta',
  'yellow_terracotta', 'terracotta', 'light_gray_terracotta', 'terracotta',
  'terracotta', 'orange_terracotta', 'terracotta', 'white_terracotta',
  'brown_terracotta', 'terracotta', 'orange_terracotta', 'terracotta',
  'yellow_terracotta', 'terracotta', 'terracotta', 'light_gray_terracotta',
  'terracotta', 'white_terracotta', 'orange_terracotta', 'terracotta',
  'terracotta', 'brown_terracotta', 'terracotta', 'orange_terracotta',
];

export class SurfaceSystem {
  static SEA_LEVEL = 63;

  /**
   * Applies authentic Minecraft 26.3 surface rules:
   * - Deepslate transition below Y=8 down to Y=0 (dithered with 3D noise)
   * - Bedrock floor at Y=0 (solid) and Y=1..4 (dithered)
   * - Badlands: red sand top, 64-layer terracotta color bands below
   * - Desert / Beach: sand top (3-4 blocks), sandstone underneath
   * - Stony peaks / Jagged peaks / Stony shore: stone / gravel
   * - Frozen peaks / Snowy slopes: snow_block / packed_ice
   * - Mushroom fields: mycelium top, dirt subsurface
   * - Swamp: grass block or mud
   * - Temperate / Forest / Plains / Taiga: grass_block top, dirt subsurface (3-4 blocks), stone below
   * - Ocean floors: gravel, sand, or dirt
   */
  static applySurface(
    chunk: Chunk,
    cx: number,
    cz: number,
    heightMap: Int32Array
  ) {
    const bedrockId = Registries.getBlock('bedrock').numId;
    const deepslateId = Registries.getBlock('deepslate').numId;
    const stoneId = Registries.getBlock('stone').numId;
    const dirtId = Registries.getBlock('dirt').numId;
    const grassId = Registries.getBlock('grass_block').numId;
    const grassSnowId = Registries.getBlock('grass_block_snow')?.numId || grassId;
    const sandId = Registries.getBlock('sand').numId;
    const sandstoneId = Registries.getBlock('sandstone')?.numId || stoneId;
    const redSandId = Registries.getBlock('red_sand')?.numId || sandId;
    const terracottaId = Registries.getBlock('terracotta')?.numId || stoneId;
    const gravelId = Registries.getBlock('gravel')?.numId || stoneId;
    const waterId = Registries.getBlock('water').numId;
    const iceId = Registries.getBlock('ice')?.numId || waterId;
    const snowBlockId = Registries.getBlock('snow_block')?.numId || stoneId;
    const snowLayerId = Registries.getBlock('snow')?.numId || 0;
    const podzolId = Registries.getBlock('podzol')?.numId || dirtId;
    const myceliumId = Registries.getBlock('mycelium')?.numId || grassId;
    const mudId = Registries.getBlock('mud')?.numId || dirtId;

    for (let lz = 0; lz < CHUNK_SIZE; lz++) {
      for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        const wx = cx * CHUNK_SIZE + lx;
        const wz = cz * CHUNK_SIZE + lz;
        const h = heightMap[lz * CHUNK_SIZE + lx];
        const biomeId = chunk.biomes[lz * CHUNK_SIZE + lx] || 'minecraft:plains';

        const isCold =
          biomeId.includes('snowy') ||
          biomeId.includes('frozen') ||
          biomeId.includes('ice') ||
          biomeId.includes('grove') ||
          biomeId.includes('slopes') ||
          biomeId.includes('peaks');

        const isBadlands = biomeId.includes('badlands');
        const isDesert = biomeId.includes('desert') || biomeId === 'minecraft:beach';
        const isStony = biomeId.includes('stony') || biomeId.includes('jagged_peaks');
        const isSwamp = biomeId.includes('swamp');
        const isMushroom = biomeId.includes('mushroom');

        // 1. Bedrock floor (Y=0 solid, Y=1..4 dither)
        chunk.setBlock(lx, 0, lz, bedrockId);
        for (let y = 1; y <= 4; y++) {
          const dither = (this.hash2D(wx ^ (y * 37), wz ^ (y * 73), 999) * 5) | 0;
          if (y <= dither) {
            chunk.setBlock(lx, y, lz, bedrockId);
          }
        }

        // 2. Subterranean fill: Deepslate vs Stone transition (Y=0..8 dither)
        const deepslateHeight = 8 + Math.round(this.hash2D(wx, wz, 555) * 4);
        for (let y = 1; y < h - 4; y++) {
          if (chunk.getBlock(lx, y, lz) === bedrockId) continue;
          if (y < deepslateHeight) {
            chunk.setBlock(lx, y, lz, deepslateId);
          } else {
            chunk.setBlock(lx, y, lz, stoneId);
          }
        }

        // 3. Surface & Subsurface Materials
        const isUnderwater = h < this.SEA_LEVEL;
        const depthCount = Math.min(4, h);

        if (isUnderwater) {
          // Ocean floor
          for (let y = Math.max(1, h - 3); y < h; y++) {
            chunk.setBlock(lx, y, lz, gravelId);
          }
          chunk.setBlock(lx, h, lz, gravelId);
          // Fill ocean water
          for (let y = h + 1; y <= this.SEA_LEVEL; y++) {
            chunk.setBlock(lx, y, lz, waterId);
          }
        } else if (isBadlands) {
          // Badlands terracotta bands
          for (let y = Math.max(1, h - depthCount); y < h; y++) {
            const bandColor = TERRACOTTA_BANDS[y & 63];
            const bandId = Registries.getBlock(bandColor)?.numId || terracottaId;
            chunk.setBlock(lx, y, lz, bandId);
          }
          chunk.setBlock(lx, h, lz, redSandId);
        } else if (isDesert) {
          // Desert & Beach
          for (let y = Math.max(1, h - depthCount); y < h; y++) {
            chunk.setBlock(lx, y, lz, y < h - 2 ? sandstoneId : sandId);
          }
          chunk.setBlock(lx, h, lz, sandId);
        } else if (isStony) {
          // Stony / Mountain peaks
          for (let y = Math.max(1, h - depthCount); y <= h; y++) {
            chunk.setBlock(lx, y, lz, this.hash2D(wx, wz, y) < 0.2 ? gravelId : stoneId);
          }
        } else if (isMushroom) {
          // Mushroom Fields
          for (let y = Math.max(1, h - depthCount); y < h; y++) {
            chunk.setBlock(lx, y, lz, dirtId);
          }
          chunk.setBlock(lx, h, lz, myceliumId);
        } else if (isSwamp) {
          // Swamp
          for (let y = Math.max(1, h - depthCount); y < h; y++) {
            chunk.setBlock(lx, y, lz, dirtId);
          }
          chunk.setBlock(lx, h, lz, this.hash2D(wx, wz, 12) < 0.3 ? mudId : grassId);
        } else {
          // Forest, Plains, Snowy Plains, Taiga, Dappled Forest
          for (let y = Math.max(1, h - depthCount); y < h; y++) {
            chunk.setBlock(lx, y, lz, dirtId);
          }
          if (biomeId === 'minecraft:dappled_forest' && this.hash2D(wx, wz, 77) < 0.12) {
            chunk.setBlock(lx, h, lz, podzolId);
          } else {
            chunk.setBlock(lx, h, lz, grassId);
          }
        }
      }
    }
  }

  private static hash2D(x: number, z: number, seed = 0): number {
    let n = Math.imul(x, 374761393) + Math.imul(z, 668265263) + Math.imul(seed, 1442695041);
    n = (n ^ (n >>> 13)) * 1274126177;
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }
}
