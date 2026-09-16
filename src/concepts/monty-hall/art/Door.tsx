/** A flat cartoon game-show door. Closed, or open to reveal a goat or a car. */
export type Prize = "goat" | "car";

/** Doors are always pastel, so linework stays dark in both themes. */
const INK = "#2b2033";

interface DoorProps {
  number: number;
  open: boolean;
  prize: Prize;
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
  label?: string;
  size?: number;
}

function Goat() {
  return (
    <g transform="translate(20 62)">
      <ellipse cx="30" cy="34" rx="24" ry="18" fill="#f4efe8" stroke={INK} strokeWidth="4" />
      <circle cx="20" cy="12" r="14" fill="#f4efe8" stroke={INK} strokeWidth="4" />
      <path d="M12 0l-6-11M28 0l6-11" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="10" r="2.5" fill={INK} />
      <circle cx="25" cy="10" r="2.5" fill={INK} />
      <path d="M16 18q4 3 8 0" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M20 22v7" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M8 6l-8 5" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M18 50v12M40 50v12" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Car() {
  return (
    <g transform="translate(8 78)">
      <path
        d="M4 40q0-14 10-16l8-16q2-4 6-4h30q4 0 6 4l8 16q10 2 10 16v10H4z"
        fill="rgb(var(--accent))"
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M24 24l6-13h26l6 13z" fill="#dff3fb" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M43 11v13" stroke={INK} strokeWidth="3" />
      <circle cx="22" cy="50" r="8" fill={INK} />
      <circle cx="64" cy="50" r="8" fill={INK} />
      <circle cx="22" cy="50" r="3" fill="#fff" />
      <circle cx="64" cy="50" r="3" fill="#fff" />
      <circle cx="10" cy="38" r="3" fill="#ffe680" stroke={INK} strokeWidth="2" />
      <circle cx="76" cy="38" r="3" fill="#ffe680" stroke={INK} strokeWidth="2" />
    </g>
  );
}

const fills = ["#f8d9c4", "#d9ecf7", "#e6dcf5", "#dcefdc", "#fbe7b5"];

export default function Door({ number, open, prize, selected, dimmed, onClick, label, size = 120 }: DoorProps) {
  const fill = fills[(number - 1) % fills.length];
  const w = 96;
  const h = 170;
  const interactive = !!onClick;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      aria-label={label ?? `Door ${number}${open ? `, open, showing a ${prize}` : ""}${selected ? ", your pick" : ""}`}
      aria-pressed={selected}
      className={`group relative rounded-2xl transition-transform focus-visible:outline-none ${
        interactive ? "cursor-pointer hover:-translate-y-1" : "cursor-default"
      } ${dimmed ? "opacity-40" : ""}`}
      style={{ width: size * 1.34, height: (size * (h + 12)) / w }}
    >
      <svg viewBox={`-32 -6 ${w + 38} ${h + 12}`} width="100%" height="100%" aria-hidden>
        {/* frame */}
        <rect x="2" y="2" width={w - 4} height={h - 4} rx="10" fill="#3b2f45" stroke={INK} strokeWidth="4" />
        {/* dark interior + prize */}
        {open && (prize === "goat" ? <Goat /> : <Car />)}
        {/* door leaf */}
        {open ? (
          <path
            d={`M4 8 L-26 22 L-26 ${h - 18} L4 ${h - 6} Z`}
            fill={fill}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        ) : (
          <g>
            <rect x="2" y="2" width={w - 4} height={h - 4} rx="10" fill={fill} stroke={INK} strokeWidth="4" />
            <rect x="16" y="18" width={w - 32} height="54" rx="6" fill="#fff" opacity="0.65" stroke={INK} strokeWidth="3" />
            <circle cx={w - 18} cy={h / 2 + 8} r="5" fill={INK} />
            <text
              x={w / 2}
              y={h - 34}
              textAnchor="middle"
              fontFamily="Nunito, ui-rounded, system-ui, sans-serif"
              fontSize="30"
              fontWeight="800"
              fill={INK}
            >
              {number}
            </text>
          </g>
        )}
        {selected && (
          <rect x="-3" y="-3" width={w + 6} height={h + 6} rx="14" fill="none" stroke="rgb(var(--accent))" strokeWidth="5" />
        )}
      </svg>
      {selected && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
          your pick
        </span>
      )}
    </button>
  );
}
