import { io } from "socket.io-client";
import { useAuthStore } from './stores/auth'

export const socket = io({ 
    path: '/socket.io',
    autoConnect: false,
    transports: ['websocket', 'polling'],
    auth: (callBack) => {
        const auth = useAuthStore()
        callBack({ token: auth.token })    
    }
});