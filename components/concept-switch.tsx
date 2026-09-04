'use client';

import { useState } from 'react';

// One concept, two ways — the band that shows the method's centre.
//
// This is a real reduction of the product's Storyboard + Digital Twin, not a
// decorative diagram. Two things it takes from the real thing and must not
// misstate:
//
//  - The twin's components are TYPED, and the types are the product's own
//    (`src/backend/design-studio/node-catalog.ts`). "A canvas that offers 'box'
//    and 'arrow' produces a picture that looks like a system and answers no
//    question about one."
//  - Exactly THREE kinds bear the twelve-question AI contract: ai-model,
//    prediction, agent. Not retrieval — "retrieval is a lookup, and the
//    judgement it feeds is made by whatever consumes it." The badges below say
//    what the catalogue says.
//
// The link between the two views is the point of the band: a moment in the
// story is served by named components, and a component exists to serve named
// moments. Selecting either lights the other.

type Column = 'Input' | 'System' | 'Output';

type Node = { id: string; type: string; label: string; column: Column; contract?: boolean };

const NODES: Node[] = [
  { id: 'ticket', type: 'User input', label: 'The ticket', column: 'Input' },
  { id: 'account', type: 'Historical data', label: 'This account, all of it', column: 'Input' },
  { id: 'docs', type: 'Knowledge retrieval', label: 'The help centre', column: 'Input' },
  { id: 'model', type: 'AI model', label: 'Drafts the answer', column: 'System', contract: true },
  { id: 'confidence', type: 'Prediction', label: 'Is this one safe to send?', column: 'System', contract: true },
  { id: 'rule', type: 'Business rule', label: 'Never on a refund', column: 'System' },
  { id: 'review', type: 'Human review', label: 'The approval queue', column: 'System' },
  { id: 'draft', type: 'Generated content', label: 'The reply', column: 'Output' },
  { id: 'send', type: 'Automated action', label: 'Sends it', column: 'Output' },
  { id: 'notify', type: 'Notification', label: 'Tells you what it did', column: 'Output' },
];

const MOMENTS: { time: string; title: string; line: string; serves: string[] }[] = [
  {
    time: '02:14',
    title: 'A ticket arrives',
    line: 'Nobody is awake. It is the fourth this week from the same account.',
    serves: ['ticket'],
  },
  {
    time: '02:14',
    title: 'It reads the history',
    line: 'Every previous ticket, the plan, the outage they sat through in March.',
    serves: ['account', 'docs'],
  },
  {
    time: '02:15',
    title: 'It writes an answer',
    line: 'Grounded in the help centre, in the voice you actually use.',
    serves: ['model', 'draft'],
  },
  {
    time: '02:15',
    title: 'It decides whether to send',
    line: 'This is the moment the whole feature lives or dies in.',
    serves: ['confidence', 'rule', 'review'],
  },
  {
    time: '08:30',
    title: 'You see what it did',
    line: 'Nine sent. One waiting for you, and it says why.',
    serves: ['send', 'notify'],
  },
];

const COLUMNS: Column[] = ['Input', 'System', 'Output'];

export function ConceptSwitch() {
  const [view, setView] = useState<'story' | 'system'>('story');
  const [active, setActive] = useState(3);
  const served = new Set(MOMENTS[active].serves);

  return (
    <div data-testid="concept-switch">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          An assistant that answers support tickets on its own.
        </p>
        {/* One concept, one route — the surface is a view, not a second page.
            Same rule the product follows: `?view=` rather than /digital-twins. */}
        <div
          role="tablist"
          aria-label="Concept view"
          className="flex border border-line-2 bg-bg p-1 text-sm"
        >
          {(
            [
              ['story', 'Storyboard'],
              ['system', 'Digital Twin'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              type="button"
              aria-selected={view === key}
              onClick={() => setView(key)}
              // min-h-11 is 44px: WCAG 2.5.5, and asserted at 390px by
              // e2e/smoke.spec.ts. A tab that is comfortable with a mouse is
              // not automatically comfortable with a thumb.
              className={`min-h-11 px-5 transition-colors ${
                view === key ? 'bg-[var(--accent-fill)] text-white' : 'text-muted hover:text-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        {/* ── The story ─────────────────────────────────────────────────── */}
        <ol
          className={`lg:col-span-5 ${view === 'story' ? '' : 'hidden lg:block lg:opacity-45'}`}
        >
          {MOMENTS.map((m, i) => (
            <li key={m.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`w-full border-l-2 py-4 pl-5 pr-3 text-left transition-colors ${
                  active === i
                    ? 'border-accent bg-accent-soft'
                    : 'border-line hover:border-line-2'
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-xs tabular-nums text-accent">{m.time}</span>
                  <span className="font-medium">{m.title}</span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{m.line}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* ── The system ────────────────────────────────────────────────── */}
        <div
          className={`lg:col-span-7 ${view === 'system' ? '' : 'hidden lg:block lg:opacity-45'}`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col}>
                <p className="eyebrow pb-3 text-faint">{col}</p>
                <div className="space-y-2.5">
                  {NODES.filter((n) => n.column === col).map((n) => {
                    const lit = served.has(n.id);
                    return (
                      <div
                        key={n.id}
                        data-node={n.id}
                        data-lit={lit ? 'true' : 'false'}
                        className={`rounded-lg border p-3 transition-colors ${
                          lit
                            ? 'border-accent bg-accent-soft'
                            : 'border-line bg-surface-2/60'
                        }`}
                      >
                        <p className="text-[0.7rem] uppercase tracking-wide text-faint">
                          {n.type}
                        </p>
                        <p className="mt-1 text-sm leading-snug">{n.label}</p>
                        {n.contract && (
                          <p className="eyebrow mt-2 inline-flex border border-accent bg-accent-soft px-2 py-1 text-[0.6rem] text-accent">
                            12-question contract
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-7 text-sm leading-relaxed text-muted">
        Pick a moment and the components that serve it light up. Only three kinds of
        component ever carry the twelve-question contract — the model, the prediction, and
        an agent — because those are the ones making a call you will have to defend.
        Retrieval does not: a lookup makes no judgement.
      </p>
    </div>
  );
}
