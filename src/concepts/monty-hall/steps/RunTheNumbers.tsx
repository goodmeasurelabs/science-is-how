import { useState } from "react";
import Button from "../../../components/Button";
import { simulate } from "../game";
import { trackInteraction } from "../../../lib/analytics";

const SIZES = [100, 1000, 10000] as const;

function Bar({ label, value, games, theory, accent }: { label: string; value: number; games: number; theory: number; accent?: boolean }) {
  const pct = games ? (value / games) * 100 : 0;
  const w = 320;
  const barW = (pct / 100) * w;
  const theoryX = (theory / 100) * w;
  return (
    <div className="flex items-center gap-3">
      <span className={`w-14 text-right font-display font-bold ${accent ? "text-accent" : ""}`}>{label}</span>
      <svg viewBox={`0 0 ${w + 70} 34`} className="w-full max-w-md" role="img" aria-label={`${label}: ${pct.toFixed(1)}% wins, theory ${theory.toFixed(1)}%`}>
        <rect x="0" y="6" width={w} height="22" rx="11" fill="rgb(var(--line))" />
        <rect x="0" y="6" width={barW} height="22" rx="11" fill={accent ? "rgb(var(--accent))" : "rgb(var(--accent-2))"} style={{ transition: "width 400ms ease" }} />
        <line x1={theoryX} x2={theoryX} y1="0" y2="34" stroke="rgb(var(--ink))" strokeWidth="2" strokeDasharray="3 3" />
        <text x={w + 8} y="22" fontSize="14" fontWeight="700" fill="rgb(var(--ink))" fontFamily="ui-monospace, monospace">
          {games ? `${pct.toFixed(1)}%` : "—"}
        </text>
      </svg>
    </div>
  );
}

export default function RunTheNumbers() {
  const [games, setGames] = useState(0);
  const [result, setResult] = useState({ stay: 0, switch: 0 });
  const [running, setRunning] = useState(false);

  const run = (n: number) => {
    setRunning(true);
    // Let the button state paint before the (fast) loop.
    setTimeout(() => {
      const r = simulate(n);
      setResult((prev) => ({ stay: prev.stay + r.stay, switch: prev.switch + r.switch }));
      setGames((g) => g + n);
      setRunning(false);
      trackInteraction({ story: "monty-hall", widget: "simulator", action: "run", value: n });
    }, 30);
  };

  const reset = () => {
    setGames(0);
    setResult({ stay: 0, switch: 0 });
  };

  return (
    <div>
      <div className="story-prose">
        <h2>Run the Numbers</h2>
        <p>
          Every game below is played with both strategies at once: the car is hidden, a door is
          picked, Monty opens a goat door, and we record whether staying <em>and</em> whether
          switching would have won. The dashed lines mark the theoretical ⅓ and ⅔.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-line bg-surface-2 p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SIZES.map((n) => (
            <Button key={n} variant={n === 1000 ? "primary" : "secondary"} size="sm" disabled={running} onClick={() => run(n)}>
              Play {n.toLocaleString()} games
            </Button>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted tabular-nums" aria-live="polite">
          {games === 0 ? "No games played yet." : `${games.toLocaleString()} games played`}
        </p>
        <div className="mt-6 space-y-4">
          <Bar label="Stay" value={result.stay} games={games} theory={100 / 3} />
          <Bar label="Switch" value={result.switch} games={games} theory={200 / 3} accent />
        </div>
        <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-center text-sm">
          <div className="rounded-2xl bg-surface p-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Stay won</dt>
            <dd className="font-display text-2xl font-extrabold tabular-nums">{result.stay.toLocaleString()}</dd>
          </div>
          <div className="rounded-2xl bg-surface p-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Switch won</dt>
            <dd className="font-display text-2xl font-extrabold tabular-nums text-accent">{result.switch.toLocaleString()}</dd>
          </div>
        </dl>
        {games > 0 && (
          <div className="mt-4 text-center">
            <Button size="sm" variant="ghost" onClick={reset}>
              Reset
            </Button>
          </div>
        )}
      </div>

      <div className="story-prose mt-8">
        <p>
          With a hundred games the bars wobble. With ten thousand they sit almost exactly on the
          dashed lines. This is what finally convinced Erdős, and it's a fair way to settle any
          probability argument: if you can't agree on the reasoning, play the game a lot and count.
        </p>
      </div>
    </div>
  );
}
