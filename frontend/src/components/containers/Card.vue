<script setup>
const props = defineProps({
    elevation: { type: Number, default: 3 },
    backgroundColor: { type: String, default: "surface" },
    textColor: { type: String, default: "on-surface" }
});
</script>

<template>
    <v-container class="h-100">
        <v-card
            :elevation="elevation" 
            :color="backgroundColor" 
            :theme="textColor"
            class="fill-height rounded-lg d-flex flex-column align-center justify-space-around"
            border="opacity-50 sm"
        >
            <v-card-title class="flex-grow-1" v-if="$slots.title">
                <slot name="title"></slot>
            </v-card-title>

            <v-card-text class="flex-grow-1">
                <slot name="text"></slot>
            </v-card-text>

            <v-card-actions class="flex-grow-1" v-if="$slots.actions">
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-container>
</template>