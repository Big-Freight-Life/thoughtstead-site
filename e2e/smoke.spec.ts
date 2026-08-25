import { expect, test } from '@playwright/test';

test('landing renders the pitch and hosted pricing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /only thing.*holding it together/i })).toBeVisible();
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

// The retired framings, swept across EVERY page rather than spot-checked on one.
//
// This is here because spot-checking failed in exactly the way spot-checking
// always does. The self-hosted tier was cancelled on 2026-08-11 and the test
// above asserted its absence — on '/' only. Both legal pages went on promising
// a self-hosted edition ("is planned") for two weeks underneath a green suite,
// and only a human reading them found it on 2026-08-25.
//
// So: enumerate the pages, and enumerate the dead framings. A new page or a new
// retired phrase is one line each.
const PAGES = ['/', '/privacy', '/terms', '/docs', '/docs/mcp', '/docs/connectors',
               '/docs/importers', '/docs/agents', '/docs/costs', '/docs/license'] as const;

const RETIRED = [
  // Cancelled 2026-08-11. One hosted instance; nothing is distributed.
  { pattern: /self-host/i, why: 'the self-hosted tier was cancelled 2026-08-11' },
  // Retired 2026-08-25. Thoughtstead is a life operating system.
  { pattern: /second brain/i, why: 'the "AI second brain" framing was retired 2026-08-25' },
  // Hosted subscribers have no deployment, no env vars, and nothing to redeploy.
  { pattern: /YOUR-APP\.vercel\.app/i, why: 'subscribers have no deployment of their own' },
  { pattern: /your own Google OAuth app/i, why: 'the Google OAuth app is ours to run, not the subscriber\'s' },
] as const;

test('no page carries a retired framing', async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    // Body text only. Comments in the source are not rendered, and the point
    // is what a reader sees.
    const body = await page.locator('body').innerText();
    for (const { pattern, why } of RETIRED) {
      expect(body, `${path} matches ${pattern} — ${why}`).not.toMatch(pattern);
    }
  }
});

// The CTA is a DELIBERATE stub: signup is not open, there is no mail provider
// behind this site, and Ray asked on 2026-08-25 that it stay non-clickable
// until there is somewhere real for it to go. This asserts the stub is honest
// rather than that it exists — if NEXT_PUBLIC_HOSTED_SIGNUP_URL is ever set,
// the same test demands a real https link instead.
test('the signup CTA is either a real link or an honest non-clickable stub', async ({ page }) => {
  await page.goto('/');

  const cta = page.getByTestId('hosted-cta');
  if (await cta.count()) {
    expect(await cta.first().getAttribute('href')).toMatch(/^https:\/\//);
    await expect(page.getByText('Launching soon')).toHaveCount(0);
    return;
  }

  // Stubbed. It must say so, and it must not be clickable by any route: no
  // href, no button role, no click handler dressed up as a control.
  const stub = page.getByText('Launching soon').first();
  await expect(stub).toBeVisible();
  await expect(page.locator('a').filter({ hasText: 'Launching soon' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /launching soon/i })).toHaveCount(0);

  // And the page must not claim availability above a button nobody can press.
  await expect(page.getByText(/available now/i)).toHaveCount(0);
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
