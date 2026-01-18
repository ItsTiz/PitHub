import EventRooms from "../simulation/event-rooms.js";

const registerTelemetryHandlers = (io, socket) => {

    const joinTelemetry = (payload, callback) => {

        //TODO get based on user's authentication
        const teamId = 'ferrari';

        //Callback with error as user authentication failed or not found
        //TODO based on authentication
        if (!teamId) {
            callback({ message: `[${socket.id}] Authentication failed.` })
            return;
        }

        socket.join(EventRooms.TELEMETRY_ROOM_PREFIX + `${teamId}`);
        console.log(`[${socket.id}] Client joined team-${teamId}`);

        //Callback acknowledge
        callback({ message: `[${socket.id}] joined ${teamId}` });
    };

    const leaveTelemetry = () => {
        socket.rooms.forEach((room) => {
            if (room.startsWith(EventRooms.TELEMETRY_ROOM_PREFIX)) {
                socket.leave(room);
            }
        });
    };

    socket.on(EventRooms.TELEMETRY_JOIN, joinTelemetry);
    socket.on(EventRooms.TELEMETRY_LEAVE, leaveTelemetry);
};

export { registerTelemetryHandlers };