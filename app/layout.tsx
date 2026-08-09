import type { Metadata } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL('https://thoughtstead.com'),
  title: { default: 'Thoughtstead — an AI second brain that remembers', template: '%s · Thoughtstead' },
  description:
    'An AI second brain that remembers what you know and hands it back when you need it. Capture thoughts, email, and meetings into a private, semantically searchable memory — connected to Claude, ChatGPT, and Cursor. Full export, any time.',
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
