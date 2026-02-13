# Writing Posts

## Location

Create new posts in `content/posts` as `.mdx` files.

## Required frontmatter

- `title` (string)
- `date` (`YYYY-MM-DD`)
- `slug` (kebab-case)
- `summary` (string)
- `coverImage` (path under `/public/images/...`)

## Drafts

Set `draft: true` to keep a post out of production listings, RSS, and sitemap.

## URL format

Posts are published at:

`/blog/yyyy/mm/slug`

## Images

Store images under `public/images/posts` and reference them by absolute public path, e.g.:

`/images/posts/my-image.jpg`
