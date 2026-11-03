# SINCEP-AFRICA

Redesign of [sincep-africa.org](https://sincep-africa.org), with a shareable preview at
**https://gidoo5331.github.io/SINCEP-AFRICA/**

## Where things are

| File | What it is |
|---|---|
| `snippets/homepage.html` | Homepage — the exact code for the Elementor HTML widget |
| `snippets/work-packages.html` | Work Packages page — same |
| `snippets/consortium-partners.html` | Consortium Partners page — same |
| `snippets/project-overview.html`, `governance.html`, `funding.html`, `news-events.html`, `tools-documents.html` | **"Redesign coming soon" placeholders** — replace each with the new design when that page is redesigned (preview only; don't paste a placeholder into WordPress) |
| `sincep-nav.js` | The new header (preview only for now; the live header is built in the Blocksy theme) |
| `index.html` and the other `*.html` in this folder | Preview pages, one per nav item. They load the matching snippet and add the header — **don't edit these** |
| `preview.js` | Loads the snippets into the preview pages |

## Making a change

1. Edit the page's file in `snippets/`.
2. Push it — the preview link updates within a minute or two:
   ```
   git add -A && git commit -m "Describe the change" && git push
   ```
3. Copy the whole snippet file into the page's Elementor HTML widget and update the page in WordPress.

The snippet files are WordPress-ready as they are: nothing to remove before pasting.

## Viewing the preview on your computer

The preview pages load the snippets, which browsers block for files opened straight from disk. Run a local server in this folder:

```
python3 -m http.server 8000
```

then open http://localhost:8000/ — or use the VS Code **Live Server** extension.
