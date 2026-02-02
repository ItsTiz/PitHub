import { defineStore } from "pinia";
import { socket } from "@/socket";

export const useConnectionStore = defineStore("connection", {
    state: () => ({
        isConnected: false,
    }),

    actions: {
        initListeners() {
            socket.on("connect", () => {
                this.isConnected = true;
            });

            socket.on("disconnect", () => {
                this.isConnected = false;
            });

            if (import.meta.env.VITE_ENABLE_DEBUGGING==='true') {
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