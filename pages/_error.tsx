import type { NextPageContext } from 'next'

import { SeoHead } from '@/components/SeoHead'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { buildSeo } from '@/lib/content/seo'

type Props = { statusCode?: number }

export default function ErrorPage({ statusCode }: Props) {
  const seo = buildSeo({ title: 'Error', path: '/_error' })

  return (
    <SiteLayout>
      <SeoHead {...seo} />
      <section className='not-found'>
        <h1>Something went wrong</h1>
        <p>{statusCode ? `Error code: ${statusCode}` : 'Unexpected error'}</p>
      </section>
    </SiteLayout>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500
  return { statusCode }
}
