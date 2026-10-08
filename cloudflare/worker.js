const routes = new Set(["/", "/stories", "/about", "/russells-paradox", "/russells-paradox/1", "/russells-paradox/2", "/russells-paradox/3", "/russells-paradox/4", "/russells-paradox/5", "/schrodingers-cat", "/schrodingers-cat/1", "/schrodingers-cat/2", "/schrodingers-cat/3", "/schrodingers-cat/4", "/schrodingers-cat/5", "/monty-hall", "/monty-hall/1", "/monty-hall/2", "/monty-hall/3", "/monty-hall/4", "/monty-hall/5", "/monty-hall/6", "/hilberts-hotel", "/hilberts-hotel/1", "/hilberts-hotel/2", "/hilberts-hotel/3", "/hilberts-hotel/4", "/hilberts-hotel/5", "/hilberts-hotel/6", "/birthday-paradox", "/birthday-paradox/1", "/birthday-paradox/2", "/birthday-paradox/3", "/birthday-paradox/4", "/birthday-paradox/5", "/birthday-paradox/6", "/galileo-falling-bodies", "/galileo-falling-bodies/1", "/galileo-falling-bodies/2", "/galileo-falling-bodies/3", "/galileo-falling-bodies/4", "/galileo-falling-bodies/5", "/galileo-falling-bodies/6", "/eratosthenes", "/eratosthenes/1", "/eratosthenes/2", "/eratosthenes/3", "/eratosthenes/4", "/eratosthenes/5", "/eratosthenes/6", "/mendels-peas", "/mendels-peas/1", "/mendels-peas/2", "/mendels-peas/3", "/mendels-peas/4", "/mendels-peas/5", "/mendels-peas/6", "/konigsberg-bridges", "/konigsberg-bridges/1", "/konigsberg-bridges/2", "/konigsberg-bridges/3", "/konigsberg-bridges/4", "/konigsberg-bridges/5", "/konigsberg-bridges/6", "/game-of-life", "/game-of-life/1", "/game-of-life/2", "/game-of-life/3", "/game-of-life/4", "/game-of-life/5", "/game-of-life/6"]);
const files = new Set(["/eratosthenes.html", "/index.html", "/about.html", "/birthday-paradox.html", "/mendels-peas.html", "/konigsberg-bridges.html", "/galileo-falling-bodies.html", "/og-image.jpg", "/russells-paradox.html", "/schrodingers-cat.html", "/favicon.png", "/stories.html", "/game-of-life.html", "/sitemap.xml", "/robots.txt", "/hilberts-hotel.html", "/monty-hall.html", "/birthday-paradox/5.html", "/birthday-paradox/4.html", "/birthday-paradox/3.html", "/birthday-paradox/2.html", "/birthday-paradox/1.html", "/birthday-paradox/6.html", "/schrodingers-cat/5.html", "/schrodingers-cat/4.html", "/schrodingers-cat/3.html", "/schrodingers-cat/2.html", "/schrodingers-cat/1.html", "/eratosthenes/5.html", "/eratosthenes/4.html", "/eratosthenes/3.html", "/eratosthenes/2.html", "/eratosthenes/1.html", "/eratosthenes/6.html", "/galileo-falling-bodies/5.html", "/galileo-falling-bodies/4.html", "/galileo-falling-bodies/3.html", "/galileo-falling-bodies/2.html", "/galileo-falling-bodies/1.html", "/galileo-falling-bodies/6.html", "/hilberts-hotel/5.html", "/hilberts-hotel/4.html", "/hilberts-hotel/3.html", "/hilberts-hotel/2.html", "/hilberts-hotel/1.html", "/hilberts-hotel/6.html", "/mendels-peas/5.html", "/mendels-peas/4.html", "/mendels-peas/3.html", "/mendels-peas/2.html", "/mendels-peas/1.html", "/mendels-peas/6.html", "/konigsberg-bridges/5.html", "/konigsberg-bridges/4.html", "/konigsberg-bridges/3.html", "/konigsberg-bridges/2.html", "/konigsberg-bridges/1.html", "/konigsberg-bridges/6.html", "/game-of-life/5.html", "/game-of-life/4.html", "/game-of-life/3.html", "/game-of-life/2.html", "/game-of-life/1.html", "/game-of-life/6.html", "/og/schrodingers-cat.jpg", "/og/konigsberg-bridges.jpg", "/og/eratosthenes.jpg", "/og/galileo-falling-bodies.jpg", "/og/russells-paradox.jpg", "/og/monty-hall.jpg", "/og/mendels-peas.jpg", "/og/game-of-life.jpg", "/og/birthday-paradox.jpg", "/og/hilberts-hotel.jpg", "/assets/dog-1-CbJIXUzQ.webp", "/assets/box-closed-rXZJO8X5.webp", "/assets/schrodingers-cat-experiment-CjUGh4V0.webp", "/assets/monkey-scope-dfJd33TO.webp", "/assets/index-K2R09vQT.css", "/assets/party-cat-CJeoVdjx.webp", "/assets/dog-2-CK3zSx3-.webp", "/assets/charles-bertrand-avHBoj_3.webp", "/assets/qbit-BvUmsc22.webp", "/assets/zombie-cat-Dwnha5ZW.webp", "/assets/house-rocket-LC1G_OJ6.webp", "/assets/kitty-2-DZDN1oW1.webp", "/assets/einstein-DVcf-uRZ.webp", "/assets/spooky-action-CISjiyDi.webp", "/assets/schrodinger-DkluN9GE.webp", "/assets/dead-cat-C4YIuGB0.webp", "/assets/kitty-1-BaYsqwNb.webp", "/assets/kitty-3-Djf6rm26.webp", "/assets/box-open-rFhuwguu.webp", "/assets/dog-3-72A5o3d-.webp", "/assets/atom-logo-CCGSDZbz.png", "/assets/cat-in-box-WUrmsDaM.webp", "/assets/index-BIAeJKBq.js", "/monty-hall/5.html", "/monty-hall/4.html", "/monty-hall/3.html", "/monty-hall/2.html", "/monty-hall/1.html", "/monty-hall/6.html", "/russells-paradox/5.html", "/russells-paradox/4.html", "/russells-paradox/3.html", "/russells-paradox/2.html", "/russells-paradox/1.html"]);
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const preview = url.hostname.endsWith('.pages.dev');
    const wrap = (response) => {
      const headers = new Headers(response.headers);
      if (preview) headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    };
    if (url.hostname === 'www.scienceishow.com') {
      url.hostname = 'scienceishow.com';
      return wrap(Response.redirect(url.toString(), 301));
    }
    if (url.pathname === '/russels-paradox' || url.pathname.startsWith('/russels-paradox/')) {
      url.pathname = url.pathname.replace('/russels-paradox', '/russells-paradox');
      return wrap(Response.redirect(url.toString(), 301));
    }
    if (preview && url.pathname === '/robots.txt') {
      return wrap(new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }));
    }
    const clean = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
    if (routes.has(clean)) {
      url.pathname = clean;
      return wrap(await env.ASSETS.fetch(new Request(url, request)));
    }
    if (files.has(url.pathname)) return wrap(await env.ASSETS.fetch(request));
    const fallback = new URL('/', url);
    const home = await env.ASSETS.fetch(new Request(fallback, request));
    return wrap(new Response(home.body, { status: 404, headers: home.headers }));
  }
};
