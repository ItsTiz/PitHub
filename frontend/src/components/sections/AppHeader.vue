<script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const auth = useAuthStore()

    const title = ref("PitHub F1");

    const logout = () => {
        auth.logout()
        router.push('/login')
    }
    const profile = () => {
        router.push('/profile')
        return;
    }
</script>

<template>
    <v-app-bar
        :elevation="2"
        height="45"
    > 
        <v-toolbar-title> {{ title }}</v-toolbar-title>
        <UiButton
            v-if="auth.user?.role === 'user'"
            :background-color="'primary'"
            :text-color="'on-surface'"
            :icon="router.currentRoute.value.fullPath.includes('profile') ? 'mdi-go-kart-track' : 'mdi-account-circle'"
            :icon-only="true"
            :variant="'text'"
            @click="router.currentRoute.value.fullPath.includes('profile') ? router.push('/race') : profile()"
        />
        <UiButton 
            :background-color="'primary'"
            :text-color="'on-surface'"
            :icon="'mdi-logout'"
            :icon-only="true"
            :variant="'text'"
            @click="logout()"
        />
    </v-app-bar>
</template>