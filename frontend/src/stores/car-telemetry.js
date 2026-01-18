import { defineStore } from "pinia";
import { socket } from "@/socket";

const timeOutDelay = 5000;

export const useTelemetryStore = defineStore("telemetry", {

    state: () => ({
        carData: null,
        isListening: false
    }),

    actions: {
        initListeners() {
            // this prevents double-binding
            if (this.isListening) return;

            socket.on("connect_error", (err) => {
                // the reason of the error, for example "xhr poll error"
                console.log("MESSAGE: " + err.message);

                // some additional description, for example the status code of the initial HTTP response
                console.log("DESCRIPTION: " + err.description);

                // some additional context, for example the XMLHttpRequest object
                console.log("CONTEXT: " + err.context);
            });

            socket.on("telemetry:update", (data) => {
                console.log("Store received data: ", data);
                this.carData = data;
            });

            this.isListening = true;
        },
        subscribeToTeam(token) {
            if (!socket.connected) {
                // Try reconnecting if disconnected for some reason
                socket.connect();
            }
            socket.timeout(timeOutDelay).emit("telemetry:join", token, (err, response) => {
                this.handleRejectedRequest(err, response);
            });
        },
        unsubscribeFromTeam() {
            socket.emit("telemetry:leave");
            this.carData.value = 0;
        },
        handleRejectedRequest(err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log(response.status); // client joined team romm
            }
        }
    }
});