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
