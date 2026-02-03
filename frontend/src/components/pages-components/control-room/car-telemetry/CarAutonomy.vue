<script setup>
    import LinearGauge from '../../LinearGauge.vue';

    const props = defineProps({
        fuel: { type: Number, default: 0 },
        esrPercentage: { type: Number, default: 0 },
        teamTheme: { type: String, default: "secondary"}
    });
</script>


<template>
    <div class="d-flex flex-row align-center w-100">
        <UiCard
            class="h-100"
            :border-color="props.teamTheme"
        >
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">
                    Fuel
                </div>
            </template>
            <template #text>
                <LinearGauge
                    :input="fuel"
                    :uom="'%'"
                />
            </template>
        </UiCard>

        <UiCard
            class="h-100"
            :border-color="props.teamTheme"
        >
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">
                    ESR
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