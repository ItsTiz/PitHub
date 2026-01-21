<script setup>

const props = defineProps({
    title: {
        type: String,
        default: "button"
    },
    icon: {
        type: String,
        default: ""
    },
    width: {
        type: Number,
        default: 150
    },
    height: {
        type: Number,
        default: 35
    },
    backgroundColor: {
        type: String,
        default: "primary"
    },
    textColor: {
        type: String,
        default: "on-background"
    }
});
const emits = defineEmits(['clicked']);

</script>

<template>
    <v-btn
        :class="`bg-${backgroundColor} text-${textColor}`"
        rounded
        :prepend-icon="icon"
        :width="width"
        :height="height"
        @click="$emit('clicked')"
    >
        {{ title }}
    </v-btn>
</template>