import app from "./src/app.js"
import { connectDb } from "./src/config/db.js";

const PORT = 3000;

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log('Server running on port: ', PORT);
    });
};

startServer();