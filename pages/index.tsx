import Link from 'next/link'
import Image from 'next/image'

import { PostCard } from '@/components/blog/PostCard'
import { SeoHead } from '@/components/SeoHead'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { buildSeo } from '@/lib/content/seo'
import { getAllPostMeta } from '@/lib/content/posts'
import type { PostMeta } from '@/lib/content/types'

export default function HomePage({ posts }: { posts: PostMeta[] }) {
  const seo = buildSeo({ path: '/' })

  return (
    <SiteLayout>
      <SeoHead {...seo} />
      <section className='hero'>
        <Image
          src='/images/posts/andras.png'
          alt='Portrait of Andras'
          className='hero-image'
          width={120}
          height={120}
          priority
        />
        <div className='hero-content'>
          <h1 className=''>Hi, I’m Andras</h1>
          <p>Founder, software engineer, husband, dad.</p>
          <p>
            Made with 💕 in Budapest, 🌳 up in Switzerland, enjoying 🏄‍♂️ in Mauritius!
          </p>
          <div className='hero-actions'>
            <Link href='/blog' className='primary-btn'>
              Browse posts
            </Link>
            <Link href='/about' className='primary-btn'>
              Read intro
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className='section-head'>
          <h2>Latest posts</h2>
          <Link href='/blog'>All posts</Link>
        </div>

        <div className='post-grid'>
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.routePath} post={post} />
          ))}
        </div>
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
