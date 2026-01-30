import SimulationEvent from "../simulation/events/simulation-events.js";
import { startSimulation, stopSimulation, isAlive } from "../simulation/simulation.js"

let isSimulationRunning = isAlive();

const registerSimulationHandlers = (io, socket) => {

    const startSimulationLoop = async () => {
        if (isSimulationRunning) return;
        
        await startSimulation(io);

        isSimulationRunning = true;
        io.emit(SimulationEvent.STATUS, isSimulationRunning);
    };

    const stopSimulationLoop = () => {
        if (!isSimulationRunning) return;

        stopSimulation();

        isSimulationRunning = false;
        io.emit(SimulationEvent.STATUS, isSimulationRunning);
    };

    const sendSimulationStatus = (callback) => {
        callback({ isRunning: isSimulationRunning });
    };

    socket.on(SimulationEvent.START, startSimulationLoop);
    socket.on(SimulationEvent.STOP, stopSimulationLoop);
    socket.on(SimulationEvent.STATUS, sendSimulationStatus);
    // TODO uninmpl: SimulationEvent.PAUSE - we'll see
    // socket.on(SimulationEvent.PAUSE, pauseSimulationLoop);
};

export { registerSimulationHandlers };