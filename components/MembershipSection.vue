<script setup lang="ts">
import type { MembershipContent } from '~/types/content'
defineProps<{ membership: MembershipContent; facebookUrl: string }>()
</script>

<template>
  <section id="membership" class="membership">
    <div class="membership__image">
      <img :src="membership.image" alt="" loading="lazy" decoding="async">
    </div>
    <div class="membership__panel reveal">
      <p class="eyebrow eyebrow--light">{{ membership.eyebrow }}</p>
      <h2>{{ membership.title }}</h2><p>{{ membership.text }}</p>
      <a class="button button--gold" :href="facebookUrl" target="_blank" rel="noopener">Make a membership inquiry <span aria-hidden="true">↗</span></a>
      <small>{{ membership.note }}</small>
    </div>
  </section>
</template>
