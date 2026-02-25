import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  ssr: {
    external: [
      'pg',            // Core Postgres driver
      'pg-native',     // Optional native bindings
      'pg-cloudflare'  // Cloudflare sockets variant
    ]
  },
  build: {
    rollupOptions: {
      external: [
        'pg',            // Core Postgres driver
        'pg-native',     // Optional native bindings
        'pg-cloudflare'  // Cloudflare sockets variant
      ]
    }
  }
});
