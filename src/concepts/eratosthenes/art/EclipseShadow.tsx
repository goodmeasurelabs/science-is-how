/** The Moon during a lunar eclipse: Earth's shadow always has a round edge. */
export default function EclipseShadow() {
  return (
    <svg viewBox="0 0 360 200" className="mx-auto w-full max-w-sm" role="img" aria-label="The round edge of Earth's shadow crossing the Moon">
      <rect x="0" y="0" width="360" height="200" rx="24" className="fill-ink/90" />
      <g className="fill-surface-2/70">
        <circle cx="40" cy="40" r="2" /><circle cx="90" cy="150" r="2" /><circle cx="300" cy="30" r="2" />
        <circle cx="330" cy="160" r="2" /><circle cx="200" cy="20" r="1.5" /><circle cx="60" cy="110" r="1.5" />
      </g>
      <defs>
        <clipPath id="moon-clip">
          <circle cx="180" cy="100" r="62" />
        </clipPath>
      </defs>
      <circle cx="180" cy="100" r="62" className="fill-amber-100" />
      <g clipPath="url(#moon-clip)" className="fill-amber-200/80">
        <circle cx="150" cy="80" r="10" /><circle cx="205" cy="120" r="14" /><circle cx="195" cy="65" r="6" /><circle cx="160" cy="130" r="7" />
      </g>
      <circle cx="90" cy="100" r="130" clipPath="url(#moon-clip)" className="fill-red-900/85" />
      <path d="M180 38a62 62 0 0 0 0 124" fill="none" className="stroke-accent" strokeWidth="0" />
      <text x="290" y="180" className="fill-surface-2 text-[12px]" textAnchor="end" fontFamily="sans-serif">
        Earth's shadow
      </text>
    </svg>
  );
}
