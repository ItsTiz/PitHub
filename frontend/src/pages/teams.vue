<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { getTeamColor } from '../composables/utils/teams-colors.js'
    import { getCarForTeam } from '../composables/utils/cars-images'
    import { getLogoForTeam } from '../composables/utils/teams-logos'

    const teams = ref([])
    const loading = ref(true)
    const flipped = ref({})

    const getImageUrl = (team) => new URL(`../assets/cars/${getCarForTeam(team)}`, import.meta.url).href
    const getLogoUrl = (team) => new URL(`../assets/teams/${getLogoForTeam(team)}`, import.meta.url).href
    const teamColor = (team) => getTeamColor(team)

    const toggleFlip = (teamId) => {
        flipped.value[teamId] = !flipped.value[teamId]
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
                    class="rounded-xl overflow-hidden elevation-6 ma-2"
                    hover
                    style="cursor: pointer; height: 250px; "
                    @click="toggleFlip(team._id)"
                >
                    <v-card-text
                        class="pa-0 h-100 position-relative"
                        style="transform-style: preserve-3d; transition: transform 0.6s;"
                    >
                        <div
                            class="d-flex flex-column h-100 backface-hidden"
                            :style="{ transform: flipped[team._id] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
                        >
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
            
                        <div
                            class="pa-6 text-white d-flex flex-column justify-center h-100 position-absolute top-0 left-0 w-100 backface-hidden"
                            :style="{ transform: flipped[team._id] ? 'rotateY(0deg)' : 'rotateY(-180deg)' }"
                            :color="teamColor(team.name)"
                        >
                            <h3 class="text-h5 mb-4 text-center">
                                {{ team.name }}
                            </h3>
                            <div
                                v-if="team.drivers?.length"
                                class="mb-4"
                            >
                                <strong>Drivers:</strong>
                                <ul class="pl-4">
                                    <li
                                        v-for="driver in team.drivers"
                                        :key="driver.full_name"
                                    >
                                        {{ driver.number }} {{ driver.full_name }}
                                    </li>
                                </ul>
                            </div>
                            <p><strong>Joined year:</strong> {{ team.joined_year }}</p>
                            <p><strong>Nationality:</strong> {{ team.nationality }}</p>
                            <p><strong>Headquarter:</strong> {{ team.headquarters }}</p>
                            <p><strong>Team Principal:</strong> {{ team.team_principal }}</p>
                        </div>
                    </v-card-text>
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

.backface-hidden {
  backface-visibility: hidden;
}
</style>