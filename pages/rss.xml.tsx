import type { GetServerSideProps } from 'next'

import { buildRssXml } from '@/lib/content/feed'
import { getAllPostMeta } from '@/lib/content/posts'

export default function Rss() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = buildRssXml(getAllPostMeta())

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
  res.write(xml)
  res.end()

  return { props: {} }
}
