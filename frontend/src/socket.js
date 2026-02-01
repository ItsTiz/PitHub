import { io } from "socket.io-client";

//TODO this will be critical for auth
// { 
//   autoConnect: false 
// }
//add the notification 

export const socket = io();