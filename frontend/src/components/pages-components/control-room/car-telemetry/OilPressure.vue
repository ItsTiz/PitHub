<script setup>
    import LinearGauge from '../../LinearGauge.vue';

    defineProps({
        oilPressure: { type: Number, default: 0 },
        teamTheme: { type: String, default: "secondary"}
    });
</script>


<template>
    <UiCard 
        class="h-100"
        :border-color="teamTheme"
    >
        <template #title>
            <div class="d-flex flew-row align-center justify-center">
                <span class="ml-2">
                    <v-icon
                        icon="mdi-oil"
                        size="32"
                    />
                </span>
                <span class="ml-2  text-secondary text-uppercase font-weight-bold">
                    Oil pressure
                </span>
            </div>
        </template>
        <template #text>
            <LinearGauge
                :input="oilPressure"
                :uom="'bar'"
                :min="3"
                :max="8"
                :thickness="10"
            />
        </template>
    </UiCard>
</template>