import type { ComponentType } from "react";

/** Broad shelf a story sits on. Used for home-page filtering and SEO. */
export type StoryCategory =
  | "Mathematics"
  | "Logic"
  | "Probability"
  | "Physics"
  | "Astronomy"
  | "Biology"
  | "Computer Science";

/** Metadata that lives in stories.json so the build (prerender, sitemap) can read it without React. */
export interface StoryMeta {
  /** Sort key for listings. Lower comes first. Use multiples of 10. */
  order: number;
  /** URL slug, e.g. "monty-hall". Also the folder name under src/concepts. */
  slug: string;
  /** Display title, e.g. "The Monty Hall Problem". */
  title: string;
  /** One punchy line shown on cards. */
  tagline: string;
  /** ~150 char SEO description. Also the intro paragraph for crawlers. */
  description: string;
  category: StoryCategory;
  /** Human readable date/era, e.g. "1901" or "c. 240 BC". */
  year: string;
  /** People the story is about. */
  people: string[];
  /** Extra search keywords. */
  keywords: string[];
  /** File name of the cover illustration inside src/assets (e.g. "cat-in-box.png"). */
  cover: string;
  coverAlt: string;
  /** Titles of numbered steps, in order. Step 1 is /slug/1. The intro page is /slug. */
  steps: string[];
  /** Approximate reading time in minutes. */
  minutes: number;
}

export interface StoryStep {
  title: string;
  Component: ComponentType;
}

/** What each concept folder exports: the intro screen plus its steps. */
export interface StoryContent {
  Intro: ComponentType;
  steps: ComponentType[];
}

/** Fully resolved story used by the app at runtime. */
export interface Story extends Omit<StoryMeta, "steps" | "cover"> {
  coverUrl: string;
  Intro: ComponentType;
  steps: StoryStep[];
}
