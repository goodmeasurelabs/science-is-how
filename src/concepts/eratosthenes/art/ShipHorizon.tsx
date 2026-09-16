/** A ship sailing over a curved horizon. `stage` 0 = full ship, 1 = hull hidden, 2 = only the mast tip. */
export default function ShipHorizon({ stage }: { stage: 0 | 1 | 2 }) {
  const drop = [0, 30, 68][stage];
  return (
    <svg viewBox="0 0 360 200" className="mx-auto w-full max-w-sm" role="img" aria-label="A ship dropping behind the curve of the sea">
      <defs>
        <clipPath id="ship-above-sea">
          <path d="M0 0h360v140q-180-70-360 0z" />
        </clipPath>
      </defs>
      <circle cx="300" cy="50" r="22" className="fill-amber-300 stroke-ink" strokeWidth="4" />
      {/* Clip first, then translate: a clip on the moving group would move with the ship. */}
      <g clipPath="url(#ship-above-sea)">
        <g transform={`translate(0 ${drop})`} className="stroke-ink transition-transform duration-700" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M120 80h130l-18 26h-96z" className="fill-accent" />
          <path d="M185 80V24" />
          <path d="M185 30l48 46h-48z" className="fill-surface-2" />
          <path d="M185 30l-40 46h40z" className="fill-surface-2" />
        </g>
      </g>
      <path d="M0 140q180-70 360 0v60H0z" className="fill-accent-2/60 stroke-ink" strokeWidth="5" />
      <path d="M40 160c20-8 40-8 60 0s40 8 60 0 40-8 60-0 40 8 60 0" className="stroke-surface-2" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
