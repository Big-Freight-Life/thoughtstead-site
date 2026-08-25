'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

// Scroll reveal.
//
// THREE ROUTES TO ONE FAILURE, all found on this branch, all of which left
// content permanently invisible while every gate was green:
//
//  1. Revealing only on `entry.isIntersecting`. A fast scroll — phone flick,
//     Page Down, anchor jump, scroll restore — moves an element from below the
//     viewport to above it between two frames, so it is never observed
//     intersecting. 31 of 68 blocks were blank.
//  2. The scroll listener that was meant to cover (1) received ZERO events
//     across a 400px programmatic scroll in a real browser. Hence the timeout
//     failsafe below.
//  3. `.reveal { opacity: 0 }` applied to everyone, with only JS able to undo
//     it — so a blocked bundle or an early hydration error meant a hero over a
//     blank page. That is fixed in CSS, not here: the rule is scoped to
//     `html.js`, set by an inline script before first paint.
//
// The condition is therefore not "did I see it enter" but "has it been
// reached" — top < viewport height — which is true whether the element is in
// view or has been scrolled past.
//
// One shared listener, not one per instance. Sixteen components each
// registering scroll+resize and each calling getBoundingClientRect meant every
// pre-reveal scroll frame forced up to sixteen separate synchronous layout
// reads. The registry below does one rAF-batched pass for all of them.

type Entry = { el: HTMLElement; done: boolean };

const registry = new Set<Entry>();
let listening = false;
let frame = 0;

function sweep() {
  frame = 0;
  const limit = window.innerHeight * 0.92;
  for (const entry of registry) {
    if (entry.done) continue;
    if (entry.el.getBoundingClientRect().top < limit) {
      entry.done = true;
      entry.el.classList.add('is-in');
      registry.delete(entry);
    }
  }
  if (registry.size === 0) stop();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(sweep);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
}

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

    const entry: Entry = { el, done: false };
    registry.add(entry);
    start();

    // Per-element observer for the common case; the shared sweep is the net
    // under it, and the timer is the net under that.
    const io = new IntersectionObserver(schedule, { threshold: 0 });
    io.observe(el);

    // FAILSAFE. Content visibility must never depend on animation logic being
    // right. An element appearing without its transition and a blank marketing
    // page are not comparable outcomes.
    const timer = window.setTimeout(() => {
      if (entry.done) return;
      entry.done = true;
      el.classList.add('is-in');
      registry.delete(entry);
    }, 3500);

    schedule();

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
      registry.delete(entry);
      if (registry.size === 0) stop();
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
