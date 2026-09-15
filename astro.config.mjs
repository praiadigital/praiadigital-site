import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages serves this repo under the /praiadigital-site subpath.
// `base` makes Astro prefix every root-absolute href/src in templates automatically.
export default defineConfig({
  site: 'https://praiadigital.github.io',
  base: '/praiadigital-site',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  compressHTML: true,
  integrations: [sitemap()]
});
