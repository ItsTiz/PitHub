import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 5000;

export const useTelemetryStore = defineStore("telemetry", {

    state: () => ({
        carData: {},
        isListening: false // prevents double-binding
    }),

    actions: {
        initListeners() {

            if (this.isListening) {
                if (import.meta.env.VITE_ENABLE_DEBUGGING === 'true') console.log("[telemetry-store] Already binded. Aborting.");
                return;
            }

            socket.on("telemetry:update", (data) => {
                if (import.meta.env.VITE_ENABLE_DEBUGGING === 'true') console.log("[telemetry-store] received data: ", data);
                this.carData = data;
            });

            this.isListening = true;
        },
        subscribeToTeam(targetTeamId = null) {
            if (!socket.connected) {
                socket.connect();
            }

            const payload = targetTeamId ? { teamId: targetTeamId } : {};

            socket.timeout(timeOutDelay).emit("telemetry:join", payload, (err, response) => {
                this.handleRequestResponse(err, response);
            });
        },

        unsubscribeFromTeam(targetTeamId = null) {
            if (!socket.connected) {
                socket.connect();
            }

            const payload = targetTeamId ? { teamId: targetTeamId } : {};

            socket.timeout(timeOutDelay).emit("telemetry:leave", payload, (err, response) => {
                this.handleRequestResponse(err, response);
            });

            this.carData = {};
        },

        handleRequestResponse(err, response) {
            if (err) {
                console.error("[Telemetry]: ", err);
            } else if (response?.error) {
                console.error("[Telemetry] Server:", response.error);
            } else {
                if (import.meta.env.VITE_ENABLE_DEBUGGING === 'true') console.log("[Telemetry]: ", response.message);
            }
        }
    }
});