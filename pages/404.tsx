import Link from 'next/link'

import { SeoHead } from '@/components/SeoHead'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { buildSeo } from '@/lib/content/seo'

export default function NotFoundPage() {
  const seo = buildSeo({ title: 'Not found', path: '/404' })

  return (
    <SiteLayout>
      <SeoHead {...seo} />
      <section className='not-found'>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link href='/blog' className='primary-btn'>
          Go to blog
        </Link>
      </section>
    </SiteLayout>
  )
}
