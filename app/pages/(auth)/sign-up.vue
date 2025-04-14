<template>
  <section class="flex justify-center items-center w-full h-screen">
    <AuthForm type="sign-up" />
  </section>
</template>

<script lang="ts" setup>
import AuthForm from '~/components/auth-form.vue'

definePageMeta({
  layout: 'auth'
})
</script>

<style></style>
