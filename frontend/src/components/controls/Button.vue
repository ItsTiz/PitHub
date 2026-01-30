<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    icon: {
        type: String,
        default: ""
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    backgroundColor: {
        type: String,
        default: "primary"
    },
    textColor: {
        type: String,
        default: "on-background"
    },
    rounded: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(['clicked']);

</script>

<template>
    <v-btn
        :class="`bg-${backgroundColor} text-${textColor}`"
        :icon="icon"
        :width="width"
        :height="height"
        :text="title"
        @click="$emit('clicked')"
    >
    </v-btn>
</template>