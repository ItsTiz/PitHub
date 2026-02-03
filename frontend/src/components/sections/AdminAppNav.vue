<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { useAppStore } from '../../stores/app';
    import { useAuthStore } from '@/stores/auth'
    const appStore = useAppStore();
    const router = useRouter()
    const pageIndex = ref(0)

    const auth = useAuthStore()
    const logout = () => {
        auth.logout()
        router.push('/login')
    }

    const toggleTheme = () => {
        appStore.toggleTheme();
    }

    const views = ['simulation', 'users']

    const selectView = (index) => {
        pageIndex.value = index
        const view = views[index] || 'simulation'
        router.push(`/sysadmin/${view}`)
    }

    const getIcon = (index) => {
        switch(index){
            case 0:
                return 'mdi-play-speed';
            case 1:
                return 'mdi-account-group';
        }
    }

    onMounted(() => {
        const path = router.currentRoute.value.path;
        const splitted = path.split("/")
        const last = splitted[splitted.length - 1];
        switch(last){
            case "simulation":
                pageIndex.value = 0;
                return;
            case "users":
                pageIndex.value = 1;
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
                    color="warning"
                    class="mb-4"
                >
                    <v-icon icon="mdi-shield-crown" />
                </v-avatar>
            </div>
            <v-divider />

            <div class="flex-grow-1 d-flex flex-column align-center justify-center">
                <v-avatar
                    v-for="n in 2"
                    :key="n"
                    :color="n === (pageIndex + 1) ? 'info' : 'surface-variant'"
                    :size="n === (pageIndex + 1 )? 48 : 38"
                    :icon="getIcon(n-1)"
                    class="mb-8 cursor-pointer"
                    @click="selectView(n-1)"
                />
            </div>

            <div class="d-flex justify-center">
                <UiSwitch
                    :false-icon="'mdi-white-balance-sunny'"
                    :true-icon="'mdi-weather-night'"
                    @model-changed="toggleTheme()"
                />
            </div>

            <div class="d-flex justify-center">
                <UiButton 
                    :background-color="'primary'"
                    :text-color="'on-surface'"
                    :icon="'mdi-logout'"
                    :icon-only="true"
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
