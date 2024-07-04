import { Router } from "express"
import { completedOrdersController } from "../controllers/completed_orders.controller.js"

const router = Router()

router.get("/", completedOrdersController.getAllCompletedOrders)
router.get("/:id", completedOrdersController.getCompletedOrderById)
router.patch("/products/:id", completedOrdersController.updateCompletedOrderProducts)
router.patch("/details/:id", completedOrdersController.updateCompletedOrderDetails)
router.patch("/update-status/:id", completedOrdersController.updateOrderStatus)
router.delete("/:id", completedOrdersController.deleteCompletedOrder)
router.delete("/delete-old-orders/", completedOrdersController.deleteOldDeletedOrders)

export default router