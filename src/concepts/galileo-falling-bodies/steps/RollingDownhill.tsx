import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Callout from "../../../components/Callout";
import { trackInteraction } from "../../../lib/analytics";

const TOTAL_T = 4; // seconds of "roll"
const MARKS = [1, 2, 3, 4];

/** A ball rolling down an incline, leaving marks at t = 1, 2, 3, 4 s. Distance grows as t². */
function Incline() {
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const startRef = useRef<number | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (!running) return;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const e = (now - startRef.current) / 1000;
      if (e >= TOTAL_T) {
        setT(TOTAL_T);
        setRunning(false);
        return;
      }
      setT(e);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  const roll = () => {
    cancelAnimationFrame(raf.current);
    startRef.current = null;
    setT(0);
    trackInteraction({ story: "galileo-falling-bodies", widget: "incline", action: "roll" });
    requestAnimationFrame(() => setRunning(true));
  };

  // Geometry: incline from (40, 80) to (560, 240) in a 600x280 viewBox.
  const x0 = 40, y0 = 80, x1 = 560, y1 = 240;
  const frac = (tt: number) => (tt * tt) / (TOTAL_T * TOTAL_T);
  const pos = (tt: number) => ({ x: x0 + (x1 - x0) * frac(tt), y: y0 + (y1 - y0) * frac(tt) });
  const ball = pos(t);
  const angle = Math.atan2(y1 - y0, x1 - x0);
  const nx = Math.sin(angle) * 22; // normal offset so the ball sits on the plank
  const ny = -Math.cos(angle) * 22;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-line bg-surface-2 p-4 shadow-card">
      <svg viewBox="0 0 600 280" className="h-auto w-full" role="img" aria-label="A ball rolling down an inclined plane, leaving marks at equal time intervals that get farther apart">
        {/* plank */}
        <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="rgb(var(--ink))" strokeWidth="10" strokeLinecap="round" />
        <line x1={x1} y1={y1} x2={x1} y2={y1 + 20} stroke="rgb(var(--ink))" strokeWidth="6" strokeLinecap="round" />
        <line x1={x0 - 10} y1={y0 + 20} x2={x0 + 10} y2={y0 + 20} stroke="rgb(var(--ink))" strokeWidth="6" strokeLinecap="round" />
        {/* marks */}
        {MARKS.filter((m) => t >= m).map((m) => {
          const p = pos(m);
          return (
            <g key={m}>
              <line x1={p.x + nx * 0.4} y1={p.y + ny * 0.4} x2={p.x + nx * 1.6} y2={p.y + ny * 1.6} stroke="rgb(var(--accent))" strokeWidth="5" strokeLinecap="round" />
              <text x={p.x + nx * 2.4} y={p.y + ny * 2.4} fontSize="16" fontWeight="800" fill="rgb(var(--accent))" textAnchor="middle" fontFamily="Nunito, system-ui, sans-serif">
                {m}s
              </text>
            </g>
          );
        })}
        {/* ball */}
        <g transform={`translate(${ball.x + nx} ${ball.y + ny}) rotate(${frac(t) * 1080})`}>
          <circle r="20" fill="rgb(var(--ink))" />
          <circle cx="-7" cy="-7" r="4" fill="rgb(var(--surface-2))" />
        </g>
      </svg>
      <div className="mt-2 flex items-center justify-center gap-4">
        <Button variant="primary" size="sm" onClick={roll} disabled={running}>
          {running ? "Rolling…" : t > 0 ? "Roll again" : "Roll the ball"}
        </Button>
        <span className="font-display text-lg font-bold tabular-nums text-accent">{t.toFixed(1)} s</span>
      </div>
    </div>
  );
}

export default function RollingDownhill() {
  return (
    <>
      <div className="story-prose">
        <h2>Rolling Downhill</h2>
        <p>
          A falling stone is over in a blink, and Galileo had no stopwatch. So he slowed gravity
          down. He rolled bronze balls down a long, polished groove in a tilted wooden beam and timed
          them with a <strong>water clock</strong>: water pours into a cup while the ball rolls, and
          you weigh the water afterwards. Legend adds that he also used his pulse, and hummed tunes
          to keep the beat.
        </p>
        <p>
          The question was no longer just "who lands first?" but "<em>how</em> does a falling
          thing speed up?" Roll the ball and watch the marks it leaves at each second.
        </p>
      </div>
      <div className="my-8">
        <Incline />
      </div>
      <div className="story-prose">
        <p>
          The marks get farther apart, and not randomly. Galileo found that the distances grow with
          the <strong>square of the time</strong>:
        </p>
        <div className="mx-auto my-4 max-w-xs overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="border-b border-line font-display font-bold">
                <th className="py-1">Time</th>
                <th className="py-1">Distance</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {MARKS.map((m) => (
                <tr key={m} className="border-b border-line/50">
                  <td className="py-1">{m} s</td>
                  <td className="py-1">{m * m} units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center font-display text-xl font-bold">d ∝ t²</p>
        <Callout tone="info">
          Double the time, four times the distance. That's the signature of{" "}
          <strong>constant acceleration</strong>: the ball gains the same extra speed every second.
          The tilt of the beam just shrinks the acceleration so a human can measure it. Tilt it to
          vertical and you have free fall, with the same shape of law.
        </Callout>
      </div>
    </>
  );
}
