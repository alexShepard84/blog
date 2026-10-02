import { mkdir, writeFile } from 'node:fs/promises'
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
          // Öffentliche Dateien ohne Inhalts-Hash bleiben kurz cachebar.
          '<IfModule mod_headers.c>',
          '  <FilesMatch "\\.(?:svg|png|jpe?g|webp|avif|ico|woff2?|css|js)$">',
          '    Header set Cache-Control "public, max-age=3600"',
          '  </FilesMatch>',
          '  <FilesMatch "\\.(?:html|xml|txt)$">',
          '    Header set Cache-Control "no-cache"',
          '  </FilesMatch>',
          '</IfModule>',
          'RewriteEngine On',
          'RewriteCond %{HTTP_HOST} ^app-concept\\.de$ [NC]',
          `RewriteRule ^ ${SITE}%{REQUEST_URI} [R=301,L,NE]`,
          ...Object.entries(legacyRedirects).map(
            ([path, target]) => `RewriteRule ^${path.replaceAll('.', '\\.')}/?$ ${SITE}${target} [R=301,L,NE]`,
          ),
        ]
        await writeFile(new URL('.htaccess', dir), `${lines.join('\n')}\n`)
        // Astro erzeugt hier versionierte Assets. Eine neue Datei erhält eine
        // neue URL; die lange Laufzeit gilt ausdrücklich nicht für HTML.
        await mkdir(new URL('_astro/', dir), { recursive: true })
        await writeFile(new URL('_astro/.htaccess', dir), [
          '# Nur von Astro erzeugte, versionierte Assets.',
          '<IfModule mod_headers.c>',
          '  <FilesMatch "\\.(?:css|js|woff2?|avif|webp|jpe?g|png|svg)$">',
          '    Header set Cache-Control "public, max-age=31536000, immutable" "expr=%{REQUEST_STATUS} == 200 || %{REQUEST_STATUS} == 304"',
          '  </FilesMatch>',
          '</IfModule>',
          '',
        ].join('\n'))
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
