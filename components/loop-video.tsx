'use client';

import { useEffect, useRef } from 'react';

type LoopVideoProps = {
  webm: string;
  mp4: string;
  poster: string;
  className?: string;
};

/**
 * A decorative looping graphic. It plays only while on screen and never when
 * the visitor asks for reduced motion, in which case the poster frame (the
 * finished state) is shown. The meaning is carried by the text beside it, so
 * the video is hidden from assistive technology.
 */
export function LoopVideo({ webm, mp4, poster, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
