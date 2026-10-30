<script setup lang="ts">
import type { NavigationItem, Organization } from '~/types/content'

defineProps<{ organization: Organization; navigation: NavigationItem[] }>()

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const expanded = ref<string | null>(null)

const closeMenu = () => { open.value = false; expanded.value = null }
const resolveHref = (href: string) => route.path === '/' || !href.startsWith('#') ? href : `/${href}`
const toggleGroup = (label: string) => { expanded.value = expanded.value === label ? null : label }

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
      <a class="brand" href="/" aria-label="ARTEI XI home" @click="closeMenu">
        <img :src="'/media/logo.webp'" alt="ARTEI XI seal" width="64" height="64" decoding="async">
        <span class="brand__copy">
          <strong>ARTEI <em>XI</em></strong>
          <small>Association of Region XI<br>Teacher Education Institutions</small>
        </span>
      </a>
      <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="primary-navigation" @click="open = !open">
        <span class="sr-only">Toggle navigation</span><span /><span /><span />
      </button>
      <nav id="primary-navigation" class="site-nav" aria-label="Primary navigation">
        <div v-for="item in navigation" :key="item.href" class="nav-item" :class="{ 'has-children': item.children, 'is-expanded': expanded === item.label }">
          <div class="nav-item__topline">
            <a :href="resolveHref(item.href)" @click="closeMenu">{{ item.label }}</a>
            <button
              v-if="item.children"
              class="nav-item__toggle"
              type="button"
              :aria-expanded="expanded === item.label"
              :aria-label="`Toggle ${item.label} menu`"
              @click="toggleGroup(item.label)"
            ><span aria-hidden="true" /></button>
          </div>
          <div v-if="item.children" class="nav-dropdown">
            <a v-for="child in item.children" :key="child.href" :href="resolveHref(child.href)" @click="closeMenu">{{ child.label }}</a>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
