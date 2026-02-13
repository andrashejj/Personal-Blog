import Link from 'next/link'
import { ReactNode } from 'react'

import { site } from '@/lib/site'

type Props = {
  children: ReactNode
}

export function SiteLayout({ children }: Props) {
  return (
    <div className='site-shell'>
      <header className='site-header'>
        <div className='container header-inner'>
          <Link href='/' className='logo'>
            {site.name}
          </Link>
          <nav className='nav-links'>
            <Link href='/blog'>Blog</Link>
            <Link href='/about'>About</Link>
          </nav>
        </div>
      </header>

      <main className='container main-content'>{children}</main>

      <footer className='site-footer'>
        <div className='container footer-inner'>
          <p>© {new Date().getFullYear()} {site.author}</p>
          <div className='social-links'>
            <a href={site.social.github} target='_blank' rel='noreferrer'>GitHub</a>
            <a href={site.social.linkedin} target='_blank' rel='noreferrer'>LinkedIn</a>
            <a href={site.social.x} target='_blank' rel='noreferrer'>X</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
