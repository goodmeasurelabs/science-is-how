import { Link, NavLink } from "react-router-dom";
import AtomLogo from "../assets/atom-logo.png";
import { trackNavigationClick } from "../lib/analytics";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-1.5 font-display font-bold transition-colors hover:bg-ink/5 ${
    isActive ? "text-accent" : "text-ink"
  }`;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => trackNavigationClick({ destination: "/", nav_location: "header" })}
        >
          <img src={AtomLogo} alt="" aria-hidden className="h-10 w-10" />
          <span className="font-display text-xl font-extrabold tracking-tight">
            Science is How<span className="text-accent">?</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm md:text-base" aria-label="Main">
          <NavLink
            to="/stories"
            className={linkClass}
            onClick={() => trackNavigationClick({ destination: "/stories", nav_location: "header" })}
          >
            Stories
          </NavLink>
          <NavLink
            to="/about"
            className={linkClass}
            onClick={() => trackNavigationClick({ destination: "/about", nav_location: "header" })}
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
