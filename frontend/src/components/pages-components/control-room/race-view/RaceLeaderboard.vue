<script setup>
    import { useRaceStore } from '@/stores/race';
    import { getTeamColor } from '../../../../composables/utils/teams-colors';
    import { storeToRefs } from "pinia";
    import { computed } from 'vue';
    const raceStore = useRaceStore();
    const { cars } = storeToRefs(raceStore);

    defineEmits(['driverClicked']);

    const getColor = (name) =>{
        return getTeamColor(name) + " md"
    }

    const loading = computed(() => {
        return !cars.value || cars.value.length == 0;
    })

</script>

<template>
    <v-list class="pa-1 w-100 bg-transparent">
        <TransitionGroup v-if="loading">
            <v-skeleton-loader
                v-for="n in 22"
                
                :key="n"
                type="list-item"
                max-height="30px"
            />
        </TransitionGroup>
        
        <TransitionGroup
            v-else
            name="flip-list"
            tag="ul"
        >
            <v-list-item
                v-for="(car, index) in cars"
                :key="car._id" 
                rounded="xl"
                lines="two"
                :class="`${index % 2 == 0 ? 'bg-surface' : 'bg-background'} super-compact rounded-lg ma-1 elevation-2 border-opacity-75`" 
                    
                @click="$emit('driverClicked', car._id)"
            >
                <template #prepend>
                    <div class="d-flex justify-space-around align-center">
                        <v-avatar 
                            :color="index === 0 ? 'warning' : 'grey-lighten-1'"
                            size="25"
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
                    />
                </template> 

                <v-list-item-title
                    class="text-caption font-weight-bold text-uppercase"
                >
                    {{ `${car.driver.full_name.split(" ")[1].substr(0, 3)}` }}
                </v-list-item-title>

                <template #append>
                    <div class="mr-2">
                        lap: {{ car.lapCount || 0 }}
                    </div>
                </template>
            </v-list-item>
        </TransitionGroup>
    </v-list>
</template>

<style scoped>

.super-compact {
  min-height: 30px !important; 
  padding: 2px 4px !important; 
}

.flip-list-move {
  transition: transform 0.5s ease;
}
</style>