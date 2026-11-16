import { type ReactNode } from 'react';
import Image from 'next/image';
import {
  HOSTED_PRICE,
  HOSTED_PERIOD,
  HOSTED_LIVE,
  ANNUAL_PRICE,
  ANNUAL_PERIOD,
  ANNUAL_SAVING_PERCENT,
  PLAN_NAME,
} from '@/components/cta';
import { EarlyAccessCta, EARLY_ACCESS_SHOWN } from '@/components/early-access-cta';
import { Reveal } from '@/components/reveal';
import { SiteNav, SiteFooter } from '@/components/site-chrome';
import { AnimatedShowcaseCard } from '@/components/animated-showcase-card';
import { LoopVideo } from '@/components/loop-video';

// Positioning rule 5: name the audience by SITUATION, never by label. There is
// no "product manager" and no "founder" here on purpose — including in the
// left-hand column, where naming the roles this ISN'T for would put the exact
// words the rule forbids onto the page.
//
// Each right-hand answer is bound by the EVIDENCE RULE: the Value Matrix runs a
// real confusion matrix against a human baseline; decisions are stored with the
// meeting and the thinking that produced them; a concept holds the storyboard
// and the typed system as one record; outbound agent work parks for approval in
// the database rather than in a prompt; and home is its own isolated context.
// Nothing here is a capability invented to make a row balance.
//
// Phrases are kept to one line each. The two columns are a grid rather than two
// lists so that row N on the left always sits level with row N on the right —
// two independent <ul>s drift apart the moment one phrase wraps.
//
// Say it the way a person says it. Every row was rewritten on 2026-09-04 after
// "Nobody costed a false positive" — nobody says "costed", and it was not the
// only one: "outbound", "parks", "the story and the system", and a "renewal"
// that "does not wait for the sprint" were all house shorthand read back as if
// it were English. The left cell now says what actually happens in the week and
// the right cell answers in a full clause, so each row reads straight through
// its head: your week / in Thoughtstead.
//
// "In your head" was also dropped here — the hero and the operating band both
// use it, and three of them on one page is a tic.
const TRANSFORMATION_STEPS = [
  {
    number: '01',
    title: 'Frame the challenge',
    body: 'Clarify who needs to make progress, what gets in their way, and how the organization works today.',
    artifact: 'Positioning · People · Systems',
  },
  {
    number: '02',
    title: 'Design the experience',
    body: 'Connect the moments people move through to the processes and systems that make each one possible.',
    artifact: 'Concepts · Process · Value',
  },
  {
    number: '03',
    title: 'Prepare the change',
    body: 'Make assumptions, risks, responsibilities, and next steps visible before the new experience reaches people.',
    artifact: 'Governance · Validation · Delivery',
  },
];

const GOVERNANCE_PILLARS = [
  ['Make the boundaries explicit', 'Define what an AI system may access and what it must not do unattended.'],
  ['Keep the reasoning reviewable', 'Tie decisions and recommendations to the evidence and assumptions behind them.'],
  ['Keep consequential actions accountable', 'Outbound or destructive agent work waits for a person to approve it.'],
];

const FOUNDATIONS = [
  ['Capture anywhere', 'Voice, text, meetings and documents go in raw first, so nothing is lost before it is understood.'],
  ['A workspace per client', 'Each client, company or product gets its own isolated context. Search and agents never cross the wall.'],
];

const DESKTOP_POINTS = [
  ['Capture the room', 'Record and transcribe the meeting you are in, or any audio your Mac is playing.'],
  ['One keystroke away', 'Live in the menu bar and get a thought down before it is gone.'],
  ['Your own AI, built in', 'Use the Claude Code or Codex you already pay for, inside Thoughtstead’s own tools.'],
];

// The card had a price and a dead button and nothing else, so two thirds of it
// was empty and a decorative wedge had been drawn across the gap to fill it.
// These are what the plan carries, and they are the reason the card is a card.
const INCLUDES = [
  ['Every surface', 'The studio, and the rest of it'],
  ['AI included', 'Search and enrichment need no API key. Or bring your own Claude Code or Codex'],
  ['Every context', 'As many as the things you run'],
  ['Guests', 'Comment on a concept without a seat'],
  ['Export', 'Everything, one click, any time'],
];

const FAQS = [
  {
    q: 'Why not keep this work in Figma, Linear and Notion?',
    a: 'Because each one holds a part, while the decision depends on the whole. Thoughtstead connects the concept, the system behind it, the evidence and the cost of being wrong.',
  },
  {
    q: 'How are AI actions kept accountable?',
    a: 'Agents prepare the work. Anything that sends or deletes waits for you to approve it, and every step leaves a record.',
  },
  {
    q: 'Who is Thoughtstead for?',
    a: 'Anyone who has to work out how an AI capability will fit into real work, with clients or colleagues waiting on the answer. It holds the people it affects, the process it changes, the system behind it, and who stays accountable.',
  },
  {
    q: 'Can I use my own AI?',
    a: 'Yes. The Claude Code or Codex you already use can work inside Thoughtstead, with only Thoughtstead’s tools. It reads your workspace and makes changes you can see. Anything that sends or deletes waits for your approval.',
  },
  {
    q: 'Is there a desktop app?',
    a: 'Yes, for Mac first, with Windows to follow. It records the meeting you are in, lives in the menu bar, and runs your own AI. Everything it does is also in the browser.',
  },
  {
    q: 'Can I bring clients and collaborators into the work?',
    a: 'Share a concept with a read-only link so guests can review it and leave comments without needing a paid seat.',
  },
];

function Section({ id, children, className = '', wide = false }: {
  id?: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-6 py-20 md:py-28 ${className}`}>
      <div className={`mx-auto ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>{children}</div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="hero human-hero experience-hero relative overflow-hidden px-6">
          <Image
            src="/hero-product-lead-hd-retouched.webp"
            alt="A product lead working across a desktop, notebook, and research materials"
            fill
            priority
            sizes="100vw"
            className="human-hero-media"
          />
          <div className="human-hero-wash" aria-hidden="true" />
          <div className="hero-grid relative mx-auto w-full max-w-7xl">
            <div className="hero-copy">
              <h1 className="hero-title display">Design the experience around AI.</h1>
              <p className="hero-deck">
                Thoughtstead is one connected workspace for deciding how AI changes the
                work: the people it affects, the processes it touches, and the systems behind it.
              </p>
              <div className={`hero-actions ${EARLY_ACCESS_SHOWN ? 'hero-actions-early' : ''}`}>
                <EarlyAccessCta placement="hero" anchor />
                <div
                  className="hero-plan-lockup"
                  aria-label={`${HOSTED_PRICE} per ${HOSTED_PERIOD}. One plan. Export any time.`}
                >
                  <p><strong>{HOSTED_PRICE}</strong><span>/{HOSTED_PERIOD}</span></p>
                  <div><span>One plan</span><span>Export any time</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatedShowcaseCard />

        <Section id="product" className="transformation-path-section" wide>
          <div className="transformation-path-intro">
            <h2 className="h2">From a complex challenge to a change people can use.</h2>
            <p>Keep the strategic intent connected to the experience, the operating model, and the work of making it real.</p>
          </div>
          <div className="transformation-step-grid">
            {TRANSFORMATION_STEPS.map((step) => (
              <article className="transformation-step" key={step.number}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <section id="design" className="design-conditions-section">
          <div className="design-conditions-hero">
            <div className="design-conditions-code-backdrop" aria-hidden="true" />
            <div className="design-conditions-copy">
              <h2 className="h2"><span>AI doesn’t enter</span><span>a blank space.</span></h2>
              <p>Understand the human work and the systems around it. Then design where AI belongs, what it changes, and where people stay in control.</p>
            </div>
          </div>
        </section>

        <Section className="governance-section" wide>
          <div className="governance-intro">
            <h2 className="h2">Everything the work needs. Nothing happens without you.</h2>
            <p>One workspace holds the work, with authority and responsibility built in from the start.</p>
          </div>
          <LoopVideo
            className="governance-video"
            wide={{
              webm: '/governance-accountability.webm',
              mp4: '/governance-accountability.mp4',
              poster: '/governance-accountability-poster.jpg',
            }}
            phone={{
              webm: '/governance-accountability-portrait.webm',
              mp4: '/governance-accountability-portrait.mp4',
              poster: '/governance-accountability-portrait-poster.jpg',
            }}
          />
          <div className="governance-captions">
            {GOVERNANCE_PILLARS.map(([title, body]) => (
              <div className="governance-caption" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="governance-also">
            {FOUNDATIONS.map(([title, body]) => (
              <div className="governance-caption" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="desktop" className="desktop-section" wide>
          <div className="desktop-grid">
            <div className="desktop-copy">
              <h2 className="h2">Built for the desktop. Open on the web.</h2>
              <p className="desktop-lead">
                The desktop app is where Thoughtstead works hardest. Everything it does is also
                in your browser, with the same workspaces and the same pages.
              </p>
              <ul className="desktop-points">
                {DESKTOP_POINTS.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </li>
                ))}
              </ul>
              <p className="desktop-note">Mac first, with Windows to follow. Launching soon.</p>
            </div>
            <div className="desktop-shot">
              <Image
                src="/desktop-home-today.jpg"
                alt="The Thoughtstead Today screen: open project tabs, the daily brief, a question bar, and the decisions awaiting you"
                width={1800}
                height={1125}
                sizes="(min-width: 1024px) 56vw, 100vw"
              />
            </div>
          </div>
        </Section>

        <Section id="price" className="price-section" wide>
          <div className="price-intro">
            <Reveal>
              <h2 className="h2">
                No tiers. No trial. <span className="quote">No hostage data.</span>
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p>One subscription for the design workspace, hosted AI, project work, and client delivery.</p>
            </Reveal>
          </div>

          <Reveal className="price-card" delay={90}>
            <div className="price-offer">
              {/* .price-card-head and an <h3> carrying the plan name are both
                  asserted in e2e — one guards that the plan is named, the other
                  that the page states availability rather than implying it. */}
              <div className="price-card-head">
                <h3>{PLAN_NAME}</h3>
                <p>{HOSTED_LIVE ? 'Available now' : 'Launching soon'}</p>
              </div>
              <p className="price-figure">{HOSTED_PRICE}<span>/{HOSTED_PERIOD}</span></p>
              <p className="price-annual">
                or {ANNUAL_PRICE}/{ANNUAL_PERIOD} &mdash; save {ANNUAL_SAVING_PERCENT}%
              </p>
              <div className="price-action"><EarlyAccessCta placement="pricing" mode="link" /></div>
            </div>

            <ul className="price-includes">
              {INCLUDES.map(([term, detail]) => (
                <li key={term}>
                  <strong>{term}</strong>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="h2">Questions before you begin.</h2>
            </Reveal>
            <div className="faq-list md:col-span-6 md:col-start-7">
              {FAQS.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 30}>
                  <details className="faq-item group">
                    <summary>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <strong>{faq.q}</strong>
                      <i aria-hidden="true">+</i>
                    </summary>
                    <p>{faq.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <section className="final-cta">
          <div className="final-cta-panel">
            <Reveal className="final-cta-inner">
              <h2 className="display final-cta-title">
                <span>Make the change</span>
                <span>ready to move.</span>
              </h2>
              <div className="final-cta-action"><EarlyAccessCta placement="closing" tone="dark" /></div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
