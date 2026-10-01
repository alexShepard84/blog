import test from 'node:test'
import assert from 'node:assert/strict'
import { site } from '../../src/data/site.ts'
import { localBusinessJsonLd, serializeJsonLd } from '../../src/lib/seo.ts'

test('JSON-LD beschreibt AppConcept als Dienstleister in Limburg', () => {
  const data = localBusinessJsonLd(site)
  assert.equal(data['@context'], 'https://schema.org')
  assert.equal(data['@type'], 'ProfessionalService')
  assert.equal(data.name, 'AppConcept')
  assert.equal(data.url, 'https://www.app-concept.de/')
  assert.equal(data.address.streetAddress, 'Nauheimer Weg 9a')
  assert.equal(data.address.postalCode, '65550')
  assert.equal(data.address.addressLocality, 'Limburg an der Lahn')
  assert.equal(data.geo.latitude, 50.36577)
  assert.ok(data.areaServed.some((area) => area.name === 'Landkreis Limburg-Weilburg'))
})

test('sameAs enthält nur gesetzte Profile', () => {
  const none = localBusinessJsonLd({ ...site, linkedinUrl: null, githubUrl: null })
  assert.equal('sameAs' in none, false)
  const one = localBusinessJsonLd({ ...site, linkedinUrl: 'https://www.linkedin.com/in/x', githubUrl: null })
  assert.deepEqual(one.sameAs, ['https://www.linkedin.com/in/x'])
})

test('serializeJsonLd verhindert, dass Text das Script-Tag schließt', () => {
  const value = { name: '</script><script>alert(1)</script>' }
  const out = serializeJsonLd(value)
  assert.equal(out.includes('</script>'), false)
  assert.deepEqual(JSON.parse(out), value)
})
