#!/usr/bin/env bash
# Lädt dist/ per rsync über SSH auf den Webspace bei dogado.
#
# Erwartet:
#   DEPLOY_SSH_KEY      privater Deploy-Schlüssel (nur für dieses Deployment)
#   DEPLOY_KNOWN_HOSTS  Host-Schlüssel des Servers (Ausgabe von ssh-keyscan)
#   DEPLOY_TARGET       user@host:/absoluter/pfad/zum/docroot/
#   DRY_RUN=1           optional: nur anzeigen, was sich ändern würde
#
# Schutz: Im Ziel muss die Datei .appconcept-site liegen. So kann ein falsch
# gesetzter Pfad nie fremde Daten löschen, obwohl rsync mit --delete läuft.
set -euo pipefail

: "${DEPLOY_SSH_KEY:?DEPLOY_SSH_KEY fehlt}"
: "${DEPLOY_KNOWN_HOSTS:?DEPLOY_KNOWN_HOSTS fehlt}"
: "${DEPLOY_TARGET:?DEPLOY_TARGET fehlt}"

if [[ ! "$DEPLOY_TARGET" =~ ^[^:@/]+@[^:/]+:/.*/$ ]]; then
  echo "DEPLOY_TARGET muss die Form user@host:/absoluter/pfad/ haben (mit / am Ende)." >&2
  exit 1
fi
if [[ ! -f dist/index.html ]]; then
  echo "dist/ fehlt – zuerst npm run build ausführen." >&2
  exit 1
fi

workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT
printf '%s\n' "$DEPLOY_SSH_KEY" > "$workdir/key"
chmod 600 "$workdir/key"
printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > "$workdir/known_hosts"
ssh_cmd="ssh -i $workdir/key -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$workdir/known_hosts"

remote_host=${DEPLOY_TARGET%%:*}
remote_path=${DEPLOY_TARGET#*:}
if ! $ssh_cmd "$remote_host" "test -f '${remote_path}.appconcept-site'"; then
  echo "Im Ziel fehlt .appconcept-site – Zielverzeichnis nicht bestätigt, Abbruch." >&2
  exit 1
fi

rsync -rlz --checksum --delete --itemize-changes \
  --filter='P .appconcept-site' \
  --filter='P .well-known/' \
  ${DRY_RUN:+--dry-run} \
  -e "$ssh_cmd" \
  dist/ "$DEPLOY_TARGET"
