import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import { base } from './site-config.mjs';

const root = path.resolve('dist');
const manifest = JSON.parse(await readFile('.generated/pages.json', 'utf8'));
const expected = new Set(['index.html', '404.html']);
for (const { slug } of manifest) if (slug) {
  expected.add(`${slug}/index.html`);
  expected.add(`${slug}.html`);
}
async function walk(dir) {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...await walk(file));
    else result.push(file);
  }
  return result;
}
const files = await walk(root);
const pages = new Map();
for (const file of files.filter((p) => p.endsWith('.html'))) {
  const relative = path.relative(root, file);
  if (!expected.has(relative)) throw new Error(`Unexpected published page: ${relative}`);
  const ids = new Set();
  const links = [];
  function visit(node) {
    const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
    if (attrs.id) ids.add(attrs.id);
    if (node.tagName === 'a' && attrs.name) ids.add(attrs.name);
    if (['a', 'link'].includes(node.tagName) && attrs.href) links.push(attrs.href);
    if (['script', 'img'].includes(node.tagName) && attrs.src) links.push(attrs.src);
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(parse(await readFile(file, 'utf8')));
  pages.set(file, { ids, links });
}
for (const file of expected) if (!pages.has(path.join(root, file))) throw new Error(`Missing page: ${file}`);
let count = 0;
const errors = [];
for (const [file, page] of pages) for (const href of page.links) {
  if (href === '#' || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
  const pagePath = path.relative(root, file).replace(/index\.html$/, '');
  const url = new URL(href, `https://review.invalid${base}/${pagePath}`);
  if (!url.pathname.startsWith(`${base}/`)) {
    errors.push(`${pagePath}: outside base URL: ${href}`); continue;
  }
  let target = path.resolve(root, decodeURIComponent(url.pathname.slice(base.length + 1)));
  if (target !== root && !target.startsWith(root + path.sep)) throw new Error('Path escapes output');
  const info = await stat(target).catch(() => null);
  if (info?.isDirectory()) target = path.join(target, 'index.html');
  if (!files.includes(target)) errors.push(`${pagePath}: missing ${href}`);
  else if (url.hash && pages.has(target) && !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) {
    errors.push(`${pagePath}: missing anchor ${href}`);
  }
  count++;
}
if (!files.some((file) => file.endsWith('/pagefind/pagefind.js'))) errors.push('Pagefind search bundle missing');
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Validated ${pages.size} HTML pages, ${count} local references, legacy URLs and published page allowlist.`);
