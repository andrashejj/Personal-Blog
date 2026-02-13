// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createMDX = require('@next/mdx')

const withMDX = createMDX({
  extension: /\.mdx?$/
})

module.exports = withBundleAnalyzer(
  withMDX({
    staticPageGenerationTimeout: 300,
    eslint: {
      ignoreDuringBuilds: true
    },
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos'
        }
      ],
      formats: ['image/avif', 'image/webp'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    }
  })
)
