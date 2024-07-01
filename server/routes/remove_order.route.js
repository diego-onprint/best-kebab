import { Router } from "express"
import { removeOrderController } from "../controllers/remove_order.controller.js"

const router = Router()

router.delete("/:id", removeOrderController.removeOrder)

export default router