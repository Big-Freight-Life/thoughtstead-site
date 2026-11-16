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
const SITUATIONS = [
  {
    title: 'You’ve been asked the question.',
    body: 'A leader wants AI in the work and you have to say where it belongs, where it doesn’t, and why, with evidence rather than enthusiasm. And then you have to make it stick.',
  },
  {
    title: 'You run engagements for clients.',
    body: 'You take a client from a vague ask to a working system and a team that uses it. You need the findings, the business case, the training, the pilot and the adoption plan in one place, one workspace per client.',
  },
  {
    title: 'You do the same work inside a company.',
    body: 'Same questions, same decisions, for your own teams. The workspace doesn’t care which side of the contract you’re on.',
  },
];

// The product’s own eight phases (consulting/phases/registry.ts), in its order.
// Four of the eight are the people side, which is the point of the section.
const PHASES = [
  ['Identify objectives', 'Diagnose where the client is and state the objective the engagement serves.'],
  ['Map processes', 'Stakeholders, processes, shadow AI use, and five dimensions of maturity.'],
  ['Prioritize opportunities', 'Score a first wave, and keep a deferred list with the conditions for bringing each back.'],
  ['Activate training', 'Role-based capability that starts before go-live and completes at it.'],
  ['Construct pilots', 'One pilot, real cases, the real workflow, written gates through a day-90 value gate.'],
  ['Trace governance', 'An AI inventory, monitoring, the obligations that apply, an acceptable-use policy, sized to the client.'],
  ['Accelerate adoption', 'Champions, redesigned workflows, change communication that says who does what, measured uptake.'],
  ['Iterate and scale', 'Permanent capability, controlled steps in autonomy, the next wave.'],
];

// Value Matrix: human baseline, break-even and the "most serious error" with its
// "recommended human control" all exist in the app (value-matrix/calculations.ts,
// decision-panel.tsx). The sensitivity view is deliberately NOT claimed: not
// confirmed user-visible.
const VALUE_POINTS = [
  ['Against a human baseline', 'Measured against what people do today, not against zero.'],
  ['Break-even', 'The point at which the AI starts to pay for itself.'],
  ['The most serious error', 'Named, with the human control that catches it.'],
];

// Outside the app, so each link was checked live on 2026-11-16 (200). The
// Framework Lab is NOT linked: bfl.design/course redirects to learn.bfl.design,
// which has no DNS record, and its CLI is marked unpublished. Re-check before
// adding it.
const FRAMEWORK_LINKS = [
  ['The BFL Framework', 'The method, chapter by chapter: capability, decisions, workflow, governance, authority and trust.', 'https://bfl.design/framework'],
  ['AI Experience Architecture', 'The discipline in short: the experience is the relationship with the system in operation, and AI is now part of it.', 'https://raybutler.bfl.design/ai-experience-architecture'],
  ['Learn with BFL', 'Programs, the primer and the tool index from Big Freight Life.', 'https://bfl.design/learn'],
];

const GOVERNANCE_PILLARS = [
  ['Make the boundaries explicit', 'You choose how much your own AI may do.'],
  ['Keep the reasoning reviewable', 'Every decision keeps what was known and why.'],
  ['Keep consequential actions accountable', 'Approvals and an audit trail record who allowed what.'],
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
    q: 'What is Thoughtstead?',
    a: 'The workspace for AI Experience Architecture. It holds an engagement from the first question to a team that is running the system.',
  },
  {
    q: 'Is it only for deciding whether to do an AI project?',
    a: 'No. That is the first third. It also covers training, the pilot, governance, change management and the next wave.',
  },
  {
    q: 'Who is Thoughtstead for?',
    a: 'People who have to make AI work for the people who use it: consultants and architects with clients, and teams doing the same work inside a company.',
  },
  {
    q: 'How is it different from Figma, Linear or Notion?',
    a: 'Those hold screens, tickets and documents. This holds the reasoning, the roles, the training and the approvals around an AI system, and it knows the shape of an engagement.',
  },
  {
    q: 'How are AI actions kept accountable?',
    a: 'Agents prepare the work. Anything that sends or deletes waits for you to approve it, and every step leaves a record.',
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
          {/* The hero photo was removed here: CSS hid it (.experience-hero
              .human-hero-media) but `priority` still made every visitor
              download the page's largest image. */}
          <div className="human-hero-wash" aria-hidden="true" />
          <div className="hero-grid relative mx-auto w-full max-w-7xl">
            <div className="hero-copy">
              <h1 className="hero-title display">The experience is not the interface.</h1>
              <p className="hero-deck">
                Thoughtstead is the workspace for designing how people and AI share the work,
                then getting the people ready: the training, the champions, the change. From the
                first question to a system someone can run and a team that can run it. Every
                consequential action waits for a person.
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

        <section id="design" className="design-conditions-section">
          <div className="design-conditions-hero">
            <div className="design-conditions-code-backdrop" aria-hidden="true" />
            <div className="design-conditions-copy">
              <h2 className="h2"><span>AI is now part</span><span>of the system.</span></h2>
              <p>An experience is a person’s relationship with a system in operation, and AI now recommends, decides and acts inside it. So the work starts with the system: who decides, what the AI knows, who can stop it. The interface is where the answers show up.</p>
            </div>
          </div>
        </section>

        <Section id="audience" className="transformation-path-section" wide>
          <div className="transformation-path-intro">
            <h2 className="h2">Built for the person who has to make AI work for the people who use it.</h2>
            <p>Not a chat assistant and not a general notes app. For design work that ends in a decision someone is accountable for.</p>
          </div>
          <div className="transformation-step-grid">
            {SITUATIONS.map((s) => (
              <article className="transformation-step" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="product" className="transformation-path-section" wide>
          <div className="transformation-path-intro">
            <h2 className="h2">Eight phases. The technology is half of them.</h2>
            <p>Most AI projects plan the build and hope the people follow. Here training starts before the system exists, and adoption is measured, not assumed.</p>
          </div>
          <div className="transformation-step-grid transformation-step-grid-phases">
            {PHASES.map(([title, body]) => (
              <article className="transformation-step" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="proof" className="governance-section" wide>
          <div className="governance-intro">
            <h2 className="h2">Price the mistake before you build the system.</h2>
            <p>AI doesn’t have to be perfect. It has to beat the alternative. The Value Matrix sets what the AI is expected to get right and wrong against a human baseline, so “is it worth it” becomes a number someone can argue with. It lists the assumptions that still need research, so nothing hides in the model.</p>
          </div>
          <div className="governance-captions">
            {VALUE_POINTS.map(([title, body]) => (
              <div className="governance-caption" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="governance-section" wide>
          <div className="governance-intro">
            <h2 className="h2">Everything the work needs. Nothing happens without you.</h2>
            <p>Authority lives in the system, not in a prompt. Anything that sends, shares or deletes waits for a person.</p>
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

        <Section id="framework" className="governance-section" wide>
          <div className="governance-intro">
            <h2 className="h2">The tool and the thinking come from the same place.</h2>
            <p>Thoughtstead is where the AI Experience Architecture method is put to work. The method is written up in the BFL Framework, from capability and decision architecture to governance, authority and trust. The workspace is where you run it on a real engagement.</p>
          </div>
          <div className="governance-captions">
            {FRAMEWORK_LINKS.map(([title, body, href]) => (
              <div className="governance-caption" key={title}>
                <h3><a className="inline-block py-2.5 underline underline-offset-4" href={href}>{title}</a></h3>
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
              <h2 className="h2">One workspace for the whole engagement.</h2>
            </Reveal>
            <Reveal delay={60}>
              <p>One subscription for the workspace, hosted AI, project work, and client delivery. No tiers, and your data exports in one click.</p>
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
