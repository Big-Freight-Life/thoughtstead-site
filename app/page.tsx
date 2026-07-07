import type { ReactNode } from 'react';
import { BuyButton } from '@/components/buy-button';

const HERO_SUBLINE =
  "The AI second brain you own — not rent. Your memory, searchable by meaning, living in your own accounts, connected to every AI tool you use. Pay once. It's yours.";

const LEASE_PARAGRAPHS = [
  {
    lead: 'Every other second brain is a lease.',
    rest: 'Notion, Mem, Reflect — $10–20 a month, forever, with your most personal data living on their servers, subject to their pivots, price hikes, and shutdowns.',
  },
  {
    lead: 'Thoughtstead is a deed.',
    rest: 'You pay once and get the whole product: a private memory that captures your thoughts, your Gmail, your calendar, and your imported notes, understands them with AI, and hands them back the moment you need them — by meaning, not keywords. It deploys to your own free-tier cloud accounts in minutes, uses your own AI keys (typical cost: under $2/month), and connects to Claude, ChatGPT, and Cursor so your AI tools finally remember what you know.',
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
    body: 'AI enrichment links people, projects, and decisions — using your own keys, at cost.',
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
  { name: 'Thoughtstead', value: '$299 once' },
  { name: 'Vercel', value: '$0 (Hobby tier)' },
  { name: 'Supabase', value: '$0 (free tier)' },
  { name: 'AI usage', value: '~$1–2/mo (your own key)' },
];

const PRICING_BULLETS = [
  'Full source code',
  'Private repo access forever',
  '12 months of updates',
  'Deploy in ~10 minutes',
];

const FAQS = [
  {
    q: 'Do I need to be technical?',
    a: "You don't need to write code, but you'll need to be comfortable following a setup guide — creating free Vercel and Supabase accounts, running one deploy command, and adding your own AI API key. If you can install a browser extension, you can do this.",
  },
  {
    q: 'What exactly do I get?',
    a: 'A private GitHub repository with the full source, deployed to your own Vercel and Supabase accounts. That includes the web app, the MCP server for AI clients, Gmail and Calendar sync, the agent queue, import tools for Obsidian and ChatGPT exports, and 12 months of updates.',
  },
  {
    q: 'What are the running costs?',
    a: "Vercel's Hobby tier and Supabase's free tier cover hosting at $0/month. The only real cost is AI usage on your own API key — typically $1–2/month depending on how much you capture and search.",
  },
  {
    q: 'Can my team use it?',
    a: "Yes. Invite your team into your deployed instance — that's covered by your purchase. You'd only buy another license if someone wants their own separate deployment and repo access.",
  },
  {
    q: 'What happens after 12 months?',
    a: "You keep everything — the code, your repo, your live deployment — forever. After 12 months you stop receiving new updates unless you renew, but nothing you've already deployed stops working.",
  },
  {
    q: 'Refunds?',
    a: 'Yes — 14 days, no questions asked. Refunds are handled by Polar, our merchant of record.',
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
            <BuyButton large />
          </div>
          <p className="mt-4 text-sm text-foreground/60">
            One-time purchase &middot; 12 months of updates &middot; runs for ~$1–2/mo in your own
            accounts
          </p>
        </Section>

        {/* Lease vs deed */}
        <Section className="border-t border-foreground/10">
          <h2 className="font-serif text-3xl md:text-4xl">Lease vs. deed</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            {LEASE_PARAGRAPHS.map((p) => (
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
          <h2 className="font-serif text-3xl md:text-4xl">Honest costs</h2>
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
            No subscription to us. No markup on AI. Ever.
          </p>
        </Section>

        {/* Pricing */}
        <Section className="border-t border-foreground/10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Pricing</h2>
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-foreground/15 p-10">
            <div className="flex items-baseline justify-center gap-3">
              <s className="text-2xl text-foreground/40">$299</s>
              <span className="font-serif text-5xl">$199</span>
            </div>
            <p className="mt-2 text-sm text-foreground/60">with code LAUNCH</p>
            <ul className="mx-auto mt-8 max-w-xs space-y-2 text-left text-sm text-foreground/80">
              {PRICING_BULLETS.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-accent">&mdash;</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <BuyButton large />
            </div>
            <p className="mt-4 text-sm text-foreground/60">Pay once. Remember forever.</p>
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
