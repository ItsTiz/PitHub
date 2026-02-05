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
</script>

<template>
    <v-app-bar
        :elevation="2"
        height="45"
    > 
        <v-toolbar-title> {{ title }} </v-toolbar-title>
        <v-spacer />
        
        <v-tabs
            v-if="auth?.user?.role === 'user'"
            color="primary"
            density="compact"
            grow
        >
            <v-tab
                value="teams"
                to="/teams"
            >
                <v-icon
                    icon="mdi-flag-checkered"
                    class="mr-2"
                    left
                />Teams
            </v-tab>
            
            <v-tab
                value="race"
                to="/race"
            >
                <v-icon
                    icon="mdi-go-kart-track"
                    class="mr-2"
                    left
                />Race
            </v-tab>
            
            <v-tab
                value="profile"
                to="/profile"
            >
                <v-icon
                    icon="mdi-account-circle"
                    class="mr-2"
                    left
                />Profile
            </v-tab>
        </v-tabs>

        <v-spacer />
        <v-spacer />
        
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