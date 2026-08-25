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
    'One place that runs your business and the rest of your life. Invoices, clients, contracts and meetings alongside health, home upkeep and warranties — captured, connected, and acted on by AI. Business and personal stay separate. Full export, any time.',
  openGraph: {
    title: 'Thoughtstead',
    description: 'You run a business. You also have a life. Thoughtstead runs both.',
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
