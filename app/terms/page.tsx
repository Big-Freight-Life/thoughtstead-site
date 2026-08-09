import type { Metadata } from 'next';
import Link from 'next/link';
import { HOSTED_PRICE, HOSTED_PERIOD } from '@/components/cta';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms of subscribing to and using Thoughtstead, in plain English.',
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
          <p className="text-sm text-foreground/60">Last updated 2026-08-09</p>

          <p>
            These are the terms for subscribing to and using Thoughtstead, written in plain
            English. By creating an account you agree to them.
          </p>

          <h2>The service</h2>
          <p>
            Thoughtstead is a hosted subscription. We run the service; you sign in and use it.
            Your subscription covers one individual account and everything described on the{' '}
            <Link href="/">home page</Link> for as long as it is active.
          </p>

          <h2>Billing</h2>
          <ul>
            <li>
              Thoughtstead is <strong>{HOSTED_PRICE} per {HOSTED_PERIOD}</strong>, billed in
              advance. AI usage is included; there is no metered surcharge.
            </li>
            <li>
              <strong>Cancel any time.</strong> Your subscription runs to the end of the period
              you have already paid for, and is not renewed after that.
            </li>
            <li>
              If we ever change the price, we will tell you before it affects you, and you can
              cancel rather than accept it.
            </li>
            <li>
              Payments are handled by our payment provider, who acts as merchant of record and
              issues your receipts.
            </li>
          </ul>

          <h2>Your data</h2>
          <ul>
            <li>
              <strong>Your content is yours.</strong> Subscribing does not give us ownership of
              anything you capture. We claim only the permission needed to operate the service
              for you — storing it, indexing it, and processing it with AI so you can search and
              recall it.
            </li>
            <li>
              <strong>We do not train models on your content, and we do not sell it.</strong>
            </li>
            <li>
              <strong>You can export everything, at any time, on any plan</strong> — including
              while cancelling. See <Link href="/privacy">Privacy</Link> for what we store and
              for how long.
            </li>
            <li>
              You are responsible for what you put in, and for having the right to put it there.
            </li>
          </ul>

          <h2>Acceptable use</h2>
          <p>
            Do not use Thoughtstead to break the law, to store or distribute material you have no
            right to, or to attack the service or other people using it. We may suspend an account
            doing those things; where we can, we will tell you first and give you the chance to
            export your data.
          </p>

          <h2>Self-hosted</h2>
          <p>
            A self-hosted edition — running Thoughtstead on your own infrastructure — is planned
            and is not available yet. Nothing on this page is a commitment to a date, a price, or
            specific terms for it. When it ships it will have its own licence, and these terms
            will not govern it.
          </p>

          <h2>Availability and warranty</h2>
          <p>
            We work to keep Thoughtstead running and your data safe, but the service is provided{' '}
            <strong>as-is</strong>, without warranty of any kind, express or implied. We do not
            guarantee uninterrupted availability. To the extent the law allows, our liability is
            limited to the amount you paid us in the twelve months before the claim.
          </p>
          <p>
            Your export is the real backstop, and it is the reason we keep it free and always
            available: nothing about your ability to keep your own data should depend on us still
            being here.
          </p>

          <h2>Ending things</h2>
          <p>
            You can cancel or delete your account at any time. If we ever discontinue the service,
            we will give you reasonable notice and a window to export everything before anything
            is deleted.
          </p>

          <h2>Support</h2>
          <p>
            For help with your account, your subscription, or anything else, email{' '}
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
