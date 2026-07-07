import type { MetadataRoute } from 'next';

const BASE_URL = 'https://thoughtstead.com';

const DOCS_SLUGS = [
  'agents',
  'click-and-go',
  'connectors',
  'costs',
  'importers',
  'license',
  'mcp',
  'self-deploy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...DOCS_SLUGS.map(
      (slug): MetadataRoute.Sitemap[number] => ({
        url: `${BASE_URL}/docs/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    ),
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
