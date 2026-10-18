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
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#071a43' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/media/logo.jpg' },
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
  },
  typescript: {
    // Type checking runs as a dedicated CI step (`npm run typecheck`). Keeping
    // it outside Vite avoids duplicate work and Windows CLI argument conflicts.
    typeCheck: false,
  },
})
