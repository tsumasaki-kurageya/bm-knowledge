import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { base } from './site-config.mjs';

const manifest = JSON.parse(await readFile('.generated/pages.json', 'utf8'));
for (const { slug } of manifest) {
  if (!slug) continue; // index.html is already the homepage.
  const target = `${base}/${slug}/`;
  const output = path.join('dist', `${slug}.html`);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<title>ページの移動</title><meta name="robots" content="noindex">
<link rel="canonical" href="${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
<noscript><meta http-equiv="refresh" content="0;url=${target}"></noscript>
</head><body><a href="${target}">ページを開く</a></body></html>`);
}
console.log(`Created ${manifest.length - 1} legacy .html redirects (query and fragment preserved).`);
