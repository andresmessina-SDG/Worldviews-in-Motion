# Worldviews-in-Motion
An animated watercolor visualizer of the world's major worldviews.

Each worldview is shown as one painting that answers four questions in turn: where we came from, what went wrong, what puts it right, and where it all ends. All twenty-two worldviews are built, each one question away from the last: Christian theism, Judaism ("What if the Messiah has not yet come?"), Islam ("What if God spoke again, through one last prophet?"), deism ("What if God never spoke at all?"), Moralistic Therapeutic Deism ("What if the distant God is there when we need him?"), naturalism ("What if no one is there to call on?"), secular humanism ("What if man can be good without God?"), nihilism ("What if none of it matters?"), existentialism ("What if man makes his own meaning?"), postmodernism ("What if even the self is made by language?"), Marxism ("What if one story is true after all: class war?"), expressive individualism ("What if it is the self that needs freeing?"), transhumanism ("What if the body itself can be remade to fit the self?"), New Age ("What if man becomes divine by awakening, not by machines?"), neo-paganism ("What if the gods are many?"), Hindu monism ("What if the many gods are faces of one?"), Buddhism ("What if there is no self, and no One either?"), Taoism ("What if we should flow with change, not escape it?"), Confucianism ("What if order comes from duty, not from letting go?"), animism ("What if the ancestors are not the only spirits?"), Platonism ("What if reason can climb past the spirits to the Good?") and Gnosticism ("What if the craftsman is blind?"), which leads back to Christian theism by asking "What if God came in the flesh?". Asking the question turns one painting into the next.

Two layers make up every page. The painting shows what the worldview says exists. Plain strokes drawn over it show how those things relate: what joins them, which way it runs, and where we are in history.

## Running locally

It is a static site with no build step. Serve the folder with any web server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. A label with a bud after its name has a note: click or tap it to open the note on a card. The site is in English and Spanish: the switch at the top right changes the language where you stand, `?lang=es` in the address opens the site in Spanish, and the choice is remembered. Click a mark on the line of history, or use the left and right arrow keys, to move between acts.

## Layout

- `index.html`, `css/style.css`: the page, its lettering and its layout
- `js/worldviews.js`: the worldviews: their words, and the values the painting reads for each act
- `js/es.js`: the site in Spanish, laid over the English when Spanish is chosen
- `js/notes.js`: a little more about each element, in both languages, opened on a card from its label
- `js/paint.js`: the watercolor shader
- `js/main.js`: moving between acts and worldviews, lettering, connectors and the clock
- `studies/`: earlier style studies and prototypes for other worldviews

## Adding a worldview

Add an entry to `WORLDVIEWS` in `js/worldviews.js`: a base set of values, then what changes in each of its four acts. Any value left out of an act keeps its base value. Give it a `move` naming the worldview it leads to and the question that leads there, and reword the question of the worldview that now leads into it. Its `id` must match its entry in `js/catalogue.js`. Give it its Spanish too, in `js/es.js`, with the same labels in each act.

The rules that keep the site working are written as comments where they apply:

- `js/worldviews.js`, at the top: every base holds every key, scene units, labels and wording.
- `js/main.js`, above the connectors: how to draw them so they stay steady and whole in every browser.
- `js/paint.js`, at the top: how to add to the painting without slowing it down or making moving shapes shimmer.
- `index.html` and `js/main.js`: the `?v=` number to raise on each deploy.
