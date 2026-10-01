import type { SiteInfo } from '../data/site.ts'

export type LocalBusinessJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'ProfessionalService'
  '@id': string
  name: string
  founder: { '@type': 'Person'; name: string }
  url: string
  email: string
  telephone: string
  image: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    postalCode: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  geo: { '@type': 'GeoCoordinates'; latitude: number; longitude: number }
  areaServed: { '@type': 'AdministrativeArea'; name: string }[]
  sameAs?: string[]
}

export function localBusinessJsonLd(info: SiteInfo): LocalBusinessJsonLd {
  const data: LocalBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${info.url}/#business`,
    name: info.name,
    founder: { '@type': 'Person', name: info.owner },
    url: `${info.url}/`,
    email: info.email,
    telephone: info.phoneE164,
    image: `${info.url}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.address.street,
      postalCode: info.address.postalCode,
      addressLocality: info.address.locality,
      addressRegion: info.address.region,
      addressCountry: info.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: info.geo.latitude, longitude: info.geo.longitude },
    areaServed: info.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  }
  const sameAs = [info.linkedinUrl, info.githubUrl].filter((url): url is string => Boolean(url))
  if (sameAs.length > 0) data.sameAs = sameAs
  return data
}

// `<` maskieren, damit kein Text das umgebende <script> schließen kann.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
