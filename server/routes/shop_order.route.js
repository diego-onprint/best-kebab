import { Router } from "express"
import { shopOrderController } from "../controllers/shop_order.controller.js"

const router = Router()

router.patch("/:id", shopOrderController.updateOrderFromShop)

export default router