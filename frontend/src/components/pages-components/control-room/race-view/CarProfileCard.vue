<script setup>
import { computed } from 'vue'
import { getTeamColor } from '../../../../composables/utils/teams-colors.js'

const props = defineProps({
    driverName: { type: String, required: true },
    teamName: { type: String, required: true },
    imgSrc: { type: String },
    currentSpeed : { type: Number, default: 0 },
    maxSpeed: { type: [Number, String], default: '-' },
    driverNumber: { type: [String, Number], default: '' },
    engineManufacturer: { type: String, default: 'Unknown' },
    acceleration: { type: [Number, String], default: '-' },
    reliability: { type: Number, default: 0 },
    downforce: { type: Number, default: 0 }
});

const getImageUrl = (path) => {
  return new URL(`../../../../assets/cars/${path}`, import.meta.url).href
}

const teamColor = computed(() => getTeamColor(props.teamName));
const teamColorDarkened = computed(() => getTeamColor(props.teamName, true));
const imagePath = computed(() => {
    const ret = getImageUrl(props.imgSrc)
    return ret
});
</script>

<template>
    <Card
        :elevation="5"
        :titleClasses="'pa-0'" 
    >
        <template #title>
            <div 
                class="d-flex flex-column pl-5 pr-5 pt-2 pb-2"
                :class="`bg-${teamColor}`"
            >
                <div class="d-flex justify-space-between align-center mb-1">
                    <span
                        class="text-h6 font-weight-bold"
                    >
                        {{ driverName }}
                    </span>
                    <span 
                        :class="`text-black`" 
                        class="text-h4 font-weight-bold font-italic driver-number" 
                    >
                        {{ driverNumber }}
                    </span>
                </div>
                <div class="d-flex align-center pa-0">
                    <span 
                        color="on-surface" 
                        variant="text" 
                        size="small" 
                        class="font-weight-light text-uppercase text-caption"
                    >
                        {{ teamName }}
                    </span>
                </div>
            </div>
        </template>

        <template #text>
            <div class="d-flex flex-column fill-height">
                
                <div class="d-flex justify-center pt-4 mb-4">
                    <v-img
                        :src="imagePath"
                        alt="Car Image"
                        max-height="160"
                        width="100%"
                        cover
                        class="rounded-lg"
                    >
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular indeterminate color="grey-lighten-4" />
                            </div>
                        </template>
                    </v-img>
                </div>

                <v-divider class="mb-3"></v-divider>
                
                <v-row dense>
                    <v-col cols="6">
                        <div class="text-caption text-medium-emphasis">Current Speed</div>
                        <div class="font-weight-bold text-body-2">
                            <v-icon icon="mdi-speedometer" size="x-small" class="mr-1"></v-icon>
                            {{ currentSpeed }} km/h
                        </div>
                    </v-col>

                    <v-col cols="6">
                        <div class="text-caption text-medium-emphasis">Top Speed</div>
                        <div class="font-weight-bold text-body-2">
                            <v-icon icon="mdi-car-speed-limiter" size="x-small" class="mr-1"></v-icon>
                            {{ maxSpeed }} km/h
                        </div>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="6" class="mt-2">
                        <div class="text-caption text-medium-emphasis">Engine</div>
                        <div class="font-weight-bold text-body-2">
                            <v-icon icon="mdi-engine" size="x-small" class="mr-1"></v-icon>
                            {{ engineManufacturer }}
                        </div>
                    </v-col>

                     <v-col cols="6" class="mt-2">
                        <div class="text-caption text-medium-emphasis">Reliability</div>
                        <div class="font-weight-bold text-body-2 mt-2">
                            <v-progress-linear 
                                :model-value="reliability" 
                                color="success" 
                                height="6" 
                                rounded 
                                class=""
                            ></v-progress-linear>
                        </div>
                    </v-col>

                    
                </v-row>

                <v-row dense>
                    <v-col cols="6" class="mt-2">
                        <div class="text-caption text-medium-emphasis">0-100 km/h</div>
                        <div class="font-weight-bold text-body-2">
                            <v-icon icon="mdi-timer-outline" size="x-small" class="mr-1"></v-icon>
                            {{ acceleration }} s
                        </div>
                    </v-col>

                    <v-col cols="6" class="mt-2">
                        <div class="text-caption text-medium-emphasis">Downforce rating</div>
                        <div class="font-weight-bold text-body-2 mt-2">
                            <v-progress-linear 
                                :model-value="downforce" 
                                color="success" 
                                height="6" 
                                rounded 
                                class=""
                            ></v-progress-linear>
                        </div>
                    </v-col>
                </v-row>

            </div>
        </template>
    </Card>
</template>

<style scoped>
.driver-number {
  text-shadow: 
    -1px -1px 0 #ffffff,  
     1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
     1px  1px 0 #ffffff;
}
</style>