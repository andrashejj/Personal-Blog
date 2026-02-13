import Image from 'next/image'
import Link from 'next/link'

import type { PostMeta } from '@/lib/content/types'

import { PostMeta as Meta } from './PostMeta'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className='post-card'>
      <Link href={post.routePath} className='card-cover'>
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className='cover-image'
        />
      </Link>
      <div className='card-body'>
        <Meta post={post} />
        <h2>
          <Link href={post.routePath}>{post.title}</Link>
        </h2>
        <p>{post.summary}</p>
        <Link href={post.routePath} className='read-more'>
          Read article
        </Link>
      </div>
    </article>
  )
}
