import { useState } from "react";
import Button from "../../../components/Button";
import { findMatches, pMatch, pct, randomBirthdays } from "../math";
import { trackInteraction } from "../../../lib/analytics";

const TRIALS = 1000;

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-right text-sm font-bold">{label}</span>
      <svg viewBox="0 0 300 26" className="h-7 w-full" aria-hidden>
        <rect x="0" y="4" width="300" height="18" rx="9" fill="rgb(var(--line))" />
        <rect x="0" y="4" width={Math.max(6, value * 300)} height="18" rx="9" fill={color} />
      </svg>
      <span className="w-16 shrink-0 text-sm font-bold tabular-nums">{pct(value)}</span>
    </div>
  );
}

export default function RunItAThousandTimes() {
  const [n, setN] = useState(23);
  const [result, setResult] = useState<{ n: number; hits: number } | null>(null);
  const [runs, setRuns] = useState(0);

  const simulate = () => {
    let hits = 0;
    for (let i = 0; i < TRIALS; i++) if (findMatches(randomBirthdays(n)).size > 0) hits++;
    setResult({ n, hits });
    setRuns((r) => r + 1);
    trackInteraction({ story: "birthday-paradox", widget: "simulation", action: "simulate", value: n });
  };

  return (
    <div>
      <div className="story-prose">
        <h2>Run It a Thousand Times</h2>
        <p>
          Formulas are nice, but the fun of probability is that you can just <em>check</em>.
          Below, the computer fills a room with random birthdays, notes whether there's a match,
          empties it, and does that {TRIALS.toLocaleString()} times in a blink.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-line bg-surface-2 p-5 shadow-card md:p-8">
        <label className="flex flex-col gap-1">
          <span className="flex justify-between text-sm font-bold">
            <span>People per room</span>
            <span className="tabular-nums text-accent">{n}</span>
          </span>
          <input
            type="range"
            min={2}
            max={80}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="accent-[rgb(var(--accent))]"
            aria-label="People per room"
          />
        </label>
        <div className="mt-5 flex justify-center">
          <Button variant="primary" size="lg" icon onClick={simulate}>
            Run {TRIALS.toLocaleString()} rooms
          </Button>
        </div>
        {result && (
          <div className="mt-6 space-y-3" role="status">
            <Bar label="Simulated" value={result.hits / TRIALS} color="rgb(var(--accent))" />
            <Bar label="Formula" value={pMatch(result.n)} color="rgb(var(--accent-2))" />
            <p className="pt-2 text-center text-sm text-muted tabular-nums">
              {result.hits.toLocaleString()} of {TRIALS.toLocaleString()} rooms with {result.n} people had a
              shared birthday.
              {runs > 1 && " Run it again and watch the simulated number wobble around the formula."}
            </p>
          </div>
        )}
      </div>

      <div className="story-prose mt-8">
        <p>
          The simulated bar lands within a point or two of the formula every time. Push the slider
          to 23 and watch it hover around half. Push it to 60 and matches become almost guaranteed.
          The gut said 180. The gut was off by a factor of eight.
        </p>
      </div>
    </div>
  );
}
