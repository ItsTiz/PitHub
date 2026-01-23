<script setup>
import { watch, computed, onMounted, onUnmounted, ref } from 'vue'
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useDisplay } from 'vuetify'
import Odometer from '../components/pages-components/carTracing/Odometer.vue'
import OilTempGraph from '../components/pages-components/carTracing/OilTempGraph.vue';

const { smAndDown } = useDisplay()
const telemetryStore = useTelemetryStore();
const { carData } = storeToRefs(telemetryStore);

const oil_temp_values = ref([]);

const cols = computed(() => {
    return smAndDown.value ? [12, 12] : [6, 6]
})

const getOilTemp = computed(() => {
    return telemetryStore.carData?.engine_oil_temp
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
                            :speed="carData.speed"
                            :rpms="carData.rpms"
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
                            :front_left_health="carData.tire_health_fl"
                            :front_right_health="carData.tire_health_fr"
                            :rear_left_health="carData.tire_health_rl"
                            :rear_right_health="carData.tire_health_rr"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" elevation="5">
                    <template v-slot:default>
                    <Autonomy
                        :fuel="carData.fuel_level"
                        :esr_percentage="carData.battery_level"
                    />
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
