# Tests

Browser tests for the site, run with Playwright against a local copy served from this checkout.

## Running

```
cd tests
npm install
npx playwright install chromium
./run.sh          # the quick tests, in English and Spanish (about 20 minutes)
./run.sh all      # and the layout sweep (about 15 minutes more per language)
./run.sh menu.js  # one test
```

`run.sh` serves the site on port 8765 if nothing is there already. Each test prints PASS or FAIL for every check and
ends with ALL PASS or the number that failed; `run.sh` prints only the failures and the summary lines, and exits
non-zero if anything failed. A single test can also be run by hand, with the site already served:

```
SITE_LANG=es node tests/suite.js
```

`BASE` points the tests at another address (for example the published site), and `SITE_LANG` (`en` or `es`) chooses
the language.

## The tests

- `suite.js`: the page's behaviour. The loop of 22 worldviews by their questions, twice, at a desktop and a phone
  size; moves interrupted by other moves and by keys; a typed address and a resize during a move; Back; the light
  under a label; the drift of the words; reduced motion; the labels on a phone.
- `menu.js`: the menu of worldviews down the left edge, by mouse, keyboard and touch.
- `language.js`: the change of language and the buds on phone labels, at their edges: rapid clicks, a change during
  a move, history, resizing, blocked storage, Spanish failing to load, reduced motion, the keyboard.
- `shaders.js`: the painting's shader programs, with a software GPU. Every version must compile without errors.
- `layout.js`: every act of every worldview at 21 window sizes, from a 320-pixel phone to an ultrawide screen. No
  words, label, name of an act or the language switch may lie on another or run off the page. "menu open" lines are
  notes, not failures: the test's own mouse can call the menu out.

Timings in the tests allow for a slow machine. On a much slower one a check that waits for a move to settle may fail
for that reason alone, so run a failure again before believing it.
