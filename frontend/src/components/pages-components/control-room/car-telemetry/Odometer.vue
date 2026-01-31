<script setup>
const props = defineProps({
    speed: {
        type: Number,
        default: 0
    },
    rpms: {
        type: Number,
        default: 0
    },
});
</script>

<template>
    <div class="d-flex flex-row align-center justify-space-around w-100 h-100">
        <Card class="h-100">
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">RPMs</div>
            </template>
            <template #text>
                <SemiCircularGauge
                    class="w-100"
                    :input="rpms"
                    :uom="'rpms'"
                    :size="200"
                    :min="3000"
                    :max="15000"
                />
            </template>
        </Card>

        <Card class="h-100">
            <template #title>
                <div class="text-subtitle-1 text-secondary text-uppercase font-weight-bold">Speed</div>
            </template>

            <template #text>
               <SemiCircularGauge
                    class="w-100"
                    :input="speed"
                    :uom="'km/h'"
                    :size="200"
                    :min="0"
                    :max="378"
                />
            </template>
        </Card>

    </div>
</template>