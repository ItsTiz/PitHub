import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 5000;
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

            socket.on("race:update", (data) => {
                if (enableDebugging) console.log("[race-store] received data: ", data);
                this.cars = data;
            });

            socket.emit("race:connected?", (response) => {
                console.log(response);
                if (!response) this.isConnectedToRoom = false
                if (!response.isConnected) this.isConnectedToRoom = false
                this.isConnectedToRoom = true
            });

            this.isListening = true;
        },
        subscribeToRace() {
            console.log("diocane");
            if (!socket.connected) {
                socket.connect();
            }

            socket.timeout(timeOutDelay).emit("race:join", (err, response) => {
                this.handleRequestResponse(err, response);
            });

            console.log(this.isConnectedToRoom);
        },
        unsubscribeFromRace() {
            console.log("porcamadonna");
            socket.emit("race:leave");
            this.carData = [];
            this.isConnectedToRoom = false
            console.log(this.isConnectedToRoom);
        },
        handleRequestResponse(err, response) {
            if (err) {
                console.log(err);
                this.isConnectedToRoom = false
                console.log(this.isConnectedToRoom);
            } else {
                console.log(response.message);
                this.isConnectedToRoom = true
                console.log(this.isConnectedToRoom);
            }
        }
    }
});