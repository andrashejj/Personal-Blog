import { PostCard } from '@/components/blog/PostCard'
import { SeoHead } from '@/components/SeoHead'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { getAllPostMeta } from '@/lib/content/posts'
import { buildSeo } from '@/lib/content/seo'
import type { PostMeta } from '@/lib/content/types'

export default function BlogIndexPage({ posts }: { posts: PostMeta[] }) {
  const seo = buildSeo({ title: 'Blog', path: '/blog' })

  return (
    <SiteLayout>
      <SeoHead {...seo} />
      <section>
        <h1>Blog</h1>
        <p className='section-copy'>A chronologically organized archive of articles.</p>
      </section>

      <section className='post-grid'>
        {posts.map((post) => (
          <PostCard key={post.routePath} post={post} />
        ))}
      </section>
    </SiteLayout>
  )
}

export function getStaticProps() {
  return {
    props: {
      posts: getAllPostMeta()
    }
  }
}
