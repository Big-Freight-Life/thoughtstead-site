import type { SVGProps } from 'react';

type ThoughtsteadMarkProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  accent?: string;
  ink?: string;
  vein?: string;
};

/**
 * The Stead: a thought held across three isolated contexts.
 *
 * A T-shaped seam preserves the original mark's defining geometry: one mind,
 * three parts, no collapsed boundaries. The ink lower-left lobe is the human
 * anchor; the accent carries the connected system around it.
 *
 * These three values are the brand mark and are shared, deliberately, with the
 * app's --mark-accent / --mark-ink / --mark-vein and with every favicon both
 * properties serve. They were cobalt #2457ff on a near-black lobe until the
 * mark moved onto the app's dark top bar, where that pairing went muddy. If
 * you change one of them, change it in all three places or the site, the app
 * and the browser tab stop agreeing — which is the state this replaced.
 *
 * `vein` is separate from `ink` on purpose. The two were the same value until
 * the veins were drawn in near-black, which cost the mark twice: on the dark
 * top bar the strokes sat black-on-black and the crown read as a flat blue
 * blob, and at 24px on paper they barely registered at all. Cream is the same
 * warm token the rest of the identity uses, so it lightens the mark without
 * introducing a colour. Do NOT fix a vein problem by changing `ink` — that
 * value also fills the lower-left lobe, which is the contrast the mark is
 * built on.
 */
export function ThoughtsteadMark({
  accent = '#5f82ff',
  ink = '#716f68',
  vein = '#f0eee5',
  className,
  style,
  ...props
}: ThoughtsteadMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
      {...props}
    >
      <g className="thoughtstead-mark__crown">
        <path
          fill={accent}
          d="M6 40c-3-3-4-8-2-12-1-5 2-9 6-12 1-5 5-8 10-8 3-4 8-4 12 .5 4-4.5 10-3.5 13 .5 5 0 9 4 10 9 5 2 7 7 5 12 3 4 1 8-2 11-8.5 1.5-16.5-1-24 1-9.5 2-18-2.5-29-1Z"
        />
        <path className="thoughtstead-mark__vein" stroke={vein} d="M13 29c4.4-1.1 6.8-4 6.7-7.8-.1-2.8 1.5-4.9 4.2-6" />
        <path className="thoughtstead-mark__vein" stroke={vein} d="M39 15.5c-2.2 3.2-1 6.5 2.3 8.2 3.1 1.6 5.2 4 5.1 7.2" />
      </g>
      <g className="thoughtstead-mark__left">
        <path
          fill={ink}
          d="M6.5 42.3c7.5-1.5 16.5 2.1 24.1-.1 1.5 4.8-1.1 8.8.2 13-1.4 4.1-5.4 6.7-10.1 6.6-4.5-.1-8-2.5-10.1-6-4.2-.8-7-4-6.4-8.2.2-2 1.1-3.6 2.3-4.8Z"
        />
        <path className="thoughtstead-mark__vein" stroke={vein} d="M10.5 49.8c3.6-2.2 7.8-1.5 10.4 1.8" />
      </g>
      <g className="thoughtstead-mark__right">
        <path
          fill={accent}
          d="M33.8 42.2c7.5 2.2 16.5-1.4 23.8.2 2.4 2.5 3.5 6 2 9.2.8 4-2 7-6 7.7-2.8 3.5-7.5 4.4-11.6 2.1-4.4-1.1-7.4-3.8-7.5-7.3-1.4-4.2 1.4-8.1-.7-11.7Z"
        />
        <path className="thoughtstead-mark__vein" stroke={vein} d="M42 50.6c3.4-2.2 7.5-1.6 10.1 1.3" />
      </g>
    </svg>
  );
}

type ThoughtsteadLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  inverse?: boolean;
};

export function ThoughtsteadLogo({
  className,
  markClassName,
  wordmarkClassName,
  inverse = false,
}: ThoughtsteadLogoProps) {
  return (
    <span className={`thoughtstead-logo ${className ?? ''}`} aria-hidden="true">
      <ThoughtsteadMark
        ink={inverse ? '#f0eee5' : '#716f68'}
        className={`thoughtstead-logo__mark ${markClassName ?? ''}`}
      />
      <span className={`thoughtstead-logo__wordmark ${wordmarkClassName ?? ''}`}>
        Thoughtstead
      </span>
    </span>
  );
}
