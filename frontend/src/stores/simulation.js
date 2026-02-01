import { defineStore } from "pinia";
import { socket } from "@/socket";
const timeOutDelay = 3000;

export const useSimulationControlStore = defineStore("simulation-control", {

    state: () => ({
        isRunning: false,
        selectedCircuit: ''
    }),

    actions: {
        initListeners() {
            socket.on("sim:status", (state) => {
                if (typeof state === 'boolean') {
                    this.isRunning = state;
                } 
                else if (typeof state === 'object') {
                    this.isRunning = state.isRunning;
                
                    if (state.selectedCircuit) {
                        this.selectedCircuit = state.selectedCircuit;
                    }
                }
            });

            socket.timeout(timeOutDelay).emit("sim:status", (err, response) => {
                if (!err && response) {
                    this.isRunning = response.isRunning;
                    
                    if (response.selectedCircuit) {
                        this.selectedCircuit = response.selectedCircuit;
                    }
                }
            });
        },
        
        emitStartRequest(circuit) {
            if (!socket.connected) {
                socket.connect();
            }
            
            socket.timeout(timeOutDelay).emit("sim:start", circuit, (err, response) => {
                if (!err && response) {
                    this.selectedCircuit = response.selectedCircuit;
                    this.isRunning = true;
                }
            });
        },
        
        emitStopRequest() {
            if (!socket.connected) {
                socket.connect();
            }
            socket.emit("sim:stop");
        }
    }
});