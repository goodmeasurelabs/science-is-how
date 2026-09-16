import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to the top whenever the route changes (browsers keep scroll position in SPAs). */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}
