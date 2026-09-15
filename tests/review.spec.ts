import { test, expect } from '@playwright/test';

test('legacy URL keeps query and Japanese heading; document metadata and diagrams work', async ({ page }) => {
  await page.goto('02-processes/lifecycle.html?review=1#追加詳細への入口');
  await expect(page).toHaveURL(/\/02-processes\/lifecycle\/\?review=1#/);
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe('#追加詳細への入口');
  // Follow an actual page TOC anchor instead of assuming a generated heading ID.
  const link = page.locator('a[href="#異常対応計画の手順を読む"]:visible').first();
  await link.click();
  await expect(page.locator('#異常対応計画の手順を読む')).toBeInViewport();
  await expect(page.locator('.review-meta')).toContainText('PROCESS-024');
  await expect(page.getByRole('link', { name: 'Markdown原文', exact: true })).toHaveAttribute('href', /blob\/main\/docs\/02-processes\/lifecycle.md$/);
  await expect(page.locator('pre.mermaid svg')).toHaveCount(3, { timeout: 30000 });
  await expect(page.locator('pre.mermaid[data-error]')).toHaveCount(0);
});

test('Japanese search finds an annual planning document', async ({ page }) => {
  await page.goto('');
  await page.locator('site-search button[data-open-modal]').click();
  await page.locator('.pagefind-ui__search-input').fill('年度');
  await expect(page.locator('.pagefind-ui__result-link').filter({ hasText: '年度・日常' }).first()).toBeVisible({ timeout: 15000 });
});

test('mobile reading, navigation and horizontal table scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('02-processes/annual-plan/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('年度');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.locator('button[popovertarget="starlight__sidebar"]').click();
  await expect(page.locator('#starlight__sidebar')).toBeVisible();
  await page.locator('#starlight__sidebar a[href$="/02-processes/lifecycle/"]').click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('業務のつながり');
  await page.locator('button[popovertarget="starlight__sidebar"]').click();
  const sidebar = page.locator('#starlight__sidebar');
  const flows = sidebar.locator('details').filter({ has: page.locator(':scope > summary', { hasText: /^業務フロー$/ }) });
  const groups = flows.locator(':scope > ul > li > details');
  await expect(groups).toHaveCount(9);
  await expect(groups.locator('a')).toHaveCount(22);
  const planning = groups.filter({ has: page.locator(':scope > summary', { hasText: '作業・修繕・費用の計画' }) });
  await planning.locator(':scope > summary').click();
  await planning.getByRole('link', { name: '将来の修繕と費用を計画する', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('将来の修繕と費用を計画する');
});
