// POST /api/early-access — joins the early access list. See lib/early-access.ts.
//
// Spam protection, cheapest first: same-origin only → per-IP rate limit →
// honeypot field → minimum fill time → email shape. A bot that trips the
// honeypot or the timer gets the same 200 as a person, so it learns nothing.

import { NextResponse, type NextRequest } from 'next/server';
import { MIN_FILL_MS, normaliseEmail, saveEarlyAccess } from '@/lib/early-access';

const ALLOWED_HOSTS = new Set(['thoughtstead.com', 'www.thoughtstead.com', 'localhost']);

function sameSite(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  if (ALLOWED_HOSTS.has(host)) return true;
  // Vercel previews of this project, so the form can be tried before it ships.
  return host.endsWith('.vercel.app') && host.startsWith('thoughtstead-site');
}

// Per-instance and therefore approximate, which is enough for a launch list:
// five tries a minute per IP. A serverless instance that restarts forgets, and
// that is fine — the honeypot and timer do most of the work.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: NextRequest) {
  if (!sameSite(req)) return fail('Forbidden.', 403);
  if (rateLimited(clientIp(req))) {
    return fail('Too many tries. Please wait a minute and try again.', 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail('Invalid request.', 400);
  }

  // `website` is invisible to people and irresistible to form-filling bots.
  const honeypot = typeof body.website === 'string' ? body.website : '';
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const email = normaliseEmail(body.email);
  if (!email) return fail('Please enter a valid email address.', 422);

  const placement = typeof body.placement === 'string' ? body.placement.slice(0, 32) : null;
  const result = await saveEarlyAccess(email, {
    site: 'thoughtstead.com',
    placement,
    joined_via: 'early-access-form',
  });

  if (result === 'unavailable') {
    return fail('That did not go through. Please try again in a moment.', 503);
  }
  return NextResponse.json({ ok: true });
}
