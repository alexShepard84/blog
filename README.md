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

Jeder Push auf `main` wird von GitHub Actions geprüft und per `rsync` über SSH
auf den Webspace bei dogado übertragen (`scripts/deploy.sh`). Benötigte
Repo-Secrets:

- `DEPLOY_SSH_KEY` – privater Deploy-Schlüssel
- `DEPLOY_KNOWN_HOSTS` – Host-Schlüssel des Servers (`ssh-keyscan`)
- `DEPLOY_TARGET` – `user@host:/absoluter/pfad/zum/docroot/`
- `FORBIDDEN_TERMS` – private Sperrbegriffe für die Inhaltsprüfung, ein Begriff pro Zeile

Im Zielverzeichnis muss die Datei `.appconcept-site` liegen, sonst bricht das
Deployment ab. Das schützt davor, mit einem falschen Pfad fremde Dateien zu
löschen. Die `.htaccess` (404-Seite, Weiterleitung auf `www`, alte URLs)
entsteht beim Build.
