import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  HostedCta,
  HOSTED_PRICE,
  HOSTED_PERIOD,
  HOSTED_LIVE,
  ANNUAL_PRICE,
  ANNUAL_PERIOD,
  ANNUAL_SAVING_PERCENT,
  PLAN_NAME,
} from '@/components/cta';
import { Reveal } from '@/components/reveal';
import { SiteNav, SiteFooter } from '@/components/site-chrome';
import { ValueMatrixDemo } from '@/components/value-matrix-demo';
import { ConceptSwitch } from '@/components/concept-switch';
import { ProofCards } from '@/components/proof-cards';
import { ContextStage } from '@/components/context-stage';
import LandingPage from '@/components/landing-page';

// ─────────────────────────────────────────────────────────────────────────────
// POSITIONING — settled 2026-08-25, audience changed 2026-09-03. Each rule is a
// mistake already made; read before editing a word. Full reasoning:
// system-1 docs/superpowers/specs/2026-09-03-marketing-site-product-definition-design.md
//
// 1. NOT an "AI second brain". Worn out, borrowed, and it promised recall alone
//    from a product that runs agents and decides what to build.
// 2. NOT a "business OS". Contested, and it strands /health, /warranties,
//    /maintenance, /lifestyle — which ship.
// 3. It IS a life operating system. Promise is the whole life; proof is the
//    work, in that order.
// 4. AUDIENCE (changed 2026-09-03, Ray): product people building AI features
//    and AI systems. The previous audience was a solo business operator, and
//    the page still read that way — "the board pack and the boiler service".
//    That person is no longer who this is written for.
// 5. Named by SITUATION, never by label. No "PM", no "product designer", no
//    "solopreneur".
// 6. The point is COMPLETENESS: every piece of the thing you are building sits
//    in a different tool and none of them talk to each other.
// 7. RETIRED 2026-09-03 — "balance the halves". It existed to stop a long work
//    column beside a short home column reading as a business tool. The page is
//    no longer built from two columns. What replaces it: the life half gets one
//    whole band (Elsewhere) and is never a footnote — but it does not lead.
// 8. RETIRED 2026-09-03 — "keep it short, five sections". Ray: "the length
//    doesn't matter if it's on point and on the level with the award winning
//    apps." Replaced by: EVERY BAND HAS ITS OWN MECHANIC. Length was never the
//    failure mode; nine repetitions of <Reveal> around a bordered card was. A
//    band that cannot justify a distinct visual or interactive idea comes out.
//
// EVIDENCE RULE: every concrete claim is an edge or column in the schema —
// decisions→decision_meetings+decision_thoughts, thought_projects,
// design_concepts, agent_tasks→agent_receipts, warranties.document_id/
// expires_at, home_tasks.recurrence. capture/deps.ts calls link_thought_people
// during enrichment, which licenses "you wired none of it". A plausible claim
// no foreign key backs is how this page starts lying.
//
// TWO CLAIMS REMOVED 2026-09-03, both false by then:
//   - "Payable". There is no /ap route in the app and no /ap in NAV_ITEMS.
//   - "It starts on your Mac." Reversed by the web-first direction adopted
//     2026-09-03. The web app is the product; the Mac does what a browser
//     cannot, which is one sentence, not a band.
//
// DESIGN: dark, warm, cinematic. Deep charcoal with a bright olive. Reflect and
// most of the category run cool violet on indigo. Do not drift toward purple.
// ─────────────────────────────────────────────────────────────────────────────

// The pain, before any product. Haven's site spends three bands here and it is
// the reason their page works — you cannot feel relief from a problem nobody
// named. Ours is the same move aimed at a different ache: not "you forgot to
// buy milk" but "you shipped it and cannot say why".
//
// Three lines, big, no cards. It exists to buy the next band its impact.
const SOUND_FAMILIAR = [
  'You shipped it, and you still could not say why it was the right call.',
  'Nobody costed a false positive. Nobody agreed what it may do unattended.',
  'Six weeks of research, and the brief still gets re-derived in the meeting.',
];

// Named by SITUATION, never by label — rule 5. Haven runs four persona cards
// ("The Overwhelmed Parent", "The Caregiver") and they are the clearest thing
// on their page; the device is right even though their labels break our rule.
// Everything the subscription holds, in one compact band rather than the six it
// used to take. Studio first, because that is what the audience came for.
const HOLDS = [
  {
    name: 'The studio',
    items: [
      ['Research', 'What you have read, by sector, searchable by meaning.'],
      ['Positioning', 'A brief that stops being re-derived, and stays current.'],
      ['Concepts', 'The story and the system, one record, linked moment to component.'],
      ['Value Matrix', 'Whether it should exist, in what it costs when it is wrong.'],
      ['AI Security', 'What it may touch. What it must never do unattended.'],
      ['Gallery', 'The deck, the one-pager, the thing you actually show someone.'],
    ],
  },
  {
    name: 'And the rest of it',
    items: [
      ['Meetings', 'Recorded, transcribed, and tied to what they decided.'],
      ['Decisions', 'Kept with the meeting and the thinking that produced them.'],
      ['Documents', 'Filed and categorised on arrival, searchable by meaning.'],
      ['Agents', 'They brief, chase and research. Outbound parks for approval.'],
      ['Receivable', 'Invoices and line items, against the contract they belong to.'],
      ['Home', 'Health, upkeep and warranties, in a context of their own.'],
    ],
  },
];

const FAQS = [
  {
    q: 'How is this different from Figma or Miro?',
    a: 'A canvas will hold your drawing. It will not tell you the feature costs more in missed cases than it saves, or which component is making a call you will have to defend. Thoughtstead’s components are typed, so the questions can be asked of them.',
  },
  {
    q: 'How is this different from Linear or Notion?',
    a: 'Linear tracks work already decided on; this is where it gets decided. Notion gives you the parts and expects you to build the system, then does nothing while you are not looking. Thoughtstead ships the system built, and connects records itself as work lands.',
  },
  {
    q: 'Why does a tool for building products have my warranties in it?',
    a: 'Because your life does not stop while you ship. Each thing you run is a separate context, isolated at the database level — search in one never returns the other. One brain and one search, not one inbox for everything.',
  },
  {
    q: 'Can I bring people in who do not have an account?',
    a: 'Yes. A share link puts someone on the real concept — the same surfaces, read-only — with presence, cursors, and comments pinned to the point on the canvas they are about. Signing in through it grants no membership.',
  },
  {
    q: 'Is my data private, and can I get it out?',
    a: 'It is yours. We never train on it and never sell it, and outbound actions park for your approval rather than firing on their own. Full export, one click, any time — the export exists so leaving is cheap.',
  },
];

/* ── primitives ─────────────────────────────────────────────────────────── */

function Section({
  id,
  children,
  className = '',
  wide = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    // scroll-mt clears the sticky nav. It lives here so the offset is defined
    // once; both anchors used to be empty sentinel divs planted inside the
    // section body, each carrying its own copy of that number.
    <section id={id} className={`relative scroll-mt-24 px-6 py-20 md:py-24 ${className}`}>
      <div className={`mx-auto ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>{children}</div>
    </section>
  );
}

/* ── page ───────────────────────────────────────────────────────────────── */

export default function Home() {
  if (process.env.NEXT_PUBLIC_LEGACY_LANDING !== '1') {
    return <LandingPage />;
  }

  return (
    <>
      <SiteNav />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="hero human-hero relative overflow-hidden border-b border-line px-6 py-12 md:py-16">
          <Image
            src="/hero-human-v2.png"
            alt="A product lead pausing over a notebook while considering a decision"
            fill
            priority
            sizes="100vw"
            className="human-hero-image object-cover"
          />
          <div className="human-hero-wash" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="max-w-[46rem]">
              <p className="eyebrow mb-5 text-[var(--warning-text)]">
                Thoughtstead / Life operating system
              </p>
              <h1 className="hero-title display max-w-5xl">
                Everything helps you build it.{' '}
                <span className="hero-accent">Nothing tells you if you should.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                A life operating system for people shipping AI features — where you work out
                what the thing costs when it is wrong, and where everything you learn doing it
                stays connected.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3.5">
                <HostedCta large />
              {/* Explicit {' '}: JSX trims each line of a multi-line text node, so
                  a literal space beside an expression is dropped and this renders
                  "$19.99/month· AI included". */}
                <p className="text-sm text-faint">
                {`${HOSTED_PRICE}/${HOSTED_PERIOD}`}
                {' '}
                &middot; AI included &middot; Export any time
                </p>
              </div>
            </div>
            <div className="hero-proof mt-10 grid max-w-[42rem] grid-cols-3 border-y border-line py-4">
              <div><strong>7</strong><span>surfaces, one method</span></div>
              <div><strong>3</strong><span>contract-bearing types</span></div>
              <div><strong>1</strong><span>context at a time</span></div>
            </div>
          </div>
        </section>

        {/* ── Product cards ───────────────────────────────────────────── */}
        <Section className="bg-[var(--shell)]" wide>
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-accent">The product / already moving</p>
              <h2 className="display mt-4 text-[length:var(--h2)] leading-[.98]">
                Not feature cards.{' '}
                <span className="quote">Working models.</span>
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted lg:justify-self-end">
              Four parts of the system, reduced without turning them into decoration. Each
              animation shows a real rule the product enforces.
            </p>
          </div>
          <ProofCards />
        </Section>

        {/* ── The large context card ─────────────────────────────────── */}
        <Section className="context-stage-section overflow-hidden" wide>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="eyebrow text-[var(--success)]">One system / separate worlds</p>
            <h2 className="display mt-4 text-[length:var(--h2)] leading-[.98]">
              Watch the whole instrument{' '}
              <span className="quote">change with the context.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Product, company and household share a brain underneath. They do not share
              records, search results, or what an agent is allowed to see.
            </p>
          </div>
          <ContextStage />
        </Section>

        {/* ── 1. Sound familiar ────────────────────────────────────────── */}
        <Section>
          <Reveal>
            <p className="eyebrow text-accent">Sound familiar</p>
          </Reveal>
          <div className="mt-8 max-w-4xl">
            {SOUND_FAMILIAR.map((line, i) => (
              <Reveal key={line} delay={i * 90}>
                <p className="display border-t border-line py-7 text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.22]">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 2. The Value Matrix, playable ────────────────────────────── */}
        <Section id="matrix" className="relative border-t border-line" wide>
          <div className="halo" aria-hidden="true" />
          <Reveal className="relative max-w-2xl">
            <p className="eyebrow text-accent">Not a claim. The working.</p>
            <h2 className="display mt-3 text-[length:var(--h2)] leading-[1.03]">
              Move the numbers.{' '}
              <span className="quote">Watch the answer change</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Everything else in this category will tell you it remembers, understands and
              acts. None of it shows you the working. This is Thoughtstead&rsquo;s Value
              Matrix, running on this page — the question every AI feature turns on and
              almost nobody writes down.
            </p>
          </Reveal>

          <Reveal className="mt-10" delay={60}>
            <ValueMatrixDemo />
          </Reveal>
        </Section>

        {/* ── 3. One concept, two ways ─────────────────────────────────── */}
        <Section id="worlds" className="border-t border-line bg-[var(--shell)]">
          <Reveal className="max-w-2xl">
            <h2 className="display text-[length:var(--h2)] leading-[1.03]">
              One concept. The story,{' '}
              <span className="quote">and the system</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Not two documents that drift apart. Each moment names the components that serve
              it, and each component knows which moments it is for.
            </p>
          </Reveal>

          <Reveal className="frame mt-10 p-6 md:p-9" delay={60}>
            <ConceptSwitch />
          </Reveal>
        </Section>

        {/* ── 4. Everything else it holds ──────────────────────────────── */}
        <Section className="border-t border-line bg-[var(--shell)]">
          <Reveal className="max-w-2xl">
            <h2 className="display text-[length:var(--h2)] leading-[1.03]">
              And you wired{' '}
              <span className="quote">none of it</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Capture the thing and enrichment links the people, projects and decisions it
              touches. Ask why you decided something in March and you get the call it came
              out of and the thinking behind it.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {HOLDS.map((group, gi) => (
              <Reveal key={group.name} delay={gi * 80}>
                <div className="flex items-center gap-3">
                  <span className="size-1.5 rotate-45 bg-accent" aria-hidden="true" />
                  <h3 className="text-lg font-medium">{group.name}</h3>
                </div>
                <dl className="mt-5">
                  {group.items.map(([term, desc]) => (
                    <div key={term} className="border-t border-line py-3.5">
                      <dt className="text-[0.95rem] font-medium">{term}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-muted">{desc}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col gap-4 rounded-2xl border border-line-2 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl leading-relaxed">
              Each thing you run is a context of its own, and they never touch — search in
              one never returns the other, and an agent in one cannot see into the other.
            </p>
            <span className="eyebrow shrink-0 text-accent">The wall</span>
          </Reveal>
        </Section>

        {/* ── 6. Price ─────────────────────────────────────────────────── */}
        <Section id="price" className="border-t border-line">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="display text-[length:var(--h2)] leading-[1.03]">
                No tiers, no{' '}
                <span className="quote">asterisk</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Hosting, AI usage and every context you need are in the price. No API key to
                manage, no per-token bill, and no charge to leave with everything.
              </p>
            </Reveal>

            <Reveal delay={80} className="frame p-8 text-center">
              <h3 className="text-lg font-medium">{PLAN_NAME}</h3>
              {/* Never claim availability above a button nobody can press. */}
              <p className="mt-1 text-sm text-faint">
                {HOSTED_LIVE ? 'Available now' : 'Launching soon'}
              </p>
              <p className="display mt-5 text-6xl">
                {HOSTED_PRICE}
                <span className="ml-1 align-middle text-base font-normal text-faint">
                  /{HOSTED_PERIOD}
                </span>
              </p>
              <p className="mt-3 text-sm text-muted">
                or {ANNUAL_PRICE}/{ANNUAL_PERIOD}
                {' '}
                <span className="text-accent">&mdash; save {ANNUAL_SAVING_PERCENT}%</span>
              </p>
              <ul className="mx-auto mt-7 max-w-xs space-y-2.5 text-left text-sm text-muted">
                {[
                  'Every surface — the studio and the rest of it',
                  'AI usage, no API key to manage',
                  'As many contexts as you need',
                  'Guests can comment without a seat',
                  'Full export, any time',
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center">
                <HostedCta large />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
        <Section className="border-t border-line">
          <div className="grid gap-10 md:grid-cols-12">
            {/* The live browser reported this heading overflowing its column at
                col-span-4 / full --h2, unreproducible under Playwright at any
                width — a web-font metric difference between the two. Wider
                column AND a smaller clamp: the column alone would break again
                the moment the copy changed. */}
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
        <Section className="relative overflow-hidden border-t border-line bg-[var(--shell)] text-center">
          <div className="aurora" aria-hidden="true" />
          <Reveal className="relative">
            <h2 className="display mx-auto max-w-3xl text-[length:var(--h2)] leading-[1.03]">
              Stop being the only thing{' '}
              <span className="quote">holding it together</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <HostedCta large />
            </div>
          </Reveal>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
