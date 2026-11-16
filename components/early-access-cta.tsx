// Server-side switch between the three states of a landing-page CTA:
//
//   1. Hosted signup is live (NEXT_PUBLIC_HOSTED_SIGNUP_URL set) → HostedCta,
//      "Start your Thoughtstead". Early access is over; the form goes away.
//   2. Not live, but the early access list has a store (LEADS_DATABASE_URL
//      set) → the email form, or a link to it where a form would be one too
//      many on the page.
//   3. Neither → HostedCta's non-clickable "Launching soon" stub, as before.
//
// This file must stay a server component: it reads lib/early-access.ts, which
// holds a database secret. components/cta.tsx is imported by the client nav,
// which is why this switch does not live there.

import { HostedCta, HOSTED_LIVE } from '@/components/cta';
import { EarlyAccessForm } from '@/components/early-access-form';
import { EARLY_ACCESS_OPEN } from '@/lib/early-access';

/** The id the hero form carries, so other CTAs can point at it. */
export const EARLY_ACCESS_ANCHOR = 'early-access';

export const EARLY_ACCESS_SHOWN = !HOSTED_LIVE && EARLY_ACCESS_OPEN;

export function EarlyAccessCta({
  placement,
  mode = 'form',
  tone,
  anchor = false,
}: {
  placement: string;
  /** 'link' renders a button that scrolls to the hero form instead. */
  mode?: 'form' | 'link';
  tone?: 'light' | 'dark';
  /** Give this form the shared anchor id. Exactly one form should. */
  anchor?: boolean;
}) {
  if (!EARLY_ACCESS_SHOWN) return <HostedCta large />;

  if (mode === 'link') {
    return (
      <a
        href={`#${EARLY_ACCESS_ANCHOR}`}
        className="hosted-cta hosted-cta-large hosted-cta-live"
        data-testid="early-access-link"
      >
        Get early access
      </a>
    );
  }

  return (
    <EarlyAccessForm
      placement={placement}
      tone={tone}
      id={anchor ? EARLY_ACCESS_ANCHOR : undefined}
    />
  );
}
