import { siteContent } from './data/site'
import { newsPath } from './utils/news'

const needsLocalNode23Workaround =
  process.platform === 'win32'
  && process.versions.node.startsWith('23.')
  && !process.env.VERCEL

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    wordpressApiUrl: process.env.WORDPRESS_API_URL || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://arteixi.org',
      googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      bingSiteVerification: process.env.NUXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-PH' },
      meta: [
        { name: 'theme-color', content: '#071a43' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'ARTEI XI' },
        { property: 'og:locale', content: 'en_PH' },
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/media/logo.webp' },
        { rel: 'apple-touch-icon', href: '/media/logo.webp' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'ARTEI XI News & Events', href: '/news.xml' },
      ],
    },
  },
  nitro: {
    // Node 23 on local Windows has a readlink bug in Nitro's dependency
    // tracer. Vercel must always retain normal tracing so its function bundle
    // includes every server dependency.
    externals: needsLocalNode23Workaround
      ? { inline: ['vue-bundle-renderer'], trace: false }
      : undefined,
    prerender: {
      routes: [
        '/news',
        '/resources',
        '/resources/research-papers',
        '/resources/articles',
        '/resources/presentations',
        '/journal',
        '/journal/submission-guidelines',
        '/journal/archive',
        ...siteContent.updates.map(update => newsPath(update)),
      ],
      crawlLinks: true,
    },
  },
  typescript: {
    // Type checking runs as a dedicated CI step (`npm run typecheck`). Keeping
    // it outside Vite avoids duplicate work and Windows CLI argument conflicts.
    typeCheck: false,
  },
})
