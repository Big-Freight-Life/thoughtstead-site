import type { SVGProps } from 'react';

/**
 * The Big Freight Life folder mark.
 *
 * COPIED, NOT IMPORTED. The original lives in the bfl-design repo at
 * `src/components/common/BrandLogomark.tsx`; this site cannot reach across
 * repos, so the geometry is duplicated here. If the mark is redrawn there,
 * redraw it here — there is no build step that will catch the drift.
 *
 * Drawn in `currentColor` so it takes the tone of whatever it sits on, which
 * is the whole reason the original stopped being a two-PNG light/dark pair.
 *
 * ⚠ THE RING IS A KNOCKOUT, NOT A STROKE. One path, three subpaths,
 * `fill-rule="evenodd"`: the folder fills, the ring's outer stadium subtracts,
 * the inner one fills back in. Drawn as a stroked rect the island fills and
 * the mark is lost.
 */
export function BigFreightLifeMark({ className, ...props }: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 52,48 L 240,48 A 12,12 0 0 1 252,60 L 252,116 A 12,12 0 0 0 264,128
          L 460,128 A 12,12 0 0 1 472,140 L 472,452 A 12,12 0 0 1 460,464
          L 52,464 A 12,12 0 0 1 40,452 L 40,60 A 12,12 0 0 1 52,48 Z
          M 192,220 L 320,220 A 60,60 0 0 1 320,340 L 192,340 A 60,60 0 0 1 192,220 Z
          M 192,248 L 320,248 A 32,32 0 0 1 320,312 L 192,312 A 32,32 0 0 1 192,248 Z
        "
      />
    </svg>
  );
}
