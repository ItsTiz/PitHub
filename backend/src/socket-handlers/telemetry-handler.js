import TelemetryEvent from "../simulation/events/telemetry-events.js";
import UserRole from "../middleware/user-roles.js";
import { getTeamDocument } from "../simulation/data-fetcher.js";

// Helper to normalize strings exactly like your getRoomName does

const registerTelemetryHandlers = (io, socket) => {
    const getAuthorizedTeamId = async (payload) => {
        const user = socket.user; 
        
        if (!user) throw "Authentication missing";

        switch (user.role) {
            case UserRole.USER:
                throw "Unauthorized access";

            case UserRole.TEAM:
                if (!user.team) throw "Team reference missing for user";
                return TelemetryEvent.getRoomName(user.team);

            case UserRole.ADMIN:
                if (!payload?.teamName) throw "Admin must specify a teamId";
                const team = await getTeamDocument(payload.teamName);
                return TelemetryEvent.getRoomName(team)

            default:
                throw "Unknown role";
        }
    };

    const joinTelemetry = async (payload, callback) => {
        try {
            const teamId = await getAuthorizedTeamId(payload);
            const user = socket.user;

            const roomName = TelemetryEvent.ROOM_PREFIX + teamId;

            if (socket.rooms.has(roomName)) {
                if (callback) callback({ message: "Already in room" });
                return;
            }

            socket.join(roomName);
            console.log(`[${socket.id}] ${user.role} (${user.email}) joined ${roomName}`);

            if (callback) callback({ message: `Joined telemetry ROOM ${roomName}` });

        } catch (errorMsg) {
            if (callback) callback({ error: errorMsg });
        }
    };

    const leaveTelemetry = async (payload, callback) => {
        try {
            const teamId = await getAuthorizedTeamId(payload);
            const roomName = TelemetryEvent.ROOM_PREFIX + teamId;

            if (socket.rooms.has(roomName)) {
                socket.leave(roomName);
                if (callback) callback({ message: `Left telemetry ROOM ${roomName}` });
            } else {
                if (callback) callback({ error: `Not currently in ROOM ${roomName}` });
            }

        } catch (errorMsg) {
            if (callback) callback({ error: errorMsg });
        }
    };

    socket.on(TelemetryEvent.JOIN, joinTelemetry);
    socket.on(TelemetryEvent.LEAVE, leaveTelemetry);
};

export { registerTelemetryHandlers };