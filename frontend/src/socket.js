import { io } from "socket.io-client";
import { useAuthStore } from './stores/auth'

//add the notification 

export const socket = io(import.meta.env.VITE_SERVER_URL, {  
    autoConnect: false ,
    auth: (callBack) => {
        const auth = useAuthStore()
        callBack({ token: auth.token })    
    }
});