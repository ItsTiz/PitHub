<script setup>
import LinearGauge from '../../LinearGauge.vue';

const props = defineProps({
    oil_pressure: { type: Number, default: 0 },
    teamTheme: { type: String}
});
</script>


<template>
    <Card 
        class="h-100"
        :borderColor="props.teamTheme"
        :titleClasses="'bg-background pa-0'"
    >
        <template #title>
            <div class="d-flex flew-row align-center justify-start">
                <span class="ml-4">
                    <v-icon
                       icon="mdi-oil"
                       size="32"
                    >
                   </v-icon>
                </span>
                <span class="ml-4 text-subtitle-1 text-secondary text-uppercase font-weight-bold">Oil pressure</span>
            </div>
        </template>
        <template #text>
            <LinearGauge
                :input="oil_pressure"
                :uom="'bar'"
                :min="3"
                :max="8"
                :thickness="10"
            />
        </template>
    </Card>
</template>