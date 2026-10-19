<script setup lang="ts">
import type { SiteContent } from '~/types/content'

const { data, error } = await useFetch<SiteContent>('/api/site')
const site = computed(() => data.value)
const featuredUpdate = computed(() => site.value?.updates[0])
const homepageUpdates = computed(() => site.value?.updates.slice(0, 3) ?? [])
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = `${siteUrl}/`
const socialImage = `${siteUrl}/media/group.webp`

useSeoMeta({
  title: () => site.value?.seo.title || 'ARTEI XI | Teacher Education in Davao Region',
  description: () => site.value?.seo.description || 'The Association of Region XI Teacher Education Institutions strengthens collaboration and quality teacher education across Davao Region.',
  ogTitle: () => site.value?.seo.title,
  ogDescription: () => site.value?.seo.description,
  ogUrl: canonicalUrl,
  ogImage: socialImage,
  ogImageAlt: 'ARTEI XI teacher education leaders and members in Davao Region',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => site.value?.seo.title,
  twitterDescription: () => site.value?.seo.description,
  twitterImage: socialImage,
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EducationalOrganization',
          '@id': `${siteUrl}/#organization`,
          name: 'Association of Region XI Teacher Education Institutions',
          alternateName: 'ARTEI XI',
          url: canonicalUrl,
          logo: { '@type': 'ImageObject', url: `${siteUrl}/media/logo.webp` },
          description: site.value?.seo.description,
          areaServed: { '@type': 'AdministrativeArea', name: 'Davao Region, Philippines' },
          sameAs: ['https://www.facebook.com/profile.php?id=100075779097669'],
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: canonicalUrl,
          name: 'ARTEI XI',
          alternateName: 'Association of Region XI Teacher Education Institutions',
          publisher: { '@id': `${siteUrl}/#organization` },
          inLanguage: 'en-PH',
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: site.value?.seo.title,
          description: site.value?.seo.description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
          inLanguage: 'en-PH',
        },
      ],
    }).replaceAll('<', '\\u003c'),
  }],
})
</script>

<template>
  <div v-if="site && featuredUpdate" class="site-shell">
    <SiteHeader :organization="site.organization" :navigation="site.navigation" />
    <main id="main-content">
      <HeroSection :hero="site.hero" :featured-update="featuredUpdate" />
      <AboutSection :about="site.about" />
      <CommitmentsSection :commitments="site.commitments" />
      <LeadershipSection :officers="site.officers" :adviser="site.adviser" />
      <UpdatesSection :updates="homepageUpdates" />
      <MembershipSection :membership="site.membership" :facebook-url="site.organization.facebookUrl" />
    </main>
    <SiteFooter :organization="site.organization" :navigation="site.navigation" />
  </div>
  <div v-else class="fatal-state" role="alert">
    <strong>ARTEI XI</strong>
    <p>{{ error ? 'The site content could not be loaded.' : 'Loading…' }}</p>
  </div>
</template>
