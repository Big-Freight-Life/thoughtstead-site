import type { ReactNode } from 'react';
import {
  HostedCta,
  HOSTED_PRICE,
  HOSTED_PERIOD,
  HOSTED_LIVE,
} from '@/components/cta';

// Positioning, second pass — 2026-08-25.
//
// The first pass pitched a MODULE LIST ("it has an AP page and a health page")
// and read like every competitor's feature grid, because it was written off a
// directory listing rather than off the product. Ray's note: "I don't really
// see much of a value proposition compared to competitors." He was right.
//
// The product is a GRAPH, and the graph is the moat. From the schema:
//   ar_invoices -> contracts -> ar_clients + people + documents
//   ap_bills    -> contracts -> ap_vendors
//   projects    -> project_ar_clients + project_ap_vendors + project_people
//   decisions   -> decision_meetings + decision_thoughts
//   meetings    -> calendar_events + thoughts, + meeting_segments/notes
//   people      -> contracts, projects, thoughts, contact_logs, follow_ups
//   research_assignments -> agent_tasks -> research_findings -> evidence links
//   agent_tasks -> agent_receipts
//
// And critically, backend/capture/deps.ts calls link_thought_people during
// enrichment: the AI wires the graph on capture. In Notion you wire every
// relation by hand; in QuickBooks the invoice knows nothing but money; in
// Obsidian a backlink is a piece of text. That difference IS the pitch.
//
// Third pass — Ray: "it's not about invoices." The second pass found the graph
// and then illustrated it with the narrowest, most transactional edge on it,
// which read as accounting software — the business-OS headline he had already
// turned down. The invoice is one edge. It is not the point.
//
// The point is COMPLETENESS. Ray's framing, in his words: things are moving so
// fast, your life needs to be complete, and the product helps you manage not
// only the business but the life. Today the only thing making it complete is
// the person, holding both halves in their head every morning.
//
// So the headline is that person's situation, the graph is the PROOF of how it
// gets fixed, and the two halves stay balanced everywhere — if the work column
// runs long and the home column runs short, the page is quietly saying
// "business tool" no matter what the words claim.
//
// Audience is named by situation, never by label — founders, CEOs, operators.
// "Solopreneur" was considered and dropped: it reads as marketer-speak to the
// people it describes. And the category is a LIFE operating system, not a
// business OS (which strands /health, /warranties, /maintenance, /lifestyle)
// and not an "AI second brain" (worn out, and it promised recall alone).

// Three jobs, three elements — do not merge them again. The kicker names the
// category, the headline is the hook, the subline pays off its own nouns.
//
// The version before this did all three in the subline and did each badly: it
// restated the headline ("so you hold them"), announced the category mid-
// sentence, then closed on three abstract verbs — takes, connects, does. Ray
// liked the two opening sentences and nothing after them, which is exactly the
// seam between the concrete half and the filler half.
const HERO_KICKER = 'Life is serious business';

const HERO_SUBLINE =
  'The contract and the furnace warranty. The client who has not paid and the checkup you keep moving. Thoughtstead holds all of it, works out how it connects, and brings you what the day needs — instead of sitting there waiting to be searched.';

const ISLANDS = [
  {
    lead: 'At two you are negotiating a contract. At four you are on hold about a warranty claim.',
    rest: 'Same person, same day, same finite attention. Nobody splits into a work self and a home self at will, and the day does not politely separate itself either.',
  },
  {
    lead: 'Your accounting knows what you billed.',
    rest: 'Not the meeting where you agreed the scope, not that the contract renews on the 14th, not that this client has now asked the same question twice.',
  },
  {
    lead: 'Your notes app knows what you wrote.',
    rest: 'It has never chased a payment, booked anything, or warned you about a single thing. Its links are text you typed, and it forgets the moment you stop maintaining it.',
  },
  {
    lead: 'Your project tool knows the tasks.',
    rest: 'Not who is being paid, not what you decided in March, and not why. Ask it for the reasoning behind a call you made and it has nothing.',
  },
  {
    lead: 'And none of them want the rest of your life at all.',
    rest: 'The furnace, the checkup, the car service, the thing you promised on Sunday. No tool built for work will take them, so they stay exactly where they have always been.',
  },
];

// Each step is a real edge in the schema, not a story. Keep it that way.
const WORK_THREAD = {
  label: 'At work',
  intro: 'Start anywhere on this thread and walk it in either direction.',
  steps: [
    'A meeting, recorded and transcribed',
    'The decision that came out of it',
    'The project it started',
    'The contract that covers the project',
    'The client who signed, and the person who actually signed it',
    'The invoice raised against that contract',
    'What they still owe you',
  ],
};

const HOME_THREAD = {
  label: 'At home',
  intro: 'The same engine, the same depth, in the context next door.',
  steps: [
    'A receipt you photographed in the driveway',
    'Filed and categorised, without you naming it',
    'The warranty it proves, and who provides it',
    'The coverage window that opens',
    'The service due before that window shuts',
    'Which recurs, so next year is already handled',
    'And a reminder, well before any of it lapses',
  ],
};

const RUNS = [
  {
    context: 'Business',
    blurb: 'A real operating system for the company, not a notes app with folders.',
    items: [
      ['Receivable', 'Invoices with line items, per client, against the contract they belong to.'],
      ['Payable', 'Bills and vendors, and what you owe against which agreement.'],
      ['Contracts', 'Renewals, amendments, and every event on the record.'],
      ['Projects', 'Wired to the clients paying for them and the vendors being paid.'],
      ['Meetings', 'Recorded, transcribed, segmented, and tied to what they decided.'],
      ['Decisions', 'Kept with the meeting and the thinking that produced them.'],
      ['Research', 'Hand over a question; get findings back with the evidence attached.'],
      ['Contacts', 'One person: every contract, project, conversation, and promise.'],
    ],
  },
  {
    context: 'Personal',
    blurb: 'The same capture, search, and agents — behind a wall the business cannot cross.',
    items: [
      ['Health', 'Appointments and checkups, and what is actually due.'],
      ['Home & auto', 'The upkeep you would otherwise remember late.'],
      ['Warranties', 'Coverage windows, and the receipt that proves each one.'],
      ['Lifestyle', 'The plans that never survive a busy quarter.'],
      ['Calendar', 'Alongside the rest of it, not in another tab.'],
    ],
  },
];

const DEED_PARAGRAPHS = [
  {
    lead: 'Every other tool keeps what you put in it.',
    rest: 'Your most personal data lives on their servers, in their format, subject to their pivots and shutdowns. Getting it out — if you can at all — means a scrape, a zip of orphaned markdown, and a week of your life.',
  },
  {
    lead: 'Thoughtstead hands it back.',
    rest: 'Full export, any time, on any plan — every thought, contact, decision, invoice, and document, in formats you can actually read. We never train on your data and never sell it. If you leave, you leave with everything, and nothing about that depends on us still being here.',
  },
];

const COSTS = [
  { name: 'Thoughtstead', value: `${HOSTED_PRICE}/${HOSTED_PERIOD}` },
  { name: 'Hosting', value: 'Included' },
  { name: 'AI usage', value: 'Included — no key, no markup' },
  { name: 'Every context you need', value: 'Included' },
  { name: 'Export your data', value: 'Free, always' },
];

const PRICING_BULLETS = [
  'The whole system, business and personal',
  'AI usage, with no API key to manage',
  'As many contexts as you need',
  'Full export, any time',
];

const FAQS = [
  {
    q: 'How is this different from Notion?',
    a: 'Notion gives you the parts and expects you to build the system — every relation wired by hand, every template maintained forever, and it does nothing while you are not looking. Thoughtstead ships the system already built and connects records itself as work lands. It also does what Notion structurally cannot: raise an invoice, track what a client owes against a contract, and act on any of it.',
  },
  {
    q: 'How is this different from my accounting software?',
    a: 'Your books know the number. They do not know the meeting where the scope was agreed, the decision behind the discount, or the person who actually signed. Thoughtstead keeps the invoice attached to all of it — and the books are one surface of it, not the whole product.',
  },
  {
    q: 'What does "life operating system" actually mean?',
    a: 'That it does not stop at the office door. The same system that tracks what a client owes tracks when your car is due for service and when the warranty on your furnace runs out. One place to capture, one search, one set of agents doing the follow-through — over the work and over the rest of it.',
  },
  {
    q: 'Does my personal life get mixed into my business?',
    a: 'No. Business and Personal are separate contexts, isolated from each other at the database level. Searching in one never returns the other, and an agent working in one cannot see into the other. You switch between them deliberately, and you can add as many as you need — a second company, a side project, a household.',
  },
  {
    q: 'Do I have to organise any of it?',
    a: 'No, and that is the point. Capture the thing. Enrichment reads it, links the people, projects and decisions it touches, and files it. The graph is built for you, which is the difference between a system that works and a template you maintain.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. Sign in and start capturing — there is nothing to deploy, no account to create at another company, and no API key to manage. Connecting Gmail and Calendar is a normal permissions screen.',
  },
  {
    q: 'Is my data private?',
    a: 'It is yours. We never train on it and never sell it, every context is isolated at the database level, and outbound actions park for your explicit approval rather than firing on their own. Full export is always available.',
  },
  {
    q: 'Can my team use it?',
    a: 'Individual accounts are what ship first. Team workspaces — shared contexts, roles, and seats — come after. If you need that now, email us and tell us what you need.',
  },
  {
    q: 'Can I cancel?',
    a: 'Any time, and you can export everything on your way out. No lock-in period and no exit fee.',
  },
];

function Section({
  wide = false,
  className = '',
  children,
}: {
  wide?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`mx-auto px-6 py-16 md:py-24 ${wide ? 'max-w-5xl' : 'max-w-3xl'} ${className}`}
    >
      {children}
    </section>
  );
}

function Thread({
  label,
  intro,
  steps,
}: {
  label: string;
  intro: string;
  steps: readonly string[];
}) {
  return (
    <div>
      <h3 className="font-serif text-2xl">{label}</h3>
      <p className="mt-1 text-sm text-foreground/60">{intro}</p>
      <ol className="mt-6">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-4">
            {/* The rail: a dot per step, joined by a line that stops at the last. */}
            <div className="flex flex-col items-center" aria-hidden="true">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-accent" />
              {i < steps.length - 1 && <span className="w-px flex-1 bg-accent/25" />}
            </div>
            <span className="pb-5 text-foreground/85">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <span className="text-sm lowercase tracking-wide text-foreground/70">thoughtstead</span>
      </header>

      <main>
        {/* Hero */}
        <Section className="pt-8 text-center md:pt-12">
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-accent">{HERO_KICKER}</p>
          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl">
            You are the only thing
            <br className="hidden sm:block" /> holding it together.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            {HERO_SUBLINE}
          </p>
          <div className="mt-8 flex justify-center">
            <HostedCta large />
          </div>
          <p className="mt-4 text-sm text-foreground/60">
            {/* Explicit {' '}: JSX trims each line of a multi-line text node, so a
                literal space next to an expression is dropped — it rendered
                "$20/month· AI included". */}
            {`${HOSTED_PRICE}/${HOSTED_PERIOD}`}
            {' '}
            &middot; AI included &middot; export everything, any time
          </p>
        </Section>

        {/* The competitive frame */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">Nothing you own holds both halves</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            {ISLANDS.map((p) => (
              <p key={p.lead}>
                <strong className="font-semibold text-foreground">{p.lead}</strong> {p.rest}
              </p>
            ))}
          </div>
          <p className="mt-8 border-l-2 border-accent pl-5 text-lg leading-relaxed text-foreground">
            Which leaves one system that holds all of it. You.
          </p>
        </Section>

        {/* The graph — the actual differentiator */}
        <Section wide className="border-t border-foreground/10">
          <h2 className="text-center font-serif text-3xl md:text-4xl">One thread, end to end</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/70">
            Not modules sitting next to each other. One record that knows what it is attached to —
            at work and at home alike, and you wired none of it.
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <Thread {...WORK_THREAD} />
            <Thread {...HOME_THREAD} />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-foreground/85">
            Ask why you decided something in March and you get the meeting it came out of and the
            thinking behind it. Open a contact and you get every contract, every project, every
            conversation, and every promise you have not kept yet. Ask what is coming and you get
            both halves in one answer, because there was never really more than one day.
          </p>
        </Section>

        {/* What it runs */}
        <Section wide className="border-t border-foreground/10">
          <h2 className="text-center font-serif text-3xl md:text-4xl">What it runs</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {RUNS.map((col) => (
              <div key={col.context}>
                <h3 className="font-serif text-2xl">{col.context}</h3>
                <p className="mt-1 text-sm text-foreground/60">{col.blurb}</p>
                <dl className="mt-6 space-y-5">
                  {col.items.map(([term, desc]) => (
                    <div key={term} className="border-t border-foreground/15 pt-4">
                      <dt className="font-semibold text-foreground">{term}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-foreground/70">{desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Section>

        {/* Agents */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">It works while you are not looking</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Hand a job over and it gets done: brief me on this morning, chase what is overdue,
              find out what we know about this company, tidy these duplicate records.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Every step leaves a receipt.
              </strong>{' '}
              What was claimed, what was done, what it decided and when — a record you can read
              back, not a summary you have to trust.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                And nothing leaves without your approval.
              </strong>{' '}
              Anything outbound or irreversible parks in a queue with its proposal attached and
              waits for you. That boundary is enforced in the database, not requested in a prompt —
              so a hostile email telling an agent to forward your documents gets exactly as far as
              a proposal you decline.
            </p>
          </div>
        </Section>

        {/* Mac */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">It starts on your Mac</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              A browser tab cannot sit in your meeting and listen. The Mac app records what is
              said, transcribes it, and files it against the client it belongs to — then stays a
              keystroke away for the thought you need to get down before it goes.
            </p>
            <p>
              The web app is there for a machine that is not yours, and your phone catches whatever
              happens away from the desk.
            </p>
          </div>
        </Section>

        {/* Ownership */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">Yours, and provably so</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            {DEED_PARAGRAPHS.map((p) => (
              <p key={p.lead}>
                <strong className="font-semibold text-foreground">{p.lead}</strong> {p.rest}
              </p>
            ))}
          </div>
        </Section>

        {/* Honest costs */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">What it costs</h2>
          <table className="mt-8 w-full border-collapse text-left">
            <tbody>
              {COSTS.map((row) => (
                <tr key={row.name} className="border-t border-foreground/15">
                  <td className="py-3 text-foreground/85">{row.name}</td>
                  <td className="py-3 text-right text-foreground/70">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-sm text-foreground/60">
            One price. No markup on AI. No charge to leave.
          </p>
        </Section>

        {/* Pricing */}
        <Section wide className="border-t border-foreground/10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Pricing</h2>
          <div className="mx-auto mt-10 max-w-md">
            {/* One product, one price. */}
            <div className="rounded-2xl border border-foreground/15 p-10">
              <h3 className="font-serif text-xl">Hosted</h3>
              <p className="mt-1 text-sm text-foreground/60">
                {HOSTED_LIVE ? 'Available now' : 'Launching soon'}
              </p>
              <div className="mt-6 flex items-baseline justify-center gap-1">
                <span className="font-serif text-5xl">{HOSTED_PRICE}</span>
                <span className="text-foreground/60">/{HOSTED_PERIOD}</span>
              </div>
              <ul className="mx-auto mt-8 max-w-xs space-y-2 text-left text-sm text-foreground/80">
                {PRICING_BULLETS.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-accent">&mdash;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center">
                <HostedCta large />
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">FAQ</h2>
          <div className="mt-10 divide-y divide-foreground/15 border-t border-b border-foreground/15">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg">
                  {faq.q}
                  <span className="mt-1 shrink-0 text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-foreground/60 sm:flex-row">
          <nav className="flex gap-6">
            <a href="/docs" className="hover:text-accent">
              Docs
            </a>
            <a href="/privacy" className="hover:text-accent">
              Privacy
            </a>
            <a href="/terms" className="hover:text-accent">
              Terms
            </a>
            <a href="mailto:support@bfl.design" className="hover:text-accent">
              Support
            </a>
          </nav>
          <p>&copy; 2026 Big Freight Life</p>
        </div>
      </footer>
    </>
  );
}
