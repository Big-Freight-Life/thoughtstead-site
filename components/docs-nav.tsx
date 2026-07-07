'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DOCS_LINKS = [
  { href: '/docs', label: 'Start here' },
  { href: '/docs/click-and-go', label: 'Click-and-go deploy' },
  { href: '/docs/self-deploy', label: 'Self-deploy' },
  { href: '/docs/mcp', label: 'Connect AI tools' },
  { href: '/docs/connectors', label: 'Gmail & Calendar' },
  { href: '/docs/importers', label: 'Import your notes' },
  { href: '/docs/agents', label: 'Agents & approval' },
  { href: '/docs/costs', label: 'Costs' },
  { href: '/docs/license', label: 'License & updates' },
] as const;

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs">
      <ul className="space-y-1">
        {DOCS_LINKS.map((link) => {
          const isActive = link.href === '/docs' ? pathname === '/docs' : pathname?.startsWith(link.href);
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
    </nav>
  );
}
