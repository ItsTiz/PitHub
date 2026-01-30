import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 3000;
const enableDebugging = false;

export const useRaceStore = defineStore("race", {

    state: () => ({
        cars: [],
        isListening: false,
        isConnectedToRoom: false
    }),

    actions: {
        initListeners() {
            if (this.isListening) {
                return;
            }

            socket.on("disconnect", () => {
                this.isConnectedToRoom = false;
            });

            socket.on("race:update", (data) => {
                if (enableDebugging) console.log("[race-store] received data: ", data);
                this.cars = data;
            });

            this.isListening = true;

            this.checkConnectionStatus();
        },
        checkConnectionStatus() {
            if (!socket.connected) {
                this.isConnectedToRoom = false;
                return;
            }

            socket.timeout(timeOutDelay).emit("race:connected?", (err, response) => {
                if (err) {
                    this.isConnectedToRoom = false;
                } else {
                    this.isConnectedToRoom = response?.isConnected || false;
                }
            });
        },
        subscribeToRace() {
            if (!socket.connected) {
                socket.connect();
            }

            socket.timeout(timeOutDelay).emit("race:join", (err, response) => {
                this.handleRequestResponse(err, response, true);
            });
        },
        unsubscribeFromRace() {
            if (!socket.connected) {
                socket.connect();
            }
            socket.timeout(timeOutDelay).emit("race:leave", (err, response) => {
                this.handleRequestResponse(err, response, false);
            });
            this.carData = [];
        },
        handleRequestResponse(err, response, targetState) {
            if (err) {
                console.error("Socket Error:", err);
            } else {
                this.isConnectedToRoom = targetState;
            }
        }
    }
});