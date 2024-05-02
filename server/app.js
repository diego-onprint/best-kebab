import "dotenv/config"
import express from "express"
import productsRoute from "./routes/products.route.js"
import categoriesRoute from "./routes/categories.route.js"
import tablesRoute from "./routes/tables.route.js"
import orderRoute from "./routes/order.route.js"
import checkoutRoute from "./routes/checkout.route.js"
import completedOrdersRoute from "./routes/completed_orders.route.js"
import { Server } from "socket.io"
import { createServer } from "http"
import cors from "cors"

const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use("/api/products", productsRoute)
app.use("/api/categories", categoriesRoute)
app.use("/api/tables", tablesRoute)
app.use("/api/order", orderRoute)
app.use("/api/checkout", checkoutRoute)
app.use("/api/completed-orders", completedOrdersRoute)

io.on("connection", socket => {
    console.log("User connected - Server")
    io.emit("on-connect", { success: true })
})

httpServer.listen(8080, () => {
    console.log("server started at 8080")
})