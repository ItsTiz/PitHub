<script setup>
import { useRaceStore } from '@/stores/race';
import { getTeamColor } from '../../../../composables/utils/teams-colors';
const raceStore = useRaceStore();
const { cars } = storeToRefs(raceStore);

const emits = defineEmits(['driverClicked']);

const getColor = (name) =>{
    return getTeamColor(name) + " md"
}

</script>

<template>
    <v-list class="pa-1 w-100 bg-transparent">
    <TransitionGroup name="flip-list" tag="ul">
        
        <v-list-item
            class="super-compact rounded-lg ma-1 elevation-2 border-opacity-75"
            rounded="xl"
            lines="two" 
            v-for="(car, index) in cars"
            :key="car._id" 
            :border="getColor(car.team.name)"
            @click="$emit('driverClicked', car._id)"
            
        >
            <template #prepend>
                <v-avatar 
                    :color="index === 0 ? 'warning' : 'grey-lighten-1'"
                    size="16"
                    class="font-weight-bold text-caption"
                >
                    {{ index + 1 }}
                </v-avatar>
            </template> 

            <v-list-item-title
                class="font-weight-bold text-caption"
            >
                {{ `${car.driver.full_name}` }}
            </v-list-item-title>

            <template #append>
                <div class="text-caption">
                    lap: {{ car.lapCount || 0 }}
                </div>
            </template>
        </v-list-item>
        
    </TransitionGroup>
    </v-list>
</template>

<style scoped>

.super-compact {
  min-height: 25px !important; 
  padding: 2px 4px !important; 
}

.flip-list-move {
  transition: transform 0.5s ease;
}
</style>