<script setup>
import { computed } from 'vue'
import { getTeamColor } from '../../../../composables/utils/teams-colors.js'

const props = defineProps({
    driverName: { type: String, required: true },
    teamName: { type: String, required: true },
    imgSrc: { type: String },
    driverNumber: { type: [String, Number], default: '' }
});

const getImageUrl = (path) => {
  return new URL(`../../../../assets/cars/${path}`, import.meta.url).href
}

const teamColor = computed(() => getTeamColor(props.teamName));
const imagePath = computed(() => {
    const ret = getImageUrl(props.imgSrc)
    return ret
});
</script>

<template>
    <Card 
        :elevation="5"
    >
        <template #title>
            <div class="d-flex flex-column bg-background pa-0 ma-0">
                <div class="d-flex justify-space-between align-center mb-1">
                    <span class="text-h6 font-weight-bold">{{ driverName }}</span>
                    
                    <span 
                        class="text-h4 font-weight-black font-italic opacity-60" 
                        :class="`text-${teamColor}`" 
                    >
                        {{ driverNumber }}
                    </span>
                </div>

                <div>
                    <v-chip 
                        :color="teamColor" 
                        variant="flat" 
                        size="small" 
                        class="font-weight-bold text-uppercase"
                    >
                        {{ teamName }}
                    </v-chip>
                </div>
            </div>
        </template>

        <template #text>
            <div class="d-flex fill-height align-center justify-center pt-2">
                <v-img
                    :src="imagePath"
                    alt="Car Image"
                    cover
                    class="rounded-lg w-100"
                >
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular indeterminate color="grey-lighten-4" />
                        </div>
                    </template>
                </v-img>
            </div>
        </template>
    </Card>
</template>