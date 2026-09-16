/** Two observers on a curved Earth see different stars near the horizon. */
export default function StarsShift() {
  return (
    <svg viewBox="0 0 360 200" className="mx-auto w-full max-w-sm" role="img" aria-label="Two people standing on a curved Earth looking at different parts of the sky">
      <g className="fill-amber-300">
        <path d="M60 30l4 10 10 1-8 7 3 10-9-6-9 6 3-10-8-7 10-1z" />
        <path d="M300 30l4 10 10 1-8 7 3 10-9-6-9 6 3-10-8-7 10-1z" />
        <circle cx="180" cy="26" r="4" /><circle cx="120" cy="60" r="2" /><circle cx="240" cy="60" r="2" />
      </g>
      <path d="M-40 260a220 220 0 0 1 440 0z" className="fill-accent-2/40 stroke-ink" strokeWidth="5" />
      <g className="stroke-ink" strokeWidth="4" strokeLinecap="round" fill="none">
        <circle cx="95" cy="104" r="9" className="fill-surface-2" />
        <path d="M95 113v22M95 120l-12 8M95 120l12-8M95 135l-8 14M95 135l8 14" />
        <circle cx="265" cy="104" r="9" className="fill-surface-2" />
        <path d="M265 113v22M265 120l-12 8M265 120l12-8M265 135l-8 14M265 135l8 14" />
      </g>
      <g className="stroke-accent" strokeWidth="2" strokeDasharray="4 4" fill="none">
        <path d="M95 100L60 42" />
        <path d="M265 100l35-58" />
      </g>
    </svg>
  );
}
