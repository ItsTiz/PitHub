<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { useAppStore } from '../../stores/app';
    import { useAuthStore } from '@/stores/auth'
    import { getLogoForTeam } from '../../composables/utils/teams-logos'
    import { getTeamColor } from '../../composables/utils/teams-colors'
    import axios from 'axios'

    const appStore = useAppStore();
    const auth = useAuthStore()
    const route = useRoute()
    const router = useRouter()  
    const pageIndex = ref(0)
    const cars = ref([])

    const views = ['telemetry', 'telemetry2', 'race', 'profile']

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

        if (view === 'profile') {
            router.push(`/controlroom/profile`)
            return;
        }

        router.push({
            path: `/controlroom/${view}`,
            query: isAdminLogged.value ? { team: activeTeamName.value } : undefined
        });
    }

    const getTeamByName = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/v1/teams/search/name/${activeTeamName.value}`);
            return res.data
        } catch (err) {
            console.error(err)
        }

    }

    const carRequest = async () => {
        
        try {
            const team = await getTeamByName();
            const res = await axios.get(`http://localhost:3000/v1/cars/search/team/${team[0]._id}`);
            return res.data
        } catch (err) {
            console.error(err)
        }
    }

    const navItems = computed(() => {
        const items = [];

        if (cars.value.length > 0){

            let numbers = [];
            if(typeof cars.value[0].driver === 'object'){
                numbers = cars.value.map(e => e.driver.number)
            } else{
                numbers = cars.value.map(e => e.number)
            }

            items.push({
                type: 'car0',
                text: numbers[0] ? numbers[0].toString() : '1'
            });
            items.push({
                type: 'car1',
                text: numbers[1] ? numbers[1].toString() : '1'
            });
        }


        items.push({ type: 'race', icon: 'mdi-go-kart-track' })
        items.push({ type: 'profile', icon: 'mdi-account-circle' })
        return items;
    
    })

    onMounted(async () => {
        const path = router.currentRoute.value.path;
        const splitted = path.split("/")
        const last = splitted[splitted.length - 1];
        if(isAdminLogged.value) cars.value = await carRequest() ?? []
        else cars.value = auth.user?.cars
        
        switch(last){ 
            case "telemetry":
                pageIndex.value = 0;
                return;
            case "telemetry2":
                pageIndex.value = 1;
                return;    
            case "race":
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
                    <div
                        v-if="activeTeamName !== 'ferrari'"
                        class="w-100 h-100 logo"
                    />
                    <img
                        v-else
                        :src="imagePath"
                        :alt="`${activeTeamName} logo image`"
                    >
                </v-avatar>
            </div>
            <v-divider />

            <div class="flex-grow-1 d-flex flex-column align-center justify-center">
                <v-avatar
                    v-for="(item, index) in navItems"
                    :key="index"
                    :color="pageIndex === index ? 'surface' : 'surface-variant'"
                    :size="pageIndex === index ? 48 : 38"
                    class="mb-8 cursor-pointer bg-background"
                    @click="selectView(index)"
                >
                    <span
                        v-if="index < 2"
                        class="text-body-1 font-weight-bold"
                    >{{ item.text }}</span>
                    <v-icon v-else>
                        {{ item.icon }}
                    </v-icon>
                </v-avatar>
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
