<script setup>
import { useAppStore } from '../../stores/app';
import { useAuthStore } from '@/stores/auth'
const appStore = useAppStore();
const router = useRouter()
const pageIndex = ref(1)

const toggleTheme = () => {
    appStore.toggleTheme();
}

const views = ['telemetry', 'race', 'comms', 'profile']

const selectView = (index) => {
  pageIndex.value = index
  const view = views[index - 1] || 'telemetry'
  router.push(`/controlroom/${view}`)
}

const getIcon = (index) => {
    switch(index){
        case 1:
            return 'mdi-gauge-low';
        case 2:
            return 'mdi-go-kart-track';
        case 3:
            return 'mdi-radio-tower';
        case 4: 
            return 'mdi-account-circle';
    }
}


const auth = useAuthStore()

const showProfileMenu = ref(false)

const logout = () => {
  auth.logout()
  router.push('/login')
}

</script>

<template>
    <v-navigation-drawer
        class="pt-4 pb-4 no-select"
        elevation="7"
        permanent           
        rail                
        color="bg-surface"
    >
    <div class="d-flex flex-column h-100">
        <div class="d-flex flex-column align-center justify-center">
            <v-avatar
                :size="48"
                color="bg-surface-bright"
                class="mb-4"
            >
            </v-avatar>
        </div>
        <v-divider></v-divider>

        <div class="flex-grow-1 d-flex flex-column align-center justify-center">
            <v-avatar
                v-for="n in 3"
                :key="n"
                :color="n === pageIndex ? 'primary' : 'surface-variant'"
                :size="n === pageIndex ? 48 : 32"
                :icon="getIcon(n)"
                class="mb-8 cursor-pointer"
                @click="selectView(n)"
            >
            <v-menu v-model="showProfileMenu" location="top" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-avatar
                    v-bind="props"
                    :color="pageIndex === 4 ? 'primary' : 'surface-variant'"
                    :size="pageIndex === 4 ? 48 : 32"
                    icon="mdi-account-circle"
                    class="mb-8 cursor-pointer"
                    />
                </template>

                <v-list density="compact" min-width="140">
                    <v-list-item @click="selectView(4)">
                    <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                    <v-list-item-title class="text-error">Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            </v-avatar>
        </div>

        <div class="d-flex justify-center">
            <Switch
                :false-icon="'mdi-white-balance-sunny'"
                :true-icon="'mdi-weather-night'"
                @modelChanged="toggleTheme()"
            />
        </div>
    </div>
    </v-navigation-drawer>
</template>

<style scoped>
.no-select,
.no-select * {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
</style>
