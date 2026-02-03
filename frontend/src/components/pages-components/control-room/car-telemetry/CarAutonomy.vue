<script setup>
import LinearGauge from '../../LinearGauge.vue';

const props = defineProps({
    fuel: { type: Number, default: 0 },
    esrPercentage: { type: Number, default: 0 },
    teamTheme: { type: String}
});
</script>


<template>
    <div class="d-flex flex-column align-center w-100">
        <UiCard class="h-100" :borderColor="props.teamTheme">
            <template #title>
            <div class="d-flex flew-row align-center justify-center">
                <span class="ml-2">
                    <v-icon
                       icon="mdi-gas-station"
                       size="25"
                    >
                   </v-icon>
                </span>
                <span class="ml-2 text-subtitle-1 text-secondary text-uppercase font-weight-bold">Fuel</span>
            </div>
        </template>
            <template #text>
                <LinearGauge
                    :input="fuel"
                    :uom="'%'"
                    :max="110"
                />
            </template>
        </UiCard>

        <UiCard class="h-100" :borderColor="props.teamTheme">
            <template #title>
            <div class="d-flex flew-row align-center justify-center">
                <span class="ml-2">
                    <v-icon
                       icon="mdi-battery-charging-medium"
                       size="25"
                    >
                   </v-icon>
                </span>
                <span class="ml-2 text-subtitle-1 text-secondary text-uppercase font-weight-bold">ESR</span>
            </div>
        </template>

            <template #text>
                <LinearGauge
                    :input="esrPercentage"
                    :uom="'%'"
                />
            </template>
        </UiCard>

    </div>
</template>