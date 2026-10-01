import test from 'node:test'
import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { distFile, documentFor, htmlFiles, text } from '../helpers/dist.mjs'
import { PLACEHOLDER_PATTERN, findForbidden } from '../helpers/forbidden.mjs'
import { legacyRedirects } from '../../src/data/redirects.ts'

const legacy = new Set(Object.keys(legacyRedirects).map((path) => `${path}/index.html`))
const pages = (await htmlFiles()).filter((file) => !legacy.has(file))

async function exists(path) {
  try {
    await access(distFile(path))
    return true
  } catch {
    return false
  }
}

function fileFor(pathname) {
  if (pathname.endsWith('/')) return `${pathname}index.html`
  if (/\.[a-z0-9]+$/i.test(pathname)) return pathname
  return `${pathname}/index.html`
}

test('es werden mindestens Startseite, Impressum, Datenschutz und 404 geprüft', () => {
  for (const page of ['index.html', 'impressum/index.html', 'datenschutz/index.html', '404.html']) {
    assert.ok(pages.includes(page), page)
  }
})

test('kein Seitentext enthält private Angaben oder Platzhalter', async () => {
  for (const page of pages) {
    const doc = await documentFor(page)
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    const visible = `${doc.title} ${description} ${text(doc.body)}`
    assert.deepEqual(findForbidden(visible), [], page)
    assert.doesNotMatch(visible, PLACEHOLDER_PATTERN, page)
  }
})

test('jedes Bild hat einen Alt-Text', async () => {
  for (const page of pages) {
    const doc = await documentFor(page)
    for (const img of doc.querySelectorAll('img')) {
      assert.ok((img.getAttribute('alt') ?? '').trim().length > 0, `${page}: ${img.getAttribute('src')}`)
    }
  }
})

test('alle internen Links und Anker führen zu einem Ziel', async () => {
  const index = await documentFor('index.html')
  const indexIds = new Set([...index.querySelectorAll('[id]')].map((element) => element.id))
  for (const page of pages) {
    const doc = await documentFor(page)
    const ids = new Set([...doc.querySelectorAll('[id]')].map((element) => element.id))
    for (const link of doc.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href')
      if (href.startsWith('#')) {
        assert.ok(ids.has(href.slice(1)), `${page}: ${href}`)
        continue
      }
      if (!href.startsWith('/')) continue
      const url = new URL(href, 'https://www.app-concept.de')
      if (url.hash) {
        assert.equal(url.pathname, '/', `${page}: ${href}`)
        assert.ok(indexIds.has(url.hash.slice(1)), `${page}: ${href}`)
      }
      assert.ok(await exists(fileFor(url.pathname)), `${page}: ${href}`)
    }
  }
})
