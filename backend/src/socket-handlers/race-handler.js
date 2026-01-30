import RaceEvent from "../simulation/events/race-events.js";

const registerRaceHandlers = (io, socket) => {

    const joinRace = (callback) => {
        socket.rooms?.forEach((room) => {
            if (room.startsWith(RaceEvent.ROOM_PREFIX)) {
                callback({ message: `[${socket.id}] socket already in room` });        
                return;
            }
        });
        
        socket.join(RaceEvent.ROOM_PREFIX);
        console.log(`[${socket.id}] Client joined race view`);

        callback({ message: `[${socket.id}] joined the race view` });
    };

    const leaveRace = () => {
        console.log(socket.rooms.size, socket.rooms)
        socket.rooms.forEach((room) => {
            if (room.startsWith(RaceEvent.ROOM_PREFIX)) {
                socket.leave(room);
            }
        });
    };

    const replyConnected = (callback) => {
        const rooms = socket.rooms;
        console.log(rooms.size, rooms)
        if (!rooms || rooms.size === 0) {
            callback({ isConnected:  false});
        }

        callback({ isConnected: true });
    };

    socket.on(RaceEvent.JOIN, joinRace);
    socket.on(RaceEvent.LEAVE, leaveRace);
    socket.on(RaceEvent.CONNECTED, replyConnected);
};

export { registerRaceHandlers };