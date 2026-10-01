import test from 'node:test'
import assert from 'node:assert/strict'
import { findForbidden, loadPrivateTerms, parseTerms } from '../helpers/forbidden.mjs'

const missing = new URL('./does-not-exist.txt', import.meta.url)

test('öffentliche Sperrbegriffe werden gefunden', () => {
  assert.deepEqual(findForbidden('Hosting in der EU inklusive', []), ['Hosting in der EU'])
})

test('private Sperrbegriffe werden ohne Klartext gemeldet, unabhängig von Groß-/Kleinschreibung', () => {
  assert.deepEqual(findForbidden('Ein Projekt für ACME Corp.', ['acme corp']), ['privater Sperrbegriff Nr. 1'])
})

test('Stundensätze werden in jeder Schreibweise erkannt', () => {
  for (const text of ['95 €/h', '95€ pro Stunde', '120 EUR je Std.']) {
    assert.deepEqual(findForbidden(text, []), ['Stundensatz-Angabe'], text)
  }
  assert.deepEqual(findForbidden('Seit 2014 mit Swift, Festpreis oder nach Aufwand', []), [])
})

test('parseTerms liest eine Zeile oder ein Komma pro Begriff und ignoriert Kommentare', () => {
  assert.deepEqual(parseTerms('# Kommentar\nAlpha\n\nBeta, Gamma\n'), ['Alpha', 'Beta', 'Gamma'])
})

test('private Begriffe kommen aus FORBIDDEN_TERMS', () => {
  assert.deepEqual(loadPrivateTerms({ FORBIDDEN_TERMS: 'Alpha\nBeta' }, missing), ['Alpha', 'Beta'])
})

test('ohne Liste: lokal leer, in CI ein Fehler', () => {
  assert.deepEqual(loadPrivateTerms({}, missing), [])
  assert.throws(() => loadPrivateTerms({ CI: 'true' }, missing), /FORBIDDEN_TERMS/)
})
