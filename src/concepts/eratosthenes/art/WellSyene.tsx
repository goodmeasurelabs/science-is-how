/** Noon at Syene on the solstice: sun straight up, no shadow, light at the bottom of the well. */
export default function WellSyene() {
  return (
    <svg viewBox="0 0 360 240" className="mx-auto w-full max-w-sm" role="img" aria-label="The Sun directly overhead a well and a stick; neither casts a shadow">
      <circle cx="180" cy="30" r="24" className="fill-amber-300 stroke-ink" strokeWidth="4" />
      <g className="stroke-amber-400" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round">
        <path d="M150 60v120M180 60v100M210 60v120M260 60v120M100 60v120" />
      </g>
      <rect x="0" y="180" width="360" height="60" className="fill-amber-200" />
      <path d="M0 180h360" className="stroke-ink" strokeWidth="4" />
      {/* the well */}
      <g className="stroke-ink" strokeWidth="4">
        <rect x="150" y="150" width="60" height="30" rx="4" className="fill-stone-400" />
        <rect x="160" y="160" width="40" height="80" className="fill-ink/80" />
        <rect x="170" y="200" width="20" height="40" className="fill-amber-300" />
        <path d="M150 150h60" />
      </g>
      {/* the stick, no shadow */}
      <path d="M270 180V110" className="stroke-ink" strokeWidth="6" strokeLinecap="round" />
      <text x="270" y="205" textAnchor="middle" fontFamily="sans-serif" className="fill-ink text-[12px] font-bold">no shadow</text>
      <path d="M158 222h-22" className="stroke-ink" strokeWidth="2" strokeLinecap="round" />
      <text x="10" y="226" textAnchor="start" fontFamily="sans-serif" className="fill-ink text-[12px] font-bold">light hits the bottom</text>
    </svg>
  );
}
