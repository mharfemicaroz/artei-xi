<script setup lang="ts">
import type { HeroContent, UpdateItem } from '~/types/content'

defineProps<{ hero: HeroContent; featuredUpdate: UpdateItem }>()
</script>

<template>
  <section id="home" class="hero" aria-labelledby="hero-title">
    <div class="hero__media">
      <img :src="hero.image" alt="ARTEI XI leadership council" width="1920" height="1280" fetchpriority="high" decoding="async">
    </div>
    <div class="hero__overlay" />
    <div class="container hero__content">
      <div class="hero__copy reveal">
        <p class="eyebrow eyebrow--light">{{ hero.eyebrow }}</p>
        <h1 id="hero-title">{{ hero.title }}</h1>
        <p class="hero__lead">{{ hero.text }}</p>
        <div class="hero__actions">
          <a class="button button--gold" href="#about">Discover ARTEI XI <span aria-hidden="true">↓</span></a>
          <a class="button button--ghost" href="#updates">View official updates <span aria-hidden="true">↘</span></a>
        </div>
      </div>
    </div>
    <div class="container hero__event-wrap">
      <a class="hero-event reveal" href="#updates">
        <time class="hero-event__date" :datetime="featuredUpdate.date"><strong>05</strong> OCT<br>2026</time>
        <span class="hero-event__body"><small>{{ featuredUpdate.category }} update</small><strong>{{ featuredUpdate.title }}</strong></span>
        <span class="hero-event__arrow" aria-hidden="true">↘</span>
      </a>
    </div>
  </section>
</template>
