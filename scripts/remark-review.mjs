import { visit } from 'unist-util-visit';
import path from 'node:path';
import { base } from './site-config.mjs';

// Rewrite Markdown links only in the render tree; never change the source docs.
export default function reviewMarkdown() {
  return (tree, file) => {
    const normalized = file.path.replaceAll('\\', '/');
    const relative = normalized.split('/src/content/docs/')[1];
    if (!relative) return;
    visit(tree, (node) => {
      if ((node.type === 'link' || node.type === 'definition') && node.url) {
        const match = node.url.match(/^([^:#?]+\.md)([?#].*)?$/);
        if (!match) return;
        const target = path.posix.normalize(path.posix.join(path.posix.dirname(relative), match[1]));
        if (target.startsWith('../')) throw new Error(`Link outside published documents: ${node.url}`);
        const route = target === 'index.md' ? '' : target.replace(/\.md$/, '') + '/';
        node.url = `${base}/${route}${match[2] ?? ''}`;
      }
      if (node.type === 'code' && node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<pre class="mermaid"><code>${node.value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</code></pre>`;
      }
    });
  };
}
