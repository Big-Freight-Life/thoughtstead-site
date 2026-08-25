'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// A flat list. This was two labelled groups, and the grouping existed for one
// reason: to fence off "Click-and-go deploy" and "Self-deploy" under a
// "Self-hosted — coming later" heading so nobody mistook them for something
// they could do. Those pages were deleted on 2026-08-11 — Thoughtstead is a
// subscription to one instance we run, with no self-hosted tier — and a group
// machinery with exactly one unlabelled group left behind implies a structure
// that no longer exists.
const DOCS_LINKS = [
  { href: '/docs', label: 'Start here' },
  { href: '/docs/mcp', label: 'Connect AI tools' },
  { href: '/docs/connectors', label: 'Gmail & Calendar' },
  { href: '/docs/importers', label: 'Import your notes' },
  { href: '/docs/agents', label: 'Agents & approval' },
  { href: '/docs/costs', label: 'Costs' },
  { href: '/docs/license', label: 'Plan & billing' },
] as const;

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs">
      <ul className="space-y-1">
        {DOCS_LINKS.map((link) => {
          // '/docs' would prefix-match every child, so it alone compares exactly.
          const isActive =
            link.href === '/docs' ? pathname === '/docs' : pathname?.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-accent-soft font-medium text-accent'
                    : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
