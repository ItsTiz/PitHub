import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middleware/auth.js";
import { registerTelemetryHandlers } from "./socket-handlers/telemetry-handler.js";
import { registerSimulationHandlers } from "./socket-handlers/sim-controller-handler.js";
import { registerRaceHandlers } from "./socket-handlers/race-handler.js";
import { enableRemoteLogging } from "./simulation/remote-logger.js";
import UserRole from "./middleware/user-roles.js";

let io;
const enableDebuggingLog = false;

const initIoServer = (httpServer) => {
    io = new Server(
        httpServer,
        {
            cors: {
                origin: "*"
            },
            transports: ['websocket', 'polling']
        }
    );

    //remote logging - overriding std output and error
    enableRemoteLogging(io);
        
    // we attach the socket.io middleware to embed the user in the requests
    // and of course to check authentication beforehand
    io.use(socketAuthMiddleware);

    io.on("connection", onConnection);

    if(enableDebuggingLog){
        enableErrorDebugging();
    }

    return io;
}

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

const onConnection = (socket) => {
    console.log(`[${socket.id}] Client connected`);

    const user = socket.user; // reading from middleware-attached user

    if(!user){
        console.log(`[${socket.id}] Could not identify user.`);
    }

    const role = user.role || UserRole.USER;
    console.log(`[${socket.id}] Identified with role: ${role}.`);


    if(role === UserRole.ADMIN || role === UserRole.TEAM){
        registerTelemetryHandlers(io, socket);
    }
    
    registerSimulationHandlers(io, socket);
    registerRaceHandlers(io, socket);
    socket.on("disconnect", () => {
        console.log(`[${socket.id}] Client disconnected`);
    });
};

const enableErrorDebugging = () => {
    io.engine.on("connection_error", (err) => {
        console.log(err.req);
        console.log(err.code);
        console.log(err.message);
        console.log(err.context);
    });
}



export {initIoServer, getIO}