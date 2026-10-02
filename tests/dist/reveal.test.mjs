import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { distFile, documentFor, readDist } from '../helpers/dist.mjs'

test('ohne JavaScript ist nichts ausgeblendet', async () => {
  const doc = await documentFor('index.html')
  assert.equal(doc.querySelectorAll('[data-reveal]').length, 0)
  assert.equal(doc.documentElement.classList.contains('reveal-ready'), false)
})

test('Bewegung ist optional und versteckt keine ganzen Abschnitte', async () => {
  const doc = await documentFor('index.html')
  const inline = [...doc.querySelectorAll('style')].map((style) => style.textContent)
  const files = (await readdir(distFile('_astro/'))).filter((name) => name.endsWith('.css'))
  const external = await Promise.all(files.map((name) => readDist(`_astro/${name}`)))
  const css = [...inline, ...external].join('\n')
  assert.match(css, /prefers-reduced-motion:\s*no-preference/)
  assert.doesNotMatch(css, /\.reveal-ready/)
  assert.match(css, /connect-steps/)
})

test('Skript für Ablauf und Menü ist eingebunden', async () => {
  const doc = await documentFor('index.html')
  const modules = [...doc.querySelectorAll('script[type="module"]')]
  const code = await Promise.all(
    modules.map((script) => (script.getAttribute('src') ? readDist(script.getAttribute('src')) : script.textContent)),
  )
  assert.ok(code.some((source) => source.includes('data-motion-once') && source.includes('Escape')), 'Skript für Ablauf und Menü fehlt')
})
