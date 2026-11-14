#!/usr/bin/env bash
# Выкладка сайта joker-kvn.club на сервер в Москве (UltraVDS, 13.143.207.76).
# Выкладывает последнюю закоммиченную версию (HEAD) — только файлы сайта,
# без .git, служебных файлов GitHub Pages/Netlify, README и этого скрипта.
# Запуск из папки сайта:  bash deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

HOST=deploy@13.143.207.76
DIR=/var/www/joker-kvn.club
KEY="$HOME/.ssh/claude_vpn_bot"

FILES=$(git ls-files | grep -vE '^(\.|CNAME$|README\.md$|deploy\.sh$|CLAUDE\.md$|web-trial-api\.md$)')

git archive --format=tar HEAD $FILES | gzip | \
  ssh -i "$KEY" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new "$HOST" \
  "set -e; T=\$(mktemp -d); tar -xzf - -C \$T; find $DIR -mindepth 1 -delete; cp -a \$T/. $DIR/; rm -rf \$T; chmod -R u+rwX,go+rX $DIR; find $DIR -type f | sort"

echo "Готово: выложена версия $(git log -1 --format='%h %s')"
