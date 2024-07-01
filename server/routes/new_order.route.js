import { Router } from "express"
import { createOrderController } from "../controllers/new_order.controller.js"

const router = Router()

router.post("/", createOrderController.createOrder)
router.patch("/:id", createOrderController.updateClientData)

export default router