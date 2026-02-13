import RSS from 'rss'

import { site } from '@/lib/site'

import type { PostMeta } from './types'

export function buildRssXml(posts: PostMeta[]) {
  const feed = new RSS({
    title: site.title,
    description: site.description,
    feed_url: `${site.url}/rss.xml`,
    site_url: site.url,
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} ${site.author}`
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${site.url}${post.routePath}`,
      date: post.updated || post.date,
      categories: post.tags || []
    })
  })

  return feed.xml({ indent: true })
}
