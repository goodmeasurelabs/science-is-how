# Science is How?

Interactive stories from the history of science and math, live at
[scienceishow.com](https://scienceishow.com). Each story takes a famous moment (a letter,
a bet, a lecture) and walks through the idea one playful step at a time, with something to
click on in every story.

## Stack

- React 18 + TypeScript + Vite 5, Tailwind 3, React Router 6
- Hosted on Netlify (auto-deploys `main`; `public/_redirects` handles the SPA fallback and
  the legacy `/russels-paradox` URL)
- Google Analytics 4 via the shared Data Dive event vocabulary (`src/lib/analytics.ts`)
- No backend. The feedback widget posts to the Data Dive API, which files GitHub issues here.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # tsc + vite build + scripts/prerender.mjs (SEO pages, sitemap, robots)
npm run preview
```

## Add a story

Read [`src/concepts/README.md`](src/concepts/README.md). In short: create
`src/concepts/<slug>/` with a `meta.json` and an `index.tsx` that default-exports
`{ Intro, steps }`, drop a cover illustration in `src/assets/`, and you're done. The
registry, routes, home page, footer, sitemap and prerendered SEO pages all pick it up.

Then regenerate the social preview images (needs a local Chromium; see
`scripts/og-images.mjs` for the env vars) and commit `public/og/*.jpg`:

```bash
npm run og
```

## How SEO works on a SPA

`scripts/prerender.mjs` runs after `vite build` and writes a static `index.html` for every
route (`dist/<slug>/index.html`, `dist/<slug>/<step>/index.html`, ...) with the right
title, description, canonical, Open Graph tags, JSON-LD and a crawlable HTML snapshot of
the page inside `#root`. React replaces the snapshot on mount. Netlify serves those files
directly, so crawlers and link previews never see the generic shell.
