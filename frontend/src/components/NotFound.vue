<template>
    <v-container
        fluid
        class="d-flex align-center justify-center h-100"
    >
        <v-row class="pa-2 ma-2 h-50">
            <UiSheet 
                class="h-50 w-100"
                :elevation="5"
            >
                <template #default>
                    <div
                        class="d-flex fill-height flex-column justify-space-around align-center"
                    >
                        <div>
                            <h1 class="text-center mb-4">
                                404 - Page Not Found
                            </h1>
                        </div>

                        <div>
                            <p class="text-center">
                                The page you are looking for does not exist or you do not have permission to access it.
                            </p>
                        </div>

                        <div class="flex-grow-0">
                            <UiButton 
                                :title="'HOME'"
                                :icon="'mdi-arrow-left'"
                                :background-color="'primary'"
                                :text-color="'on-surface'"
                                :width="150"
                                :height="35"
                                :icon-only="false"
                                @click="$router.push('/')"
                            >
                                HOME
                            </UiButton>
                        </div>
                    </div>    
                </template>
            </UiSheet>
        </v-row>
    </v-container>
</template>
