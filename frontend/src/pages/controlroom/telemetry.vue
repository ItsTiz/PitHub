<script setup>
    import { watch, computed, ref } from 'vue'
    import { useTelemetryStore } from "@/stores/car-telemetry";
    import { useDisplay } from 'vuetify'
    import { getTeamColor } from '../../composables/utils/teams-colors'
    import { useAuthStore } from '../../stores/auth';
    import { storeToRefs } from "pinia";
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


    watch(getOilTemp, (temp) => {
        if(oil_temp_values.value.length == 11){
            oil_temp_values.value.splice(0, 1);
        }
        oil_temp_values.value.push(temp);
    })


    const teamColor = computed(() => getTeamColor(auth.user?.team?.name));
</script>


<template>
    <v-container
        fluid
        class="h-100 d-flex flex-column bg-background"
    >
        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <UiSheet
                    class="h-100 ma-2"
                    :="5"
                >
                    <template #default>
                        <CarOdometer 
                            :speed="carData.speed"
                            :rpms="carData.rpms"
                            :team-theme="teamColor"
                        />
                    </template>
                </UiSheet>
            </v-col>

            <v-col :cols="cols[1]">
                <UiSheet
                    class="h-100 ma-2"
                    :elevation="5"
                >
                    <template #default>
                        <OilTempGraph
                            :oil-temps-array="oil_temp_values"
                            :team-theme="teamColor"
                        />
                    </template>
                </UiSheet>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col :cols="cols[0]">
                <UiSheet
                    class="h-100 ma-2"
                    :elevation="5"
                >
                    <template #default>
                        <TiresStatus 
                            :front-left-health="carData.tire_health_fl"
                            :front-right-health="carData.tire_health_fr"
                            :rear-left-health="carData.tire_health_rl"
                            :rear-right-health="carData.tire_health_rr"
                            :team-theme="teamColor"
                        />
                    </template>
                </UiSheet>
            </v-col>

            <v-col :cols="cols[1]">
                <UiSheet
                    class="h-100 ma-2"
                    :elevation="5"
                >
                    <template #default>
                        <CarAutonomy
                            :fuel="carData.fuel_level"
                            :esr-percentage="carData.battery_level"
                            :team-theme="teamColor"
                        />
                    </template>
                </UiSheet>
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