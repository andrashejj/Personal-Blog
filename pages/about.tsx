import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { MarkdownProse } from '@/components/blog/MarkdownProse'
import { SeoHead } from '@/components/SeoHead'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { compileMdx } from '@/lib/content/markdown'
import { getPageContent } from '@/lib/content/pages'
import { buildSeo } from '@/lib/content/seo'

export default function AboutPage({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
  const seo = buildSeo({ title: 'About', path: '/about' })

  return (
    <SiteLayout>
      <SeoHead {...seo} />
      <MarkdownProse source={mdxSource} variant='about' />
    </SiteLayout>
  )
}

export async function getStaticProps() {
  const mdxSource = await compileMdx(getPageContent('about'))

  return {
    props: {
      mdxSource
    }
  }
}
