import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav, SiteFooter } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What Thoughtstead does with your data, in plain English: no training on it, no selling it, full export any time.',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <article className="prose doc-prose min-w-0 max-w-2xl prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal">
          <h1>Privacy</h1>
          <p className="text-sm text-faint">Last updated 2026-11-16</p>

          <p>
            The short version: <strong>we do not train on your content and we never sell it</strong>,
            you can export everything at any time, and this website itself collects almost
            nothing. The rest of this page covers both — the site you are reading, and the
            Thoughtstead service you subscribe to.
          </p>

          <h2>What this site collects</h2>
          <p>
            This marketing and documentation site is <strong>static</strong>. It has no accounts
            and sets no cookies of its own — there is no cookie banner here because there is
            nothing to consent to.
          </p>
          <p>
            The one exception is the <strong>early access list</strong>. If you leave your email
            there, we keep that address and when you joined, and use it for one thing: to tell
            you when Thoughtstead opens. We don&rsquo;t store your IP address with it, and we
            don&rsquo;t add you to anything else. To be taken off the list, email{' '}
            <a href="mailto:support@bfl.design">support@bfl.design</a>.
          </p>
          <p>
            {/* Explicit {' '}: JSX drops the literal space between a closing tag
                and text that wraps to the next line. This rendered "Vercel
                Analyticsto see" — and still does on production today. */}
            We use <a href="https://vercel.com/docs/analytics">Vercel Analytics</a>
            {' '}
            to see anonymous, aggregate traffic — things like page views and which country a visit came
            from. It doesn&rsquo;t identify you, doesn&rsquo;t use cookies, and we don&rsquo;t
            combine it with anything else about you.
          </p>

          <h2>Subscribing</h2>
          <p>
            Payment is handled entirely by our payment provider, acting as merchant of record.
            They process your payment under their own privacy policy — <strong>we never see or
            store your card details</strong>. What we receive is your order information: name,
            email, and subscription status. We use it to run your account, answer support
            requests, and send billing notices. We do not send marketing you did not ask for.
          </p>

          <h2>Your Thoughtstead</h2>
          <p>
            Thoughtstead is a hosted service, so what you capture is stored on our
            infrastructure. That makes the following commitments the important part of this page:
          </p>
          <ul>
            <li>
              <strong>We do not train AI models on your content, and we never sell it.</strong>
            </li>
            <li>
              <strong>Every context is isolated</strong> from every other customer &mdash; and
              from your own other contexts &mdash; at the database level, not merely by
              application code.
            </li>
            <li>
              <strong>You can export everything, any time</strong> &mdash; from every context:
              everything you have captured, including areas that have since been retired from the
              app, in readable formats. That includes while you are cancelling.
            </li>
            <li>
              <strong>Delete means delete.</strong> Ask us to delete your account and we remove
              your content from live systems promptly, and from backups as those age out on their
              normal cycle.
            </li>
            <li>
              <strong>Outbound actions need your approval.</strong> Agents draft and queue; they
              do not send on their own. That is enforced in the database, not by prompt.
            </li>
          </ul>
          <p>
            To operate the service we necessarily process your content — storing it, indexing it
            for semantic search, and sending it to our AI providers (see Third parties) to enrich it
            and answer questions about it, and, if you record or import audio, to transcribe it.
            That processing exists to serve you and for no other purpose. The web app and the
            desktop app use the same service and the same account, and this page covers both.
          </p>

          <h3>Recordings and transcripts</h3>
          <p>
            The desktop app can record and transcribe the meeting you are in, or any audio your
            Mac is playing. For each session you choose the sources: microphone, system audio,
            both, or neither. Recorded audio and its transcript are stored in your account like
            anything else you capture, and may be processed by our transcription and AI
            providers (see Third parties).
          </p>
          <p>
            <strong>Recording other people.</strong> When a session ends, the app asks how
            consent was handled: everyone was told and agreed, notice was given, nobody else was
            present, you are relying on one-party consent, or the transcript was imported. Until
            you answer, we do not send the transcript&rsquo;s words to an AI model for summaries
            or follow-ups. Your answer is a record for you; it does not change what the law
            requires of you where you are. See <Link href="/terms">Terms</Link>.
          </p>

          <h3>Using your own AI tools</h3>
          <p>
            You can connect the Claude Code, Codex, Claude app or another AI tool you already
            use. Thoughtstead never sees your login for it. Nothing is shared until you approve
            the connection in Settings and choose how much it may do: read your memory, read and
            add to it, work in a workspace, or build one client&rsquo;s ontology. Whatever the
            tool reads is then processed by that tool&rsquo;s own provider under your agreement
            with them, not by us. Anything that sends, deletes, assigns or ends a role waits for
            your approval, and the tool cannot approve its own work. Each connection has daily
            limits, we keep a record of the changes it makes, and you can revoke it at any time
            in Settings.
          </p>

          <h3>Backups</h3>
          <p>
            Beyond the database&rsquo;s own daily backups, we keep an offsite copy of your data
            and stored files with a separate provider (Cloudflare), so that a problem with our
            main host cannot take your data with it.
          </p>

          <h3>Staff access</h3>
          <p>
            Hosting everything you put in Thoughtstead means our staff could technically read it. We treat that as
            a serious responsibility: access is limited to what is needed to operate the service
            or to fix a problem you have asked us to fix, and we would rather ask you than look.
            We will not pretend this is the same guarantee as data that never leaves your own
            machine. It is not, and no hosted service can offer that one. What we offer instead
            is a narrow reason to look, a free export so that leaving is always cheap, and this
            page saying so plainly.
          </p>

          <h3>Connected accounts</h3>
          <p>
            If you connect Gmail or Calendar, we store the access tokens Google issues, encrypted,
            and use them only to sync what you have asked us to sync. Disconnect at any time and
            we discard them.
          </p>

          <h3>Optional diagnostics ping</h3>
          <p>
            Thoughtstead includes an opt-in, <strong>default-off</strong> diagnostics ping you can
            enable in settings if you&rsquo;d like to help us catch regressions across releases.
            When enabled, it sends only: the app version, a small set of pass/fail booleans from
            internal health checks, and a randomly generated install ID that isn&rsquo;t tied to
            your name or email. It never includes your thoughts, messages, contacts, documents,
            or any other content you have put into Thoughtstead. You can turn it off at any time.
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
            Running Thoughtstead involves a small number of providers: our payment provider
            (billing), Vercel (hosting this site and the app, plus anonymous analytics for this
            site), Neon (the database that holds the early access list), Supabase (the database
            your contexts live in), Clerk (sign-in), Cloudflare (the offsite backup copy), and
            OpenRouter, which routes our AI requests (enrichment, search embeddings, answers,
            transcription and speech) to the model providers behind it. If you connect Gmail or
            Calendar, Google is involved as described above. They process data on our
            instructions in order to deliver the service, and none of them is permitted to use
            your content for their own purposes.
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
          <p className="text-sm text-faint">&copy; 2026 Big Freight Life</p>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
