import TelemetryEvent from "./events/telemetry-events.js";
import RaceEvent from "./events/race-events.js";
import { assembleTelemetryData, injectCarRaceData, sortCars } from "./mock-simulator.js";
import { getCars } from "./data-fetcher.js";
//import { generateNotifications } from "./notification.js";

let timeout;
let carsRacing = [];
let lastNotificationTime = 0;
const NOTIFICATION_INTERVAL = 5000;

const startSimulation = async (io) => {
    console.log("Starting simulation...")
    carsRacing = await getCars();
    timeout = setInterval(() => {
        //const now = Date.now();
        
        broadcastRacingData(io);
        
        broadcastTelemetryData(io);
        
        // if (now - lastNotificationTime > NOTIFICATION_INTERVAL) {
        //     generateNotifications(io, carsRacing);
        //     lastNotificationTime = now;
        // }

    }, process.env.INTERVAL);
}

const stopSimulation = () => {
    console.log("Stopping simulation...")
    clearInterval(timeout);
}

const broadcastTelemetryData = (io) => {
    const teams = [...new Set(carsRacing.map(car => car.team))];
    teams.forEach(team => {
        const teamTelemetry = assembleTelemetryData();
        const room = TelemetryEvent.ROOM_PREFIX + TelemetryEvent.getRoomName(team);
        io.to(room).emit(TelemetryEvent.UPDATE, teamTelemetry);
    });
}

const broadcastRacingData = (io) => {
    carsRacing = sortCars(injectCarRaceData(carsRacing));
    io.to(RaceEvent.ROOM_PREFIX).emit(RaceEvent.UPDATE, carsRacing);
}

const isAlive = () => {
    return !!timeout
}


export { startSimulation, stopSimulation, isAlive };



