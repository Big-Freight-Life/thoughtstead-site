import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What Thoughtstead the website collects, in plain English: not much.',
};

export default function PrivacyPage() {
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
          <h1>Privacy</h1>
          <p className="text-sm text-foreground/60">Last updated 2026-07-07</p>

          <p>
            The short version: this marketing and documentation site is <strong>static</strong>.
            It doesn&rsquo;t have accounts, doesn&rsquo;t have a database, and doesn&rsquo;t set
            any cookies of its own. There&rsquo;s no cookie banner here because there&rsquo;s
            nothing to consent to.
          </p>

          <h2>What this site collects</h2>
          <p>
            We use <a href="https://vercel.com/docs/analytics">Vercel Analytics</a> to see
            anonymous, aggregate traffic — things like page views and which country a visit came
            from. It doesn&rsquo;t identify you, doesn&rsquo;t use cookies, and we don&rsquo;t
            combine it with anything else about you.
          </p>

          <h2>Buying Thoughtstead</h2>
          <p>
            Checkout is handled entirely by{' '}
            <a href="https://polar.sh" target="_blank" rel="noreferrer">
              Polar
            </a>
            , our merchant of record. Polar processes your payment and their own privacy policy
            governs that transaction — we never see or store your card details. What we do
            receive from Polar after a purchase is your order information: name, email, and the
            license key issued for your purchase. We use that to send your GitHub repository
            invite, respond to support requests, and confirm license validity if you ever ask us
            to.
          </p>

          <h2>Your deployed Thoughtstead instance</h2>
          <p>
            Once you deploy Thoughtstead, it runs entirely in <strong>your own</strong> Vercel and
            Supabase accounts, using <strong>your own</strong> AI API keys. We don&rsquo;t host it,
            we don&rsquo;t have access to it, and your deployed instance sends us{' '}
            <strong>nothing</strong> — no thoughts, no email content, no usage data — unless you
            explicitly turn on the optional diagnostics ping described below.
          </p>

          <h3>Optional diagnostics ping</h3>
          <p>
            Thoughtstead includes an opt-in, <strong>default-off</strong> diagnostics ping you can
            enable in settings if you&rsquo;d like to help us catch regressions across releases.
            When enabled, it sends only: the app version, a small set of pass/fail booleans from
            internal health checks, and a randomly generated install ID that isn&rsquo;t tied to
            your name or email. It never includes your thoughts, messages, contacts, or any other
            content from your brain. You can turn it off at any time.
          </p>

          <h2>Support correspondence</h2>
          <p>
            If you email <a href="mailto:support@bfl.design">support@bfl.design</a> or{' '}
            <a href="mailto:privacy@bfl.design">privacy@bfl.design</a>, we keep that
            correspondence for as long as we reasonably need it to help you and to keep a record
            of support history. We don&rsquo;t use it for marketing.
          </p>

          <h2>Third parties</h2>
          <p>
            The only third parties involved in this site and the purchase flow are Polar
            (payments) and Vercel (hosting this site and its anonymous analytics). Your deployed
            Thoughtstead instance is your own infrastructure, running under your own agreements
            with Vercel, Supabase, and whichever AI provider you choose.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes in a way that matters, we&rsquo;ll update this page and the
            date above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy: <a href="mailto:privacy@bfl.design">privacy@bfl.design</a>.
            Everything else: <a href="mailto:support@bfl.design">support@bfl.design</a>.
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
            <Link href="/terms" className="hover:text-accent">
              Terms
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
