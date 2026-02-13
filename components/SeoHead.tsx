import Head from 'next/head'

type Props = {
  title: string
  description: string
  canonicalUrl: string
  image: string
}

export function SeoHead({ title, description, canonicalUrl, image }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={canonicalUrl} />

      <meta property='og:type' content='article' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:image' content={image} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Head>
  )
}
