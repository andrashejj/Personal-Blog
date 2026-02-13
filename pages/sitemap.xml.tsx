import type { GetServerSideProps } from 'next'

import { getAllPostMeta } from '@/lib/content/posts'
import { site, staticPages } from '@/lib/site'

function buildSitemapXml() {
  const posts = getAllPostMeta()

  const entries = [
    ...staticPages.map((page) => ({
      url: `${site.url}${page.path}`,
      priority: page.priority,
      lastmod: new Date().toISOString()
    })),
    ...posts.map((post) => ({
      url: `${site.url}${post.routePath}`,
      priority: 0.7,
      lastmod: new Date(post.updated || post.date).toISOString()
    }))
  ]

  const urls = entries
    .map(
      (entry) => `<url>\n  <loc>${entry.url}</loc>\n  <lastmod>${entry.lastmod}</lastmod>\n  <priority>${entry.priority.toFixed(1)}</priority>\n</url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
}

export default function Sitemap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = buildSitemapXml()
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
  res.write(xml)
  res.end()

  return { props: {} }
}
