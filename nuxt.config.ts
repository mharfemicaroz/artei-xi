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
    // Avoid a Node 23 / Windows readlink issue in the dependency tracer while
    // keeping the production server build deterministic in this environment.
    externals: {
      inline: ['vue-bundle-renderer'],
      trace: false,
    },
  },
  typescript: {
    // Type checking runs as a dedicated CI step (`npm run typecheck`). Keeping
    // it outside Vite avoids duplicate work and Windows CLI argument conflicts.
    typeCheck: false,
  },
})
