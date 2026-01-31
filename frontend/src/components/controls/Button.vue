<script setup>
const props = defineProps({
    title: { type: String, default: "" },
    icon: { type: String, default: "" },
    iconOnly: { type: Boolean, default: false },
    backgroundColor: { type: String, default: "primary" },
    textColor: { type: String, default: undefined },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
});

const emits = defineEmits(['clicked']);
</script>

<template>
    <v-btn
        :color="backgroundColor"
        :class="textColor ? `text-${textColor}` : ''"
        :icon="iconOnly"
        :prepend-icon="!iconOnly ? icon : undefined"
        :width="width"
        :height="height"
        v-bind="$attrs" 
        @click="$emit('clicked')"
    >
        <v-icon v-if="iconOnly" :icon="icon"></v-icon>
        
        <span v-else>{{ title }}</span>
        
    </v-btn>
</template>