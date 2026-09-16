import Callout from "../../../components/Callout";
import { pMatch, pct } from "../math";

function Curve() {
  const W = 360;
  const H = 220;
  const padL = 40;
  const padB = 30;
  const padT = 12;
  const padR = 12;
  const xs = (n: number) => padL + ((n - 1) / 79) * (W - padL - padR);
  const ys = (p: number) => padT + (1 - p) * (H - padT - padB);
  const pts = Array.from({ length: 80 }, (_, i) => `${xs(i + 1).toFixed(1)},${ys(pMatch(i + 1)).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md" role="img" aria-label="Probability of a shared birthday against room size, crossing 50% at 23 people">
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <g key={p}>
          <line x1={padL} x2={W - padR} y1={ys(p)} y2={ys(p)} stroke="rgb(var(--line))" strokeDasharray={p === 0.5 ? "4 3" : undefined} />
          <text x={padL - 6} y={ys(p) + 4} textAnchor="end" fontSize="11" fill="rgb(var(--muted))">
            {p * 100}%
          </text>
        </g>
      ))}
      {[1, 20, 40, 60, 80].map((n) => (
        <text key={n} x={xs(n)} y={H - 8} textAnchor="middle" fontSize="11" fill="rgb(var(--muted))">
          {n}
        </text>
      ))}
      <text x={(padL + W) / 2} y={H + 0} textAnchor="middle" fontSize="11" fill="rgb(var(--muted))" />
      <polyline points={pts} fill="none" stroke="rgb(var(--accent-2))" strokeWidth="3" strokeLinejoin="round" />
      <line x1={xs(23)} x2={xs(23)} y1={ys(pMatch(23))} y2={H - padB} stroke="rgb(var(--accent))" strokeDasharray="4 3" />
      <circle cx={xs(23)} cy={ys(pMatch(23))} r="6" fill="rgb(var(--accent))" stroke="rgb(var(--surface-2))" strokeWidth="2" />
      <text x={xs(23) + 10} y={ys(pMatch(23)) - 8} fontSize="12" fontWeight="bold" fill="rgb(var(--accent))">
        23 people: 50.7%
      </text>
    </svg>
  );
}

export default function TheMath() {
  const rows = [2, 5, 10, 23, 30, 50, 70];
  return (
    <div className="story-prose">
      <h2>The Math</h2>
      <p>
        Counting every way two people could match gets messy fast (what about three-way matches?).
        So mathematicians flip the question: what's the chance that <strong>nobody</strong> matches?
      </p>
      <p>
        Line the people up. The first person can have any birthday: 365 out of 365. The second
        person must avoid that one day: 364 out of 365. The third must avoid two days: 363 out of
        365. And so on. Multiply the fractions together and you get the probability that all{" "}
        <code>n</code> birthdays are different.
      </p>
      <p className="text-center font-display text-lg font-bold">
        P(no match) = <span className="whitespace-nowrap">365/365 × 364/365 × 363/365 × …</span>
      </p>
      <p className="text-center font-display text-lg font-bold">P(match) = 1 − P(no match)</p>
      <p>
        Each fraction is close to 1, but there are a lot of them, and they compound. By the 23rd
        person the product has slipped just below one half.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="mx-auto text-center text-sm tabular-nums">
          <thead>
            <tr className="text-muted">
              <th className="px-3 py-1 font-bold">People</th>
              <th className="px-3 py-1 font-bold">P(no match)</th>
              <th className="px-3 py-1 font-bold">P(match)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((n) => (
              <tr key={n} className={n === 23 ? "font-bold text-accent" : ""}>
                <td className="px-3 py-1">{n}</td>
                <td className="px-3 py-1">{pct(1 - pMatch(n))}</td>
                <td className="px-3 py-1">{pct(pMatch(n))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figure>
        <Curve />
        <figcaption>Chance of at least one shared birthday, by room size.</figcaption>
      </figure>
      <Callout tone="fun" title="Two small cheats">
        We ignored February 29 and assumed every day is equally likely. In real life birthdays
        cluster (September is busy, holidays are quiet), which makes matches slightly{" "}
        <em>more</em> likely than the formula says. The paradox only gets stronger.
      </Callout>
    </div>
  );
}
