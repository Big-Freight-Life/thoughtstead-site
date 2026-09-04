'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

type Screen = {
  src: string;
  alt: string;
  label: string;
  color: 'sky' | 'coral' | 'acid';
};

export function ProductScreen({ screen }: { screen: Screen }) {
  const [expanded, setExpanded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let lastScrollY = window.scrollY;
    let direction: 'up' | 'down' = 'down';
    let renderedScale = 1;
    let downStartY = lastScrollY;
    let downStartScale = 1;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const update = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = clamp((viewport - rect.top) / (viewport + rect.height));

      if (direction === 'up' && progress < 0.61) {
        const shrinking = clamp((0.61 - progress) / 0.72);
        renderedScale = mix(1, 0.82, shrinking);
      } else if (direction === 'up') {
        renderedScale = 1;
      } else {
        const downwardTravel = Math.max(0, window.scrollY - downStartY);
        const restoration = (downwardTravel / (viewport * 4)) * 0.18;
        renderedScale = Math.min(1, downStartScale + restoration);
      }

      const offset = ((1 - renderedScale) / 0.18) * 44;
      stage.style.setProperty('--scroll-scale', renderedScale.toFixed(4));
      stage.style.setProperty('--scroll-y', `${offset.toFixed(2)}px`);
      stage.style.setProperty('--scroll-opacity', '1');
    };

    const requestUpdate = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      if (delta > 0.5) {
        if (direction !== 'down') {
          downStartY = lastScrollY;
          downStartScale = renderedScale;
        }
        direction = 'down';
      }
      if (delta < -0.5) direction = 'up';
      lastScrollY = currentScrollY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [expanded]);

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--screen-rx', `${(-y * 1.25).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--screen-ry', `${(x * 1.6).toFixed(2)}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.setProperty('--screen-rx', '0deg');
    event.currentTarget.style.setProperty('--screen-ry', '0deg');
  }

  return (
    <>
      <div ref={stageRef} className={`story-screen-stage story-screen-${screen.color}`}>
        <div className="story-screen-card">
          <div className="story-screen-card-label" aria-hidden="true">
            <span>Thoughtstead / Product surface</span>
            <b>{screen.label}</b>
          </div>
          <button
            type="button"
            className="story-screen"
            onPointerMove={tilt}
            onPointerLeave={resetTilt}
            onClick={() => setExpanded(true)}
            aria-label={`Enlarge ${screen.label} screenshot placeholder`}
          >
            <span className="story-screen-top" aria-hidden="true">
              <i /><i /><i /><b>{screen.label}</b><em>Open screen ↗</em>
            </span>
            <Image src={screen.src} alt={screen.alt} width={1600} height={1000} sizes="(max-width: 768px) 94vw, 1660px" />
          </button>
          <div className="story-screen-card-foot" aria-hidden="true">
            <span>Actual interface</span>
            <i />
            <span>Click to inspect</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="screen-lightbox" role="dialog" aria-modal="true" aria-label={screen.label} onClick={() => setExpanded(false)}>
          <button type="button" onClick={() => setExpanded(false)} aria-label="Close enlarged screen">Close ×</button>
          <Image src={screen.src} alt={screen.alt} width={1600} height={1000} sizes="95vw" />
        </div>
      )}
    </>
  );
}
