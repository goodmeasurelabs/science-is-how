import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import DataDiveFeedback from "./components/DataDiveFeedback";
import StoryLayout from "./concepts/shared/StoryLayout";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { getStory } from "./content/stories";
import { applySeo, DEFAULT_DESCRIPTION, SITE_NAME } from "./lib/seo";
import { trackPageView } from "./lib/analytics";

/** Keeps <head> metadata and GA page views in sync with the router. */
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [, slug, stepStr] = pathname.split("/");
    const story = getStory(slug);
    let title = SITE_NAME;
    let description = DEFAULT_DESCRIPTION;
    let path = pathname;
    let type: "website" | "article" = "website";
    if (story) {
      const step = stepStr ? parseInt(stepStr, 10) : 0;
      const stepTitle = step > 0 ? story.steps[step - 1]?.title : undefined;
      title = stepTitle ? `${story.title}: ${stepTitle}` : story.title;
      description = story.description;
      type = "article";
      path = step > 0 ? `/${story.slug}/${step}` : `/${story.slug}`;
    } else if (pathname === "/stories") {
      title = "All stories";
      description = "Browse every interactive science and math story on Science is How?";
    } else if (pathname === "/about") {
      title = "About";
      description = "What Science is How? is, who makes it, and why every idea gets a story.";
    } else if (pathname !== "/") {
      title = "Page not found";
    }
    const fullTitle = applySeo({ title, description, path, type });
    trackPageView(path, fullTitle);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteEffects />
      <SiteHeader />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/:slug" element={<StoryLayout />} />
          <Route path="/:slug/:step" element={<StoryLayout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <SiteFooter />
      <DataDiveFeedback siteSlug="science-is-how" accentColor="#ff7a59" initiallyMinimized />
    </BrowserRouter>
  );
}
