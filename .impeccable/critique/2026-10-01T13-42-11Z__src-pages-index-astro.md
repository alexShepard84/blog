---
target: AppConcept Startseite – src/pages/index.astro
total_score: 24
max_score: 32
na_heuristics: 7,9
p0_count: 0
p1_count: 0
target_identity: "file:/Users/alexanderschafer/Development/blog-gh-pages/src/pages/index.astro"
target_fingerprint: "sha256:69b2b13ed4d76d789d7ecc7bfc3feca468ee90f03e9a418c68adc5bf2ce93b39"
target_path: /Users/alexanderschafer/Development/blog-gh-pages/src/pages/index.astro
timestamp: 2026-10-01T13-42-11Z
slug: src-pages-index-astro
closed: true
---
Method: dual-agent (A: /root/design_review · B: /root/detector_evidence)

**AppConcept: 24/32 Punkte – gute Grundlage.** Die Seite wirkt persönlich und glaubwürdig. Der größte Hebel liegt darin, das Versprechen „weniger Excel und Handarbeit“ mit einem konkreten Projektablauf zu beweisen und den nächsten Kontaktschritt klarer zu machen.

Bewertet wurde der lokale Projektstand der Startseite bei 1280×720 und 390×844, im Modus Persuade. Keine Änderungen am Seitencode.

**Eigenständigkeit und Gesamteindruck.** Echtes Porträt, Limburg, die konkrete Excel-Frage und eine konsequente Graphit-/Mint-Gestaltung machen die Seite erkennbar zu Alex’ Angebot. Austauschbarer wirken die großen Branchen-Symbolbilder und technischen Referenzlisten. Die persönliche Ansprache ist stärker als der bisher sichtbare Nutzennachweis.

Der unabhängige Detektor fand in `src` **0 Treffer** (Exit 0, JSON `[]`; 20 Astro-Dateien im Scope). Es gibt daher keine Regel-Fundstellen oder False Positives. Die folgenden Probleme betreffen Wirkung und Nutzerführung, die dieser Scan nicht beurteilt. Beide Prüfungen bestätigen den tief liegenden Desktop-Hero-CTA und den nicht angekündigten Wechsel zur E-Mail.

| # | Nielsen-Heuristik | Punkte | Begründung |
|---|---|---:|---|
| 1 | Systemstatus sichtbar | 3/4 | Menü reagiert korrekt; E-Mail-Wechsel oben nicht angekündigt. |
| 2 | Sprache der Nutzer | 3/4 | Verständlicher Excel-Einstieg; später Framework- und Team-Jargon. |
| 3 | Kontrolle und Freiheit | 3/4 | Freie Navigation; Kontakt setzt externes E-Mail-Programm voraus. |
| 4 | Konsistenz und Standards | 3/4 | Einheitliche Gestaltung, unterschiedliche Namen für denselben Kontaktweg. |
| 5 | Fehlervermeidung | 2/4 | „Vereinbaren“ lässt einen verbindlicheren nächsten Schritt erwarten als eine E-Mail-Anfrage. |
| 6 | Wiedererkennen statt Erinnern | 4/4 | Klare Abschnittstitel, beschriftete Navigation und sichtbare FAQs. |
| 7 | Flexibilität und Effizienz | n/a | Keine wiederkehrende Expertenaufgabe auf dieser Landingpage. |
| 8 | Ästhetik und Minimalismus | 3/4 | Ruhiges System; Hero und Referenzteil beanspruchen viel Raum. |
| 9 | Fehlerbehebung | n/a | Kein In-Page-Fehlerablauf; E-Mail-Übergabe und Zustellung nicht getestet. |
| 10 | Hilfe und Dokumentation | 3/4 | Relevante FAQ, aber wenig Einordnung zu Projektkosten und Kontaktablauf. |
| | **Gesamt** | **24/32** | **75 % – gut; gestalterische Einschätzung, kein Nutzertest.** |

**Das funktioniert besonders gut:**

- **Person und Problem sind sofort greifbar.** Gesicht, Region und Excel-Alltag vermitteln Vertrauen ohne abstrakte Werbesprache.
- **Die Gestaltung bleibt ruhig.** Typografie, Kontrast und geordnete Leistungszeilen tragen die Inhalte; keine austauschbare Kartenwand.
- **Die grundlegende Bedienung funktioniert.** Mobile Navigation schließt nach Auswahl, fünf kurze FAQ-Antworten sind direkt sichtbar, die Kontaktadresse ist ausgeschrieben. Beide geprüften Breiten bleiben ohne horizontalen Überlauf.

**Die vier wichtigsten Verbesserungen – alle P2, keine beobachtete P0/P1-Blockade:**

1. **Den Erstgespräch-CTA präzisieren.** „Erstgespräch vereinbaren“ klingt nach Terminwahl; aktuell führen die Hauptaktionen zu einer E-Mail. Erst unten wird das eindeutig benannt. Einheitlich „Erstgespräch anfragen“ verwenden und daneben kurz erklären: Welche Angaben helfen, und was passiert danach? Eine Gesprächsdauer nur ergänzen, wenn sie tatsächlich feststeht. Ansatz: `$impeccable clarify`. Quellen: [Header.astro](/Users/alexanderschafer/Development/blog-gh-pages/src/components/Header.astro:19), [site.ts](/Users/alexanderschafer/Development/blog-gh-pages/src/data/site.ts:38).

2. **Eine Referenz zum überzeugenden Beweis ausbauen.** Das Excel-Versprechen trifft ein konkretes Problem; die Projekte zeigen überwiegend Branchen, Plattformen und Technologien. Drei von fünf Bildern sind Symbolbilder, vier Projekte bieten keine Vertiefung. Einen tatsächlichen Mobistro-Ablauf als „vorher → umgesetzt → danach“ erklären, mit passendem Bildausschnitt und belegten Ergebnissen. Qualitative Ergebnisse genügen; keine Kennzahlen erfinden. Übrige Referenzen können kompakter bleiben. Ansatz: `$impeccable shape`. Quellen: [Projektdaten](/Users/alexanderschafer/Development/blog-gh-pages/src/data/site.ts:154), [Projects.astro](/Users/alexanderschafer/Development/blog-gh-pages/src/components/Projects.astro:12).

3. **Betriebe und technische Teams klarer führen.** Zwischen Leistungsangebot und Referenzen wechselt „Sie haben schon ein Team?“ zur Senior-iOS-Verstärkung. Nichttechnische Betriebe müssen dabei SAFe, Frameworks und Architekturbegriffe übersetzen. Den Betriebs-Pfad bis zu einer passenden Referenz fortsetzen; Teamverstärkung als erkennbaren Nebenpfad bündeln und technische Details dort konzentrieren. Ansatz: `$impeccable distill`. Quellen: [Seitenreihenfolge](/Users/alexanderschafer/Development/blog-gh-pages/src/pages/index.astro:14), [Teamverstärkung](/Users/alexanderschafer/Development/blog-gh-pages/src/data/site.ts:119).

4. **Den Desktop-Hero kompakter setzen.** Bei 1280×720 nimmt die Überschrift fünf Zeilen ein; der Hero-CTA beginnt erst bei y≈803 px. Der Header-CTA bleibt sichtbar, deshalb ist die Kontaktaufnahme nicht blockiert. Schriftgröße, Textspaltenbreite und Porträtausrichtung so abstimmen, dass Problem, Erklärung und Hero-Aktion früher zusammen lesbar sind. Mobil bei 390×844 ist der CTA bereits sichtbar; dort nicht pauschal verkleinern. Ansatz: `$impeccable layout`. Quelle: [Hero.astro](/Users/alexanderschafer/Development/blog-gh-pages/src/components/Hero.astro:13).

**Kognitive Belastung: moderat.** Drei von acht Skill-Kriterien sind nicht vollständig erfüllt: ein durchgehender Fokus, zurückgestellte technische Details und die strikte Grenze von vier sichtbaren Auswahlmöglichkeiten. Die Navigation hat vier Abschnittslinks plus CTA; durch deren unterschiedliche Gewichtung entsteht daraus kein schwerer Wahlstress. Gruppierung, Informationsportionen, Hierarchie, schrittweise Leseführung und geringe Erinnerungsanforderungen funktionieren. Fünf nacheinander gezeigte Projekte sind keine gleichzeitige Optionsflut.

**Emotionale Reise:** Der Einstieg erzeugt Wiedererkennung und Vertrauen. Die Teamverstärkung unterbricht den Betriebs-Pfad; das echte Mobistro-Dashboard liefert anschließend einen stärkeren Beleg als die Symbolbilder. „Kostenlos“, „unverbindlich“ und die schriftliche Einschätzung beruhigen am Ende. Eine knappe Anleitung zur ersten E-Mail würde diesen Abschluss vervollständigen.

**Für die wichtigsten Besuchertypen:**

- **Jordan, erstmals hier:** versteht den Einstieg, muss später technische Begriffe übersetzen und den Kontaktweg selbst erschließen.
- **Riley, skeptisch:** erkennt Erfahrung, bekommt aber zu wenig konkreten Beleg dafür, wie sich ein betrieblicher Ablauf verbessert.
- **Casey, mobil und abgelenkt:** kann Menü und CTA bedienen; der lange Referenzteil und die selbst zu formulierende Anfrage kosten Aufmerksamkeit.

**Kleinere Beobachtungen:** Der grüne Rahmen nur um Prozessschritt D1 kann wie ein aktueller Bearbeitungsstatus wirken. Escape schließt das mobile Menü nicht; Öffner und Linkauswahl funktionieren. Die direkt sichtbaren FAQ passen zum kurzen Inhalt und brauchen kein Akkordeon. Ein vollständiger Tastatur-, Screenreader- oder Kontrastaudit war nicht Teil dieser Kritik.

**Gestaltungsfragen:** Welche Referenz würde allein das Excel-Versprechen tragen? Und welcher konkrete verbesserte Arbeitsablauf soll einem Betriebsinhaber nach zehn Sekunden im Gedächtnis bleiben?
