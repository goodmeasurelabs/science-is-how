import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { trackInteraction } from "../../lib/analytics";
import { Ball, Feather } from "./art/Objects";

type World = "earth" | "moon";

const G: Record<World, number> = { earth: 9.81, moon: 1.62 };
const DROP_HEIGHT_M = 5; // metres of real fall represented by the column
const FEATHER_TERMINAL_MS = 1.4; // feather terminal velocity in air, m/s
const BALL_DRAG_FACTOR = 0.995; // a bowling ball barely notices air over 5 m

/** Distance fallen (m) after t seconds. */
function fallen(t: number, g: number, air: boolean, isFeather: boolean): number {
  if (!air) return 0.5 * g * t * t;
  if (!isFeather) return 0.5 * g * BALL_DRAG_FACTOR * t * t;
  // Linear-drag-free approximation with a terminal velocity: v = vt·tanh(g t / vt)
  const vt = FEATHER_TERMINAL_MS;
  return ((vt * vt) / g) * Math.log(Math.cosh((g * t) / vt));
}

function landingTime(g: number, air: boolean, isFeather: boolean): number {
  if (!air || !isFeather) return Math.sqrt((2 * DROP_HEIGHT_M) / (g * (air ? BALL_DRAG_FACTOR : 1)));
  // solve numerically
  let lo = 0;
  let hi = 60;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (fallen(mid, g, air, true) < DROP_HEIGHT_M) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

interface Props {
  /** Which world to start on. */
  defaultWorld?: World;
  /** Fire analytics with this widget name. */
  widget?: string;
}

export default function DropTest({ defaultWorld = "earth", widget = "drop_test" }: Props) {
  const [world, setWorld] = useState<World>(defaultWorld);
  const [air, setAir] = useState<boolean>(defaultWorld === "earth");
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [landed, setLanded] = useState<{ ball?: number; feather?: number }>({});
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const columnRef = useRef<HTMLDivElement>(null);

  const g = G[world];
  const effectiveAir = world === "earth" && air;
  const tBall = landingTime(g, effectiveAir, false);
  const tFeather = landingTime(g, effectiveAir, true);
  const tEnd = Math.max(tBall, tFeather);

  useEffect(() => {
    if (!running) return;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      setT(elapsed);
      setLanded((prev) => ({
        ball: prev.ball ?? (elapsed >= tBall ? tBall : undefined),
        feather: prev.feather ?? (elapsed >= tFeather ? tFeather : undefined),
      }));
      if (elapsed >= tEnd + 0.05) {
        setT(tEnd);
        setRunning(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, tBall, tFeather, tEnd]);

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setRunning(false);
    setT(0);
    setLanded({});
  };

  const drop = () => {
    reset();
    trackInteraction({
      story: "galileo-falling-bodies",
      widget,
      action: "drop",
      value: `${world}${effectiveAir ? "+air" : ""}`,
    });
    // start on next frame so the reset paints first
    requestAnimationFrame(() => setRunning(true));
  };

  const pick = (w: World) => {
    reset();
    setWorld(w);
    if (w === "moon") setAir(false);
  };

  const columnPx = columnRef.current?.clientHeight ?? 320;
  const objectPx = 56;
  const travel = columnPx - objectPx - 8;
  const yFor = (isFeather: boolean) => {
    const d = Math.min(fallen(t, g, effectiveAir, isFeather), DROP_HEIGHT_M);
    return (d / DROP_HEIGHT_M) * travel;
  };
  const featherDrift = effectiveAir && !landed.feather ? Math.sin(t * 3.2) * 14 : 0;
  const featherTilt = effectiveAir && !landed.feather ? Math.cos(t * 3.2) * 25 : 0;

  const fmt = (s?: number) => (s === undefined ? "—" : `${s.toFixed(2)} s`);
  const bothDown = landed.ball !== undefined && landed.feather !== undefined;
  const together = bothDown && Math.abs(landed.ball! - landed.feather!) < 0.03;

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-line bg-surface-2 p-4 shadow-card md:p-6">
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <div className="flex rounded-full border border-line p-0.5" role="group" aria-label="World">
          {(["earth", "moon"] as World[]).map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={world === w}
              onClick={() => pick(w)}
              className={`rounded-full px-3 py-1 text-sm font-bold capitalize transition-colors ${
                world === w ? "bg-accent text-white" : "text-ink hover:bg-ink/5"
              }`}
            >
              {w === "earth" ? "🌍 Earth" : "🌙 Moon"}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={effectiveAir}
          disabled={world === "moon"}
          onClick={() => {
            reset();
            setAir((a) => !a);
          }}
          title={world === "moon" ? "There is no air on the Moon" : undefined}
          className={`rounded-full border px-3 py-1 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            effectiveAir ? "border-accent-2 bg-accent-2/20 text-ink" : "border-line text-ink hover:bg-ink/5"
          }`}
        >
          {effectiveAir ? "💨 Air: on" : "Air: off (vacuum)"}
        </button>
      </div>

      {/* The column */}
      <div
        ref={columnRef}
        className={`relative mx-auto h-72 w-full max-w-md overflow-hidden rounded-2xl border-2 border-line md:h-80 ${
          world === "moon" ? "bg-gradient-to-b from-[#1b1830] to-[#3a3552]" : "bg-gradient-to-b from-accent-2/20 to-accent-2/5"
        }`}
      >
        {/* height ticks */}
        {[1, 2, 3, 4].map((m) => (
          <div
            key={m}
            className="absolute left-0 right-0 border-t border-dashed border-ink/15"
            style={{ top: `${(m / 5) * 100}%` }}
          >
            <span className={`absolute right-2 -top-2.5 text-[10px] tabular-nums ${world === "moon" ? "text-white/60" : "text-muted"}`}>
              {5 - m} m
            </span>
          </div>
        ))}
        <span className={`absolute right-2 top-1 text-[10px] tabular-nums ${world === "moon" ? "text-white/60" : "text-muted"}`}>5 m</span>
        <span className={`absolute right-2 bottom-3 text-[10px] tabular-nums ${world === "moon" ? "text-white/60" : "text-muted"}`}>0 m</span>
        {/* ground */}
        <div className={`absolute bottom-0 left-0 right-0 h-2 ${world === "moon" ? "bg-[#b9b3c4]" : "bg-emerald-500/70"}`} />

        <div
          className="absolute left-[30%] top-2 -translate-x-1/2 will-change-transform"
          style={{ transform: `translate(-50%, ${yFor(false)}px)` }}
        >
          <Ball size={objectPx} />
        </div>
        <div
          className="absolute left-[70%] top-2 -translate-x-1/2 will-change-transform"
          style={{
            transform: `translate(calc(-50% + ${featherDrift}px), ${yFor(true)}px) rotate(${featherTilt}deg)`,
          }}
        >
          <Feather size={objectPx} />
        </div>
      </div>

      {/* Readout */}
      <div className="mt-4 grid grid-cols-3 items-center gap-2 text-center text-sm">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Ball</div>
          <div className="font-display text-lg font-bold tabular-nums">{fmt(landed.ball)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Timer</div>
          <div className="font-display text-2xl font-extrabold tabular-nums text-accent">{t.toFixed(2)} s</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">Feather</div>
          <div className="font-display text-lg font-bold tabular-nums">{fmt(landed.feather)}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <Button variant="primary" onClick={drop} disabled={running}>
          {running ? "Falling…" : "Drop!"}
        </Button>
        <Button variant="ghost" onClick={reset} disabled={t === 0}>
          Reset
        </Button>
      </div>

      <p className="mt-3 min-h-[1.5rem] text-center text-sm text-muted" aria-live="polite">
        {bothDown
          ? together
            ? `They landed together. g = ${g} m/s², no air, weight doesn't matter.`
            : `The feather took ${(landed.feather! / landed.ball!).toFixed(1)}× longer. That's air drag, not weight.`
          : `Dropping from ${DROP_HEIGHT_M} m on the ${world === "earth" ? "Earth" : "Moon"} (g = ${g} m/s²)${effectiveAir ? " with air" : " in a vacuum"}.`}
      </p>
    </div>
  );
}
