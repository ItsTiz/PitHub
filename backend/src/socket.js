import { Server } from "socket.io";
import { registerTelemetryHandlers } from "./socket-handlers/telemetry-handler.js";
import { registerSimulationHandlers } from "./socket-handlers/sim-controller-handler.js";

let io;
const enableDebuggingLog = true;

const initIoServer = (httpServer) => {
    io = new Server(
        httpServer,
        {
            cors: {
                // TODO Vue frontend, can it be changed?
                origin: "http://localhost:5173", 
                // methods: ["GET", "POST"]
            }
        });

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

    registerTelemetryHandlers(io, socket);
    registerSimulationHandlers(io, socket);

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