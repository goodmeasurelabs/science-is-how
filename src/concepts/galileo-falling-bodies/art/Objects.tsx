/** Flat cartoon props shared by the Galileo steps. All use CSS tokens so dark mode works. */

export function Ball({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} aria-hidden>
      <circle cx="30" cy="30" r="26" fill="rgb(var(--ink))" />
      <circle cx="21" cy="21" r="6" fill="rgb(var(--surface-2))" />
      <circle cx="35" cy="18" r="4" fill="rgb(var(--surface-2))" opacity="0.7" />
      <circle cx="24" cy="34" r="3.5" fill="rgb(var(--surface-2))" opacity="0.6" />
    </svg>
  );
}

export function Feather({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} aria-hidden>
      <g transform="translate(14 4) rotate(18 16 26)">
        <path
          d="M4 2c20 10 30 30 26 52C18 46 8 30 4 2z"
          fill="rgb(var(--accent-2))"
          stroke="rgb(var(--ink))"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M9 16c8 8 14 20 17 34" stroke="rgb(var(--ink))" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M30 54l4 6" stroke="rgb(var(--ink))" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Stone({
  size = 64,
  label,
  small = false,
}: {
  size?: number;
  label?: string;
  small?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden>
      {small ? (
        <path
          d="M22 30c10-10 30-8 34 4 4 10-2 24-18 24-12 0-22-8-20-18 1-4 2-7 4-10z"
          fill="#c9b8a8"
          stroke="rgb(var(--ink))"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M14 34c6-18 30-26 48-16 12 7 14 26 4 38-12 14-40 12-50-2-5-7-4-14-2-20z"
          fill="#a89684"
          stroke="rgb(var(--ink))"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
      {label && (
        <text
          x="40"
          y={small ? 46 : 46}
          textAnchor="middle"
          fontSize={small ? 11 : 16}
          fontWeight="800"
          fontFamily="Nunito, system-ui, sans-serif"
          fill="rgb(var(--ink))"
        >
          {label}
        </text>
      )}
    </svg>
  );
}

/** A little cartoon Aristotle-style bust for the first step. */
export function Philosopher({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <circle cx="60" cy="60" r="56" fill="rgb(var(--accent) / 0.12)" />
      <path d="M32 112c0-22 12-32 28-32s28 10 28 32" fill="#fff8f2" stroke="rgb(var(--ink))" strokeWidth="4" />
      <circle cx="60" cy="52" r="24" fill="#ffd9c4" stroke="rgb(var(--ink))" strokeWidth="4" />
      <path d="M38 48c2-16 12-24 22-24s20 8 22 24c-6-6-12-8-22-8s-16 2-22 8z" fill="#e8e0d8" stroke="rgb(var(--ink))" strokeWidth="4" strokeLinejoin="round" />
      <path d="M42 66c4 14 10 20 18 22 8-2 14-8 18-22-6 6-12 8-18 8s-12-2-18-8z" fill="#e8e0d8" stroke="rgb(var(--ink))" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="51" cy="52" r="2.5" fill="rgb(var(--ink))" />
      <circle cx="69" cy="52" r="2.5" fill="rgb(var(--ink))" />
    </svg>
  );
}

/** Astronaut on the Moon, for the Apollo 15 step. */
export function Astronaut({ size = 140 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" aria-hidden>
      <circle cx="70" cy="70" r="66" fill="rgb(var(--accent-2) / 0.15)" />
      <ellipse cx="70" cy="126" rx="60" ry="8" fill="#b9b3c4" />
      <rect x="44" y="60" width="52" height="52" rx="14" fill="#fff8f2" stroke="rgb(var(--ink))" strokeWidth="4" />
      <rect x="54" y="72" width="32" height="18" rx="6" fill="#dcd5e6" stroke="rgb(var(--ink))" strokeWidth="3" />
      <circle cx="70" cy="42" r="24" fill="#fff8f2" stroke="rgb(var(--ink))" strokeWidth="4" />
      <ellipse cx="70" cy="44" rx="16" ry="14" fill="#fbbf24" stroke="rgb(var(--ink))" strokeWidth="3" />
      <ellipse cx="64" cy="40" rx="5" ry="3" fill="#fff8f2" opacity=".8" />
      <path d="M44 78H24l-4 20" stroke="rgb(var(--ink))" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M96 78h20l4 20" stroke="rgb(var(--ink))" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M54 112v14M86 112v14" stroke="rgb(var(--ink))" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
