<script setup>
const props = defineProps({
    input: {
        type: Number,
        default: 0
    },
    uom: {
        type: String,
        default: ""
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    }
});

const percentage = computed(()=> {
    if (props.max === props.min) return 0; 
    const percent = (((props.input - props.min) / (props.max - props.min)) * 100).toFixed(1);
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
    <div class="semicircle-container">
        <v-progress-circular
            :size="250"
            :width="15"
            :rotate="-90"
            :model-value="gaugeValue"
            :color="color"
            bg-color="secondary"
        >
            <div class="gauge-label"> {{ input }} {{ uom }}</div>
        </v-progress-circular>
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