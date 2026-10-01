export function mailtoHref(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
}

// Ziel für „Erstgespräch“: Cal.com, sobald ein https-Link gepflegt ist,
// sonst eine E-Mail mit Betreff. So führt der Button nie ins Leere.
export function bookingHref(calUrl: string | null, email: string): string {
  if (calUrl && calUrl.startsWith('https://')) return calUrl
  return mailtoHref(email, 'Erstgespräch')
}

export function isExternal(href: string): boolean {
  return href.startsWith('https://')
}
