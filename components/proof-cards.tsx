const CARDS = [
  {
    key: 'capture',
    title: 'Capture connects',
    body: 'Say one thing. It lands first, then finds the people, projects, concepts and decisions it touches.',
  },
  {
    key: 'method',
    title: 'A method, built in',
    body: 'Seven surfaces carry the work from research to the system you already shipped.',
  },
  {
    key: 'matrix',
    title: 'The Value Matrix',
    body: 'A real confusion matrix that refuses impossible input and names the break-even assumption.',
  },
  {
    key: 'approval',
    title: 'Agents park outbound work',
    body: 'They act and leave receipts. Anything leaving the system waits for your approval.',
  },
] as const;

function MotionMark({ kind }: { kind: (typeof CARDS)[number]['key'] }) {
  if (kind === 'capture') {
    return (
      <div className="polar-mark mark-capture" aria-hidden="true">
        <i /><i /><i /><b /><b />
      </div>
    );
  }
  if (kind === 'method') {
    return (
      <div className="polar-mark mark-method" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => <i key={i} className={`method-step-${i}`} />)}
        <b />
      </div>
    );
  }
  if (kind === 'matrix') {
    return (
      <div className="polar-mark mark-matrix" aria-hidden="true">
        <i /><i /><i /><i /><b />
      </div>
    );
  }
  return (
    <div className="polar-mark mark-approval" aria-hidden="true">
      <i className="approval-path" /><i className="approval-arrow" />
      <b /><b /><span />
    </div>
  );
}

export function ProofCards() {
  return (
    <div className="proof-grid mt-12">
      {CARDS.map((card, index) => (
        <article key={card.key} className="proof-card">
          <div className="proof-stage"><MotionMark kind={card.key} /></div>
          <div className="proof-copy">
            <p className="eyebrow text-accent">0{index + 1}</p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
