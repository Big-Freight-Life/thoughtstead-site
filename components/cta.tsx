// Hosted is the product, and the only one. Thoughtstead is a subscription to a
// single instance we run: there is no second tier and nothing is distributed. A
// WaitlistCta for a distributed edition lived here until 2026-08-11, when that
// axis settled.
//
// The CTA still degrades honestly when its destination does not exist yet,
// rather than linking somewhere that 404s or taking money for something
// undelivered.

// Set once hosted signup is public. Until then every hosted CTA reads
// "Launching soon" — the same fallback the old Polar button used.
//
// DELIBERATE STUB (Ray, 2026-08-25; reaffirmed 2026-09-03): unset is the
// intended state and the button is meant to stay non-clickable. Do not "fix" it
// by pointing it at a placeholder, a mailto, or an email-capture form — there is
// no transactional mail provider behind this site to capture into. Wiring
// signup is the Polar work in system-1 (`feat/web-billing-polar`) and lands on
// its own; the 2026-09-03 redesign deliberately did not flip it.
const SIGNUP_URL = process.env.NEXT_PUBLIC_HOSTED_SIGNUP_URL;

// The advertised price now lives in lib/pricing.ts, which has no JSX in it so
// that the e2e price-contradiction guard can import the same constants instead
// of hardcoding a figure it then has to be hand-edited to keep. Re-exported
// here because every existing caller — the hero, the pricing card, /docs/costs,
// /docs/license — imports it from this module.
export {
  PLAN_NAME,
  HOSTED_PRICE,
  HOSTED_PERIOD,
  ANNUAL_PRICE,
  ANNUAL_PERIOD,
  ANNUAL_SAVING_PERCENT,
} from '@/lib/pricing';

// Whether hosted signup is actually open. Everything that claims availability
// reads this, so the page can never say "Available now" above a button that
// says "Launching soon".
export const HOSTED_LIVE = Boolean(SIGNUP_URL);

export function HostedCta({ large = false }: { large?: boolean }) {
  const size = large ? 'hosted-cta-large' : '';
  const base = `hosted-cta ${size}`;

  if (!SIGNUP_URL) {
    // The deliberate stub: reads as "not yet", is not a control, and cannot be
    // clicked, hovered into, or focused.
    return (
      <span className={`${base} hosted-cta-stub`}>
        Launching soon
      </span>
    );
  }
  return (
    <a
      href={SIGNUP_URL}
      data-testid="hosted-cta"
      className={`${base} hosted-cta-live`}
    >
      Start your Thoughtstead
    </a>
  );
}
