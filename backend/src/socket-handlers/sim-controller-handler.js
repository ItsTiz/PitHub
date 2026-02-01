import SimulationEvent from "../simulation/events/simulation-events.js";
import { startSimulation, stopSimulation, isAlive } from "../simulation/simulation.js"
import UserRole from "../middleware/user-roles.js";

let isSimulationRunning = isAlive();
let currentCircuit = null; // store the circuit here so late-joiners can see it

const registerSimulationHandlers = (io, socket) => {

    const checkUserAuthentication = (callback) => {
        const user = socket.user;

        if (!user) {
            callback({ error: "Authentication missing" });
            return false;
        }

        if (user.role !== UserRole.ADMIN) {
            callback({ error: "Unauthorized access" });
            return false;
        }

        return true;
    }

    const toSendData = () => {
        return {
            selectedCircuit: currentCircuit,
            isRunning: isSimulationRunning
        }
    }

    const startSimulationLoop = async (circuitArg, callback) => {

        if (!checkUserAuthentication(callback)) return;

        currentCircuit = circuitArg;

        if (isSimulationRunning) {
            console.log(`[${socket.id}] Simulatiuon is already running.`);
            if (typeof callback === 'function') { callback(toSendData()); }
            return;
        }

        await startSimulation(io);
        isSimulationRunning = true;

        console.log(`[${socket.id}] Starting simulation on:`, currentCircuit);

        if (typeof callback === 'function') { callback(toSendData()); }
        io.emit(SimulationEvent.STATUS, toSendData()); //broadcasting to every other socket
    };

    const stopSimulationLoop = (callback) => {

        if (!checkUserAuthentication(callback)) return;

        if (!isSimulationRunning) return;

        stopSimulation();

        isSimulationRunning = false;
        currentCircuit = null;

        io.emit(SimulationEvent.STATUS, toSendData());
    };

    const sendSimulationStatus = (callback) => {
        if (typeof callback === 'function') {
            callback(toSendData());
        }
    };

    socket.on(SimulationEvent.START, startSimulationLoop);
    socket.on(SimulationEvent.STOP, stopSimulationLoop);
    socket.on(SimulationEvent.STATUS, sendSimulationStatus);
};

export { registerSimulationHandlers };