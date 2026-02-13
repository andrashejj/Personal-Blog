import type { PostMeta as PostMetaType } from '@/lib/content/types'

export function PostMeta({ post }: { post: PostMetaType }) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <p className='post-meta'>
      <span>{date}</span>
      <span aria-hidden='true'>•</span>
      <span>{post.readingTimeText}</span>
    </p>
  )
}
