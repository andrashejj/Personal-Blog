export type PostFrontmatter = {
  title: string
  date: string
  slug: string
  summary: string
  coverImage: string
  draft?: boolean
  tags?: string[]
  updated?: string
  readingTime?: number
  canonicalUrl?: string
}

export type Post = {
  frontmatter: PostFrontmatter
  content: string
  sourcePath: string
}

export type PostMeta = PostFrontmatter & {
  year: string
  month: string
  readingTimeText: string
  routePath: string
}
