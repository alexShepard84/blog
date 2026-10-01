export type NavItem = { label: string; href: string }
export type Service = { number: string; title: string; short: string; summary: string; points: string[] }
export type ProcessStep = { cell: string; title: string; text: string; active: boolean }
export type ProjectId = 'mobistro' | 'crew' | 'botane' | 'rtlplus' | 'charging'
export type Project = {
  id: ProjectId
  label: string
  highlight: boolean
  title: string
  text: string
  meta: string[]
  tone: 'petrol' | 'cool' | 'stone'
  media: 'inset' | 'cover'
  imageAlt: string
  fallbackLabel: string
  url?: string
}
export type Principle = { title: string; text: string }
export type FaqItem = { question: string; answer: string }

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

export const navigation: NavItem[] = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Projekte', href: '/#projekte' },
  { label: 'Über mich', href: '/#ueber' },
  { label: 'FAQ', href: '/#faq' },
]

export const hero = {
  greeting: 'Hallo, ich bin Alex – Softwareentwickler aus Limburg.',
  headline: 'Ihr Betrieb läuft auf Excel? Das geht einfacher',
  intro:
    'Mit AppConcept entwickle ich Software, Apps und KI-Automatisierungen, die Tabellen, Copy-and-paste und Zettelwirtschaft ablösen – zugeschnitten auf die Abläufe Ihres Unternehmens.',
  primaryCta: 'Kostenloses Erstgespräch',
  secondaryCta: 'Projekte ansehen',
  portraitAlt: 'Alexander Schäfer, Softwareentwickler aus Limburg an der Lahn',
}

export const services: Service[] = [
  {
    number: '01',
    title: 'KI-Beratung',
    short: 'KI-Beratung',
    summary:
      'Wo spart KI in Ihrem Betrieb wirklich Zeit – und wo nicht? Ich prüfe Ihre Abläufe und zeige konkrete, umsetzbare Ansatzpunkte.',
    points: [
      'Prozess-Check: Wo geht heute Zeit verloren?',
      'Anwendungsfälle mit ehrlicher Einschätzung von Aufwand und Nutzen',
      'Prototyp, bevor Sie investieren',
    ],
  },
  {
    number: '02',
    title: 'Automatisierung und individuelle Software',
    short: 'Automatisierung',
    summary:
      'Aus Excel-Listen und E-Mail-Ketten wird ein System, das Ihr Team gern benutzt und das mit Ihrem Betrieb wächst.',
    points: [
      'Eigene Web-App statt Excel-Listen',
      'Angebote, Termine und Verfügbarkeiten automatisch',
      'Anbindung an Ihre vorhandenen Tools',
      'KI-Assistenten für wiederkehrende Aufgaben',
    ],
  },
  {
    number: '03',
    title: 'Web-Entwicklung',
    short: 'Web-Entwicklung',
    summary: 'Websites und Web-Anwendungen: schnell, wartbar und auf Ihre Abläufe zugeschnitten.',
    points: [
      'Websites, die schnell laden und gefunden werden',
      'Web-Apps mit React und Supabase',
      'DSGVO-konform umgesetzt',
    ],
  },
  {
    number: '04',
    title: 'iOS-Entwicklung',
    short: 'iOS-Entwicklung',
    summary:
      'Native Apps für iPhone, iPad und Apple TV in Swift und SwiftUI, seit 2014. Von der ersten Version bis zum laufenden Betrieb.',
    points: [
      'Neuentwicklung oder Übernahme bestehender Apps',
      'Clean Architecture und automatisierte Tests',
      'App Store oder interne Verteilung über den Apple Business Manager',
    ],
  },
]

export const teamBoost = {
  label: 'Teamverstärkung',
  title: 'Sie haben schon ein Team?',
  text: 'Dann verstärke ich es: als Senior iOS-Entwickler, remote oder vor Ort, in Scrum- oder SAFe-Teams. Mit Erfahrung aus Projekten bei RTL, im Automotive-Umfeld und in der Luftfahrt.',
  points: [
    'Feature-Entwicklung und Architektur',
    'Code-Reviews, Tests und Qualität',
    'Übernahme und Modernisierung bestehender Apps',
  ],
  cta: 'Verfügbarkeit anfragen',
  mailSubject: 'Anfrage Teamverstärkung',
}

export const processSteps: ProcessStep[] = [
  { cell: 'A1', title: 'Erstgespräch', text: 'Kostenlos und unverbindlich: Sie erzählen, wo es hakt.', active: false },
  {
    cell: 'B1',
    title: 'Analyse und Konzept',
    text: 'Ich schaue mir Ihre Abläufe an und schlage eine Lösung mit klarem Umfang vor.',
    active: false,
  },
  {
    cell: 'C1',
    title: 'Umsetzung',
    text: 'In kurzen Schritten. Sie sehen früh, was entsteht, und entscheiden mit.',
    active: false,
  },
  {
    cell: 'D1',
    title: 'Betrieb und Weiterentwicklung',
    text: 'Ihre Lösung läuft – und wächst mit, wenn sich Ihr Betrieb verändert.',
    active: true,
  },
]

export const projects: Project[] = [
  {
    id: 'mobistro',
    label: 'Eigenes Produkt',
    highlight: true,
    title: 'Mobistro',
    text: 'Operations-Plattform für mobile Gastronomie – Food Trucks, Getränkestände, Event-Catering. Alles, was neben der Kasse anfällt, in einem System.',
    meta: ['Web-App', 'iPad-App', 'KI'],
    tone: 'petrol',
    media: 'inset',
    imageAlt: 'Dashboard der Mobistro-Web-App',
    fallbackLabel: 'Gastronomie',
  },
  {
    id: 'crew',
    label: 'Aktuelles Kundenprojekt',
    highlight: true,
    title: 'Crew-App für eine Fluggesellschaft',
    text: 'iOS-App für Flugbesatzungen: Briefings, Dienstpläne und Dokumente – offline-fähig, weil an Bord nicht immer Netz da ist. Verteilt über den Apple Business Manager statt über den App Store.',
    meta: ['Großunternehmen', 'Luftfahrt', 'iOS', 'SwiftUI', 'Clean Architecture'],
    tone: 'cool',
    media: 'cover',
    imageAlt: 'Symbolbild Luftfahrt',
    fallbackLabel: 'Luftfahrt',
  },
  {
    id: 'botane',
    label: 'Kundenprojekt',
    highlight: false,
    title: 'BOTANÉ Eventstudio',
    text: 'Auftritt für ein Studio, das Pflanzenkonzepte für Events, Messen und Markeninszenierungen entwickelt.',
    meta: ['Website'],
    tone: 'stone',
    media: 'inset',
    imageAlt: 'Startseite von botane.events',
    fallbackLabel: 'Web',
    url: 'https://botane.events',
  },
  {
    id: 'rtlplus',
    label: 'Kundenprojekt · RTL Deutschland',
    highlight: false,
    title: 'RTL+',
    text: 'iOS- und tvOS-App der Streaming-Plattform von RTL: über mehrere Jahre im agilen SAFe-Team, von TVNOW bis RTL+. Zwei Relaunches, die Neuentwicklung der App und laufend neue Features.',
    meta: ['iOS', 'tvOS', 'Swift', 'Combine', 'GraphQL'],
    tone: 'stone',
    media: 'cover',
    imageAlt: 'Symbolbild Streaming: Fernbedienung vor einem Fernseher',
    fallbackLabel: 'Streaming',
  },
  {
    id: 'charging',
    label: 'Kundenprojekt · Automotive',
    highlight: false,
    title: 'Lade-App für einen Sportwagenhersteller',
    text: 'Konzeption und Entwicklung einer iOS-App rund ums Laden von Elektrofahrzeugen für einen süddeutschen Sportwagenhersteller – Neu- und Weiterentwicklung im agilen SAFe-Team.',
    meta: ['Konzern', 'Automotive / Elektromobilität', 'iOS', 'SwiftUI', 'Combine'],
    tone: 'cool',
    media: 'cover',
    imageAlt: 'Symbolbild Elektromobilität',
    fallbackLabel: 'E-Mobilität',
  },
]

export const clients =
  'Gearbeitet für RTL Deutschland, Cologne Broadcasting Center, addmore mobile, Henkel Loctite und Vodafone.'

export const about = {
  lead: 'Ich habe Apps für RTL gebaut, für einen Sportwagenhersteller und für eine Fluggesellschaft. Heute bringe ich diese Erfahrung dorthin, wo sie oft am meisten bewirkt: in Betriebe, die noch mit Excel-Listen und Zetteln arbeiten.',
  body: 'Selbstständig bin ich seit 2005 – angefangen als Partner einer Webdesign-Agentur, seit 2014 mit Schwerpunkt iOS und Swift. Ich sitze in Limburg an der Lahn und arbeite für Unternehmen im Kreis Limburg-Weilburg, im Rhein-Main-Gebiet und remote in ganz Deutschland.',
}

export const principles: Principle[] = [
  { title: 'Ehrlich statt Buzzwords', text: 'Wenn sich KI oder eine eigene Software für Sie nicht lohnt, sage ich das.' },
  { title: 'Erst verstehen, dann bauen', text: 'Ich lerne Ihre Abläufe kennen, bevor ich Technik vorschlage.' },
  { title: 'Software, die bleibt', text: 'Getestet, sauber gebaut und so, dass sie auch in fünf Jahren noch wartbar ist.' },
]

export const faq: FaqItem[] = [
  {
    question: 'Arbeiten Sie auch mit kleinen Unternehmen?',
    answer: 'Ja. Gerade kleine und mittlere Betriebe merken schnell, wenn Excel-Listen und Handarbeit wegfallen.',
  },
  {
    question: 'Muss ich mich mit Technik auskennen?',
    answer: 'Nein. Sie kennen Ihre Abläufe, ich kümmere mich um die Technik. Wir sprechen über Ihre Arbeit, nicht über Frameworks.',
  },
  {
    question: 'Was kostet ein Projekt?',
    answer:
      'Das hängt vom Projekt ab – je nachdem zum Festpreis oder nach Aufwand. Nach dem Erstgespräch bekommen Sie ein Angebot mit klarem Rahmen.',
  },
  {
    question: 'Was passiert mit meinen Daten, wenn KI im Spiel ist?',
    answer: 'Wir klären vorab, welche Daten verarbeitet werden und wo. Die Lösung wird DSGVO-konform umgesetzt.',
  },
  {
    question: 'Kommen Sie auch vor Ort?',
    answer:
      'Ja. Im Kreis Limburg-Weilburg – ob Limburg, Weilburg, Bad Camberg, Hadamar oder Runkel – und im Rhein-Main-Gebiet komme ich gern persönlich vorbei. Alles andere läuft remote.',
  },
]

export const contact = {
  title: 'Lassen Sie uns über Ihre Abläufe sprechen.',
  text: 'Im kostenlosen Erstgespräch schauen wir gemeinsam, wo bei Ihnen Zeit verloren geht. Danach bekommen Sie eine kurze schriftliche Einschätzung, wo sich Software oder KI lohnt – und wo nicht. Unverbindlich.',
  ctaBooking: 'Termin buchen',
  ctaMail: 'Erstgespräch per E-Mail anfragen',
  regionLine: 'Vor Ort im Kreis Limburg-Weilburg und im Rhein-Main-Gebiet · bundesweit remote',
}
