import { Router } from "express"
import { callStaffController } from "../controllers/call_staff.controller.js"

const router = Router()

router.post("/:id", callStaffController.callStaff)

export default router
