import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    // Next 16 gates `quality` behind an allowlist; a value that is not listed
    // is silently ignored and falls back to 75. The hero was asking for 90 and
    // shipping q=75 in every srcset entry — no error, no warning, just a
    // quieter image than intended on the largest asset on the page.
    qualities: [75, 90],
  },
};

// remark-gfm gives MDX GitHub Flavored Markdown — tables above all. Without it
// every `| a | b |` table in app/docs rendered as a line of raw pipes; the
// Costs pricing table was unreadable without it.
//
// The plugin is named as a STRING, not imported and passed as a function:
// Turbopack has to serialize the config, so the function form silently fails
// there. See node_modules/next/dist/docs/01-app/02-guides/mdx.md
// ("Using Plugins with Turbopack").
export default createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
  },
})(nextConfig);
