import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'
import { contact, site } from '../../src/data/site.ts'
import { bookingHref } from '../../src/lib/contact.ts'

test('FAQ: fünf Fragen als Definitionsliste', async () => {
  const doc = await documentFor('index.html')
  const questions = [...doc.querySelectorAll('#faq dt')].map(text)
  assert.equal(questions.length, 5)
  assert.ok(questions.includes('Kommen Sie auch vor Ort?'))
  assert.equal(doc.querySelectorAll('#faq dd').length, 5)
})

test('FAQ: Vor-Ort-Antwort nennt Orte im Kreis', async () => {
  const doc = await documentFor('index.html')
  const answer = [...doc.querySelectorAll('#faq dd')].map(text).find((value) => value.includes('Kreis Limburg-Weilburg'))
  assert.match(answer, /Weilburg/)
  assert.match(answer, /Bad Camberg/)
})

test('Kontakt: Beschriftung passt zum Ziel des Buttons', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('kontakt')
  const href = bookingHref(site.calUrl, site.email)
  const cta = section.querySelector(`a[href="${href}"]`)
  assert.ok(cta, 'CTA fehlt')
  assert.equal(text(cta), href.startsWith('mailto:') ? contact.ctaMail : contact.ctaBooking)
})

test('Kontakt: E-Mail-Link und Region', async () => {
  const doc = await documentFor('index.html')
  const section = doc.getElementById('kontakt')
  assert.ok(section.querySelector(`a[href="mailto:${site.email}"]`))
  assert.match(text(section), /Vor Ort im Kreis Limburg-Weilburg/)
})
