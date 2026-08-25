import type { Metadata } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif' });

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
    <html lang="en" className={serif.variable}>
      <body className="bg-[#FAF7F2] text-[#1A1714] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
