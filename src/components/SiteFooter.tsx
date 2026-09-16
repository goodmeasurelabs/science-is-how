import { Link } from "react-router-dom";
import { stories } from "../content/stories";
import { trackNavigationClick, trackOutboundClick } from "../lib/analytics";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line/70 bg-surface-2/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-lg font-extrabold">
            Science is How<span className="text-accent">?</span>
          </p>
          <p className="mt-2 max-w-xs text-muted">
            Interactive stories from the history of science and math. Made for curious people
            who like to poke things.
          </p>
        </div>
        <nav aria-label="Stories">
          <p className="mb-2 font-display font-bold">Stories</p>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {stories.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/${s.slug}`}
                  className="text-muted hover:text-accent"
                  onClick={() =>
                    trackNavigationClick({ destination: `/${s.slug}`, nav_location: "footer" })
                  }
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site">
          <p className="mb-2 font-display font-bold">Site</p>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="text-muted hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/seantarzy/science-is-how"
                className="text-muted hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackOutboundClick({
                    url: "https://github.com/seantarzy/science-is-how",
                    link_text: "Source on GitHub",
                    link_location: "footer",
                  })
                }
              >
                Source on GitHub
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted">
            © {new Date().getFullYear()} Sean Tarzy. Illustrations are original to this site.
          </p>
        </nav>
      </div>
    </footer>
  );
}
