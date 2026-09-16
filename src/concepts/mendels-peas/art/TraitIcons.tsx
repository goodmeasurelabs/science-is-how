const ink = "rgb(var(--ink))";
const stroke = { stroke: ink, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Small flat icons for Mendel's seven traits. Each takes `variant` 0 or 1. */
export function SeedShape({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      {variant === 0 ? (
        <circle cx="24" cy="24" r="16" fill="#b7e39b" {...stroke} />
      ) : (
        <path d="M24 8c5-1 9 2 11 5 3 2 6 6 5 10 2 3 1 8-2 10-1 4-6 7-10 6-4 2-9 1-11-2-4 0-8-4-7-8-3-3-2-8 1-10 0-4 4-8 8-8 1-2 3-3 5-3z" fill="#b7e39b" {...stroke} />
      )}
    </svg>
  );
}
export function SeedColor({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      <circle cx="24" cy="24" r="16" fill={variant === 0 ? "#f6d86b" : "#b7e39b"} {...stroke} />
    </svg>
  );
}
export function FlowerColor({ variant }: { variant: 0 | 1 }) {
  const fill = variant === 0 ? "#c39be0" : "#ffffff";
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="24" cy="13" rx="6" ry="9" fill={fill} transform={`rotate(${a} 24 24)`} {...stroke} />
      ))}
      <circle cx="24" cy="24" r="5" fill="#f6d86b" {...stroke} />
    </svg>
  );
}
export function PodShape({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      {variant === 0 ? (
        <path d="M6 30C10 16 24 8 42 12c-2 14-14 26-32 24-3 0-4-3-4-6z" fill="#7cc36c" {...stroke} />
      ) : (
        <path d="M6 30c3-6 7-8 10-6s4 6 8 4 4-8 8-7 4 5 8 2c2-1 3-2 3-3-3 12-13 20-31 19-4 0-7-4-6-9z" fill="#7cc36c" {...stroke} />
      )}
    </svg>
  );
}
export function PodColor({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      <path d="M6 30C10 16 24 8 42 12c-2 14-14 26-32 24-3 0-4-3-4-6z" fill={variant === 0 ? "#7cc36c" : "#f6d86b"} {...stroke} />
    </svg>
  );
}
export function FlowerPosition({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      <path d="M24 44V8" fill="none" {...stroke} />
      {variant === 0 ? (
        <>
          <path d="M24 30l-9-4M24 20l9-4" fill="none" {...stroke} />
          <circle cx="13" cy="25" r="4" fill="#c39be0" {...stroke} />
          <circle cx="35" cy="15" r="4" fill="#c39be0" {...stroke} />
        </>
      ) : (
        <>
          <path d="M24 30l-8-4M24 24l8-4" fill="none" {...stroke} />
          <circle cx="24" cy="8" r="5" fill="#c39be0" {...stroke} />
        </>
      )}
    </svg>
  );
}
export function PlantHeight({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden>
      <path d="M8 44h32" fill="none" {...stroke} />
      {variant === 0 ? (
        <>
          <path d="M24 44V6M24 30l-8-6M24 20l8-6M24 12l-7-5" fill="none" {...stroke} />
        </>
      ) : (
        <>
          <path d="M24 44V28M24 38l-7-5M24 34l7-5" fill="none" {...stroke} />
        </>
      )}
    </svg>
  );
}
