# Worldviews-in-Motion
An animated watercolor visualizer of the world's major worldviews.

Each worldview is shown as one painting that answers four questions in turn: where we came from, what went wrong, what puts it right, and where it all ends. Seventeen worldviews are built so far, each one question away from the last: Christian theism, deism ("What if God never spoke?"), Moralistic Therapeutic Deism ("What if the distant God is there when we need him?"), Judaism ("What if God must be obeyed, not just called on?"), Islam ("What if God spoke again, through one last prophet?"), naturalism ("What if no one is up there at all?"), secular humanism ("What if man can be good without God?"), nihilism ("What if none of it matters?"), existentialism ("What if man makes his own meaning?"), postmodernism ("What if even the self is made by language?"), Marxism ("What if one story does explain it all: the war of classes?"), Hindu monism ("What if matter is an illusion, and all is one?"), Buddhism ("What if there is no self, and no One either?"), Taoism ("What if we should flow with change, not escape it?"), Confucianism ("What if order comes from duty, not from letting go?"), animism ("What if the world itself is full of spirits?") and Platonism ("What if reason can climb past the spirits to the Good?"), which leads back to Christian theism by asking "What if the Word became flesh?". Asking the question turns one painting into the next.

Two layers make up every page. The painting shows what the worldview says exists. Plain strokes drawn over it show how those things relate: what joins them, which way it runs, and where we are in history.

## Running locally

It is a static site with no build step. Serve the folder with any web server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Click a mark on the line of history, or use the left and right arrow keys, to move between acts.

## Layout

- `index.html`, `css/style.css`: the page, its lettering and its layout
- `js/worldviews.js`: the worldviews: their words, and the values the painting reads for each act
- `js/paint.js`: the watercolor shader
- `js/main.js`: moving between acts and worldviews, lettering, connectors and the clock
- `studies/`: earlier style studies and prototypes for other worldviews

## Adding a worldview

Add an entry to `WORLDVIEWS` in `js/worldviews.js`: a base set of values, then what changes in each of its four acts. Any value left out of an act keeps its base value. Give it a `move` naming the worldview it leads to and the question that leads there, and reword the question of the worldview that now leads into it. Its `id` must match its entry in `js/catalogue.js`.

The rules that keep the site working are written as comments where they apply:

- `js/worldviews.js`, at the top: every base holds every key, scene units, labels and wording.
- `js/main.js`, above the connectors: how to draw them so they stay steady and whole in every browser.
- `js/paint.js`, at the top: how to add to the painting without slowing it down or making moving shapes shimmer.
- `index.html` and `js/main.js`: the `?v=` number to raise on each deploy.
