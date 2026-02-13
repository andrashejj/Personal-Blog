import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type Props = {
  source: MDXRemoteSerializeResult
  variant?: 'default' | 'about'
}

export function MarkdownProse({ source, variant = 'default' }: Props) {
  return (
    <article className={`prose prose-${variant}`}>
      <MDXRemote {...source} />
    </article>
  )
}
