import type { ReactNode } from 'react';
import { DocsNav } from '@/components/docs-nav';
import { SiteNav, SiteFooter } from '@/components/site-chrome';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />

      <div className="mx-auto max-w-6xl gap-14 px-6 py-16 md:flex md:py-20">
        <aside className="mb-8 shrink-0 md:mb-0 md:w-56 md:self-start md:sticky md:top-10">
          <DocsNav />
        </aside>

        <article className="prose doc-prose min-w-0 max-w-2xl prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal">
          {children}
        </article>
      </div>
      <SiteFooter />
    </>
  );
}
