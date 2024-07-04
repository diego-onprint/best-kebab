import { io } from "socket.io-client"

// Prod
const URL = "https://beirut-back.smart-pos.ch/"

// Dev
// const URL = "http://localhost:8083"

export const socket = io(URL)
