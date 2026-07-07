import { expect, test } from '@playwright/test';

test('landing renders the pitch and pricing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /homestead for your thoughts/i })).toBeVisible();
  await expect(page.getByText('$299').first()).toBeVisible();
});

test('buy button targets Polar checkout when configured', async ({ page }) => {
  await page.goto('/');
  const buy = page.getByTestId('buy-button').first();
  if (await buy.count()) expect(await buy.getAttribute('href')).toMatch(/polar\.sh/);
});

test('docs sidebar navigates every page without 404', async ({ page }) => {
  await page.goto('/docs');
  const hrefs = await page
    .locator('aside a, nav a')
    .evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).pathname))]);
  expect(hrefs.filter((h) => h.startsWith('/docs')).length).toBeGreaterThanOrEqual(9);
  for (const href of hrefs) {
    const res = await page.goto(href);
    expect(res?.status(), href).toBe(200);
  }
});

test('internal links are unbroken', async ({ page, request }) => {
  const seeds = ['/', '/docs', '/privacy', '/terms'];
  const seen = new Set<string>();
  for (const seed of seeds) {
    await page.goto(seed);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).pathname))]);
    for (const href of links) {
      if (seen.has(href)) continue;
      seen.add(href);
      expect((await request.get(href)).status(), `${seed} -> ${href}`).toBe(200);
    }
  }
});
