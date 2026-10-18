<script setup lang="ts">
import type { Commitment } from '~/types/content'
defineProps<{ commitments: Commitment[] }>()
</script>

<template>
  <section id="mission" class="commitments section">
    <div class="container">
      <header class="section-title-row commitments__header reveal">
        <div><p class="eyebrow eyebrow--light">2026–2029 strategic focus</p><h2>FIRE: Future in Education</h2></div>
        <p>Three priorities guiding ARTEI XI’s work in teacher education across Region XI.</p>
      </header>
      <div class="commitment-grid">
        <article v-for="item in commitments" :key="item.number" class="commitment reveal">
          <span class="commitment__number">{{ item.number }}</span>
          <div class="commitment__icon" aria-hidden="true">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
