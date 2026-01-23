<script setup>
import { useAppStore } from '../../stores/app';
const appStore = useAppStore();
const router = useRouter()
const pageIndex = ref(1)

const toggleTheme = () => {
    appStore.toggleTheme();
}

const views = ['telemetry', 'race', 'comms']

function selectView(index) {
  pageIndex.value = index
  const view = views[index - 1] || 'telemetry'
  router.push(`/controlroom/${view}`)
}

</script>

<template>
    <v-navigation-drawer
        class="pt-4 pb-4 no-select"
        elevation="7"
        permanent           
        rail                
        color="background"
    >
    <div class="d-flex flex-column h-100">
        <div class="d-flex flex-column align-center justify-center">
            <v-avatar
                :size="48"
                class="mb-4"
            >
            </v-avatar>
        </div>
        <v-divider></v-divider>

        <div class="flex-grow-1 d-flex flex-column align-center justify-center">
            <v-avatar
                v-for="n in 3"
                :key="n"
                :color="n === pageIndex ? 'primary' : 'grey-lighten-1'"
                :size="n === pageIndex ? 48 : 32"
                class="mb-8 cursor-pointer"
                @click="selectView(n)"
            >
                {{ n }}
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
