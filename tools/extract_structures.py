import zipfile, gzip, io, struct, json, os

def parse_nbt(stream):
    def read_tag(tag_type):
        if tag_type == 0: return None
        elif tag_type == 1: return struct.unpack('>b', stream.read(1))[0]
        elif tag_type == 2: return struct.unpack('>h', stream.read(2))[0]
        elif tag_type == 3: return struct.unpack('>i', stream.read(4))[0]
        elif tag_type == 4: return struct.unpack('>q', stream.read(8))[0]
        elif tag_type == 5: return struct.unpack('>f', stream.read(4))[0]
        elif tag_type == 6: return struct.unpack('>d', stream.read(8))[0]
        elif tag_type == 7:
            length = struct.unpack('>i', stream.read(4))[0]
            return list(stream.read(length))
        elif tag_type == 8:
            length = struct.unpack('>H', stream.read(2))[0]
            return stream.read(length).decode('utf-8', errors='replace')
        elif tag_type == 9:
            child_type = struct.unpack('>b', stream.read(1))[0]
            length = struct.unpack('>i', stream.read(4))[0]
            return [read_tag(child_type) for _ in range(length)]
        elif tag_type == 10:
            res = {}
            while True:
                child_type = struct.unpack('>b', stream.read(1))[0]
                if child_type == 0: break
                n_len = struct.unpack('>H', stream.read(2))[0]
                name = stream.read(n_len).decode('utf-8', errors='replace')
                res[name] = read_tag(child_type)
            return res
        elif tag_type == 11:
            length = struct.unpack('>i', stream.read(4))[0]
            return [struct.unpack('>i', stream.read(4))[0] for _ in range(length)]
        elif tag_type == 12:
            length = struct.unpack('>i', stream.read(4))[0]
            return [struct.unpack('>q', stream.read(8))[0] for _ in range(length)]

    tag_type = struct.unpack('>b', stream.read(1))[0]
    if tag_type == 0: return None
    n_len = struct.unpack('>H', stream.read(2))[0]
    name = stream.read(n_len).decode('utf-8', errors='replace')
    return {name: read_tag(tag_type)}

templates = [
    # Plains Village
    'village/plains/town_centers/plains_meeting_point_1',
    'village/plains/town_centers/plains_meeting_point_2',
    'village/plains/town_centers/plains_fountain_01',
    'village/plains/houses/plains_small_house_1',
    'village/plains/houses/plains_small_house_2',
    'village/plains/houses/plains_small_house_3',
    'village/plains/houses/plains_small_house_4',
    'village/plains/houses/plains_small_house_5',
    'village/plains/houses/plains_small_house_6',
    'village/plains/houses/plains_small_house_7',
    'village/plains/houses/plains_small_house_8',
    'village/plains/houses/plains_medium_house_1',
    'village/plains/houses/plains_medium_house_2',
    'village/plains/houses/plains_big_house_1',
    'village/plains/houses/plains_butcher_shop_1',
    'village/plains/houses/plains_cartographer_1',
    'village/plains/houses/plains_fletcher_house_1',
    'village/plains/houses/plains_armorer_house_1',
    'village/plains/houses/plains_library_1',
    'village/plains/houses/plains_large_farm_1',
    'village/plains/houses/plains_small_farm_1',
    'village/plains/houses/plains_animal_pen_1',
    'village/plains/houses/plains_accessory_1',

    # Desert Village
    'village/desert/town_centers/desert_meeting_point_1',
    'village/desert/town_centers/desert_meeting_point_2',
    'village/desert/houses/desert_small_house_1',
    'village/desert/houses/desert_small_house_2',
    'village/desert/houses/desert_small_house_3',
    'village/desert/houses/desert_small_house_4',
    'village/desert/houses/desert_small_house_5',
    'village/desert/houses/desert_medium_house_1',
    'village/desert/houses/desert_butcher_shop_1',
    'village/desert/houses/desert_farm_1',
    'village/desert/houses/desert_animal_pen_1',

    # Taiga Village
    'village/taiga/town_centers/taiga_meeting_point_1',
    'village/taiga/town_centers/taiga_meeting_point_2',
    'village/taiga/houses/taiga_small_house_1',
    'village/taiga/houses/taiga_small_house_2',
    'village/taiga/houses/taiga_small_house_3',
    'village/taiga/houses/taiga_small_house_4',
    'village/taiga/houses/taiga_medium_house_1',
    'village/taiga/houses/taiga_butcher_shop_1',
    'village/taiga/houses/taiga_large_farm_1',
    'village/taiga/houses/taiga_small_farm_1',
    'village/taiga/houses/taiga_animal_pen_1',

    # Savanna Village
    'village/savanna/town_centers/savanna_meeting_point_1',
    'village/savanna/town_centers/savanna_meeting_point_2',
    'village/savanna/houses/savanna_small_house_1',
    'village/savanna/houses/savanna_small_house_2',
    'village/savanna/houses/savanna_small_house_3',
    'village/savanna/houses/savanna_small_house_4',
    'village/savanna/houses/savanna_medium_house_1',
    'village/savanna/houses/savanna_butchers_shop_1',
    'village/savanna/houses/savanna_large_farm_1',
    'village/savanna/houses/savanna_small_farm',
    'village/savanna/houses/savanna_animal_pen_1',

    # Snowy Village
    'village/snowy/town_centers/snowy_meeting_point_1',
    'village/snowy/houses/snowy_small_house_1',
    'village/snowy/houses/snowy_small_house_2',
    'village/snowy/houses/snowy_small_house_3',
    'village/snowy/houses/snowy_medium_house_1',
    'village/snowy/houses/snowy_butchers_shop_1',
    'village/snowy/houses/snowy_farm_1',
    'village/snowy/houses/snowy_animal_pen_1',

    # Ruined Portals
    'ruined_portal/portal_1',
    'ruined_portal/portal_2',
    'ruined_portal/giant_portal_1',
    'ruined_portal/giant_portal_2',

    # Igloo
    'igloo/top',
    'igloo/middle',
    'igloo/bottom',

    # Pillager Outpost
    'pillager_outpost/watchtower',
    'pillager_outpost/feature_cage1',
    'pillager_outpost/feature_cage2',
    'pillager_outpost/feature_tent1',
    'pillager_outpost/feature_targets',

    # Desert Well
    'desert_well/well',
]

jar_path = r'C:\Users\Anders\AppData\Roaming\.minecraft\versions\26.3\26.3.jar'
bundle = {}

with zipfile.ZipFile(jar_path) as z:
    for t in templates:
        path = f'data/minecraft/structure/{t}.nbt'
        try:
            raw = z.read(path)
            decomp = gzip.decompress(raw)
            parsed = parse_nbt(io.BytesIO(decomp))
            root = list(parsed.values())[0]
            bundle[t] = {
                'size': root.get('size'),
                'palette': root.get('palette'),
                'blocks': root.get('blocks'),
                'entities': root.get('entities')
            }
        except KeyError:
            print(f'Warning: {path} not found in jar')

target_path = 'web-port/public/reports/structures_bundle.json'
with open(target_path, 'w', encoding='utf-8') as f:
    json.dump(bundle, f)

print(f'Saved {len(bundle)} templates to {target_path} ({os.path.getsize(target_path) // 1024} KB)')
