<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: { type: String, default: "name" },
    input_model: { type: Array, default: [] },
    uom: { type: String, default: "" },
    icon: { type: String, default: "" },
    icon_color: { type: String, default: "text" },
    graph_height: { type: Number, default: 50 },
    borderColor: { type: String },
    gradient: { type: Array, default: ["primary", "primary-darken-1"] },
    line_width: { type: Number, default: 3 },
    maxSecondsScale: { type: Number, default: 10 }
});

const avg = computed(() => {
    const sum = props.input_model.reduce((acc, cur) => acc + cur, 0)
    const length = props.input_model.length
    if (!sum && !length) return 0
    return Math.ceil(sum / length)
})

const latestTemp = computed(() => {
    if(props.input_model.length === 0) return 0;
    return props.input_model[props.input_model.length - 1];
});

</script>


<template>
    <v-card
        :class="`rounded-lg border-${props.borderColor} border-opacity-100`"
        :elevation="6"
        border="md"
    >
        <template #prepend>
            <v-icon
                :icon="icon"
                :color="icon_color"
                class="me-8"
                size="48"
            >
            </v-icon>
        </template>

        <template #title>
            <div class="text-caption text-secondary text-uppercase"> {{ name }} </div>
            <span class="text-h3 font-weight-black" v-text="latestTemp || '--'"></span>
            <strong v-if="avg">{{ uom }}</strong>
        </template>

        <template #text> 
            <v-sparkline
                :fill="true"
                :model-value="input_model"
                :gradient="gradient"
                :line-width="line_width"
                :smooth="16"
                :height="graph_height"
                v-bind="$attrs"
                stroke-linecap="round"
            >
                <template #label="item"> -{{ props.maxSecondsScale-item.index }}s </template>
            </v-sparkline>
        </template>
        
    </v-card>
</template>