import type { ProjectId } from './site'

export type ServicePage = {
  path: string
  title: string
  description: string
  heading: string
  intro: string
  context: string
  cta: string
  subject: string
  offerings: { title: string; text: string }[]
  reference: {
    projectId: ProjectId
    title: string
    situation: string
    contribution: string
    implementation: string
  }
  experience: string
  steps: { title: string; text: string }[]
  questions: { question: string; answer: string }[]
  contactText: string
  related: { href: string; label: string; text: string }
}

export const iosPage: ServicePage = {
  path: '/ios-freelancer/',
  title: 'iOS-Freelancer für Swift & SwiftUI | AppConcept',
  description: 'Alexander Schäfer unterstützt Ihr iOS-Team mit Swift, SwiftUI, App-Architektur, Code-Reviews und Tests. Erfahrung in der iOS-Entwicklung seit 2014.',
  heading: 'iOS-Freelancer für Ihr Team',
  intro: 'Ich bin Alexander Schäfer. Seit 2014 entwickle ich Apps für iPhone und iPad. Als Senior iOS-Entwickler unterstütze ich Ihr Team mit Swift und SwiftUI – bei neuen Features, der Architektur und der Weiterentwicklung bestehender Apps.',
  context: 'Feature-Entwicklung, Architektur und Tests – als Verstärkung Ihres Teams, remote oder vor Ort.',
  cta: 'Verfügbarkeit anfragen',
  subject: 'Anfrage iOS-Teamverstärkung',
  offerings: [
    {
      title: 'Features entwickeln',
      text: 'Ich setze Funktionen für iPhone, iPad und Apple TV um. Dabei geht es sowohl um neue Oberflächen mit SwiftUI als auch um die Weiterentwicklung einer bestehenden Anwendung. Umfang und Schnittstellen stimmen wir mit Ihrem Team ab.',
    },
    {
      title: 'Architektur und Modernisierung',
      text: 'Eine gewachsene App braucht nachvollziehbare Zuständigkeiten. Ich unterstütze bei der App-Architektur, übernehme bestehende Anwendungen und arbeite mit Ihrem Team an ihrer Modernisierung. Wir klären zuerst, welche Änderungen für Ihr Vorhaben nötig sind.',
    },
    {
      title: 'Code-Reviews und automatisierte Tests',
      text: 'Ich prüfe Änderungen gemeinsam mit Ihrem Team und entwickle automatisierte Tests. Der Fokus liegt auf dem Verhalten der App und auf verständlichem Code, an dem das Team weiterarbeiten kann.',
    },
  ],
  reference: {
    projectId: 'rtlplus',
    title: 'Aus der Praxis: RTL+',
    situation: 'Die Streaming-Plattform entwickelte sich von TVNOW zu RTL+. In dieser Zeit wurden die iOS- und tvOS-Apps neu und weiterentwickelt; zwei Relaunches gehörten dazu.',
    contribution: 'Ich habe über mehrere Jahre im agilen SAFe-Team an der Neuentwicklung und an neuen Features mitgearbeitet. Die Zusammenarbeit umfasste die iOS- und tvOS-Apps.',
    implementation: 'Zum technischen Umfeld gehörten Swift, Combine und GraphQL. Die Erfahrung verbindet laufende Feature-Entwicklung mit umfangreicheren Änderungen an einer bestehenden App.',
  },
  experience: 'Ein weiteres Projekt ist eine offline-fähige iOS-App für Flugbesatzungen mit Briefings, Dienstplänen und Dokumenten. Hier gehören SwiftUI und Clean Architecture zum technischen Umfeld; die Verteilung erfolgt über den Apple Business Manager.',
  steps: [
    { title: 'Projekt und Bedarf klären', text: 'Sie beschreiben Ihre App, das Team und die anstehenden Aufgaben. Wir sprechen über die benötigte Unterstützung und den möglichen Zeitraum.' },
    { title: 'Zusammenarbeit vereinbaren', text: 'Wir stimmen Aufgaben, Schnittstellen und Abrechnung ab. Ich kenne die Arbeit in Scrum- und SAFe-Teams und kläre mit Ihnen, wie ich mich in Ihren Ablauf einbringe.' },
    { title: 'Gemeinsam umsetzen', text: 'Ich arbeite an den vereinbarten Aufgaben und stimme Änderungen, Reviews und Tests mit Ihrem Team ab. Für neue Vorhaben legen wir die Anforderungen vor der Umsetzung fest.' },
  ],
  questions: [
    { question: 'Unterstützen Sie auch bestehende Apps?', answer: 'Ja. Neben Neuentwicklungen übernehme und modernisiere ich bestehende Apps. Zu Beginn klären wir den aktuellen Stand und die Aufgaben, die Ihr Team abgeben oder gemeinsam bearbeiten möchte.' },
    { question: 'Geht es nur um iPhone-Apps?', answer: 'Nein. Mein Angebot umfasst auch iPad- und Apple-TV-Apps. Welche Geräte und Betriebssystemversionen unterstützt werden sollen, besprechen wir für Ihr Projekt.' },
    { question: 'Können Sie eine App auch als eigenständiges Projekt entwickeln?', answer: 'Ja. Ich entwickle Apps sowohl als Verstärkung eines vorhandenen Teams als auch für eigenständige Projekte – einschließlich der Veröffentlichung im App Store oder der internen Verteilung im Unternehmen.' },
    { question: 'Wie klären wir Verfügbarkeit und Kosten?', answer: 'Schreiben Sie mir, welche Unterstützung Sie benötigen und welchen Zeitraum Sie planen. Verfügbarkeit und Aufwand klären wir im Gespräch; vor der Umsetzung erhalten Sie ein Angebot.' },
  ],
  contactText: 'Welche App entwickeln Sie, und wo braucht Ihr Team Unterstützung? Schreiben Sie mir kurz die Aufgabe und Ihren geplanten Zeitraum.',
  related: { href: '/software-automatisierung/', label: 'Individuelle Software und Automatisierung', text: 'Sie möchten einen betrieblichen Ablauf vereinfachen oder eine Web-Anwendung entwickeln lassen?' },
}

export const softwarePage: ServicePage = {
  path: '/software-automatisierung/',
  title: 'Individuelle Software & Automatisierung | AppConcept',
  description: 'Individuelle Software für Unternehmen: Excel-Abläufe vereinfachen, Daten verbinden und Web-Anwendungen entwickeln. Mit Alexander Schäfer von AppConcept.',
  heading: 'Individuelle Software für Ihre Abläufe',
  intro: 'Ich bin Alexander Schäfer und entwickle individuelle Software und Web-Anwendungen für Unternehmen. Wenn Daten zwischen Listen, E-Mails und Programmen wandern, schauen wir gemeinsam, welche Schritte sich verbinden oder automatisieren lassen.',
  context: 'Von der ersten Analyse über die Entwicklung bis zur Wartung. Ausgangspunkt ist Ihr heutiger Arbeitsablauf.',
  cta: 'Vorhaben besprechen',
  subject: 'Anfrage individuelle Software und Automatisierung',
  offerings: [
    {
      title: 'Von Excel zur Web-Anwendung',
      text: 'Ich entwickle Anwendungen, die Daten aus Ihren Listen zusammenführen. Wir klären, welche Informationen gebraucht werden und wie Sie damit arbeiten. Daraus entsteht das Konzept für eine gemeinsame Datenverwaltung und die dazugehörigen Abläufe.',
    },
    {
      title: 'Programme und Arbeitsschritte verbinden',
      text: 'Wenn Daten mehrfach abgetippt werden, können Schnittstellen helfen. Ich verbinde bestehende Programme und automatisiere wiederkehrende Schritte, etwa in der Angebots- oder Terminverwaltung. Welche Verbindungen möglich sind, prüfen wir anhand Ihrer Systeme.',
    },
    {
      title: 'KI für eine konkrete Aufgabe prüfen',
      text: 'KI kann beispielsweise Dokumente auslesen oder Anfragen vorsortieren. Wir untersuchen zuerst den Anwendungsfall, die benötigten Daten und die Kosten. Ein Prototyp hilft zu prüfen, ob der Ansatz für Ihre Aufgabe geeignet ist.',
    },
  ],
  reference: {
    projectId: 'mobistro',
    title: 'Aus der Praxis: Mobistro',
    situation: 'Bei Food Trucks, Getränkeständen und im Event-Catering fällt neben dem Kassieren viel organisatorische Arbeit an. Mobistro ist für diese betrieblichen Abläufe entwickelt.',
    contribution: 'Mobistro ist mein eigenes Produkt. Ich entwickle die Operations-Plattform als zusammenhängendes System für mobile Gastronomie, mit einer Web-Anwendung und einer iPad-App.',
    implementation: 'Die Plattform bündelt Aufgaben neben der Kasse in einem System. Web-App, iPad-App und KI sind Bestandteile des Produkts. Der Screenshot zeigt die tatsächliche Web-Anwendung; auf mobistro.app können Sie das Angebot näher ansehen.',
  },
  experience: 'Meine Arbeit umfasst auch Unternehmenswebsites und Web-Anwendungen. Für BOTANÉ Eventstudio habe ich den Auftritt eines Studios umgesetzt, das Pflanzenkonzepte für Events, Messen und Markeninszenierungen entwickelt.',
  steps: [
    { title: 'Den heutigen Ablauf verstehen', text: 'Sie zeigen mir, wie Sie bisher arbeiten und an welcher Stelle Aufwand entsteht. Dafür müssen Sie keine technische Lösung vorgeben.' },
    { title: 'Konzept und Angebot erarbeiten', text: 'Wir legen fest, was die Anwendung leisten soll. Dazu gehören die benötigten Daten und Verbindungen zu anderen Programmen. Auf dieser Grundlage erhalten Sie meinen Vorschlag und ein Angebot.' },
    { title: 'Ausprobieren und weiterentwickeln', text: 'Während der Entwicklung zeige ich Ihnen Zwischenstände. Sie können früh prüfen, ob die Anwendung zu Ihrer Arbeit passt. Nach dem Start kümmere ich mich um Wartung und weitere Anpassungen.' },
  ],
  questions: [
    { question: 'Ist das auch für kleine Unternehmen geeignet?', answer: 'Ja. Das Angebot richtet sich auch an kleine und mittlere Unternehmen. Ausgangspunkt ist die Aufgabe, die Sie vereinfachen möchten; den Umfang klären wir gemeinsam.' },
    { question: 'Müssen wir unsere bestehenden Programme ersetzen?', answer: 'Das lässt sich erst nach einer Bestandsaufnahme entscheiden. Eine Möglichkeit ist, bestehende Programme über Schnittstellen zu verbinden. Wir prüfen, welche Daten und Zugriffsmöglichkeiten Ihre Systeme bereitstellen.' },
    { question: 'Muss KI Teil der Lösung sein?', answer: 'Nein. Datenverwaltung, Schnittstellen und feste Automatisierungen können die Aufgabe bereits lösen. KI prüfen wir dort, wo sie einen passenden Beitrag leisten kann, etwa beim Auslesen von Dokumenten.' },
    { question: 'Was passiert mit unseren Daten?', answer: 'Vorab klären wir, welche Daten verarbeitet werden und wo – besonders beim Einsatz von KI. Diese Anforderungen fließen in Konzept und Umsetzung ein.' },
    { question: 'Was kostet individuelle Software?', answer: 'Das hängt von Umfang, Schnittstellen und Anforderungen ab. Ich rechne je nach Projekt zum Festpreis oder nach Aufwand ab. Vor der Umsetzung erhalten Sie ein Angebot.' },
  ],
  contactText: 'Welche Aufgabe möchten Sie vereinfachen? Beschreiben Sie mir kurz Ihren heutigen Ablauf und die Programme oder Listen, mit denen Sie arbeiten.',
  related: { href: '/ios-freelancer/', label: 'iOS-Freelancer für Ihr Team', text: 'Sie haben bereits ein Entwicklungsteam und suchen Unterstützung für eine iPhone-, iPad- oder Apple-TV-App?' },
}
