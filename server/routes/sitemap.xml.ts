import { siteContent } from '~/data/site'
import { newsPath } from '~/utils/news'

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const latestDate = siteContent.updates.reduce((latest, update) => update.date > latest ? update.date : latest, '')
  const urls = [
    { loc: `${siteUrl}/`, lastmod: latestDate },
    { loc: `${siteUrl}/news`, lastmod: latestDate },
    ...siteContent.updates.map(update => ({ loc: `${siteUrl}${newsPath(update)}`, lastmod: update.date })),
  ]

  setResponseHeader(event, 'content-type', 'application/xml; charset=UTF-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escapeXml(url.loc)}</loc><lastmod>${url.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`
})
