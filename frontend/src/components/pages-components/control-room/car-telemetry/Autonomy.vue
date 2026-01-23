<script setup>
import LinearGauge from '../../LinearGauge.vue';

const props = defineProps({
    fuel: { type: Number, default: 0 },
    esr_percentage: { type: Number, default: 0 }
});
</script>


<template>
    <div class="d-flex flex-row align-center w-100">
        <Card>
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">Fuel</div>
            </template>
            <template #text>
                <LinearGauge
                    :input="fuel"
                    :uom="'%'"
                />
            </template>
        </Card>

        <Card>
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