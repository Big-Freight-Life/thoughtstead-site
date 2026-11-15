import { expect, test } from '@playwright/test';

// Baseline response headers (next.config.ts). They must be on a page and on an
// API response alike: a header set on only one of them is the usual way this
// regresses.

const EXPECTED: Record<string, string> = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
};

test('pages carry the baseline security headers', async ({ request }) => {
  const res = await request.get('/');
  for (const [name, value] of Object.entries(EXPECTED)) expect(res.headers()[name], name).toBe(value);
  expect(res.headers()['permissions-policy']).toContain('camera=()');
});

test('API responses carry them too', async ({ request }) => {
  const res = await request.post('/api/early-access', { headers: { origin: 'https://example.com' }, data: {} });
  expect(res.status()).toBe(403);
  for (const [name, value] of Object.entries(EXPECTED)) expect(res.headers()[name], name).toBe(value);
});
