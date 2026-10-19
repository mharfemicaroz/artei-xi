<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
})

useHead({
  meta: [
    ...(config.public.googleSiteVerification
      ? [{ name: 'google-site-verification', content: config.public.googleSiteVerification }]
      : []),
    ...(config.public.bingSiteVerification
      ? [{ name: 'msvalidate.01', content: config.public.bingSiteVerification }]
      : []),
  ],
})
</script>

<template>
  <NuxtPage />
</template>
