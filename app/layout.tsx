import type { Metadata } from 'next';
import { DM_Sans, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// The bfl.design pairing, adopted 2026-08-25 so the two properties read as one
// house. Two brand faces, not four — their tokens file is explicit about that,
// and it replaced Schibsted Grotesk + Georgia there on 2026-08-02.

// Body + UI. DM Sans is variable with a real optical-size axis (9-40), so one
// family sets an 11px label and a 95px headline without the small sizes
// inheriting display-cut spacing.
//
// NO `weight` ARRAY, deliberately, and matching the app's own declaration:
// pinning weights drops the variable font and the axis with it. The previous
// comment here claimed 600 and 700 "rendered nothing" because nothing used
// them. That was measured against app/ and components/ markup only, and it was
// wrong: the weights live in globals.css, where the page asks for 550, 600,
// 650, 700, 750 and 900. With only 400 and 500 loaded the browser SYNTHESISED
// all six — including the 700 on a 95px h1, which is faux bold at display
// scale and the most visible typographic defect a page can carry.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thoughtstead.com'),
  title: {
    default: 'Thoughtstead — a life operating system',
    template: '%s · Thoughtstead',
  },
  description:
    'Everything helps you build it. Nothing says if you should. Thoughtstead connects the brief, ticket, evidence, and system design behind an AI feature.',
  openGraph: {
    title: 'Thoughtstead',
    description: 'Everything helps you build it. Nothing says if you should.',
    url: 'https://thoughtstead.com',
    siteName: 'Thoughtstead',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is on the <html> element ONLY, and only because
    // the inline script below deliberately adds a class to it before React
    // hydrates. Without this, every page load logs "a tree hydrated but some
    // attributes of the server rendered HTML didn't match" — the class list is
    // the mismatch, by design. React's own guidance is to suppress on the
    // element whose attributes are intentionally changed. It does not extend to
    // children, so a real mismatch anywhere in the page still reports.
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
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
