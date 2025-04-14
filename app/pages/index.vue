<template>
  <div
    class="h-[calc(100vh-40px)] w-full mx-auto flex flex-col gap-10 items-center"
  >
    <section
      id="hero-section"
      class="w-full max-h-[600px] min-h-[400px] flex flex-col space-y-6 items-center justify-center"
    >
      <h1 class="text-6xl font-bold text-center max-w-sm md:max-w-xl">
        Unlocking Human Potential with Voice All in One AI Platform
      </h1>
      <h2
        class="text-2xl text-muted-foreground text-center max-w-sm md:max-w-xl"
      >
        Portfolio application for Interview AI. Using Vapi API & Firebase.
      </h2>
    </section>
    <Presentation />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>

<style></style>
