import { Router } from "express"
import { ordersController } from "../controllers/orders.controller.js"

const router = Router()

router.get("/tables", ordersController.getTablesOrders)
router.get("/takeaway", ordersController.getTakeawayOrders)
router.get("/:id", ordersController.getOrderById)
router.get("/:id", ordersController.getOrderById)
router.get("/", ordersController.getOrderById)
router.patch("/:id", ordersController.updateOrderPrintedProducts)

export default router