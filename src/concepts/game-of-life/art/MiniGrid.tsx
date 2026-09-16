/** A tiny 3x3 (or NxN) SVG grid used to illustrate a rule. `cells` are 1 for alive. */
export default function MiniGrid({
  cells,
  size = 3,
  highlightCenter = true,
  label,
  className = "",
}: {
  cells: number[];
  size?: number;
  highlightCenter?: boolean;
  label?: string;
  className?: string;
}) {
  const c = 34;
  const pad = 4;
  const total = size * c + pad * 2;
  const mid = Math.floor(size / 2);
  return (
    <figure className={`!my-0 flex flex-col items-center gap-2 ${className}`}>
      <svg
        viewBox={`0 0 ${total} ${total}`}
        style={{ width: "100%", maxWidth: total * 1.1 }}
        role="img"
        aria-label={label}
      >
        <rect x={1} y={1} width={total - 2} height={total - 2} rx={10} fill="rgb(var(--surface-2))" stroke="rgb(var(--line))" strokeWidth={2} />
        {cells.map((v, i) => {
          const x = pad + (i % size) * c;
          const y = pad + Math.floor(i / size) * c;
          const isCenter = highlightCenter && i % size === mid && Math.floor(i / size) === mid;
          return (
            <g key={i}>
              <rect x={x} y={y} width={c} height={c} fill="none" stroke="rgb(var(--line))" strokeWidth={1} />
              {v === 1 && (
                <rect x={x + 4} y={y + 4} width={c - 8} height={c - 8} rx={5} fill="rgb(var(--accent))" />
              )}
              {isCenter && (
                <rect x={x + 1.5} y={y + 1.5} width={c - 3} height={c - 3} rx={6} fill="none" stroke="rgb(var(--accent-2))" strokeWidth={3} strokeDasharray="5 3" />
              )}
            </g>
          );
        })}
      </svg>
      {label && <figcaption className="text-xs text-muted">{label}</figcaption>}
    </figure>
  );
}
