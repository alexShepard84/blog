import test from 'node:test'
import assert from 'node:assert/strict'
import { pngSize, readDist } from '../helpers/dist.mjs'

test('robots.txt erlaubt alles und nennt die Sitemap', async () => {
  const robots = await readDist('robots.txt')
  assert.match(robots, /User-agent: \*/)
  assert.match(robots, /Sitemap: https:\/\/www\.app-concept\.de\/sitemap-index\.xml/)
})

test('Sitemap enthält die Startseite unter www.app-concept.de', async () => {
  const index = await readDist('sitemap-index.xml')
  assert.match(index, /https:\/\/www\.app-concept\.de\/sitemap-0\.xml/)
  const urls = await readDist('sitemap-0.xml')
  assert.match(urls, /<loc>https:\/\/www\.app-concept\.de\/<\/loc>/)
})

test('Favicon, Touch-Icon und OG-Bild liegen in der richtigen Größe vor', async () => {
  assert.match(await readDist('favicon.svg'), /<svg/)
  assert.deepEqual(await pngSize('apple-touch-icon.png'), { width: 180, height: 180 })
  assert.deepEqual(await pngSize('og-image.png'), { width: 1200, height: 630 })
})
