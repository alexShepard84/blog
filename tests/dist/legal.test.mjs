import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, readDist, text } from '../helpers/dist.mjs'
import { site } from '../../src/data/site.ts'

test('Impressum nach § 5 DDG mit allen Pflichtangaben', async () => {
  const doc = await documentFor('impressum/index.html')
  const body = text(doc.body)
  assert.equal(text(doc.querySelector('h1')), 'Impressum')
  assert.match(body, /§ 5 DDG/)
  assert.match(body, /Nauheimer Weg 9a/)
  assert.match(body, /65550 Limburg an der Lahn/)
  assert.match(body, /DE 256081457/)
  assert.ok(doc.querySelector(`main a[href="mailto:${site.email}"]`))
  assert.equal(body.includes('TMG'), false)
  assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://www.app-concept.de/impressum/')
})

test('Datenschutz nennt GitHub Pages, USA-Übermittlung, E-Mail und Beschwerderecht', async () => {
  const doc = await documentFor('datenschutz/index.html')
  const body = text(doc.body)
  assert.equal(text(doc.querySelector('h1')), 'Datenschutzerklärung')
  for (const phrase of [
    'GitHub, Inc.',
    'Data Privacy Framework',
    'Art. 6 Abs. 1 lit. f DSGVO',
    'Microsoft',
    'keine Cookies',
    'Hessische Beauftragte für Datenschutz und Informationsfreiheit',
  ]) {
    assert.ok(body.includes(phrase), `fehlt: ${phrase}`)
  }
  assert.equal(body.includes('Cal.com'), Boolean(site.calUrl))
})

test('404-Seite ist nicht indexierbar und führt zur Startseite', async () => {
  const doc = await documentFor('404.html')
  assert.equal(doc.querySelector('meta[name="robots"]')?.getAttribute('content'), 'noindex')
  assert.equal(doc.querySelector('link[rel="canonical"]'), null)
  assert.ok(doc.querySelector('main a[href="/"]'))
  assert.equal(doc.querySelector('.raster-bg'), null)
})

test('Sitemap enthält Impressum und Datenschutz, aber keine 404', async () => {
  const urls = await readDist('sitemap-0.xml')
  assert.match(urls, /<loc>https:\/\/www\.app-concept\.de\/impressum\/<\/loc>/)
  assert.match(urls, /<loc>https:\/\/www\.app-concept\.de\/datenschutz\/<\/loc>/)
  assert.equal(urls.includes('404'), false)
})
