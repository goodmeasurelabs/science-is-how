/** Small inline cake used in the intro. */
export default function Cake({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="A cartoon birthday cake">
      <circle cx="100" cy="100" r="92" fill="rgb(var(--accent))" opacity="0.12" />
      <rect x="40" y="110" width="120" height="50" rx="10" fill="#f6b6a6" stroke="rgb(var(--ink))" strokeWidth="5" />
      <rect x="55" y="80" width="90" height="36" rx="9" fill="#ffd6a5" stroke="rgb(var(--ink))" strokeWidth="5" />
      <path d="M40 120 q15 12 30 0 t30 0 t30 0 t30 0" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M55 88 q11 10 22 0 t22 0 t22 0 t22 0" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      {[75, 100, 125].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="52" width="8" height="28" rx="3" fill="#8fd3f4" stroke="rgb(var(--ink))" strokeWidth="3" />
          <ellipse cx={x} cy="44" rx="5" ry="8" fill="#ff7a59" stroke="rgb(var(--ink))" strokeWidth="3" />
          <ellipse cx={x} cy="46" rx="2" ry="4" fill="#ffd166" />
        </g>
      ))}
      <rect x="30" y="158" width="140" height="12" rx="6" fill="rgb(var(--ink))" />
    </svg>
  );
}
