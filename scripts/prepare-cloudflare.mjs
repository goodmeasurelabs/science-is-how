import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
const root = 'dist';
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]));
  return files.flat();
}
const files = (await walk(root)).map(file => '/' + relative(root, file).split('\\').join('/')).filter(file => file !== '/_worker.js').sort();
const routes = files.filter(file => file.endsWith('.html') && file !== '/404.html').map(file => file === '/index.html' ? '/' : file.replace(/\.html$/, '')).sort();
let worker = await readFile('cloudflare/worker.js', 'utf8');
worker = worker.replace(/^const routes = .*;$/m, 'const routes = new Set(' + JSON.stringify(routes) + ');');
worker = worker.replace(/^const files = .*;$/m, 'const files = new Set(' + JSON.stringify(files) + ');');
await writeFile(join(root, '_worker.js'), worker);
console.log('Prepared Cloudflare routing for ' + routes.length + ' HTML routes and ' + files.length + ' files.');
