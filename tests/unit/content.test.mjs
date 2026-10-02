import test from 'node:test'
import assert from 'node:assert/strict'
import * as content from '../../src/data/site.ts'
import { PLACEHOLDER_PATTERN, findForbidden } from '../helpers/forbidden.mjs'

test('Inhalte enthalten keine privaten Angaben oder Platzhalter', () => {
  const all = JSON.stringify(content)
  assert.deepEqual(findForbidden(all), [])
  assert.doesNotMatch(all, PLACEHOLDER_PATTERN)
})

test('vier Leistungen in fester Reihenfolge', () => {
  assert.deepEqual(
    content.services.map((service) => service.title),
    ['iOS-Entwicklung', 'Web-Entwicklung', 'Automatisierung und individuelle Software', 'KI-Beratung'],
  )
})

test('fünf Projekte mit eindeutigen IDs in fester Reihenfolge', () => {
  assert.deepEqual(
    content.projects.map((project) => project.id),
    ['mobistro', 'crew', 'botane', 'rtlplus', 'charging'],
  )
})

test('der erklärte Ablauf hat vier Schritte und keinen aktuellen Bearbeitungsstatus', () => {
  assert.equal(content.processSteps.length, 4)
  assert.ok(content.processSteps.every((step) => !('active' in step)))
})

test('FAQ beantwortet fünf Fragen, eine davon zur Region', () => {
  assert.equal(content.faq.length, 5)
  assert.ok(content.faq.some((item) => item.answer.includes('Kreis Limburg-Weilburg')))
})
