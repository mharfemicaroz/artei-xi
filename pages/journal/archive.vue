<script setup lang="ts">
import type { SiteContent } from '~/types/content'
import { journalIssues } from '~/data/library'
const { data: site } = await useFetch<SiteContent>('/api/site')
const selectedYear = ref('All')
const years = ['All', '2026', '2025']
const issues = computed(() => selectedYear.value === 'All' ? journalIssues : journalIssues.filter(issue => issue.date.includes(selectedYear.value)))
useSeoMeta({ title: 'Archive | ARTEI Journal of Education', description: 'Demonstration issue archive for the proposed ARTEI Journal of Education.' })
</script>

<template><div v-if="site" class="site-shell"><SiteHeader :organization="site.organization" :navigation="site.navigation" /><main id="main-content">
  <header class="interior-hero interior-hero--compact"><div class="container"><NuxtLink class="interior-hero__crumb" to="/journal">ARTEI Journal of Education /</NuxtLink><p class="eyebrow eyebrow--light">Issues and papers</p><h1>Journal archive</h1><p>A demonstration catalogue showing how future refereed issues could be organized and discovered.</p></div></header>
  <section class="archive section"><div class="container"><div class="archive-toolbar"><div><p class="eyebrow">Browse the record</p><h2>All issues</h2></div><div class="year-filter"><button v-for="year in years" :key="year" :class="{ 'is-active': selectedYear === year }" @click="selectedYear = year">{{ year }}</button></div></div>
  <p class="demo-note"><strong>Sample archive only.</strong> The issues and article records below are illustrative; no publication or peer-review claim is being made.</p>
  <div class="issue-list"><article v-for="(issue, index) in issues" :key="issue.volume" class="issue"><div class="issue__cover"><span>ARTEI</span><strong>Journal<br>of Education</strong><small>{{ issue.volume }}</small><i>{{ index + 1 }}</i></div><div class="issue__body"><p class="meta">{{ issue.date }} · {{ issue.count }} sample papers</p><h2>{{ issue.volume }}</h2><p>{{ issue.theme }}</p><ul><li>Editorial: Building a regional conversation on teacher education</li><li>Mentoring practices across cooperating-school partnerships</li><li>Classroom inquiry as a form of faculty learning</li></ul><button type="button" disabled>Issue preview coming soon</button></div></article></div>
  </div></section>
</main><SiteFooter :organization="site.organization" :navigation="site.navigation" /></div></template>
