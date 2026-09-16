/** A single pea seed. Round peas are smooth; wrinkled peas are bumpy. */
export default function Pea({
  wrinkled = false,
  color = "green",
  size = 28,
  className = "",
  title,
}: {
  wrinkled?: boolean;
  color?: "green" | "yellow";
  size?: number;
  className?: string;
  title?: string;
}) {
  const fill = color === "green" ? "#b7e39b" : "#f6d86b";
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {wrinkled ? (
        <path
          d="M20 5c4-1 8 2 10 4 3 1 6 5 5 9 2 3 1 8-2 10-1 4-6 6-9 5-4 2-9 1-11-2-4 0-8-4-7-8-3-3-2-8 1-10 0-4 4-7 8-7 1-2 3-1 5-1z"
          fill={fill}
          stroke="rgb(var(--ink))"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      ) : (
        <circle cx="20" cy="20" r="15.5" fill={fill} stroke="rgb(var(--ink))" strokeWidth="3" />
      )}
      {wrinkled && (
        <path
          d="M13 16q3-2 6 0M22 24q3-2 6 0M12 26q3-2 6 0"
          fill="none"
          stroke="rgb(var(--ink))"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      )}
      {!wrinkled && <circle cx="14" cy="14" r="3" fill="#fff" opacity="0.7" />}
    </svg>
  );
}
