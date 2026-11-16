const CARDS = [
  {
    kind: 'outcomes',
    title: 'Capture anywhere',
    body: 'Voice, text, meetings and documents go in raw first, so nothing is lost before it is understood.',
  },
  {
    kind: 'refusal',
    title: 'A workspace per client',
    body: 'Each client, company or product gets its own isolated context. Search and agents never cross the wall.',
  },
  {
    kind: 'break-even',
    title: 'Agents that wait for you',
    body: 'Agents draft the email, the invoice, the follow-up. Anything that sends or deletes waits for your approval.',
  },
  {
    kind: 'baseline',
    title: 'Decisions with their reasons',
    body: 'Every decision keeps the meeting and evidence behind it, and the Value Matrix prices what it costs to be wrong.',
  },
] as const;

function AnimatedIcon({ kind }: { kind: (typeof CARDS)[number]['kind'] }) {
  if (kind === 'outcomes') {
    return (
      <div className="matrix-card-icon matrix-icon-outcomes" aria-hidden="true">
        <i /><i /><i /><i />
        <b />
      </div>
    );
  }

  if (kind === 'refusal') {
    return (
      <div className="matrix-card-icon matrix-icon-refusal" aria-hidden="true">
        <i><span /></i>
        <i><span /></i>
        <i><span /></i>
        <b />
      </div>
    );
  }

  if (kind === 'break-even') {
    return (
      <div className="matrix-card-icon matrix-icon-break-even" aria-hidden="true">
        <i /><i /><i />
        <b />
      </div>
    );
  }

  return (
    <div className="matrix-card-icon matrix-icon-baseline" aria-hidden="true">
      <i /><i /><i /><i />
      <b />
    </div>
  );
}

export function ValueMatrixCards() {
  return (
    <div className="matrix-card-grid" data-testid="value-matrix-cards">
      {CARDS.map((card) => (
        <article className="matrix-feature-card" key={card.kind}>
          <div className="matrix-feature-stage">
            <AnimatedIcon kind={card.kind} />
          </div>
          <div className="matrix-feature-copy">
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
