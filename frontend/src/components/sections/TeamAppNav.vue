<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app';
import { useAuthStore } from '@/stores/auth'
import { getLogoForTeam } from '../../composables/utils/teams-logos'
import { getTeamColor } from '../../composables/utils/teams-colors'
const appStore = useAppStore();
const auth = useAuthStore()
const router = useRouter()
const pageIndex = ref(0)

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

const getImageUrl = (path) => {
  return new URL(`../../assets/teams/${path}`, import.meta.url).href
}

const imagePath = computed(()=>{    
    const logoname = getLogoForTeam(auth.user?.team?.name);
    return getImageUrl(logoname)
});

const teamColor = computed(() => getTeamColor(auth.user?.team?.name));
const teamColorDarkened = computed(() => getTeamColor(auth.user?.team?.name, true));

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
        :class="`pt-4 pb-4 no-select bg-${teamColorDarkened}`"
        :elevation="7"
        permanent           
        rail                
    >
    <div class="d-flex flex-column h-100">
        <div class="d-flex flex-column align-center justify-center">
            <v-avatar
                :size="48"
                :class="`mb-4 bg-${teamColor}`"
                :image="imagePath"
            >
                <img
                    :src="imagePath"
                    :color="'white'"
                /> 
                <!-- TODO  put al here-->
            </v-avatar>
        </div>
        <v-divider></v-divider>

        <div class="flex-grow-1 d-flex flex-column align-center justify-center">
            <v-avatar
                v-for="n in 4"
                :key="n"
                :color="n === (pageIndex + 1) ? 'surface ': 'surface-variant'"
                :size="n === (pageIndex + 1 )? 48 : 38"
                :icon="getIcon(n-1)"
                class="mb-8 cursor-pointer bg-background"
                @click="selectView(n-1)"
            >
            </v-avatar>
        </div>

        <div class="d-flex justify-center">
            <Switch
                :false-icon="'mdi-white-balance-sunny'"
                :true-icon="'mdi-weather-night'"
                :color="`background`"
                @modelChanged="toggleTheme()"
            />
        </div>

        <div class="d-flex justify-center">
            <Button 
                :backgroundColor="'on-surface'"
                :textColor="'on-surface'"
                :icon="'mdi-logout'"
                :iconOnly="true"
                :variant="'elevated'"
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
