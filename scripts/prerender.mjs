/**
 * Post-build SEO pass for the SPA.
 *
 * For every route (home, /stories, /about, each story intro and step) this writes
 * dist/<route>/index.html: a copy of the built index.html with route-specific
 * <title>, description, canonical, Open Graph / Twitter tags, JSON-LD, and a
 * crawlable HTML snapshot inside #root that React replaces on mount.
 * Also emits sitemap.xml and robots.txt. Runs in plain Node, no browser needed.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const SITE_URL = "https://scienceishow.com";
const SITE_NAME = "Science is How?";
const DEFAULT_DESCRIPTION =
  "Interactive stories from the history of science and math. Paradoxes, thought experiments and famous theorems, explained one playful step at a time.";
const dist = "dist";
const template = readFileSync(join(dist, "index.html"), "utf8");

// ---------------------------------------------------------------------------
// Load story metadata straight from the concept folders.
// ---------------------------------------------------------------------------
const conceptsDir = "src/concepts";
const stories = readdirSync(conceptsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(conceptsDir, d.name, "meta.json")))
  .map((d) => JSON.parse(readFileSync(join(conceptsDir, d.name, "meta.json"), "utf8")))
  .sort((a, b) => a.order - b.order);

function lastModified(pathInRepo) {
  try {
    return execSync(`git log -1 --format=%cI -- ${pathInRepo}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim() || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------------------------------------------------------------------------
// Page rendering
// ---------------------------------------------------------------------------
function render({ path, title, description, type = "website", jsonLd = [], body = "", image }) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const img = image ?? `${SITE_URL}/og-image.jpg`;
  let html = template;
  const replaceMeta = (re, val) => {
    if (!re.test(html)) throw new Error(`Template missing ${re}`);
    html = html.replace(re, val);
  };
  replaceMeta(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`);
  replaceMeta(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`);
  replaceMeta(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  replaceMeta(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${type}" />`);
  replaceMeta(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(fullTitle)}" />`);
  replaceMeta(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`);
  replaceMeta(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  replaceMeta(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${img}" />`);
  replaceMeta(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(fullTitle)}" />`);
  replaceMeta(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  replaceMeta(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${img}" />`);
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n    ");
  html = html.replace("<!--PRERENDER_HEAD-->", ld);
  html = html.replace("<!--PRERENDER_BODY-->", body);
  return html;
}

function write(path, html) {
  const dir = path === "/" ? dist : join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL + "/",
  description: DEFAULT_DESCRIPTION,
  publisher: { "@type": "Person", name: "Sean Tarzy" },
};

const storyList = (heading) =>
  `<section class="story-prose"><h2>${esc(heading)}</h2><ul>${stories
    .map((s) => `<li><a href="/${s.slug}">${esc(s.title)}</a> (${esc(s.category)}, ${esc(s.year)}): ${esc(s.tagline)}</li>`)
    .join("")}</ul></section>`;

const routes = [];

// Home
routes.push({ path: "/", priority: "1.0", lastmod: lastModified("src/pages/Home.tsx") });
write(
  "/",
  render({
    path: "/",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    jsonLd: [
      website,
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Stories",
        itemListElement: stories.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/${s.slug}`,
          name: s.title,
        })),
      },
    ],
    body: `<main class="story-prose"><h1>${SITE_NAME}</h1><p>${esc(DEFAULT_DESCRIPTION)}</p></main>${storyList("Stories")}`,
  }),
);

// Stories index + About
routes.push({ path: "/stories", priority: "0.9", lastmod: lastModified("src/pages/Stories.tsx") });
write(
  "/stories",
  render({
    path: "/stories",
    title: "All stories",
    description: `Browse every interactive science and math story on ${SITE_NAME}: ${stories.map((s) => s.title).join(", ")}.`,
    body: `<main class="story-prose"><h1>All stories</h1></main>${storyList("Stories")}`,
  }),
);
routes.push({ path: "/about", priority: "0.5", lastmod: lastModified("src/pages/About.tsx") });
write(
  "/about",
  render({
    path: "/about",
    title: "About",
    description: `What ${SITE_NAME} is, who makes it, and why every idea gets a story.`,
    body: `<main class="story-prose"><h1>About ${SITE_NAME}</h1><p>${esc(DEFAULT_DESCRIPTION)}</p></main>`,
  }),
);

// Stories
for (const s of stories) {
  const lastmod = lastModified(`src/concepts/${s.slug}`);
  const image = existsSync(join("public", "og", `${s.slug}.jpg`)) ? `${SITE_URL}/og/${s.slug}.jpg` : undefined;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: s.title,
    description: s.description,
    about: s.people.map((name) => ({ "@type": "Person", name })),
    keywords: [s.category, ...s.keywords].join(", "),
    url: `${SITE_URL}/${s.slug}`,
    image,
    dateModified: lastmod,
    author: { "@type": "Person", name: "Sean Tarzy" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    learningResourceType: "interactive story",
    timeRequired: `PT${s.minutes}M`,
  };
  const stepLinks = `<ol>${s.steps
    .map((t, i) => `<li><a href="/${s.slug}/${i + 1}">${esc(t)}</a></li>`)
    .join("")}</ol>`;
  routes.push({ path: `/${s.slug}`, priority: "0.9", lastmod });
  write(
    `/${s.slug}`,
    render({
      path: `/${s.slug}`,
      title: s.title,
      description: s.description,
      type: "article",
      image,
      jsonLd: [article],
      body: `<main class="story-prose"><h1>${esc(s.title)}</h1><p>${esc(s.tagline)}</p><p>${esc(s.description)}</p><h2>Steps</h2>${stepLinks}</main>`,
    }),
  );
  s.steps.forEach((stepTitle, i) => {
    const n = i + 1;
    const path = `/${s.slug}/${n}`;
    routes.push({ path, priority: "0.6", lastmod });
    write(
      path,
      render({
        path,
        title: `${s.title}: ${stepTitle}`,
        description: `Step ${n} of ${s.steps.length} in ${s.title}: ${stepTitle}. ${s.description}`,
        type: "article",
        image,
        jsonLd: [
          article,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Stories", item: `${SITE_URL}/stories` },
              { "@type": "ListItem", position: 2, name: s.title, item: `${SITE_URL}/${s.slug}` },
              { "@type": "ListItem", position: 3, name: stepTitle, item: `${SITE_URL}${path}` },
            ],
          },
        ],
        body: `<main class="story-prose"><h1>${esc(s.title)}</h1><h2>Step ${n}: ${esc(stepTitle)}</h2><p>${esc(s.description)}</p>${stepLinks}</main>`,
      }),
    );
  });
}

// Sitemap + robots
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${r.lastmod.slice(0, 10)}</lastmod><priority>${r.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerender: wrote ${routes.length} pages for ${stories.length} stories + sitemap.xml + robots.txt`);
