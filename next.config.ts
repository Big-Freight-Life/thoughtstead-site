import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

// remark-gfm gives MDX GitHub Flavored Markdown — tables above all. Without it
// every `| a | b |` table in app/docs rendered as a line of raw pipes; the
// Costs pricing table and the self-deploy env-var table were both unreadable.
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
