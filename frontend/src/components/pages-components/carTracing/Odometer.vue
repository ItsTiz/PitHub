<script setup>
const props = defineProps({
    speed: {
        type: Number,
        default: 25
    }
});
const min = ref(0)
const max = ref(340)

const percentage = computed(()=> {
    if (max.value === min.value) return 0 
    const percent = (((props.speed - min.value) / (max.value - min.value)) * 100).toFixed(1);
    return Math.min(Math.max(percent, 0), 100)
})

const gaugeValue = computed(() => {
    return percentage.value / 2
})

const color = computed(() => {
    if (percentage.value < 50) return 'info'
    if (percentage.value < 75) return 'success'
    if (percentage.value < 95) return 'orange'
    return 'primary'
  })
</script>

<template>
    <div class="d-flex flex-column align-center justify-space-around w-100 h-100">
        <Card>
            <template #title>
                <div class="text-title font-weight-bold">Speed (KMH)</div>
            </template>

            <template #text>
                <div class="semicircle-container">

                    <v-progress-circular
                        :size="250"
                        :width="15"
                        :rotate="-90"
                        :model-value="gaugeValue"
                        :color="color"
                        bg-color="secondary"
                    >
                        <div class="gauge-label"> {{ speed }} km/h</div>
                    </v-progress-circular>
                </div>
            </template>
            
            <!-- temporary -->
            <!-- <template #actions>
                <div>
                    <v-slider
                        v-model="speed"
                        :color="color"
                        :step="1"
                        :max="max"
                        :min="min"
                        width="500"
                        track-color="white"
                    ></v-slider>
                </div>
            </template> -->
        </Card>

        <Card>
            <template #title>
                <div class="text-title font-weight-bold">RPM (RPM)</div>
            </template>
            <template #text>
                <div class="semicircle-container">
                    <v-progress-circular
                        :size="250"
                        :width="15"
                        :rotate="-90"
                        :model-value="gaugeValue"
                        :color="color"
                        bg-color="secondary"
                    >
                        
                        <div class="gauge-label"> {{ percentage }} % </div>
                    </v-progress-circular>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.semicircle-container {
    width: 250px;
    height: 125px;

    /* Hide the bottom half of the circle */
    overflow: hidden;
}

.gauge-label {
    margin-top: -20px;
    font-weight: bold;
    font-size: 24px;
}
</style>