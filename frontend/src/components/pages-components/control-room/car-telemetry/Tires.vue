<script setup>
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { cars } from '@/composables/constants/cars.js';
import { useTheme } from 'vuetify'
import { getTeamHex } from '../../../../composables/utils/teams-colors';
const props = defineProps({
    gauges_size: { type: Number, default: 150 },
    gauges_width: { type: Number, default: 22 },
    front_right_health: { type: Number, default: 0 },
    front_left_health: { type: Number, default: 0 },
    front_right_health: { type: Number, default: 0 },
    rear_left_health: { type: Number, default: 0 },
    rear_right_health: { type: Number, default: 0 },
    tire_type: { type: Number, default: -1 },
    teamTheme: { type: String },
});

const { smAndDown } = useDisplay()
const theme = useTheme()
const auth = useAuthStore()

const cols = computed(() => {
    return smAndDown.value ? [12, 12, 12] : [3, 3, 3]
})

const carImage = computed(() => {
    return cars['top_view'] || { viewBox: '0 0 500 500', path: '' };
});

const teamHex = computed(() => {
    if(auth.user?.role === "team"){
        return getTeamHex(theme, auth.user?.team?.name, true)
    }
    else{
        return getTeamHex(theme, props.teamTheme, true)
    }
});

const getTireData = computed(() => {
    switch(props.tire_type){
        case 0:
            return {color: 'error', name: 'SOFT'};
        case 1:
            return {color: 'warning', name: 'MEDIUM'};
        case 2:
            return {color: 'white', name: 'HARD'};
        case 3:
            return {color: 'success', name: 'INTERMEDIATE'};
        case 4:
            return {color: 'williams-darken-1', name: 'WET'};
        default:
            return {color: 'white', name: '--'};
    }
});

</script>

<template>
    <Card class="h-100" :borderColor="props.teamTheme">
        <template #title>
            <div class="d-flex flew-row align-center justify-center">
                <span class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">
                    <v-chip
                        :color="getTireData.color"
                        variant="tonal"
                        size="small"
                        class="text-subtitle-1 text-secondary text-uppercase font-weight-bold flex-grow-0"
                    >
                        <template #prepend>
                            <v-icon
                                icon="mdi-tire"
                                start
                            ></v-icon>
                        </template> 
                        <template #default>
                            {{ getTireData.name }}
                        </template>
                    </v-chip>
                </span>
            </div>
        </template>

        <template #text>
            <v-container fluid class="h-100 d-flex flex-row ma-0 pa-0">

                <v-row no-gutters class="flex-grow-1" justify="center">
                    <v-col :cols="cols[0]">
                        <div class="d-flex flex-column justify-center align-center fill-height">
                            <div class ="flex-grow-1">   
                                <div class="text-caption text-secondary text-uppercase">Front Left</div>
                                <SemiCircularGauge
                                    class="w-100"
                                    :input="front_left_health"
                                    :uom="'%'"
                                    :size="gauges_size"
                                    :width="gauges_width"
                                    :uomInColumn="false"
                                />
                            </div>

                            <div class ="flex-grow-1">  
                                <div class="text-caption text-secondary text-uppercase flex-grow-1">Rear Left</div>
                                <SemiCircularGauge 
                                    class="w-100"
                                    :input="rear_left_health"
                                    :uom="'%'" 
                                    :size="gauges_size"
                                    :width="gauges_width"
                                    :uomInColumn="false"
                                />
                            </div>
                        </div>
                            
                    </v-col>

                    <v-col :cols="cols[1]">
                        <div>
                            <svg
                                :viewBox="carImage.viewBox"
                                class="w-50 h-50"
                            >
                                <path
                                    :d="carImage.path"
                                    ref="path"
                                    :fill="teamHex" 
                                />
                            </svg>
                        </div>
                    </v-col>

                    <v-col :cols="cols[2]">
                         <div class="d-flex flex-column justify-center align-center fill-height">
                            <div class ="flex-grow-1">  
                                <div class="text-caption text-secondary text-uppercase">Front Right</div>
                                <SemiCircularGauge 
                                    class="w-100"
                                    :input="front_right_health"
                                    :uom="'%'" 
                                    :size="gauges_size"
                                    :width="gauges_width"
                                    :uomInColumn="false"
                                />
                            </div>

                            <div class ="flex-grow-1">  
                                <div class="text-caption text-secondary text-uppercase">Rear Right</div>
                                <SemiCircularGauge 
                                    class="w-100"
                                    :input="rear_right_health"
                                    :uom="'%'" 
                                    :size="gauges_size"
                                    :width="gauges_width"
                                    :uomInColumn="false"
                                />
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </Card>
</template>