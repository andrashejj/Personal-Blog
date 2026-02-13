import type { GetServerSideProps } from 'next'

export default function FeedRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.writeHead(308, { Location: '/rss.xml' })
  res.end()
  return { props: {} }
}
