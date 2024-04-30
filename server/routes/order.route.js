import { Router } from "express"
import { orderController } from "../controllers/order.controller.js"

const router = Router()

router.get("/:id", orderController.getOrderById)
router.get("/", orderController.getOrderById)
router.put("/:id", orderController.updateOrder)

export default router