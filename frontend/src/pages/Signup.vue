<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('user')           // default for new users
const loading = ref(false)
const error = ref(null)
const success = ref(null)          // optional: for admin feedback

const isAdminCreating = computed(() => auth.isAuthenticated && auth.isAdmin)
const pageTitle = computed(() => isAdminCreating.value ? 'Create New User' : 'Sign Up')
const buttonText = computed(() => isAdminCreating.value ? 'Create User' : 'Sign Up')

const submit = async () => {
    error.value = null
    success.value = null

    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
    }

    if (!email.value.trim()) {
        error.value = 'Email is required'
        return
    }

    try {
        loading.value = true

        const payload = {
            email: email.value.trim(),
            password: password.value
        }

        // Only include role if admin is creating
        if (isAdminCreating.value) {
            payload.role = role.value
        }

        await auth.register(payload)

        if (auth.isAuthenticated) {
            await auth.login(email.value.trim(), password.value)
            auth.redirectByRole(router)
        } else {
            success.value = `User ${email.value} created successfully with role: ${role.value}`
            // Todo optional
            router.push('/sysadmin')
            email.value = ''
            password.value = ''
            confirmPassword.value = ''
            role.value = 'user'
        }
    } catch (err) {
        console.log(err);
        error.value = err.response?.data?.message
            || err.message
            || 'Operation failed. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="420" elevation="8" class="pa-6 rounded-lg">
      <v-card-title class="text-h5 text-center mb-6">
        {{ pageTitle }}
      </v-card-title>

      <v-form @submit.prevent="submit" lazy-validation>
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          :rules="[
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'Invalid email format'
          ]"
          required
          autofocus
        />

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          :rules="[
            v => !!v || 'Password is required',
            v => v.length >= 6 || 'Password must be at least 6 characters'
          ]"
          required
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          prepend-inner-icon="mdi-lock-check"
          :rules="[v => !!v || 'Confirmation required', v => v === password || 'Passwords do not match']"
          required
        />

        <!-- Role selector - admins only -->
        <v-select
          v-if="isAdminCreating"
          v-model="role"
          :items="['admin', 'team', 'user']"
          label="Assign Role"
          prepend-inner-icon="mdi-shield-account"
          class="mt-3"
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

        <v-alert
          v-if="success"
          type="success"
          variant="tonal"
          class="mb-4"
          density="compact"
        >
          {{ success }}
        </v-alert>

        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
          :loading="loading"
          :disabled="loading"
        >
          {{ buttonText }}
        </v-btn>

        <!-- Only show link for public signup -->
        <v-btn
          v-if="!isAdminCreating"
          variant="text"
          block
          class="mt-3 text-caption"
          @click="router.push('/login')"
        >
          Already have an account? Login
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<route lang="yaml">
meta:
  guestOnly: true   # ← only applies to public /signup; admin can still access if you have /admin/signup or similar
  requiresAuth: false
  layout: authlayout
</route>