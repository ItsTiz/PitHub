import SimulationEvent from "../simulation/events/simulation-events.js";
import { startSimulation, stopSimulation } from "../simulation/simulation.js"

const registerSimulationHandlers = (io, socket) => {

    const startSimulationLoop = (payload) => {
        startSimulation(io);
    };

    const stopSimulationLoop = (payload) => {
       stopSimulation();
    };

    socket.on(SimulationEvent.START, startSimulationLoop);
    socket.on(SimulationEvent.STOP, stopSimulationLoop);
    // TODO uninmpl: SimulationEvent.PAUSE - we'll see
    // socket.on(SimulationEvent.PAUSE, pauseSimulationLoop);
};

export { registerSimulationHandlers };