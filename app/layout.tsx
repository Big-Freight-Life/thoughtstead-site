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
    'One system where the meeting, the decision, the contract, the client and the invoice are the same connected record — wired by AI as work lands, not by you. It runs your household on the same engine, behind a wall. Full export, any time.',
  openGraph: {
    title: 'Thoughtstead',
    description: 'Your invoice knows which meeting it came from.',
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
