const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,

  basePath: isProd ? '/nextjs-store' : '',
  assetPrefix: isProd ? '/nextjs-store/' : '',

  images: {
    unoptimized: true,
  },

  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig