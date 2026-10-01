import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { distFile, documentFor, readDist } from '../helpers/dist.mjs'

// Lange deutsche Komposita („Sportwagenhersteller“) dürfen auf 375 px nicht
// über den Rand laufen: Überschriften trennen, alles andere bricht notfalls um.
async function allCss() {
  const doc = await documentFor('index.html')
  const inline = [...doc.querySelectorAll('style')].map((style) => style.textContent)
  const files = (await readdir(distFile('_astro/'))).filter((name) => name.endsWith('.css'))
  const external = await Promise.all(files.map((name) => readDist(`_astro/${name}`)))
  return [...inline, ...external].join('\n')
}

test('Überschriften werden getrennt, Text bricht notfalls um', async () => {
  const css = (await allCss()).replace(/\s+/g, '')
  assert.match(css, /h1,h2,h3\{[^}]*hyphens:auto/)
  assert.match(css, /body\{[^}]*overflow-wrap:break-word/)
})

test('lange Titel in Ersatzflächen werden getrennt', async () => {
  const doc = await documentFor('index.html')
  for (const span of doc.querySelectorAll('[data-fallback] span:last-child')) {
    assert.ok(span.classList.contains('hyphens-auto'), (span.textContent ?? '').trim())
  }
})
