<script setup lang="ts">
import type { AboutContent } from '~/types/content'
defineProps<{ about: AboutContent }>()
</script>

<template>
  <section id="about" class="intro section">
    <div class="container intro__grid">
      <div class="section-heading reveal">
        <p class="eyebrow">Who we are</p>
        <h2>One region.<br><em>A shared purpose.</em></h2>
      </div>
      <div class="intro__copy reveal">
        <p class="intro__lede">{{ about.lede }}</p>
        <p>{{ about.body }}</p>
        <a class="text-link" href="#mission">Our shared commitments <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <figure class="container feature-image reveal">
      <img :src="about.image" :alt="about.imageAlt" width="1411" height="796" loading="lazy">
      <figcaption class="feature-image__caption">
        <span>Leadership in service</span><p>{{ about.caption }}</p>
      </figcaption>
    </figure>
  </section>
</template>
