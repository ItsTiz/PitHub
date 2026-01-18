import { io } from "socket.io-client";

//TODO this will be critical for auth
// { 
//   autoConnect: false 
// }

export const socket = io();