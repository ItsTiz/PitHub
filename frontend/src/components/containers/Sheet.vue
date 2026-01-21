<script setup>

const props = defineProps({
    elevation: {
        type: String,
        default: "10"
    },
    backgroundColor: {
        type: String,
        default: "surface"
    },
    textColor: {
        type: String,
        default: "on-surface"
    },
    roundedRadius: {
        type: String,
        default: "lg"
    }
});

</script>

<template>
    <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center"
        :elevation="elevation"
        :rounded="roundedRadius"
        color="backgroundColor"
        border="secondary md"
    >
        <slot></slot>
    </v-sheet>
</template>
