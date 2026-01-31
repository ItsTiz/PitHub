<script setup>
import { ref } from 'vue'

const model = ref(true);

const props = defineProps({
    label:{ type: String, default: "" },
    true_icon:{ type: String, default: "" },
    false_icon:{ type: String, default: "" }
})

const emits = defineEmits(['modelChanged']);

</script>

<template>
    <v-switch
        v-model="model"
        :label="label"
        :true-icon="true_icon"
        :false-icon="false_icon"
        hide-details
        inset
        @update:model-value="$emit('modelChanged')"
    >
    </v-switch>
</template>