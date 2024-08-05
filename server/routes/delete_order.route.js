import { Router } from "express"
import { deleteOrderController } from "../controllers/delete_order.controller.js"

const router = Router()

router.delete("/:id", deleteOrderController.deleteOrder)

export default router