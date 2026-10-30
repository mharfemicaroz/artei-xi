<script setup lang="ts">
import type { SiteContent } from '~/types/content'
import { resourceCollections } from '~/data/library'

const route = useRoute()
const collection = resourceCollections[String(route.params.section)]
if (!collection) throw createError({ statusCode: 404, statusMessage: 'Resource collection not found' })
const { data: site } = await useFetch<SiteContent>('/api/site')
const query = ref('')
const filteredItems = computed(() => collection.items.filter(item => `${item.title} ${item.summary} ${item.tag}`.toLowerCase().includes(query.value.toLowerCase())))
useSeoMeta({ title: `${collection.title} | ARTEI XI`, description: collection.intro })
</script>

<template>
  <div v-if="site" class="site-shell">
    <SiteHeader :organization="site.organization" :navigation="site.navigation" />
    <main id="main-content">
      <header class="interior-hero interior-hero--compact"><div class="container"><NuxtLink class="interior-hero__crumb" to="/resources">Resources /</NuxtLink><p class="eyebrow eyebrow--light">{{ collection.eyebrow }}</p><h1>{{ collection.title }}</h1><p>{{ collection.intro }}</p></div></header>
      <section class="library section"><div class="container">
        <div class="library-toolbar"><p><strong>{{ filteredItems.length }}</strong> demo records</p><label><span class="sr-only">Search this collection</span><input v-model="query" type="search" :placeholder="`Search ${collection.title.toLowerCase()}…`"></label></div>
        <p class="demo-note"><strong>Preview content.</strong> Titles, authors, and files below are demonstration placeholders and are not published research records.</p>
        <div class="library-grid"><ResourceCard v-for="(item, index) in filteredItems" :key="item.title" :item="item" :index="index" /></div>
        <div v-if="!filteredItems.length" class="library-empty"><strong>No matching records</strong><p>Try a shorter title, topic, or keyword.</p></div>
      </div></section>
    </main>
    <SiteFooter :organization="site.organization" :navigation="site.navigation" />
  </div>
</template>
