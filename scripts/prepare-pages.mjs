import { mkdir, readFile, writeFile, readdir, lstat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';
import { repository, sections } from './site-config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'src/content/docs');
export async function prepare() {
  const existing = await lstat(output).catch(() => null);
  if (existing?.isSymbolicLink()) throw new Error('Generated content must not be a symlink');
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  const manifest = [];

  async function stage(source, relative, order) {
    const raw = await readFile(path.join(root, source), 'utf8');
    const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    const metadata = frontmatter ? parse(frontmatter[1]) : {};
    let body = frontmatter ? raw.slice(frontmatter[0].length) : raw;
    const heading = body.match(/^# (.+)$/m);
    if (!heading || (source.startsWith('docs/') && !metadata.id)) {
      throw new Error(`Missing title or ID: ${source}`);
    }
    // Starlight renders the title. Only the generated copy drops the duplicate H1.
    body = body.replace(heading[0], '');
    const slug = relative === 'index.md' ? '' : relative.replace(/\.md$/, '');
    const data = {
      title: heading[1], slug,
      legacyTitle: heading[1].toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, '').trim().replace(/[-\s]+/g, '-'),
      editUrl: `${repository}/blob/main/${source}`,
      sidebar: { order },
      review: metadata.id ? {
        id: metadata.id, status: metadata.status, confidence: metadata.confidence,
        last_reviewed: String(metadata.last_reviewed), source,
      } : undefined,
    };
    const destination = path.join(output, relative);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, `---\n${stringify(data, { defaultStringType: 'QUOTE_DOUBLE' })}---\n${body}`);
    manifest.push({ source, relative, slug, id: metadata.id ?? null });
  }

  await stage('pages/index.md', 'index.md', 0);
  async function collect(directory) {
    if ((await lstat(directory)).isSymbolicLink()) throw new Error(`Symlink rejected: ${directory}`);
    const result = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlink rejected: ${target}`);
      if (entry.isDirectory()) result.push(...await collect(target));
      else if (entry.isFile() && entry.name.endsWith('.md')) result.push(target);
    }
    return result;
  }
  for (const [directory] of sections) {
    const files = await collect(path.join(root, 'docs', directory));
    const ordered = await Promise.all(files.map(async (file) => ({
      file, id: (await readFile(file, 'utf8')).match(/^id: (\S+)$/m)?.[1],
    })));
    ordered.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    for (const [order, { file }] of ordered.entries()) {
      await stage(path.relative(root, file), path.relative(path.join(root, 'docs'), file), order);
    }
  }
  await mkdir(path.join(root, '.generated'), { recursive: true });
  await writeFile(path.join(root, '.generated/pages.json'), JSON.stringify(manifest, null, 2));
  console.log(`Prepared ${manifest.length - 1} general knowledge documents and homepage.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await prepare();
