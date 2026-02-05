import TelemetryEvent from "./events/telemetry-events.js";
import RaceEvent from "./events/race-events.js";
import { assembleTelemetryData, injectCarRaceData, sortCars } from "./mock-simulator.js";
import { getCars } from "./data-fetcher.js";
import { generateNotifications } from "./notification.js";

let carsRacing = [];
let racingTimer = null;
let notificationTimer = null;
let isRunning = false;
       
const startSimulation = async (io) => {
    if (isRunning) return; 
    console.log("Starting simulation...")
    
    isRunning = true; 
    carsRacing = await getCars();

    racingTimer = setInterval(() => {
        broadcastRacingData(io);
        broadcastTelemetryData(io); 
    }, process.env.INTERVAL);
    
    runNotifications();
}

const stopSimulation = () => {
    console.log("Stopping simulation...")
    
    isRunning = false; 

    if (racingTimer) {
        clearInterval(racingTimer);
        racingTimer = null;
    }

    if (notificationTimer) {
        clearTimeout(notificationTimer);
        notificationTimer = null;
    }
}

const runNotifications = async () => {
    if (!isRunning) return;

    try {
        await generateNotifications(carsRacing);
    } catch (err) {
        console.error(err);
    }

    if (!isRunning) return; 
    notificationTimer = setTimeout(runNotifications, process.env.INTERVAL);
};

const broadcastTelemetryData = (io) => {
    const teams = [...new Set(carsRacing.map(car => car.team))];
    teams.forEach(team => {
        const teamTelemetry = {carData1: assembleTelemetryData(), carData2: assembleTelemetryData()};
        const room = TelemetryEvent.ROOM_PREFIX + TelemetryEvent.getRoomName(team);
        io.to(room).emit(TelemetryEvent.UPDATE, teamTelemetry);
    });
}

const broadcastRacingData = (io) => {
    carsRacing = sortCars(injectCarRaceData(carsRacing));
    io.to(RaceEvent.ROOM_PREFIX).emit(RaceEvent.UPDATE, carsRacing);
}

const isAlive = () => {
    return !!racingTimer 
}


export { startSimulation, stopSimulation, isAlive };




