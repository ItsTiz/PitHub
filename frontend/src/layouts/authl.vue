<template>
  <v-app>
    <v-main v-if="!auth.isAuthenticated" class="auth-main">
      <slot />
    </v-main>

    <template v-else>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>PitHub</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="auth.logout">Logout</v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
          <v-list-item v-if="auth.user?.role === 'admin'" to="/sysadmin">SysAdmin</v-list-item>
          <v-list-item v-if="auth.user?.role === 'team'" to="/car-tracing">Car Tracing</v-list-item>
          <v-list-item v-if="auth.user?.role === 'user'" to="/race">Race</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </template>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
  const drawer = ref(false)
</script>

<style scoped>
.auth-main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}
</style>
