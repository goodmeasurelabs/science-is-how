import { useEffect, useRef, useState } from "react";
import EarthDiagram from "../art/EarthDiagram";
import { trackInteraction } from "../../../lib/analytics";

const TRUE_KM = 40008;
const STADION_OPTIONS = [
  { m: 157, label: "157 m (Egyptian)" },
  { m: 185, label: "185 m (Attic)" },
];

function fmt(n: number, digits = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function TwoSticks() {
  const [angle, setAngle] = useState(7.2);
  const [distance, setDistance] = useState(5000);
  const [stadion, setStadion] = useState(157);
  const first = useRef(true);

  const fraction = 360 / angle;
  const stadia = distance * fraction;
  const km = (stadia * stadion) / 1000;
  const error = ((km - TRUE_KM) / TRUE_KM) * 100;

  // One analytics event per settled change, not one per slider pixel.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      trackInteraction({
        story: "eratosthenes",
        widget: "two_sticks",
        action: "adjust",
        value: `${angle}deg/${distance}st/${stadion}m`,
      });
    }, 700);
    return () => clearTimeout(t);
  }, [angle, distance, stadion]);

  return (
    <div>
      <div className="story-prose">
        <h2>Two Sticks, One Shadow</h2>
        <p>
          On the solstice, at noon, Eratosthenes measured the shadow of a vertical stick (a{" "}
          <strong>gnomon</strong>) in Alexandria. The Sun was off vertical by about{" "}
          <strong>one fiftieth of a circle</strong>, or 7.2°.
        </p>
        <p>
          The Sun is so far away that its rays arrive parallel. So the angle between the sunlight
          and the stick in Alexandria is the same as the angle between the two cities measured from
          the centre of the Earth. Drag the sliders and watch the geometry move.
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-4xl gap-6 rounded-3xl border border-line bg-surface-2 p-4 shadow-card md:grid-cols-[3fr_2fr] md:p-6">
        <div>
          <EarthDiagram angle={angle} />
        </div>
        <div className="flex flex-col gap-5 text-left">
          <label className="block">
            <span className="flex justify-between text-sm font-bold">
              <span>Shadow angle at Alexandria</span>
              <span className="tabular-nums text-accent">{angle.toFixed(1)}°</span>
            </span>
            <input
              type="range"
              min={1}
              max={15}
              step={0.1}
              value={angle}
              onChange={(e) => setAngle(parseFloat(e.target.value))}
              className="mt-1 w-full accent-[rgb(var(--accent))]"
              aria-label="Shadow angle in degrees"
            />
          </label>
          <label className="block">
            <span className="flex justify-between text-sm font-bold">
              <span>Distance Syene to Alexandria</span>
              <span className="tabular-nums text-accent">{fmt(distance)} stadia</span>
            </span>
            <input
              type="range"
              min={1000}
              max={10000}
              step={100}
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value, 10))}
              className="mt-1 w-full accent-[rgb(var(--accent))]"
              aria-label="Distance between the cities in stadia"
            />
          </label>
          <fieldset>
            <legend className="text-sm font-bold">How long is a stadion?</legend>
            <div className="mt-1 flex gap-2">
              {STADION_OPTIONS.map((o) => (
                <button
                  key={o.m}
                  type="button"
                  onClick={() => setStadion(o.m)}
                  aria-pressed={stadion === o.m}
                  className={`rounded-full border px-3 py-1 text-sm font-bold transition-colors ${
                    stadion === o.m
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-surface text-ink hover:border-accent"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl bg-surface p-4 text-sm">
            <dt className="text-muted">Fraction of a circle</dt>
            <dd className="text-right font-bold tabular-nums">1 / {fmt(fraction, 1)}</dd>
            <dt className="text-muted">Circumference</dt>
            <dd className="text-right font-bold tabular-nums">{fmt(stadia)} stadia</dd>
            <dt className="text-muted">In kilometres</dt>
            <dd className="text-right font-bold tabular-nums">{fmt(km)} km</dd>
            <dt className="text-muted">Real value</dt>
            <dd className="text-right tabular-nums">{fmt(TRUE_KM)} km</dd>
            <dt className="text-muted">Error</dt>
            <dd
              className={`text-right font-bold tabular-nums ${
                Math.abs(error) <= 5 ? "text-emerald-600 dark:text-emerald-400" : Math.abs(error) <= 15 ? "text-amber-600 dark:text-amber-400" : "text-red-500"
              }`}
            >
              {error > 0 ? "+" : ""}
              {fmt(error, 1)}%
            </dd>
          </dl>
        </div>
      </div>

      <div className="story-prose mt-8">
        <p>
          Notice how sensitive the answer is. A degree of error in the shadow, or a few hundred
          stadia in the distance, moves the result by thousands of kilometres. Eratosthenes was
          working with a stick, a shadow and a rumour about a well. Let's see what he actually got.
        </p>
      </div>
    </div>
  );
}
