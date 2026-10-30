<script setup lang="ts">
import type { SiteContent } from '~/types/content'
import { resourceCollections } from '~/data/library'

const { data: site } = await useFetch<SiteContent>('/api/site')
const collections = Object.values(resourceCollections)
useSeoMeta({ title: 'Resources | ARTEI XI', description: 'Research papers, practice articles, and presentation materials for the Region XI teacher education community.' })
</script>

<template>
  <div v-if="site" class="site-shell">
    <SiteHeader :organization="site.organization" :navigation="site.navigation" />
    <main id="main-content">
      <header class="interior-hero interior-hero--resources">
        <div class="container interior-hero__grid">
          <div><p class="eyebrow eyebrow--light">Knowledge commons</p><h1>Resources for teacher educators.</h1></div>
          <p>Working materials for research, professional exchange, and better classroom practice across the region.</p>
        </div>
      </header>
      <section class="resource-index section">
        <div class="container">
          <p class="demo-note"><strong>Demonstration library.</strong> Files and records on these pages are placeholders for the future ARTEI XI repository.</p>
          <NuxtLink class="modelo-feature" to="/resources/project-modelo">
            <div class="modelo-feature__mark" aria-hidden="true"><span>M</span><i>LET</i></div>
            <div><p class="eyebrow">Featured learning initiative</p><h2>Project MODELO</h2><p>A curated review shelf for future professional teachers—organized by subject area and designed for focused, independent study.</p><strong>Explore LET review materials <span aria-hidden="true">→</span></strong></div>
          </NuxtLink>
          <div class="resource-index__grid">
            <NuxtLink v-for="(collection, index) in collections" :key="collection.slug" class="collection-card" :to="`/resources/${collection.slug}`">
              <span>0{{ index + 1 }}</span><p>{{ collection.eyebrow }}</p><h2>{{ collection.title }}</h2><p>{{ collection.intro }}</p><strong>Browse collection →</strong>
            </NuxtLink>
          </div>
          <aside class="repository-callout"><div><p class="eyebrow">Contribute later</p><h2>A regional shelf, built together.</h2></div><p>The live repository can accept faculty work, conference materials, and reviewed resources once submission and editorial procedures are approved.</p></aside>
        </div>
      </section>
    </main>
    <SiteFooter :organization="site.organization" :navigation="site.navigation" />
  </div>
</template>
