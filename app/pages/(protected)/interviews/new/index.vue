<template>
  <div class="dahsboard-page w-full h-full bg-white dark:bg-black/85">
    <h1 class="text-xl font-bold my-4">
      Call to start create you new interview
    </h1>
    <Separator />
    <div class="size-full flex items-center justify-center">
      <AiAgent
        :user-name="session?.user.name!"
        :user-id="session?.user.id!"
        type="generate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { authClient } from '~/lib/auth-client'

definePageMeta({
  layout: 'protected'
})
const { data: session } = await authClient.useSession(useFetch)
onMounted(() => {
  if (!session.value) {
    navigateTo('/sign-in')
  }
})
</script>

<style></style>
