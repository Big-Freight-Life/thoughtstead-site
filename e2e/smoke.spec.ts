import { expect, test } from '@playwright/test';

test('landing renders the pitch and hosted pricing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /You run a business/i })).toBeVisible();
  // The category line. Thoughtstead is a life operating system, not an "AI
  // second brain" (undersold it, borrowed category) and not a "business OS"
  // (contested, and strands /health, /lifestyle, /maintenance, /warranties).
  await expect(page.getByText(/life operating system/i).first()).toBeVisible();
  await expect(page.getByText(/second brain/i)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Hosted' })).toBeVisible();
  await expect(page.getByText('$20').first()).toBeVisible();
});

// One product, one price. The self-hosted tier was removed on 2026-08-11 —
// Thoughtstead is a subscription to a single instance we run. This test is what
// keeps a second pricing card, a waitlist, or the retired Polar checkout from
// creeping back onto a page that now sells exactly one thing.
test('pricing offers exactly one plan, and it is hosted', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hosted' })).toBeVisible();
  // Catches the FAQ answer and any prose remnant, not just a card heading.
  await expect(page.getByText(/self-host/i)).toHaveCount(0);
  await expect(page.getByTestId('waitlist-cta')).toHaveCount(0);

  // The hosted CTA becomes a real signup link once NEXT_PUBLIC_HOSTED_SIGNUP_URL
  // is set, and is the honest "Launching soon" span until then — never a dead
  // link, and never a payment link for something undelivered.
  const cta = page.getByTestId('hosted-cta');
  if (await cta.count()) {
    expect(await cta.first().getAttribute('href')).toMatch(/^https:\/\//);
  } else {
    // The string appears twice (pricing card subtitle and the CTA itself).
    await expect(page.getByText('Launching soon').first()).toBeVisible();
  }

  expect(await page.locator('a[href*="polar.sh"]').count()).toBe(0);
  await expect(page.getByText('$299')).toHaveCount(0);
});

test('docs sidebar navigates every page without 404', async ({ page }) => {
  await page.goto('/docs');
  const hrefs = await page
    .locator('aside a, nav a')
    .evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).pathname))]);
  expect(hrefs.filter((h) => h.startsWith('/docs')).length).toBeGreaterThanOrEqual(7);
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
    const waitlistMailtos = await page
      .locator('a[href*="Self-hosted%20waitlist"]')
      .count();
    expect(waitlistMailtos, `${seed} still links a self-hosted waitlist`).toBe(0);
  }
});
