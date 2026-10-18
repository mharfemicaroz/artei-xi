<script setup lang="ts">
import type { UpdateItem } from '~/types/content'
defineProps<{ updates: UpdateItem[] }>()
</script>

<template>
  <section id="updates" class="updates section">
    <div class="container">
      <header class="section-title-row section-title-row--ink reveal">
        <div><p class="eyebrow">From the association</p><h2>Events &amp; updates</h2></div>
        <a class="text-link" href="/news">See all news &amp; events <span aria-hidden="true">→</span></a>
      </header>
      <div class="updates-grid">
        <article v-for="(update, index) in updates" :key="update.title" class="update-card reveal" :class="{ 'update-card--featured': index === 0 }">
          <div class="update-card__image"><img :src="update.image" :alt="update.imageAlt" loading="lazy" decoding="async"></div>
          <div class="update-card__body">
            <p class="meta"><time :datetime="update.date">{{ update.dateLabel }}</time> · {{ update.category }}</p>
            <h3>{{ update.title }}</h3>
            <p>{{ update.excerpt }}</p>
            <a
              v-if="update.href"
              class="update-card__link"
              :href="update.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Read the official source for ${update.title}`"
            >
              Read official source <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
      <div class="updates__more reveal">
        <a class="button button--gold" href="/news">See all news &amp; events <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>
</template>
