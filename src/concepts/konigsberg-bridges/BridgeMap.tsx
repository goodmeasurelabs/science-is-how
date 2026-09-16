import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import { trackInteraction } from "../../lib/analytics";
import { BRIDGES, KAISER_BRIDGE, LANDS, degreeOf, landById, type Bridge, type LandId } from "./bridgeData";
import "./BridgeMap.css";

const INK = "#2b2033";

type Status = "idle" | "walking" | "stuck" | "solved";

interface Props {
  /** Show the 1905 Kaiser bridge as an eighth bridge. */
  extraBridge?: boolean;
  /** Allow clicking. When false the map is a plain illustration. */
  interactive?: boolean;
  /** Show the map/graph toggle. */
  showToggle?: boolean;
  initialView?: "map" | "graph";
  /** Show degree labels on the graph view. */
  showDegrees?: boolean;
  /** Analytics widget name. */
  widget?: string;
}

export default function BridgeMap({
  extraBridge = false,
  interactive = true,
  showToggle = false,
  initialView = "map",
  showDegrees = true,
  widget = "bridge_walk",
}: Props) {
  const bridges = useMemo(() => (extraBridge ? [...BRIDGES, KAISER_BRIDGE] : BRIDGES), [extraBridge]);
  const [view, setView] = useState<"map" | "graph">(initialView);
  const [position, setPosition] = useState<LandId | null>(null);
  const [crossed, setCrossed] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [hint, setHint] = useState<string>("");
  const [shake, setShake] = useState<{ id: number; n: number } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const crossedSet = useMemo(() => new Set(crossed), [crossed]);

  useEffect(() => {
    if (status === "stuck" || status === "solved") {
      trackInteraction({
        story: "konigsberg-bridges",
        widget,
        action: status,
        value: `${crossed.length}/${bridges.length}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const reset = () => {
    setPosition(null);
    setCrossed([]);
    setStatus("idle");
    setHint("");
    setShake(null);
  };

  const wobble = (id: number, message: string) => {
    setShake({ id, n: (shake?.n ?? 0) + 1 });
    setHint(message);
  };

  const pickLand = (id: LandId) => {
    if (!interactive) return;
    if (status === "idle") {
      setPosition(id);
      setStatus("walking");
      setHint(`You're standing on ${landById[id].name}. Now cross a bridge that touches it.`);
    } else if (status === "walking") {
      setHint(
        id === position
          ? "You're already here. Pick a bridge."
          : "No teleporting! You can only move by crossing a bridge.",
      );
    }
  };

  const crossBridge = (b: Bridge) => {
    if (!interactive) return;
    if (status === "idle" || position === null) {
      wobble(b.id, "First choose where to start: click a bank or an island.");
      return;
    }
    if (status !== "walking") return;
    if (crossedSet.has(b.id)) {
      wobble(b.id, `You already crossed ${b.name}. Each bridge only once!`);
      return;
    }
    if (b.from !== position && b.to !== position) {
      wobble(b.id, `${b.name} doesn't touch ${landById[position].name}. Pick a bridge attached to where you stand.`);
      return;
    }
    const next: LandId = b.from === position ? b.to : b.from;
    const nextCrossed = [...crossed, b.id];
    setCrossed(nextCrossed);
    setPosition(next);
    if (nextCrossed.length === bridges.length) {
      setStatus("solved");
      setAttempts((a) => a + 1);
      setHint("");
      return;
    }
    const remaining = bridges.filter(
      (x) => !nextCrossed.includes(x.id) && (x.from === next || x.to === next),
    );
    if (remaining.length === 0) {
      setStatus("stuck");
      setAttempts((a) => a + 1);
      setHint("");
    } else {
      setHint(`Now on ${landById[next].name}. ${remaining.length} uncrossed ${remaining.length === 1 ? "bridge" : "bridges"} from here.`);
    }
  };

  const orderOf = (id: number) => crossed.indexOf(id) + 1;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {interactive && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="font-display font-bold tabular-nums">
            Bridges crossed: {crossed.length} / {bridges.length}
            {attempts > 0 && (
              <span className="ml-3 font-body font-normal text-muted">
                {" "}
                {attempts} {attempts === 1 ? "attempt" : "attempts"}
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            {showToggle && (
              <Button size="sm" variant="ghost" onClick={() => setView(view === "map" ? "graph" : "map")}>
                {view === "map" ? "Show Euler's view" : "Show the map"}
              </Button>
            )}
            <Button size="sm" onClick={reset} disabled={status === "idle" && crossed.length === 0}>
              Reset
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-line bg-surface-2 p-2 shadow-card">
        <svg
          viewBox="0 0 600 400"
          className="h-auto w-full select-none"
          role={interactive ? "group" : "img"}
          aria-label={
            interactive
              ? "Map of Königsberg. Click a land mass to start, then click bridges to cross them."
              : "Map of Königsberg with its seven bridges"
          }
        >
          {view === "map" ? (
            <MapView
              bridges={bridges}
              interactive={interactive}
              status={status}
              position={position}
              crossedSet={crossedSet}
              orderOf={orderOf}
              shake={shake}
              onLand={pickLand}
              onBridge={crossBridge}
            />
          ) : (
            <GraphView
              bridges={bridges}
              interactive={interactive}
              status={status}
              position={position}
              crossedSet={crossedSet}
              orderOf={orderOf}
              shake={shake}
              showDegrees={showDegrees}
              onLand={pickLand}
              onBridge={crossBridge}
            />
          )}
        </svg>
      </div>

      {interactive && (
        <div className="mt-3 min-h-[3.5rem] text-center text-sm" aria-live="polite">
          {status === "idle" && !hint && (
            <p className="text-muted">Click a bank or an island to choose where your walk starts.</p>
          )}
          {status === "walking" && <p className="text-muted">{hint}</p>}
          {status === "idle" && hint && <p className="text-muted">{hint}</p>}
          {status === "stuck" && (
            <div className="rounded-2xl bg-red-400 px-4 py-3 text-white shadow-card">
              <p className="font-display font-bold">Stuck! No uncrossed bridges from {position && landById[position].name}.</p>
              <p className="text-white/90">
                {crossed.length} of {bridges.length} crossed. Try a different start or a different order.
              </p>
            </div>
          )}
          {status === "solved" && (
            <div className="rounded-2xl bg-emerald-500 px-4 py-3 text-white shadow-card">
              <p className="font-display font-bold">You did it! Every bridge crossed exactly once. 🎉</p>
              <p className="text-white/90">
                Started on {landById[bridges.length ? startOf(crossed, bridges, position!) : "north"].name}, finished on{" "}
                {position && landById[position].name}.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Work backwards from the final position to find where a completed walk began. */
function startOf(crossed: number[], bridges: Bridge[], end: LandId): LandId {
  let pos = end;
  for (let i = crossed.length - 1; i >= 0; i--) {
    const b = bridges.find((x) => x.id === crossed[i])!;
    pos = b.from === pos ? b.to : b.from;
  }
  return pos;
}

interface ViewProps {
  bridges: Bridge[];
  interactive: boolean;
  status: Status;
  position: LandId | null;
  crossedSet: Set<number>;
  orderOf: (id: number) => number;
  shake: { id: number; n: number } | null;
  onLand: (id: LandId) => void;
  onBridge: (b: Bridge) => void;
}

function clickable(interactive: boolean, label: string, onActivate: () => void) {
  if (!interactive) return {};
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-label": label,
    onClick: onActivate,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate();
      }
    },
  };
}

function Walker({ x, y }: { x: number; y: number }) {
  // Outer group positions; inner group animates. (A CSS transform would override the attribute.)
  return (
    <g transform={`translate(${x}, ${y})`} aria-hidden>
      <g className="walker">
        <circle r="11" fill="rgb(var(--accent))" stroke="#fff" strokeWidth="3" />
        <circle cx="-3.5" cy="-2" r="1.6" fill="#fff" />
        <circle cx="3.5" cy="-2" r="1.6" fill="#fff" />
        <path d="M-4 3q4 4 8 0" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden>
      <circle cx={x} cy={y} r="11" fill="rgb(var(--accent))" stroke="#fff" strokeWidth="2" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Nunito, system-ui, sans-serif">
        {n}
      </text>
    </g>
  );
}

function MapView({ bridges, interactive, status, position, crossedSet, orderOf, shake, onLand, onBridge }: ViewProps) {
  const landShapes: Record<LandId, JSX.Element> = {
    north: <path className="land-shape" d="M0 0H600V98Q450 128 300 112T0 118Z" fill={landById.north.fill} stroke={INK} strokeWidth="5" />,
    south: <path className="land-shape" d="M0 290Q150 262 300 284T600 292V400H0Z" fill={landById.south.fill} stroke={INK} strokeWidth="5" />,
    kneiphof: <ellipse className="land-shape" cx="200" cy="200" rx="68" ry="46" fill={landById.kneiphof.fill} stroke={INK} strokeWidth="5" />,
    lomse: <ellipse className="land-shape" cx="440" cy="200" rx="100" ry="52" fill={landById.lomse.fill} stroke={INK} strokeWidth="5" />,
  };
  const labelPos: Record<LandId, [number, number]> = {
    north: [300, 50],
    south: [300, 356],
    kneiphof: [200, 206],
    lomse: [440, 206],
  };
  return (
    <>
      {/* River */}
      <rect x="0" y="0" width="600" height="400" fill="rgb(var(--accent-2) / 0.55)" />
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none" aria-hidden>
        <path d="M40 200q10-8 20 0t20 0" />
        <path d="M60 260q10-8 20 0t20 0" />
        <path d="M300 150q10-8 20 0t20 0" />
        <path d="M300 250q10-8 20 0t20 0" />
        <path d="M560 160q10-8 20 0t20 0" />
        <path d="M540 260q10-8 20 0t20 0" />
      </g>

      {/* Land */}
      {LANDS.map((l) => {
        const here = position === l.id;
        const props = clickable(interactive, `${l.name}${status === "idle" ? ", click to start here" : ""}`, () => onLand(l.id));
        return (
          <g key={l.id} className={interactive && status === "idle" ? "land-btn" : ""} {...props}>
            {landShapes[l.id]}
            <text
              x={labelPos[l.id][0]}
              y={labelPos[l.id][1]}
              textAnchor="middle"
              fontSize="17"
              fontWeight="800"
              fill={INK}
              fontFamily="Nunito, system-ui, sans-serif"
              opacity={here ? 0.35 : 1}
            >
              {l.name}
            </text>
          </g>
        );
      })}

      {/* Bridges */}
      {bridges.map((b) => {
        const done = crossedSet.has(b.id);
        const horizontal = b.y1 === b.y2;
        const w = horizontal ? Math.abs(b.x2 - b.x1) : 20;
        const h = horizontal ? 20 : Math.abs(b.y2 - b.y1);
        const x = horizontal ? Math.min(b.x1, b.x2) : b.x1 - 10;
        const y = horizontal ? b.y1 - 10 : Math.min(b.y1, b.y2);
        const mx = (b.x1 + b.x2) / 2;
        const my = (b.y1 + b.y2) / 2;
        const fill = done ? "rgb(var(--accent))" : "#b9783f";
        const props = clickable(interactive, `${b.name}, ${landById[b.from].name} to ${landById[b.to].name}${done ? ", already crossed" : ""}`, () => onBridge(b));
        const shaking = shake && shake.id === b.id;
        return (
          <g key={`${b.id}-${shaking ? shake.n : 0}`} className={`${interactive ? "bridge-btn" : ""} ${shaking ? "bridge-shake" : ""}`} {...props}>
            <rect className="plank" x={x} y={y} width={w} height={h} rx="5" fill={fill} stroke={INK} strokeWidth="3.5" />
            {/* rails */}
            {horizontal ? (
              <>
                <line x1={x + 8} y1={y + 6} x2={x + w - 8} y2={y + 6} stroke={INK} strokeWidth="1.5" opacity="0.5" />
                <line x1={x + 8} y1={y + h - 6} x2={x + w - 8} y2={y + h - 6} stroke={INK} strokeWidth="1.5" opacity="0.5" />
              </>
            ) : (
              <>
                <line x1={x + 6} y1={y + 8} x2={x + 6} y2={y + h - 8} stroke={INK} strokeWidth="1.5" opacity="0.5" />
                <line x1={x + w - 6} y1={y + 8} x2={x + w - 6} y2={y + h - 8} stroke={INK} strokeWidth="1.5" opacity="0.5" />
              </>
            )}
            {done && <Badge x={mx} y={my} n={orderOf(b.id)} />}
          </g>
        );
      })}

      {position && <Walker x={landById[position].cx} y={landById[position].cy - 22} />}
    </>
  );
}

/** Node positions in Euler's abstract view. */
const NODE: Record<LandId, [number, number]> = {
  north: [300, 60],
  kneiphof: [170, 200],
  lomse: [440, 200],
  south: [300, 340],
};

function edgePath(b: Bridge, bridges: Bridge[]): { d: string; mx: number; my: number } {
  const [x1, y1] = NODE[b.from];
  const [x2, y2] = NODE[b.to];
  // Parallel edges get bent apart so both are visible.
  const siblings = bridges.filter(
    (o) => (o.from === b.from && o.to === b.to) || (o.from === b.to && o.to === b.from),
  );
  const idx = siblings.findIndex((o) => o.id === b.id);
  const spread = siblings.length === 1 ? 0 : (idx - (siblings.length - 1) / 2) * 70;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = (x1 + x2) / 2 + nx * spread;
  const cy = (y1 + y2) / 2 + ny * spread;
  // Midpoint of a quadratic bezier at t=0.5
  const mx = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
  const my = 0.25 * y1 + 0.5 * cy + 0.25 * y2;
  return { d: `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, mx, my };
}

function GraphView({ bridges, interactive, status, position, crossedSet, orderOf, shake, showDegrees, onLand, onBridge }: ViewProps & { showDegrees: boolean }) {
  return (
    <>
      <rect x="0" y="0" width="600" height="400" fill="rgb(var(--surface-2))" />
      <text x="16" y="30" fontSize="14" fill="rgb(var(--muted))" fontFamily="Nunito, system-ui, sans-serif" fontWeight="700">
        Euler's view: land = dot, bridge = line
      </text>
      {bridges.map((b) => {
        const done = crossedSet.has(b.id);
        const { d, mx, my } = edgePath(b, bridges);
        const shaking = shake && shake.id === b.id;
        const props = clickable(interactive, `${b.name}, ${landById[b.from].name} to ${landById[b.to].name}${done ? ", already crossed" : ""}`, () => onBridge(b));
        return (
          <g key={`${b.id}-${shaking ? shake.n : 0}`} className={`${interactive ? "bridge-btn" : ""} ${shaking ? "bridge-shake" : ""}`} {...props}>
            {/* fat invisible hit area */}
            <path d={d} stroke="transparent" strokeWidth="26" fill="none" />
            <path className="plank" d={d} stroke={done ? "rgb(var(--accent))" : "rgb(var(--ink))"} strokeWidth={done ? 7 : 5} fill="none" strokeLinecap="round" />
            {done && <Badge x={mx} y={my} n={orderOf(b.id)} />}
          </g>
        );
      })}
      {LANDS.map((l) => {
        const [x, y] = NODE[l.id];
        const deg = degreeOf(l.id, bridges);
        const odd = deg % 2 === 1;
        const props = clickable(interactive, `${l.name}, ${deg} bridges${status === "idle" ? ", click to start here" : ""}`, () => onLand(l.id));
        return (
          <g key={l.id} className={interactive && status === "idle" ? "land-btn" : ""} {...props}>
            <circle className="land-shape" cx={x} cy={y} r="30" fill={l.fill} stroke={INK} strokeWidth="5" />
            <text
              x={l.id === "north" ? x - 42 : x}
              y={l.id === "north" ? y + 5 : y + 52}
              textAnchor={l.id === "north" ? "end" : "middle"}
              fontSize="15"
              fontWeight="800"
              fill="rgb(var(--ink))"
              fontFamily="Nunito, system-ui, sans-serif"
            >
              {l.name}
            </text>
            {showDegrees && (
              <g aria-hidden>
                <circle cx={x + 26} cy={y - 26} r="15" fill={odd ? "#f87171" : "#34d399"} stroke="#fff" strokeWidth="2.5" />
                <text x={x + 26} y={y - 21} textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff" fontFamily="Nunito, system-ui, sans-serif">
                  {deg}
                </text>
              </g>
            )}
          </g>
        );
      })}
      {position && <Walker x={NODE[position][0]} y={NODE[position][1]} />}
      {showDegrees && (
        <g fontSize="13" fontFamily="Nunito, system-ui, sans-serif" fontWeight="700" fill="rgb(var(--muted))">
          <circle cx="470" cy="372" r="7" fill="#f87171" />
          <text x="482" y="377">odd</text>
          <circle cx="530" cy="372" r="7" fill="#34d399" />
          <text x="542" y="377">even</text>
        </g>
      )}
    </>
  );
}
