import "dotenv/config";
import express from "express";
import productRoute from "./routes/product.route.js";
import productsRoute from "./routes/products.route.js";
import categoriesRoute from "./routes/categories.route.js";
import updateOrderRoute from "./routes/update_order.route.js";
import shopOrderRoute from "./routes/shop_order.route.js";
import ordersRoute from "./routes/orders.route.js";
import newOrderRoute from "./routes/new_order.route.js";
import deleteOrderRoute from "./routes/delete_order.route.js";
import callStaffRoute from "./routes/call_staff.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import completedOrdersRoute from "./routes/completed_orders.route.js";
import reportsRoute from "./routes/reports.route.js";
import newShopOrderRoute from "./routes/new_shop_order.route.js";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { pool } from "./db/connection.js";

const PORT = 8108;
const app = express();
const corsOptions = {
  origin: "*",
  // origin: "http://localhost:5178/",
  // credentials: true
}

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("dist"));

app.use("/api/product", productRoute);
app.use("/api/products", productsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/new-order", newOrderRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/delete-order", deleteOrderRoute);
app.use("/api/reports", reportsRoute);


app.use("/api/update-order", updateOrderRoute);
app.use("/api/shop-order", shopOrderRoute);
app.use("/api/call-staff", callStaffRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/completed-orders", completedOrdersRoute);
app.use("/api/new-shop-order", newShopOrderRoute);

app.use("/", (req, res) => {
  pool.query("SELECT NOW()", (err, result) => {
    if (err) {
      res.json({ message: "API is not running...", success: false });
    } else {
      res.json({ message: "API is running...", success: true });
    }
  });
});

io.on("connection", (socket) => {

  console.log("User connected - Server");

  io.emit("on-connect", { success: true });

  // Receive data from client
  socket.on('order-status-updated', (data) => {
    console.log("WORkING>")
    // Send data back to the client
    io.emit('update-order-view', { success: true });
  });

});

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
