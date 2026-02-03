<script setup>
    import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
    import { useAppStore } from '../../stores/app';
    import { useAuthStore } from '@/stores/auth'
    import { getLogoForTeam } from '../../composables/utils/teams-logos'
    import { getTeamColor } from '../../composables/utils/teams-colors'

    const appStore = useAppStore();
    const auth = useAuthStore()
const route = useRoute()
    const router = useRouter()
    const pageIndex = ref(0)

const views = ['telemetry', 'race', 'comms', 'profile']

const isAdminLogged = computed(() => {
    return auth.user?.role === 'admin';
});

const activeTeamName = computed(() => {
    if (!isAdminLogged.value) {
        return auth.user.team?.name;
    }

    return route.query?.team;
});

const getImageUrl = (path) => {
  return new URL(`../../assets/teams/${path}`, import.meta.url).href
}

const imagePath = computed(() => {   
    const logoname = getLogoForTeam(activeTeamName.value);
    return getImageUrl(logoname)
});

const maskImage = computed(() => `url('${imagePath.value}')`);

const teamColor = computed(() => {
    return getTeamColor(activeTeamName.value);
});

const teamColorDarkened = computed(() => {
    return getTeamColor(activeTeamName.value, true);
});

    const logout = () => {
        auth.logout()
        router.push('/login')
    }

    const toggleTheme = () => {
        appStore.toggleTheme();
    }

    const selectView = (index) => {
        pageIndex.value = index
        const view = views[index] || 'telemetry'
    
    if(view === 'profile') {
        router.push(`/profile`)
        return;
    }

    router.push({
        path: `/controlroom/${view}`,
        query: isAdminLogged.value ? { team: activeTeamName.value } : undefined
    });
    }

const getIcon = (index) => {
    const icons = [
        'mdi-gauge-low', 
        'mdi-go-kart-track', 
        'mdi-radio-tower', 
        'mdi-account-circle'
    ];
    return icons[index] || 'mdi-help-circle';
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
                <div v-if="activeTeamName !== 'ferrari'" class="w-100 h-100 logo"></div>
                    <img
                    v-else
                        :src="imagePath"
                        :alt="`team logo image`"
                <!-- TODO put al here-->
                    <!-- TODO substitue alt in next merge with variable -->
                </v-avatar>
            </div>
            <v-divider />

            <div class="flex-grow-1 d-flex flex-column align-center justify-center">
                <v-avatar
                    v-for="n in 4"
                    :key="n"
                    :color="n === (pageIndex + 1) ? 'surface ': 'surface-variant'"
                    :size="n === (pageIndex + 1 )? 48 : 38"
                    :icon="getIcon(n-1)"
                    class="mb-8 cursor-pointer bg-background"
                    @click="selectView(n-1)"
                />
            </div>

            <div class="d-flex justify-center">
                <UiSwitch
                    :false-icon="'mdi-white-balance-sunny'"
                    :true-icon="'mdi-weather-night'"
                    :color="`background`"
                    @model-changed="toggleTheme()"
                />
            </div>

            <div class="d-flex justify-center">
                <UiButton 
                    :background-color="'on-surface'"
                    :text-color="'on-surface'"
                    :icon="'mdi-logout'"
                    :icon-only="true"
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

.logo {
  background-color: white; 
  -webkit-mask: v-bind(maskImage) no-repeat center;
  mask: v-bind(maskImage) no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
</style>
