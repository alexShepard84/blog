import test from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

// Gegen einen echten Apache bzw. das Deployment ausführen, nicht Astro Preview:
// SEO_BASE_URL=http://127.0.0.1:4328 node --test tests/http/cache.test.mjs
assert.ok(process.env.SEO_BASE_URL, 'SEO_BASE_URL muss auf den zu prüfenden HTTP-Server zeigen')
const origin = new URL(process.env.SEO_BASE_URL).origin
const request = (path, options = {}) => fetch(new URL(path, origin), { ...options, signal: AbortSignal.timeout(15000) })
const home = await request('/')
assert.equal(home.status, 200)
const doc = new JSDOM(await home.text()).window.document
const stylesheet = doc.querySelector('link[rel="stylesheet"]')?.getAttribute('href')
assert.ok(stylesheet?.startsWith('/_astro/'), 'Versioniertes Stylesheet fehlt')
const immutable = 'public, max-age=31536000, immutable'

test('HTML und Crawl-Dateien werden revalidiert', async () => {
  for (const path of ['/', '/ios-freelancer/', '/software-automatisierung/', '/sitemap-0.xml', '/robots.txt']) {
    const response = await request(path)
    assert.equal(response.status, 200, path)
    assert.equal(response.headers.get('cache-control'), 'no-cache', path)
    await response.arrayBuffer()
  }
})

test('öffentliche Assets ohne Hash erhalten keinen unveränderlichen Jahrescache', async () => {
  for (const path of ['/og-image.jpg', '/favicon.svg']) {
    const response = await request(path)
    assert.equal(response.status, 200, path)
    assert.equal(response.headers.get('cache-control'), 'public, max-age=3600', path)
    await response.arrayBuffer()
  }
})

test('versionierte Assets behalten ihre Cache-Policy auch nach 304-Revalidierung', async () => {
  const response = await request(stylesheet)
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('cache-control'), immutable)
  const etag = response.headers.get('etag')
  assert.ok(etag, 'ETag für bedingten Request fehlt')
  await response.arrayBuffer()
  const conditional = await request(stylesheet, { headers: { 'If-None-Match': etag } })
  assert.equal(conditional.status, 304)
  assert.equal(conditional.headers.get('cache-control'), immutable)
})

test('fehlende Assets werden nicht langfristig gecacht', async () => {
  const response = await request('/_astro/seo-cache-check-missing.css')
  assert.equal(response.status, 404)
  assert.equal(response.headers.get('cache-control'), 'no-cache')
  await response.arrayBuffer()
})
