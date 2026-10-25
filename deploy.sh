#!/usr/bin/env bash
# Deploys the site from main to the gh-pages branch.
# Usage: ./deploy.sh "optional commit message"
set -euo pipefail

cd "$(dirname "$0")"

git -C . rev-parse --verify main >/dev/null 2>&1

MSG="${1:-Deploy site $(date '+%Y-%m-%d %H:%M')}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# 1. Export the site files from main
git archive main | tar -x -C "$TMP"

# 2. Refresh the orphan gh-pages branch
CURR="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURR" != "gh-pages" ]; then
  git checkout gh-pages -q 2>/dev/null || git checkout --orphan gh-pages -q
fi
git rm -rf -q . 2>/dev/null || true
cp -R "$TMP/index.html" "$TMP/assets" .
touch .nojekyll
git add -A

# 3. Commit only if there are changes; then push and return to main
if ! git diff --cached --quiet; then
  git commit -q -m "$MSG"
fi
git push -q origin gh-pages
git checkout main -q

echo "Deployed: $(git log origin/gh-pages -1 --format='%h %s')"
