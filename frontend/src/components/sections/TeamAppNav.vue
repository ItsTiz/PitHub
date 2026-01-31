<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app';
import { useAuthStore } from '@/stores/auth'
const appStore = useAppStore();
const auth = useAuthStore()
const router = useRouter()
const pageIndex = ref(0)
const showProfileMenu = ref(false)

const logout = () => {
  auth.logout()
  router.push('/login')
}

const toggleTheme = () => {
    appStore.toggleTheme();
}

const views = ['telemetry', 'race', 'comms', 'profile']

const selectView = (index) => {
  pageIndex.value = index
  const view = views[index] || 'telemetry'
  if(view === 'profile')
    router.push(`/profile`)
  else router.push(`/controlroom/${view}`)
}

const getIcon = (index) => {
    switch(index){
        case 0:
            return 'mdi-gauge-low';
        case 1:
            return 'mdi-go-kart-track';
        case 2:
            return 'mdi-radio-tower';
        case 3: 
            return 'mdi-account-circle';
    }
}


onMounted(() => {
    const path = router.currentRoute.value.path;
    const splitted = path.split("/")
    const last = splitted[splitted.length - 1];
    switch(last){
        case "telemetry":
            pageIndex.value = 0;
            return;
        case "race":
            pageIndex.value = 1;
            return;
        case "comms":
            pageIndex.value = 2;
            return;
        case "profile":
            pageIndex.value = 3;
            return;    
    }
})
</script>

<template>
    <v-navigation-drawer
        class="pt-4 pb-4 no-select"
        :elevation="7"
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
                v-for="n in 4"
                :key="n"
                :color="n === (pageIndex + 1) ? 'primary' : 'surface-variant'"
                :size="n === (pageIndex + 1 )? 48 : 38"
                :icon="getIcon(n-1)"
                class="mb-8 cursor-pointer"
                @click="n == 4 ? (showProfileMenu = true) : selectView(n-1)"
            >
            
            </v-avatar>
            <v-menu v-model="showProfileMenu" location="top" :close-on-content-click="false">
                <!-- <template v-slot:activator="{ props }">
                    <v-avatar
                    v-bind="props"
                    :color="pageIndex === 4 ? 'primary' : 'surface-variant'"
                    :size="pageIndex === 4 ? 48 : 32"
                    icon="mdi-account-circle"
                    class="mb-8 cursor-pointer"
                    />
                </template> -->

                <v-list density="compact" min-width="140">
                    <v-list-item @click="selectView(3)">
                    <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                    <v-list-item-title class="text-error">Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

        <div class="d-flex justify-center">
            <Switch
                :false-icon="'mdi-white-balance-sunny'"
                :true-icon="'mdi-weather-night'"
                @modelChanged="toggleTheme()"
            />
        </div>

        <div class="d-flex justify-center">
            <Button 
                :backgroundColor="'primary'"
                :textColor="'on-surface'"
                :icon="'mdi-logout'"
                :iconOnly="true"
                :variant="'text'"
                @click="logout()"
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
