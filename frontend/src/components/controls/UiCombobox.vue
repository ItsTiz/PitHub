<script setup>

    defineProps({
        label:{ type: String, default: "Combobox" },
        model:{ type: Array, default: () => [] }
    })

    defineEmits(['modelChanged']);

</script>

<template>
    <v-combobox
        :label="label"
        :items="model"
        v-bind="$attrs" 
    />
</template>