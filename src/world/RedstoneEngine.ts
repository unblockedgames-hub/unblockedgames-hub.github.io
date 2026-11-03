import { World } from './World';
import { Registries } from '../core/Registries';
import { AudioEngine } from '../core/AudioEngine';

export class RedstoneEngine {
  private static activeRepeaterDelays: Array<{
    x: number;
    y: number;
    z: number;
    targetPower: boolean;
    ticksRemaining: number;
  }> = [];

  /**
   * Evaluates redstone propagation starting at (x, y, z).
   */
  static updateAt(world: World, x: number, y: number, z: number, depth = 0) {
    if (depth > 64) return;

    const blockNum = world.getBlock(x, y, z);
    if (!blockNum) return;
    const def = Registries.getBlock(blockNum);
    if (!def) return;

    // 1. Redstone Torch Inversion
    if (def.shortId === 'redstone_torch') {
      const belowPower = this.getPowerLevel(world, x, y - 1, z);
      const isOff = (world.getMeta(x, y, z) & 1) !== 0;
      if (belowPower > 0 && !isOff) {
        world.setMeta(x, y, z, 1); // Turn torch off
        this.notifyNeighbors(world, x, y, z, depth + 1);
      } else if (belowPower === 0 && isOff) {
        world.setMeta(x, y, z, 0); // Turn torch on
        this.notifyNeighbors(world, x, y, z, depth + 1);
      }
      return;
    }

    // 2. Redstone Dust Signal Propagation (15 -> 0)
    if (def.shortId === 'redstone' || def.shortId === 'redstone_wire') {
      let maxInput = 0;

      // Check power from adjacent power sources
      const neighbors = [
        [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0]
      ];
      for (const [dx, dy, dz] of neighbors) {
        const nx = x + dx, ny = y + dy, nz = z + dz;
        const nBlock = world.getBlock(nx, ny, nz);
        const nDef = Registries.getBlock(nBlock);
        if (!nDef) continue;

        if (nDef.shortId === 'redstone_block') maxInput = 15;
        else if (nDef.shortId === 'redstone_torch' && (world.getMeta(nx, ny, nz) & 1) === 0) maxInput = 15;
        else if (nDef.shortId === 'lever' && (world.getMeta(nx, ny, nz) & 8) !== 0) maxInput = 15;
        else if ((nDef.shortId.includes('button') || nDef.shortId.includes('pressure_plate')) && (world.getMeta(nx, ny, nz) & 8) !== 0) maxInput = 15;
        else if (nDef.shortId === 'repeater' && (world.getMeta(nx, ny, nz) & 8) !== 0) maxInput = 15;
        else if (nDef.shortId === 'redstone' || nDef.shortId === 'redstone_wire') {
          const wirePower = world.getMeta(nx, ny, nz);
          maxInput = Math.max(maxInput, wirePower - 1);
        }
      }

      const curPower = world.getMeta(x, y, z);
      if (curPower !== maxInput) {
        world.setMeta(x, y, z, maxInput);
        this.notifyNeighbors(world, x, y, z, depth + 1);
      }
      return;
    }

    // 3. Redstone Lamp Activation
    if (def.shortId === 'redstone_lamp' || def.shortId === 'redstone_lamp_on') {
      const power = this.getPowerLevel(world, x, y, z);
      const lampOnId = Registries.getBlock('redstone_lamp_on')?.numId;
      const lampOffId = Registries.getBlock('redstone_lamp')?.numId;
      if (power > 0 && def.shortId === 'redstone_lamp' && lampOnId) {
        world.setBlock(x, y, z, lampOnId);
      } else if (power === 0 && def.shortId === 'redstone_lamp_on' && lampOffId) {
        world.setBlock(x, y, z, lampOffId);
      }
      return;
    }

    // 4. TNT Ignition via Redstone
    if (def.shortId === 'tnt') {
      const power = this.getPowerLevel(world, x, y, z);
      if (power > 0) {
        this.igniteTNT(world, x, y, z);
      }
      return;
    }

    // 5. Doors & Trapdoors via Redstone
    if (def.shape === 'door_bottom' || def.shortId.endsWith('_door')) {
      const power = this.getPowerLevel(world, x, y, z);
      const curMeta = world.getMeta(x, y, z);
      const isOpen = (curMeta & 8) !== 0;
      if (power > 0 && !isOpen) {
        world.setMeta(x, y, z, curMeta | 8);
        const topBlock = world.getBlock(x, y + 1, z);
        if (topBlock === blockNum) world.setMeta(x, y + 1, z, world.getMeta(x, y + 1, z) | 8);
        AudioEngine.play('block.wooden_door.open', 0.85);
      } else if (power === 0 && isOpen) {
        world.setMeta(x, y, z, curMeta & ~8);
        const topBlock = world.getBlock(x, y + 1, z);
        if (topBlock === blockNum) world.setMeta(x, y + 1, z, world.getMeta(x, y + 1, z) & ~8);
        AudioEngine.play('block.wooden_door.close', 0.85);
      }
      return;
    }

    if (def.shape === 'trapdoor' || def.shortId.endsWith('_trapdoor')) {
      const power = this.getPowerLevel(world, x, y, z);
      const curMeta = world.getMeta(x, y, z);
      const isOpen = (curMeta & 8) !== 0;
      if (power > 0 && !isOpen) {
        world.setMeta(x, y, z, curMeta | 8);
        AudioEngine.play('block.wooden_trapdoor.open', 0.85);
      } else if (power === 0 && isOpen) {
        world.setMeta(x, y, z, curMeta & ~8);
        AudioEngine.play('block.wooden_trapdoor.close', 0.85);
      }
      return;
    }

    // 6. Pistons & Sticky Pistons
    if (def.shortId === 'piston' || def.shortId === 'sticky_piston') {
      const power = this.getPowerLevel(world, x, y, z);
      const meta = world.getMeta(x, y, z);
      const isExtended = (meta & 8) !== 0;
      const facing = meta & 7; // 0=Down, 1=Up, 2=North, 3=South, 4=West, 5=East

      const facingOffsets = [
        [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]
      ];
      const [pdx, pdy, pdz] = facingOffsets[facing] || [0, 1, 0];

      if (power > 0 && !isExtended) {
        // Piston Extension: Push up to 12 blocks
        if (this.tryPushBlocks(world, x + pdx, y + pdy, z + pdz, pdx, pdy, pdz, 12)) {
          world.setMeta(x, y, z, meta | 8);
          AudioEngine.play('block.piston.extend', 0.85);
        }
      } else if (power === 0 && isExtended) {
        // Piston Retraction
        world.setMeta(x, y, z, meta & ~7);
        AudioEngine.play('block.piston.contract', 0.85);

        // Sticky Piston pulls block back
        if (def.shortId === 'sticky_piston') {
          const targetX = x + pdx * 2;
          const targetY = y + pdy * 2;
          const targetZ = z + pdz * 2;
          const pulledBlock = world.getBlock(targetX, targetY, targetZ);
          if (pulledBlock && pulledBlock !== Registries.getBlock('bedrock')?.numId && pulledBlock !== Registries.getBlock('obsidian')?.numId) {
            const pullMeta = world.getMeta(targetX, targetY, targetZ);
            world.setBlock(targetX, targetY, targetZ, 0);
            world.setBlock(x + pdx, y + pdy, z + pdz, pulledBlock, pullMeta);
          }
        }
      }
      return;
    }

    // 7. Observer Block
    if (def.shortId === 'observer') {
      const meta = world.getMeta(x, y, z);
      // Emit 1-tick pulse at rear
      world.setMeta(x, y, z, meta | 8);
      AudioEngine.play('block.dispenser.click', 0.6);
      this.notifyNeighbors(world, x, y, z, depth + 1);
      setTimeout(() => {
        world.setMeta(x, y, z, meta & ~8);
        this.notifyNeighbors(world, x, y, z, depth + 1);
      }, 50);
      return;
    }

    // 8. Dispenser & Dropper Activation
    if (def.shortId === 'dispenser' || def.shortId === 'dropper') {
      const power = this.getPowerLevel(world, x, y, z);
      if (power > 0) {
        AudioEngine.play('block.dispenser.dispense', 0.85);
        if (def.shortId === 'dispenser') {
          // Dispense arrow or projectile
          const facingOffsets = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]];
          const facing = world.getMeta(x, y, z) & 7;
          const [pdx, pdy, pdz] = facingOffsets[facing] || [0, 0, 1];
          world.entityRenderer?.spawnArrow?.(x + 0.5 + pdx, y + 0.5 + pdy, z + 0.5 + pdz, pdx * 20, pdy * 20 + 2, pdz * 20, 6);
        }
      }
      return;
    }

    // 9. Daylight Detector
    if (def.shortId === 'daylight_detector' || def.shortId === 'daylight_detector_inverted') {
      const isNight = def.shortId === 'daylight_detector_inverted';
      const time = world.timeOfDay;
      let power = 0;
      if (time >= 0 && time <= 12000) {
        power = Math.round((1.0 - Math.abs(time - 6000) / 6000) * 15);
      }
      if (isNight) power = 15 - power;
      world.setMeta(x, y, z, power);
      this.notifyNeighbors(world, x, y, z, depth + 1);
      return;
    }

    // 10. Note Block
    if (def.shortId === 'note_block') {
      const power = this.getPowerLevel(world, x, y, z);
      if (power > 0) {
        const belowBlock = world.getBlock(x, y - 1, z);
        const belowDef = Registries.getBlock(belowBlock);
        let instrument = 'block.note_block.harp';
        if (belowDef.soundGroup === 'wood') instrument = 'block.note_block.bass';
        else if (belowDef.soundGroup === 'sand') instrument = 'block.note_block.snare';
        else if (belowDef.soundGroup === 'glass') instrument = 'block.note_block.hat';
        else if (belowDef.soundGroup === 'stone') instrument = 'block.note_block.basedrum';
        AudioEngine.play(instrument, 0.85);
      }
      return;
    }
  }

  static getPowerLevel(world: World, x: number, y: number, z: number): number {
    let max = 0;
    const offsets = [
      [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0]
    ];
    for (const [dx, dy, dz] of offsets) {
      const nx = x + dx, ny = y + dy, nz = z + dz;
      const b = world.getBlock(nx, ny, nz);
      const def = Registries.getBlock(b);
      if (!def) continue;

      if (def.shortId === 'redstone_block') return 15;
      if (def.shortId === 'observer' && (world.getMeta(nx, ny, nz) & 8) !== 0) return 15;
      if (def.shortId.includes('daylight_detector')) return world.getMeta(nx, ny, nz);
      if (def.shortId === 'redstone_torch' && (world.getMeta(nx, ny, nz) & 1) === 0) return 15;
      if (def.shortId === 'lever' && (world.getMeta(nx, ny, nz) & 8) !== 0) return 15;
      if ((def.shortId.includes('button') || def.shortId.includes('pressure_plate')) && (world.getMeta(nx, ny, nz) & 8) !== 0) return 15;
      if (def.shortId === 'repeater' && (world.getMeta(nx, ny, nz) & 8) !== 0) return 15;
      if (def.shortId === 'redstone' || def.shortId === 'redstone_wire') {
        max = Math.max(max, world.getMeta(nx, ny, nz));
      }
    }
    return max;
  }

  private static notifyNeighbors(world: World, x: number, y: number, z: number, depth: number) {
    const offsets = [
      [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0]
    ];
    for (const [dx, dy, dz] of offsets) {
      this.updateAt(world, x + dx, y + dy, z + dz, depth);
    }
  }

  private static tryPushBlocks(
    world: World,
    startX: number,
    startY: number,
    startZ: number,
    dx: number,
    dy: number,
    dz: number,
    maxBlocks = 12
  ): boolean {
    const blocksToMove: Array<{ x: number; y: number; z: number; id: number; meta: number }> = [];
    let curX = startX;
    let curY = startY;
    let curZ = startZ;

    for (let i = 0; i < maxBlocks; i++) {
      const b = world.getBlock(curX, curY, curZ);
      if (!b || b === 0) break; // Reached air, can push!

      const def = Registries.getBlock(b);
      if (def.shortId === 'bedrock' || def.shortId === 'obsidian') {
        return false; // Immovable
      }

      blocksToMove.push({ x: curX, y: curY, z: curZ, id: b, meta: world.getMeta(curX, curY, curZ) });
      curX += dx;
      curY += dy;
      curZ += dz;
    }

    if (world.getBlock(curX, curY, curZ) !== 0) {
      return false; // Blocked at the end
    }

    // Move blocks in reverse order
    for (let i = blocksToMove.length - 1; i >= 0; i--) {
      const b = blocksToMove[i];
      world.setBlock(b.x + dx, b.y + dy, b.z + dz, b.id, b.meta);
    }
    world.setBlock(startX, startY, startZ, 0);
    return true;
  }

  private static igniteTNT(world: World, x: number, y: number, z: number) {
    world.setBlock(x, y, z, 0);
    AudioEngine.play('entity.tnt.primed', 1.0);

    setTimeout(() => {
      AudioEngine.play('entity.generic.explode', 1.0);
      const r = 4;
      for (let ox = -r; ox <= r; ox++) {
        for (let oy = -r; oy <= r; oy++) {
          for (let oz = -r; oz <= r; oz++) {
            if (ox * ox + oy * oy + oz * oz <= r * r) {
              const b = world.getBlock(x + ox, y + oy, z + oz);
              if (b && b !== Registries.getBlock('bedrock')?.numId && b !== Registries.getBlock('obsidian')?.numId) {
                world.setBlock(x + ox, y + oy, z + oz, 0);
              }
            }
          }
        }
      }
    }, 3000);
  }
}
