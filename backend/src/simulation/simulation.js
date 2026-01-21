import TelemetryEvent from "./events/telemetry-events.js";
import { assembleData } from "./mock-simulator.js";

let timeout;

const startSimulation = (io) => {
    //TODO break this on its own class to simulate different data
    timeout = setInterval(() => {
        //TODO auth here too, for now ferrari is default
        const teamId = 'ferrari';
        const toSend = assembleData();

        io
        .to(TelemetryEvent.ROOM_PREFIX+`${teamId}`)
        .emit(TelemetryEvent.UPDATE, toSend);
    }, process.env.INTERVAL);
}

const stopSimulation = () => {
    clearInterval(timeout);
}

export { startSimulation, stopSimulation };


