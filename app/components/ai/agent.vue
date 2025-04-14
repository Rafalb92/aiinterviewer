<template>
  <section class="md:flex justify-center gap-4">
    <Card class="md:max-w-[260px] max-h-[340px]">
      <CardHeader>
        <CardTitle>
          Hi! I am an AI voice assistant. Call to start conversation to prepare
          your Interview.
        </CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col items-center justify-center-safe">
        <canvas
          id="lottieDiv"
          class="w-40 h-40"
        />
        <Button
          v-if="callStatus !== 'ACTIVE'"
          class="w-full"
          variant="outline"
          @click="handleCall"
        >
          <span>
            {{
              callStatus === 'INACTIVE' || callStatus === 'FINISHED'
                ? 'Call'
                : '. . .'
            }}
          </span>
        </Button>
        <Button
          v-else
          @click="handleDisconnect"
        >
          End
        </Button>
      </CardContent>
    </Card>
    <Card
      v-if="messages.length > 0"
      class="md:max-w-[320px] max-h-[340px]"
    >
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea class="h-[240px] p-3">
          <div class="flex flex-col items-start gap-2">
            <p
              v-for="(item, index) in messages"
              :key="index"
              :class="
                cn(
                  'rounded-md border-border border p-1 break-words',
                  item.role === 'assistant' &&
                    'self-end bg-neutral-100 dark:bg-black/10'
                )
              "
            >
              {{ item.content }}
            </p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  </section>
</template>

<script lang="ts" setup>
import { DotLottie } from '@lottiefiles/dotlottie-web'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { interviewer } from '@/constants'
import { cn } from '@/lib/utils'

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

interface SavedMessage {
  role: 'user' | 'system' | 'assistant'
  content: string
}

const { type, userName, userId, questions } = defineProps<{
  userName: string
  userId: string
  type: string
  questions?: string[]
}>()

const callStatus = ref<CallStatus>(CallStatus.INACTIVE)

const messages = ref<SavedMessage[]>([])
const isSpeaking = ref<boolean>(false)
const lastMessage = ref<string>()

const config = useRuntimeConfig()

const { $vapi } = useNuxtApp()
onMounted(() => {
  const dotLottie = new DotLottie({
    canvas: document.getElementById('lottieDiv') as HTMLCanvasElement,
    src: '/voice-animation.lottie',
    loop: true
  })

  watchEffect(() => {
    if (isSpeaking.value === true) {
      dotLottie.play()
    } else {
      dotLottie.stop()
    }
  })
})

// VAPI implementation
const onCallStart = () => (callStatus.value = CallStatus.ACTIVE)
const onCallEnd = () => (callStatus.value = CallStatus.FINISHED)
const onMessage = (message: Message) => {
  if (message.type === 'transcript' && message.transcriptType === 'final') {
    messages.value.push({ role: message.role, content: message.transcript })
  }
}

const onSpeechStart = () => {
  isSpeaking.value = true
}

const onSpeechEnd = () => {
  isSpeaking.value = false
}

const onError = (error: Error) => {
  console.error('Error:', error)
}

onMounted(() => {
  $vapi.on('call-start', onCallStart)
  $vapi.on('call-end', onCallEnd)
  $vapi.on('message', onMessage)
  $vapi.on('speech-start', onSpeechStart)
  $vapi.on('speech-end', onSpeechEnd)
  $vapi.on('error', onError)
})

onUnmounted(() => {
  $vapi.off('call-start', onCallStart)
  $vapi.off('call-end', onCallEnd)
  $vapi.off('message', onMessage)
  $vapi.off('speech-start', onSpeechStart)
  $vapi.off('speech-end', onSpeechEnd)
  $vapi.off('error', onError)
})

watchEffect(() => {
  if (messages.value.length > 0) {
    lastMessage.value = messages.value[messages.value.length - 1]?.content
  }
})

// Handle call btn
const handleCall = async () => {
  callStatus.value = CallStatus.CONNECTING

  if (type === 'generate') {
    await $vapi.start(config.public.vapiWorkflowId, {
      variableValues: {
        username: userName,
        userid: userId
      }
    })
  } else {
    let formattedQuestions = ''
    if (questions) {
      formattedQuestions = questions.map((q) => `- ${q}`).join('\n')
    }

    await $vapi.start(interviewer, {
      variableValues: {
        questions: formattedQuestions
      }
    })
  }
}

const handleDisconnect = () => {
  callStatus.value = CallStatus.FINISHED
  $vapi.stop()
}
</script>

<style></style>
