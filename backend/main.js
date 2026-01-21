import app from "./src/config/app.js"
import { connectDb } from "./src/config/db.js";
import { createHttpServer } from "./src/config/httpserver.js"
import { startSimulation } from "./src/simulation/simulation.js"
import 'dotenv/config';

const startServer = async () => {
    await connectDb();

    const {httpServer, io} = createHttpServer(app);

    startSimulation(io);

    httpServer.listen(process.env.PORT, () => {
        console.log('Server running on port: ', process.env.PORT);
    });
};

startServer();