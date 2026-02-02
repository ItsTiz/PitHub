import TelemetryEvent from "../simulation/events/telemetry-events.js";
import UserRole from "../middleware/user-roles.js";

const registerTelemetryHandlers = (io, socket) => {

    const joinTelemetry = (payload, callback) => {
        const user = socket.user; //we assume the middleare has done its job. hopefully. 

        if (!user) {
            //never say never
            return callback({ error: "Authentication missing" });
        }

        let targetTeamId = null;

        switch (user.role) {
            case UserRole.USER: {
                return callback({ error: "Unauthorized access" });
            }
            case UserRole.TEAM: {
                if (!user.team) return callback({ error: "Team reference missing for user." });

                targetTeamId = TelemetryEvent.getRoomName(user.team);

                if (!targetTeamId) return callback({ error: "User is not linked to a valid team." });

                break;
            }
            case UserRole.ADMIN: {
                targetTeamId = payload?.teamId;

                if (!targetTeamId) {
                    return callback({ error: "Admin must specify a teamId" });
                }
                break;
            }
        }

        const roomName = TelemetryEvent.ROOM_PREFIX + targetTeamId;

        if (socket.rooms.has(roomName)) {
            return callback({ message: "Already in room" });
        }

        socket.join(roomName);
        console.log(`[${socket.id}] ${user.role} (${user.email}) joined ${roomName}`);

        callback({ message: `[${socket.id}] joined telemetry ROOM ${roomName}` });
    };

    const leaveTelemetry = (payload, callback) => {
        const user = socket.user;
        let targetTeamId = null;

        if (!user) {
            return callback({ error: "Authentication missing" });
        }

        switch (user.role) {
            case UserRole.USER: {       
                return callback({ error: "Unauthorized access" });
            }
            case UserRole.TEAM: {
                if (!user.team) return callback({ error: "Team reference missing for user." });
    
                targetTeamId = TelemetryEvent.getRoomName(user.team);
                break;
            }
            case UserRole.ADMIN: {
                targetTeamId = payload?.teamId;
                break;
            }
        }

        if (targetTeamId) {
            const roomName = TelemetryEvent.ROOM_PREFIX + targetTeamId;
            if (socket.rooms.has(roomName)) {
                socket.leave(roomName);
                return callback({ message: `[${socket.id}] left telemetry ROOM ${targetTeamId}` });
            } else {
                return callback({ error: `[${socket.id}] not in ROOM ${targetTeamId}` });
            }
        }
    };

    socket.on(TelemetryEvent.JOIN, joinTelemetry);
    socket.on(TelemetryEvent.LEAVE, leaveTelemetry);
};

export { registerTelemetryHandlers };