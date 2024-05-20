import { io } from "socket.io-client";

// undefined if server and client run on same server/url
// else can use url as https://onprintpos.diegoui.com.ar

// Prod
const URL = import.meta.env.DEV
  ? "https://demo-pos-back.smart-pos.ch"
  : "https://demo-pos-back.smart-pos.ch";

// const URL = import.meta.env.DEV
//   ? "http://localhost:8082/"
//   : "https://ceviche-back.qrbestellung.ch";

export const socket = io(URL);
