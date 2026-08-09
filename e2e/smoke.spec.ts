import { expect, test } from '@playwright/test';

test('landing renders the pitch and hosted pricing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /homestead for your thoughts/i })).toBeVisible();
  // exact: 'Hosted' is a substring of 'Self-hosted', which is the other card.
  await expect(page.getByRole('heading', { name: 'Hosted', exact: true })).toBeVisible();
  await expect(page.getByText('$20').first()).toBeVisible();
});

// Self-hosted ships after the hosted apps. Until then the page must not offer a
// way to pay for it — this test is what keeps a checkout from creeping back in
// before there is something to deliver.
test('self-hosted is a waitlist, not a checkout', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Self-hosted' })).toBeVisible();

  const waitlist = page.getByTestId('waitlist-cta');
  await expect(waitlist).toBeVisible();
  expect(await waitlist.getAttribute('href')).toMatch(/^mailto:/);

  // No payment link anywhere on the page while self-hosted is unreleased.
  expect(await page.locator('a[href*="polar.sh"]').count()).toBe(0);
  await expect(page.getByText('$299')).toHaveCount(0);
});

test('hosted CTA points at signup when configured', async ({ page }) => {
  await page.goto('/');
  const cta = page.getByTestId('hosted-cta').first();
  // Absent until NEXT_PUBLIC_HOSTED_SIGNUP_URL is set — the page renders
  // "Launching soon" rather than a dead link.
  if (await cta.count()) expect(await cta.getAttribute('href')).toMatch(/^https?:\/\//);
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
