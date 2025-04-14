<template>
  <aside
    class="p-4 min-w-[200px] flex flex-col justify-start items-center gap-4 h-full"
  >
    <Logo />

    <menu class="w-full flex flex-col items-start justify-center gap-3">
      <NuxtLink
        class="p-1 flex items-center gap-2 w-full rounded-full hover:bg-primary/10"
        active-class="active-link"
        to="/dashboard"
      >
        <Icon
          size="20"
          name="cuida:home-outline"
        />
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink
        class="p-1 flex items-center gap-2 w-full rounded-full hover:bg-primary/10"
        active-class="active-link"
        to="/interviews/new"
      >
        <Icon
          size="20"
          name="tabler:file-ai"
        />
        <span>Create new</span>
      </NuxtLink>
      <NuxtLink
        class="p-1 flex items-center gap-2 w-full rounded-full hover:bg-primary/10"
        active-class="active-link"
        to="/trash"
      >
        <Icon
          size="20"
          name="cuida:trash-outline"
        />
        <span>Trash</span>
      </NuxtLink>
    </menu>

    <div class="w-full h-full flex flex-col justify-end items-end">
      <Button
        class="w-full text-center"
        @click="
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                navigateTo('/sign-in')
              }
            }
          })
        "
      >
        <span>Logout</span>
      </Button>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import Logo from './logo.vue'
import { authClient } from '~/lib/auth-client'
</script>
