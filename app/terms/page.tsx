import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms of buying and using Thoughtstead, in plain English.',
};

export default function TermsPage() {
  return (
    <>
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <Link
          href="/"
          className="text-sm lowercase tracking-wide text-foreground/70 hover:text-accent"
        >
          thoughtstead
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10 md:py-16">
        <article className="prose prose-neutral min-w-0 max-w-2xl prose-headings:font-serif prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-hr:border-foreground/15">
          <h1>Terms</h1>
          <p className="text-sm text-foreground/60">Last updated 2026-07-07</p>

          <p>
            These are the terms for buying and using Thoughtstead, written in plain English. If
            anything here ever conflicts with the license file in the repository you receive
            (<code>LICENSE.md</code>), that file governs.
          </p>

          <h2>Sales</h2>
          <p>
            All purchases are sold by{' '}
            <a href="https://polar.sh" target="_blank" rel="noreferrer">
              Polar
            </a>
            , acting as merchant of record. Polar handles payment processing, receipts, and
            refunds. <strong>Refunds are available within 14 days of purchase, no questions
            asked</strong>, and are processed by Polar.
          </p>

          <h2>What you&rsquo;re buying</h2>
          <p>
            You&rsquo;re buying a license to the Thoughtstead source code, granted under{' '}
            <code>LICENSE.md</code> in the private repository you get access to after purchase.
            In summary:
          </p>
          <ul>
            <li>Use it for personal or commercial purposes.</li>
            <li>Modify it freely — the source is yours to study, change, and extend.</li>
            <li>
              Invite your team onto your own deployed instance; that&rsquo;s covered by a single
              purchase.
            </li>
            <li>
              You may not resell or redistribute the code — including hosting it for others as a
              product or service.
            </li>
            <li>
              Your purchase includes 12 months of updates. Your access to the repository and to
              whatever you&rsquo;ve already deployed does not expire after that — you simply stop
              receiving new updates unless you renew.
            </li>
            <li>Support covers the latest released version, best-effort.</li>
          </ul>
          <p>
            This is a summary, not the license itself. Read the full text in{' '}
            <code>LICENSE.md</code> in the repository, or see{' '}
            <Link href="/docs/license">the license &amp; updates doc</Link>.
          </p>

          <h2>No warranty</h2>
          <p>
            Thoughtstead is provided <strong>as-is</strong>, without warranty of any kind, express
            or implied. You&rsquo;re deploying it into your own Vercel, Supabase, and AI provider
            accounts, under your own agreements with those providers — we&rsquo;re not
            responsible for their uptime, pricing, or behavior.
          </p>

          <h2>Support</h2>
          <p>
            For help with your purchase, license key, or deployment, email{' '}
            <a href="mailto:support@bfl.design">support@bfl.design</a>.
          </p>

          <h2>Changes</h2>
          <p>
            If these terms change in a way that matters, we&rsquo;ll update this page and the
            date above.
          </p>

          <hr />
          <p className="text-sm text-foreground/60">&copy; 2026 Big Freight Life</p>
        </article>
      </main>

      <footer className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-foreground/60 sm:flex-row">
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <Link href="/docs" className="hover:text-accent">
              Docs
            </Link>
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <a href="mailto:support@bfl.design" className="hover:text-accent">
              Support
            </a>
          </nav>
          <p>&copy; 2026 Big Freight Life</p>
        </div>
      </footer>
    </>
  );
}
