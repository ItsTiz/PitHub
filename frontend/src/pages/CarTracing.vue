<script setup>
import { watch, computed, onMounted, onUnmounted, ref } from 'vue'
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useDisplay } from 'vuetify'
import Odometer from '../components/pages-components/carTracing/Odometer.vue'
import OilTempGraph from '../components/pages-components/carTracing/OilTempGraph.vue';

const telemetryStore = useTelemetryStore();

const { smAndDown } = useDisplay()

const oil_temp_values = ref([]);

const cols = computed(() => {
    return smAndDown.value ? [12, 12] : [6, 6]
})

const getOilTemp = computed(() => {
    return telemetryStore.carData?.engine_oil_temp
});

const getSpeed = computed(() => {
    return telemetryStore.carData?.speed
});

const getRpms = computed(() => {
    return telemetryStore.carData?.rpms
});

const getTireHealthFL = computed(() => {
    return telemetryStore.carData?.tire_health_fl
});

const getTireHealthFR = computed(() => {
    return telemetryStore.carData?.tire_health_fr
});

const getTireHealthRL= computed(() => {
    return telemetryStore.carData?.tire_health_rl
});

const getTireHealthRR = computed(() => {
    return telemetryStore.carData?.tire_health_rr
});

watch(getOilTemp, (temp, _) => {
    if(oil_temp_values.value.length == 11){
        oil_temp_values.value.splice(0, 1);
    }
    oil_temp_values.value.push(temp);
})

onMounted(() => {
    //TODO auth here too;
    const token = "";
    telemetryStore.subscribeToTeam(token);
});

onUnmounted(() => {
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
                        <OilTempGraph
                            :oil_temp_array="oil_temp_values"
                        />
                    </template>
                </Sheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
                         <Tires 
                            :front_left_health="getTireHealthFL"
                            :front_right_health="getTireHealthFR"
                            :rear_left_health="getTireHealthRL"
                            :rear_right_health="getTireHealthRR"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
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
