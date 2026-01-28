import { defineStore } from "pinia";
import { socket } from "@/socket";

export const useSimulationControlStore = defineStore("simulation-control", {

    actions: {
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