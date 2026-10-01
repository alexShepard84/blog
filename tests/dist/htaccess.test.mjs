import test from 'node:test'
import assert from 'node:assert/strict'
import { readDist } from '../helpers/dist.mjs'
import { legacyRedirects } from '../../src/data/redirects.ts'

// dogado wertet .htaccess aus: eigene 404-Seite, Domain ohne www → www und echte
// 301-Weiterleitungen für alte URLs. Die Meta-Refresh-Seiten bleiben als Rückfall.
test('.htaccess bindet die eigene 404-Seite ein', async () => {
  assert.match(await readDist('.htaccess'), /^ErrorDocument 404 \/404\.html$/m)
})

test('.htaccess leitet app-concept.de dauerhaft auf www um', async () => {
  const lines = (await readDist('.htaccess')).split('\n')
  const index = lines.indexOf('RewriteCond %{HTTP_HOST} ^app-concept\\.de$ [NC]')
  assert.ok(index > 0, 'Host-Bedingung fehlt')
  assert.equal(lines[index + 1], 'RewriteRule ^ https://www.app-concept.de%{REQUEST_URI} [R=301,L,NE]')
})

test('.htaccess enthält für jede alte URL eine 301-Weiterleitung', async () => {
  const htaccess = await readDist('.htaccess')
  for (const [path, target] of Object.entries(legacyRedirects)) {
    const rule = `RewriteRule ^${path.replaceAll('.', '\\.')}/?$ https://www.app-concept.de${target} [R=301,L,NE]`
    assert.ok(htaccess.includes(rule), rule)
  }
})
