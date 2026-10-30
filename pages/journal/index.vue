<script setup lang="ts">
import type { SiteContent } from '~/types/content'
const { data: site } = await useFetch<SiteContent>('/api/site')
useSeoMeta({ title: 'ARTEI Journal of Education', description: 'A demonstration home for the proposed ARTEI Journal of Education.' })
</script>

<template><div v-if="site" class="site-shell"><SiteHeader :organization="site.organization" :navigation="site.navigation" /><main id="main-content">
  <header class="journal-masthead"><div class="container"><p class="eyebrow eyebrow--light">A proposed regional publication</p><h1><span>ARTEI</span> Journal of Education</h1><p>Research, reflection, and informed practice from the teacher education community of Region XI.</p><small>Demonstration site · Publication details are provisional</small></div></header>
  <section class="journal-intro section"><div class="container journal-intro__grid"><div><p class="eyebrow">About the journal</p><h2>A place for careful work and useful ideas.</h2></div><div><p>The ARTEI Journal of Education is presented here as a proposed refereed publication for empirical studies, scholarly essays, action research, and practice-based accounts relevant to teacher education.</p><p>This demonstration describes a possible editorial direction. Scope, review procedures, publication schedule, and editorial appointments remain subject to formal approval.</p></div></div>
    <div class="container journal-paths"><NuxtLink to="/journal/submission-guidelines"><span>For authors</span><h3>Submission guidelines</h3><p>Review the proposed manuscript types, format, and editorial process.</p><strong>Prepare a paper →</strong></NuxtLink><NuxtLink to="/journal/archive"><span>Browse issues</span><h3>Journal archive</h3><p>See sample issue records and the planned archive experience.</p><strong>Open archive →</strong></NuxtLink></div>
  </section>
</main><SiteFooter :organization="site.organization" :navigation="site.navigation" /></div></template>
