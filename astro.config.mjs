// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // User site served from the domain root — do NOT set `base`.
  site: 'https://ruhi-donda.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
