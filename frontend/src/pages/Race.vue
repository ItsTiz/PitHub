<script setup>
import { computed, provide } from 'vue'
import { useDisplay } from 'vuetify'
import { useRaceStore } from '@/stores/race'
const { smAndDown } = useDisplay()
const raceStore = useRaceStore()
const { cars } = storeToRefs(raceStore)

const selectedCarId = ref(null);

const handleCarClicked = (carId) => {
    if(carId === undefined){
        console.log("Cannot handle click! Car id is invalid.");
        return;
    }
    
    if (selectedCarId.value === carId) {
        selectedCarId.value = null;
    } else {
        selectedCarId.value = carId;
    }
}

const activeCar = computed(() => {
    if (!selectedCarId.value) return null
    return cars.value.find(c => c._id === selectedCarId.value) || null
})

const cols = computed(() => {
    return smAndDown.value ? [12, 12, 12] : [3, 6, 3];
});
provide('selectedItem', activeCar)


onMounted(() => {
    raceStore.subscribeToRace();
});

onUnmounted(() => {
    raceStore.unsubscribeFromRace();
});

</script>

<template>
    <v-container fluid class="h-100 d-flex flex-column bg-background">
         <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100" :elevation="5">
                    <template v-slot:default>
                        <Leaderboard
                            @driver-clicked="handleCarClicked"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100" :elevation="5">
                    <template v-slot:default>
                        <RaceView
                            @car-clicked="handleCarClicked"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[2]">
                <Sheet class="h-100" :elevation="5">
                    <template v-slot:default>
                        <RightSidePanel
                            :selectedItem="selectedCar"
                        />
                    </template>
                </Sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'user'
  guestOnly: false
</route>