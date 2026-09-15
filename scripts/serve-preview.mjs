import { preview } from 'astro';
// Keep a foreground server for Playwright even in environments where the CLI auto-daemonizes.
await preview({ server: { host: '127.0.0.1', port: 4321 } });
