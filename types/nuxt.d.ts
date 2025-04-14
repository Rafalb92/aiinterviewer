import type Vapi from '@vapi-ai/web'
// import type { LottiePlayer } from 'lottie-web'

declare module '#app' {
  interface NuxtApp {
    $vapi: Vapi
    // $lottie: LottiePlayer
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $vapi: Vapi
    // $lottie: LottiePlayer
  }
}
