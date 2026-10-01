import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, readDist } from '../helpers/dist.mjs'
import { legacyRedirects } from '../../src/data/redirects.ts'

test('alle alten Jekyll-URLs sind abgedeckt', () => {
  assert.deepEqual(Object.keys(legacyRedirects).sort(), [
    'blog',
    'contact',
    'hire',
    'imprint',
    'ios/2017/02/05/skstorereviewcontroller',
    'privacy',
    'thanks',
  ])
})

for (const [path, target] of Object.entries(legacyRedirects)) {
  test(`/${path}/ leitet auf ${target} weiter`, async () => {
    const doc = await documentFor(`${path}/index.html`)
    assert.equal(doc.querySelector('meta[http-equiv="refresh"]')?.getAttribute('content'), `0; url=${target}`)
    assert.equal(doc.querySelector('meta[name="robots"]')?.getAttribute('content'), 'noindex')
    assert.equal(doc.querySelector('a')?.getAttribute('href'), target)
  })
}

test('Sitemap enthält keine Weiterleitungen', async () => {
  const urls = await readDist('sitemap-0.xml')
  for (const path of Object.keys(legacyRedirects)) {
    assert.equal(urls.includes(`/${path}/`), false, path)
  }
})
