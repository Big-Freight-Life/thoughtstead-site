import { expect, test } from '@playwright/test';

// The early access list is the one thing this site stores (lib/early-access.ts).
// These guard its spam gates and its honesty rule. The suite runs without
// LEADS_DATABASE_URL, so the "saved" path is not exercised here: without a
// store the route must refuse plainly (503), never pretend it kept an address.

const ORIGIN = 'http://localhost:3017';
const ago = (ms: number) => Date.now() - ms;

test('refuses cross-site posts', async ({ request }) => {
  const res = await request.post('/api/early-access', {
    headers: { origin: 'https://example.com' },
    data: { email: 'a@b.co', startedAt: ago(5000) },
  });
  expect(res.status()).toBe(403);
});

test('answers bots with a quiet 200 and stores nothing', async ({ request }) => {
  const honeypot = await request.post('/api/early-access', {
    headers: { origin: ORIGIN },
    data: { email: 'a@b.co', website: 'spam', startedAt: ago(5000) },
  });
  expect(honeypot.status()).toBe(200);
  const instant = await request.post('/api/early-access', {
    headers: { origin: ORIGIN },
    data: { email: 'a@b.co', startedAt: Date.now() },
  });
  expect(instant.status()).toBe(200);
});

test('rejects an address that is not one', async ({ request }) => {
  const res = await request.post('/api/early-access', {
    headers: { origin: ORIGIN },
    data: { email: 'not-an-email', startedAt: ago(5000) },
  });
  expect(res.status()).toBe(422);
});

test('without a store, no form and no false success', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByTestId('early-access-form')).toHaveCount(0);
  const res = await request.post('/api/early-access', {
    headers: { origin: ORIGIN },
    data: { email: 'a@b.co', startedAt: ago(5000) },
  });
  expect(res.status()).toBe(503);
});
