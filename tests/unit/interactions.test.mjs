import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'
import { JSDOM } from 'jsdom'

const source = ts.transpileModule(await readFile(new URL('../../src/scripts/site.ts', import.meta.url), 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText

function page({ reduced = false, observerAvailable = true } = {}) {
  const dom = new JSDOM(`<!doctype html><html><body>
    <header><details><summary>Menü</summary><nav><a href="#ablauf">Ablauf</a></nav></details></header>
    <main><section id="ablauf"><ol data-motion-once><li>Erstgespräch</li><li>Umsetzung</li></ol></section></main>
  </body></html>`, { runScripts: 'outside-only' })
  const preference = new dom.window.EventTarget()
  preference.matches = reduced
  dom.window.matchMedia = () => preference
  const observers = []
  if (observerAvailable) {
    dom.window.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this) }
      observe(target) { this.targets.add(target) }
      unobserve(target) { this.targets.delete(target) }
      disconnect() { this.targets.clear() }
    }
  }
  dom.window.eval(source)
  return { dom, doc: dom.window.document, preference, observers }
}

test('Escape schließt das mobile Menü und gibt den Fokus zurück', () => {
  const { dom, doc } = page()
  const menu = doc.querySelector('details')
  menu.open = true
  menu.querySelector('a').focus()
  doc.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  assert.equal(menu.open, false)
  assert.equal(doc.activeElement, menu.querySelector('summary'))
  dom.window.close()
})

test('Klick außerhalb schließt ein offenes Menü', () => {
  const { dom, doc } = page()
  const menu = doc.querySelector('details')
  menu.open = true
  doc.querySelector('main').dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))
  assert.equal(menu.open, false)
  dom.window.close()
})

test('Ablaufanimation startet einmal bei Sichtbarkeit und blendet keine Inhalte aus', () => {
  const { dom, doc, observers } = page()
  const flow = doc.querySelector('[data-motion-once]')
  const observer = observers.find((item) => item.targets.has(flow))
  assert.ok(observer, 'Ablauf wird nicht beobachtet')
  observer.callback([{ target: flow, isIntersecting: true }])
  assert.equal(flow.dataset.motion, 'played')
  assert.equal(observer.targets.has(flow), false, 'Animation würde erneut starten')
  assert.equal(doc.documentElement.classList.contains('reveal-ready'), false)
  dom.window.close()
})

test('reduzierte Bewegung überspringt die Ablaufanimation', () => {
  const { dom, doc, observers } = page({ reduced: true })
  assert.equal(observers.length, 0)
  assert.equal(doc.querySelector('[data-motion-once]').dataset.motion, undefined)
  assert.equal(doc.querySelector('main').textContent.includes('Erstgespräch'), true)
  dom.window.close()
})

test('Wechsel zu reduzierter Bewegung beendet Animation und ausstehende Beobachtung', () => {
  const { dom, doc, preference, observers } = page()
  const flow = doc.querySelector('[data-motion-once]')
  const observer = observers.find((item) => item.targets.has(flow))
  assert.ok(observer, 'Ablauf wird nicht beobachtet')
  observer.callback([{ target: flow, isIntersecting: true }])
  preference.matches = true
  preference.dispatchEvent(new dom.window.Event('change'))
  assert.equal(flow.dataset.motion, undefined)
  assert.equal(observer.targets.size, 0)
  dom.window.close()
})

test('ohne IntersectionObserver bleibt die Seite vollständig sichtbar', () => {
  const { dom, doc } = page({ observerAvailable: false })
  assert.equal(doc.documentElement.classList.contains('reveal-ready'), false)
  assert.equal(doc.querySelector('[data-motion-once]').dataset.motion, undefined)
  dom.window.close()
})
