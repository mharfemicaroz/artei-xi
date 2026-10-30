<script setup lang="ts">
import type { SiteContent } from '~/types/content'
const { data: site } = await useFetch<SiteContent>('/api/site')
const sections = [
  { number: '01', title: 'Scope', text: 'The proposed journal considers work on teacher preparation, curriculum and instruction, assessment, educational leadership, inclusive education, technology, community engagement, and professional learning.' },
  { number: '02', title: 'Manuscript types', text: 'Research articles may run 4,000–7,000 words. Practice papers and reflective essays may run 2,000–4,000 words. These ranges include the abstract, tables, references, and appendices.' },
  { number: '03', title: 'File preparation', text: 'Submit an editable document with a concise title, 150–250 word abstract, three to five keywords, main text, acknowledgments, and references. Remove author names from the review copy.' },
  { number: '04', title: 'References and ethics', text: 'Use APA 7th edition consistently. Authors are responsible for permissions, accurate attribution, consent, and approval required for research involving participants.' },
]
useSeoMeta({ title: 'Submission Guidelines | ARTEI Journal of Education', description: 'Proposed manuscript preparation and review guidance for the ARTEI Journal of Education.' })
</script>

<template><div v-if="site" class="site-shell"><SiteHeader :organization="site.organization" :navigation="site.navigation" /><main id="main-content">
  <header class="interior-hero interior-hero--compact"><div class="container"><NuxtLink class="interior-hero__crumb" to="/journal">ARTEI Journal of Education /</NuxtLink><p class="eyebrow eyebrow--light">For prospective authors</p><h1>Submission guidelines</h1><p>A practical starting point for preparing work for editorial consideration.</p></div></header>
  <section class="guidelines section"><div class="container guidelines__layout"><aside><p class="demo-note"><strong>Draft for demonstration.</strong> These guidelines are not yet an official call for papers.</p><nav aria-label="On this page"><span>On this page</span><a v-for="section in sections" :key="section.number" :href="`#guide-${section.number}`">{{ section.title }}</a><a href="#review">Review process</a></nav></aside>
  <div class="guidelines__content"><div v-for="section in sections" :id="`guide-${section.number}`" :key="section.number" class="guideline"><span>{{ section.number }}</span><div><h2>{{ section.title }}</h2><p>{{ section.text }}</p></div></div>
  <div id="review" class="review-panel"><p class="eyebrow eyebrow--light">Proposed workflow</p><h2>From submission to publication</h2><ol><li><strong>Editorial screening</strong><span>Fit, completeness, and basic manuscript requirements.</span></li><li><strong>Double-anonymous review</strong><span>Two readers assess the paper’s clarity, rigor, contribution, and relevance.</span></li><li><strong>Revision and decision</strong><span>Authors respond to comments before a final editorial decision.</span></li><li><strong>Copyediting and proof</strong><span>Accepted work is prepared with the author before publication.</span></li></ol></div>
  <div class="submission-box"><h2>Before you send a manuscript</h2><ul><li>The work is original and not under review elsewhere.</li><li>Identifying details are removed from the review file.</li><li>Tables, figures, and references are complete and readable.</li><li>A separate author-information page is ready.</li></ul><button type="button" disabled>Submission portal coming soon</button></div></div></div></section>
</main><SiteFooter :organization="site.organization" :navigation="site.navigation" /></div></template>
