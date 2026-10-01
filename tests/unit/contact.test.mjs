import test from 'node:test'
import assert from 'node:assert/strict'
import { bookingHref, isExternal, mailtoHref } from '../../src/lib/contact.ts'

test('mailtoHref kodiert den Betreff', () => {
  assert.equal(mailtoHref('a@b.de', 'Erstgespräch'), 'mailto:a@b.de?subject=Erstgespr%C3%A4ch')
  assert.equal(mailtoHref('a@b.de'), 'mailto:a@b.de')
})

test('bookingHref nutzt den Cal.com-Link, wenn er gesetzt ist', () => {
  assert.equal(bookingHref('https://cal.com/alex/erstgespraech', 'a@b.de'), 'https://cal.com/alex/erstgespraech')
})

test('bookingHref fällt ohne Cal.com auf eine E-Mail zurück', () => {
  assert.equal(bookingHref(null, 'a@b.de'), 'mailto:a@b.de?subject=Erstgespr%C3%A4ch')
})

test('bookingHref akzeptiert nur https-Links', () => {
  const fallback = 'mailto:a@b.de?subject=Erstgespr%C3%A4ch'
  assert.equal(bookingHref('', 'a@b.de'), fallback)
  assert.equal(bookingHref('javascript:alert(1)', 'a@b.de'), fallback)
  assert.equal(bookingHref('http://cal.com/alex', 'a@b.de'), fallback)
})

test('isExternal erkennt https-Links', () => {
  assert.equal(isExternal('https://cal.com/alex'), true)
  assert.equal(isExternal('mailto:a@b.de'), false)
  assert.equal(isExternal('/#kontakt'), false)
})
