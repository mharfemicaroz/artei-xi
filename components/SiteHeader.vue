<script setup lang="ts">
import type { NavigationItem, Organization } from '~/types/content'

defineProps<{ organization: Organization; navigation: NavigationItem[] }>()

const open = ref(false)
const scrolled = ref(false)

const closeMenu = () => { open.value = false }

onMounted(() => {
  const update = () => { scrolled.value = window.scrollY > 24 }
  update()
  window.addEventListener('scroll', update, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', update))
})
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="utility-bar">
    <div class="container utility-bar__inner">
      <p>Advancing teacher education across Davao Region</p>
      <a :href="organization.facebookUrl" target="_blank" rel="noopener">Official Facebook <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'menu-open': open }">
    <div class="container site-header__inner">
      <a class="brand" href="#home" aria-label="ARTEI XI home" @click="closeMenu">
        <img :src="'/media/logo.jpg'" alt="ARTEI XI seal" width="64" height="64">
        <span class="brand__copy">
          <strong>ARTEI <em>XI</em></strong>
          <small>Association of Region XI<br>Teacher Education Institutions</small>
        </span>
      </a>
      <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="primary-navigation" @click="open = !open">
        <span class="sr-only">Toggle navigation</span><span /><span /><span />
      </button>
      <nav id="primary-navigation" class="site-nav" aria-label="Primary navigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href" @click="closeMenu">{{ item.label }}</a>
      </nav>
    </div>
  </header>
</template>
