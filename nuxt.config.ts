import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt'
  ],
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css', '@/assets/css/magic-pattern.css'],
  vite: {
    plugins: [tailwindcss()]
  },

  runtimeConfig: {
    public: {
      vapiApiKey: process.env.NUXT_PUBLIC_VAPI_API_KEY,
      vapiWorkflowId: process.env.NUXT_PUBLIC_VAPI_WORKFLOW_ID
    },
    auth: {
      betterAuthSecret: process.env.BETTER_AUTH_SECRET,
      betterAuthUrl: process.env.BETTER_AUTH_URL
    }
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-01',

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    database: true
  },

  app: {
    head: {
      title: 'AI Interview - Prepare yourself for next interview'
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  fonts: {
    defaults: {
      weights: [400, 600, 700],
      styles: ['normal']
    }
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },

  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
