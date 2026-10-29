import zipfile
import json
import os
import shutil
import gzip
import struct

ROOT = r"c:\Users\Anders\Documents\Minecraft-Web-Port"
MC_DIR = os.path.join(ROOT, ".minecraft")
JAR_PATH = os.path.join(MC_DIR, "versions", "26.3", "26.3.jar")
INDEX_PATH = os.path.join(MC_DIR, "assets", "indexes", "34.json")
OBJECTS_DIR = os.path.join(MC_DIR, "assets", "objects")
REPORTS_DIR = r"C:\Users\Anders\.gemini\antigravity\brain\bc29f8c8-bdc9-4a19-b43f-e4aaabee9beb\scratch\mc_reports\reports"

OUT_PUBLIC = os.path.join(ROOT, "web-port", "public")
OUT_ASSETS = os.path.join(OUT_PUBLIC, "assets")
OUT_DATA = os.path.join(OUT_PUBLIC, "data")
OUT_REPORTS = os.path.join(OUT_PUBLIC, "reports")

os.makedirs(OUT_ASSETS, exist_ok=True)
os.makedirs(OUT_DATA, exist_ok=True)
os.makedirs(OUT_REPORTS, exist_ok=True)

print("1. Extracting assets/ and data/ from 26.3.jar...")
with zipfile.ZipFile(JAR_PATH, "r") as z:
    # Extract version.json and pack.png
    for top_file in ["version.json", "pack.png"]:
        if top_file in z.namelist():
            z.extract(top_file, OUT_PUBLIC)

    names = z.namelist()
    asset_files = [n for n in names if (n.startswith("assets/") or n.startswith("data/")) and not n.endswith("/")]
    for n in asset_files:
        z.extract(n, OUT_PUBLIC)

print(f"   Extracted {len(asset_files)} files from 26.3.jar.")

print("2. Extracting objects from 34.json (panorama, icons, lang, sounds.json, key sounds)...")
with open(INDEX_PATH, "r", encoding="utf-8") as f:
    index_data = json.load(f)["objects"]

def copy_object(virtual_path, target_rel_path=None):
    if virtual_path not in index_data:
        return False
    h = index_data[virtual_path]["hash"]
    src = os.path.join(OBJECTS_DIR, h[:2], h)
    if not os.path.exists(src):
        return False
    rel = target_rel_path or virtual_path
    dst = os.path.join(OUT_ASSETS, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    return True

# Copy icons, panorama, sounds.json, pack.mcmeta, en_gb/en_pt, font
for k in index_data.keys():
    if (
        k.startswith("icons/")
        or k.startswith("minecraft/textures/")
        or k == "minecraft/sounds.json"
        or k == "pack.mcmeta"
        or k.startswith("minecraft/font/")
    ):
        copy_object(k)

# Parse sounds.json and copy essential gameplay sounds + all 26.3 sounds
sounds_json_path = os.path.join(OUT_ASSETS, "minecraft", "sounds.json")
with open(sounds_json_path, "r", encoding="utf-8") as f:
    sounds_map = json.load(f)

wanted_sound_prefixes = (
    "block.poplar_leaves",
    "block.straw_bed",
    "entity.cushion",
    "block.grass",
    "block.stone",
    "block.wood",
    "block.cherry_wood",
    "block.cherry_leaves",
    "block.gravel",
    "block.sand",
    "block.wool",
    "block.glass",
    "block.water",
    "block.lava",
    "block.campfire",
    "block.chest",
    "block.wooden_door",
    "block.wooden_trapdoor",
    "ui.button.click",
    "entity.player.hurt",
    "entity.player.levelup",
    "entity.player.splash",
    "entity.player.swim",
    "entity.item.pickup",
    "entity.generic.eat",
    "entity.generic.explode",
    "entity.experience_orb.pickup",
    "random.pop",
    "step.",
    "dig.",
)

copied_sounds = 0
for event_name, event_obj in sounds_map.items():
    if any(event_name.startswith(p) for p in wanted_sound_prefixes):
        for s in event_obj.get("sounds", []):
            sname = s if isinstance(s, str) else s.get("name", "")
            if sname:
                vpath = f"minecraft/sounds/{sname}.ogg"
                if copy_object(vpath):
                    copied_sounds += 1

print(f"   Copied {copied_sounds} official .ogg sound files from 34.json objects.")

print("3. Copying official 26.3 reports & building compact client registries...")
for rfile in ["packets.json", "registries.json", "datapack.json", "commands.json"]:
    src = os.path.join(REPORTS_DIR, rfile)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(OUT_REPORTS, rfile))

# Build a compact blocks_summary.json from blocks.json (which is 7.3MB because of all permutations)
blocks_report_path = os.path.join(REPORTS_DIR, "blocks.json")
with open(blocks_report_path, "r", encoding="utf-8") as f:
    full_blocks = json.load(f)

compact_blocks = {}
for block_id, bdata in full_blocks.items():
    props = bdata.get("properties", {})
    default_state = None
    min_state_id = 999999999
    for st in bdata.get("states", []):
        sid = st.get("id", 0)
        if sid < min_state_id:
            min_state_id = sid
        if st.get("default"):
            default_state = {
                "id": sid,
                "properties": st.get("properties", {})
            }
    compact_blocks[block_id] = {
        "definition_type": bdata.get("definition", {}).get("type", "minecraft:block"),
        "properties": props,
        "default_state": default_state,
        "min_state_id": min_state_id,
        "state_count": len(bdata.get("states", []))
    }

with open(os.path.join(OUT_REPORTS, "blocks_summary.json"), "w", encoding="utf-8") as f:
    json.dump(compact_blocks, f, separators=(",", ":"))

print(f"   Built blocks_summary.json for {len(compact_blocks)} official 26.3 blocks.")

# 4. Parse NBT helper to convert servers.dat and abandoned_camp structures into JSON as well as keeping raw .nbt
def read_nbt_tag(buf, offset, tag_type):
    if tag_type == 1: # BYTE
        val = struct.unpack_from(">b", buf, offset)[0]
        return val, offset + 1
    elif tag_type == 2: # SHORT
        val = struct.unpack_from(">h", buf, offset)[0]
        return val, offset + 2
    elif tag_type == 3: # INT
        val = struct.unpack_from(">i", buf, offset)[0]
        return val, offset + 4
    elif tag_type == 4: # LONG
        val = struct.unpack_from(">q", buf, offset)[0]
        return val, offset + 8
    elif tag_type == 5: # FLOAT
        val = struct.unpack_from(">f", buf, offset)[0]
        return round(val, 5), offset + 4
    elif tag_type == 6: # DOUBLE
        val = struct.unpack_from(">d", buf, offset)[0]
        return round(val, 5), offset + 8
    elif tag_type == 7: # BYTE_ARRAY
        length = struct.unpack_from(">i", buf, offset)[0]
        offset += 4
        arr = list(struct.unpack_from(f">{length}b", buf, offset))
        return arr, offset + length
    elif tag_type == 8: # STRING
        length = struct.unpack_from(">H", buf, offset)[0]
        offset += 2
        s = buf[offset:offset+length].decode("utf-8", errors="replace")
        return s, offset + length
    elif tag_type == 9: # LIST
        sub_type = struct.unpack_from(">b", buf, offset)[0]
        length = struct.unpack_from(">i", buf, offset + 1)[0]
        offset += 5
        items = []
        for _ in range(max(0, length)):
            item, offset = read_nbt_tag(buf, offset, sub_type)
            items.append(item)
        return items, offset
    elif tag_type == 10: # COMPOUND
        obj = {}
        while offset < len(buf):
            t = struct.unpack_from(">b", buf, offset)[0]
            offset += 1
            if t == 0:
                break
            name_len = struct.unpack_from(">H", buf, offset)[0]
            offset += 2
            name = buf[offset:offset+name_len].decode("utf-8", errors="replace")
            offset += name_len
            val, offset = read_nbt_tag(buf, offset, t)
            obj[name] = val
        return obj, offset
    elif tag_type == 11: # INT_ARRAY
        length = struct.unpack_from(">i", buf, offset)[0]
        offset += 4
        arr = list(struct.unpack_from(f">{length}i", buf, offset))
        return arr, offset + length * 4
    elif tag_type == 12: # LONG_ARRAY
        length = struct.unpack_from(">i", buf, offset)[0]
        offset += 4
        arr = [str(x) for x in struct.unpack_from(f">{length}q", buf, offset)]
        return arr, offset + length * 8
    else:
        raise ValueError(f"Unknown NBT tag type: {tag_type}")

def parse_nbt_file(filepath):
    with open(filepath, "rb") as f:
        raw = f.read()
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    root_type = struct.unpack_from(">b", raw, 0)[0]
    name_len = struct.unpack_from(">H", raw, 1)[0]
    val, _ = read_nbt_tag(raw, 3 + name_len, root_type)
    return val

# Parse servers.dat and options.txt
servers_dat_path = os.path.join(MC_DIR, "servers.dat")
if os.path.exists(servers_dat_path):
    shutil.copy2(servers_dat_path, os.path.join(OUT_PUBLIC, "servers.dat"))
    servers_json = parse_nbt_file(servers_dat_path)
    with open(os.path.join(OUT_PUBLIC, "servers.json"), "w", encoding="utf-8") as f:
        json.dump(servers_json, f, indent=2)
    print("4. Extracted and parsed servers.dat -> servers.json:", len(servers_json.get("servers", [])), "saved servers.")

options_txt_path = os.path.join(MC_DIR, "options.txt")
if os.path.exists(options_txt_path):
    shutil.copy2(options_txt_path, os.path.join(OUT_PUBLIC, "options.txt"))
    print("5. Copied official options.txt.")

# Pre-parse 26.3 Abandoned Camp structures to JSON for instant loading in worldgen
camp_dir = os.path.join(OUT_PUBLIC, "data", "minecraft", "structure", "abandoned_camp")
parsed_structures = {}
if os.path.exists(camp_dir):
    for root, _, files in os.walk(camp_dir):
        for file in files:
            if file.endswith(".nbt"):
                full_p = os.path.join(root, file)
                rel_p = os.path.relpath(full_p, camp_dir).replace("\\", "/")
                try:
                    parsed_structures[rel_p] = parse_nbt_file(full_p)
                except Exception as e:
                    print("   Warning parsing structure:", rel_p, e)

with open(os.path.join(OUT_REPORTS, "abandoned_camp_structures.json"), "w", encoding="utf-8") as f:
    json.dump(parsed_structures, f, separators=(",", ":"))
print(f"6. Parsed {len(parsed_structures)} official 26.3 Abandoned Camp .nbt structures into abandoned_camp_structures.json!")

# Build a texture manifest of all block and item PNGs so TextureAtlas can load them deterministically
block_tex_dir = os.path.join(OUT_ASSETS, "minecraft", "textures", "block")
item_tex_dir = os.path.join(OUT_ASSETS, "minecraft", "textures", "item")
entity_tex_dir = os.path.join(OUT_ASSETS, "minecraft", "textures", "entity")

block_textures = sorted([f[:-4] for f in os.listdir(block_tex_dir) if f.endswith(".png")])
item_textures = sorted([f[:-4] for f in os.listdir(item_tex_dir) if f.endswith(".png")])

manifest = {
    "block": block_textures,
    "item": item_textures,
}
with open(os.path.join(OUT_REPORTS, "texture_manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, separators=(",", ":"))

print(f"7. Built texture_manifest.json ({len(block_textures)} block textures, {len(item_textures)} item textures).")
print("Done!")
