import type { ReactNode } from "react";

type Tone = "info" | "fun" | "warn" | "history";

const tones: Record<Tone, { ring: string; emoji: string; label: string }> = {
  info: { ring: "border-accent-2", emoji: "💡", label: "Key idea" },
  fun: { ring: "border-accent", emoji: "🎉", label: "Fun fact" },
  warn: { ring: "border-red-400", emoji: "⚠️", label: "Careful" },
  history: { ring: "border-amber-400", emoji: "📜", label: "From the archives" },
};

/** A boxed aside inside a story step. */
export default function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  const t = tones[tone];
  return (
    <aside
      className={`my-6 rounded-2xl border-l-4 ${t.ring} bg-surface-2 px-5 py-4 text-left shadow-card`}
    >
      <div className="mb-1 flex items-center gap-2 font-display font-bold">
        <span aria-hidden>{t.emoji}</span>
        <span>{title ?? t.label}</span>
      </div>
      <div className="text-[0.95em] text-ink/90">{children}</div>
    </aside>
  );
}
