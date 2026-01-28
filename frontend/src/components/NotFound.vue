<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh">
    <v-card class="pa-6" width="400" elevation="5">
      <v-card-title class="text-h5 text-center mb-4">
        404 - Page Not Found
      </v-card-title>
      <v-card-text class="text-center">
        The page you are looking for does not exist or you do not have permission to access it.
      </v-card-text>
      <v-card-actions class="justify-center mt-4">
        <v-btn color="primary" @click="$router.push('/')">Go Home</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
