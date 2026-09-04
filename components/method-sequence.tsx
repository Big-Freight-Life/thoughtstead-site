'use client';

import { useState } from 'react';

const SURFACES = [
  {
    name: 'Research Notes',
    short: 'Research',
    description: 'What you have read, filed by sector and searchable by meaning.',
    color: 'sky',
  },
  {
    name: 'Positioning',
    short: 'Position',
    description: 'A brief kept current by a working session instead of re-derived in every meeting.',
    color: 'coral',
  },
  {
    name: 'Concepts',
    short: 'Concept',
    description: 'One record seen as the experience and the typed system behind it.',
    color: 'acid',
  },
  {
    name: 'Value Matrix',
    short: 'Value',
    description: 'Whether the feature should exist, expressed through the cost of being wrong.',
    color: 'violet',
  },
  {
    name: 'AI Security',
    short: 'Security',
    description: 'What it may touch, what it must never do unattended and where people stay in control.',
    color: 'sky',
  },
  {
    name: 'Gallery',
    short: 'Show',
    description: 'The deck, the one-pager and the thing you actually put in front of someone.',
    color: 'coral',
  },
  {
    name: 'Agentic Systems',
    short: 'Observe',
    description: 'Whether the system you already shipped is still working as intended.',
    color: 'acid',
  },
] as const;

export function MethodSequence() {
  const [active, setActive] = useState(2);
  const surface = SURFACES[active];

  return (
    <div className={`method-sequence method-sequence-${surface.color}`}>
      <div className="method-tabs" role="tablist" aria-label="The seven Thoughtstead surfaces">
        {SURFACES.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="method-panel"
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.short}</strong>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div id="method-panel" role="tabpanel" className="method-panel" key={surface.name}>
        <p>{String(active + 1).padStart(2, '0')} / 07</p>
        <h3>{surface.name}</h3>
        <span>{surface.description}</span>
        <b aria-hidden="true">→</b>
      </div>
    </div>
  );
}
