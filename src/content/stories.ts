import type { Story, StoryContent, StoryMeta } from "./types";

/**
 * Every story lives in src/concepts/<slug>/ with a meta.json (metadata the
 * build script can read without React) and an index.tsx (Intro + steps).
 */
const metaModules = import.meta.glob<StoryMeta>("../concepts/*/meta.json", {
  eager: true,
  import: "default",
});

const contentModules = import.meta.glob<{ default: StoryContent }>(
  "../concepts/*/index.tsx",
  { eager: true },
);

const coverModules = import.meta.glob<string>("../assets/*.{png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

function findContent(slug: string): StoryContent {
  const key = Object.keys(contentModules).find((k) =>
    k.endsWith(`/concepts/${slug}/index.tsx`),
  );
  if (!key) throw new Error(`No concept folder found for story "${slug}"`);
  return contentModules[key].default;
}

function findCover(file: string): string {
  const key = Object.keys(coverModules).find((k) => k.endsWith(`/assets/${file}`));
  if (!key) throw new Error(`Cover image "${file}" not found in src/assets`);
  return coverModules[key];
}

function resolve(meta: StoryMeta): Story {
  const content = findContent(meta.slug);
  if (content.steps.length !== meta.steps.length) {
    throw new Error(
      `Story "${meta.slug}" declares ${meta.steps.length} step titles in stories.json but exports ${content.steps.length} step components`,
    );
  }
  const { steps, cover, ...rest } = meta;
  return {
    ...rest,
    coverUrl: findCover(cover),
    Intro: content.Intro,
    steps: steps.map((title, i) => ({ title, Component: content.steps[i] })),
  };
}

export const stories: Story[] = Object.values(metaModules)
  .slice()
  .sort((a, b) => a.order - b.order)
  .flatMap((meta) => {
    try {
      return [resolve(meta)];
    } catch (err) {
      // A half-written story shouldn't take the whole site down.
      console.error(err);
      return [];
    }
  });

export const storiesBySlug: Record<string, Story> = Object.fromEntries(
  stories.map((s) => [s.slug, s]),
);

export function getStory(slug: string | undefined): Story | undefined {
  return slug ? storiesBySlug[slug] : undefined;
}

/** The story to suggest after finishing `slug` (next in the list, wrapping around). */
export function nextStory(slug: string): Story {
  const i = stories.findIndex((s) => s.slug === slug);
  return stories[(i + 1) % stories.length];
}

export const categories = Array.from(new Set(stories.map((s) => s.category)));
