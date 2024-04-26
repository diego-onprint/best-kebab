import "dotenv/config"
import express from "express"
import productsRoute from "./routes/products.route.js"
import categoriesRoute from "./routes/categories.route.js"
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use("/api/products", productsRoute)
app.use("/api/categories", categoriesRoute)

io.on("connection", socket => {
    console.log("User connected - Server")
    io.emit("on-connect", { success: true })
})

httpServer.listen(8080, () => {
    console.log("server started at 8080")
})