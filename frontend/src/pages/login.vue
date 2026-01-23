<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const submit = async () => {
  error.value = null
  loading.value = true

  try {
    await auth.login(email.value.trim(), password.value)
    auth.redirectByRole(router)
  } catch (err: any) {
    error.value = err.response?.data?.message
      || err.message
      || 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="420" elevation="8" class="pa-6 rounded-lg">
      <v-card-title class="text-h5 text-center mb-6">
        Login
      </v-card-title>

      <v-form @submit.prevent="submit" lazy-validation>
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalid email']"
          required
          autofocus
        />

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Min 6 characters']"
          required
        />

        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mb-4"
          density="compact"
        >
          {{ error }}
        </v-alert>

        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
          :loading="loading"
          :disabled="loading"
        >
          Login
        </v-btn>

        <v-btn
          variant="text"
          block
          class="mt-3 text-caption"
          @click="router.push('/signup')"
        >
          Don’t have an account? Sign up
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<route lang="yaml">
meta:
  guestOnly: true
  layout: guest        
</route>