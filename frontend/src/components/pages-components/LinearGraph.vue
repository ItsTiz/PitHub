<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        name: { type: String, default: "name" },
        inputModel: { type: Array, default: () => [] },
        uom: { type: String, default: "" },
        icon: { type: String, default: "" },
        iconColor: { type: String, default: "text" },
        borderColor: { type: String, default:"black" },
        graphHeight: { type: Number, default: 50 },
        gradient: { type: Array, default: () => ["primary", "primary-darken-1"] },
        lineWidth: { type: Number, default: 3 },
        maxSecondsScale: { type: Number, default: 10 }
    });

    const avg = computed(() => {
        const sum = props.inputModel.reduce((acc, cur) => acc + cur, 0)
        const length = props.inputModel.length
        if (!sum && !length) return 0
        return Math.ceil(sum / length)
    })

    const latestTemp = computed(() => {
        if(props.inputModel.length === 0) return 0;
        return props.inputModel[props.inputModel.length - 1];
    });

</script>


<template>
    <v-card
        :class="`rounded-lg border-${props.borderColor} border-opacity-100`"
        :elevation="6"
        border="md"
    >
        <template #prepend>
            <v-icon
                :icon="icon"
                :color="iconColor"
                class="me-8"
                size="48"
            />
        </template>

        <template #title>
            <div class="text-caption font-weight-bold text-secondary text-uppercase">
                {{ name }}
            </div>
            <span
                class="text-h3 font-weight-black"
                v-text="latestTemp || '--'"
            />
            <strong v-if="avg">{{ uom }}</strong>
        </template>

        <template #text> 
            <v-sparkline
                :fill="true"
                :model-value="inputModel"
                :gradient="gradient"
                :line-width="lineWidth"
                :smooth="16"
                :height="graphHeight"
                v-bind="$attrs"
                stroke-linecap="round"
                class="text-caption"
            >
                <template #label="item">
                    -{{ props.maxSecondsScale-item.index }}s
                </template>
            </v-sparkline>
        </template>
    </v-card>
</template>