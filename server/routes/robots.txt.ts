export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  setResponseHeader(event, 'content-type', 'text/plain; charset=UTF-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\nHost: ${siteUrl}\n`
})
