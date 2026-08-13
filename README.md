# TBJ 500 Error Page

A standalone **500 Internal Server Error** page with a stacked log-file animation. Editor windows fan out like a stack trace, draw fake syntax lines, and can be thrown away on click.

## Preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

Then visit [http://127.0.0.1:8765](http://127.0.0.1:8765).

## Interaction

1. The stack tilts, then fans out.
2. Hover a window to lift it.
3. Click a window to throw it off-screen.
4. After the last log is gone, the copy updates.
5. **Go home** returns to `/`. **Try again** reloads the page.

Motion is skipped when `prefers-reduced-motion` is set.

## Structure

```
├── index.html
├── css/tbj.css
└── js/tbj.js
```

Drop the three files onto any server (or a Laravel/Herd site) and point 500 responses at `index.html`.

## License

MIT. See [LICENSE](LICENSE).
