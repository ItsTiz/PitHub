<script setup>
import { ref } from 'vue'

const props = defineProps({
    label:{ type: String, default: "Combobox" },
    model:{ type: Array, default: [] }
})

const emits = defineEmits(['modelChanged']);

</script>

<template>
     <v-combobox
        :label="props.label"
        :items="props.model"
     ></v-combobox>
</template>