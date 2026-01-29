<script setup>

const title = ref("PitHub F1");

</script>

<template>

    <v-app-bar
        :elevation = "2"
        height = "45"
    > 
        <v-toolbar-title> {{ title }}</v-toolbar-title>

    </v-app-bar>
</template>