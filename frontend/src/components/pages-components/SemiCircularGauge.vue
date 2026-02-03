<script setup>
    import { computed } from 'vue'
    import { useGaugeColor, usePercentage } from '../../composables/utils/use-percentage-color';

    const props = defineProps({
        input: { type: Number, default: 0 },
        uom: { type: String, default: "" },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100 },
        size: { type: Number, default: 250 },
        width: { type: Number, default: 15 }
    });

    const percentage = usePercentage(() => props.min, () => props.max, () => props.input);
    const color = useGaugeColor(percentage);
    const gaugeValue = computed(() => { return percentage.value / 2})
</script>

<template>
    <div class="semicircle-container">
        <v-progress-circular
            :size="size"
            :width="width"
            :rotate="-90"
            :model-value="gaugeValue"
            :color="input != 0 ? color : 'gray'"
            bg-color="secondary"
        >
            <div class="inner-text-column">
                <div class="gauge-label">
                    {{ input != 0 ? input : '--' }}
                </div>
                <strong class="uom-label"> {{ uom }} </strong>
            </div>
        </v-progress-circular>
    </div>
</template>

<style scoped>
.semicircle-container {
    width: v-bind('props.size + "px"');
    height: v-bind('(props.size / 2) + "px"');
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.inner-text-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-50%); 
}

.gauge-label {
    font-size: v-bind('(props.size * 0.15) + "px"');
    font-weight: bold;
    line-height: 1;
}

.uom-label {
    font-size: v-bind('(props.size * 0.06) + "px"');
    color: rgb(var(--v-theme-secondary));
    text-transform: uppercase;
    margin-top: 4px;
}
</style>