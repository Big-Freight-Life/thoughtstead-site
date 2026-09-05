import { Fragment, type ReactNode } from 'react';
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
import { AnimatedShowcaseCard } from '@/components/animated-showcase-card';
import { ContextStage } from '@/components/context-stage';
import { OperatingStory } from '@/components/operating-story';
import { ValueMatrixCards } from '@/components/value-matrix-cards';

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
const AUDIENCE = [
  ['Nobody knows what a false alarm costs', 'The Value Matrix prices it against a human baseline'],
  ['Six weeks later, nobody remembers why', 'Every decision keeps the meeting it came from'],
  ['What users see and what’s built stop matching', 'One record holds both, moment tied to component'],
  ['You’re the bottleneck on everything that goes out', 'An agent writes it and waits for your approval'],
  ['The warranty runs out the week you ship', 'Home gets a context of its own'],
];

// The card had a price and a dead button and nothing else, so two thirds of it
// was empty and a decorative wedge had been drawn across the gap to fill it.
// These are what the plan carries, and they are the reason the card is a card.
const INCLUDES = [
  ['Every surface', 'The studio, and the rest of it'],
  ['AI included', 'No API key to manage, no per-token bill'],
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
    q: 'What makes the components “typed”?',
    a: 'Thoughtstead has more than twenty component kinds, but only Model, Prediction and Agent carry the twelve-question contract. They are the three that make a call you may have to defend.',
  },
  {
    q: 'Why call it a life operating system?',
    a: 'Product work is one context, not the whole of your life. Thoughtstead gives each thing you run its own isolated context, while keeping one system for capture, search and agents underneath.',
  },
  {
    q: 'Can I leave?',
    a: 'Yes. There is one plan, no trial, and full export at any time. Your data is not the price of leaving.',
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
        <section className="hero human-hero relative overflow-hidden px-6">
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
              {/* The hero the approved spec specifies, which the page had drifted
                  off. "Get the whole product out of your head" sold storage —
                  the second-brain promise positioning rule 1 rejects in those
                  words — and "out of your head" was the page's tic, said again
                  in the operating band's lead. This states the wedge instead:
                  Figma gives you a canvas, Linear gives you tickets, Notion
                  gives you docs, and none of them will tell you the feature
                  should not ship.

                  TWO ELEMENTS, not two spans in one h1. Both sentences at
                  display size ran to four lines — measured, not guessed: only
                  ~16 characters fit a line at 95px in this 720px column, so
                  each sentence took two of its own. Shortening the second one
                  to fit was tried and rejected; it cost the sentence. Stepping
                  it down in size instead keeps every word.

                  Cobalt, not muted grey. Greying the second line treated the
                  turn as the quiet half, when it is the whole argument — and
                  cobalt is the product's action colour, the compose button,
                  Approve, the selected tab. The deck's "the one that tells
                  you" is its callback. */}
              <h1 className="hero-title display">Everything helps you build it.</h1>
              <p className="hero-turn">Nothing says if you should.</p>
              {/* The deck answers the headline's second line and nothing else.
                  The old one opened on "connects your life at machine speed" —
                  a phrase that survives no reading — and buried the actual
                  answer in its third sentence. "Tells you" is deliberate: it is
                  the headline's own verb handed back. */}
              <p className="hero-deck">
                Thoughtstead is the one that tells you. It holds the brief, the evidence, the
                concept and the system behind it. Then it puts a number on what it costs to
                be wrong.
              </p>
              <div className="hero-actions">
                <HostedCta large />
                <div
                  className="hero-plan-lockup"
                  aria-label={`${HOSTED_PRICE} per ${HOSTED_PERIOD}. One plan. Export any time.`}
                >
                  <p><strong>{HOSTED_PRICE}</strong><span>/{HOSTED_PERIOD}</span></p>
                  <div><span>One plan</span><span>Export any time</span></div>
                </div>
              </div>
            </div>
            <div className="hero-index" aria-label="Product summary">
              <span>01</span>
              <p>Hosted subscription<br />One instance<br />The whole system</p>
            </div>
          </div>
        </section>

        <AnimatedShowcaseCard />

        <Section id="audience" className="audience-section" wide>
          <div className="audience-intro">
            {/* One beat each. The headline used to carry "but the week looks
                the same" and the deck used to open "Thoughtstead isn't built
                for a role" — so the band said "this is a situation, not a role"
                three times and "week" twice before the reader reached a single
                row. The table's own "Your week" head is where the week belongs;
                the headline hooks, the deck defines, the table proves. */}
            <h2>Nobody has this job title.</h2>
          </div>
          <Reveal className="audience-table">
            {/* Three heads were tried and thrown out, all for the same reason:
                "What holds it" and "Held by" made you read a whole row before
                the actor appeared, and "Thoughtstead holds it" named the actor
                but is not how anyone labels a column — a declarative sentence
                with a dangling pronoun over a list.

                "In Thoughtstead" is the plain version. It names the actor, it
                is two words against "Your week", and it completes every row as
                ordinary English: in Thoughtstead, agents draft it and it parks
                for approval. */}
            <h3 className="audience-head">Your week</h3>
            <h3 className="audience-head">In Thoughtstead</h3>
            {AUDIENCE.map(([week, holds]) => (
              <Fragment key={week}>
                <p className="audience-cell" data-label="Your week">{week}</p>
                <p className="audience-cell" data-label="In Thoughtstead">{holds}</p>
              </Fragment>
            ))}
          </Reveal>
        </Section>

        <Section id="product" className="operating-section" wide>
          <OperatingStory />
        </Section>

        <Section id="matrix" className="matrix-section" wide>
          <div className="matrix-intro">
            <div>
              <h2>Put a number on the part everyone is guessing.</h2>
            </div>
          </div>
          <Reveal className="matrix-card-field"><ValueMatrixCards /></Reveal>
        </Section>

        <Section className="contexts-section" wide>
          <div className="contexts-intro">
            <h2>One operating system. Separate worlds.</h2>
            <p>
              Product, company, and household run on the same foundation. Each context is
              isolated, so search and agents never cross the wall between them.
            </p>
          </div>
          <ContextStage />
        </Section>

        <Section id="price" className="price-section" wide>
          <div className="price-intro">
            <Reveal>
              <h2 className="h2">
                No tiers. No trial. <span className="quote">No hostage data.</span>
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p>
                No set team pricing survives contact with your system. Contact us.
              </p>
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
              <div className="price-action"><HostedCta large /></div>
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
              <h2 className="h2">The useful doubts.</h2>
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
                <span>Life is moving too fast</span>
                <span>to be the only one holding it together.</span>
              </h2>
              <div className="final-cta-action"><HostedCta large /></div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
