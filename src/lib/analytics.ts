/**
 * Data Dive analytics for Science is How (GA4 property properties/554574468).
 *
 * gtag.js is loaded in index.html with `send_page_view: false`; this module
 * sends page views on client-side route changes plus the Data Dive event
 * vocabulary (Tier 1 universal events + Tier 2 story events).
 */

export const GA_MEASUREMENT_ID = "G-KXW7GNNK3B";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function trackEvent(eventName: string, params?: EventParams): void {
  gtag("event", eventName, params);
}

/** SPA page view. Call after the document title has been updated for the route. */
export function trackPageView(path: string, title: string): void {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

// ---------------------------------------------------------------------------
// Tier 1 — Universal Data Dive events
// ---------------------------------------------------------------------------

export function trackCTAClick(params: {
  cta_text: string;
  cta_location: string;
  cta_destination?: string;
}): void {
  trackEvent("cta_click", params);
}

export function trackNavigationClick(params: {
  destination: string;
  nav_location: "header" | "footer" | "sidebar" | "inline";
}): void {
  trackEvent("navigation_click", params);
}

export function trackOutboundClick(params: {
  url: string;
  link_text?: string;
  link_location?: string;
}): void {
  trackEvent("outbound_click", params);
}

export function trackShareClick(params: {
  method: string;
  content_type?: string;
  content_id?: string;
}): void {
  trackEvent("share_click", params);
}

export function trackContentEngagement(params: {
  content_type: string;
  content_id?: string;
  engagement_type: "scroll_depth" | "time_on_content" | "interaction";
  value?: number;
}): void {
  trackEvent("content_engagement", params);
}

export function trackError(params: {
  error_type: string;
  error_message: string;
  error_location?: string;
}): void {
  trackEvent("error_encountered", params);
}

// ---------------------------------------------------------------------------
// Tier 2 — Story events (the funnel that matters for this site)
// ---------------------------------------------------------------------------

/** Someone opened a story's intro page. */
export function trackStoryStart(params: { story: string; category: string }): void {
  trackEvent("story_start", params);
}

/** A numbered step was viewed. `progress` is 0-1 so drop-off is comparable across stories. */
export function trackStepView(params: {
  story: string;
  step: number;
  step_title: string;
  total_steps: number;
}): void {
  trackEvent("step_view", {
    ...params,
    progress: Math.round((params.step / params.total_steps) * 100) / 100,
  });
}

/** The last step of a story was reached. */
export function trackStoryComplete(params: { story: string; total_steps: number }): void {
  trackEvent("story_complete", params);
}

/** A reader played with an interactive widget inside a step. */
export function trackInteraction(params: {
  story: string;
  widget: string;
  action: string;
  value?: number | string;
}): void {
  trackEvent("story_interaction", params);
  trackContentEngagement({
    content_type: "story",
    content_id: params.story,
    engagement_type: "interaction",
  });
}
