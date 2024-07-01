import { Router } from "express"
import { remoteShopOrderController } from "../controllers/remote_shop_order.controller.js"

const router = Router()

router.post("/:id", remoteShopOrderController.createRemoteShopOrder)

export default router