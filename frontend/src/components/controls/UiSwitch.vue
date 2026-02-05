<script setup>
    import { ref } from 'vue'

    const model = ref(true);

    defineProps({
        label:{ type: String, default: "" },
        trueIcon:{ type: String, default: "" },
        color:{ type: String, default: "" },
        falseIcon:{ type: String, default: "" }
    })

    defineEmits(['modelChanged']);

</script>

<template>
    <v-switch
        v-model="model"
        :label="label"
        :true-icon="trueIcon"
        :false-icon="falseIcon"
        :color="color"
        hide-details
        inset
        v-bind="$attrs" 
        @update:model-value="$emit('modelChanged')"
    />
</template>