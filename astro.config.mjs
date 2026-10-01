import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { legacyRedirects } from './src/data/redirects.ts'

const excluded = new Set([...Object.keys(legacyRedirects).map((path) => `/${path}/`), '/404/'])

export default defineConfig({
  site: 'https://www.app-concept.de',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !excluded.has(new URL(page).pathname) })],
  vite: { plugins: [tailwindcss()] },
})
