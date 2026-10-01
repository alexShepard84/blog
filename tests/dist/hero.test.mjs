import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'
import { site } from '../../src/data/site.ts'
import { bookingHref } from '../../src/lib/contact.ts'

test('Hero: genau eine H1 mit der Kernbotschaft', async () => {
  const doc = await documentFor('index.html')
  const headings = doc.querySelectorAll('h1')
  assert.equal(headings.length, 1)
  assert.equal(text(headings[0]), 'Ihr Betrieb läuft auf Excel? Das geht einfacher.')
})

test('Hero: Begrüßung nennt Limburg', async () => {
  const doc = await documentFor('index.html')
  assert.match(text(doc.getElementById('top')), /Hallo, ich bin Alex – Softwareentwickler aus Limburg\./)
})

test('Hero: Porträt als AVIF/WebP mit Alt-Text, sofort geladen', async () => {
  const doc = await documentFor('index.html')
  const img = doc.querySelector('#top picture img')
  assert.match(img.getAttribute('alt'), /Alexander Schäfer/)
  assert.equal(img.getAttribute('loading'), 'eager')
  const types = [...doc.querySelectorAll('#top picture source')].map((source) => source.getAttribute('type'))
  assert.ok(types.includes('image/avif'), 'AVIF fehlt')
  assert.ok(types.includes('image/webp'), 'WebP fehlt')
})

test('Hero: CTAs zum Erstgespräch und zu den Projekten', async () => {
  const doc = await documentFor('index.html')
  const links = [...doc.querySelectorAll('#top a')]
  const primary = links.find((a) => text(a) === 'Kostenloses Erstgespräch')
  assert.equal(primary.getAttribute('href'), bookingHref(site.calUrl, site.email))
  assert.ok(links.some((a) => a.getAttribute('href') === '/#projekte'))
})
