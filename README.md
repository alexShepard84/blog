# app-concept.de

Website von AppConcept – Alexander Schäfer, Softwareentwicklung, Apps und KI-Beratung aus Limburg an der Lahn.

Statische Seite mit [Astro](https://astro.build), gehostet bei dogado.

## Entwicklung

    npm install
    npm run dev        # http://localhost:4321
    npm test           # Unit-Tests, Build, Dist-Tests
    npm run check      # Typprüfung (astro check)
    npm run images     # Touch-Icon und OG-Bild neu erzeugen (danach committen)

Inhalte (Texte, Projekte, FAQ) stehen in `src/data/site.ts`.
Die Leistungsseiten `/ios-freelancer/` und `/software-automatisierung/`
verwenden `src/data/service-pages.ts` und ein gemeinsames Seitenlayout.

## SEO und Cache-Prüfung

Der Build ergänzt beide Leistungsseiten automatisch in der Sitemap.
HTML, Sitemap und robots.txt werden revalidiert. Öffentliche Assets ohne
Inhalts-Hash erhalten eine Stunde Cache-Laufzeit; die versionierten Dateien
unter `/_astro/` erhalten über eine eigene `.htaccess` ein Jahr mit
`immutable`. Fehlerantworten erhalten diesen Jahrescache nicht.

Die HTTP-Prüfung benötigt Apache mit `mod_headers`/`mod_rewrite` oder die
veröffentlichte Website. `astro preview` wertet `.htaccess` nicht aus:

    SEO_BASE_URL=http://127.0.0.1:4328 node --test tests/http/cache.test.mjs

Nach einem Deployment denselben Test mit `SEO_BASE_URL=https://www.app-concept.de`
ausführen. Ein vorgeschalteter Webserver kann statische Assets direkt
ausliefern; deshalb ersetzt die lokale Apache-Prüfung nicht die Kontrolle
der Header bei dogado.

## Deployment

Jeder Push auf `main` wird von GitHub Actions geprüft und per FTPS (FTP mit
TLS) auf den Webspace bei dogado übertragen (`scripts/deploy.sh`, `lftp
mirror --delete`). Benötigte Repo-Secrets:

- `DEPLOY_FTP_HOST` – z. B. `web277.dogado.net`
- `DEPLOY_FTP_USER` – FTP-Benutzer
- `DEPLOY_FTP_PASSWORD` – FTP-Passwort
- `DEPLOY_FTP_DIR` – absoluter Pfad zum Webroot, mit `/` am Ende
- `FORBIDDEN_TERMS` – private Sperrbegriffe für die Inhaltsprüfung, ein Begriff pro Zeile

Im Zielverzeichnis muss die Datei `.appconcept-site` liegen. Fehlt sie, läuft
nur ein Probelauf (Ordnerinhalt und geplante Änderungen im Log), und nichts
wird verändert. Das schützt davor, mit einem falschen Pfad fremde Dateien zu
löschen. Die `.htaccess` (404-Seite, Weiterleitung auf `www`, alte URLs)
entsteht beim Build.

Webroot unbekannt? Den Workflow „Build and deploy“ manuell mit der Option
„Nur die Ordner des FTP-Kontos auflisten“ starten
(`gh workflow run deploy.yml -f discover=true`). Er listet die Ordner und
Fundstellen von `index.html` im Log auf und verändert nichts.
