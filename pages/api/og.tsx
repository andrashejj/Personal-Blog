import { ImageResponse } from '@vercel/og'

import { site } from '@/lib/site'

export const config = {
  runtime: 'edge'
}

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || site.title

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top right, #1d4ed8 0%, #0f172a 55%, #020617 100%)',
          color: 'white',
          padding: 64
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.82 }}>{site.name}</div>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
