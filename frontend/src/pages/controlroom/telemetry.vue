<script setup>
import { watch, computed, ref } from 'vue'
import { useRoute } from 'vue-router' 
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useDisplay } from 'vuetify'
import { getTeamColor } from '../../composables/utils/teams-colors'
import { useAuthStore } from '../../stores/auth';
const auth = useAuthStore()
const route = useRoute();

const { smAndDown } = useDisplay()
const telemetryStore = useTelemetryStore();
const { carData } = storeToRefs(telemetryStore);

const oil_temp_values = ref([]);
const brake_temp_values = ref([]);

const cols = computed(() => {
    return smAndDown.value ? [12, 12] : [6, 6]
})

const getOilTemp = computed(() => {
    return telemetryStore.carData?.engine_oil_temp
});

const brakeTemp = computed(() => {
    return telemetryStore.carData?.brake_temperature
});

watch(getOilTemp, (temp, _) => {
    if(oil_temp_values.value.length == 11){
        oil_temp_values.value.splice(0, 1);
    }
    oil_temp_values.value.push(temp);
})

watch(brakeTemp, (temp, _) => {
    if(brake_temp_values.value.length == 6){
        brake_temp_values.value.splice(0, 1);
    }
    brake_temp_values.value.push(temp);
})

const teamColor = computed(() => {
    if(auth.user?.role === "team"){
        return getTeamColor(auth.user?.team?.name)
    }
    else{
        return getTeamColor(route.query?.team)
    }
});
</script>


<template>
    <v-container fluid class="h-100 d-flex flex-column bg-background">

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100 ma-2" :elevation="5">
                    <template v-slot:default>
                        <Odometer 
                            :speed="carData.speed"
                            :rpms="carData.rpms"
                            :teamTheme="teamColor"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" :elevation="5">
                    <template v-slot:default>
                        <v-container fluid class="d-flex flex-column h-100">
                            
                            <v-row no-gutters class="flex-grow-1 flex-shrink-1 w-100" style="min-height: 0;">
                                <v-col cols="12" class="h-100">
                                    <TempGraph
                                        class="pa-0 ma-0"
                                        :name="'Oil Temperature'"
                                        :icon="'mdi-oil-temperature'"
                                        :uom="'C°'"
                                        :temp_array="oil_temp_values"
                                        :teamTheme="teamColor"
                                    />
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="h-25 flex-grow-0 flex-shrink-0 w-100">
                                <v-col cols="12" class="h-100">
                                    <OilPressure
                                        class="pa-0 ma-0"
                                        :oil_pressure="carData.oil_pressure"
                                        :teamTheme="teamColor"
                                    />
                                </v-col>
                            </v-row>

                        </v-container>
                    </template>
                </Sheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100 ma-2" :elevation="5">
                    <template v-slot:default>
                         <Tires 
                            :front_left_health="carData.tire_health_fl"
                            :front_right_health="carData.tire_health_fr"
                            :rear_left_health="carData.tire_health_rl"
                            :rear_right_health="carData.tire_health_rr"
                            :teamTheme="teamColor"
                            :tire_type="carData.tire_type"
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" :elevation="5">
                    <template v-slot:default>
                        <div class="d-flex flex-row align-items w-100">
                            <TempGraph
                                class="flex-grow-1 w-100 ma-4"
                                :name="'Brake Temperature'"
                                :icon="'mdi-car-brake-temperature'"
                                :uom="'C°'"
                                :temp_array="brake_temp_values"
                                :teamTheme="teamColor"
                                :graph_height="100"
                                :below_level_threshold="300"
                                :normal_level_threshold="500"
                                :over_level_threshold="900"
                                :maxSecondsScale="5"
                            />
    
                            <Autonomy
                                class="flex-grow-0"
                                :fuel="carData.fuel_level"
                                :esr_percentage="carData.battery_level"
                                :teamTheme="teamColor"
                            />
                        </div>
                    </template>
                </Sheet>
            </v-col>
        </v-row>

    </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  minRole: 'team'
  guestOnly: false
</route>