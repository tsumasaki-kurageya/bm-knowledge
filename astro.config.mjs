import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import reviewMarkdown from './scripts/remark-review.mjs';
import { base, repository, sections } from './scripts/site-config.mjs';

export default defineConfig({
  site: 'https://tsumasaki-kurageya.github.io',
  base,
  trailingSlash: 'always',
  integrations: [starlight({
    title: '建物維持保全 業務レビュー',
    defaultLocale: 'root',
    locales: { root: { label: '日本語', lang: 'ja' } },
    social: [{ icon: 'github', label: 'GitHub', href: repository }],
    sidebar: [
      { label: 'ホーム', link: '/' },
      ...sections.map(([directory, label]) => ({ label, items: [{ autogenerate: { directory } }] })),
    ],
    components: { PageTitle: './src/components/ReviewTitle.astro' },
    customCss: ['./src/styles/review.css'],
  })],
  markdown: { processor: unified({ remarkPlugins: [reviewMarkdown] }) },
});
