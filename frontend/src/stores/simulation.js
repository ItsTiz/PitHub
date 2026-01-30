import { defineStore } from "pinia";
import { socket } from "@/socket";
const timeOutDelay = 3000;

export const useSimulationControlStore = defineStore("simulation-control", {

    state: () => ({
        isRunning: false
    }),

    actions: {
        initListeners() {
            socket.on("sim:status", (state) => {
                this.isRunning = state;
            });

            socket.timeout(timeOutDelay).emit("sim:status", (err, response) => {
                if (!err && response) {
                    this.isRunning = response.isRunning;
                }
            });
        },
        emitStartRequest() {
            if (!socket.connected) {
                socket.connect();
            }
            socket.emit("sim:start");
        },
        emitStopRequest() {
            socket.emit("sim:stop");
        }
    }
});