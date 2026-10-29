import { defineConfig } from 'vite';
import { attachWispServer, startEmbeddedMC26Server } from './scripts/wisp-server.mjs';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    {
      name: 'wispcraft-wisp-server-plugin',
      configureServer(server) {
        if (!server.httpServer) return;
        startEmbeddedMC26Server(25565).then(({ port }) => {
          console.log(`[Wispcraft] Embedded Minecraft 26.3 (Protocol 777) TCP Server listening on 127.0.0.1:${port}`);
          attachWispServer(server.httpServer, port);
          console.log(`[Wispcraft] Wisp v1/v2 WebSocket Proxy attached at ws://localhost:3000/wisp/`);
        });
      },
      configurePreviewServer(server) {
        if (!server.httpServer) return;
        startEmbeddedMC26Server(25565).then(({ port }) => {
          attachWispServer(server.httpServer, port);
        });
      },
    },
  ],
});
