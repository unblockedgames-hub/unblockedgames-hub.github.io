// Official Minecraft Resource Pack Manager with JSZip extraction & IndexedDB persistence
import JSZip from 'jszip';
import { resolveAssetUrl } from './AssetPath';

export interface ResourcePackMeta {
  id: string;
  name: string;
  description: string;
  packFormat: number;
  iconDataUrl: string;
  enabled: boolean;
  zipData?: ArrayBuffer;
}

const DB_NAME = 'minecraft_web_resource_packs_db';
const DB_VERSION = 1;
const STORE_NAME = 'resource_packs';

export class ResourcePackManager {
  private static db: IDBDatabase | null = null;
  public static availablePacks: ResourcePackMeta[] = [];
  public static activePackOverrides = new Map<string, string>(); // assetUrl -> blob/dataUrl

  public static async init(): Promise<void> {
    try {
      this.db = await this.openDatabase();
      await this.loadPacksFromStorage();
      await this.refreshActiveOverrides();
    } catch (e) {
      console.warn('[ResourcePackManager] Failed to init DB:', e);
    }
  }

  private static openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  private static async loadPacksFromStorage(): Promise<void> {
    if (!this.db) return;
    return new Promise((resolve) => {
      const tx = this.db!.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        this.availablePacks = req.result || [];
        resolve();
      };
      req.onerror = () => resolve();
    });
  }

  public static async savePack(pack: ResourcePackMeta): Promise<void> {
    if (!this.db) return;
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(pack);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  public static async deletePack(id: string): Promise<void> {
    if (!this.db) return;
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => {
        this.availablePacks = this.availablePacks.filter((p) => p.id !== id);
        this.refreshActiveOverrides().then(resolve);
      };
      tx.onerror = () => reject(tx.error);
    });
  }

  /**
   * Parse an uploaded .zip resource pack file, extract pack.mcmeta & pack.png,
   * index all textures and sounds, and save to IndexedDB.
   */
  public static async importZipFile(file: File): Promise<ResourcePackMeta> {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    let description = 'Custom Resource Pack';
    let packFormat = 46;

    // Read pack.mcmeta
    const mcmetaFile = zip.file('pack.mcmeta');
    if (mcmetaFile) {
      try {
        const text = await mcmetaFile.async('text');
        const json = JSON.parse(text);
        if (json.pack) {
          if (typeof json.pack.description === 'string') {
            description = json.pack.description;
          } else if (typeof json.pack.description === 'object' && json.pack.description.text) {
            description = json.pack.description.text;
          }
          if (typeof json.pack.pack_format === 'number') {
            packFormat = json.pack.pack_format;
          }
        }
      } catch (e) {
        console.warn('Could not parse pack.mcmeta:', e);
      }
    }

    // Read pack.png
    let iconDataUrl = '';
    const packPng = zip.file('pack.png');
    if (packPng) {
      const b64 = await packPng.async('base64');
      iconDataUrl = `data:image/png;base64,${b64}`;
    }

    const packId = `pack_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const packMeta: ResourcePackMeta = {
      id: packId,
      name: file.name.replace(/\.zip$/i, ''),
      description,
      packFormat,
      iconDataUrl,
      enabled: false,
      zipData: arrayBuffer,
    };

    await this.savePack(packMeta);
    this.availablePacks.push(packMeta);
    return packMeta;
  }

  public static async togglePack(id: string): Promise<void> {
    const p = this.availablePacks.find((x) => x.id === id);
    if (!p) return;
    p.enabled = !p.enabled;
    await this.savePack(p);
    await this.refreshActiveOverrides();
  }

  /**
   * Reads all enabled resource packs and populates activePackOverrides map
   * with Blob URLs for textures and sounds.
   */
  public static async refreshActiveOverrides(): Promise<void> {
    // Revoke old blob URLs
    for (const [, url] of this.activePackOverrides) {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    }
    this.activePackOverrides.clear();

    const enabledPacks = this.availablePacks.filter((p) => p.enabled);
    for (const pack of enabledPacks) {
      if (!pack.zipData) continue;
      try {
        const zip = await JSZip.loadAsync(pack.zipData);
        for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
          if (zipEntry.dir) continue;
          // Look for textures e.g. assets/minecraft/textures/block/stone.png
          if (relativePath.startsWith('assets/minecraft/textures/') || relativePath.startsWith('assets/minecraft/sounds/')) {
            const blob = await zipEntry.async('blob');
            const blobUrl = URL.createObjectURL(blob);
            const standardUrl = '/' + relativePath;
            this.activePackOverrides.set(standardUrl, blobUrl);
          }
        }
      } catch (err) {
        console.warn('Error reading pack zip:', pack.name, err);
      }
    }
  }

  public static getOverride(url: string): string | undefined {
    return this.activePackOverrides.get(url);
  }
}
