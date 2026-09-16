# Science is How? — Development Guide

Interactive stories from the history of science and math. Live at https://scienceishow.com
(Netlify, auto-deploys `main`; site id `99d1a9c7-7748-4932-909e-7ed47b2f6ef9`).

## Stack
React 18 + TypeScript + Vite 5 SPA, Tailwind 3 (design tokens as CSS variables in
`src/index.css`, dark mode via `prefers-color-scheme`), React Router 6, `react-awesome-reveal`
for fades. No backend.

## Layout
- `src/concepts/<slug>/` — one folder per story: `meta.json` (metadata) + `index.tsx`
  (`{ Intro, steps }`) + `steps/`. **Read `src/concepts/README.md` before writing a story.**
- `src/content/stories.ts` — registry; globs every concept folder. Nothing to register by hand.
- `src/concepts/shared/StoryLayout.tsx` — title bar, progress, prev/next, keyboard nav,
  "Up next", story analytics events.
- `src/components/` — `Button`, `MiniSteps` (the "click Ok" scene stepper), `Callout`,
  `StoryCard`, header/footer, `DataDiveFeedback`, `ErrorBoundary`.
- `src/pages/` — Home, Stories (with category filter), About, NotFound.
- `scripts/prerender.mjs` — runs after `vite build`; writes a static HTML page per route
  with SEO meta + JSON-LD + crawlable snapshot, plus `sitemap.xml` and `robots.txt`.
- `scripts/og-images.mjs` — local-only generator for `public/og/*.jpg` social cards.
- `public/_redirects` — Netlify SPA fallback + 301 from the old `/russels-paradox` slug.

## Commands
`npm run dev` · `npm run lint` · `npm run build` (tsc + vite + prerender) · `npm run og`

## Data Dive Analytics
This site is tracked in Data Dive (GA4).
- **GA4 property**: `properties/554574468` · **Measurement ID**: `G-KXW7GNNK3B`
  (web stream `properties/554574468/dataStreams/15790232902`, default URI scienceishow.com)
- **Slug**: `science-is-how` · **Category**: education
- gtag.js is loaded in `index.html` with `send_page_view: false`; `src/App.tsx` sends a
  `page_view` on every route change after updating the document title.
- Integration: `src/lib/analytics.ts` (Tier 1 universal events + Tier 2 story events).
- Key funnel events: `story_start` → `step_view` (has `progress` 0-1) → `story_complete`,
  plus `story_interaction` (widget, action) and `share_click`. Compare `story_start` to
  `story_complete` per story to find where readers drop off, and `story_interaction` to see
  whether the widgets are actually being played with.
- Feedback widget (`DataDiveFeedback`) files `data-dive-feedback` issues in this repo.
  Check `gh issue list --label data-dive-feedback` and `--label data-dive-alert` at session start.

## Content backlog (ideas not yet written)
Zeno's paradoxes (Achilles and the tortoise), the Prisoner's Dilemma (Axelrod's tournament),
Buffon's needle (estimating pi), Semmelweis and handwashing, Newton's prism, the pigeonhole
principle, the halting problem, Gödel's incompleteness (pairs well with Russell's Paradox).

## Conventions
- Accuracy over flourish: real dates, real quotes or none.
- Every story needs at least one interactive widget and must work at 390px wide.
- Only use the color tokens (`bg-surface`, `text-ink`, `text-accent`, ...) so dark mode works.
- New illustrations are inline SVG or small SVG files in `src/assets/`; legacy cartoons are WebP.
- Don't add routes by hand; the registry and prerender derive everything from `meta.json`.
