<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import LinearGraph from '../../LinearGraph.vue'

const props = defineProps({
    name: { type: String, default: "" },
    uom: { type: String, default: "" },
    icon: { type: String, default: "" },
    below_level_threshold: { type: Number, default: 90 },
    normal_level_threshold: { type: Number, default: 150 },
    over_level_threshold: { type: Number, default: 185 },
    graph_height: { type: Number, default: 50 },
    temp_array: { type: Array, default: () => [] },
    maxSecondsScale: { type: Number, default: 10 },
    teamTheme: { type: String } 
});

const theme = useTheme();

const latestTemp = computed(() => {
    if(props.temp_array.length === 0) return 0;
    return props.temp_array[props.temp_array.length - 1];
});

const temperatureColor = computed(() => {
    if (latestTemp.value < props.below_level_threshold) return 'info'
    if (latestTemp.value < props.normal_level_threshold) return 'success'
    if (latestTemp.value < props.over_level_threshold) return 'warning'
    return 'primary'
})

const addAlpha = (color, opacity) => {
    if (!color || !color.startsWith('#')) return color;
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
}

const gradientColors = computed(() => {
    const currentColors = theme.current.value.colors;
    const colorName = temperatureColor.value;
    const baseHex = currentColors[colorName] || colorName;
    return [
        addAlpha(baseHex, 1),
        addAlpha(baseHex, 0.5),
        addAlpha(baseHex, 0.3),
        addAlpha(baseHex, 0.1)
    ];
});

</script>

<template>
    <LinearGraph
        :name="name"
        :input_model="temp_array"        
        :gradient="gradientColors" 
        :borderColor="props.teamTheme"
        :uom="uom"
        :icon="icon"
        :graph_height="graph_height"
        :maxSecondsScale="maxSecondsScale"
    />
</template>