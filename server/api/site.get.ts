import { siteContent } from '~/data/site'
import type { SiteContent } from '~/types/content'

function mergeContent<T>(base: T, override: Partial<T>): T {
  if (Array.isArray(override)) return override as T
  if (override && typeof override === 'object') {
    const result = { ...(base as Record<string, unknown>) }
    for (const [key, value] of Object.entries(override)) {
      if (value === undefined || value === null || value === '') continue
      const baseValue = result[key]
      result[key] = value && typeof value === 'object' && !Array.isArray(value)
        ? mergeContent(baseValue ?? {}, value)
        : value
    }
    return result as T
  }
  return (override ?? base) as T
}

export default defineEventHandler(async (): Promise<SiteContent> => {
  const config = useRuntimeConfig()
  const baseUrl = String(config.wordpressApiUrl || '').replace(/\/$/, '')

  if (!baseUrl) {
    return siteContent
  }

  try {
    const wordpressContent = await $fetch<Partial<SiteContent>>(`${baseUrl}/wp-json/artei/v1/site`, {
      timeout: 7000,
      retry: 1,
    })
    return mergeContent(siteContent, wordpressContent)
  }
  catch (error) {
    console.warn('[ARTEI XI] WordPress content unavailable; using verified local content.', error)
    return siteContent
  }
})
