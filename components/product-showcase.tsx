'use client';

import Image from 'next/image';
import { useState, type CSSProperties, type PointerEvent } from 'react';

const SCREENS = [
  {
    id: 'model',
    step: '01',
    tab: 'Model it',
    eyebrow: 'Digital Twin',
    title: 'See the system before there is code.',
    body: 'Inputs, models, agents, controls and outputs live on one canvas. The three components that make a defensible call carry the twelve-question contract; ordinary components do not.',
    src: '/product-screenshots/digital-twin.svg',
    alt: 'Placeholder for a real Thoughtstead Digital Twin screenshot',
    color: '#95c9ff',
  },
  {
    id: 'test',
    step: '02',
    tab: 'Test it',
    eyebrow: 'Value Matrix',
    title: 'Put a number on the assumption.',
    body: 'A real confusion matrix turns false positives and false negatives into a decision. Impossible input is refused, not quietly clamped into something reassuring.',
    src: '/product-screenshots/value-matrix.svg',
    alt: 'Placeholder for a real Thoughtstead Value Matrix screenshot',
    color: '#f04c23',
  },
  {
    id: 'control',
    step: '03',
    tab: 'Control it',
    eyebrow: 'Agent approvals',
    title: 'Let agents work. Keep the final say.',
    body: 'Agents can research, prepare and connect the work. Anything outbound or destructive parks for approval before it leaves the system.',
    src: '/product-screenshots/approval-queue.svg',
    alt: 'Placeholder for a real Thoughtstead approval queue screenshot',
    color: '#dfff4f',
  },
] as const;

export function ProductShowcase() {
  const [activeId, setActiveId] = useState<(typeof SCREENS)[number]['id']>('model');
  const active = SCREENS.find((screen) => screen.id === activeId) ?? SCREENS[0];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--screen-rx', `${(-y * 1.4).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--screen-ry', `${(x * 1.8).toFixed(2)}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--screen-rx', '0deg');
    event.currentTarget.style.setProperty('--screen-ry', '0deg');
  }

  return (
    <div className="product-showcase" style={{ '--screen-color': active.color } as CSSProperties}>
      <div className="product-showcase-tabs" role="tablist" aria-label="Product screens">
        {SCREENS.map((screen) => {
          const selected = screen.id === active.id;
          return (
            <button
              key={screen.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="product-screen-panel"
              onClick={() => setActiveId(screen.id)}
            >
              <span>{screen.step}</span>
              {screen.tab}
            </button>
          );
        })}
      </div>

      <div className="product-showcase-copy" aria-live="polite">
        <div>
          <p className="eyebrow">{active.eyebrow}</p>
          <h3>{active.title}</h3>
        </div>
        <p>{active.body}</p>
      </div>

      <div
        id="product-screen-panel"
        role="tabpanel"
        className="product-screen-perspective"
        onPointerMove={tilt}
        onPointerLeave={resetTilt}
      >
        <div key={active.id} className="product-screen-card">
          <div className="product-screen-chrome" aria-hidden="true">
            <span /><span /><span />
            <p>Thoughtstead / {active.eyebrow}</p>
            <b>Real screen slot</b>
          </div>
          <Image
            src={active.src}
            alt={active.alt}
            width={1600}
            height={1000}
            priority={active.id === 'model'}
            sizes="(max-width: 768px) 94vw, 1280px"
          />
        </div>
      </div>

      <p className="product-screen-note">
        <span aria-hidden="true" />
        Placeholder shown. Replace with the approved product capture; the frame and motion stay.
      </p>
    </div>
  );
}
