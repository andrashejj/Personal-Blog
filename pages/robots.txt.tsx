import type { GetServerSideProps } from 'next'

import { site } from '@/lib/site'

export default function Robots() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.write(robots)
  res.end()

  return { props: {} }
}
