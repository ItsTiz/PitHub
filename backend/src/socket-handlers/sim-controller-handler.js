import SimulationEvent from "../simulation/events/simulation-events.js";
import { startSimulation, stopSimulation, isAlive } from "../simulation/simulation.js"

// Module-level variables: shared by ALL clients
let isSimulationRunning = isAlive();
let currentCircuit = null; // Store the circuit here so late-joiners can see it

const registerSimulationHandlers = (io, socket) => {

    const startSimulationLoop = async (circuitArg, callback) => {
        currentCircuit = circuitArg;

        const toSend = { 
            selectedCircuit: currentCircuit,
            isRunning: true 
        }

        if (isSimulationRunning) {
            console.log(`[${socket.id}] tried to start, but sim is already running.`);
            if (typeof callback === 'function') { callback(toSend); }
            return;
        }

        await startSimulation(io);
        isSimulationRunning = true;

        console.log(`[${socket.id}] Starting simulation on:`, circuitArg);
        
        if (typeof callback === 'function') { callback(toSend); }
        //Also broadcasting to every other socket
        io.emit(SimulationEvent.STATUS, toSend);
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