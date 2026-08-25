import type { ReactNode } from 'react';
import {
  HostedCta,
  HOSTED_PRICE,
  HOSTED_PERIOD,
  HOSTED_LIVE,
} from '@/components/cta';

// Positioning, settled 2026-08-25. Thoughtstead is a LIFE operating system, not
// an "AI second brain" and not a "business OS":
//
//   - "Second brain" promised recall and nothing else. It undersold a product
//     that runs invoices, meetings, decisions and agents, and it borrowed a
//     crowded category from Notion/Obsidian/Mem.
//   - "Business OS" is contested (Notion, ClickUp, Monday, Odoo) and strands
//     half the product: /health, /lifestyle, /maintenance and /warranties are
//     personal-life surfaces that ship today.
//
// The promise is the whole life; the proof is business-grade. Nobody subscribes
// for their life, they subscribe for their company — so the evidence below is
// AP/AR, clients, contracts and receipts, and the turn is that the same
// machinery runs the personal side. Keep that sequence if you rewrite this.
//
// Audience is named by situation, never by label. "Solopreneur" was considered
// and dropped on 2026-08-25: it self-selects but reads as marketer-speak to the
// founders, CEOs and operators it describes.

const HERO_SUBLINE =
  'Thoughtstead is a life operating system: one place that captures everything you are carrying, connects it, and does the work you would otherwise be doing at eleven at night. Your company and the rest of your life, side by side — never mixed.';

const PROBLEM_PARAGRAPHS = [
  {
    lead: 'Your business is scattered across six tools.',
    rest: 'The invoice is in one, the meeting in another, the conversation is in your inbox, and the reason you decided any of it is in your head.',
  },
  {
    lead: 'Your life is in none of them.',
    rest: 'The renewal, the appointment, the warranty that lapses in March, the thing you promised on Sunday. No tool built for work will hold those, so they never get a system at all.',
  },
  {
    lead: 'So you hold it.',
    rest: 'Nothing is lost, exactly — it is just all on you, all the time, using the exact attention you needed for the actual work.',
  },
];

// Both columns are real routes in the product, not a roadmap. If you edit this
// list, check it against the app's nav first — an aspirational line here is how
// the promise starts outrunning what ships.
const RUNS = [
  {
    context: 'Business',
    blurb: 'The company, run out of one place.',
    items: [
      'Invoices out and bills in — what you are owed, what you owe',
      'Clients, vendors, and contracts',
      'Meetings, recorded and transcribed',
      'Projects, and the decisions behind them',
      'Documents, filed and searchable by meaning',
      'People — every thread, every promise, every detail',
    ],
  },
  {
    context: 'Personal',
    blurb: 'Everything else, run just as well.',
    items: [
      'Health — appointments, checkups, what is due',
      'Home and auto upkeep',
      'Warranties and coverage windows',
      'Lifestyle plans, and the things you meant to get to',
      'The same search, across all of it',
      'The same agents, working on it',
    ],
  },
];

const STEPS = [
  {
    title: 'Capture',
    body: 'Type it, say it, or let it listen. Meetings record on your Mac, Gmail and Calendar sync themselves, and your phone catches the rest.',
  },
  {
    title: 'Connect',
    body: 'AI reads everything as it lands and links it up — this invoice to that client, this decision to that meeting, this person to the last four times they came up.',
  },
  {
    title: 'Recall',
    body: 'Ask in plain language, get the answer instead of a list of links — in the app, or from Claude, ChatGPT, and Cursor.',
  },
  {
    title: 'Act',
    body: 'Agents draft the brief, chase the invoice, tidy the record. Every action leaves a receipt, and nothing goes out without your OK.',
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
  {
    lead: 'And it works for you.',
    rest: "Built-in agents brief you each morning and tidy your records — but nothing leaves your Thoughtstead without your explicit approval. That's enforced in the database, not in a promise.",
  },
];

const COSTS = [
  { name: 'Thoughtstead', value: `${HOSTED_PRICE}/${HOSTED_PERIOD}` },
  { name: 'Hosting', value: 'Included' },
  { name: 'AI usage', value: 'Included — no key, no markup' },
  { name: 'Export your data', value: 'Free, always' },
];

const PRICING_BULLETS = [
  'Every context — business and personal',
  'AI usage, with no API key to manage',
  'Full export, any time',
  'Cancel whenever; your export outlives us',
];

const FAQS = [
  {
    q: 'What does "life operating system" actually mean?',
    a: 'That it does not stop at the office door. The same system that tracks what a client owes you tracks when your car is due for service and when the warranty on your furnace runs out. One place to capture, one place to search, one set of agents doing the follow-through — over your work and over the rest of it.',
  },
  {
    q: 'Does my personal life get mixed into my business?',
    a: 'No. Business and Personal are separate contexts, isolated from each other at the database level. Searching in one never returns the other, and an agent working in one cannot see into the other. You switch between them deliberately, and you can add as many as you need — a second company, a side project, a household.',
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
    q: 'Can I get my data out?',
    a: 'Any time, in one click, on any plan — thoughts, contacts, decisions, invoices, and documents in formats you can actually read. There is no retention trick here: the export exists so leaving is cheap.',
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

export default function Home() {
  return (
    <>
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <span className="text-sm lowercase tracking-wide text-foreground/70">thoughtstead</span>
      </header>

      <main>
        {/* Hero */}
        <Section className="pt-8 text-center md:pt-12">
          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl">
            You run a business.
            <br />
            You also have a life.
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

        {/* The problem */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">It moves faster than anyone can hold</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            {PROBLEM_PARAGRAPHS.map((p) => (
              <p key={p.lead}>
                <strong className="font-semibold text-foreground">{p.lead}</strong> {p.rest}
              </p>
            ))}
          </div>
        </Section>

        {/* Contexts — the differentiator */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">Business and personal, side by side</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Thoughtstead runs on contexts. Business is one. Personal is another. Add a second
              company, a side project, a household — as many as you need.
            </p>
            <p>
              You move between them like rooms in the same house: same capture, same search, same
              agents. What they never do is bleed. A context is isolated at the database level, not
              by you remembering which app you were supposed to have open.
            </p>
          </div>
        </Section>

        {/* What it runs */}
        <Section wide className="border-t border-foreground/10">
          <h2 className="text-center font-serif text-3xl md:text-4xl">What it runs</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-foreground/70">
            Not a notes app with folders. Real surfaces for the things you are actually responsible
            for.
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {RUNS.map((col) => (
              <div key={col.context}>
                <h3 className="font-serif text-2xl">{col.context}</h3>
                <p className="mt-1 text-sm text-foreground/60">{col.blurb}</p>
                <ul className="mt-6 space-y-4 text-base">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-foreground/15 pt-4 text-foreground/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section wide className="border-t border-foreground/10">
          <h2 className="text-center font-serif text-3xl md:text-4xl">How it works</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title}>
                <div className="text-sm text-accent">0{i + 1}</div>
                <h3 className="mt-2 font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* It starts on your Mac */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">It starts on your Mac</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Thoughtstead is a Mac app, and that is the point. A browser tab cannot sit in your
              meeting and listen. The Mac app records what is said, transcribes it, and files it
              against the client it belongs to — then stays a keystroke away for the thought you
              need to get down before it goes.
            </p>
            <p>
              The web app is still there for the machine that is not yours, and your phone catches
              whatever happens away from the desk.
            </p>
          </div>
        </Section>

        {/* Your memory, handed back */}
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
