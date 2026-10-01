export const site = {
  name: 'AppConcept',
  owner: 'Alexander Schäfer',
  url: 'https://www.app-concept.de',
  email: 'a.schaefer@app-concept.de',
  phoneDisplay: '+49 (0)6434 60 29 90 0',
  phoneE164: '+4964346029900',
  vatId: 'DE 256081457',
  address: {
    street: 'Nauheimer Weg 9a',
    postalCode: '65550',
    locality: 'Limburg an der Lahn',
    region: 'Hessen',
    country: 'DE',
  },
  geo: { latitude: 50.36577, longitude: 8.09509 },
  areaServed: ['Landkreis Limburg-Weilburg', 'Rhein-Main-Gebiet', 'Deutschland'],
  calUrl: null as string | null,
  linkedinUrl: null as string | null,
  githubUrl: 'https://github.com/alexShepard84' as string | null,
}

export type SiteInfo = typeof site

export const seo = {
  title: 'Software, Apps & KI-Beratung in Limburg | AppConcept',
  description:
    'AppConcept – Alexander Schäfer aus Limburg an der Lahn: Software, Apps und KI-Automatisierung für Unternehmen im Kreis Limburg-Weilburg, im Rhein-Main-Gebiet und bundesweit.',
}
