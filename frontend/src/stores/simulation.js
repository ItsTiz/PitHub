import { defineStore } from "pinia";
import { socket } from "@/socket";

const TIMEOUT_DELAY = 3000;
const LOG_BUFFER = 50; // lines of log
const ENABLE_DEBUGGING = import.meta.env.VITE_ENABLE_DEBUGGING === 'true';

export const useSimulationControlStore = defineStore("simulation-control", {

    state: () => ({
        isRunning: false,
        selectedCircuit: null,
        serverLogs: [],
        isJoined: false
    }),

    actions: {
        updateState(data) {
            if (!data || typeof data !== 'object') return;
            
            this.isRunning = !!data.isRunning;
            this.selectedCircuit = data.selectedCircuit || null;
            
            if (ENABLE_DEBUGGING) {
                console.log(`[Sim-Store] State updated: Running=${this.isRunning}, Circuit=${this.selectedCircuit}`);
            }
        },

        initListeners() {
            socket.on("sim:status", (data) => {
                this.updateState(data);
            });

            socket.on("sim:log", (log) => {
                this.serverLogs.push(log);

                if (this.serverLogs.length > LOG_BUFFER) {
                    this.serverLogs.shift(); 
                }
            });

            if (!socket.connected) socket.connect();
            
            socket.timeout(TIMEOUT_DELAY).emit("sim:status", (err, response) => {
                if (!err && response) {
                    this.updateState(response);
                } else {
                    this.handleRequestResponse(err, response);
                }
            });
        },

        subscribeToSimLogs() {
            if (!socket.connected) socket.connect();

            socket.timeout(TIMEOUT_DELAY).emit("sim:join", (err, response) => {
                this.handleRequestResponse(err, response);
                
                if (!err && !response?.error) {
                    this.isJoined = true;
                    this.updateState(response); 
                }
            });
        },

        unsubscribeToSimLogs() {
            socket.timeout(TIMEOUT_DELAY).emit("sim:leave", (err, response) => {
                this.handleRequestResponse(err, response);
                
                if (!err) {
                    this.isJoined = false;
                    this.serverLogs = [];
                }
            });
        },

        emitStartRequest(circuit) {
            if (!socket.connected) socket.connect();

            socket.timeout(TIMEOUT_DELAY).emit("sim:start", circuit, (err, response) => {
                this.handleRequestResponse(err, response);
                
                if (!err && !response?.error) {
                    this.updateState(response);
                }
            });
        },

        emitStopRequest() {
            if (!socket.connected) socket.connect();

            socket.timeout(TIMEOUT_DELAY).emit("sim:stop", (err, response) => {
                this.handleRequestResponse(err, response);

                if (!err && !response?.error) {
                    this.updateState(response);
                }
            });
        },

        handleRequestResponse(err, response) {
            if (err) {
                console.error("[Simulation-Store] Timeout/Socket Error:", err);
            } else if (response?.error) {
                console.error("[Simulation-Store] Server Error:", response.error);
            } else {
                if (ENABLE_DEBUGGING) {
                    console.log("[Simulation-Store] Action Success");
                }
            }
        },

        clearLogs() {
            this.serverLogs = [];
        }
    }
});