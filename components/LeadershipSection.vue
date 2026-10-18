<script setup lang="ts">
import type { Officer } from '~/types/content'
defineProps<{ officers: Officer[]; adviser: Officer }>()
</script>

<template>
  <section id="leadership" class="leadership section">
    <div class="container">
      <header class="leadership__header reveal">
        <div><p class="eyebrow">Leadership council</p><h2>Serving the teacher education community.</h2></div>
        <p>Elected officers formally inducted on October 5, 2026 at the Commission on Higher Education XI Regional Office.</p>
      </header>
      <div class="officer-grid">
        <article v-for="(officer, index) in officers" :key="officer.name" class="officer-card reveal" :class="{ 'officer-card--president': officer.featured }">
          <div class="officer-card__image">
            <img :src="officer.image" :alt="officer.imageAlt" width="960" height="1200" loading="lazy" decoding="async">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="officer-card__body"><p>{{ officer.role }}</p><h3>{{ officer.name }}</h3></div>
        </article>
      </div>
      <aside class="adviser-note reveal">
        <img :src="adviser.image" :alt="adviser.imageAlt" width="960" height="1200" loading="lazy" decoding="async">
        <div><p class="eyebrow">{{ adviser.role }}</p><h3>{{ adviser.name }}</h3><p>Supporting the council and its work across Region XI.</p></div>
        <span aria-hidden="true">ARTEI XI</span>
      </aside>
    </div>
  </section>
</template>
