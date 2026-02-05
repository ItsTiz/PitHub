<script setup>
    defineProps({
        elevation: { type: Number, default: 6 },
        backgroundColor: { type: String, default: "surface" },
        textColor: { type: String, default: "on-surface" },
        borderColor: { type: String, default: "" },
        titleClasses: { type: String, default: "" },
        textClasses: { type: String, default: "" }
    });
</script>

<template>
    <v-container>
        <v-card
            :elevation="elevation" 
            :color="backgroundColor" 
            :theme="textColor"
            :class="`fill-height rounded-lg d-flex flex-column justify-space-around border-${borderColor} ${borderColor ? 'border-opacity-100 ': 'border-opacity-20'}`"
            :border="borderColor ? 'md' : 'sm'"
        >
            <v-card-title
                v-if="$slots.title"
                :class="titleClasses ? titleClasses : `flex-grow-1`"
            >
                <slot name="title" />
            </v-card-title>

            <v-card-text
                :class="textClasses ? textClasses : `flex-grow-1`"
            >
                <slot name="text" />
            </v-card-text>

            <v-card-actions
                v-if="$slots.actions"
                class="flex-grow-1"
            >
                <slot name="actions" />
            </v-card-actions>
        </v-card>
    </v-container>
</template>