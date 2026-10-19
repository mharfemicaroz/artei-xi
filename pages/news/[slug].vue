<script setup lang="ts">
import type { SiteContent } from '~/types/content'
import { newsPath, newsSlug } from '~/utils/news'

const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const { data: site } = await useFetch<SiteContent>('/api/site')
const update = computed(() => site.value?.updates.find(item => newsSlug(item) === route.params.slug))

if (!update.value) {
  throw createError({ statusCode: 404, statusMessage: 'News story not found' })
}

const canonicalUrl = computed(() => `${siteUrl}${newsPath(update.value!)}`)
const imageUrl = computed(() => `${siteUrl}${update.value!.image}`)
const title = computed(() => `${update.value!.title} | ARTEI XI`)

useSeoMeta({
  title: () => title.value,
  description: () => update.value!.excerpt,
  ogTitle: () => title.value,
  ogDescription: () => update.value!.excerpt,
  ogUrl: () => canonicalUrl.value,
  ogImage: () => imageUrl.value,
  ogImageAlt: () => update.value!.imageAlt,
  ogType: 'article',
  articlePublishedTime: () => update.value!.date,
  articleSection: () => update.value!.category,
  twitterCard: 'summary_large_image',
  twitterTitle: () => title.value,
  twitterDescription: () => update.value!.excerpt,
  twitterImage: () => imageUrl.value,
})

useHead({
  link: [{ rel: 'canonical', href: () => canonicalUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'NewsArticle',
          '@id': `${canonicalUrl.value}#article`,
          headline: update.value!.title,
          description: update.value!.excerpt,
          image: [imageUrl.value],
          datePublished: update.value!.date,
          mainEntityOfPage: { '@id': `${canonicalUrl.value}#webpage` },
          author: { '@id': `${siteUrl}/#organization` },
          publisher: { '@id': `${siteUrl}/#organization` },
          articleSection: update.value!.category,
          inLanguage: 'en-PH',
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl.value}#webpage`,
          url: canonicalUrl.value,
          name: update.value!.title,
          description: update.value!.excerpt,
          isPartOf: { '@id': `${siteUrl}/#website` },
          breadcrumb: { '@id': `${canonicalUrl.value}#breadcrumb` },
          primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl.value },
          inLanguage: 'en-PH',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl.value}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'News & Events', item: `${siteUrl}/news` },
            { '@type': 'ListItem', position: 3, name: update.value!.title, item: canonicalUrl.value },
          ],
        },
      ],
    }).replaceAll('<', '\\u003c')),
  }],
})
</script>

<template>
  <div v-if="site && update" class="site-shell">
    <SiteHeader :organization="site.organization" :navigation="site.navigation" />
    <main id="main-content">
      <article class="story">
        <header class="story__header">
          <div class="container story__heading">
            <nav class="story__breadcrumb" aria-label="Breadcrumb">
              <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span>
              <NuxtLink to="/news">News &amp; Events</NuxtLink>
            </nav>
            <p class="eyebrow eyebrow--light">{{ update.category }}</p>
            <h1>{{ update.title }}</h1>
            <p class="story__date"><time :datetime="update.date">{{ update.dateLabel }}</time></p>
          </div>
        </header>
        <div class="container story__body">
          <figure>
            <img :src="update.image" :alt="update.imageAlt" width="1200" height="750" fetchpriority="high" decoding="async">
            <figcaption>{{ update.imageAlt }}</figcaption>
          </figure>
          <div class="story__content">
            <p class="story__lede">{{ update.excerpt }}</p>
            <p>ARTEI XI shares this update as part of its continuing work to connect teacher education institutions, educators, and partners across the Davao Region.</p>
            <a v-if="update.href" class="button button--gold" :href="update.href" target="_blank" rel="noopener noreferrer">
              View official source <span aria-hidden="true">↗</span>
            </a>
            <NuxtLink class="text-link" to="/news">← Browse all news &amp; events</NuxtLink>
          </div>
        </div>
      </article>
    </main>
    <SiteFooter :organization="site.organization" :navigation="site.navigation" />
  </div>
</template>
