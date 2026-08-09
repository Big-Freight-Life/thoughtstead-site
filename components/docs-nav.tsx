'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Grouped so the deployment guides cannot be mistaken for something you can do
// today: self-hosting ships after the hosted apps, and those two pages describe
// a path that is not currently available.
const DOCS_GROUPS = [
  {
    label: null,
    links: [
      { href: '/docs', label: 'Start here' },
      { href: '/docs/mcp', label: 'Connect AI tools' },
      { href: '/docs/connectors', label: 'Gmail & Calendar' },
      { href: '/docs/importers', label: 'Import your notes' },
      { href: '/docs/agents', label: 'Agents & approval' },
      { href: '/docs/costs', label: 'Costs' },
      { href: '/docs/license', label: 'Plan & billing' },
    ],
  },
  {
    label: 'Self-hosted — coming later',
    links: [
      { href: '/docs/click-and-go', label: 'Click-and-go deploy' },
      { href: '/docs/self-deploy', label: 'Self-deploy' },
    ],
  },
] as const;

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs">
      {DOCS_GROUPS.map((group, i) => (
        <div key={group.label ?? 'main'} className={i > 0 ? 'mt-6' : undefined}>
          {group.label && (
            <p className="px-3 pb-1 text-xs uppercase tracking-wide text-foreground/45">
              {group.label}
            </p>
          )}
          <ul className="space-y-1">
            {group.links.map((link) => {
              const isActive =
                link.href === '/docs' ? pathname === '/docs' : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-accent/10 font-medium text-accent'
                        : 'text-foreground/70 hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
