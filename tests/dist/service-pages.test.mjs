import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, htmlFiles, readDist, text } from '../helpers/dist.mjs'

const paths = ['/ios-freelancer/', '/software-automatisierung/']

test('beide Leistungsseiten sind als eigenständige, indexierbare Seiten erreichbar', async () => {
  const files = await htmlFiles()
  const titles = new Set()
  const descriptions = new Set()
  for (const path of paths) {
    const file = `${path.slice(1)}index.html`
    assert.ok(files.includes(file), `Leistungsseite fehlt: ${path}`)
    const doc = await documentFor(file)
    assert.equal(doc.querySelectorAll('h1').length, 1, path)
    assert.equal(doc.querySelector('meta[name="robots"]'), null, path)
    assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), `https://www.app-concept.de${path}`)
    assert.equal(doc.querySelector('meta[property="og:url"]')?.getAttribute('content'), `https://www.app-concept.de${path}`)
    assert.ok(doc.title.trim().length > 0, path)
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content')
    assert.ok(description?.trim(), path)
    titles.add(doc.title)
    descriptions.add(description)
    assert.ok(doc.querySelector('main a[href^="mailto:"]'), `Kontakt fehlt: ${path}`)
    assert.ok(text(doc.querySelector('main')).includes('Alexander Schäfer'), `Ansprechpartner fehlt: ${path}`)
    for (const heading of ['Leistungen', 'Praxis', 'Zusammenarbeit', 'Fragen']) {
      assert.ok([...doc.querySelectorAll('h2')].some((h) => text(h).includes(heading)), `${path}: ${heading}`)
    }
  }
  assert.equal(titles.size, paths.length, 'Titel müssen eindeutig sein')
  assert.equal(descriptions.size, paths.length, 'Beschreibungen müssen eindeutig sein')
})

test('Leistungsseiten sind von der Startseite und gegenseitig verlinkt sowie in der Sitemap', async () => {
  const home = await documentFor()
  const sitemap = await readDist('sitemap-0.xml')
  for (const path of paths) {
    assert.ok(home.querySelector(`#leistungen a[href="${path}"]`), `Link fehlt: ${path}`)
    assert.ok(sitemap.includes(`<loc>https://www.app-concept.de${path}</loc>`), `Sitemap: ${path}`)
    const other = paths.find((p) => p !== path)
    const doc = await documentFor(`${path.slice(1)}index.html`)
    assert.ok(doc.querySelector(`main a[href="${other}"]`), `Querverweis fehlt: ${path}`)
  }
})
