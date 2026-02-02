<script setup>
import LinearGauge from '../../LinearGauge.vue';

const props = defineProps({
    fuel: { type: Number, default: 0 },
    esr_percentage: { type: Number, default: 0 },
    teamTheme: { type: String}
});
</script>


<template>
    <div class="d-flex flex-row align-center w-100">
        <Card class="h-100" :borderColor="props.teamTheme" :titleClasses="'bg-background pa-0'">
            <template #title>
            <div class="d-flex flew-row align-center justify-start">
                <span class="ml-4">
                    <v-icon
                       icon="mdi-gas-station"
                       size="25"
                    >
                   </v-icon>
                </span>
                <span class="ml-4 text-subtitle-1 text-secondary text-uppercase font-weight-bold">Fuel</span>
            </div>
        </template>
            <template #text>
                <LinearGauge
                    :input="fuel"
                    :uom="'%'"
                    :max="110"
                />
            </template>
        </Card>

        <Card class="h-100" :borderColor="props.teamTheme">
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">ESR</div>
            </template>

            <template #text>
                <LinearGauge
                    :input="esr_percentage"
                    :uom="'%'"
                />
            </template>
        </Card>

    </div>
</template>