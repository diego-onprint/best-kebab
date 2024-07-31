import { io } from "socket.io-client"

// Prod
// const URL = "https://best-kebab-server.smart-pos.ch/"

// Dev
const URL = "http://localhost:8108"

export default io(URL)
