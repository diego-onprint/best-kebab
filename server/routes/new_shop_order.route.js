import { Router } from "express"
import { createShopOrderController } from "../controllers/new_shop_order.controller.js"

const router = Router()

router.post("/", createShopOrderController.createOrder)

export default router