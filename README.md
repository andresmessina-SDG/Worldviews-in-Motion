# Worldviews-in-Motion
An animated watercolor visualizer of the world's major worldviews.

Each worldview is shown as one painting that answers four questions in turn: where we came from, what went wrong, what puts it right, and where it all ends. The first worldview built is Christian theism, told as Creation, Fall, Redemption and New Creation.

Two layers make up every page. The painting shows what the worldview says exists. Plain strokes drawn over it show how those things relate: what joins them, which way it runs, and where we are in history.

## Running locally

It is a static site with no build step. Serve the folder with any web server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Click a mark on the line of history, or use the left and right arrow keys, to move between acts.

## Layout

- `index.html`, `css/style.css`: the page, its lettering and its layout
- `js/christian.js`: Christian theism: the words for each act, the watercolor shader, and the connectors
- `studies/`: earlier style studies and prototypes for other worldviews
