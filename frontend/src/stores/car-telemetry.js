import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 5000;
const enableDebugging = false;

export const useTelemetryStore = defineStore("telemetry", {

    state: () => ({
        carData: {},
        isListening: false
    }),

    actions: {
        initListeners() {
            // This prevents double-binding
            if (this.isListening) return;

            socket.on("telemetry:update", (data) => {
                if(enableDebugging) console.log("[telemetry-store] received data: ", data);
                this.carData = data;
            });

            this.isListening = true;
        },
        subscribeToTeam(token) {
            if (!socket.connected) {
                // Try reconnecting if disconnected for some reason
                socket.connect();
            }

            // Request to join the room on a timeout
            socket.timeout(timeOutDelay).emit("telemetry:join", token, (err, response) => {
                this.handleRejectedRequest(err, response);
            });
        },
        unsubscribeFromTeam() {
            socket.emit("telemetry:leave");
            this.carData = {};
        },
        handleRejectedRequest(err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log(response.status);
            }
        }
    }
});