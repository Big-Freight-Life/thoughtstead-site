import Image from 'next/image';
import Link from 'next/link';
import { HostedCta } from '@/components/cta';

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

export function SiteNav() {
  return (
    <div className="sticky top-0 z-40 px-6 pt-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line-2 bg-surface/80 px-5 py-2.5 backdrop-blur-xl">
        <Link
          href="/"
          className="group -my-2 flex items-center gap-2.5 py-2 font-medium"
          aria-label="Thoughtstead home"
        >
          <Image
            src="/mark.png"
            alt=""
            width={28}
            height={28}
            priority
            className="size-6 transition-opacity duration-200 group-hover:opacity-80"
          />
          Thoughtstead
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted sm:flex">
          <Link href="/#worlds" className="-my-3 py-3 transition-colors hover:text-text">
            Product
          </Link>
          <Link href="/#price" className="-my-3 py-3 transition-colors hover:text-text">
            Pricing
          </Link>
          <Link href="/docs" className="-my-3 py-3 transition-colors hover:text-text">
            Docs
          </Link>
        </div>
        <HostedCta />
      </nav>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
        <nav className="-my-3 flex gap-6">
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
