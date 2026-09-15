import { readFile, readdir } from 'node:fs/promises';

export const base = '/bm-knowledge';
export const repository = 'https://github.com/tsumasaki-kurageya/bm-knowledge';
export const sections = [
  ['00-business', '全体像'],
  ['01-domains', '業務の分類'],
  ['02-processes', '業務フロー'],
];

// Read labels and main-domain membership from the same Markdown the reader sees.
// Folder names and page URLs remain stable when navigation groups change.
export async function buildSidebar() {
  async function documents(directory) {
    const dir = new URL(`../docs/${directory}/`, import.meta.url);
    const files = (await readdir(dir)).filter((name) => name.endsWith('.md'));
    const docs = await Promise.all(files.map(async (name) => {
      const source = await readFile(new URL(name, dir), 'utf8');
      const id = source.match(/^id: (\S+)$/m)?.[1];
      const label = source.match(/^# (.+)$/m)?.[1];
      if (!id || !label) throw new Error(`Missing document ID/title: ${directory}/${name}`);
      return { id, label, source, slug: `${directory}/${name.slice(0, -3)}` };
    }));
    return docs.sort((a, b) => a.id.localeCompare(b.id));
  }
  const business = await documents('00-business');
  const domains = await documents('01-domains');
  const processes = await documents('02-processes');
  const item = ({ label, slug }) => ({ label, slug });
  const groups = domains.filter(({ id }) => id !== 'DOMAIN-000')
    .map((doc) => ({ id: doc.id, label: doc.label, collapsed: true, items: [] }));
  const indexes = processes.filter(({ id }) => ['PROCESS-001', 'PROCESS-024'].includes(id));
  for (const doc of processes.filter((doc) => !indexes.includes(doc))) {
    const memberships = [...doc.source.matchAll(/^- 主領域：\[(DOMAIN-\d+)：/gm)];
    const group = memberships.length === 1 && groups.find(({ id }) => id === memberships[0][1]);
    if (!group) throw new Error(`Missing, duplicate or unknown main domain: ${doc.id}`);
    group.items.push(item(doc));
  }
  return [
    { label: 'ホーム', link: '/' },
    { label: '全体像', items: business.map(item) },
    { label: '業務の分類', collapsed: true, items: domains.map(item) },
    { label: '業務フロー', items: [
      ...indexes.map(item),
      ...groups.map(({ id, ...group }) => group),
    ] },
  ];
}
