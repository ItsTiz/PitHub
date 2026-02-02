<template>
  <v-app>
    <TeamAppNav v-if="auth.isAuthenticated && auth.isAdmin" />

    <v-main>
      <Transition name="fade-view" mode="out-in">
        <RouterView />
      </Transition>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>