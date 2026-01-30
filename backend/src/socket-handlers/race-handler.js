import RaceEvent from "../simulation/events/race-events.js";

const registerRaceHandlers = (io, socket) => {

    const joinRace = (callback) => {
        if (socket.rooms.has(RaceEvent.ROOM_PREFIX)) {
            callback({ message: `[${socket.id}] socket already in room` });        
            return;
        }

        socket.join(RaceEvent.ROOM_PREFIX);
        console.log(`[${socket.id}] Client joined race view`);

        callback({ message: `[${socket.id}] joined the race view` });
    };

    const leaveRace = (callback) => {
        if (socket.rooms.has(RaceEvent.ROOM_PREFIX)) {
            socket.leave(RaceEvent.ROOM_PREFIX);
            console.log(`[${socket.id}] Client left race room`);
        }
        
        callback({ message: "Client left the race room." });
    };

    const replyConnected = (callback) => {
        const rooms = socket.rooms;

        if(!rooms){
            callback({ isConnected: false });
            return;
        } 

        const isConnected = rooms.has(RaceEvent.ROOM_PREFIX);
        
        callback({ isConnected: isConnected });
    };

    socket.on(RaceEvent.JOIN, joinRace);
    socket.on(RaceEvent.LEAVE, leaveRace);
    socket.on(RaceEvent.CONNECTED, replyConnected);
};

export { registerRaceHandlers };