import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  // Use /DepNavWeb/ for production (GitHub Pages), / for development
  base: mode === 'production' ? '/DepNavWeb/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}));
