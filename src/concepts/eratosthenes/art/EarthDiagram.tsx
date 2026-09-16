interface Props {
  /** Shadow angle at Alexandria, in degrees. */
  angle: number;
}

const CX = 330;
const CY = 190;
const R = 130;
const STICK = 52;
const toRad = (d: number) => (d * Math.PI) / 180;

/**
 * Earth with parallel sunlight from the right. Syene sits where the Sun is overhead.
 * Alexandria sits `angle` degrees further north; its stick casts a shadow.
 */
export default function EarthDiagram({ angle }: Props) {
  const a = toRad(angle);
  // Syene: sun directly overhead (rightmost point).
  const syene = { x: CX + R, y: CY };
  const syeneTip = { x: syene.x + STICK, y: syene.y };
  // Alexandria: rotate counter-clockwise (north) by the angle.
  const alex = { x: CX + R * Math.cos(a), y: CY - R * Math.sin(a) };
  const alexTip = { x: alex.x + STICK * Math.cos(a), y: alex.y - STICK * Math.sin(a) };
  // Shadow runs along the tangent, away from the sun, length = stick * tan(angle).
  const shadowLen = STICK * Math.tan(a);
  const shadowEnd = { x: alex.x - shadowLen * Math.sin(a), y: alex.y - shadowLen * Math.cos(a) };
  // Arc at the centre marking the angle.
  const arcR = 46;
  const arcEnd = { x: CX + arcR * Math.cos(a), y: CY - arcR * Math.sin(a) };
  const rays = [-110, -80, -50, -25, 25, 50, 80, 110].map((dy) => ({
    y: CY + dy,
    x: CX + Math.sqrt(R * R - dy * dy),
  }));

  return (
    <svg viewBox="0 0 600 380" className="w-full" role="img" aria-label={`Diagram of the Earth with sunlight arriving in parallel rays. The shadow angle at Alexandria is ${angle.toFixed(1)} degrees.`}>
      {/* Sun */}
      <circle cx="566" cy={CY} r="26" className="fill-amber-300 stroke-ink" strokeWidth="4" />
      {/* Parallel rays */}
      <g className="stroke-amber-400" strokeWidth="2.5" strokeLinecap="round">
        {rays.map((r) => (
          <path key={r.y} d={`M540 ${r.y}H${r.x + 4}`} />
        ))}
        <path d={`M540 ${syeneTip.y}H${syeneTip.x}`} />
        <path d={`M540 ${alexTip.y}H${alexTip.x}`} className="stroke-accent" strokeWidth="3" />
      </g>
      {/* Earth */}
      <circle cx={CX} cy={CY} r={R} className="fill-accent-2/40 stroke-ink" strokeWidth="5" />
      <path d={`M${CX - 90} ${CY - 60}c30-18 60-14 80 4s50 20 70-4`} fill="none" className="stroke-emerald-500" strokeWidth="6" strokeLinecap="round" />
      <path d={`M${CX - 110} ${CY + 30}c40-6 70 10 100 6s50-18 90-6`} fill="none" className="stroke-emerald-500" strokeWidth="6" strokeLinecap="round" />
      {/* Radii and the central angle */}
      <g className="stroke-ink/60" strokeWidth="2" strokeDasharray="5 5">
        <path d={`M${CX} ${CY}L${syene.x} ${syene.y}`} />
        <path d={`M${CX} ${CY}L${alex.x} ${alex.y}`} />
      </g>
      <path d={`M${CX + arcR} ${CY}A${arcR} ${arcR} 0 0 0 ${arcEnd.x} ${arcEnd.y}`} fill="none" className="stroke-accent" strokeWidth="3" />
      <text x={CX + arcR + 10} y={CY - 8} fontFamily="sans-serif" className="fill-accent text-[15px] font-bold">
        {angle.toFixed(1)}°
      </text>
      <circle cx={CX} cy={CY} r="4" className="fill-ink" />
      {/* Syene stick */}
      <path d={`M${syene.x} ${syene.y}L${syeneTip.x} ${syeneTip.y}`} className="stroke-ink" strokeWidth="6" strokeLinecap="round" />
      <text x={syene.x + 8} y={syene.y + 26} fontFamily="sans-serif" className="fill-ink text-[13px] font-bold">Syene</text>
      <text x={syene.x + 8} y={syene.y + 42} fontFamily="sans-serif" className="fill-muted text-[11px]">no shadow</text>
      {/* Alexandria shadow + stick */}
      <path d={`M${alex.x} ${alex.y}L${shadowEnd.x} ${shadowEnd.y}`} className="stroke-ink/50" strokeWidth="8" strokeLinecap="round" />
      <path d={`M${alex.x} ${alex.y}L${alexTip.x} ${alexTip.y}`} className="stroke-ink" strokeWidth="6" strokeLinecap="round" />
      <text x={alexTip.x + 6} y={alexTip.y - 8} fontFamily="sans-serif" className="fill-ink text-[13px] font-bold">Alexandria</text>

      {/* Inset: zoom on the Alexandria stick, drawn with the ground horizontal. */}
      <g transform="translate(14 110)">
        <rect x="0" y="0" width="150" height="150" rx="14" className="fill-surface-2 stroke-line" strokeWidth="2" />
        <text x="75" y="18" textAnchor="middle" fontFamily="sans-serif" className="fill-muted text-[10px] font-bold">ALEXANDRIA, CLOSE UP</text>
        {(() => {
          const gx = 60;
          const gy = 126;
          const h = 86;
          const s = h * Math.tan(a);
          const tip = { x: gx, y: gy - h };
          // Ray arrives at angle `a` from vertical, hitting the tip and landing at the shadow end.
          const rayStart = { x: tip.x + 200 * Math.sin(a), y: tip.y - 200 * Math.cos(a) };
          const arcRadius = 30;
          const arcTo = { x: tip.x + arcRadius * Math.sin(a), y: tip.y + arcRadius * Math.cos(a) };
          return (
            <g>
              <path d="M10 126h130" className="stroke-ink" strokeWidth="3" strokeLinecap="round" />
              <path d={`M${gx} ${gy}L${gx + s} ${gy}`} className="stroke-ink/50" strokeWidth="7" strokeLinecap="round" />
              <path d={`M${rayStart.x} ${rayStart.y}L${gx + s} ${gy}`} className="stroke-accent" strokeWidth="2.5" strokeDasharray="5 4" />
              <path d={`M${gx} ${gy}L${tip.x} ${tip.y}`} className="stroke-ink" strokeWidth="5" strokeLinecap="round" />
              <path d={`M${tip.x} ${tip.y + arcRadius}A${arcRadius} ${arcRadius} 0 0 0 ${arcTo.x} ${arcTo.y}`} fill="none" className="stroke-accent" strokeWidth="2.5" />
              <text x={tip.x + 12} y={tip.y + 48} fontFamily="sans-serif" className="fill-accent text-[12px] font-bold">{angle.toFixed(1)}°</text>
              <text x={gx + s / 2} y={gy + 16} textAnchor="middle" fontFamily="sans-serif" className="fill-muted text-[10px]">shadow</text>
            </g>
          );
        })()}
      </g>
    </svg>
  );
}
