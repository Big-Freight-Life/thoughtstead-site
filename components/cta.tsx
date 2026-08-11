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
