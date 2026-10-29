/**
 * Automatic Base-Path Asset URL Resolver for GitHub Pages & Subpath Deployments.
 * Ensures all root-relative `/assets/...`, `/sounds/...`, `/data/...`, and `/*.json` requests
 * automatically resolve relative to the deployment subpath (e.g. `/Minecraft-Web-Port/`).
 */

const BASE_PATH = (() => {
  try {
    const p = new URL('.', window.location.href).pathname;
    return p.endsWith('/') ? p : `${p}/`;
  } catch {
    return '/';
  }
})();

const ASSET_PREFIXES = [
  '/assets/',
  '/sounds/',
  '/data/',
  '/blocks_summary.json',
  '/registries.json',
  '/packets.json',
  '/abandoned_camp_structures.json',
  '/resolved_block_models.json',
  '/resolved_item_models.json',
  '/servers.dat',
  '/servers.json',
];

export function resolveAssetUrl(url: string): string {
  if (!url || BASE_PATH === '/' || url.startsWith(BASE_PATH)) {
    return url;
  }
  for (const prefix of ASSET_PREFIXES) {
    if (url.startsWith(prefix)) {
      return BASE_PATH + url.slice(1);
    }
  }
  return url;
}

export function installGitHubPagesAssetInterceptor(): void {
  if (BASE_PATH === '/') return;

  // 1. Intercept window.fetch for JSON / binary asset loads
  const origFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === 'string') {
      input = resolveAssetUrl(input);
    } else if (input instanceof URL && input.origin === window.location.origin) {
      const rewritten = resolveAssetUrl(input.pathname);
      if (rewritten !== input.pathname) {
        input = new URL(rewritten + input.search + input.hash, window.location.origin);
      }
    }
    return origFetch(input, init);
  };

  // 2. Intercept HTMLImageElement.prototype.src for 2D GUI & Three.js TextureLoader images
  const imgSrcDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (imgSrcDesc && imgSrcDesc.set && imgSrcDesc.get) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      enumerable: true,
      get() {
        return imgSrcDesc.get!.call(this);
      },
      set(val: string) {
        imgSrcDesc.set!.call(this, typeof val === 'string' ? resolveAssetUrl(val) : val);
      },
    });
  }

  // 3. Intercept HTMLMediaElement.prototype.src & Audio constructor for .ogg sounds
  const mediaSrcDesc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'src');
  if (mediaSrcDesc && mediaSrcDesc.set && mediaSrcDesc.get) {
    Object.defineProperty(HTMLMediaElement.prototype, 'src', {
      configurable: true,
      enumerable: true,
      get() {
        return mediaSrcDesc.get!.call(this);
      },
      set(val: string) {
        mediaSrcDesc.set!.call(this, typeof val === 'string' ? resolveAssetUrl(val) : val);
      },
    });
  }

  const OrigAudio = window.Audio;
  const WrappedAudio = function (this: HTMLAudioElement, src?: string) {
    return new OrigAudio(src ? resolveAssetUrl(src) : undefined);
  } as unknown as typeof Audio;
  WrappedAudio.prototype = OrigAudio.prototype;
  window.Audio = WrappedAudio;
}
