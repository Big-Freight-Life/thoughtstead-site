'use client';

import { useState } from 'react';

const CONTEXTS = {
  product: {
    label: 'Product',
    title: 'Support intelligence',
    kicker: 'AI feature / active build',
    accent: '#5f82ff',
    nav: ['Research', 'Positioning', 'Concepts', 'Value Matrix', 'AI Security'],
    chain: [
      ['Customer call', 'The cost of a false alarm changed.'],
      ['Decision', 'Human baseline stays in the evaluation.'],
      ['Concept', 'Approval enters the fourth moment.'],
    ],
    note: 'Three records. One reason the concept changed.',
  },
  company: {
    label: 'Company',
    title: 'Big Freight Life',
    kicker: 'Company / operating context',
    accent: '#ff7654',
    nav: ['Projects', 'Meetings', 'Documents', 'People', 'Receivable'],
    chain: [
      ['Meeting', 'Scope moved during the customer review.'],
      ['Decision', 'The release moves with it.'],
      ['Project', 'Three dependent tasks are re-framed.'],
    ],
    note: 'The work follows the decision, not the other way around.',
  },
  household: {
    label: 'Household',
    title: 'Home',
    kicker: 'Life / private context',
    accent: '#20c997',
    nav: ['Health', 'Maintenance', 'Warranties', 'Documents', 'People'],
    chain: [
      ['Document', 'A warranty arrives and files itself.'],
      ['Warranty', 'Coverage and expiry stay attached.'],
      ['Maintenance', 'The next service knows what is covered.'],
    ],
    note: 'Same system underneath. A completely separate world.',
  },
} as const;

type ContextKey = keyof typeof CONTEXTS;

export function ContextStage() {
  const [active, setActive] = useState<ContextKey>('product');
  const context = CONTEXTS[active];

  return (
    <div className="context-stage-shell" style={{ '--context-accent': context.accent } as React.CSSProperties}>
      <div className="context-stage-topbar">
        <div className="context-traffic" aria-hidden="true"><i /><i /><i /></div>
        <p>Thoughtstead / Context switcher</p>
        <span>Private by context</span>
      </div>

      <div className="context-stage-tabs" role="tablist" aria-label="Preview a Thoughtstead context">
        {(Object.keys(CONTEXTS) as ContextKey[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
          >
            <i style={{ background: CONTEXTS[key].accent }} />
            {CONTEXTS[key].label}
          </button>
        ))}
      </div>

      <div className="context-stage-body" key={active}>
        <aside className="context-stage-rail">
          <div>
            <p className="context-stage-wordmark">Thoughtstead</p>
            <p className="context-stage-context">{context.label}</p>
          </div>
          <nav aria-label={`${context.label} preview surfaces`}>
            {context.nav.map((item, index) => (
              <span key={item} className={index === 3 ? 'is-active' : ''}>
                <i />{item}
              </span>
            ))}
          </nav>
          <p className="context-stage-isolation">Search and agents stay inside this context.</p>
        </aside>

        <div className="context-stage-workspace">
          <header>
            <div>
              <p className="context-stage-kicker">{context.kicker}</p>
              <h3>{context.title}</h3>
            </div>
            <span className="context-stage-live"><i /> Connected</span>
          </header>

          <div className="context-stage-chain">
            {context.chain.map(([type, line], index) => (
              <article key={type} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                <div className="context-stage-cardhead"><span>0{index + 1}</span><i /></div>
                <p className="context-stage-type">{type}</p>
                <h4>{line}</h4>
                <div className="context-stage-lines" aria-hidden="true"><b /><b /><b /></div>
              </article>
            ))}
          </div>

          <footer>
            <span className="context-stage-pulse" aria-hidden="true" />
            <p>{context.note}</p>
            <span className="context-stage-foot-label">Trace complete</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
