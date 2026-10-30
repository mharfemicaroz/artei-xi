<script setup lang="ts">
import type { SiteContent } from '~/types/content'

interface ReviewMaterial {
  title: string
  area: string
  format: string
  duration: string
  description: string
}

const { data: site } = await useFetch<SiteContent>('/api/site')
const selectedArea = ref('All areas')
const areas = ['All areas', 'General Education', 'Professional Education', 'Elementary', 'Secondary']
const materials: ReviewMaterial[] = [
  { title: 'Communication and Academic Language', area: 'General Education', format: 'Review notes', duration: '35 min read', description: 'A concise review outline for language use, reading comprehension, and communication concepts commonly revisited by examinees.' },
  { title: 'Philippine History and Society', area: 'General Education', format: 'Practice set', duration: '30 items', description: 'A demonstration question set for recalling key periods, primary-source interpretation, and civic concepts.' },
  { title: 'The Teaching Profession', area: 'Professional Education', format: 'Review notes', duration: '40 min read', description: 'An organized refresher on professional roles, ethical responsibilities, school relationships, and teacher development.' },
  { title: 'Principles of Teaching and Learning', area: 'Professional Education', format: 'Study guide', duration: '6 topics', description: 'A topic map connecting learning principles, instructional planning, classroom practice, and reflective teaching.' },
  { title: 'Assessment of Learning', area: 'Professional Education', format: 'Practice set', duration: '40 items', description: 'Sample exercises on assessment purposes, test construction, interpretation, feedback, and classroom decision-making.' },
  { title: 'Child and Adolescent Learners', area: 'Elementary', format: 'Concept cards', duration: '24 cards', description: 'Quick-review cards covering development, learner diversity, motivation, and age-appropriate classroom support.' },
  { title: 'Teaching Beginning Literacy', area: 'Elementary', format: 'Study guide', duration: '5 topics', description: 'A demonstration guide to foundations of literacy, print awareness, phonics, fluency, vocabulary, and comprehension.' },
  { title: 'Curriculum and Content Pedagogy', area: 'Secondary', format: 'Review notes', duration: '45 min read', description: 'A structured prompt set for connecting curriculum standards, disciplinary knowledge, teaching strategies, and assessment.' },
]
const filteredMaterials = computed(() => selectedArea.value === 'All areas' ? materials : materials.filter(item => item.area === selectedArea.value))

useSeoMeta({
  title: 'Project MODELO | LET Review Materials | ARTEI XI',
  description: 'A curated demonstration collection of LET review materials for future professional teachers from ARTEI XI.',
})
</script>

<template>
  <div v-if="site" class="site-shell">
    <SiteHeader :organization="site.organization" :navigation="site.navigation" />
    <main id="main-content">
      <header class="modelo-hero">
        <div class="container modelo-hero__grid">
          <div>
            <NuxtLink class="interior-hero__crumb" to="/resources">Resources /</NuxtLink>
            <p class="eyebrow eyebrow--light">Module for Educational Learning Opportunity</p>
            <h1>Project <em>MODELO</em></h1>
            <p>A focused review space for future professional teachers preparing for the Licensure Examination for Teachers.</p>
          </div>
          <div class="modelo-hero__seal" aria-hidden="true"><span>M</span><strong>Review with<br>purpose.</strong><small>ARTEI XI · LET Resource Shelf</small></div>
        </div>
      </header>

      <section class="modelo-intro section">
        <div class="container modelo-intro__grid">
          <div><p class="eyebrow">Start with a plan</p><h2>Review what matters. Track what needs work.</h2></div>
          <div><p>Project MODELO brings review materials into one practical shelf. Use the subject filters to build a study sequence, revisit difficult concepts, and set aside regular time for practice.</p><p class="demo-note"><strong>Demonstration materials.</strong> The records below are interface placeholders. They are not official PRC questions, answer keys, or guarantees of examination coverage.</p></div>
        </div>
      </section>

      <section class="modelo-library section" aria-labelledby="modelo-materials-title">
        <div class="container">
          <div class="modelo-library__head"><div><p class="eyebrow">Curated review shelf</p><h2 id="modelo-materials-title">Choose a study area</h2></div><p>{{ filteredMaterials.length }} materials in this view</p></div>
          <div class="modelo-filters" aria-label="Filter review materials by area">
            <button v-for="area in areas" :key="area" type="button" :class="{ 'is-active': selectedArea === area }" :aria-pressed="selectedArea === area" @click="selectedArea = area">{{ area }}</button>
          </div>
          <div class="modelo-materials" aria-live="polite">
            <article v-for="(material, index) in filteredMaterials" :key="material.title" class="modelo-material">
              <div class="modelo-material__number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div><p class="meta">{{ material.area }}</p><h3>{{ material.title }}</h3><p>{{ material.description }}</p></div>
              <div class="modelo-material__meta"><span>{{ material.format }}</span><span>{{ material.duration }}</span><button type="button" disabled>Available soon</button></div>
            </article>
          </div>
        </div>
      </section>

      <section class="study-rhythm"><div class="container"><div><p class="eyebrow eyebrow--light">A simple study rhythm</p><h2>Prepare steadily, not hurriedly.</h2></div><ol><li><span>01</span><strong>Check</strong><p>Begin with a short practice set and identify weak areas.</p></li><li><span>02</span><strong>Review</strong><p>Work through one topic at a time and write your own notes.</p></li><li><span>03</span><strong>Practice</strong><p>Answer without notes, then study why each response is right or wrong.</p></li><li><span>04</span><strong>Return</strong><p>Revisit difficult topics after a few days to strengthen recall.</p></li></ol></div></section>
    </main>
    <SiteFooter :organization="site.organization" :navigation="site.navigation" />
  </div>
</template>
