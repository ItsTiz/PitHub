<script setup>
import { useRaceStore } from '@/stores/race';

const raceStore = useRaceStore();
const { cars } = storeToRefs(raceStore);
</script>

<template>
    <v-list class="bg-transparent pa-4 w-100">
    <TransitionGroup name="flip-list" tag="ul">
        
        <v-list-item
            class="mb-2 rounded-lg elevation-2"
            v-for="(car, index) in cars"
            :key="car._id" 
            :class="{ 'leader': index === 0 }"
        >
            <template #prepend>
                <v-avatar color="grey-lighten-2" size="32" class="font-weight-bold">
                    {{ index + 1 }}
                </v-avatar>
            </template>

            <v-list-item-title class="font-weight-bold">
                {{ `${car.model}` }}
            </v-list-item-title>

            <template #append>
                <div class="text-caption">
                    Lap {{ car.lapCount || 0 }}
                </div>
            </template>
        </v-list-item>
        
    </TransitionGroup>
    </v-list>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s ease;
}

/* leader */
.leader {
  border: 2px solid gold;
}
</style>