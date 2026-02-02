import TelemetryEvent from "./events/telemetry-events.js";
import RaceEvent from "./events/race-events.js";
import { assembleTelemetryData, injectCarRaceData } from "./mock-simulator.js";
import { getCars } from "./data-fetcher.js";
import { generateNotifications } from "./notification.js";

let timeout;
let carsRacing = [];
let lastNotificationTime = 0;
const NOTIFICATION_INTERVAL = 5000;

const startSimulation = async (io) => {
    //TODO break this on its own class to simulate different data

    carsRacing = await getCars();
    timeout = setInterval(() => {
        const now = Date.now();
        //TODO auth here too, for now ferrari is default
        const teamId = 'ferrari';
        const telemetryData = assembleTelemetryData();

        carsRacing = injectCarRaceData(carsRacing);
      if (now - lastNotificationTime > NOTIFICATION_INTERVAL) {

            if (Array.isArray(carsRacing)) {
                console.log('carsRacing:', carsRacing);
                generateNotifications(carsRacing);
            }
            lastNotificationTime = now;
        }

        io
        .to(RaceEvent.ROOM_PREFIX)
        .emit(RaceEvent.UPDATE, carsRacing);

        io
        .to(TelemetryEvent.ROOM_PREFIX+`${teamId}`)
        .emit(TelemetryEvent.UPDATE, telemetryData);
    }, process.env.INTERVAL);
}

const stopSimulation = () => {
    clearInterval(timeout);
}

export { startSimulation, stopSimulation };


