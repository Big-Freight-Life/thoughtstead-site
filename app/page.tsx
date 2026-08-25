import type { ReactNode } from 'react';
import { HostedCta, HOSTED_PRICE, HOSTED_PERIOD, HOSTED_LIVE } from '@/components/cta';
import { Reveal } from '@/components/reveal';
import Image from 'next/image';
import Link from 'next/link';
import { MediaSlot } from '@/components/media-slot';

// ─────────────────────────────────────────────────────────────────────────────
// POSITIONING — settled over several passes on 2026-08-25. Each rule is a
// mistake already made; read before editing a word.
//
// 1. NOT an "AI second brain". Worn out, borrowed, and it promised recall alone
//    from a product that runs invoices and agents.
// 2. NOT a "business OS". Contested, and it strands /health, /warranties,
//    /maintenance, /lifestyle — which ship.
// 3. It IS a life operating system. Promise is the whole life; proof is
//    business-grade, in that order — nobody subscribes for their life.
// 4. It is NOT about invoices. An invoice is one edge of the graph; leading on
//    it reads as accounting software, which is (2) by another route.
// 5. The point is COMPLETENESS: things move faster than anyone can hold, and
//    today the only thing making a life complete is the person holding it.
// 6. Audience named by SITUATION, never by label. No "solopreneur".
// 7. BALANCE THE HALVES. A long work column beside a short home column says
//    "business tool" however loudly the words claim otherwise.
// 8. KEEP IT SHORT. The previous version ran eight bands and Ray's note was
//    "way too long". Five sections. If something new goes in, something comes
//    out.
//
// EVIDENCE RULE: every concrete claim is an edge or column in the schema —
// ar_invoices→contracts→ar_clients+people, decisions→decision_meetings+
// decision_thoughts, warranties.document_id/expires_at, home_tasks.recurrence,
// research_assignments→agent_tasks→findings→evidence, agent_tasks→
// agent_receipts. capture/deps.ts calls link_thought_people during enrichment,
// which licenses "you wired none of it". A plausible claim no foreign key backs
// is how this page starts lying.
//
// DESIGN: dark, warm, cinematic. Reflect and most of the category run cool
// violet on indigo; warm charcoal with a bright olive hits the same tier of
// polish while being instantly distinguishable — and olive was already the
// brand accent. Do not drift this toward purple.
// ─────────────────────────────────────────────────────────────────────────────

const WORLDS = [
  {
    name: 'Business',
    items: [
      ['Receivable', 'Invoices and line items, per client, against the contract they belong to.'],
      ['Payable', 'Bills and vendors, and what you owe against which agreement.'],
      ['Contracts', 'Renewals, amendments, and every event on the record.'],
      ['Meetings', 'Recorded, transcribed, and tied to what they decided.'],
      ['Decisions', 'Kept with the meeting and the thinking that produced them.'],
      ['Research', 'Hand over a question; get findings back with the evidence attached.'],
    ],
  },
  {
    name: 'Personal',
    items: [
      ['Health', 'Appointments and checkups, and what is actually due.'],
      ['Home & auto', 'Recurring upkeep you would otherwise remember late.'],
      ['Warranties', 'Coverage windows, and the receipt that proves each one.'],
      ['Lifestyle', 'The plans that never survive a busy quarter.'],
      ['Calendar', 'Alongside the rest of it, not in another tab.'],
      ['Documents', 'Filed and categorised on arrival, searchable by meaning.'],
    ],
  },
];

const CHAIN = [
  ['A meeting', 'recorded and transcribed'],
  ['The decision', 'that came out of it'],
  ['The contract', 'that covers the work'],
  ['The client', 'and the person who signed'],
  ['The invoice', 'and what is still owed'],
];

const FAQS = [
  {
    q: 'How is this different from Notion?',
    a: 'Notion gives you the parts and expects you to build the system — every relation wired by hand, every template maintained forever, and it does nothing while you are not looking. Thoughtstead ships the system already built and connects records itself as work lands. It also does what Notion structurally cannot: raise an invoice, track what a client owes against a contract, and act on any of it.',
  },
  {
    q: 'How is this different from my accounting software?',
    a: 'Your books know the number. They do not know the meeting where the scope was agreed, the decision behind the discount, or the person who actually signed. Thoughtstead keeps the invoice attached to all of it — and the books are one surface of it, not the whole product.',
  },
  {
    q: 'What does "life operating system" mean?',
    a: 'That it does not stop at the office door. The same system that tracks what a client owes tracks when your car is due for service and when the warranty on your furnace runs out — one capture, one search, one set of agents doing the follow-through across both.',
  },
  {
    q: 'Does my personal life get mixed into my business?',
    a: 'No. Business and Personal are separate contexts, isolated from each other at the database level. Searching in one never returns the other, and an agent working in one cannot see into the other. Add as many as you need — a second company, a side project, a household.',
  },
  {
    q: 'Do I have to organise any of it?',
    a: 'No, and that is the point. Capture the thing. Enrichment reads it, links the people, projects and decisions it touches, and files it. The graph is built for you, which is the difference between a system that works and a template you maintain.',
  },
  {
    q: 'Is my data private, and can I get it out?',
    a: 'It is yours. We never train on it and never sell it, every context is isolated at the database level, and outbound actions park for your approval rather than firing on their own. Full export, one click, any time, on any plan — the export exists so leaving is cheap.',
  },
];

/* ── primitives ─────────────────────────────────────────────────────────── */

function Section({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* Nav */}
      <div className="sticky top-0 z-40 px-6 pt-5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line-2 bg-surface/80 px-5 py-2.5 backdrop-blur-xl">
          <Link href="/" className="group -my-2 flex items-center gap-2.5 py-2 font-medium" aria-label="Thoughtstead home">
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
            {/* -my-3 py-3: grows the hit area to 44px without changing the
                pill's height or the text position. Measured at 20px tall
                before this — barely half the 44px minimum. */}
            <a href="#worlds" className="-my-3 py-3 transition-colors hover:text-text">Product</a>
            <a href="#price" className="-my-3 py-3 transition-colors hover:text-text">Pricing</a>
            <a href="/docs" className="-my-3 py-3 transition-colors hover:text-text">Docs</a>
          </div>
          <HostedCta />
        </nav>
      </div>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pt-20 pb-24 text-center md:pt-28">
          <div className="aurora" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl">
            <h1 className="display rise" style={{ animationDelay: '60ms' }}>
              You are the only thing{' '}
              <span className="quote">holding it together</span>
            </h1>

            <p
              className="rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: '180ms' }}
            >
              The contract and the furnace warranty. The client who has not paid and the checkup
              you keep moving. Thoughtstead holds all of it, works out how it connects, and
              brings you what the day needs.
            </p>

            <div
              className="rise mt-10 flex flex-col items-center gap-3.5"
              style={{ animationDelay: '300ms' }}
            >
              <HostedCta large />
              {/* Explicit {' '}: JSX trims each line of a multi-line text node, so
                  a literal space beside an expression is dropped and this renders
                  "$20/month· AI included". */}
              <p className="text-sm text-faint">
                {`${HOSTED_PRICE}/${HOSTED_PERIOD}`}
                {' '}
                &middot; AI included &middot; Export any time
              </p>
            </div>
          </div>

          <Reveal className="relative mx-auto mt-20 max-w-6xl">
            <MediaSlot
              id="hero-film"
              kind="video"
              ratio="hero"
              brief="Silent 20-30s loop. One spoken capture on the Mac landing, enriching, and appearing already linked to a person, a project and a contract. It has to show the graph building itself."
            />
          </Reveal>
        </section>

        {/* ── Two worlds ───────────────────────────────────────────────── */}
        <Section className="border-t border-line">
          <div id="worlds" className="scroll-mt-28" />
          <Reveal className="max-w-3xl">
            <h2 className="display text-[length:var(--h2)] leading-[1.03]">
              Your company and{' '}
              <span className="quote">the rest of your life</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Nothing else will hold both. Your books do not know the meeting. Your notes app has
              never chased a payment. And none of them want the furnace warranty at all — so it
              lives in your head with everything else.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {WORLDS.map((w, wi) => (
              <Reveal key={w.name} delay={wi * 90} className="frame p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <span className="size-1.5 rotate-45 bg-accent" aria-hidden="true" />
                  <h3 className="text-lg font-medium">{w.name}</h3>
                </div>
                <dl className="mt-7 space-y-5">
                  {w.items.map(([term, desc]) => (
                    <div key={term}>
                      <dt className="text-[0.95rem] font-medium">{term}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted">{desc}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 flex flex-col gap-4 rounded-2xl border border-line-2 bg-accent-soft p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl leading-relaxed">
              They never touch. A context is isolated at the database level — search in one never
              returns the other, and an agent in one cannot see into the other.
            </p>
            <span className="eyebrow shrink-0 text-accent">The wall</span>
          </Reveal>

          <Reveal className="mt-14" delay={60}>
            <MediaSlot
              id="context-switch"
              kind="video"
              ratio="wide"
              brief="8-12s. The context switcher moving Business to Personal, the whole nav and every record changing with it. Nobody believes the wall until they watch it happen."
            />
          </Reveal>
        </Section>

        {/* ── It connects itself ───────────────────────────────────────── */}
        <Section className="border-t border-line">
          <div className="grid gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="display text-[length:var(--h2)] leading-[1.03]">
                You wired{' '}
                <span className="quote">none of it</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Capture the thing and enrichment does the rest — reading it, linking the people and
                projects it touches, filing it where it belongs. Ask why you decided something in
                March and you get the meeting it came out of and the thinking behind it.
              </p>
            </Reveal>

            <div className="md:col-span-6 md:col-start-7">
              {CHAIN.map(([head, tail], i) => (
                <Reveal key={head} delay={i * 70} className="flex items-start gap-5">
                  <div className="flex flex-col items-center" aria-hidden="true">
                    <span className="mt-2.5 block size-1.5 shrink-0 rotate-45 bg-accent" />
                    {i < CHAIN.length - 1 && <span className="w-px flex-1 bg-line-2" />}
                  </div>
                  <p className="pb-6 text-[1.05rem] leading-relaxed">
                    <span className="font-medium">{head}</span>{' '}
                    <span className="text-muted">{tail}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ── It does the work ─────────────────────────────────────────── */}
        <Section className="border-t border-line">
          <div className="grid items-center gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="display text-[length:var(--h2)] leading-[1.03]">
                And it shows{' '}
                <span className="quote">the receipts</span>
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Brief me on this morning. Chase what is overdue. Find out what we know about this
                  company. Every step an agent takes leaves a record you can read back.
                </p>
                <p>
                  <span className="text-text">Nothing leaves without your approval.</span> Anything
                  outbound parks in a queue with its proposal attached — enforced in the database,
                  not requested in a prompt.
                </p>
              </div>
            </Reveal>
            <Reveal className="md:col-span-6 md:col-start-7" delay={80}>
              <MediaSlot
                id="approval-queue"
                kind="image"
                ratio="wide"
                brief="The approval queue with one outbound draft parked in it — proposal visible, Approve and Decline in reach."
              />
            </Reveal>
          </div>

          <div className="mt-20 grid items-center gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-6 md:order-2">
              <h2 className="display text-[length:var(--h2)] leading-[1.03]">
                It starts on{' '}
                <span className="quote">your Mac</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                A browser tab cannot sit in your meeting and listen. The Mac app records what is
                said, transcribes it, and files it against the client it belongs to. The web app is
                there for a machine that is not yours.
              </p>
            </Reveal>
            <Reveal className="md:col-span-5 md:order-1" delay={80}>
              <MediaSlot
                id="mac-capture"
                kind="image"
                ratio="square"
                brief="The Mac app mid-meeting: live transcription running, quick-capture open over it. Real desk, real light."
              />
            </Reveal>
          </div>
        </Section>

        {/* ── Price ────────────────────────────────────────────────────── */}
        <Section className="border-t border-line">
          <div id="price" className="scroll-mt-28" />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="display text-[length:var(--h2)] leading-[1.03]">
                No tiers, no{' '}
                <span className="quote">asterisk</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Hosting, AI usage and every context you need are in the price. No API key to
                manage, no per-token bill, no second tier waiting to upsell you — and no charge to
                leave with everything.
              </p>
            </Reveal>

            <Reveal delay={80} className="frame p-9 text-center">
              <h3 className="text-lg font-medium">Hosted</h3>
              <p className="mt-1 text-sm text-faint">
                {HOSTED_LIVE ? 'Available now' : 'Launching soon'}
              </p>
              <p className="display mt-6 text-6xl">
                {HOSTED_PRICE}
                <span className="ml-1 align-middle text-base font-normal text-faint">
                  /{HOSTED_PERIOD}
                </span>
              </p>
              <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left text-sm text-muted">
                {[
                  'The whole system, business and personal',
                  'AI usage, no API key to manage',
                  'As many contexts as you need',
                  'Full export, any time',
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex justify-center">
                <HostedCta large />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <Section className="border-t border-line">
          <div className="grid gap-12 md:grid-cols-12">
            {/* The live browser reported this heading overflowing its column at
                col-span-4 / full --h2. It could NOT be reproduced under
                Playwright at any width (text 418px inside a 452px box), so the
                cause is a web-font metric difference between the two, and the
                overflow is real in a real browser. Wider column AND a smaller
                clamp: a sidebar heading does not need full display scale, and
                the column alone would break again the moment the copy changes. */}
            <Reveal className="md:col-span-5">
              <h2 className="display text-[clamp(1.85rem,3.1vw,2.6rem)] leading-[1.06]">
                Reasonable{' '}
                <span className="quote">doubts</span>
              </h2>
            </Reveal>
            <div className="md:col-span-6 md:col-start-7">
              {FAQS.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 30}>
                  <details className="group border-b border-line">
                    {/* Padding lives on the summary, not the details: the
                        summary is what receives the tap, and it measured 26px
                        tall with the padding on its parent. */}
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-medium">
                      {faq.q}
                      <span
                        className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="-mt-1 max-w-2xl pb-5 text-[0.95rem] leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Close ────────────────────────────────────────────────────── */}
        <Section className="relative overflow-hidden border-t border-line text-center">
          <div className="aurora" aria-hidden="true" />
          <Reveal className="relative">
            <h2 className="display mx-auto max-w-3xl text-[length:var(--h2)] leading-[1.03]">
              Stop being the only thing{' '}
              <span className="quote">holding it together</span>
            </h2>
            <div className="mt-9 flex justify-center">
              <HostedCta large />
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
          {/* Same 44px floor as the header. These are the only tappable things
              on the page at phone width once the header nav is hidden, and they
              measured 20px tall. */}
          <nav className="-my-3 flex gap-6">
            <a href="/docs" className="py-3 transition-colors hover:text-text">Docs</a>
            <a href="/privacy" className="py-3 transition-colors hover:text-text">Privacy</a>
            <a href="/terms" className="py-3 transition-colors hover:text-text">Terms</a>
            <a href="mailto:support@bfl.design" className="py-3 transition-colors hover:text-text">
              Support
            </a>
          </nav>
          <p>&copy; 2026 Big Freight Life</p>
        </div>
      </footer>
    </>
  );
}
