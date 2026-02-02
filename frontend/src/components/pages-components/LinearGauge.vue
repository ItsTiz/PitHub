<script setup>
import { useGaugeColor, usePercentage } from '../../composables/utils/use-percentage-color';
const props = defineProps({
    input: { type: Number, default: 0 },
    uom: { type: String, default: "" },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    size: { type: Number, default: 100 },
    thickness: { type: Number, default: 20 }
});

const percentage = usePercentage(() => props.min, () => props.max, () => props.input);
const color = useGaugeColor(percentage);

</script>

<template>
    <div class="d-flex flex-column justify-space-between w-100 h-100">
        <div>
            <span class="text-h4 font-weight-black" v-text="input || '--'"></span>
            <strong v-if="input">{{ uom }}</strong>
        </div>
        <v-progress-linear
            :model-value="percentage"
            bg-color="border-color"
            chunk-count="25"
            chunk-gap="3"
            :color="color"
            :height="thickness"
            rounded="sm"
        >
    </v-progress-linear>
    </div>
</template>