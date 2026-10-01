import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor } from '../helpers/dist.mjs'

test('Startseite: Sprache, Titel und Beschreibung nennen die Region', async () => {
  const doc = await documentFor('index.html')
  assert.equal(doc.documentElement.lang, 'de')
  assert.match(doc.title, /Limburg/)
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
  assert.match(description, /Kreis Limburg-Weilburg/)
})

test('Startseite: Canonical und Open Graph zeigen auf www.app-concept.de', async () => {
  const doc = await documentFor('index.html')
  assert.equal(doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://www.app-concept.de/')
  assert.equal(doc.querySelector('meta[property="og:url"]')?.getAttribute('content'), 'https://www.app-concept.de/')
  assert.equal(doc.querySelector('meta[property="og:image"]')?.getAttribute('content'), 'https://www.app-concept.de/og-image.png')
  assert.equal(doc.querySelector('meta[name="robots"]'), null)
})

test('Startseite enthält genau ein gültiges LocalBusiness-JSON-LD', async () => {
  const doc = await documentFor('index.html')
  const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')]
  assert.equal(scripts.length, 1)
  const data = JSON.parse(scripts[0].textContent)
  assert.equal(data['@type'], 'ProfessionalService')
  assert.equal(data.address.addressLocality, 'Limburg an der Lahn')
})
