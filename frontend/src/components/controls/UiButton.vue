<script setup>
    defineProps({
        title: { type: String, default: "" },
        icon: { type: String, default: "" },
        iconOnly: { type: Boolean, default: false },
        backgroundColor: { type: String, default: "primary" },
        textColor: { type: String, default: undefined },
    });

    defineEmits(['clicked']);
</script>

<template>
    <v-btn
        :color="backgroundColor"
        :class="textColor ? `text-${textColor}` : ''"
        :icon="iconOnly"
        :prepend-icon="!iconOnly ? icon : undefined"
        v-bind="$attrs" 
        @click="$emit('clicked')"
    >
        <v-icon
            v-if="iconOnly"
            :icon="icon"
        />
        
        <span v-else>{{ title }}</span>
    </v-btn>
</template>