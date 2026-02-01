import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 3000;
const enableDebugging = import.meta.env.VITE_ENABLE_DEBUGGING === 'true';

export const useSimulationControlStore = defineStore("simulation-control", {

    state: () => ({
        isRunning: false,
        selectedCircuit: null
    }),

    actions: {
        updateState(data) {
            if (!data || typeof data !== 'object') return;
            
            this.isRunning = !!data.isRunning;
            this.selectedCircuit = data.selectedCircuit || null;
            
            if (enableDebugging) {
                console.log(`[Sim-Store] State updated: Running=${this.isRunning}, Circuit=${this.selectedCircuit}`);
            }
        },

        initListeners() {
            socket.on("sim:status", (data) => {
                this.updateState(data);
            });

            if (!socket.connected) socket.connect();
            
            socket.timeout(timeOutDelay).emit("sim:status", (err, response) => {
                if (!err && response) {
                    this.updateState(response);
                } else {
                    this.handleRequestResponse(err, response);
                }
            });
        },

        emitStartRequest(circuit) {
            if (!socket.connected) socket.connect();

            socket.timeout(timeOutDelay).emit("sim:start", circuit, (err, response) => {
                this.handleRequestResponse(err, response);
                
                if (!err && !response?.error) {
                    this.updateState(response);
                }
            });
        },

        emitStopRequest() {
            if (!socket.connected) socket.connect();

            socket.timeout(timeOutDelay).emit("sim:stop", (err, response) => {
                this.handleRequestResponse(err, response);

                if (!err && !response?.error) {
                    this.updateState(response);
                }
            });
        },

        handleRequestResponse(err, response) {
            if (err) {
                console.error("[Simulation-Store]:", err);
            } else if (response?.error) {
                console.error("[Simulation-Store] Server:", response.error);
            } else {
                if (enableDebugging) {
                    console.log("[Simulation-Store] Action Success");
                }
            }
        }
    }
});