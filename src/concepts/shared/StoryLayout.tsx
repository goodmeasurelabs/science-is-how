import { useEffect, useMemo } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import Button from "../../components/Button";
import StoryCard from "../../components/StoryCard";
import { getStory, nextStory } from "../../content/stories";
import {
  trackShareClick,
  trackStepView,
  trackStoryComplete,
  trackStoryStart,
} from "../../lib/analytics";

export const OUTLET_FADE_DURATION = 900;

/**
 * Wraps every story: title bar, progress, the current step, and prev/next
 * navigation. Step 0 is the intro (/slug); steps 1..N are /slug/N.
 */
export default function StoryLayout() {
  const { slug, step: stepParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const story = getStory(slug);

  const step = stepParam ? parseInt(stepParam, 10) : 0;
  const total = story?.steps.length ?? 0;
  const valid = story && Number.isInteger(step) && step >= 0 && step <= total;

  // Analytics: one event per step view, story_start on the intro, story_complete at the end.
  useEffect(() => {
    if (!valid || !story) return;
    if (step === 0) {
      trackStoryStart({ story: story.slug, category: story.category });
    } else {
      trackStepView({
        story: story.slug,
        step,
        step_title: story.steps[step - 1].title,
        total_steps: total,
      });
      if (step === total) trackStoryComplete({ story: story.slug, total_steps: total });
    }
  }, [valid, story, step, total]);

  // Keyboard navigation with ← → (ignored while typing in an input).
  useEffect(() => {
    if (!valid) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.metaKey || e.ctrlKey) return;
      if (e.key === "ArrowRight" && step < total) navigate(`/${slug}/${step + 1}`);
      if (e.key === "ArrowLeft" && step > 0) navigate(step === 1 ? `/${slug}` : `/${slug}/${step - 1}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [valid, slug, step, total, navigate]);

  const upNext = useMemo(() => (story ? nextStory(story.slug) : undefined), [story]);

  if (!story) return <Navigate to="/404" replace />;
  if (!valid) return <Navigate to={`/${story.slug}`} replace />;

  const Current = step === 0 ? story.Intro : story.steps[step - 1].Component;
  const stepTitle = step === 0 ? "Introduction" : story.steps[step - 1].title;
  const prevHref = step <= 1 ? `/${story.slug}` : `/${story.slug}/${step - 1}`;
  const nextHref = `/${story.slug}/${step + 1}`;
  const isLast = step === total;

  const share = async () => {
    const url = `https://scienceishow.com/${story.slug}`;
    const data = { title: `${story.title} | Science is How?`, text: story.tagline, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        trackShareClick({ method: "native_share", content_type: "story", content_id: story.slug });
      } else {
        await navigator.clipboard.writeText(url);
        trackShareClick({ method: "clipboard", content_type: "story", content_id: story.slug });
        alert("Link copied!");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <article className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 md:px-6">
      {/* Title bar */}
      <header className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted">
          <Link to="/stories" className="hover:text-accent">
            Stories
          </Link>
          <span aria-hidden> / </span>
          <span className="text-accent">{story.category}</span>
          <span aria-hidden> · </span>
          <span>{story.year}</span>
        </p>
        <h1 className="mt-1">
          <Link to={`/${story.slug}`} className="hover:text-accent">
            {story.title}
          </Link>
        </h1>
        {/* Progress */}
        <nav aria-label="Story progress" className="mx-auto mt-4 flex max-w-md items-center gap-1.5">
          {Array.from({ length: total + 1 }, (_, i) => (
            <Link
              key={i}
              to={i === 0 ? `/${story.slug}` : `/${story.slug}/${i}`}
              aria-label={i === 0 ? "Introduction" : `Step ${i}: ${story.steps[i - 1].title}`}
              aria-current={i === step ? "step" : undefined}
              title={i === 0 ? "Introduction" : story.steps[i - 1].title}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-line hover:bg-accent/40"
              }`}
            />
          ))}
        </nav>
        <p className="mt-2 text-sm text-muted">
          {step === 0 ? (
            <span className="font-semibold text-ink">Introduction</span>
          ) : (
            <>
              Step {step} of {total}
              <span aria-hidden> · </span>
              <span className="font-semibold text-ink">{stepTitle}</span>
            </>
          )}
        </p>
      </header>

      {/* Step content */}
      <div className="min-h-[50vh]">
        <Fade duration={OUTLET_FADE_DURATION} key={location.pathname} triggerOnce>
          <section>
            <Current />
          </section>
        </Fade>
      </div>

      {/* Prev / next */}
      <nav className="mt-12 flex items-center justify-between gap-4" aria-label="Step navigation">
        <div>
          {step > 0 ? (
            <Button to={prevHref} icon>
              Back
            </Button>
          ) : (
            <Button to="/stories" variant="ghost">
              ← All stories
            </Button>
          )}
        </div>
        <div>
          {!isLast ? (
            <Button to={nextHref} variant="primary" icon>
              {step === 0 ? "Start" : "Next"}
            </Button>
          ) : (
            <Button onClick={share} variant="primary">
              Share this story
            </Button>
          )}
        </div>
      </nav>

      {isLast && upNext && upNext.slug !== story.slug && (
        <aside className="mt-16 border-t border-line pt-10">
          <h2 className="mb-6 text-center">Up next</h2>
          <div className="mx-auto max-w-sm">
            <StoryCard story={upNext} location="story_end" />
          </div>
        </aside>
      )}
    </article>
  );
}
