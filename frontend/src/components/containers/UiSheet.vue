<script setup>

    defineProps({
        elevation: {
            type: Number,
            default: 24
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
        },
        sheetClasses: {
            type: String,
            default: ""
        }
    });

</script>

<template>
    <v-sheet
        :class="sheetClasses? sheetClasses : 'd-flex align-center justify-center flex-wrap text-center'"
        :elevation="elevation"
        :rounded="roundedRadius"
        :color="backgroundColor"
        border="secondary sm"
    >
        <slot />
    </v-sheet>
</template>
