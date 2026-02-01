<script setup>
import { watch, computed, ref } from 'vue'
import { useTelemetryStore } from "@/stores/car-telemetry";
import { useDisplay } from 'vuetify'
import { getTeamColor } from '../../composables/utils/teams-colors'
import { useAuthStore } from '../../stores/auth';
const auth = useAuthStore()

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


const teamColor = computed(() => getTeamColor(auth.user?.team?.name));
const teamColorDarkened = computed(() => getTeamColor(auth.user?.team?.name, true));
</script>


<template>
    <v-container fluid class="h-100 d-flex flex-column bg-background">

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <Sheet class="h-100 ma-2" :="5">
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
                        <OilTempGraph
                            :oil_temp_array="oil_temp_values"
                            :teamTheme="teamColor"
                        />
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
                        />
                    </template>
                </Sheet>
            </v-col>

            <v-col :cols="cols[1]">
                <Sheet class="h-100 ma-2" :elevation="5">
                    <template v-slot:default>
                    <Autonomy
                        :fuel="carData.fuel_level"
                        :esr_percentage="carData.battery_level"
                        :teamTheme="teamColor"
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
  minRole: 'team'
  guestOnly: false
</route>