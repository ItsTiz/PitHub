import TelemetryEvent from "./events/telemetry-events.js";
import RaceEvent from "./events/race-events.js";
import { assembleTelemetryData, injectCarRaceData, sortCars } from "./mock-simulator.js";
import { getCars } from "./data-fetcher.js";
import { generateAndEmitNotifications } from "./notifications.js";

let timeout;
let carsRacing = [];
let lastNotificationTime = 0;
const NOTIFICATION_INTERVAL = 5000;

const startSimulation = async (io) => {
    //TODO break this on its own class to simulate different data
    console.log("Starting simulation...")
    carsRacing = await getCars();
    timeout = setInterval(() => {
        const now = Date.now();
        //TODO auth here too, for now ferrari is default
        const teamId = 'ferrari';
        const telemetryData = assembleTelemetryData();

        carsRacing = sortCars(injectCarRaceData(carsRacing));
        if (now - lastNotificationTime > NOTIFICATION_INTERVAL) {
            generateAndEmitNotifications(io, carsRacing);
            lastNotificationTime = now;
        }

        io
        .to(RaceEvent.ROOM_PREFIX)
        .emit(RaceEvent.UPDATE, carsRacing);

        io
        .to(TelemetryEvent.ROOM_PREFIX + `${teamId}`)
        .emit(TelemetryEvent.UPDATE, telemetryData);
    }, process.env.INTERVAL);
}

const stopSimulation = () => {
    console.log("Stopping simulation...")
    clearInterval(timeout);
}

const isAlive = () => {
    return !!timeout
}

export { startSimulation, stopSimulation, isAlive };


