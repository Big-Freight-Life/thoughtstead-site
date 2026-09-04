const CARDS = [
  {
    kind: 'outcomes',
    title: 'Four outcomes',
    body: 'True positives, false positives, false negatives, and true negatives stay visible as separate consequences.',
  },
  {
    kind: 'refusal',
    title: 'Impossible means impossible',
    body: 'When the counts cannot coexist, the matrix refuses them and names the numbers in conflict.',
  },
  {
    kind: 'break-even',
    title: 'The break-even point',
    body: 'The result names the exact assumption that would reverse the decision, so someone can challenge it.',
  },
  {
    kind: 'baseline',
    title: 'A human baseline',
    body: 'The system is measured against what people do today, not against an imaginary perfect model.',
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
      {CARDS.map((card, index) => (
        <article className="matrix-feature-card" key={card.kind}>
          <div className="matrix-feature-stage">
            <AnimatedIcon kind={card.kind} />
          </div>
          <div className="matrix-feature-copy">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
