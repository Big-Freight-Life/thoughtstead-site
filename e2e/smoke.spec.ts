import { expect, test } from '@playwright/test';
import { ADVERTISED_PRICES } from '../lib/pricing';

test('landing renders the pitch and hosted pricing', async ({ page }) => {
  await page.goto('/');
  // The pitch names the user's situation: every part of the product lives in a
  // different tool, so it is only whole in their head.
  await expect(
    page.getByRole('heading', { level: 1, name: /Get the whole product out of your head/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /Life is moving too fast to be the only one.*holding it together/i }),
  ).toBeVisible();
  // The category line. Thoughtstead is a life operating system, not an "AI
  // second brain" (undersold it, borrowed category) and not a "business OS"
  // (contested, and strands /health, /lifestyle, /maintenance, /warranties).
  await expect(page.getByText(/life operating system/i).first()).toBeVisible();
  await expect(page.getByText(/second brain/i)).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Individual' })).toBeVisible();
  await expect(page.locator('.price-card-head p')).toHaveText(/Available now|Launching soon/);
  await expect(page.getByText('$19.99').first()).toBeVisible();
  // Both periods, and a derived saving rather than a literal.
  await expect(page.getByText(/\$199\.99\/year/)).toBeVisible();
});

test('landing sections share one white canvas without divider rules', async ({ page }) => {
  await page.goto('/');
  const sectionStyles = await page.locator('main > section').evaluateAll((sections) =>
    sections.map((section) => {
      const style = getComputedStyle(section);
      return {
        background: style.backgroundColor,
        borderTop: style.borderTopWidth,
        borderBottom: style.borderBottomWidth,
      };
    }),
  );

  // rgb(240, 238, 229) is #f0eee5 — the bone ground taken from the bfl.design
  // hero so the two properties read as one house. It was #fcfcfb when this
  // guard was written; the guard is about the canvas being ONE colour across
  // every band, not about which colour, so the expectation moves with --bg.
  // If this fails after a palette change, update the value — do not widen it to
  // accept any colour, which is the banded-slab page it exists to prevent.
  expect(sectionStyles.every(({ background }) =>
    background === 'rgb(240, 238, 229)' || background === 'rgba(0, 0, 0, 0)')).toBe(true);
  expect(sectionStyles.every(({ borderTop, borderBottom }) => borderTop === '0px' && borderBottom === '0px')).toBe(true);

  const chrome = await page.locator('nav[aria-label="Main"]').locator('..').evaluate((header) => {
    const style = getComputedStyle(header);
    return { background: style.backgroundColor, borderBottom: style.borderBottomWidth };
  });
  const footer = await page.getByRole('contentinfo').evaluate((element) => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, borderTop: style.borderTopWidth };
  });
  // Same bone ground as the sections above — the nav and footer share the page
  // canvas rather than banding against it, which is the whole point of the check.
  expect(chrome).toEqual({ background: 'rgb(240, 238, 229)', borderBottom: '0px' });
  expect(footer).toEqual({ background: 'rgb(240, 238, 229)', borderTop: '0px' });
  await expect(page.locator('main .eyebrow')).toHaveCount(0);
});

// Payable was advertised until 2026-09-03 and there has never been an /ap route
// in the app or an /ap entry in NAV_ITEMS. Only AR ships. This is a claim test,
// not a copy test: the page may say anything it likes about receivables.
test('the page does not advertise accounts payable', async ({ page }) => {
  await page.goto('/');
  const body: string = await page.evaluate(VISIBLE_TEXT);
  expect(body).not.toMatch(/payable/i);
});

// There is NO TRIAL. system-1's src/backend/billing/plan.ts is explicit that a
// trial was specced and dropped on 2026-09-03, and that the Polar products
// carry none — so any copy offering one is a promise the checkout will break.
test('the page never offers a free trial', async ({ page }) => {
  await page.goto('/');
  const body: string = await page.evaluate(VISIBLE_TEXT);
  expect(body).not.toMatch(/free trial|start.{0,12}trial|\d+[- ]day trial/i);
});

// One product, one price. The self-hosted tier was removed on 2026-08-11 —
// Thoughtstead is a subscription to a single instance we run. This test is what
// keeps a second pricing card, a waitlist, or the retired Polar checkout from
// creeping back onto a page that now sells exactly one thing.
test('pricing offers exactly one plan, and it is hosted', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Individual' })).toBeVisible();
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
// Text a reader could actually encounter: includes content inside collapsed
// <details> (which innerText omits), excludes <script>/<style> (which
// textContent includes — Next inlines its RSC flight payload there, and it is
// full of "$1", "$13" and every string on the page a second time).
const VISIBLE_TEXT = `(() => {
  const clone = document.body.cloneNode(true);
  clone.querySelectorAll('script, style, noscript, template').forEach((n) => n.remove());
  return clone.textContent || '';
})()`;

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
    const body: string = await page.evaluate(VISIBLE_TEXT);
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

// Scroll-reveal must survive a FAST scroll.
//
// The first reveal implementation revealed only on IntersectionObserver's
// isIntersecting. A flick scroll, Page Down, anchor jump or scroll restore
// moves an element from below the viewport to above it between two frames — it
// is never observed intersecting, never gets the class, and stays at opacity 0
// permanently. On 2026-08-25 that left 31 of 68 elements invisible on a page
// where tsc, the build and every other test in this file were green.
//
// So: jump straight to the bottom the way a real flick does, then assert that
// nothing anywhere on the page is still transparent.
test('no content is left invisible after a fast scroll to the bottom', async ({ page }) => {
  await page.goto('/');

  // One jump, not a smooth crawl — a smooth scroll would let the observer
  // catch every element and the test would pass on the broken implementation.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);

  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')]
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.9)
      .map((el) => (el.textContent || '').trim().slice(0, 60)),
  );
  expect(hidden, `still invisible after scrolling to the bottom: ${hidden.join(' | ')}`).toEqual([]);

  // And the same going back up, which is where scroll-restore lands people.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const hiddenTop = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')].filter(
      (el) => Number(getComputedStyle(el).opacity) < 0.9,
    ).length,
  );
  expect(hiddenTop).toBe(0);
});

test('the product story replaces screenshot thumbnails with an interactive operating sequence', async ({ page }) => {
  // Reduced motion, and it is the guard that needs it rather than the design.
  //
  // .phone-device carries `animation: phone-float 7s infinite`, so the handset
  // and everything drawn inside it drift forever. Playwright will not click an
  // element until its box is identical across two animation frames, which a
  // continuous float never gives it — the Approve click burned 57 retries on
  // "element is not stable" and then timed out. The float is deliberate and
  // stays; a person tracks a 7-second drift without noticing it.
  //
  // Emulating reduced motion is the honest fix because the site already
  // answers it: `@media (prefers-reduced-motion:reduce)` sets
  // `.phone-device { animation: none !important }`, and OperatingStory reads
  // the same query to stop its 5.2s autoplay. So this is a real configuration
  // the site supports, not a test-only escape hatch, and it keeps the full
  // actionability check — visible, enabled, receiving events — rather than
  // reaching for `force: true`, which would let the button pass while covered.
  //
  // What this test guards is that the sequence is INTERACTIVE. It does not
  // guard that the phone animates; nothing here should fail if the float were
  // retuned. Do not "fix" a future failure of this test by deleting the line
  // below without re-reading what is actually broken.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const story = page.locator('[data-operating-story]');
  await expect(story).toBeAttached();
  await expect(page.locator('.story-screen-stage')).toHaveCount(0);
  await expect(page.locator('main img[src*="product-screenshots"]')).toHaveCount(0);

  const tabs = story.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  await tabs.nth(1).click();
  await expect(story).toHaveAttribute('data-phase', 'method');
  await expect(story.getByRole('tabpanel')).toContainText('seven connected surfaces');

  await tabs.nth(2).click();
  await expect(story).toHaveAttribute('data-phase', 'approval');
  const panel = story.getByRole('tabpanel');
  await expect(panel).toContainText('Outbound action parked');
  await panel.getByRole('button', { name: 'Approve' }).click();
  await expect(panel).toContainText('Approved');
});

test('animated showcase is responsive, accessible, and pauses outside the viewport', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('main > .hero');
  const section = page.locator('[data-showcase-section]');
  const card = page.locator('[data-showcase-card]');
  const play = card.getByRole('button', { name: /play the Thoughtstead animated product introduction/i });

  await expect(hero).toBeVisible();
  await expect(section).toBeAttached();
  await expect(card).toBeAttached();
  await expect(play).toHaveText(/Play intro/i);
  expect(await hero.evaluate((element) => element.nextElementSibling?.hasAttribute('data-showcase-section'))).toBe(true);

  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.getAttribute('data-running')).toBe('true');
  const geometry = await card.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const canvas = element.querySelector('canvas');
    return {
      ratio: rect.width / rect.height,
      canvasScale: canvas ? canvas.width / canvas.clientWidth : 0,
    };
  });
  expect(geometry.ratio).toBeGreaterThan(1.76);
  expect(geometry.ratio).toBeLessThan(1.79);
  expect(geometry.canvasScale).toBeLessThanOrEqual(1.76);

  await play.focus();
  await expect(play).toBeFocused();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await expect.poll(() => card.getAttribute('data-running')).toBe('false');
});

test('animated showcase resolves to a static product frame with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const card = page.locator('[data-showcase-card]');
  await expect(card).toHaveAttribute('data-motion', 'reduced');
  await expect(card).toHaveAttribute('data-running', 'false');
  await expect(card).toHaveAttribute('data-phase', 'workspace');

  const before = await card.getAttribute('style');
  await page.waitForTimeout(250);
  await expect(card).toHaveAttribute('style', before || '');
});

// No placeholder media ships.
//
// The page carried three, then four, dashed-outline MediaSlot frames standing in
// for footage that was never shot. On 2026-09-03 Ray looked at the redesign and
// the verdict was that it "doesn't look good at all" — and the largest single
// offender was a full-bleed 21:9 empty box directly under the hero. An unfilled
// placeholder reads as an unfinished site, so no media beats placeholder media.
//
// The component still exists and is still the right way to reserve a slot while
// footage is being cut. This asserts only that none reaches the live page: put
// one back and this fails, which is the reminder to fill it before shipping.
test('the page ships no placeholder media', async ({ page }) => {
  await page.goto('/');
  const slots = await page.locator('[data-media-slot]').evaluateAll((nodes) =>
    nodes.map((n) => n.getAttribute('data-media-slot')),
  );
  expect(slots, `unfilled media placeholders on the live page: ${slots.join(', ')}`).toEqual([]);
});

// Nothing may overflow its box or the viewport, at any width people use.
//
// Added 2026-08-25 after "Reasonable doubts" was found overflowing its own
// column — a single word wider than the grid track it sat in at display scale.
// Nobody had loaded this page at phone width at all, which for a marketing
// page is the wrong way round.
const WIDTHS = [
  { w: 390, h: 844, name: 'iPhone' },
  { w: 768, h: 1024, name: 'tablet' },
  { w: 1024, h: 800, name: 'small laptop' },
  { w: 1440, h: 900, name: 'desktop' },
];

for (const { w, h, name } of WIDTHS) {
  test(`layout holds with no clipping at ${w}px (${name})`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    // Let the reveals settle so measurements are of the final layout.
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }),
    );
    await page.waitForTimeout(4000);

    // 1. The page itself must not scroll sideways.
    const bleeds = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(bleeds, `page scrolls horizontally by ${bleeds}px at ${w}px`).toBeLessThanOrEqual(1);

    // 2. No text may paint outside the box that is supposed to contain it.
    //
    // NOT scrollWidth > clientWidth. That was the first attempt and it is
    // useless here: for an overflow:visible block, a word too wide for the box
    // simply paints outside it and scrollWidth never moves. Negative-controlled
    // on 2026-08-25 — with the real "Reasonable doubts" overflow reintroduced,
    // the scrollWidth version passed at all four widths.
    //
    // Range.getBoundingClientRect() measures where the text actually lands, so
    // it sees a spill that scrollWidth cannot.
    //
    // ⚠ UNPROVEN. The one real overflow this was written for — "Reasonable
    // doubts" in a col-span-4 track — could not be reproduced under Playwright
    // at 1280/1440/1512/1600 (text 418px inside a 452px box, no spill), though
    // the live browser reported it. Web font metrics differ between the two
    // environments. So assertion 1 below is the load-bearing one; treat this as
    // a net that has never caught anything, not as proof the page is clean.
    const clipped = await page.evaluate(() =>
      [...document.querySelectorAll('h1,h2,h3,p,dt,dd,summary,li')]
        .filter((el) => {
          const box = el.getBoundingClientRect();
          if (box.width <= 0) return false;
          const range = document.createRange();
          range.selectNodeContents(el);
          const text = range.getBoundingClientRect();
          return text.width > 0 && (text.right > box.right + 1.5 || text.left < box.left - 1.5);
        })
        .map((el) => `${el.tagName}: ${(el.textContent || '').trim().slice(0, 40)}`),
    );
    expect(clipped, `clipped at ${w}px: ${clipped.join(' | ')}`).toEqual([]);
  });
}

// Tap targets, at phone width.
//
// Measured on the live preview 2026-08-25: nav links were 20px tall, FAQ
// question rows 26px, the logo link 24px — against a 44px minimum that both
// Apple's HIG and WCAG 2.5.5 put at the centre of mobile usability. Contrast
// and heading order were already clean; this was the one real defect.
//
// 40px not 44: the assertion is a floor against regression, and a couple of
// inline links legitimately sit slightly under while still being comfortably
// tappable. Anything materially small fails.
test('interactive elements are big enough to tap on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  // Every page, not just '/'. Checking one page is the exact mistake the
  // retired-framing sweep above was written to stop, repeated four tests later.
  for (const path of PAGES) {
  await page.goto(path);
  // The 3.5s reveal failsafe only exists where .reveal does — the landing page.
  // Waiting it out on all ten pages blew the 30s test budget.
  if (await page.locator('.reveal').count()) await page.waitForTimeout(4000);
  else await page.waitForTimeout(250);

  const small = await page.evaluate(() =>
    [...document.querySelectorAll('a, button, summary')]
      // Inline links inside a sentence are exempt, and that is the standard's
      // own wording, not a convenience: both WCAG 2.5.5 and 2.5.8 carve out a
      // target "in a sentence or block of text". Padding "support@bfl.design"
      // to 44px would break the paragraph it sits in.
      .filter((el) => !el.closest('p, li, dd, blockquote'))
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width > 0 && r.height > 0 && r.height < 40)
      .map(({ el, r }) => `${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || '').trim().slice(0, 28)}"`),
  );
  expect(small, `${path}: tap targets under 40px tall: ${small.join(' | ')}`).toEqual([]);
  }
});

// Words must not be glued to the link before them.
//
// JSX drops the literal space between a closing tag and text that wraps onto
// the next source line. It has produced this bug three times on this site:
// "$20/month\u00b7 AI included" in the hero, and "Vercel Analyticsto see" on
// /privacy — which was shipped and is live on production. Reviewing the JSX by
// eye clearly does not catch it, so detect it in the rendered DOM instead.
test('no word is glued to the link before it', async ({ page }) => {
  const glued: string[] = [];
  for (const path of PAGES) {
    await page.goto(path);
    const hits = await page.evaluate(() =>
      [...document.querySelectorAll('a')]
        .filter((a) => {
          const next = a.nextSibling;
          if (!next || next.nodeType !== Node.TEXT_NODE) return false;
          const linkEndsWithWord = /[\w.]$/.test(a.textContent || '');
          // A letter or digit immediately after the link, with no space.
          return linkEndsWithWord && /^[A-Za-z0-9]/.test(next.textContent || '');
        })
        .map((a) => `"${(a.textContent || '').slice(-18)}" + "${(a.nextSibling!.textContent || '').slice(0, 14)}"`),
    );
    hits.forEach((h) => glued.push(`${path} ${h}`));
  }
  expect(glued, `missing space after a link: ${glued.join(' | ')}`).toEqual([]);
});

// Every page quotes the same price.
//
// HOSTED_PRICE calls itself "the single source of truth for the advertised
// price", but /docs/costs and /docs/license hardcoded $20 in Markdown the
// constant could not reach. They import it now — this asserts nobody undoes
// that, since the failure is a pricing contradiction on the two pages a
// prospect reads BEFORE subscribing.
//
// Two changes on 2026-09-03:
//
//  - The allowed set is IMPORTED rather than written down. It read `p !== '$20'`
//    and so had to be hand-edited the moment the price moved, which is not a
//    guard. There are two advertised figures now, monthly and annual.
//  - The playable Value Matrix is excluded. It renders dollar figures by the
//    dozen — what a catch is worth, what a false alarm costs, the net, the
//    break-even — and none of them are a price claim. Scoping this to
//    everything OUTSIDE that band keeps the test about what it is about; a
//    figure that escapes the band still fails.
const TEXT_OUTSIDE_THE_DEMO = `(() => {
  const clone = document.body.cloneNode(true);
  clone.querySelectorAll('script, style, noscript, template').forEach((n) => n.remove());
  clone.querySelectorAll('[data-testid="value-matrix-demo"]').forEach((n) => n.remove());
  return clone.textContent || '';
})()`;

test('no page contradicts the advertised price', async ({ page }) => {
  const wrong: string[] = [];
  for (const path of PAGES) {
    await page.goto(path);
    const text: string = await page.evaluate(TEXT_OUTSIDE_THE_DEMO);
    const prices = [...new Set(text.match(/\$\d+(?:\.\d{2})?/g) || [])];
    prices
      .filter((p) => !ADVERTISED_PRICES.includes(p))
      .forEach((p) => wrong.push(`${path} quotes ${p}`));
  }
  expect(
    wrong,
    `pages quoting a figure that is not one of ${ADVERTISED_PRICES.join(' / ')}: ${wrong.join(' | ')}`,
  ).toEqual([]);
});

// Content must be visible with JavaScript disabled.
//
// .reveal starts at opacity:0 and only JS removes it, so this is the third
// route to "the page is blank" found on this branch. The rule is scoped to
// html.js — set by an inline script — so with JS off nothing is ever hidden.
test('the page renders fully with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');

  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')].filter(
      (el) => Number(getComputedStyle(el).opacity) < 0.9,
    ).length,
  );
  expect(hidden, 'blocks invisible with JS disabled').toBe(0);

  // And the substance is actually there, not just un-hidden.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Text from the LAST band, not a middle one. "Warranties" was the anchor
  // until 2026-09-03, when it folded into a compact band and this failed for
  // the wrong reason. The closing headline is the final content on the page, so
  // seeing it proves the whole document rendered rather than merely that some
  // .reveal block un-hid.
  await expect(page.getByText(/holding it together/i).first()).toBeVisible();
  await context.close();
});

// The nav says where you are.
//
// Product and Pricing are anchors within the landing page; Docs is a real
// destination. Before this, all three looked identical everywhere, so /docs
// gave no sense of place at all.
test('the nav marks Docs as current only on docs pages', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  // Scoped to the main nav. The docs sidebar marks its own current page too,
  // which is correct — hence the distinct landmark labels.
  const mainNav = page.locator('nav[aria-label="Main"]');

  await page.goto('/docs');
  await expect(mainNav.locator('a[aria-current="page"]')).toHaveText('Docs');

  await page.goto('/docs/mcp');
  await expect(mainNav.locator('a[aria-current="page"]')).toHaveText('Docs');

  // Anchors are not destinations, so nothing is current on the landing page.
  await page.goto('/');
  await expect(mainNav.locator('a[aria-current="page"]')).toHaveCount(0);

  // And every nav landmark is named, so a screen reader is not offered two
  // identical "navigation" entries to choose between.
  await page.goto('/docs');
  const unlabelled = await page.evaluate(
    () => [...document.querySelectorAll('nav')].filter((n) => !n.getAttribute('aria-label')).length,
  );
  expect(unlabelled, 'nav landmarks without an aria-label').toBe(0);
});

// The social card must quote the headline correctly.
//
// The hero was changed from "You are" to "You're" and the og:description was
// not — so every link shared to Slack, iMessage or LinkedIn previewed with a
// sentence the page itself no longer says. Nothing catches that by eye, since
// the tag is invisible on the page it describes.
test('the social card quotes the headline it describes', async ({ page }) => {
  await page.goto('/');
  const og = await page.locator('meta[property="og:description"]').getAttribute('content');
  // innerText, not textContent: the headline is two block spans, and
  // textContent concatenates them into "thingholding" with no boundary.
  const h1 = await page.evaluate(
    () => (document.querySelector('h1') as HTMLElement).innerText,
  );

  // Compare on words. The page renders a curly apostrophe (&rsquo;) and the
  // meta tag carries a straight one, and the meta sentence ends in a full stop
  // the headline does not have — neither is a mismatch worth failing on.
  const norm = (v: string) =>
    v
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[^a-z']+/g, ' ')
      .trim();
  expect(norm(og || ''), `og:description "${og}" does not match h1 "${h1}"`).toBe(norm(h1));
});

test('docs sidebar navigates every page without 404', async ({ page }) => {
  await page.goto('/docs');
  // Only same-origin routes. The shared footer added a mailto:, whose pathname
  // is "support@bfl.design" — not a route, and a guaranteed 404.
  const hrefs = await page
    .locator('aside a, nav a')
    .evaluateAll((as) =>
      [
        ...new Set(
          (as as HTMLAnchorElement[])
            .filter((a) => a.protocol === 'http:' || a.protocol === 'https:')
            .filter((a) => a.origin === window.location.origin)
            .map((a) => a.pathname),
        ),
      ],
    );
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
