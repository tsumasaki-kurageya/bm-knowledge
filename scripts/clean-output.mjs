import { rm } from 'node:fs/promises';
// Astro may retain previous build files. Never let stale pages enter Pagefind or deployment.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
