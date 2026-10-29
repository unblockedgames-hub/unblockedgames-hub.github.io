import { installGitHubPagesAssetInterceptor } from './core/AssetPath';
import { Game } from './Game';

installGitHubPagesAssetInterceptor();

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const uiRoot = document.getElementById('ui-root') as HTMLElement;
  if (canvas && uiRoot) {
    new Game(canvas, uiRoot);
  }
});
