/**
 * Renders social preview images (1200x630) into public/og/<slug>.jpg plus the
 * site-wide public/og-image.jpg. Run locally (not on the Netlify build):
 *
 *   PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core \
 *   CHROME="/path/to/Chrome for Testing" npm run og
 *
 * Any Chromium works. Commit the PNGs; the prerender script links them.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const corePath = process.env.PLAYWRIGHT_CORE ?? "playwright-core";
const { chromium } = await import(corePath.startsWith("/") ? pathToFileURL(join(corePath, "index.mjs")).href : corePath);
const executablePath = process.env.CHROME;

const conceptsDir = "src/concepts";
const stories = readdirSync(conceptsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(conceptsDir, d.name, "meta.json")))
  .flatMap((d) => {
    try {
      return [JSON.parse(readFileSync(join(conceptsDir, d.name, "meta.json"), "utf8"))];
    } catch (e) {
      console.warn(`skipping ${d.name}: ${e.message}`);
      return [];
    }
  });

function coverDataUri(file) {
  const p = join("src/assets", file);
  const buf = readFileSync(p);
  const mime = file.endsWith(".svg") ? "image/svg+xml" : file.endsWith(".webp") ? "image/webp" : "image/png";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const font = `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&display=swap" rel="stylesheet" />`;
const page = (title, subtitle, cover, kicker) => `<!doctype html><html><head><meta charset="utf-8">${font}
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  body{font-family:Nunito,system-ui,sans-serif;background:#fffaf5;color:#2b2033;display:flex;align-items:center;justify-content:space-between;padding:0 72px;box-sizing:border-box;
       background-image:radial-gradient(circle at 85% 20%, rgba(96,194,232,.18), transparent 40%), radial-gradient(circle at 10% 90%, rgba(255,122,89,.16), transparent 45%)}
  .text{max-width:660px}
  .kicker{font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#ff7a59;font-size:24px;margin-bottom:18px}
  h1{font-size:${title.length > 26 ? 64 : 76}px;line-height:1.05;margin:0 0 22px;font-weight:900;letter-spacing:-.02em}
  p{font-size:30px;line-height:1.35;margin:0;color:#6e6478;font-weight:800}
  .brand{position:absolute;left:72px;bottom:44px;font-weight:900;font-size:28px}
  .brand span{color:#ff7a59}
  .cover{width:400px;height:400px;display:flex;align-items:center;justify-content:center}
  .cover img{max-width:100%;max-height:100%;filter:drop-shadow(0 20px 30px rgba(43,32,51,.18))}
</style></head><body>
  <div class="text"><div class="kicker">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>
  <div class="cover"><img src="${cover}"></div>
  <div class="brand">Science is How<span>?</span></div>
</body></html>`;

const browser = await chromium.launch({ executablePath });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const tab = await ctx.newPage();

async function shoot(html, out) {
  await tab.setContent(html, { waitUntil: "networkidle" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: out, type: "jpeg", quality: 88 });
  console.log("wrote", out);
}

await shoot(
  page(
    "Science is How?",
    "Interactive stories from the history of science and math.",
    coverDataUri("house-rocket.webp"),
    "Paradoxes · thought experiments · theorems",
  ),
  "public/og-image.jpg",
);
for (const s of stories) {
  await shoot(page(s.title, s.tagline, coverDataUri(s.cover), `${s.category} · ${s.year}`), `public/og/${s.slug}.jpg`);
}
await browser.close();
