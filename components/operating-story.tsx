'use client';

import { useEffect, useRef, useState } from 'react';

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
        <button type="button" aria-label="Open capture composer">+</button>
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
        <h2>One thought becomes a system that can act.</h2>
        <p className="operating-lead">
          Capture what changed. Follow it through the product. Let agents move the work
          forward without giving up the final call.
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
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="operating-phase-copy" key={phase.id}>
          <h3>{phase.title}</h3>
          <p>{phase.body}</p>
        </div>
      </div>

      <div className="operating-stage">
        <div className="phone-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="phone-device">
          <div className="phone-side-button phone-side-button-top" aria-hidden="true" />
          <div className="phone-side-button phone-side-button-middle" aria-hidden="true" />
          <div className="phone-side-button phone-side-button-bottom" aria-hidden="true" />
          <div className="phone-side-button phone-side-button-power" aria-hidden="true" />
          <div className="phone-side-button phone-side-button-camera" aria-hidden="true" />
          <div className="phone-island" aria-hidden="true" />
          <div
            id="operating-panel"
            role="tabpanel"
            aria-labelledby={`operating-tab-${phase.id}`}
            className="operating-panel"
            key={phase.id}
          >
            {SCENES[phase.id]}
          </div>
        </div>
      </div>
    </div>
  );
}
