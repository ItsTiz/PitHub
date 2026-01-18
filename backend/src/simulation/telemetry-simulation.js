import { getIO } from "../socket.js"
import EventRooms from "./event-rooms.js"

let timeout;

const startSimulation = () => {
    //TODO break this on its own class to simulate different data
    timeout = setInterval(() => {
        const io = getIO();
        const fakeSpeed = Math.floor(Math.random() * 350);

        //TODO auth here too, for now ferrari is default
        const teamId = 'ferrari';
        const toSend = { speed: fakeSpeed };

        io
        .to(EventRooms.TELEMETRY_ROOM_PREFIX+`${teamId}`)
        .emit(EventRooms.TELEMETRY_UPDATE, toSend);
    }, process.env.INTERVAL);
}

const stopSimulation = () => {
    clearInterval(timeout);
}

export { startSimulation, stopSimulation };


