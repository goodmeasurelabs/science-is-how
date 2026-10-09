import {readFile,readdir} from 'node:fs/promises';
import {canonical,sitemap,validateSocialImage} from '../vendor/gml-seo.mjs';
const urls=[];
async function inspect(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+e.name;if(e.isDirectory()){await inspect(path);continue;}if(!e.name.endsWith('.html')||e.name==='404.html')continue;const html=await readFile(path,'utf8');
const tag=(key)=>{const matches=[...html.matchAll(new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`,'g'))];if(matches.length!==1)throw Error(path+': missing/duplicate '+key);return matches[0][1];};
const links=[...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)];if(links.length!==1)throw Error('Canonical count');const url=canonical(links[0][1]);urls.push(url);
if((html.match(/<title>/g)||[]).length!==1||!html.includes('<h1>'))throw Error('Missing static title/H1');
const image={url:tag('og:image'),alt:tag('og:image:alt'),width:Number(tag('og:image:width')),height:Number(tag('og:image:height')),type:tag('og:image:type')};if(!image.alt||tag('twitter:image')!==image.url||tag('twitter:image:alt')!==image.alt||tag('twitter:card')!=='summary_large_image')throw Error('Inconsistent card');
validateSocialImage(await readFile('dist'+new URL(image.url).pathname),image);
for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g))JSON.parse(match[1]);
}}
await inspect('dist');sitemap(urls);
const xml=await readFile('dist/sitemap.xml','utf8');const locations=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);if(JSON.stringify(locations.sort())!==JSON.stringify(urls.sort()))throw Error('Sitemap differs from canonical pages');console.log('Validated '+urls.length+' prerendered pages, image bytes, JSON-LD and sitemap parity');
