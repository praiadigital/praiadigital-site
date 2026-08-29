import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://praia.digital',
  trailingSlash: 'always',
  build: {
    format: 'file'
  },
  compressHTML: true
});
