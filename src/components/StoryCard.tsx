import { Link } from "react-router-dom";
import type { Story } from "../content/types";
import { trackCTAClick } from "../lib/analytics";

export default function StoryCard({ story, location = "home" }: { story: Story; location?: string }) {
  return (
    <Link
      to={`/${story.slug}`}
      onClick={() =>
        trackCTAClick({ cta_text: story.title, cta_location: location, cta_destination: `/${story.slug}` })
      }
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 p-6">
        <img
          src={story.coverUrl}
          alt={story.coverAlt}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 text-left">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent">{story.category}</span>
          <span>{story.year}</span>
          <span aria-hidden>·</span>
          <span>{story.minutes} min</span>
        </div>
        <h3 className="text-xl">{story.title}</h3>
        <p className="text-sm text-muted">{story.tagline}</p>
        <span className="mt-auto pt-2 font-display font-bold text-accent">Start the story →</span>
      </div>
    </Link>
  );
}
