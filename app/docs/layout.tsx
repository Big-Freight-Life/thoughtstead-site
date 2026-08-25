import type { ReactNode } from 'react';
import Link from 'next/link';
import { DocsNav } from '@/components/docs-nav';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <Link href="/" className="text-sm lowercase tracking-wide text-foreground/70 hover:text-accent">
          thoughtstead
        </Link>
      </header>

      <div className="mx-auto max-w-5xl gap-10 px-6 py-10 md:flex md:py-16">
        <aside className="mb-8 shrink-0 md:mb-0 md:w-56 md:self-start md:sticky md:top-10">
          <DocsNav />
        </aside>

        <article className="prose prose-invert min-w-0 max-w-2xl prose-headings:font-serif prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-foreground/5 prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-strong:text-foreground prose-hr:border-foreground/15 prose-pre:bg-surface-2 prose-pre:text-text prose-pre:border prose-pre:border-line-2">
          {children}
        </article>
      </div>
    </>
  );
}
