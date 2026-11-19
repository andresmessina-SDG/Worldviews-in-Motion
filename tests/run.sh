#!/usr/bin/env bash
# Runs the tests against the site served from this checkout, in English and in Spanish.
#   tests/run.sh            the quick tests (about 20 minutes)
#   tests/run.sh all        and the layout sweep (about 15 minutes more per language)
#   tests/run.sh menu.js    one test, in both languages
# Needs Node and Playwright with its Chromium: cd tests && npm install && npx playwright install chromium
set -u
cd "$(dirname "$0")/.."
PORT="${PORT:-8765}"
export BASE="${BASE:-http://localhost:$PORT}"
if ! curl -s -o /dev/null "$BASE/"; then
  python3 -m http.server "$PORT" >/dev/null 2>&1 &
  SERVER=$!
  trap 'kill $SERVER 2>/dev/null' EXIT
  sleep 1
fi
case "${1:-}" in
  all) TESTS="suite.js menu.js language.js shaders.js layout.js" ;;
  "") TESTS="suite.js menu.js language.js shaders.js" ;;
  *) TESTS="$1" ;;
esac
failed=0
for t in $TESTS; do
  # (the language and shader tests choose their own language)
  case "$t" in language.js|shaders.js) langs="en" ;; *) langs="en es" ;; esac
  for l in $langs; do
    echo "== $t ($l)"
    out="$(SITE_LANG="$l" node "tests/$t" 2>&1)" || failed=1
    grep -E "^(FAIL|ALL PASS|[0-9]+ FAILED|errors|note)" <<<"$out" || echo "$out" | tail -5
  done
done
[ $failed -eq 0 ] && echo "== everything passed" || echo "== some tests FAILED"
exit $failed
