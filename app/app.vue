<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <NuxtLoadingIndicator color="#ff6900" />
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
