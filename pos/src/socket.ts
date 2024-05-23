import { io } from "socket.io-client";

// undefined if server and client run on same server/url
// else can use url as https://onprintpos.diegoui.com.ar

// Prod
const URL = "https://demo-pos-back.smart-pos.ch";

// Dev
// const URL = "http://localhost:8083"

export const socket = io(URL);
