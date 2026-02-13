import fs from 'node:fs'
import path from 'node:path'

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')

export function getPageContent(pageSlug: 'about'): string {
  const filePath = path.join(PAGES_DIR, `${pageSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing content page: ${filePath}`)
  }

  return fs.readFileSync(filePath, 'utf8')
}
