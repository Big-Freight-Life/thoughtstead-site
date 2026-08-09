// Hosted is the product you can buy today; self-hosted ships after the hosted
// apps and is a waitlist, not a checkout. Both CTAs degrade honestly when their
// destination does not exist yet, rather than linking somewhere that 404s or
// taking money for something undelivered.

// Set once hosted signup is public. Until then every hosted CTA reads
// "Launching soon" — the same fallback the old Polar button used.
const SIGNUP_URL = process.env.NEXT_PUBLIC_HOSTED_SIGNUP_URL;

// The single source of truth for the advertised price. Changing it here changes
// the hero, the pricing card, and the comparison table together.
export const HOSTED_PRICE = '$20';
export const HOSTED_PERIOD = 'month';

// Whether hosted signup is actually open. Everything that claims availability
// reads this, so the page can never say "Available now" above a button that
// says "Launching soon".
export const HOSTED_LIVE = Boolean(SIGNUP_URL);

export function HostedCta({ large = false }: { large?: boolean }) {
  const size = large ? 'px-7 py-3.5 text-lg' : 'px-5 py-2.5 text-sm';
  if (!SIGNUP_URL) {
    return (
      <span className={`inline-block rounded-md border border-[#1A1714]/20 opacity-60 ${size}`}>
        Launching soon
      </span>
    );
  }
  return (
    <a
      href={SIGNUP_URL}
      data-testid="hosted-cta"
      className={`inline-block rounded-md bg-[#1A1714] text-[#FAF7F2] transition-colors hover:bg-[#3F6212] ${size}`}
    >
      Start your Thoughtstead
    </a>
  );
}

// Self-hosted has no checkout on purpose: it is not built yet, so there is
// nothing to sell. mailto rather than a form because this site is static — it
// has no API routes and no form backend, and inventing one would be a bigger
// change than the copy warrants.
export function WaitlistCta() {
  return (
    <a
      href="mailto:support@bfl.design?subject=Self-hosted%20waitlist&body=Let%20me%20know%20when%20self-hosted%20Thoughtstead%20is%20available."
      data-testid="waitlist-cta"
      className="inline-block rounded-md border border-[#1A1714]/25 px-5 py-2.5 text-sm transition-colors hover:border-[#3F6212] hover:text-[#3F6212]"
    >
      Email me when it&rsquo;s ready
    </a>
  );
}
