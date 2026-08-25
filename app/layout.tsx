import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// Instrument Sans: a modern grotesque with slightly narrow proportions, so
// large headlines set tight without the generic-geometric look. Not Inter, not
// Space Grotesk.
const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Its serif companion, used ONLY italic and only for the emphasised phrase in
// a headline. One warm note against an otherwise cold, tight typeface — it is
// what keeps the page from reading as another dark SaaS template.
const quote = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-quote',
  display: 'swap',
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
    <html lang="en" className={`${sans.variable} ${quote.variable}`}>
      <body className="bg-bg text-text antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
