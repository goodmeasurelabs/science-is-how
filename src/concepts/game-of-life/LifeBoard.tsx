import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { trackInteraction } from "../../lib/analytics";
import { useIsMobile } from "../../lib/useIsMobile";
import {
  type Grid,
  PATTERNS,
  makeGrid,
  placePattern,
  population,
  randomGrid,
  stepGrid,
} from "./life";

interface Props {
  /** Pattern key from PATTERNS to start with. */
  initial?: keyof typeof PATTERNS | "empty" | "random";
  /** Show the preset buttons. */
  presets?: boolean;
  autoplay?: boolean;
}

const DESKTOP = { cols: 44, rows: 28 };
const MOBILE = { cols: 30, rows: 24 };
/** The Gosper gun is 36 cells wide, so a board that starts with it needs more room on phones. */
const MOBILE_WIDE = { cols: 38, rows: 26 };

function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `rgb(${v})` : fallback;
}

/**
 * An interactive Game of Life board on a <canvas>. Edges wrap around
 * (a torus), so gliders that leave on the right come back on the left.
 */
export default function LifeBoard({ initial = "empty", presets = true, autoplay = false }: Props) {
  const isMobile = useIsMobile();
  const { cols, rows } = isMobile ? (initial === "gun" ? MOBILE_WIDE : MOBILE) : DESKTOP;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<Grid>(makeGrid(cols, rows));
  const [, force] = useState(0);
  const rerender = useCallback(() => force((n) => n + 1), []);

  const [running, setRunning] = useState(autoplay);
  const [speed, setSpeed] = useState(8); // generations per second
  const [generation, setGeneration] = useState(0);
  const dragValue = useRef<0 | 1 | null>(null);

  const load = useCallback(
    (key: Props["initial"]) => {
      if (key === "random") gridRef.current = randomGrid(cols, rows);
      else if (key === "empty" || !key) gridRef.current = makeGrid(cols, rows);
      else {
        const p = PATTERNS[key];
        // The gun needs room to fire down-right; nudge it toward the top-left.
        const offset = key === "gun" ? { x: Math.max(0, Math.floor((cols - 36) / 2)), y: 2 } : undefined;
        gridRef.current = placePattern(cols, rows, p.cells, offset);
      }
      setGeneration(0);
      rerender();
    },
    [cols, rows, rerender],
  );

  // Reset when the board size changes (mobile <-> desktop) or on mount.
  useEffect(() => {
    load(initial);
  }, [cols, rows, initial, load]);

  // Draw.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const cell = canvas.clientWidth / cols;
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(cell * rows * dpr);
    ctx.scale(dpr, dpr);
    const dead = readVar("--surface-2", "#fff");
    const line = readVar("--line", "#e8ded6");
    const live = readVar("--accent", "#ff7a59");
    ctx.fillStyle = dead;
    ctx.fillRect(0, 0, cell * cols, cell * rows);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let x = 0; x <= cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cell + 0.5, 0);
      ctx.lineTo(x * cell + 0.5, cell * rows);
      ctx.stroke();
    }
    for (let y = 0; y <= rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cell + 0.5);
      ctx.lineTo(cell * cols, y * cell + 0.5);
      ctx.stroke();
    }
    ctx.fillStyle = live;
    const g = gridRef.current;
    const pad = Math.max(1, cell * 0.12);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (g[y * cols + x]) {
          ctx.beginPath();
          ctx.roundRect(x * cell + pad, y * cell + pad, cell - 2 * pad, cell - 2 * pad, pad);
          ctx.fill();
        }
      }
    }
  });

  // Run.
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      gridRef.current = stepGrid(gridRef.current, cols, rows);
      setGeneration((n) => n + 1);
    }, 1000 / speed);
    return () => clearInterval(id);
  }, [running, speed, cols, rows]);

  const stepOnce = () => {
    gridRef.current = stepGrid(gridRef.current, cols, rows);
    setGeneration((n) => n + 1);
  };

  const cellAt = (e: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - r.left) / r.width) * cols);
    const y = Math.floor(((e.clientY - r.top) / r.height) * rows);
    if (x < 0 || y < 0 || x >= cols || y >= rows) return null;
    return y * cols + x;
  };

  const paint = (i: number | null) => {
    if (i === null || dragValue.current === null) return;
    if (gridRef.current[i] !== dragValue.current) {
      gridRef.current[i] = dragValue.current;
      rerender();
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const i = cellAt(e);
    if (i === null) return;
    dragValue.current = gridRef.current[i] ? 0 : 1;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    paint(i);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragValue.current === null) return;
    paint(cellAt(e));
  };
  const onPointerUp = () => {
    dragValue.current = null;
  };

  const toggleRun = () => {
    if (!running) trackInteraction({ story: "game-of-life", widget: "board", action: "play", value: generation });
    setRunning((r) => !r);
  };

  const pop = population(gridRef.current);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <canvas
        ref={canvasRef}
        data-testid="life-board"
        className="w-full cursor-crosshair touch-none rounded-2xl border border-line shadow-card"
        style={{ aspectRatio: `${cols} / ${rows}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Game of Life board. Click or drag to toggle cells."
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex gap-4 font-mono tabular-nums text-muted">
          <span>
            Gen <strong className="text-ink" data-testid="gen">{generation}</strong>
          </span>
          <span>
            Pop <strong className="text-ink" data-testid="pop">{pop}</strong>
          </span>
        </div>
        <label className="flex items-center gap-2 text-muted">
          Speed
          <input
            type="range"
            min={1}
            max={30}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="accent-[rgb(var(--accent))]"
            aria-label="Generations per second"
          />
          <span className="w-10 font-mono tabular-nums">{speed}/s</span>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <Button size="sm" variant="primary" onClick={toggleRun} data-testid="play">
          {running ? "Pause" : "Play"}
        </Button>
        <Button size="sm" onClick={stepOnce} disabled={running} data-testid="step">
          Step
        </Button>
        <Button size="sm" variant="ghost" onClick={() => load("random")}>
          Random
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setRunning(false); load("empty"); }}>
          Clear
        </Button>
      </div>
      {presets && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {(Object.keys(PATTERNS) as (keyof typeof PATTERNS)[]).map((k) => (
            <button
              key={k}
              type="button"
              data-testid={`preset-${k}`}
              onClick={() => {
                setRunning(false);
                load(k);
                trackInteraction({ story: "game-of-life", widget: "board", action: "preset", value: k });
              }}
              className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-bold text-ink transition-colors hover:border-accent"
            >
              {PATTERNS[k].label}
            </button>
          ))}
        </div>
      )}
      <p className="mt-3 text-center text-xs text-muted">
        Click or drag on the board to draw cells. The edges wrap around, so a glider that leaves on the
        right comes back on the left.
      </p>
    </div>
  );
}
