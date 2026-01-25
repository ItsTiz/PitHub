import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 5000;

export const useRaceStore = defineStore("race", {

    state: () => ({
        cars: [],
        isListening: false
    }),

    actions: {
        initListeners() {
            if (this.isListening) return;

            socket.on("race:update", (data) => {
                console.log("[race-store] received data: ", data);
                this.cars = data;
            });

            this.isListening = true;
        },
        subscribeToRace() {
            if (!socket.connected) {
                socket.connect();
            }

            socket.timeout(timeOutDelay).emit("race:join", (err, response) => {
                this.handleRejectedRequest(err, response);
            });
        },
        unsubscribeFromRace() {
            socket.emit("race:leave");
            this.carData = [];
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