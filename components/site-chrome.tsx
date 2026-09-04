'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HostedCta } from '@/components/cta';
import { ThoughtsteadLogo } from '@/components/thoughtstead-logo';

// The nav and footer, in one place.
//
// /docs, /privacy and /terms each carried their own cut-down header (a
// lowercase wordmark, no logo, no CTA) and their own copy of the footer. That
// is how the marketing page ended up dark and modern while every other page
// still looked like the cream-era site with a new palette poured over it.
//
// Tap-target padding is baked in here: the negative-margin/padding pairs grow
// hit areas to 44px without moving text or changing the pill's height. Measured
// at 20px before that on the landing page; the other pages inherited the same
// problem the moment they shared this.

// Two kinds of link, deliberately styled apart.
//
// Product and Pricing are ANCHORS — they scroll within the landing page. Docs
// is NAVIGATION — it leaves. Giving all three one treatment is why there was
// no sense of place: land on /docs and the nav showed three equally inert
// links, while Product and Pricing had quietly become "go back to the other
// page". The marker below appears only on the destination you are actually in.
const LINKS = [
  { href: '/#product', label: 'Product', section: null },
  { href: '/#price', label: 'Pricing', section: null },
  { href: '/docs', label: 'Docs', section: '/docs' },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-[var(--bg)] px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between py-3"
      >
        <Link
          href="/"
          className="group -my-2 py-2"
          aria-label="Thoughtstead home"
        >
          <ThoughtsteadLogo />
        </Link>
        <div className="hidden items-center gap-7 text-sm sm:flex">
          {LINKS.map((link) => {
            const active = link.section ? pathname?.startsWith(link.section) : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative -my-3 py-3 transition-colors ${
                  active ? 'text-text' : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
                {active && (
                  // The same rotated square used as a marker throughout the
                  // page, rather than a underline borrowed from elsewhere.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rotate-45 bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </div>
        <HostedCta />
      </nav>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--bg)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
        <nav aria-label="Footer" className="-my-3 flex gap-6">
          <Link href="/docs" className="py-3 transition-colors hover:text-text">Docs</Link>
          <Link href="/privacy" className="py-3 transition-colors hover:text-text">Privacy</Link>
          <Link href="/terms" className="py-3 transition-colors hover:text-text">Terms</Link>
          <a href="mailto:support@bfl.design" className="py-3 transition-colors hover:text-text">
            Support
          </a>
        </nav>
        <p>&copy; 2026 Big Freight Life</p>
      </div>
    </footer>
  );
}
