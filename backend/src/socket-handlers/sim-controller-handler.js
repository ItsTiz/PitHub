import SimulationEvent from "../simulation/events/simulation-events.js";
import { startSimulation, stopSimulation, isAlive } from "../simulation/simulation.js"

// Module-level variables: shared by ALL clients
let isSimulationRunning = isAlive();
let currentCircuit = null; // Store the circuit here so late-joiners can see it

const registerSimulationHandlers = (io, socket) => {

    const startSimulationLoop = async (circuitArg, callback) => {
        if (isSimulationRunning) {
            console.log(`[${socket.id}] tried to start, but sim is already running.`);
            
            if (typeof callback === 'function') {
                callback({ 
                    selectedCircuit: currentCircuit,
                    isRunning: true 
                });
            }
            return;
        }

        await startSimulation(io);

        console.log(`[${socket.id}] Starting simulation on:`, circuitArg);
        
        currentCircuit = circuitArg;
        isSimulationRunning = true;

        if (typeof callback === 'function') {
            callback({ selectedCircuit: currentCircuit });
        }

        io.emit(SimulationEvent.STATUS, isSimulationRunning);
    };

    const stopSimulationLoop = () => {
        if (!isSimulationRunning) return;

        stopSimulation();

        isSimulationRunning = false;
        currentCircuit = null;

        io.emit(SimulationEvent.STATUS, isSimulationRunning);
    };

    const sendSimulationStatus = (callback) => {
        if (typeof callback === 'function') {
            callback({ 
                isRunning: isSimulationRunning,
                selectedCircuit: currentCircuit 
            });
        }
    };

    socket.on(SimulationEvent.START, startSimulationLoop);
    socket.on(SimulationEvent.STOP, stopSimulationLoop);
    socket.on(SimulationEvent.STATUS, sendSimulationStatus);
};

export { registerSimulationHandlers };