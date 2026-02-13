import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import readingTime from 'reading-time'

import { site } from '@/lib/site'

import type { Post, PostFrontmatter, PostMeta } from './types'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const REQUIRED_FIELDS: Array<keyof PostFrontmatter> = [
  'title',
  'date',
  'slug',
  'summary',
  'coverImage'
]

function assertFrontmatter(
  frontmatter: Partial<PostFrontmatter>,
  sourcePath: string
): asserts frontmatter is PostFrontmatter {
  for (const field of REQUIRED_FIELDS) {
    const value = frontmatter[field]
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(`Invalid frontmatter in ${sourcePath}: missing "${field}"`)
    }
  }

  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    throw new Error(`Invalid frontmatter in ${sourcePath}: "tags" must be an array`)
  }
}

function getRouteParts(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid date "${date}". Expected ISO format YYYY-MM-DD.`)
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`)
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date "${date}". Expected ISO format YYYY-MM-DD.`)
  }

  const year = String(parsedDate.getUTCFullYear())
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0')
  return { year, month, parsedDate }
}

function toMeta(post: Post): PostMeta {
  const { year, month } = getRouteParts(post.frontmatter.date)
  const rt = post.frontmatter.readingTime ?? readingTime(post.content).minutes
  const readingTimeText = `${Math.max(1, Math.ceil(rt))} min read`
  const routePath = `/blog/${year}/${month}/${post.frontmatter.slug}`

  return {
    ...post.frontmatter,
    year,
    month,
    readingTimeText,
    routePath
  }
}

export function getAllPosts({ includeDrafts = false } = {}): Post[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => (file.endsWith('.mdx') || file.endsWith('.md')) && !file.startsWith('_'))

  const posts = files.map((fileName) => {
    const sourcePath = path.join(POSTS_DIR, fileName)
    const raw = fs.readFileSync(sourcePath, 'utf8')
    const { data, content } = matter(raw)

    assertFrontmatter(data as Partial<PostFrontmatter>, sourcePath)
    getRouteParts((data as PostFrontmatter).date)

    return {
      frontmatter: data as PostFrontmatter,
      content,
      sourcePath
    }
  })

  const filtered = includeDrafts
    ? posts
    : posts.filter((post) => !post.frontmatter.draft)

  const slugSet = new Set<string>()
  filtered.forEach((post) => {
    const slug = post.frontmatter.slug
    if (slugSet.has(slug)) {
      throw new Error(`Duplicate slug "${slug}" found in content/posts`)
    }
    slugSet.add(slug)
  })

  return filtered.sort((a, b) => {
    const aTime = new Date(a.frontmatter.date).getTime()
    const bTime = new Date(b.frontmatter.date).getTime()
    return bTime - aTime
  })
}

export function getAllPostMeta(opts?: { includeDrafts?: boolean }): PostMeta[] {
  return getAllPosts(opts).map(toMeta)
}

export function getPostByRoute(params: {
  year: string
  month: string
  slug: string
  includeDrafts?: boolean
}): (Post & { meta: PostMeta }) | null {
  const posts = getAllPosts({ includeDrafts: params.includeDrafts })

  const found = posts.find((post) => {
    const meta = toMeta(post)
    return (
      meta.year === params.year &&
      meta.month === params.month &&
      meta.slug === params.slug
    )
  })

  if (!found) return null
  return { ...found, meta: toMeta(found) }
}

export function getAbsoluteUrl(pathname: string) {
  return `${site.url}${pathname}`
}
