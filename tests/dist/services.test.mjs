import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'
import { site, teamBoost } from '../../src/data/site.ts'
import { mailtoHref } from '../../src/lib/contact.ts'

test('Leistungen: vier Zeilen mit Nummer, Titel und Punkten', async () => {
  const doc = await documentFor('index.html')
  const rows = [...doc.querySelectorAll('#leistungen ol > li')]
  assert.deepEqual(rows.map((row) => text(row.querySelector('h3'))), [
    'KI-Beratung',
    'Automatisierung und individuelle Software',
    'Web-Entwicklung',
    'iOS-Entwicklung',
  ])
  assert.deepEqual(rows.map((row) => row.querySelectorAll('ul > li').length), [3, 4, 3, 3])
})

test('Web-Entwicklung verspricht kein Hosting in der EU', async () => {
  const doc = await documentFor('index.html')
  const section = text(doc.getElementById('leistungen'))
  assert.equal(section.includes('Hosting in der EU'), false)
  assert.match(section, /DSGVO-konform umgesetzt/)
})

test('Teamverstärkung fragt per E-Mail mit Betreff an', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('teamverstaerkung')
  assert.equal(text(section.querySelector('h2')), 'Sie haben schon ein Team?')
  const cta = [...section.querySelectorAll('a')].find((a) => text(a) === 'Verfügbarkeit anfragen')
  assert.equal(cta.getAttribute('href'), mailtoHref(site.email, teamBoost.mailSubject))
})

test('Ablauf: vier Zellen A1–D1, D1 ist hervorgehoben', async () => {
  const doc = await documentFor('index.html')
  const cells = [...doc.querySelectorAll('#ablauf ol > li')]
  assert.deepEqual(cells.map((cell) => text(cell.querySelector('span'))), ['A1', 'B1', 'C1', 'D1'])
  assert.deepEqual(cells.map((cell) => cell.getAttribute('data-active')), [null, null, null, 'true'])
})
