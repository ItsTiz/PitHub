import { createServer } from "http";
import { initIoServer } from "../socket.js"

export const createHttpServer = (app) => {
    const httpServer = createServer(app);

    initIoServer(httpServer);

    return httpServer;
}