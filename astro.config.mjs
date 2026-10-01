import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import { legacyRedirects } from './src/data/redirects.ts'

const SITE = 'https://www.app-concept.de'
const excluded = new Set([...Object.keys(legacyRedirects).map((path) => `/${path}/`), '/404/'])

// Schreibt dist/.htaccess für den Webspace bei dogado: eigene 404-Seite,
// app-concept.de → www und echte 301-Weiterleitungen für die alten URLs.
// `NE` verhindert, dass Apache das `#` in Zielen wie /#leistungen kodiert.
function htaccess() {
  return {
    name: 'appconcept-htaccess',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const lines = [
          '# Erzeugt beim Build aus astro.config.mjs und src/data/redirects.ts – nicht von Hand bearbeiten.',
          'ErrorDocument 404 /404.html',
          'RewriteEngine On',
          'RewriteCond %{HTTP_HOST} ^app-concept\\.de$ [NC]',
          `RewriteRule ^ ${SITE}%{REQUEST_URI} [R=301,L,NE]`,
          ...Object.entries(legacyRedirects).map(
            ([path, target]) => `RewriteRule ^${path.replaceAll('.', '\\.')}/?$ ${SITE}${target} [R=301,L,NE]`,
          ),
        ]
        await writeFile(new URL('.htaccess', dir), `${lines.join('\n')}\n`)
      },
    },
  }
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !excluded.has(new URL(page).pathname) }), htaccess()],
  vite: { plugins: [tailwindcss()] },
})
