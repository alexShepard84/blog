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

test('Werdegang ist entfernt', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('ueber')
  assert.equal(section.querySelector('ol'), null)
  assert.equal(text(section).includes('Werdegang'), false)
})
