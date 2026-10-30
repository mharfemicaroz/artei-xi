<script setup lang="ts">
import type { LibraryItem } from '~/data/library'

defineProps<{ item: LibraryItem; index: number }>()
</script>

<template>
  <article class="library-card">
    <div class="library-card__visual" :class="`library-card__visual--${item.type.toLowerCase()}`" aria-hidden="true">
      <span>{{ item.type }}</span>
      <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
      <i />
    </div>
    <div class="library-card__body">
      <p class="meta">{{ item.tag }} · {{ item.date }}</p>
      <h2>{{ item.title }}</h2>
      <p>{{ item.summary }}</p>
      <div class="library-card__foot">
        <span>{{ item.author }}</span>
        <span v-if="item.pages">{{ item.pages }}</span>
        <button type="button" disabled title="Demo file—not yet available">Preview soon</button>
      </div>
    </div>
  </article>
</template>
