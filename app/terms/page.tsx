import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components/site-chrome';
import { HOSTED_PRICE, HOSTED_PERIOD } from '@/components/cta';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms of subscribing to and using Thoughtstead, in plain English.',
};

export default function TermsPage() {
  return (
    <>
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <article className="prose doc-prose min-w-0 max-w-2xl prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal">
          <h1>Terms</h1>
          <p className="text-sm text-faint">Last updated 2026-11-16</p>

          <p>
            These are the terms for subscribing to and using Thoughtstead, written in plain
            English. By creating an account you agree to them.
          </p>

          <h2>The service</h2>
          <p>
            Thoughtstead is a hosted subscription. We run the service; you sign in and use it.
            Your subscription covers one individual account and the product as described on the{' '}
            <Link href="/docs/license">Plan &amp; billing</Link> page, on the web and in the desktop
            app, for as long as it is active.
          </p>

          <h2>Billing</h2>
          <ul>
            <li>
              Thoughtstead is <strong>{HOSTED_PRICE} per {HOSTED_PERIOD}</strong>, billed in
              advance. AI usage is included; there is no metered surcharge. Reasonable-use limits apply
              to connections you make with your own AI tools; they are listed in
              the <Link href="/docs/mcp">docs</Link>.
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

          <h2>The desktop app</h2>
          <p>
            The desktop app is part of your subscription. You may install and use it on your own
            devices to reach your own account. Do not copy it, resell it, or take it apart, and do
            not use it to get around the limits of your plan. Updates are part of the service.
          </p>

          <h2>Recording and other people</h2>
          <p>
            The desktop app can record audio. You are responsible for recording lawfully, which
            includes telling the people you record and getting their consent where the law that
            applies to you and to them requires it. The consent question the app asks you is a
            record for you. It does not make a recording lawful, and it does not move any
            responsibility to us.
          </p>

          <h2>Your own AI tools</h2>
          <p>
            You may connect your own AI tools, such as Claude Code or Codex. Their terms and
            privacy practices are between you and them, not us. You decide what each connection
            may do, and you are responsible for what you authorise. An action you approve,
            including an email sent from your own address, is your action. Anything that sends
            or deletes waits for your approval, so read it before you approve it.
          </p>

          <h2>AI can be wrong</h2>
          <p>
            Thoughtstead uses AI to summarise, draft, link and propose. AI can be wrong. The
            Value Matrix and the other analysis in the product are aids to a decision, not legal,
            financial or professional advice, and you remain responsible for the decisions you
            make with them.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not use Thoughtstead to break the law, to store or distribute material you have no
            right to, or to attack the service or other people using it. We may suspend an account
            doing those things; where we can, we will tell you first and give you the chance to
            export your data.
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
          <p className="text-sm text-faint">&copy; 2026 Big Freight Life</p>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
