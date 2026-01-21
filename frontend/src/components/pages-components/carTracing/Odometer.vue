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
    <div class="d-flex flex-column align-center justify-space-around w-100 h-100">
        <Card>
            <template #title>
                <div class="text-title font-weight-bold">Speed</div>
            </template>

            <template #text>
               <SemiCircularGauge
                    :input="speed"
                    :uom="'km/h'"
                    :min="0"
                    :max="378"
                />
            </template>
        </Card>

        <Card>
            <template #title>
                <div class="text-title font-weight-bold">RPMs</div>
            </template>
            <template #text>
                <SemiCircularGauge
                    :input="rpms"
                    :uom="'rpms'"
                    :min="3000"
                    :max="15000"
                />
            </template>
        </Card>
    </div>
</template>