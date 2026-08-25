// Hosted is the product, and the only one. Thoughtstead is a subscription to a
// single instance we run: there is no self-hosted tier and nothing is
// distributed. A WaitlistCta for a self-hosted edition lived here until
// 2026-08-11, when that axis settled.
//
// The CTA still degrades honestly when its destination does not exist yet,
// rather than linking somewhere that 404s or taking money for something
// undelivered.

// Set once hosted signup is public. Until then every hosted CTA reads
// "Launching soon" — the same fallback the old Polar button used.
//
// DELIBERATE STUB (Ray, 2026-08-25): unset is the intended state right now and
// the button is meant to stay non-clickable. Do not "fix" it by pointing it at
// a placeholder, a mailto, or an email-capture form — there is no transactional
// mail provider behind this site to capture into. Checked 2026-08-25: no Resend
// (or any other provider) in this repo or in system-1, and the site project's
// only Vercel env var is the long-dead NEXT_PUBLIC_POLAR_CHECKOUT_URL, which
// nothing reads. Wiring a capture form is its own piece of work with its own
// decision about where the address goes.
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
