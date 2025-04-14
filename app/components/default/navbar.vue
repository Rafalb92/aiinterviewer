<template>
  <nav class="flex items-center justify-between p-4">
    <!-- LOGO -->
    <div id="logo">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </div>

    <!-- MENU -->
    <menu
      aria-label="Main navigation"
      class="flex items-center gap-4"
    >
      <li v-if="!isLoggedIn">
        <NuxtLink
          class="link"
          to="/sign-in"
        >
          Login
        </NuxtLink>
      </li>
      <li v-if="!isLoggedIn">
        <NuxtLink
          class="link"
          to="/sign-up"
        >
          Create account
        </NuxtLink>
      </li>
      <li v-else>
        <NuxtLink
          class="link"
          to="/dashboard"
        >
          Dashboard
        </NuxtLink>
      </li>
      <!-- <li>Lol</li> -->
    </menu>
  </nav>
</template>

<script lang="ts" setup>
import Logo from '../logo.vue'

const isLoggedIn = useAuthStatus()
</script>

<style></style>
