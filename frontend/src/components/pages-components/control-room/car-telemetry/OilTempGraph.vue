<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import LinearGraph from '../../LinearGraph.vue'

const props = defineProps({
    oil_temp_array: { type: Array, default: () => [] },
    teamTheme: { type: String } 
});

const theme = useTheme();

const latestTemp = computed(() => {
    if(props.oil_temp_array.length === 0) return 0;
    return props.oil_temp_array[props.oil_temp_array.length - 1];
});

const temperatureColor = computed(() => {
    if (latestTemp.value < 90) return 'info'
    if (latestTemp.value < 150) return 'success'
    if (latestTemp.value < 185) return 'warning'
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
        :name="'Oil Temperature'"
        :input_model="oil_temp_array"        
        :gradient="gradientColors" 
        :borderColor="props.teamTheme"
        :uom="'C°'"
        :icon="'mdi-oil-temperature'"
    />
</template>