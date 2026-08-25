import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// The bfl.design pairing, adopted 2026-08-25 so the two properties read as one
// house. Two brand faces, not four — their tokens file is explicit about that,
// and it replaced Schibsted Grotesk + Georgia there on 2026-08-02.

// Body + UI. DM Sans is a rounded geometric with real optical sizes, so one
// family sets 14px labels and a 1.2rem standfirst without the small sizes
// inheriting display-cut spacing.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  // 400 and 500 only. next/font preloads every declared weight, and nothing in
  // app/ or components/ uses font-semibold or font-bold — 600 and 700 were two
  // files competing with the LCP hero for bandwidth and rendering nothing.
  weight: ['400', '500'],
});

// Display. Outfit is a pure geometric — circular bowls, monolinear strokes,
// terminals NOT softened. Round without being soft, which is the point.
//
// It is set at 600, never 400: bfl.design's tokens carry the warning and it is
// real. Being monolinear, Outfit has no stroke contrast to carry it, so a
// regular weight goes visibly weak at headline scale.
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  // 600 only — .display is Outfit's sole consumer and is set at 600, never 400.
  weight: ['600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thoughtstead.com'),
  title: {
    default: 'Thoughtstead — a life operating system',
    template: '%s · Thoughtstead',
  },
  description:
    'Nothing you own holds both halves of a life, so you hold them. Thoughtstead is a life operating system: it takes the contract and the furnace warranty alike, connects it all as it lands, and does the chasing. Business and personal stay walled off. Full export, any time.',
  openGraph: {
    title: 'Thoughtstead',
    description: 'You are the only thing holding it together.',
    url: 'https://thoughtstead.com',
    siteName: 'Thoughtstead',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <head>
        {/* Marks the document as JS-capable BEFORE first paint, which is what
            licenses .reveal to start hidden. If this never runs, nothing is
            ever hidden and the page renders complete without animation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="bg-bg text-text antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
