import { Fade } from "react-awesome-reveal";
import Button from "../components/Button";
import StoryCard from "../components/StoryCard";
import { stories } from "../content/stories";
import { trackCTAClick } from "../lib/analytics";
import Rocket from "../assets/house-rocket.webp";
import MonkeyScope from "../assets/monkey-scope.webp";

export default function Home() {
  const featured = stories.slice(0, 6);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <section className="flex flex-col items-center gap-8 py-12 text-center md:py-20">
        <Fade duration={1200} triggerOnce>
          <h1 className="text-5xl md:text-7xl">
            Science is How<span className="text-accent">?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted md:text-xl">
            Interactive stories from the history of science and math. Famous paradoxes, thought
            experiments and theorems, explained one playful step at a time.
          </p>
        </Fade>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-12">
          <Fade duration={1600} triggerOnce>
            <img src={Rocket} alt="A cartoon rocket taking off" className="w-56 md:w-80" width={1024} height={1024} />
          </Fade>
          <Fade duration={2000} triggerOnce>
            <img src={MonkeyScope} alt="A cartoon monkey peering into a microscope" className="w-56 md:w-80" width={1024} height={1024} />
          </Fade>
        </div>
        <Fade duration={2200} triggerOnce>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              to={`/${stories[0].slug}`}
              variant="primary"
              size="lg"
              icon
              onClick={() =>
                trackCTAClick({ cta_text: "Start with " + stories[0].title, cta_location: "hero", cta_destination: `/${stories[0].slug}` })
              }
            >
              Start with {stories[0].title}
            </Button>
            <Button to="/stories" size="lg" onClick={() => trackCTAClick({ cta_text: "Browse all stories", cta_location: "hero", cta_destination: "/stories" })}>
              Browse all {stories.length} stories
            </Button>
          </div>
        </Fade>
      </section>

      <section className="py-8 md:py-12" aria-labelledby="stories-heading">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="stories-heading">Stories</h2>
          <Button to="/stories" variant="ghost" size="sm">
            See all →
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StoryCard key={s.slug} story={s} location="home_grid" />
          ))}
        </div>
      </section>

      <section className="my-12 rounded-3xl bg-surface-2 p-8 text-center shadow-card md:my-20 md:p-12">
        <h2>Why stories?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Every idea here was once a person, a problem, and a moment where things got weird. A cat that
          is both alive and dead. A barber who can't shave himself. We keep the person and the moment,
          and let you poke at the idea until it clicks.
        </p>
      </section>
    </main>
  );
}
