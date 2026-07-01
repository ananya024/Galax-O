// socket.js

import { io } from "socket.io-client";

export function connectSocket(token){
    // const token = localStorage.getItem("token");
    // console.log("socket got token: ", token);
    // const socket=io("http://localhost:3000", {auth:{token:token}});
    const socket=io(import.meta.env.VITE_SOCKET_URL, {auth:{token:token}});

    socket.on("connect", ()=>{
        // console.log("frm sockettttt connected: ", socket.id);
    })

    return socket;
}
