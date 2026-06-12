# SPCX Live Dashboard

A single static HTML page showing the live SpaceX (SPCX, NasdaqGS) share price with optional
position-return math.

- **No build, no server, no API key.** The page fetches the Yahoo Finance quote from the browser,
  falling back across public CORS relays automatically. Refreshes every second while open.
- **No figures stored here.** Position values load only from URL parameters:
  `?pos=<current value at $135>&cost=<original investment>` (optional: `&ref=`, `&val=`, `&int=`, `&sym=`,
  and `&proxy=<base URL>` to use a dedicated quote proxy instead of public relays).
- Manual price override + slider for when the tape lags.

Open `index.html` (or the GitHub Pages URL for this repo) and append your parameters.
