<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useAuthStore()

const title = ref("PitHub F1");

const logout = () => {
  auth.logout()
  router.push('/login')
}

</script>

<template>

    <v-app-bar
        :elevation = "2"
        height = "45"
    > 
        <v-toolbar-title> {{ title }}</v-toolbar-title>
         <Button 
                :backgroundColor="'primary'"
                :textColor="'on-surface'"
                :icon="'mdi-logout'"
                :iconOnly="true"
                :variant="'text'"
                @click="logout()"
            />
    </v-app-bar>
</template>