# SPCX Live Dashboard

A single static HTML page showing the live SpaceX (SPCX, NasdaqGS) share price with optional
position-return math.

- **No build, no server, no API key.** The page fetches the quote from the browser — CNBC's public
  CORS-enabled quote feed first, falling back to Yahoo Finance via a public relay. Refreshes every
  second while open.
- **Anonymous position.** The page shows a position (no names attached) with live return math.
  URL parameters override the defaults: `?pos=<current value at $135>&cost=<original investment>`
  (optional: `&ref=`, `&val=`, `&int=`, `&sym=`, and `&proxy=<base URL>` to use a dedicated quote proxy).
- Manual price override + slider for when the tape lags.

Open `index.html` (or the GitHub Pages URL for this repo) — it works as-is.
