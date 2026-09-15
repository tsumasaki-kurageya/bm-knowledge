import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4321/bm-knowledge/', screenshot: 'only-on-failure' },
  webServer: {
    command: 'node scripts/serve-preview.mjs',
    url: 'http://127.0.0.1:4321/bm-knowledge/',
    reuseExistingServer: !process.env.CI,
  },
});
