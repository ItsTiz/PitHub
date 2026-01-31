<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app';
const appStore = useAppStore();
const router = useRouter()
const pageIndex = ref(0)

const toggleTheme = () => {
    appStore.toggleTheme();
}

const views = ['telemetry', 'race', 'comms']

const selectView = (index) => {
  pageIndex.value = index
  const view = views[index] || 'telemetry'
  router.push(`/controlroom/${view}`)
}

const getIcon = (index) => {
    switch(index){
        case 0:
            return 'mdi-gauge-low';
        case 1:
            return 'mdi-go-kart-track';
        case 2:
            return 'mdi-radio-tower';
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
                v-for="n in 3"
                :key="n"
                :color="n === (pageIndex + 1) ? 'primary' : 'surface-variant'"
                :size="n === (pageIndex + 1 )? 48 : 38"
                :icon="getIcon(n-1)"
                class="mb-8 cursor-pointer"
                @click="selectView(n-1)"
            >
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
