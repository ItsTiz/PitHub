<script setup>
import { inject } from 'vue'
const props = defineProps({
    selectedItem: { type: String }
});

const selectedItem = inject('selectedItem')

const isCarSelected = ref(false)

watch(selectedItem, (newCar, _) => {
    isCarSelected.value = !!newCar;
});

</script>


<template>
  <v-container class="fill-height pa-0 ma-0">
    <v-col no-gutters cols="12" class="fill-height">
      
      <div class="d-flex flex-column fill-height pa-0 ma-0">
        <v-expand-transition>
            <Card 
                class="pa-1"
                v-show="isCarSelected"
                height="250px"
                :elevation="5"
            >
                <template #text>
                    <div class="fill-height">
                        Car
                    </div>
                </template>
                
            </Card>
        </v-expand-transition>

        <Card 
            class="flex-grow-1 rounded-0 pa-1" 
            color="surface"
            :elevation="5"
        >
            <template #text>
                    <p class="mb-4">Events view/notifications</p>
            </template>
        </Card>

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