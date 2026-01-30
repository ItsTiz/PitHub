<script setup>
import { useRaceStore } from '@/stores/race';
import { getTeamColor } from '../../../../composables/utils/teams-colors';
const raceStore = useRaceStore();
const { cars } = storeToRefs(raceStore);

const emits = defineEmits(['driverClicked']);

const getColor = (name) =>{
    return getTeamColor(name) + " md"
}

const loading = computed(() => {
    return !cars.value || cars.value.length == 0;
})

</script>

<template>
    <v-list class="pa-1 w-100 bg-transparent">
         <v-skeleton-loader
            v-if="loading"
            v-for="n in 22"
            type="list-item"
            max-height="30px"
        ></v-skeleton-loader>
        
        <TransitionGroup v-else name="flip-list" tag="ul">
            <v-list-item
                rounded="xl"
                lines="two" 
                v-for="(car, index) in cars"
                    :class="`${index % 2 == 0 ? 'bg-surface' : 'bg-background'} super-compact rounded-lg ma-1 elevation-2 border-opacity-75`"
                    :key="car._id" 
                    
                    @click="$emit('driverClicked', car._id)"
            >
                <template #prepend>
                    <div class="d-flex justify-space-around align-center">
                        <v-avatar 
                            :color="index === 0 ? 'warning' : 'grey-lighten-1'"
                            size="16"
                            class="font-weight-bold text-caption"
                        >
                            {{ index + 1 }}
                        </v-avatar>
                    </div>
                    <v-divider
                        class="mx-4"
                        :color="getColor(car.team.name)"
                        thickness="5"
                        vertical
                        opacity="1.0"
                        >
                    </v-divider>
                </template> 

                <v-list-item-title
                    class="font-weight-bold text-caption text-uppercase align-left"
                >
                    {{ `${car.driver.full_name.split(" ")[1].substr(0, 3)}` }}
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