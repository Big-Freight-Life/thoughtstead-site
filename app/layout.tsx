import type { Metadata } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL('https://thoughtstead.com'),
  title: { default: 'Thoughtstead — the second brain you own', template: '%s · Thoughtstead' },
  description:
    'An AI second brain you actually own. Capture thoughts, email, and meetings into a private, semantically searchable memory that runs in your own cloud accounts. One-time purchase.',
  openGraph: {
    title: 'Thoughtstead',
    description: 'A homestead for your thoughts.',
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
