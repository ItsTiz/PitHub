import TelemetryEvent from "./events/telemetry-events.js";
import RaceEvent from "./events/race-events.js";
import { assembleTelemetryData, injectCarRaceData } from "./mock-simulator.js";
import { getCars } from "./data-fetcher.js";

let timeout;
let carsRacing = [];

const startSimulation = (io) => {
    //TODO break this on its own class to simulate different data

    //carsRacing = getCars();

    timeout = setInterval(() => {
        //TODO auth here too, for now ferrari is default
        const teamId = 'ferrari';
        const telemetryData = assembleTelemetryData();

        //carsRacing = injectCarRaceData(carsRacing);

        // io
        // .to(RaceEvent.ROOM_PREFIX)
        // .emit(RaceEvent.UPDATE, carsRacing);

        io
        .to(TelemetryEvent.ROOM_PREFIX+`${teamId}`)
        .emit(TelemetryEvent.UPDATE, telemetryData);
    }, process.env.INTERVAL);
}

const stopSimulation = () => {
    clearInterval(timeout);
}

export { startSimulation, stopSimulation };


