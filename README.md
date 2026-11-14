# Worldviews-in-Motion
An animated watercolor visualizer of the world's major worldviews.

Each worldview is shown as one painting that answers four questions in turn: where we came from, what went wrong, what puts it right, and where it all ends. Six worldviews are built so far, each one question away from the last: Christian theism, deism ("What if God never spoke?"), naturalism ("What if there is no clockmaker?"), nihilism ("What if none of it matters?"), existentialism ("What if man makes his own meaning?") and Hindu monism ("What if the separate self is an illusion?"). Asking the question turns one painting into the next.

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

Add an entry to `WORLDVIEWS` in `js/worldviews.js`: a base set of values, then what changes in each of its four acts. Any value left out of an act keeps its base value. Give it a `move` naming the worldview it leads to and the question that leads there.
