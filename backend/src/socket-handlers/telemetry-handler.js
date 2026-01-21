import TelemetryEvent from "../simulation/events/telemetry-events.js";

const registerTelemetryHandlers = (io, socket) => {

    const joinTelemetry = (payload, callback) => {

        //TODO get based on user's authentication
        const teamId = 'ferrari';

        //TODO based on authentication
        if (!teamId) {
            callback({ message: `[${socket.id}] Authentication failed.` })
            return;
        }

        socket.join(TelemetryEvent.ROOM_PREFIX + `${teamId}`);
        console.log(`[${socket.id}] Client joined team-${teamId}`);

        callback({ message: `[${socket.id}] joined ${teamId}` });
    };

    const leaveTelemetry = () => {
        //TODO watch out for auth-based room leave
        socket.rooms.forEach((room) => {
            if (room.startsWith(TelemetryEvent.ROOM_PREFIX)) {
                socket.leave(room);
            }
        });
    };

    socket.on(TelemetryEvent.JOIN, joinTelemetry);
    socket.on(TelemetryEvent.LEAVE, leaveTelemetry);
};

export { registerTelemetryHandlers };