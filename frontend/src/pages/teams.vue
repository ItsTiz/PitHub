<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { getTeamColor } from '../composables/utils/teams-colors.js'
    import { getCarForTeam } from '../composables/utils/cars-images';
    import { getLogoForTeam } from '../composables/utils/teams-logos'

    const teams = ref([])
    const loading = ref(true)

    const getImageUrl = (team) => {
        return new URL(`../assets/cars/${getCarForTeam(team)}`, import.meta.url).href
    }
    const getLogoUrl = (team) => {
        return new URL(`../assets/teams/${getLogoForTeam(team)}`, import.meta.url).href
    }

    const teamColor = (team) => {
        return getTeamColor(team);
    }
    onMounted(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/v1/teams`)
            teams.value = res.data
        } catch (err) {
            console.error('Errore caricamento teams:', err)
        } finally {
            loading.value = false
        }
    })
</script>

<template>
    <v-container
        fluid
        class="py-8"
    >
        <v-row>
            <v-col cols="12">
                <h1 class="text-h4 font-weight-bold mb-8 text-center">
                    Formula 1 Teams 2026
                </h1>
            </v-col>
        </v-row>

        <v-row
            v-if="loading"
            justify="center"
        >
            <v-progress-circular
                indeterminate
                color="primary"
                size="64"
            />
        </v-row>

        <v-row v-else>
            <v-col
                v-for="team in teams"
                :key="team._id"
                cols="12"
                sm="6"
                lg="4"
                xl="3"
            >
                <v-card
                    :color="teamColor(team.name) || 'surface'"
                    class="rounded-xl overflow-hidden elevation-6"
                    hover
                >
                    <div class="d-flex flex-column h-100">
                        <div class="car-style">
                            <v-img
                                :src="getImageUrl(team.name)"
                                :alt="`${team.name} car image`"
                                cover
                                class="rounded-t-lg h-100 w-100"
                                style="object-fit: cover;"
                            >
                                <template #placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular
                                            indeterminate
                                            color="grey-lighten-4"
                                        />
                                    </div>
                                </template>
                            </v-img>
                        </div>
                        <div class="pa-4 text-white d-flex align-center">
                            <v-avatar
                                :color="team.logoColor || 'white'"
                                size="56"
                                class="mr-3"
                            >
                                <img
                                    :src="getLogoUrl(team.name)"
                                    alt="team logo"
                                >
                            </v-avatar>
                            <h2 class="text-h5 font-weight-bold">
                                {{ team.name }}
                            </h2>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.car-style {
    height: 160px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
    padding: 30px;
}

</style>