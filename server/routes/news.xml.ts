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

  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=UTF-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

  const items = siteContent.updates.map(update => {
    const url = `${siteUrl}${newsPath(update)}`
    return `<item><title>${escapeXml(update.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><pubDate>${new Date(`${update.date}T00:00:00+08:00`).toUTCString()}</pubDate><category>${escapeXml(update.category)}</category><description>${escapeXml(update.excerpt)}</description></item>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>ARTEI XI News &amp; Events</title><link>${siteUrl}/news</link><description>Official news and events from the Association of Region XI Teacher Education Institutions.</description><language>en-PH</language>${items}</channel></rss>\n`
})
