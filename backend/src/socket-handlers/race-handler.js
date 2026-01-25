import RaceEvent from "../simulation/events/race-events.js";

const registerRaceHandlers = (io, socket) => {

    const joinRace = (payload, callback) => {

        socket.join(RaceEvent.ROOM_PREFIX);
        console.log(`[${socket.id}] Client joined race view`);

        callback({ message: `[${socket.id}] joined the race view` });
    };

    const leaveRace = () => {
        socket.rooms.forEach((room) => {
            if (room.startsWith(RaceEvent.ROOM_PREFIX)) {
                socket.leave(room);
            }
        });
    };

    socket.on(RaceEvent.JOIN, joinRace);
    socket.on(RaceEvent.LEAVE, leaveRace);
};

export { registerRaceHandlers };