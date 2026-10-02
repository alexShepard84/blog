import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'

test('Über mich: Geschichte und Region', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('ueber')
  assert.equal(text(section.querySelector('h2')), 'Über mich')
  assert.match(text(section), /seit 2005 selbstständig/)
  assert.match(text(section), /seit 2014.*iOS-Entwicklung/)
  assert.match(text(section), /Apps für RTL/)
  assert.match(text(section), /Kreis Limburg-Weilburg/)
})

test('Werdegang ist entfernt', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('ueber')
  assert.equal(section.querySelector('ol'), null)
  assert.equal(text(section).includes('Werdegang'), false)
})
