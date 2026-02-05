<script setup>
    import { inject, ref, watch, computed } from 'vue'
    import { getCarForTeam } from '../../../../composables/utils/cars-images';

    const selectedItem = inject('selectedItem')

    const isCarSelected = ref(false)

    watch(selectedItem, (newCar) => {
        isCarSelected.value = !!newCar;
    });

    const imagePath = computed(()=>{    
        return getCarForTeam(selectedItem?.value?.team?.name);
    })

</script>


<template>
    <v-container class="fill-height pa-0 ma-0">
        <v-col
            no-gutters
            cols="12"
            class="fill-height"
        >
            <div class="d-flex flex-column fill-height pa-0 ma-0">
                <v-expand-transition>
                    <CarProfileCard
                        v-show="isCarSelected"
                        class="pa-1"
                        height="400px"
                        :driver-name="selectedItem?.driver.full_name || ''"
                        :team-name="selectedItem?.team.full_name || ''"
                        :driver-number="selectedItem?.driver.number"
                        :img-src="imagePath"
                        :engine-manufacturer="selectedItem?.engine_manufacturer"
                        :current-speed="selectedItem?.speed"
                        :max-speed="selectedItem?.specs.max_speed_kmh"
                        :acceleration="selectedItem?.specs.acceleration_0_100_s"
                        :reliability="selectedItem?.specs.reliability_rating"
                        :downforce="selectedItem?.specs.downforce_rating"
                    />
                </v-expand-transition>

                <UiCard 
                    class="flex-grow-1 rounded-0 pa-1" 
                    color="surface"
                    :elevation="5"
                >
                    <template #text>
                        <EventsLog />
                    </template>
                </UiCard>
            </div>
        </v-col>
    </v-container>
</template>


<style scoped>
.no-select,
.no-select * {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none; 
          user-select: none;
}
</style>