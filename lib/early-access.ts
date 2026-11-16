// Early access list — the one thing this otherwise static site stores.
//
// Thoughtstead is not open yet and will be a paid app. Until the hosted signup
// URL exists (NEXT_PUBLIC_HOSTED_SIGNUP_URL, see components/cta.tsx), the page
// offers to tell people when it opens. That is all the list is for.
//
// WHERE EMAILS LAND: the `leads` table in the bfl.design Neon database, with
// source = 'thoughtstead-early-access'. Ray already reads that table in the
// bfl.design lead dashboard, so this site needs no store or mail provider of
// its own. The connection string is LEADS_DATABASE_URL (the pooled one).
//
// HONESTY RULE: if LEADS_DATABASE_URL is unset there is nowhere to put an
// address, so the form does not render and every CTA stays the non-clickable
// "Launching soon" stub. The page never asks for an email it cannot keep.
//
// This module is server-only: it reads a secret. The form talks to it through
// app/api/early-access/route.ts.

import { neon } from '@neondatabase/serverless';

export const EARLY_ACCESS_SOURCE = 'thoughtstead-early-access';

const connectionString = process.env.LEADS_DATABASE_URL;
const sql = connectionString ? neon(connectionString) : null;

/** True when there is somewhere real to keep an address. */
export const EARLY_ACCESS_OPEN = Boolean(sql);

/** A human takes longer than this to read the hero and type an address. */
export const MIN_FILL_MS = 2_000;

const MAX_EMAIL_LENGTH = 254;
// Deliberately plain: one @, something on both sides, a dot in the domain, no
// spaces. Real validation is the launch email bouncing or not.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normaliseEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) return null;
  return email;
}

/** Hard cap so a slow database cannot hold the request open. */
const WRITE_TIMEOUT_MS = 4_000;

function withTimeout<T>(work: Promise<T>): Promise<T> {
  return Promise.race([
    work,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('early-access-write-timeout')), WRITE_TIMEOUT_MS),
    ),
  ]);
}

export type SaveResult = 'saved' | 'already' | 'unavailable';

/**
 * Store one address. Joining twice is not an error and does not add a second
 * row. Never stores the IP. Returns 'unavailable' rather than throwing, so the
 * route can tell the visitor plainly that it did not work.
 */
export async function saveEarlyAccess(
  email: string,
  meta: Record<string, unknown>,
): Promise<SaveResult> {
  if (!sql) return 'unavailable';
  try {
    const existing = (await withTimeout(sql`
      select 1 from leads
      where lower(email) = ${email} and source = ${EARLY_ACCESS_SOURCE}
      limit 1
    `)) as unknown[];
    if (existing.length > 0) return 'already';

    await withTimeout(sql`
      insert into leads (email, source, meta)
      values (${email}, ${EARLY_ACCESS_SOURCE}, ${JSON.stringify(meta)}::jsonb)
    `);
    return 'saved';
  } catch (err) {
    // The visitor gets a plain "try again"; the reason goes to the server log so a
    // wrong credential or an outage is visible instead of silent. Redacted first:
    // never let a connection string or password reach a log line.
    const reason = err instanceof Error ? err.message : 'unknown error';
    console.error(
      '[early-access] write failed:',
      reason.replace(/postgres(?:ql)?:\/\/\S+/gi, '(connection string)').replace(/npg_\w+/g, '(secret)').slice(0, 200),
    );
    return 'unavailable';
  }
}
