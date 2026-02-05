import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 5000;

export const useTelemetryStore = defineStore("telemetry", {

    state: () => ({
        carData: {},
        carData2: {},
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
                this.carData = data.carData1;
                this.carData2 = data.carData2;
            });

            this.isListening = true;
        },
        subscribeToTeam(targetTeamName = null) {
            if (!socket.connected) {
                socket.connect();
            }

            const payload = targetTeamName ? { teamName: targetTeamName } : {};

            socket.timeout(timeOutDelay).emit("telemetry:join", payload, (err, response) => {
                this.handleRequestResponse(err, response);
            });
        },

        unsubscribeFromTeam(targetTeamName = null) {
            if (!socket.connected) {
                socket.connect();
            }

            const payload = targetTeamName ? { teamName: targetTeamName } : {};

            socket.timeout(timeOutDelay).emit("telemetry:leave", payload, (err, response) => {
                this.handleRequestResponse(err, response);
            });

            this.carData = {};
            this.carData2 = {};
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