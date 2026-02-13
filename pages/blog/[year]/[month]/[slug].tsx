import Image from 'next/image'

import { MarkdownProse } from '@/components/blog/MarkdownProse'
import { PostMeta as PostMetaView } from '@/components/blog/PostMeta'
import { SeoHead } from '@/components/SeoHead'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { compileMdx } from '@/lib/content/markdown'
import { getAllPostMeta, getPostByRoute } from '@/lib/content/posts'
import { buildSeo } from '@/lib/content/seo'
import type { PostMeta } from '@/lib/content/types'

export default function BlogPostPage({
  post,
  mdxSource
}: {
  post: PostMeta
  mdxSource: any
}) {
  const seo = buildSeo({
    title: post.title,
    description: post.summary,
    path: post.routePath,
    image: `/api/og?title=${encodeURIComponent(post.title)}`
  })

  return (
    <SiteLayout>
      <SeoHead {...seo} />
      <article className='post-detail-shell'>
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className='post-detail-image'
          priority
        />
        <div className='post-detail-body'>
          <p className='eyebrow'>Article</p>
          <h1>{post.title}</h1>
          <PostMetaView post={post} />
          <MarkdownProse source={mdxSource} />
        </div>
      </article>
    </SiteLayout>
  )
}

export function getStaticPaths() {
  const paths = getAllPostMeta().map((post) => ({
    params: {
      year: post.year,
      month: post.month,
      slug: post.slug
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postResult = getPostByRoute({
    year: params.year,
    month: params.month,
    slug: params.slug
  })

  if (!postResult) {
    return { notFound: true }
  }

  const mdxSource = await compileMdx(postResult.content)

  return {
    props: {
      post: postResult.meta,
      mdxSource
    }
  }
}
