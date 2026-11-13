# Worldviews-in-Motion
An animated watercolor visualizer of the world's major worldviews.

Every worldview is painted from the same few primitives (the Ultimate, the world, the self, the bridge, the problem, the remedy, and the shape of time) and answers the same four questions: Origin, Problem, Remedy, Destiny. Moving between worldviews morphs one painting into another, so the differences are seen rather than read.

## Running locally

It is a static site with no build step. Serve the folder with any web server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Layout

- `index.html`, `css/style.css`: the page and its controls
- `js/paint.js`: the watercolor engine (a single WebGL shader)
- `js/worldviews.js`: the content, one "score" per worldview
- `js/main.js`: morphing, labels, and navigation

## Adding a worldview

Add an entry to `WORLDVIEWS` in `js/worldviews.js` with its four acts, labels, and moves, then add its id to `ORDER`.
