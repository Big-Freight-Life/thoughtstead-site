'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

// Scroll reveal.
//
// THE BUG THIS IS SHAPED AROUND (found 2026-08-25, on a page that passed every
// gate): the first version revealed only on `entry.isIntersecting`. A fast
// scroll — a phone flick, a Page Down, a jump to an anchor, a reload that
// restores scroll position — moves an element from below the viewport to above
// it between two animation frames. It is never observed intersecting, so it
// never got the class, so it stayed at opacity 0 FOREVER. Thirty-one of
// sixty-eight elements were permanently invisible and the build was green.
//
// So the condition is not "did I see it enter" but "has it been reached":
// top < viewport height. That is true whether the element is in view or has
// been scrolled past, which is the whole point. It is checked on mount and on
// every intersection change, and there is a scroll backstop for the case where
// no intersection change fires at all.
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let done = false;
    let timer = 0;
    const reveal = () => {
      if (done) return;
      done = true;
      el.classList.add('is-in');
      window.clearTimeout(timer);
      io.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    // "Reached" — in view OR already scrolled past. Never just "intersecting".
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) reveal();
    };

    const io = new IntersectionObserver(check, { threshold: 0 });
    io.observe(el);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check();

    // FAILSAFE. Content visibility must never depend on animation logic being
    // right. Observed on 2026-08-25: in at least one real browser context the
    // window scroll event did not reach this listener at all (0 events across a
    // 400px programmatic scroll), which on its own would have left most of the
    // page permanently invisible — the exact failure this file already exists
    // to prevent, arriving by a second route.
    //
    // So after a few seconds, everything reveals regardless. The worst case is
    // an element appearing without its transition. The worst case WITHOUT this
    // is a blank marketing page, and those are not comparable.
    timer = window.setTimeout(reveal, 3500);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
