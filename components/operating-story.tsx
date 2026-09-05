'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

const PHASES = [
  {
    id: 'capture',
    label: 'Capture',
    title: 'Say it once. It lands, then connects.',
    body: 'The raw thought is saved first. Enrichment follows, linking the people, projects, concepts, and decisions it touches.',
  },
  {
    id: 'method',
    label: 'Seven surfaces',
    title: 'Follow the decision through the work.',
    body: 'What you learn becomes a clear direction and a product people can understand. You can decide whether to build it, define what the AI may do, and see what happened after launch.',
  },
  {
    id: 'approval',
    label: 'Agents',
    title: 'Keep the work moving. Keep the authority.',
    body: 'Agents can brief, chase, and research. Anything outbound or destructive stops with its evidence until a person approves it.',
  },
] as const;

const SURFACES = ['Research', 'Position', 'Concept', 'Value', 'Security', 'Show', 'Observe'];

type PhaseId = (typeof PHASES)[number]['id'];

function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-screen">
      <div className="phone-status" aria-hidden="true">
        <span>9:41</span>
        <div><i /><i /><b /></div>
      </div>
      <div className="phone-app-bar">
        <div className="phone-wordmark">T</div>
        <div><strong>Studio</strong><span>Thoughtstead</span></div>
        {/* Drawn, not a control. It has never had a handler, and as a <button>
            it counted as a tap target — which the scaled-down handset then
            failed, at 34px against a 40px floor. */}
        <span className="phone-compose" aria-hidden="true">+</span>
      </div>
      {children}
      <nav className="phone-nav" aria-label="Product preview navigation">
        <span className="is-active"><i />Today</span>
        <span><i />Search</span>
        <span><i />Agents</span>
      </nav>
    </div>
  );
}

function CaptureScene() {
  return (
    <PhoneChrome>
      <div className="phone-view phone-capture" aria-label="A raw capture connecting to related records">
        <header className="phone-view-head">
          <span>Quick capture</span>
          <h3>Save the thought before it disappears.</h3>
        </header>

        <div className="capture-note">
          <span>Raw capture</span>
          <p>The customer call changed the rollout.</p>
          <div className="capture-wave" aria-hidden="true">
            {[9, 15, 24, 13, 29, 18, 10, 22, 14, 7].map((height, index) => (
              <i key={index} style={{ '--wave-height': `${height}px`, '--wave-delay': `${index * 70}ms` } as React.CSSProperties} />
            ))}
          </div>
        </div>

        <section className="phone-capture-links">
          <div className="phone-capture-links-head"><span>Connected after capture</span><b>3 records</b></div>
          <ol>
            <li><i className="is-sky" /><div><span>Person</span><strong>Customer</strong></div><b>Linked</b></li>
            <li><i className="is-coral" /><div><span>Decision</span><strong>Phase the launch</strong></div><b>Linked</b></li>
            <li><i className="is-mint" /><div><span>Concept</span><strong>Approval moment</strong></div><b>Updated</b></li>
          </ol>
        </section>
      </div>
    </PhoneChrome>
  );
}

function MethodScene() {
  return (
    <PhoneChrome>
      <div className="phone-view phone-method" aria-label="The seven connected Thoughtstead surfaces">
        <header className="phone-view-head">
          <span>seven connected surfaces</span>
          <h3>One decision, followed all the way through.</h3>
        </header>

        <div className="method-trace-head"><span>Rollout decision</span><b>Live trace</b></div>
        <ol className="method-trace">
          {SURFACES.map((surface, index) => (
            <li key={surface} style={{ '--surface-delay': `${index * 75}ms` } as React.CSSProperties}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{surface}</strong>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="method-contract">
          <span>Contract-bearing types</span>
          <ul>
            <li><b>Model</b><strong>12</strong></li>
            <li><b>Prediction</b><strong>12</strong></li>
            <li><b>Agent</b><strong>12</strong></li>
          </ul>
        </div>
      </div>
    </PhoneChrome>
  );
}

function ApprovalScene() {
  const [review, setReview] = useState<'pending' | 'approved' | 'returned'>('pending');

  return (
    <PhoneChrome>
      <div className="phone-view phone-approval" aria-label="An agent action parked for human approval">
        <header className="phone-view-head">
          <span>Agent activity</span>
          <h3>Work moves. Authority stays with you.</h3>
        </header>

        <ol className="agent-run">
          <li className="is-complete"><i /><span>Brief assembled</span><b>09:41</b></li>
          <li className="is-complete"><i /><span>Evidence attached</span><b>09:42</b></li>
          <li className="is-current"><i /><span>Outbound action parked</span><b>Now</b></li>
        </ol>

        <section className={`approval-card is-${review}`}>
          <div className="approval-card-head">
            <span>{review === 'pending' ? 'Approval required' : 'Review recorded'}</span>
            <b>{review === 'pending' ? 'Parked' : review === 'approved' ? 'Approved' : 'Returned'}</b>
          </div>
          <h4>Send the revised rollout plan to the customer team.</h4>
          <p>Scope changed after the customer call. Three connected records are attached.</p>
          <footer>
            <button type="button" onClick={() => setReview('returned')}>Send back</button>
            <button type="button" className="is-primary" onClick={() => setReview('approved')}>Approve</button>
          </footer>
        </section>
      </div>
    </PhoneChrome>
  );
}

const SCENES: Record<PhaseId, React.ReactNode> = {
  capture: <CaptureScene />,
  method: <MethodScene />,
  approval: <ApprovalScene />,
};

// The watch is the companion at its own job: one thought, caught and confirmed.
// Anything more is a claim a 39mm screen cannot support.
function WatchCapture() {
  return (
    <div className="watch-screen">
      <div className="watch-top" aria-hidden="true"><span>Capture</span><b>9:41</b></div>
      <div className="watch-wave" aria-hidden="true">
        {[10, 17, 9, 22, 13, 19, 8, 15].map((height, index) => (
          <i key={index} style={{ '--wave-height': `${height}px` } as React.CSSProperties} />
        ))}
      </div>
      <p className="watch-line">The customer call changed the rollout.</p>
      <p className="watch-saved"><i aria-hidden="true" />Saved</p>
    </div>
  );
}

export function OperatingStory() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const phase = PHASES[active];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(media.matches);
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % PHASES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [visible, reduced]);

  function choose(index: number) {
    setActive(index);
  }

  return (
    <div
      ref={rootRef}
      className={`operating-story operating-story-${phase.id}`}
      data-operating-story
      data-phase={phase.id}
      data-autoplay={!reduced && visible}
    >
      <div className="operating-copy">
        {/* Folded in from the standalone "Keep the reasoning" band, which was one
            heading and one paragraph between the showcase card and this one and
            had no mechanic of its own. The thesis belongs on the band that
            demonstrates it; the scroll-driven phrase-attach on the span moved
            across with it. */}
        <h2>Keep the reasoning <span>attached to the work.</span></h2>
        <p className="operating-lead">
          Thoughtstead connects the brief, evidence, concept, system, and decision as
          they change. The product stays whole without living in your head.
        </p>

        <div className="operating-tabs" role="tablist" aria-label="How Thoughtstead works">
          {PHASES.map((item, index) => (
            <button
              key={item.id}
              id={`operating-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="operating-panel"
              onClick={() => choose(index)}
            >
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>

        {/* All three sit in one grid cell, so the block is always as tall as the
            longest of them and the page below never reflows when the phase
            changes. Keying one <div> to the phase made it remount and slide up
            from opacity 0, which read as the copy jumping into place — and the
            27px height difference between phases shunted everything below it. */}
        <div className="operating-phase-copy">
          {PHASES.map((item) => (
            <div
              key={item.id}
              className={item.id === phase.id ? 'is-active' : undefined}
              aria-hidden={item.id !== phase.id || undefined}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="operating-stage">
        {/* Apple's own iPhone 17 bezel, from the Apple Design Resources bezel
            download, unmodified. It replaces a hand-drawn CSS iPhone that had a
            Dynamic Island, a Camera Control and a Ring/Silent switch on it —
            Apple's marketing guidelines prohibit illustrations depicting an
            Apple product, and name those details specifically.

            The artwork is 1350x2760 with a transparent screen aperture at
            5.3333% / 2.5% / 89.3333% / 95%, measured off the alpha channel; the
            screens sit behind it at exactly those insets and the frame covers
            their corners. The licence covers mock-ups of interfaces for
            software running on Apple operating systems — it is the iPhone app
            in here, and it may not be reused to frame the web app. */}
        <div className="device-lockup">
          {/* True relative scale, which Apple's guidelines require when two
              products appear together. Both bezels turn out to be one image
              pixel per device pixel, so the sizes come from physics rather than
              eye: the iPhone 17's 2622px screen at 460ppi is 144.78mm and the
              Watch's 496px at 326ppi is 38.65mm, which puts the watch image at
              0.58527 of the phone's width. */}
          <div className="watch-device">
            <Image
              src="/apple-watch-s11-46-milanese.png"
              alt=""
              width={560}
              height={880}
              className="watch-bezel"
              aria-hidden="true"
            />
            <div className="watch-panel">
              <div className="watch-scene"><WatchCapture /></div>
            </div>
          </div>

        <div className="phone-device">
          <Image
            src="/iphone-17-black-portrait.png"
            alt=""
            width={1350}
            height={2760}
            className="phone-bezel"
            aria-hidden="true"
          />
          {/* Every screen stays mounted and cross-fades. The panel IS the phone's
              whole screen, so keying it to the phase took the status bar, app
              bar and nav out with it: the lit screen dropped to the bare dark
              body for the length of the entrance and read as a flash on every
              switch. Nothing is blank now — the outgoing screen fades out
              underneath the incoming one. */}
          <div
            id="operating-panel"
            role="tabpanel"
            aria-labelledby={`operating-tab-${phase.id}`}
            className="operating-panel"
          >
            {PHASES.map((item) => (
              <div
                key={item.id}
                className={`operating-scene${item.id === phase.id ? ' is-active' : ''}`}
                aria-hidden={item.id !== phase.id || undefined}
                inert={item.id !== phase.id}
              >
                {SCENES[item.id]}
              </div>
            ))}
          </div>
        </div>
        </div>
        {/* No App Store badge until Apple has signed the app off.
            There is no "coming soon" badge to use in the meantime. Apple offer
            exactly two modifiers, "Download on the" and "Pre-order on the",
            and the pre-order one is not a placeholder either: their rule is
            that it means the app IS taking pre-orders on the store, with a
            release date set in App Store Connect. Neither is true yet, and a
            download badge over an app nobody can download is a claim the page
            cannot keep.
            components/app-store-badge.tsx and Apple's artwork stay in the
            repo. Set NEXT_PUBLIC_APP_STORE_URL and render <AppStoreBadge />
            here on the day it ships. Same discipline as the HostedCta stub and
            the "Launching soon" CTA: the component survives, the unearned
            claim does not. */}
      </div>
    </div>
  );
}
