# Writing a story

Every story is a folder under `src/concepts/<slug>/` with two required files. Nothing else
in the app needs to change; the registry in `src/content/stories.ts` picks folders up
automatically and the build script generates SEO pages from `meta.json`.

```
src/concepts/monty-hall/
  meta.json        metadata (see StoryMeta in src/content/types.ts)
  index.tsx        default-exports { Intro, steps: [...] } (StoryContent)
  steps/*.tsx      one component per step
  art/*.tsx        inline SVG illustrations (optional)
  *.css            only if a step needs keyframes
```

## meta.json

```json
{
  "order": 30,
  "slug": "monty-hall",
  "title": "The Monty Hall Problem",
  "tagline": "Switch doors or stay? A game show puzzle that fooled a thousand PhDs.",
  "description": "~150 characters. Shown in search results and as the crawler-visible intro paragraph.",
  "category": "Probability",
  "year": "1990",
  "people": ["Marilyn vos Savant", "Paul Erdős"],
  "keywords": ["probability", "game show", "conditional probability"],
  "cover": "monty-hall.svg",
  "coverAlt": "Three cartoon doors, one slightly open",
  "steps": ["The Letter", "Play the Game", "Why Switching Wins", "The Backlash", "Erdős Runs the Numbers"],
  "minutes": 6
}
```

- `category` must be one of `StoryCategory` in `src/content/types.ts`.
- `cover` is a file in `src/assets/`. New stories use an SVG cover (`src/assets/<slug>.svg`)
  drawn in the same flat, friendly style as the existing PNG cartoons: thick rounded
  linework, soft fills, a circular pastel backdrop, tiny sparkles or dots. Keep it under 8 KB.
- `steps.length` must equal the number of step components exported from `index.tsx`
  (the app throws at startup otherwise).

## Voice and shape

The existing two stories (`russells-paradox`, `schrodingers-cat`) are the reference.

- **Lead with the people and the moment.** A letter, a bet, a lecture, an argument. Dates,
  names, quotes when they're real. Then the idea.
- **One idea per step.** 5-7 steps, each about 120-250 words of prose plus a visual or a
  widget. The intro (`Intro`) is a "What is it?" page with a hook and the cover illustration.
- **Every story has at least one real interactive widget**: something the reader controls
  that produces a result (a game, a simulation, a slider, a grid). Plus, ideally, a
  `MiniSteps` scene sequence (the "click Ok" pattern) somewhere.
- **End with a payoff**: why the idea mattered afterwards, and where it shows up today.
- Friendly, a little cheeky, never dumbed down. Emoji sparingly (one per step at most).
  Sentences short. Bold the key term when it's first defined.
- **Accuracy matters.** If a detail is uncertain, say "around" or leave it out. No invented
  quotes.

## Building blocks

```tsx
import type { StoryContent } from "../../content/types";
import Button from "../../components/Button";          // variant: primary | secondary | ghost; size: sm | md | lg; `to` for links
import MiniSteps from "../../components/MiniSteps";    // scenes={[<A/>, <B/>]} nextLabel="Ok" onChange={(i) => ...}
import Callout from "../../components/Callout";        // tone: info | fun | warn | history; title?
import { trackInteraction } from "../../lib/analytics"; // fire on meaningful widget actions
import { useIsMobile } from "../../lib/useIsMobile";
```

- Wrap prose in `<div className="story-prose">` and use `<h2>` for the step title
  (the layout already renders the story `<h1>`).
- Widgets can break out of the prose column: put them in a sibling `<div>` after the
  `story-prose` block, or use `max-w-3xl mx-auto`.
- Colors: only Tailwind tokens `bg-surface`, `bg-surface-2`, `text-ink`, `text-muted`,
  `border-line`, `text-accent` (coral), `text-accent-2` (sky blue), plus Tailwind's
  standard palette for semantic colors (`bg-red-400`, `bg-emerald-500`, ...). In SVG use
  `fill="currentColor"`, `rgb(var(--ink))`, `rgb(var(--accent))`, etc. so dark mode works.
- Motion: `Fade` from `react-awesome-reveal` for reveals, CSS keyframes for loops.
  Everything must also make sense with animations off.
- Analytics: call `trackInteraction({ story: "<slug>", widget: "<name>", action: "<verb>", value })`
  when the reader does the main thing (plays a round, runs a simulation, toggles a mode).
  Don't fire on every mouse move.
- Mobile: widgets must work at 390px wide with touch. No hover-only interactions.

## Checking your work

```bash
npx tsc --noEmit && npx eslint src/concepts/<slug> --ext ts,tsx --max-warnings 0
npx vite --port <port>     # then open http://localhost:<port>/<slug>
```

Screenshots of every step at desktop and mobile width, light and dark, before calling it done.
