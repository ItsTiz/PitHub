import { defineStore } from "pinia";
import { socket } from "@/socket";

const enableDebuggingLog = true;

export const useConnectionStore = defineStore("connection", {
    state: () => ({
        isConnected: false,
    }),

    actions: {
        bindEvents() {
            socket.on("connect", () => {
                this.isConnected = true;
            });

            socket.on("disconnect", () => {
                this.isConnected = false;
            });

            if (enableDebuggingLog) {
                this.enableErrorDebugging();
            }

        },

        connect() {
            socket.connect();
        },

        enableErrorDebugging() {
            socket.on("connect_error", (err) => {
                console.log("MESSAGE: " + err.message);
                console.log("DESCRIPTION: " + err.description);
                console.log("CONTEXT: " + err.context);
            });
        }
    },
});