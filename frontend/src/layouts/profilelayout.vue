<template>
  <TeamAppNav />
  <v-main>
    <Transition name="fade-view" mode="out-in">
      <RouterView />
    </Transition>
  </v-main>
</template>

<style scoped>
.fade-view-enter-active,
.fade-view-leave-active {
  transition: opacity 0.35s ease;
}
.fade-view-enter-from,
.fade-view-leave-to {
  opacity: 0;
}
</style>