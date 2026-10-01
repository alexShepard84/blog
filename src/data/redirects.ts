// Alte Jekyll-URLs → neue Ziele. Schlüssel ohne führenden und abschließenden
// Schrägstrich, weil sie als Parameter der Catch-all-Route dienen.
export const legacyRedirects: Record<string, string> = {
  hire: '/#leistungen',
  contact: '/#kontakt',
  thanks: '/#kontakt',
  imprint: '/impressum/',
  privacy: '/datenschutz/',
  blog: '/',
  'ios/2017/02/05/skstorereviewcontroller': '/',
}
