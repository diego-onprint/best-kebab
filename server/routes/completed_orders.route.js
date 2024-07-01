import { Router } from "express"
import { completedOrdersController } from "../controllers/completed_orders.controller.js"

const router = Router()

router.delete("/delete/:id", completedOrdersController.deleteCompletedOrder)
router.delete("/delete-old-orders/", completedOrdersController.deleteOldDeletedOrders)
router.patch("/update-status/:id", completedOrdersController.updateOrderStatus)
router.get("/", completedOrdersController.getAllCompletedOrders)

export default router