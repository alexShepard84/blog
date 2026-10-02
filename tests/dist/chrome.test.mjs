import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor, text } from '../helpers/dist.mjs'
import { contact, site } from '../../src/data/site.ts'
import { bookingHref } from '../../src/lib/contact.ts'

const sections = ['/#leistungen', '/#projekte', '/#ueber', '/#faq']

test('Header verlinkt alle Abschnitte', async () => {
  const doc = await documentFor('index.html')
  const nav = doc.querySelector('nav[aria-label="Hauptnavigation"]')
  assert.deepEqual([...nav.querySelectorAll('a')].map((a) => a.getAttribute('href')), sections)
})

test('Header-CTA führt zum Erstgespräch (Cal.com oder E-Mail)', async () => {
  const doc = await documentFor('index.html')
  const ctas = [...doc.querySelectorAll('header a')].filter((a) => text(a) === (site.calUrl ? contact.ctaBooking : contact.ctaMail))
  assert.equal(ctas.length, 2)
  for (const cta of ctas) assert.equal(cta.getAttribute('href'), bookingHref(site.calUrl, site.email))
})

test('Handy-Menü funktioniert ohne JavaScript', async () => {
  const doc = await documentFor('index.html')
  const details = doc.querySelector('header details')
  assert.ok(details?.querySelector('summary'), 'summary fehlt')
  assert.match(text(details.querySelector('summary')), /Menü/)
  assert.deepEqual(
    [...details.querySelectorAll('nav a[href^="/#"]')].map((a) => a.getAttribute('href')),
    sections,
  )
})

test('Logo-Link hat einen Namen, das SVG ist dekorativ', async () => {
  const doc = await documentFor('index.html')
  const home = doc.querySelector('header a[href="/"]')
  assert.equal(home.getAttribute('aria-label'), 'AppConcept – zur Startseite')
  assert.equal(home.querySelector('svg').getAttribute('aria-hidden'), 'true')
})

test('Header ist Graphit und nutzt das helle Logo', async () => {
  const doc = await documentFor('index.html')
  const header = doc.querySelector('header')
  assert.ok(header.classList.contains('bg-graphite'), 'Header ist nicht Graphit')
  assert.equal(header.querySelector('a[href="/"] svg rect').getAttribute('stroke'), '#FFFFFF')
})

test('Footer sitzt auf kurzen Seiten am unteren Fensterrand', async () => {
  const doc = await documentFor('impressum/index.html')
  for (const name of ['flex', 'min-h-dvh', 'flex-col']) {
    assert.ok(doc.body.classList.contains(name), `body ohne ${name}`)
  }
  assert.ok(doc.querySelector('main').classList.contains('grow'), 'main wächst nicht')
})

test('Sprunglink zum Inhalt', async () => {
  const doc = await documentFor('index.html')
  assert.equal(doc.querySelector('body > a')?.getAttribute('href'), '#inhalt')
  assert.ok(doc.getElementById('inhalt'))
})

test('Footer verlinkt Leistungen und Rechtliches und nennt Name und Adresse', async () => {
  const doc = await documentFor('index.html')
  const footer = doc.querySelector('footer')
  assert.match(text(footer), /Alexander Schäfer/)
  assert.match(text(footer), /Nauheimer Weg 9a/)
  assert.match(text(footer), /65550 Limburg an der Lahn/)
  const hrefs = [...footer.querySelectorAll('a')].map((a) => a.getAttribute('href'))
  assert.deepEqual(hrefs, ['/ios-freelancer/', '/software-automatisierung/', '/impressum/', '/datenschutz/'])
})
