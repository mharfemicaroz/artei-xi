<script setup lang="ts">
import type { NavigationItem, Organization } from '~/types/content'
defineProps<{ organization: Organization; navigation: NavigationItem[] }>()

const route = useRoute()
const resolveHref = (href: string) => route.path === '/' || !href.startsWith('#') ? href : `/${href}`
</script>

<template>
  <section class="contact-band">
    <div class="container contact-band__inner reveal"><p>Have an institutional or event inquiry?</p><a :href="organization.facebookUrl" target="_blank" rel="noopener">Connect with ARTEI XI <span aria-hidden="true">↗</span></a></div>
  </section>
  <footer id="contact" class="site-footer">
    <div class="container site-footer__main">
      <div class="footer-brand"><img :src="'/media/logo.jpg'" alt="" width="76" height="76" loading="lazy"><div><strong>{{ organization.shortName }}</strong><p>{{ organization.fullName }}</p></div></div>
      <div class="footer-group"><h2>Explore</h2><a v-for="item in navigation.slice(1, 5)" :key="item.href" :href="resolveHref(item.href)">{{ item.label }}</a></div>
      <div class="footer-group"><h2>Connect</h2><p>For announcements, event inquiries, and official updates, visit our verified channel.</p><a class="footer-social" :href="organization.facebookUrl" target="_blank" rel="noopener">Facebook <span aria-hidden="true">↗</span></a></div>
    </div>
    <div class="container site-footer__bottom"><p>© {{ new Date().getFullYear() }} ARTEI XI. All rights reserved.</p><p>{{ organization.region }}</p></div>
  </footer>
</template>
