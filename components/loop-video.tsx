'use client';

import { useEffect, useRef } from 'react';

type Source = { webm: string; mp4: string; poster: string };

type LoopVideoProps = {
  /** The wide version, shown on tablets and desktops. */
  wide: Source;
  /** An optional portrait version, shown on phones where the wide one would be unreadably small. */
  phone?: Source;
  className?: string;
};

/**
 * A decorative looping graphic. It plays only while on screen and never when
 * the visitor asks for reduced motion, in which case the poster frame (the
 * finished state) is shown. The meaning is carried by the text beside it, so
 * the videos are hidden from assistive technology. The wide and phone versions
 * are both in the page and CSS shows one; a hidden video is never on screen, so
 * it never plays.
 */
export function LoopVideo({ wide, phone, className }: LoopVideoProps) {
  const wideRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videos = [wideRef.current, phoneRef.current].filter(
      (video): video is HTMLVideoElement => video !== null,
    );
    if (videos.length === 0) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      videos.forEach((video) => video.pause());
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.25 },
    );
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  const attributes = { muted: true, loop: true, playsInline: true, preload: 'none' as const, 'aria-hidden': true, tabIndex: -1 };

  return (
    <>
      <video ref={wideRef} className={`${className ?? ''} loop-video-wide`} poster={wide.poster} {...attributes}>
        <source src={wide.webm} type="video/webm" />
        <source src={wide.mp4} type="video/mp4" />
      </video>
      {phone ? (
        <video ref={phoneRef} className={`${className ?? ''} loop-video-phone`} poster={phone.poster} {...attributes}>
          <source src={phone.webm} type="video/webm" />
          <source src={phone.mp4} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
