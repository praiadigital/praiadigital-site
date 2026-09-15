import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://praia.digital',
  trailingSlash: 'always',
  build: {
    format: 'file'
  },
  compressHTML: true,
  integrations: [sitemap()]
});
