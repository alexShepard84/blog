import { existsSync, readFileSync } from 'node:fs'

// Sperrbegriffe für den sichtbaren Text. Öffentlich unbedenkliche stehen hier.
// Private Begriffe (Kundennamen, Angaben aus dem CV) stehen bewusst NICHT im
// Repo – es ist öffentlich. Sie kommen lokal aus tests/forbidden.local.txt
// (ignoriert) und in CI aus dem Secret FORBIDDEN_TERMS, ein Begriff pro Zeile.
const PUBLIC_TERMS = ['Hosting in der EU', 'TMG', 'RStV']
const LOCAL_FILE = new URL('../forbidden.local.txt', import.meta.url)

// Stundensätze in jeder Schreibweise, z. B. „95 €/h“ oder „95 EUR pro Stunde“.
const RATE_PATTERN = /\d+\s*(?:€|EUR|Euro)\s*(?:\/|pro|je)\s*(?:h\b|Std|Stunde)/i

// Platzhalter aus den Entwürfen, z. B. „[Screenshot RTL+]“.
export const PLACEHOLDER_PATTERN = /\[(?:Screenshot|Stockfoto|Foto|Cal\.com|Jahr|prüfen|Rolle|Bildunterschrift|Angebot)/

export function parseTerms(source) {
  return source
    .split(/\r?\n|,/)
    .map((term) => term.trim())
    .filter((term) => term && !term.startsWith('#'))
}

export function loadPrivateTerms(env = process.env, file = LOCAL_FILE) {
  if (env.FORBIDDEN_TERMS) return parseTerms(env.FORBIDDEN_TERMS)
  if (existsSync(file)) return parseTerms(readFileSync(file, 'utf8'))
  if (env.CI) throw new Error('FORBIDDEN_TERMS fehlt: In CI muss die Liste privater Sperrbegriffe gesetzt sein.')
  return []
}

const PRIVATE_TERMS = loadPrivateTerms()

// Alle Treffer im Text. Private Begriffe werden nur mit ihrer Nummer gemeldet,
// damit sie nicht im öffentlichen CI-Log landen.
export function findForbidden(text, privateTerms = PRIVATE_TERMS) {
  const lower = text.toLowerCase()
  const hits = PUBLIC_TERMS.filter((term) => lower.includes(term.toLowerCase()))
  privateTerms.forEach((term, index) => {
    if (lower.includes(term.toLowerCase())) hits.push(`privater Sperrbegriff Nr. ${index + 1}`)
  })
  if (RATE_PATTERN.test(text)) hits.push('Stundensatz-Angabe')
  return hits
}
