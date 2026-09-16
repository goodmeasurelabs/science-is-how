/** A tiny flat-style hotel guest. `color` is any CSS color. */
export default function Guest({ color, size = 28, title }: { color: string; size?: number; title?: string }) {
  return (
    <svg viewBox="0 0 40 52" width={size} height={size * 1.3} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      <rect x="6" y="26" width="28" height="24" rx="9" fill={color} stroke="rgb(var(--ink))" strokeWidth="3" />
      <circle cx="20" cy="15" r="12" fill="rgb(var(--surface-2))" stroke="rgb(var(--ink))" strokeWidth="3" />
      <circle cx="15.5" cy="14" r="1.8" fill="rgb(var(--ink))" />
      <circle cx="24.5" cy="14" r="1.8" fill="rgb(var(--ink))" />
      <path d="M15 19.5 Q20 23 25 19.5" fill="none" stroke="rgb(var(--ink))" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
