import type { ReactNode } from 'react';
import {
  HostedCta,
  HOSTED_PRICE,
  HOSTED_PERIOD,
  HOSTED_LIVE,
} from '@/components/cta';

const HERO_SUBLINE =
  'An AI second brain that remembers what you know and hands it back the moment you need it. Your thoughts, email, and meetings — searchable by meaning, connected to every AI tool you use.';

const DEED_PARAGRAPHS = [
  {
    lead: 'Every other second brain keeps your memory.',
    rest: 'Your most personal data lives on their servers, in their format, subject to their pivots and shutdowns. Getting it out — if you can at all — means a scrape, a zip of orphaned markdown, and a week of your life.',
  },
  {
    lead: 'Thoughtstead hands it back.',
    rest: 'Full export, any time, on any plan — every thought, contact, decision, and document, in formats you can actually read. We never train on your data and never sell it. If you leave, you leave with everything, and nothing about that depends on us still being here.',
  },
  {
    lead: 'And it works for you.',
    rest: "Built-in agents brief you each morning and tidy your records — but nothing leaves your Thoughtstead without your explicit approval. That's enforced in the database, not in a promise.",
  },
];

const STEPS = [
  {
    title: 'Capture',
    body: "From the app, your phone's share sheet, Claude or Cursor, Gmail and Calendar sync, or a bulk import of your existing notes.",
  },
  {
    title: 'Understand',
    body: 'AI enrichment links people, projects, and decisions automatically. No API key to manage — it is included.',
  },
  {
    title: 'Recall',
    body: 'Search by meaning, in the app or from any connected AI tool.',
  },
  {
    title: 'Work',
    body: 'Agents draft briefs and tidy records; every action leaves a receipt, and nothing goes out without your OK.',
  },
];

const INCLUDED = [
  'Semantic search',
  'Chat over your brain',
  'People & decisions memory',
  'Agent queue with receipts',
  'Gmail + Calendar sync',
  'Obsidian & ChatGPT import',
  'MCP server for AI clients',
  'Full export, always',
];

const COSTS = [
  { name: 'Thoughtstead', value: `${HOSTED_PRICE}/${HOSTED_PERIOD}` },
  { name: 'Hosting', value: 'Included' },
  { name: 'AI usage', value: 'Included — no key, no markup' },
  { name: 'Export your data', value: 'Free, always' },
];

const PRICING_BULLETS = [
  'Everything below, included',
  'AI usage — no API key to manage',
  'Full export, any time',
  'Cancel whenever; your export outlives us',
];

const FAQS = [
  {
    q: 'Do I need to be technical?',
    a: 'No. Sign in and start capturing — there is nothing to deploy, no account to create at another company, and no API key to manage. Connecting Gmail and Calendar is a normal permissions screen.',
  },
  {
    q: 'What do I get?',
    a: 'The whole product: capture from the web app, your phone, or your AI tools; semantic search and chat over everything; people, projects, and decisions memory; Gmail and Calendar sync; the MCP server so Claude, ChatGPT, and Cursor can recall what you know; the agent queue with receipts; and imports from Obsidian and ChatGPT.',
  },
  {
    q: 'Is my data private?',
    a: 'Your brain is yours. We never train on it and never sell it, every workspace is isolated at the database level, and outbound actions park for your explicit approval rather than firing on their own. Full export is always available.',
  },
  {
    q: 'Can I get my data out?',
    a: 'Any time, in one click, on any plan — thoughts, contacts, decisions, and documents in formats you can actually read. There is no retention trick here: the export exists so leaving is cheap.',
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
            A homestead for your thoughts.
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

        {/* Your memory, handed back */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">Your memory, handed back</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            {DEED_PARAGRAPHS.map((p) => (
              <p key={p.lead}>
                <strong className="font-semibold text-foreground">{p.lead}</strong> {p.rest}
              </p>
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

        {/* What's included */}
        <Section wide className="border-t border-foreground/10">
          <h2 className="text-center font-serif text-3xl md:text-4xl">What&rsquo;s included</h2>
          <ul className="mt-12 grid gap-x-8 gap-y-5 text-base sm:grid-cols-2 md:grid-cols-4">
            {INCLUDED.map((item) => (
              <li key={item} className="border-t border-foreground/15 pt-4 text-foreground/85">
                {item}
              </li>
            ))}
          </ul>
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
