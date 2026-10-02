export type NavItem = { label: string; href: string }
export type Service = { number: string; title: string; summary: string; points: string[] }
export type ProcessStep = { cell: string; title: string; text: string }
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
  title: 'iOS-Freelancer & Software in Limburg | AppConcept',
  description:
    'Alexander Schäfer – iOS-Freelancer im Kreis Limburg-Weilburg. Apps, Web-Anwendungen, individuelle Software und KI-Beratung – vor Ort und bundesweit remote.',
}

export const navigation: NavItem[] = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Projekte', href: '/#projekte' },
  { label: 'Über mich', href: '/#ueber' },
  { label: 'FAQ', href: '/#faq' },
]

export const hero = {
  greeting: 'Hallo, ich bin Alex – Softwareentwickler aus Limburg.',
  headline: 'Mobile Apps & Web',
  intro:
    'Seit 2014 entwickle ich Apps für iPhone und iPad. Dazu kommen Websites und Web-Anwendungen für Unternehmen.',
  secondaryCta: 'Projekte ansehen',
  portraitAlt: 'Alexander Schäfer, Softwareentwickler aus Limburg an der Lahn',
}

export const services: Service[] = [
  {
    number: '01',
    title: 'iOS-Entwicklung',
    summary:
      'Ich entwickle Apps für iPhone, iPad und Apple TV mit Swift und SwiftUI – als Verstärkung für Ihr Team oder für ein eigenständiges Projekt.',
    points: [
      'Neuentwicklung oder Übernahme bestehender Apps',
      'App-Architektur und automatisierte Tests',
      'Veröffentlichung im App Store oder interne Verteilung im Unternehmen',
    ],
  },
  {
    number: '02',
    title: 'Web-Entwicklung',
    summary: 'Ich entwickle Websites für Unternehmen und Web-Anwendungen für die tägliche Arbeit.',
    points: [
      'Ladezeiten und Auffindbarkeit verbessern',
      'Web-Anwendungen entwickeln und erweitern',
      'DSGVO-konform umgesetzt',
    ],
  },
  {
    number: '03',
    title: 'Automatisierung und individuelle Software',
    summary:
      'Ich entwickle Anwendungen, die Daten aus Ihren Listen zusammenführen und wiederkehrende Arbeitsschritte übernehmen.',
    points: [
      'Daten zentral in einer Web-Anwendung verwalten',
      'Angebote und Terminverwaltung automatisieren',
      'Bestehende Programme über Schnittstellen verbinden',
      'KI für wiederkehrende Aufgaben einsetzen',
    ],
  },
  {
    number: '04',
    title: 'KI-Beratung',
    summary:
      'Wir schauen uns eine Aufgabe genauer an: Welche Daten braucht die KI, was kann sie übernehmen und welcher Aufwand entsteht dabei?',
    points: [
      'Wiederkehrende Aufgaben untersuchen',
      'Aufwand, Kosten und Datenbedarf einschätzen',
      'Anwendungsfälle mit einem Prototyp testen',
    ],
  },
]

export const teamBoost = {
  title: 'Unterstützung für Ihr iOS-Team',
  text: 'Ich unterstütze bestehende Entwicklungsteams als Senior iOS-Entwickler. Ich arbeite remote oder vor Ort und kenne die Zusammenarbeit in Scrum- und SAFe-Teams.',
  points: [
    'Feature-Entwicklung und Architektur',
    'Code-Reviews und automatisierte Tests',
    'Übernahme und Modernisierung bestehender Apps',
  ],
  cta: 'Verfügbarkeit anfragen',
  mailSubject: 'Anfrage Teamverstärkung',
}

export const automationIntro = {
  question: 'Ihr Betrieb läuft auf Excel?',
  answer: 'Das geht einfacher.',
  context: 'Aufträge abtippen, Daten zwischen Listen kopieren, Informationen aus E-Mails zusammensuchen: Das kostet Zeit.',
  approach: 'Ich verbinde Ihre Daten und automatisiere wiederkehrende Arbeitsschritte. KI kann dabei zum Beispiel Dokumente auslesen oder Anfragen vorsortieren.',
}

export const processSteps: ProcessStep[] = [
  { cell: 'A1', title: 'Erstgespräch', text: 'Sie erzählen mir von Ihrem Vorhaben: eine neue Anwendung, die Weiterentwicklung einer App oder Unterstützung für Ihr Team.' },
  {
    cell: 'B1',
    title: 'Analyse und Konzept',
    text: 'Wir legen fest, was die Anwendung leisten soll. Darauf basieren mein Vorschlag und das Angebot.',
  },
  {
    cell: 'C1',
    title: 'Umsetzung',
    text: 'Während der Entwicklung zeige ich Ihnen Zwischenstände. So können Sie früh ausprobieren, ob die Anwendung zu Ihrer Arbeit passt.',
  },
  {
    cell: 'D1',
    title: 'Wartung und Weiterentwicklung',
    text: 'Nach dem Start kümmere ich mich um Wartung und weitere Anpassungen.',
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
    url: 'https://mobistro.app',
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

export const about = {
  lead: 'Ich bin seit 2005 selbstständig. Angefangen habe ich als Partner einer Webdesign-Agentur; seit 2014 liegt mein Schwerpunkt auf iOS-Entwicklung. Zu meinen Projekten gehören Apps für RTL, einen Sportwagenhersteller und eine Fluggesellschaft.',
  body: 'Heute entwickle ich außerdem individuelle Software für kleinere Unternehmen. Ich arbeite von Limburg aus: im Kreis Limburg-Weilburg und im Rhein-Main-Gebiet auch bei Ihnen vor Ort, sonst remote.',
}

export const faq: FaqItem[] = [
  {
    question: 'Arbeiten Sie auch mit kleinen Unternehmen?',
    answer: 'Ja. Das Angebot richtet sich auch an kleine und mittlere Unternehmen.',
  },
  {
    question: 'Muss ich mich mit Technik auskennen?',
    answer: 'Nein. Sie beschreiben, was Sie benötigen und wie Sie bisher arbeiten. Ich erkläre Ihnen die technischen Möglichkeiten.',
  },
  {
    question: 'Was kostet ein Projekt?',
    answer:
      'Das richtet sich nach dem Umfang. Ich rechne je nach Projekt zum Festpreis oder nach Aufwand ab. Vor der Umsetzung erhalten Sie ein Angebot.',
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
  title: 'Erzählen Sie mir von Ihrem Vorhaben.',
  text: 'Im ersten Gespräch klären wir, was Sie brauchen und ob ich Sie dabei unterstützen kann.',
  ctaBooking: 'Termin buchen',
  ctaMail: 'Erstgespräch anfragen',
  mailHint: 'Kostenlos & unverbindlich · Anfrage per E-Mail',
  bookingHint: 'Kostenlos & unverbindlich · Termin online auswählen',
  prompt: 'Schreiben Sie mir kurz, was Sie vorhaben oder welche Aufgabe Sie vereinfachen möchten.',
  regionLine: 'Vor Ort im Kreis Limburg-Weilburg und im Rhein-Main-Gebiet · bundesweit remote',
}
