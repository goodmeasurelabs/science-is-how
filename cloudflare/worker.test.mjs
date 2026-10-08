import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
const source = await readFile(new URL('./worker.js', import.meta.url), 'utf8');
const worker = (await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'))).default;
const env = { ASSETS: { fetch: async () => new Response('asset', { status: 200 }) } };
test('preview is excluded from search and robots', async () => {
 const response = await worker.fetch(new Request('https://example.pages.dev/'), env);
 assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
 const robots = await worker.fetch(new Request('https://example.pages.dev/robots.txt'), env);
 assert.equal(await robots.text(), 'User-agent: *\nDisallow: /\n');
});
test('www redirects preserve path and query', async () => {
 const response = await worker.fetch(new Request('https://www.scienceishow.com/?source=test'), env);
 assert.equal(response.status, 301);
 assert.equal(response.headers.get('location'), 'https://scienceishow.com/?source=test');
});
test('known story routes work and unknown routes return 404', async () => {
 assert.equal((await worker.fetch(new Request('https://scienceishow.com/monty-hall/1'), env)).status, 200);
 assert.equal((await worker.fetch(new Request('https://scienceishow.com/missing-migration-test'), env)).status, 404);
 const legacy = await worker.fetch(new Request('https://scienceishow.com/russels-paradox/1'), env);
 assert.equal(legacy.status, 301);
 assert.equal(legacy.headers.get('location'), 'https://scienceishow.com/russells-paradox/1');
});
