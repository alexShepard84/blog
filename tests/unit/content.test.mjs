import test from 'node:test'
import assert from 'node:assert/strict'
import * as content from '../../src/data/site.ts'
import { FORBIDDEN_TEXT, PLACEHOLDER_PATTERN } from '../helpers/forbidden.mjs'

test('Inhalte enthalten keine privaten Angaben oder Platzhalter', () => {
  const all = JSON.stringify(content)
  for (const word of FORBIDDEN_TEXT) assert.equal(all.includes(word), false, `verboten: ${word}`)
  assert.doesNotMatch(all, PLACEHOLDER_PATTERN)
})

test('vier Leistungen in fester Reihenfolge', () => {
  assert.deepEqual(
    content.services.map((service) => service.title),
    ['KI-Beratung', 'Automatisierung und individuelle Software', 'Web-Entwicklung', 'iOS-Entwicklung'],
  )
})

test('fünf Projekte mit eindeutigen IDs in fester Reihenfolge', () => {
  assert.deepEqual(
    content.projects.map((project) => project.id),
    ['mobistro', 'crew', 'botane', 'rtlplus', 'charging'],
  )
})

test('genau ein Ablaufschritt und genau ein Werdegang-Eintrag sind aktuell', () => {
  assert.equal(content.processSteps.filter((step) => step.active).length, 1)
  assert.equal(content.timeline.filter((entry) => entry.current).length, 1)
  assert.equal(content.timeline.at(-1)?.current, true)
})

test('FAQ beantwortet fünf Fragen, eine davon zur Region', () => {
  assert.equal(content.faq.length, 5)
  assert.ok(content.faq.some((item) => item.answer.includes('Kreis Limburg-Weilburg')))
})
