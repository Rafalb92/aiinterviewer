<template>
  <Card class="w-[300px] md:w-full max-w-lg mx-auto">
    <CardHeader>
      <CardTitle class="text-2xl font-bold text-primary">
        <NuxtLink to="/">Interview.AI</NuxtLink>
      </CardTitle>
      <CardDescription>Create an account</CardDescription>
    </CardHeader>
    <CardContent>
      <form
        class="flex flex-col gap-6"
        @submit="onSubmit"
      >
        <!-- Full Name -->
        <FormField
          v-if="props.type === 'sign-up'"
          v-slot="{ componentField }"
          name="displayName"
        >
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="John Doe"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Email address -->
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="john@doe.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- Password -->
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="******"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button
          type="submit"
          variant="default"
        >
          <span v-if="!isLoading">
            {{ props.type === 'login' ? 'Login' : 'Sign Up' }}
          </span>
          <div
            v-else
            class="flex items-center gap-2"
          >
            <span>Waiting</span>
            <Icon
              class="w-5 h-5"
              name="eos-icons:bubble-loading"
            />
          </div>
        </Button>
      </form>
    </CardContent>
    <CardFooter>Social</CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { authClient } from '~/lib/auth-client'

const isLoading = ref(false)

// Types
type FormType = 'login' | 'sign-up'

// Props
const props = defineProps<{
  type: FormType
}>()
// AuthComposable

// Schema
const formSchema = toTypedSchema(
  z.object({
    displayName:
      props.type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const isLoggedIn = useAuthStatus()

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true
  if (props.type === 'sign-up') {
    console.log(values)
    const { error } = await authClient.signUp.email({
      name: values.displayName!,
      email: values.email,
      password: values.password
    })

    if (error && error.message) {
      toast.error(error.message)
      isLoading.value = false
      return form.resetForm()
    }

    toast.success(
      'Successful, Your account has been created. You can now login.'
    )
    isLoading.value = false

    await navigateTo('/sign-in')
  } else {
    isLoggedIn.value = false
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password
      })
      if (error && error.message) {
        toast.error(error.message)
        isLoading.value = false
        return form.resetForm()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Something went Wrong')
      }
      isLoading.value = false
      return form.resetForm()
    } finally {
      isLoggedIn.value = true
      toast.success('LoggedIn successful.')
      isLoading.value = false
      await navigateTo('/dashboard')
    }
  }
})
</script>

<style></style>
