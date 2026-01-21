<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useDisplay } from 'vuetify'
import Odometer from '../components/pages-components/carTracing/Odometer.vue'

const telemetryStore = useTelemetryStore();

const { smAndDown } = useDisplay()

const cols = computed(() => {
    return smAndDown.value ? [12, 12] : [6, 6]
})

const getSpeed = computed(() => {
    return telemetryStore.carData?.speed
});

const getRpms = computed(() => {
    return telemetryStore.carData?.rpms
});


onMounted(() => {
    //request the join to the telemetry room
    //TODO auth here too;
    const token = "";
    telemetryStore.subscribeToTeam(token);
});

onUnmounted(() => {
    //tell the socket to leave the room
    telemetryStore.unsubscribeFromTeam();
});


</script>

<template>
    <v-container fluid class="h-100 d-flex flex-column bg-surface-bright">

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
                        <Odometer 
                            :speed="getSpeed"
                            :rpms="getRpms"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
                        Row 1 - Col 2
                    </template>
                </Sheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
                        Row 2 - Col 1
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
                        Row 2 - Col 2
                    </template>
                </Sheet>
            </v-col>
        </v-row>

    </v-container>
</template>

<route lang="yaml">
meta:
  layout: cartracingl
</route>
