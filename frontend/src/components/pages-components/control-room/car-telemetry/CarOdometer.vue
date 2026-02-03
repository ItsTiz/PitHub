<script setup>
    defineProps({
        speed: {
            type: Number,
            default: 0
        },
        rpms: {
            type: Number,
            default: 0
        },
        teamTheme: {
            type: String,
            default: ""
        },
    });
</script>

<template>
    <div class="d-flex flex-row align-center justify-space-around w-100 h-100">
        <UiCard
            class="h-100"
            :border-color="teamTheme"
            :textClasses="'flex-grow-1'"
        >
            <template #title>
                <div class="d-flex flew-row align-center justify-center">
                    <span class="ml-2">
                        <v-icon
                        icon="mdi-speedometer-slow"
                        size="25"
                        >
                    </v-icon>
                    </span>
                    <span class="ml-2 text-subtitle-1 text-secondary text-uppercase font-weight-bold">RPMS</span>
                </div>
            </template>
            <template #text>
                <div class="d-flex align-center justify-center">
                    <SemiCircularGauge
                        class="w-100"
                        :input="rpms"
                        :uom="'rpms'"
                        :size="350"
                        :width="35"
                        :min="3000"
                        :max="15000"
                    />
                </div>
            </template>
        </UiCard>

        <UiCard
            class="h-100"
            :border-color="teamTheme"
            :textClasses="'flex-grow-1'"
        >
            <template #title>
                <div class="d-flex flew-row align-center justify-center">
                    <span class="ml-2">
                        <v-icon
                        icon="mdi-speedometer"
                        size="25"
                        >
                    </v-icon>
                    </span>
                    <span class="ml-2 text-subtitle-1 text-secondary text-uppercase font-weight-bold">Speed</span>
                </div>
            </template>
            <template #text>
                <SemiCircularGauge
                    class="w-100"
                    :input="speed"
                    :uom="'km/h'"
                    :size="350"
                    :width="35"
                    :min="0"
                    :max="378"
                />
            </template>
        </UiCard>
    </div>
</template>