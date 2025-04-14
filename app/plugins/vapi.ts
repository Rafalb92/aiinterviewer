import Vapi from '@vapi-ai/web'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const vapi = new Vapi(config.public.vapiApiKey!)

  nuxtApp.provide('vapi', vapi)
})
