import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'

test('Projekte: fünf Einträge in fester Reihenfolge', async () => {
  const doc = await documentFor('index.html')
  const articles = [...doc.querySelectorAll('#projekte article')]
  assert.deepEqual(articles.map((article) => article.getAttribute('data-project')), [
    'mobistro',
    'crew',
    'botane',
    'rtlplus',
    'charging',
  ])
  assert.deepEqual(articles.map((article) => text(article.querySelector('h3'))), [
    'Mobistro',
    'Crew-App für eine Fluggesellschaft',
    'BOTANÉ Eventstudio',
    'RTL+',
    'Lade-App für einen Sportwagenhersteller',
  ])
})

test('Mobistro zeigt einen Screenshot mit Alt-Text', async () => {
  const doc = await documentFor('index.html')
  const img = doc.querySelector('article[data-project="mobistro"] img')
  assert.equal(img.getAttribute('alt'), 'Dashboard der Mobistro-Web-App')
  assert.equal(img.getAttribute('loading'), 'lazy')
})

test('Projekte ohne Bild zeigen eine dekorative Fläche statt eines Platzhalters', async () => {
  const doc = await documentFor('index.html')
  for (const article of doc.querySelectorAll('#projekte article')) {
    if (article.querySelector('img')) continue
    const fallback = article.querySelector('[data-fallback]')
    assert.ok(fallback, `${article.getAttribute('data-project')}: weder Bild noch Fläche`)
    assert.equal(fallback.getAttribute('aria-hidden'), 'true')
  }
})

test('BOTANÉ verlinkt die Website in neuem Tab', async () => {
  const doc = await documentFor('index.html')
  const link = doc.querySelector('article[data-project="botane"] a[href="https://botane.events"]')
  assert.equal(link.getAttribute('target'), '_blank')
  assert.match(link.getAttribute('rel'), /noopener/)
})

test('Kundenzeile unter den Projekten', async () => {
  const doc = await documentFor('index.html')
  assert.match(text(doc.getElementById('projekte')), /Gearbeitet für RTL Deutschland, Bergfeld Software/)
})
