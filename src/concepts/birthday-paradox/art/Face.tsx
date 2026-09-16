/** A tiny flat cartoon face. `color` tints the hair/shirt; matches get a bright fill. */
export default function Face({
  seed,
  color,
  highlight,
  size = 44,
}: {
  seed: number;
  color?: string;
  highlight?: boolean;
  size?: number;
}) {
  const skin = ["#f8d5b8", "#e8b894", "#c98a5b", "#8d5a3b", "#f2c9a6", "#a86a45"][seed % 6];
  const hairColors = ["#2b2033", "#6b3e26", "#e9c46a", "#b5533c", "#3d3d3d", "#9a6b4f"];
  const hair = hairColors[(seed * 7) % 6];
  const style = (seed * 13) % 4;
  const smile = (seed * 3) % 2 === 0;
  const ring = highlight ? color ?? "rgb(var(--accent))" : "rgb(var(--line))";
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="21" fill={highlight ? color : "rgb(var(--surface-2))"} stroke={ring} strokeWidth={highlight ? 3 : 2} />
      {/* shirt */}
      <path d="M8 40 Q22 28 36 40 Z" fill={highlight ? "#fff" : color ?? "rgb(var(--accent-2))"} opacity={highlight ? 0.9 : 0.7} />
      {/* head */}
      <circle cx="22" cy="19" r="10" fill={skin} stroke="rgb(var(--ink))" strokeWidth="1.5" />
      {/* hair */}
      {style === 0 && <path d="M12 18 Q13 8 22 8 Q31 8 32 18 Q27 13 22 14 Q17 13 12 18Z" fill={hair} />}
      {style === 1 && <path d="M12 17 Q14 7 24 8 Q33 9 32 17 L30 14 Q22 10 14 15Z" fill={hair} />}
      {style === 2 && <path d="M11 20 Q10 6 22 7 Q34 6 33 20 Q31 12 22 12 Q13 12 11 20Z" fill={hair} />}
      {style === 3 && <path d="M13 16 Q15 9 22 9 Q29 9 31 16 Q26 15 22 16 Q18 15 13 16Z" fill={hair} />}
      {/* eyes */}
      <circle cx="18.5" cy="19" r="1.4" fill="rgb(var(--ink))" />
      <circle cx="25.5" cy="19" r="1.4" fill="rgb(var(--ink))" />
      {/* mouth */}
      {smile ? (
        <path d="M18.5 23.5 Q22 26.5 25.5 23.5" stroke="rgb(var(--ink))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M19.5 24 L24.5 24" stroke="rgb(var(--ink))" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}
