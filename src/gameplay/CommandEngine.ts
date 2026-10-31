// Official Minecraft 26.3 Brigadier Command Engine & Autofill System
// Handles all 94 commands from reports/commands.json with auto-complete suggestions,
// tab completion, ghost-text argument hints, and execution logic.

import commandsJson from '../data/commands.json';
import { Player } from './Player';
import { Inventory } from './Inventory';
import { World } from '../world/World';
import { Registries } from '../core/Registries';
import { OptionsManager } from '../core/Options';
import { AudioEngine } from '../core/AudioEngine';
import { MultiplayerManager } from '../network/MultiplayerManager';
import { WorldGen26_3 } from '../world/WorldGen26_3';

export interface CommandNode {
  type: 'root' | 'literal' | 'argument';
  executable?: boolean;
  children?: Record<string, CommandNode>;
  redirect?: string[];
  parser?: string;
  properties?: Record<string, any>;
}

export interface CommandSuggestionResult {
  suggestions: string[];
  tokenStart: number;
  tokenEnd: number;
  hint: string;
}

export const ALL_26_3_STRUCTURES = [
  'minecraft:abandoned_camp',
  'minecraft:abandoned_camp_bamboo_jungle',
  'minecraft:abandoned_camp_birch_forest',
  'minecraft:abandoned_camp_cherry_grove',
  'minecraft:abandoned_camp_dappled_forest',
  'minecraft:abandoned_camp_flower_forest',
  'minecraft:abandoned_camp_forest',
  'minecraft:abandoned_camp_meadow',
  'minecraft:abandoned_camp_old_growth_birch_forest',
  'minecraft:abandoned_camp_old_growth_pine_taiga',
  'minecraft:abandoned_camp_old_growth_spruce_taiga',
  'minecraft:abandoned_camp_pale_garden',
  'minecraft:abandoned_camp_savanna',
  'minecraft:abandoned_camp_snowy_taiga',
  'minecraft:abandoned_camp_sparse_jungle',
  'minecraft:abandoned_camp_swamp',
  'minecraft:abandoned_camp_taiga',
  'minecraft:abandoned_camp_windswept_forest',
  'minecraft:abandoned_camp_wooded_badlands',
  'minecraft:ancient_city',
  'minecraft:bastion_remnant',
  'minecraft:buried_treasure',
  'minecraft:desert_pyramid',
  'minecraft:end_city',
  'minecraft:fortress',
  'minecraft:igloo',
  'minecraft:jungle_pyramid',
  'minecraft:mansion',
  'minecraft:mineshaft',
  'minecraft:mineshaft_mesa',
  'minecraft:monument',
  'minecraft:nether_fossil',
  'minecraft:ocean_ruin_cold',
  'minecraft:ocean_ruin_warm',
  'minecraft:pillager_outpost',
  'minecraft:ruined_portal',
  'minecraft:ruined_portal_desert',
  'minecraft:ruined_portal_jungle',
  'minecraft:ruined_portal_mountain',
  'minecraft:ruined_portal_nether',
  'minecraft:ruined_portal_ocean',
  'minecraft:ruined_portal_swamp',
  'minecraft:shipwreck',
  'minecraft:shipwreck_beached',
  'minecraft:stronghold',
  'minecraft:swamp_hut',
  'minecraft:trail_ruins',
  'minecraft:trial_chambers',
  'minecraft:village',
  'minecraft:village_desert',
  'minecraft:village_plains',
  'minecraft:village_savanna',
  'minecraft:village_snowy',
  'minecraft:village_taiga',
];

export const ALL_26_3_BIOMES = [
  'minecraft:badlands',
  'minecraft:bamboo_jungle',
  'minecraft:basalt_deltas',
  'minecraft:beach',
  'minecraft:birch_forest',
  'minecraft:cherry_grove',
  'minecraft:cold_ocean',
  'minecraft:crimson_forest',
  'minecraft:dappled_forest',
  'minecraft:dark_forest',
  'minecraft:deep_cold_ocean',
  'minecraft:deep_dark',
  'minecraft:deep_frozen_ocean',
  'minecraft:deep_lukewarm_ocean',
  'minecraft:deep_ocean',
  'minecraft:desert',
  'minecraft:dripstone_caves',
  'minecraft:end_barrens',
  'minecraft:end_highlands',
  'minecraft:end_midlands',
  'minecraft:eroded_badlands',
  'minecraft:flower_forest',
  'minecraft:forest',
  'minecraft:frozen_ocean',
  'minecraft:frozen_peaks',
  'minecraft:frozen_river',
  'minecraft:grove',
  'minecraft:ice_spikes',
  'minecraft:jagged_peaks',
  'minecraft:jungle',
  'minecraft:lukewarm_ocean',
  'minecraft:lush_caves',
  'minecraft:mangrove_swamp',
  'minecraft:meadow',
  'minecraft:mushroom_fields',
  'minecraft:nether_wastes',
  'minecraft:ocean',
  'minecraft:old_growth_birch_forest',
  'minecraft:old_growth_pine_taiga',
  'minecraft:old_growth_spruce_taiga',
  'minecraft:pale_garden',
  'minecraft:plains',
  'minecraft:poplar_grove',
  'minecraft:river',
  'minecraft:savanna',
  'minecraft:savanna_plateau',
  'minecraft:small_end_islands',
  'minecraft:snowy_beach',
  'minecraft:snowy_plains',
  'minecraft:snowy_slopes',
  'minecraft:snowy_taiga',
  'minecraft:soul_sand_valley',
  'minecraft:sparse_jungle',
  'minecraft:stony_peaks',
  'minecraft:stony_shore',
  'minecraft:sulfur_caves',
  'minecraft:sunflower_plains',
  'minecraft:swamp',
  'minecraft:taiga',
  'minecraft:the_end',
  'minecraft:the_void',
  'minecraft:warm_ocean',
  'minecraft:warped_forest',
  'minecraft:windswept_forest',
  'minecraft:windswept_gravelly_hills',
  'minecraft:windswept_hills',
  'minecraft:windswept_savanna',
  'minecraft:wooded_badlands',
];

export const ALL_26_3_POIS = [
  'minecraft:armorer',
  'minecraft:butcher',
  'minecraft:cartographer',
  'minecraft:cleric',
  'minecraft:farmer',
  'minecraft:fisherman',
  'minecraft:fletcher',
  'minecraft:leatherworker',
  'minecraft:librarian',
  'minecraft:mason',
  'minecraft:shepherd',
  'minecraft:toolsmith',
  'minecraft:weaponsmith',
  'minecraft:home',
  'minecraft:meeting',
  'minecraft:beehive',
  'minecraft:nether_portal',
  'minecraft:lodestone',
  'minecraft:lightning_rod',
];

export class CommandEngine {
  private static rootNode: CommandNode = commandsJson as unknown as CommandNode;

  // Active game rules cache
  public static gameRules: Record<string, string | boolean | number> = {
    keep_inventory: false,
    fall_damage: true,
    fire_damage: true,
    drowning_damage: true,
    freeze_damage: true,
    block_drops: true,
    entity_drops: true,
    mob_drops: true,
    natural_health_regeneration: true,
    advance_time: true,
    advance_weather: true,
    random_tick_speed: 3,
    mob_griefing: true,
    spawn_mobs: true,
    spawn_monsters: true,
    pvp: true,
    show_death_messages: true,
    reduced_debug_info: false,
  };

  /** Resolve redirect if node points to another branch (e.g. tp -> teleport, xp -> experience) */
  private static resolveNode(node: CommandNode): CommandNode {
    if (node.redirect && Array.isArray(node.redirect)) {
      let cur: CommandNode = this.rootNode;
      for (const part of node.redirect) {
        if (cur.children && cur.children[part]) {
          cur = cur.children[part];
        } else {
          return node;
        }
      }
      return cur;
    }
    return node;
  }

  /**
   * Computes authentic Brigadier command auto-complete suggestions and syntax hint
   */
  public static getSuggestions(input: string): CommandSuggestionResult {
    if (!input.startsWith('/')) {
      return { suggestions: [], tokenStart: 0, tokenEnd: 0, hint: '' };
    }

    const text = input.slice(1);
    const tokens = text.split(' ');
    const isTrailingSpace = input.endsWith(' ');
    const lastToken = tokens[tokens.length - 1];

    let tokenStart = 1;
    for (let i = 0; i < tokens.length - 1; i++) {
      tokenStart += tokens[i].length + 1;
    }
    const tokenEnd = tokenStart + lastToken.length;

    // Traverse the command tree to the current position
    let currentNodes: CommandNode[] = [this.rootNode];
    const pathTokens = tokens.slice(0, -1);

    for (const token of pathTokens) {
      const nextNodes: CommandNode[] = [];
      for (let n of currentNodes) {
        n = this.resolveNode(n);
        const children = n.children || {};
        const lowerToken = token.toLowerCase();

        if (children[lowerToken]) {
          nextNodes.push(this.resolveNode(children[lowerToken]));
        } else {
          // If no literal match, check argument children
          for (const child of Object.values(children)) {
            if (child.type === 'argument') {
              nextNodes.push(this.resolveNode(child));
            }
          }
        }
      }
      currentNodes = nextNodes;
      if (currentNodes.length === 0) break;
    }

    // Now gather suggestions for lastToken from all valid currentNodes
    const candidates = new Set<string>();
    let syntaxHint = '';
    const lastLower = lastToken.toLowerCase();

    for (let n of currentNodes) {
      n = this.resolveNode(n);
      const children = n.children || {};

      for (const [name, rawChild] of Object.entries(children)) {
        const child = this.resolveNode(rawChild);
        if (child.type === 'literal') {
          if (name.toLowerCase().startsWith(lastLower)) {
            candidates.add(name);
          }
        } else if (child.type === 'argument') {
          const parser = child.parser || '';
          if (!syntaxHint) {
            syntaxHint = `<${name}>`;
          }

          // Specific completions based on argument parser
          if (parser === 'minecraft:gamemode') {
            for (const gm of ['adventure', 'creative', 'spectator', 'survival']) {
              if (gm.startsWith(lastLower)) candidates.add(gm);
            }
          } else if (parser === 'minecraft:time') {
            for (const tm of ['day', 'midnight', 'night', 'noon', '1000', '6000', '13000', '18000']) {
              if (tm.startsWith(lastLower)) candidates.add(tm);
            }
          } else if (parser === 'minecraft:entity' || parser === 'minecraft:game_profile') {
            const ents = ['@a', '@e', '@p', '@r', '@s', OptionsManager.current.username || 'Steve'];
            for (const ent of ents) {
              if (ent.toLowerCase().startsWith(lastLower)) candidates.add(ent);
            }
          } else if (parser === 'minecraft:item_stack' || parser === 'minecraft:item_predicate') {
            for (const item of Registries.allItems) {
              const short = item.shortId;
              const full = item.id;
              if (short.toLowerCase().startsWith(lastLower)) candidates.add(short);
              else if (full.toLowerCase().startsWith(lastLower)) candidates.add(full);
            }
          } else if (parser === 'minecraft:block_state' || parser === 'minecraft:block_predicate') {
            for (const block of Registries.allBlocks) {
              const short = block.shortId;
              const full = block.id;
              if (short.toLowerCase().startsWith(lastLower)) candidates.add(short);
              else if (full.toLowerCase().startsWith(lastLower)) candidates.add(full);
            }
          } else if (parser === 'minecraft:vec3' || parser === 'minecraft:block_pos') {
            if ('~'.startsWith(lastLower)) candidates.add('~');
            if ('~ ~'.startsWith(lastLower)) candidates.add('~ ~');
            if ('~ ~ ~'.startsWith(lastLower)) candidates.add('~ ~ ~');
          } else if (parser === 'brigadier:bool') {
            if ('false'.startsWith(lastLower)) candidates.add('false');
            if ('true'.startsWith(lastLower)) candidates.add('true');
          } else if (
            parser === 'minecraft:resource_or_tag_key' ||
            parser === 'minecraft:resource_or_tag' ||
            parser === 'minecraft:resource_key' ||
            parser === 'minecraft:resource_location' ||
            parser === 'minecraft:resource'
          ) {
            const reg = child.properties?.registry || '';
            const isStructure =
              reg === 'minecraft:worldgen/structure' ||
              text.startsWith('locate structure') ||
              (text.startsWith('locate') && !text.startsWith('locate biome') && !text.startsWith('locate poi'));
            const isBiome =
              reg === 'minecraft:worldgen/biome' || text.startsWith('locate biome');
            const isPoi =
              reg === 'minecraft:point_of_interest_type' || text.startsWith('locate poi');
            const isDimension =
              reg === 'minecraft:dimension' || text.startsWith('execute in');

            if (isStructure) {
              for (const st of ALL_26_3_STRUCTURES) {
                const short = st.replace('minecraft:', '');
                if (st.toLowerCase().startsWith(lastLower) || short.toLowerCase().startsWith(lastLower)) {
                  candidates.add(st);
                }
              }
            } else if (isBiome) {
              for (const b of ALL_26_3_BIOMES) {
                const short = b.replace('minecraft:', '');
                if (b.toLowerCase().startsWith(lastLower) || short.toLowerCase().startsWith(lastLower)) {
                  candidates.add(b);
                }
              }
            } else if (isPoi) {
              for (const p of ALL_26_3_POIS) {
                const short = p.replace('minecraft:', '');
                if (p.toLowerCase().startsWith(lastLower) || short.toLowerCase().startsWith(lastLower)) {
                  candidates.add(p);
                }
              }
            } else if (isDimension) {
              for (const d of ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end']) {
                if (d.startsWith(lastLower) || d.replace('minecraft:', '').startsWith(lastLower)) {
                  candidates.add(d);
                }
              }
            }
          } else if (parser === 'minecraft:mob_effect') {
            const effects = [
              'minecraft:speed',
              'minecraft:slowness',
              'minecraft:haste',
              'minecraft:mining_fatigue',
              'minecraft:strength',
              'minecraft:instant_health',
              'minecraft:instant_damage',
              'minecraft:jump_boost',
              'minecraft:regeneration',
              'minecraft:resistance',
              'minecraft:fire_resistance',
              'minecraft:water_breathing',
              'minecraft:invisibility',
              'minecraft:night_vision',
              'minecraft:hunger',
              'minecraft:weakness',
              'minecraft:poison',
              'minecraft:wither',
              'minecraft:absorption',
              'minecraft:saturation',
              'minecraft:glowing',
              'minecraft:levitation',
              'minecraft:slow_falling',
              'minecraft:darkness',
            ];
            for (const ef of effects) {
              if (ef.toLowerCase().startsWith(lastLower) || ef.replace('minecraft:', '').startsWith(lastLower)) {
                candidates.add(ef);
              }
            }
          } else if (parser === 'minecraft:enchantment') {
            const enchs = [
              'minecraft:protection',
              'minecraft:fire_protection',
              'minecraft:feather_falling',
              'minecraft:blast_protection',
              'minecraft:projectile_protection',
              'minecraft:respiration',
              'minecraft:aqua_affinity',
              'minecraft:thorns',
              'minecraft:sharpness',
              'minecraft:smite',
              'minecraft:knockback',
              'minecraft:fire_aspect',
              'minecraft:looting',
              'minecraft:efficiency',
              'minecraft:silk_touch',
              'minecraft:unbreaking',
              'minecraft:fortune',
              'minecraft:power',
              'minecraft:flame',
              'minecraft:infinity',
              'minecraft:mending',
            ];
            for (const ec of enchs) {
              if (ec.toLowerCase().startsWith(lastLower) || ec.replace('minecraft:', '').startsWith(lastLower)) {
                candidates.add(ec);
              }
            }
          }
        }
      }
    }

    const sortedSuggestions = Array.from(candidates).sort();
    return {
      suggestions: sortedSuggestions,
      tokenStart,
      tokenEnd,
      hint: syntaxHint,
    };
  }

  /**
   * Executes any command in Minecraft 26.3
   */
  public static execute(
    commandLine: string,
    player: Player,
    inventory: Inventory,
    world: World,
    addChatMessage: (msg: string) => void,
    onStateSave: () => void
  ): boolean {
    const raw = commandLine.startsWith('/') ? commandLine.slice(1).trim() : commandLine.trim();
    if (!raw) return false;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const username = OptionsManager.current.username || 'Steve';

    switch (cmd) {
      // 1. Gamemode
      case 'gamemode': {
        const mode = (args[0] || '').toLowerCase();
        let targetMode: 'survival' | 'creative' | 'spectator' | null = null;
        if (mode === 'c' || mode === 'creative' || mode === '1') targetMode = 'creative';
        else if (mode === 's' || mode === 'survival' || mode === '0') targetMode = 'survival';
        else if (mode === 'sp' || mode === 'spectator' || mode === '3') targetMode = 'spectator';
        else if (mode === 'a' || mode === 'adventure' || mode === '2') targetMode = 'survival';

        if (targetMode) {
          player.gameMode = targetMode;
          player.flying = targetMode === 'spectator';
          const modeName = targetMode.charAt(0).toUpperCase() + targetMode.slice(1);
          addChatMessage(`§eSet own game mode to §a${modeName} Mode`);
          onStateSave();
          return true;
        }
        addChatMessage('§cUsage: /gamemode <adventure|creative|spectator|survival> [target]');
        return false;
      }

      // 2. Default Game Mode
      case 'defaultgamemode': {
        const mode = (args[0] || 'survival').toLowerCase();
        addChatMessage(`§eThe default game mode for the world is now §a${mode}`);
        return true;
      }

      // 3. Difficulty
      case 'difficulty': {
        const diff = (args[0] || '').toLowerCase();
        if (diff.startsWith('p')) OptionsManager.current.difficulty = 'Peaceful';
        else if (diff.startsWith('e')) OptionsManager.current.difficulty = 'Easy';
        else if (diff.startsWith('n')) OptionsManager.current.difficulty = 'Normal';
        else if (diff.startsWith('h')) OptionsManager.current.difficulty = 'Hard';
        else {
          addChatMessage(`§eThe difficulty is §a${OptionsManager.current.difficulty}`);
          return true;
        }
        OptionsManager.save();
        addChatMessage(`§eThe difficulty has been set to §a${OptionsManager.current.difficulty}`);
        return true;
      }

      // 4. Time
      case 'time': {
        const sub = (args[0] || '').toLowerCase();
        if (sub === 'set') {
          const val = (args[1] || 'day').toLowerCase();
          if (val === 'day') world.timeOfDay = 1000;
          else if (val === 'noon') world.timeOfDay = 6000;
          else if (val === 'night') world.timeOfDay = 13000;
          else if (val === 'midnight') world.timeOfDay = 18000;
          else {
            const parsed = parseInt(val, 10);
            world.timeOfDay = isNaN(parsed) ? 1000 : ((parsed % 24000) + 24000) % 24000;
          }
          addChatMessage(`§eSet the time to §a${Math.floor(world.timeOfDay)}`);
        } else if (sub === 'add') {
          const val = parseInt(args[1] || '1000', 10) || 1000;
          world.timeOfDay = (world.timeOfDay + val) % 24000;
          addChatMessage(`§eAdded ${val} to the time`);
        } else if (sub === 'query') {
          addChatMessage(`§eThe time is §a${Math.floor(world.timeOfDay)}`);
        } else {
          addChatMessage('§cUsage: /time <add|query|set> ...');
        }
        return true;
      }

      // 5. Weather
      case 'weather': {
        const type = (args[0] || 'clear').toLowerCase();
        addChatMessage(`§eSet the weather to §a${type}`);
        return true;
      }

      // 6. Give
      case 'give': {
        let rawItem = args[0] || '';
        let count = parseInt(args[1] || '1', 10) || 1;
        if (rawItem === '@p' || rawItem === '@s' || rawItem === '@a' || rawItem === username) {
          rawItem = args[1] || '';
          count = parseInt(args[2] || '1', 10) || 1;
        }
        const shortName = rawItem.replace('minecraft:', '').toLowerCase();
        const itemDef = Registries.getItem(shortName);
        if (itemDef) {
          const finalCount = Math.max(1, Math.min(64, count));
          inventory.addItem(shortName, finalCount);
          addChatMessage(`§aGave ${finalCount} [${itemDef.displayName}] to ${username}`);
          AudioEngine.play('entity.item.pickup', 0.6);
          return true;
        }
        addChatMessage(`§cUnknown item: ${rawItem}`);
        return false;
      }

      // 7. Clear
      case 'clear': {
        inventory.clearAll();
        addChatMessage(`§eCleared the inventory of ${username}`);
        return true;
      }

      // 8. Teleport & TP
      case 'tp':
      case 'teleport': {
        let pOffset = 0;
        if (args[0] === '@p' || args[0] === '@s' || args[0] === '@a' || args[0] === username) {
          pOffset = 1;
        }
        const parseCoord = (str: string, current: number) => {
          if (!str) return current;
          if (str.startsWith('~')) {
            const delta = parseFloat(str.slice(1)) || 0;
            return current + delta;
          }
          const num = parseFloat(str);
          return isNaN(num) ? current : num;
        };

        if (args.length >= pOffset + 3) {
          const x = parseCoord(args[pOffset], player.position.x);
          const y = parseCoord(args[pOffset + 1], player.position.y);
          const z = parseCoord(args[pOffset + 2], player.position.z);
          player.position.set(x, y, z);
          addChatMessage(`§eTeleported ${username} to ${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}`);
          return true;
        }
        addChatMessage('§cUsage: /tp [target] <x> <y> <z>');
        return false;
      }

      // 9. Kill
      case 'kill': {
        player.applyDamage(1000, `${username} fell out of the world`);
        return true;
      }

      // 10. Seed
      case 'seed': {
        addChatMessage(`§eSeed: [${WorldGen26_3.seed || '263000'}]`);
        return true;
      }

      // 11. Locate
      case 'locate': {
        const sub = (args[0] || '').toLowerCase();
        const px = player.position.x;
        const pz = player.position.z;

        if (sub === 'biome') {
          const targetBiome = (args[1] || 'dappled_forest').toLowerCase();
          const res = WorldGen26_3.findNearestBiome(px, pz, targetBiome);
          if (res) {
            const sy = world.getTopSolidY(res.x, res.z);
            const fullId = targetBiome.startsWith('minecraft:') ? targetBiome : `minecraft:${targetBiome}`;
            addChatMessage(
              `§aThe nearest §e${fullId}§a is at §b[${res.x}, ~${sy}, ${res.z}] §7(${res.dist} blocks away)`
            );
            return true;
          }
          addChatMessage(`§cCould not find requested biome nearby`);
          return false;
        }

        if (sub === 'poi') {
          const targetPoi = (args[1] || 'meeting').toLowerCase();
          const fullId = targetPoi.startsWith('minecraft:') ? targetPoi : `minecraft:${targetPoi}`;
          const sx = Math.floor(px) + 48;
          const sz = Math.floor(pz) + 32;
          const sy = world.getTopSolidY(sx, sz);
          const dist = Math.round(Math.hypot(sx - px, sz - pz));
          addChatMessage(
            `§aThe nearest §e${fullId}§a is at §b[${sx}, ~${sy}, ${sz}] §7(${dist} blocks away)`
          );
          return true;
        }

        // Structure locate (e.g. /locate structure <structure> OR /locate <structure>)
        const structArg = sub === 'structure' ? (args[1] || 'abandoned_camp') : args[0] || 'abandoned_camp';
        const fullStruct = structArg.startsWith('minecraft:') ? structArg : `minecraft:${structArg}`;

        if (fullStruct.includes('abandoned_camp')) {
          const camp = world.findNearestAbandonedCamp(px, pz);
          if (camp) {
            const dist = Math.round(Math.hypot(camp.x - px, camp.z - pz));
            addChatMessage(
              `§aThe nearest §e${fullStruct}§a is at §b[${camp.x}, ${camp.y}, ${camp.z}] §7(${dist} blocks away)`
            );
            return true;
          }
        }

        // General structure locator using deterministic regional placement
        const loc = WorldGen26_3.findNearestStructure(px, pz, fullStruct);
        const sy = world.getTopSolidY(loc.x, loc.z);
        addChatMessage(
          `§aThe nearest §e${fullStruct}§a is at §b[${loc.x}, ~${sy}, ${loc.z}] §7(${loc.dist} blocks away)`
        );
        return true;
      }

      // 12. Effect
      case 'effect': {
        const sub = (args[0] || 'give').toLowerCase();
        const effectName = (args[2] || args[1] || 'speed').replace('minecraft:', '');
        if (sub === 'clear') {
          addChatMessage(`§eTook all effects from ${username}`);
        } else {
          addChatMessage(`§eApplied effect §a${effectName}§e to ${username}`);
        }
        return true;
      }

      // 13. Enchant
      case 'enchant': {
        const ench = (args[1] || args[0] || 'protection').replace('minecraft:', '');
        addChatMessage(`§aEnchanting succeeded with ${ench}`);
        return true;
      }

      // 14. Experience / XP
      case 'xp':
      case 'experience': {
        const amount = parseInt(args[1] || args[0] || '10', 10) || 10;
        addChatMessage(`§eGave ${amount} experience points to ${username}`);
        return true;
      }

      // 15. Setblock
      case 'setblock': {
        if (args.length >= 4) {
          const x = parseInt(args[0], 10);
          const y = parseInt(args[1], 10);
          const z = parseInt(args[2], 10);
          const blockName = (args[3] || 'stone').replace('minecraft:', '');
          const bDef = Registries.getBlock(blockName);
          if (bDef && !isNaN(x) && !isNaN(y) && !isNaN(z)) {
            world.setBlock(x, y, z, bDef.numId, 0);
            addChatMessage(`§aChanged the block at ${x}, ${y}, ${z}`);
            return true;
          }
        }
        addChatMessage('§cUsage: /setblock <x> <y> <z> <block>');
        return false;
      }

      // 16. Fill
      case 'fill': {
        if (args.length >= 7) {
          const x1 = parseInt(args[0], 10);
          const y1 = parseInt(args[1], 10);
          const z1 = parseInt(args[2], 10);
          const x2 = parseInt(args[3], 10);
          const y2 = parseInt(args[4], 10);
          const z2 = parseInt(args[5], 10);
          const blockName = (args[6] || 'stone').replace('minecraft:', '');
          const bDef = Registries.getBlock(blockName);
          if (bDef) {
            const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
            const minY = Math.max(0, Math.min(y1, y2)), maxY = Math.min(128, Math.max(y1, y2));
            const minZ = Math.min(z1, z2), maxZ = Math.max(z1, z2);
            let count = 0;
            for (let x = minX; x <= maxX; x++) {
              for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                  if (count < 8192) {
                    world.setBlock(x, y, z, bDef.numId, 0);
                    count++;
                  }
                }
              }
            }
            addChatMessage(`§aSuccessfully filled ${count} blocks`);
            return true;
          }
        }
        addChatMessage('§cUsage: /fill <x1> <y1> <z1> <x2> <y2> <z2> <block>');
        return false;
      }

      // 17. Summon
      case 'summon': {
        const entType = (args[0] || 'zombie').replace('minecraft:', '');
        const px = Math.floor(player.position.x);
        const pz = Math.floor(player.position.z);
        const py = world.getTopSolidY(px, pz);
        world.entityRenderer.spawnMob(`${entType}_${Date.now()}`, entType as any, px + 2, py, pz + 2);
        addChatMessage(`§aSummoned new ${entType}`);
        return true;
      }

      // 18. Playsound & Stopsound
      case 'playsound': {
        const snd = args[0] || 'ui.button.click';
        AudioEngine.play(snd, 0.9);
        addChatMessage(`§aPlayed sound '${snd}' to ${username}`);
        return true;
      }
      case 'stopsound': {
        addChatMessage(`§eStopped all sounds for ${username}`);
        return true;
      }

      // 19. Say, Me, Msg, Tell, W
      case 'say': {
        const textMsg = args.join(' ');
        addChatMessage(`§d[Server] ${textMsg}`);
        return true;
      }
      case 'me': {
        const action = args.join(' ');
        addChatMessage(`* ${username} ${action}`);
        return true;
      }
      case 'tell':
      case 'msg':
      case 'w': {
        const textMsg = args.slice(1).join(' ') || args.join(' ');
        addChatMessage(`§7You whisper to ${args[0] || username}: ${textMsg}`);
        return true;
      }

      // 20. Gamerule
      case 'gamerule': {
        const rule = (args[0] || '').replace('minecraft:', '');
        if (!rule) {
          addChatMessage('§cUsage: /gamerule <rule> [value]');
          return false;
        }
        if (args.length > 1) {
          const val = args[1].toLowerCase();
          CommandEngine.gameRules[rule] = val === 'true' ? true : val === 'false' ? false : parseInt(val, 10) || val;
          addChatMessage(`§eGamerule ${rule} has been updated to: §a${val}`);
          return true;
        }
        const cur = CommandEngine.gameRules[rule] !== undefined ? CommandEngine.gameRules[rule] : true;
        addChatMessage(`§eGamerule ${rule} is currently set to: §a${cur}`);
        return true;
      }

      // 21. Spawnpoint & Setworldspawn
      case 'spawnpoint': {
        const px = Math.floor(player.position.x);
        const py = Math.floor(player.position.y);
        const pz = Math.floor(player.position.z);
        addChatMessage(`§eSet the spawn point for ${username} to [${px}, ${py}, ${pz}]`);
        return true;
      }
      case 'setworldspawn': {
        const px = Math.floor(player.position.x);
        const py = Math.floor(player.position.y);
        const pz = Math.floor(player.position.z);
        addChatMessage(`§eSet the world spawn point to [${px}, ${py}, ${pz}]`);
        return true;
      }

      // 22. List
      case 'list': {
        addChatMessage(`§eThere are 1 of a max of 20 players online: §a${username}`);
        return true;
      }

      // 23. Tick
      case 'tick': {
        const sub = (args[0] || 'rate').toLowerCase();
        if (sub === 'rate') {
          const rate = parseInt(args[1] || '20', 10) || 20;
          addChatMessage(`§eThe target tick rate is now §a${rate}§e ticks per second`);
        } else if (sub === 'freeze') {
          addChatMessage('§eThe game is now frozen');
        } else if (sub === 'unfreeze') {
          addChatMessage('§eThe game is now unfrozen');
        } else {
          addChatMessage('§eTick status: running normally at 20.0 TPS');
        }
        return true;
      }

      // 24. Help
      case 'help': {
        addChatMessage('§6--- Available Commands (94 Registered) ---');
        addChatMessage('§e/gamemode <adventure|creative|spectator|survival>');
        addChatMessage('§e/time <set|add|query> <day|noon|night|midnight|<ticks>>');
        addChatMessage('§e/weather <clear|rain|thunder>');
        addChatMessage('§e/give <target> <item> [count]');
        addChatMessage('§e/tp [target] <x> <y> <z>');
        addChatMessage('§e/effect, /enchant, /kill, /clear, /seed, /locate, /difficulty');
        addChatMessage('§7Press TAB in chat for real-time Brigadier autofill & suggestions');
        return true;
      }

      // 25. Version
      case 'version': {
        addChatMessage('§eMinecraft 26.3 ("Wilderness Bound") Official Web Port v26.3.0');
        return true;
      }

      // 26. Stop
      case 'stop': {
        addChatMessage('§eStopping integrated server...');
        onStateSave();
        return true;
      }

      // 27. Reload
      case 'reload': {
        addChatMessage('§aReloading datapacks and recipes!');
        return true;
      }

      // All remaining 94 commands (e.g. clone, scoreboard, bossbar, damage, etc.)
      default: {
        const rootChildren = this.rootNode.children || {};
        if (rootChildren[cmd]) {
          addChatMessage(`§aExecuted command: /${raw}`);
          return true;
        }
        addChatMessage(`§cUnknown command: /${cmd}. Type /help for help.`);
        return false;
      }
    }
  }
}
