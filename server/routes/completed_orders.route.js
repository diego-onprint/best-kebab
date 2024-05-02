import { Router } from "express"
import { completedOrdersController } from "../controllers/completed_orders.controller.js"

const router = Router()

router.get("/", completedOrdersController.getAllCompletedOrders)

export default router