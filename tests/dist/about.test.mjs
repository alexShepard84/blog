import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'

test('Über mich: Geschichte und Region', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('ueber')
  assert.equal(text(section.querySelector('h2')), 'Über mich')
  assert.match(text(section), /Ich habe Apps für RTL gebaut/)
  assert.match(text(section), /Kreis Limburg-Weilburg/)
})

test('Über mich: drei Grundsätze', async () => {
  const doc = await documentFor('index.html')
  const titles = [...doc.querySelectorAll('#ueber ul > li h3')].map(text)
  assert.deepEqual(titles, ['Ehrlich statt Buzzwords', 'Erst verstehen, dann bauen', 'Software, die bleibt'])
})

test('Werdegang: acht Stationen, „Heute“ ist der aktuelle Schritt', async () => {
  const doc = await documentFor('index.html')
  const entries = [...doc.querySelectorAll('#ueber ol > li')]
  assert.deepEqual(entries.map((entry) => text(entry.querySelector('span'))), [
    '2005',
    '2011',
    '2014',
    '2015',
    '2018',
    '2020',
    '2024',
    'Heute',
  ])
  assert.deepEqual(
    entries.map((entry) => entry.getAttribute('aria-current')),
    [null, null, null, null, null, null, null, 'step'],
  )
})
