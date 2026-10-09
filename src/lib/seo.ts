export const SITE_NAME = "Science is How?";
export const SITE_URL = "https://scienceishow.com";
export const DEFAULT_DESCRIPTION =
  "Interactive stories from the history of science and math. Paradoxes, thought experiments and famous theorems, explained one playful step at a time.";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    const isLink = selector.startsWith("link");
    el = document.createElement(isLink ? "link" : "meta");
    const [, key, val] = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/) ?? [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export interface PageSeo {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

/** Update the document head for the current route. Runs on client-side navigation. */
export function applySeo({ title, description = DEFAULT_DESCRIPTION, path, image, type = "website" }: PageSeo) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const img = image ?? `${SITE_URL}/social/card-v1.png`;
  document.title = fullTitle;
  setMeta('meta[name="description"]', "content", description);
  setMeta('link[rel="canonical"]', "href", url);
  setMeta('meta[property="og:title"]', "content", fullTitle);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:image"]', "content", img);
  setMeta('meta[property="og:image:secure_url"]', "content", img);
  setMeta('meta[property="og:image:type"]', "content", img.endsWith('.png')?'image/png':'image/jpeg');
  setMeta('meta[property="og:image:alt"]', "content", title+" — interactive science and math stories");
  setMeta('meta[name="twitter:image:alt"]', "content", title+" — interactive science and math stories");
  setMeta('meta[property="og:type"]', "content", type);
  setMeta('meta[name="twitter:title"]', "content", fullTitle);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('meta[name="twitter:image"]', "content", img);
  return fullTitle;
}
