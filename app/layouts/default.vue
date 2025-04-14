<template>
  <div
    class="h-screen min-h-screen w-full max-w-[1440px] mx-auto overflow-hidden magic-pattern"
  >
    <Navbar />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Navbar from '~/components/default/navbar.vue'
</script>

<style></style>
