import { useState } from "react";
import StoryCard from "../components/StoryCard";
import { categories, stories } from "../content/stories";
import { trackEvent } from "../lib/analytics";

export default function Stories() {
  const [filter, setFilter] = useState<string>("All");
  const list = filter === "All" ? stories : stories.filter((s) => s.category === filter);
  const pick = (c: string) => {
    setFilter(c);
    trackEvent("category_filter", { category: c });
  };
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <header className="mb-8 text-center">
        <h1>All stories</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          {stories.length} interactive stories across {categories.length} fields. Pick one and start
          clicking.
        </p>
      </header>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by field">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => pick(c)}
            aria-pressed={filter === c}
            className={`rounded-full border px-3 py-1 text-sm font-bold transition-colors ${
              filter === c
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface-2 text-ink hover:border-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <StoryCard key={s.slug} story={s} location="stories_index" />
        ))}
      </div>
    </main>
  );
}
