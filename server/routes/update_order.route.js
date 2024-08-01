import { Router } from "express"
import { updateOrderController } from "../controllers/update_order.controller.js"

const router = Router()

router.patch("/order-status/:id", updateOrderController.updateOrderStatus)
router.patch("/order-details/:id", updateOrderController.updateOrderDetails)
router.patch("/:id", updateOrderController.updateOrder)

export default router