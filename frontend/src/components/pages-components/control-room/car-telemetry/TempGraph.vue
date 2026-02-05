<script setup>
    import { computed } from 'vue'
    import { useTheme } from 'vuetify'
    import LinearGraph from '../../LinearGraph.vue'

    const props = defineProps({
        name: { type: String, default: "" },
        tempsArray: { type: Array, default: () => [] },
        teamTheme: { type: String, default: "secondary" } ,
        icon: { type: String, default: "" },
        uom: { type: String, default: "" },
        belowLevelThreshold: { type: Number, default: 90 },
        normalLevelThreshold: { type: Number, default: 150 },
        overLevelThreshold: { type: Number, default: 185 },
        graphHeight: { type: Number, default: 50 },
        maxSecondsScale: { type: Number, default: 10 },
    });

    const theme = useTheme();

    const latestTemp = computed(() => {
        if(props.tempsArray.length === 0) return 0;
        return props.tempsArray[props.tempsArray.length - 1];
    });

    const temperatureColor = computed(() => {
        if (latestTemp.value < props.belowLevelThreshold) return 'info'
        if (latestTemp.value < props.normalLevelThreshold) return 'success'
        if (latestTemp.value < props.overLevelThreshold) return 'warning'
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
        :input-model="tempsArray"        
        :gradient="gradientColors" 
        :border-color="teamTheme"
        :uom="uom"
        :icon="icon"
        :graph-height="graphHeight"
        :max-seconds-scale="maxSecondsScale"
    />
</template>