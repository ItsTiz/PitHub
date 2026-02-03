<script setup>
    import { computed, provide, ref } from 'vue'
    import { useDisplay } from 'vuetify'
    import { useRaceStore } from '@/stores/race'
    import { storeToRefs } from "pinia";
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
            selectedCarId.value = null; //triggers the lazyness of mr. provider
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
</script>

<template>
    <v-container
        fluid
        class="h-100 d-flex flex-column bg-background"
    >
        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <UiSheet
                    class="h-100"
                    :elevation="5"
                >
                    <template #default>
                        <RaceLeaderboard
                            @driver-clicked="handleCarClicked"
                        />
                    </template>
                </UiSheet>
            </v-col>

            <v-col :cols="cols[1]">
                <UiSheet
                    class="h-100"
                    :elevation="5"
                >
                    <template #default>
                        <RaceView
                            @car-clicked="handleCarClicked"
                        />
                    </template>
                </UiSheet>
            </v-col>

            <v-col :cols="cols[2]">
                <UiSheet
                    class="h-100"
                    :elevation="5"
                >
                    <template #default>
                        <RightSidePanel
                            :selected-item="selectedCarId"
                        />
                    </template>
                </UiSheet>
            </v-col>
        </v-row>
    </v-container>
</template>