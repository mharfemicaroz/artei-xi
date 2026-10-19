<script setup lang="ts">
import type { SiteContent } from '~/types/content'
import { newsPath } from '~/utils/news'

const { data, error } = await useFetch<SiteContent>('/api/site')
const site = computed(() => data.value)
const selectedYear = ref('All')
const years = computed(() => {
  const values = site.value?.updates.map(update => update.date.slice(0, 4)) ?? []
  return ['All', ...new Set(values)]
})
const filteredUpdates = computed(() => {
  if (!site.value) return []
  if (selectedYear.value === 'All') return site.value.updates
  return site.value.updates.filter(update => update.date.startsWith(selectedYear.value))
})
const sourceLabel = (href?: string) => href?.includes('facebook.com') ? 'View on Facebook' : 'Read official source'
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = `${siteUrl}/news`
const socialImage = `${siteUrl}/media/news/oath-taking-facebook.webp`

useSeoMeta({
  title: 'News & Events | ARTEI XI',
  description: 'Official news, regional assemblies, professional development activities, recognitions, and student events from ARTEI XI.',
  ogTitle: 'News & Events | ARTEI XI',
  ogDescription: 'Follow ARTEI XI activities advancing teacher education across Davao Region.',
  ogUrl: canonicalUrl,
  ogImage: socialImage,
  ogImageAlt: 'ARTEI XI leaders during an official oath-taking ceremony',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'News & Events | ARTEI XI',
  twitterDescription: 'Follow ARTEI XI activities advancing teacher education across Davao Region.',
  twitterImage: socialImage,
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: 'News & Events | ARTEI XI',
          description: 'Official news, regional assemblies, professional development activities, recognitions, and student events from ARTEI XI.',
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
          inLanguage: 'en-PH',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'News & Events', item: canonicalUrl },
          ],
        },
        {
          '@type': 'ItemList',
          itemListElement: (site.value?.updates ?? []).map((update, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${siteUrl}${newsPath(update)}`,
            name: update.title,
          })),
        },
      ],
    }).replaceAll('<', '\\u003c')),
  }],
})
</script>

<template>
  <div v-if="site" class="site-shell">
    <SiteHeader :organization="site.organization" :navigation="site.navigation" />
    <main id="main-content">
      <header class="news-hero">
        <div class="container news-hero__inner">
          <div>
            <a class="news-hero__back" href="/">Home <span aria-hidden="true">/</span> News &amp; Events</a>
            <p class="eyebrow eyebrow--light">The regional record</p>
            <h1>News &amp; events</h1>
            <p>Assemblies, initiatives, recognitions, and stories from the teacher education community across Region XI.</p>
          </div>
          <a class="button button--gold" :href="site.organization.facebookUrl" target="_blank" rel="noopener noreferrer">
            Follow official updates <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section class="news-archive section" aria-labelledby="archive-title">
        <div class="container">
          <div class="news-archive__toolbar">
            <div>
              <p class="eyebrow">ARTEI XI archive</p>
              <h2 id="archive-title">All stories</h2>
              <p>{{ filteredUpdates.length }} {{ filteredUpdates.length === 1 ? 'story' : 'stories' }}</p>
            </div>
            <div class="year-filter" aria-label="Filter news by year">
              <button
                v-for="year in years"
                :key="year"
                type="button"
                :class="{ 'is-active': selectedYear === year }"
                :aria-pressed="selectedYear === year"
                @click="selectedYear = year"
              >
                {{ year }}
              </button>
            </div>
          </div>

          <div class="news-archive__grid" aria-live="polite">
            <article v-for="update in filteredUpdates" :key="`${update.date}-${update.title}`" class="update-card update-card--archive">
              <div class="update-card__image">
                <img :src="update.image" :alt="update.imageAlt" loading="lazy" decoding="async">
              </div>
              <div class="update-card__body">
                <p class="meta"><time :datetime="update.date">{{ update.dateLabel }}</time> · {{ update.category }}</p>
                <h3><NuxtLink :to="newsPath(update)">{{ update.title }}</NuxtLink></h3>
                <p>{{ update.excerpt }}</p>
                <NuxtLink class="update-card__link" :to="newsPath(update)">
                  Read story <span aria-hidden="true">→</span>
                </NuxtLink>
                <a
                  v-if="update.href"
                  class="update-card__source"
                  :href="update.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ sourceLabel(update.href) }} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter :organization="site.organization" :navigation="site.navigation" />
  </div>
  <div v-else class="fatal-state" role="alert">
    <strong>ARTEI XI</strong>
    <p>{{ error ? 'The news archive could not be loaded.' : 'Loading…' }}</p>
  </div>
</template>
