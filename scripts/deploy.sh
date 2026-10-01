#!/usr/bin/env bash
# Lädt dist/ per FTPS (FTP mit TLS) auf den Webspace bei dogado.
#
# Erwartet:
#   DEPLOY_FTP_HOST      z. B. web277.dogado.net
#   DEPLOY_FTP_USER      FTP-Benutzer
#   DEPLOY_FTP_PASSWORD  FTP-Passwort (nur als Secret, nie im Repo)
#   DEPLOY_FTP_DIR       absoluter Pfad zum Webroot, mit / am Ende
#   DRY_RUN=1            optional: nur anzeigen, was sich ändern würde
#   DEPLOY_DISCOVER=1    optional: nur Ordner des FTP-Kontos auflisten, um den
#                        Webroot zu finden; braucht weder DEPLOY_FTP_DIR noch dist/
#
# Schutz: Fehlt im Ziel die Datei .appconcept-site, läuft nur ein Probelauf
# (Inhalt des Ordners und geplante Änderungen) und das Skript bricht ab. So
# kann ein falsch gesetzter Pfad nie fremde Daten löschen, obwohl mit
# --delete gespiegelt wird.
#
# Zertifikat: dogado liefert für FTP ein Zertifikat auf *.dogado.de aus, der
# Server heißt aber web277.dogado.net. Deshalb prüft openssl vorab, dass das
# Zertifikat gültig ist und zu *.dogado.de gehört; lftp verschlüsselt dann
# zwingend, prüft aber den Hostnamen nicht noch einmal.
set -euo pipefail

discover=${DEPLOY_DISCOVER:-}

for name in DEPLOY_FTP_HOST DEPLOY_FTP_USER DEPLOY_FTP_PASSWORD; do
  if [[ -z "${!name:-}" ]]; then
    echo "$name fehlt." >&2
    exit 1
  fi
done
if [[ -z "$discover" ]]; then
  if [[ -z "${DEPLOY_FTP_DIR:-}" ]]; then
    echo "DEPLOY_FTP_DIR fehlt. Den Webroot findest du mit DEPLOY_DISCOVER=1 (listet nur auf)." >&2
    exit 1
  fi
  if [[ ! "$DEPLOY_FTP_DIR" =~ ^/.*/$ ]]; then
    echo "DEPLOY_FTP_DIR muss ein absoluter Pfad mit / am Ende sein." >&2
    exit 1
  fi
  if [[ ! -f dist/index.html ]]; then
    echo "dist/ fehlt – zuerst npm run build ausführen." >&2
    exit 1
  fi
fi
command -v lftp >/dev/null || { echo "lftp fehlt." >&2; exit 1; }
command -v openssl >/dev/null || { echo "openssl fehlt." >&2; exit 1; }

if ! echo | openssl s_client -starttls ftp -connect "$DEPLOY_FTP_HOST:21" \
  -verify_hostname deploy-check.dogado.de -verify_return_error >/dev/null 2>&1; then
  echo "TLS-Zertifikat von $DEPLOY_FTP_HOST ist nicht gültig für *.dogado.de – Abbruch." >&2
  exit 1
fi

export LFTP_PASSWORD="$DEPLOY_FTP_PASSWORD"
login="set cmd:fail-exit true; set net:max-retries 2; set ftp:ssl-force true; set ftp:ssl-protect-data true; set ssl:verify-certificate true; set ssl:check-hostname false; open --env-password -u '$DEPLOY_FTP_USER' 'ftp://$DEPLOY_FTP_HOST'"

if [[ -n "$discover" ]]; then
  echo "Erkundungsmodus: Ordner des FTP-Kontos (nur lesen, nichts wird verändert)." >&2
  lftp -c "$login; pwd; cls -la; find --maxdepth=2 ."
  echo "Fundstellen von index.html (Kandidaten für den Webroot):" >&2
  lftp -c "$login; find --maxdepth=4 . | grep -E 'index\\.html\$' || true"
  exit 0
fi

connect="$login; cd '$DEPLOY_FTP_DIR'"
mirror="mirror --reverse --delete --verbose --exclude-glob .appconcept-site --exclude-glob .well-known/"

if lftp -c "$connect; cls -1 .appconcept-site" >/dev/null 2>&1; then
  lftp -c "$connect; $mirror ${DRY_RUN:+--dry-run} dist/ ./"
else
  echo "Im Ziel fehlt .appconcept-site – nur Probelauf, es wird nichts verändert." >&2
  lftp -c "$connect; cls -la; $mirror --dry-run dist/ ./"
  exit 1
fi
