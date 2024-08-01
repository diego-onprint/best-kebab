import { Router } from "express"
import { reportsController } from "../controllers/reports.controller.js"

const router = Router()

router.get("/last-month", reportsController.getOrdersLastMonth)
router.get("/current-week", reportsController.getOrdersCurrentWeek)
router.get("/current-day", reportsController.getOrdersCurrentDay)
router.get("/last-year", reportsController.getOrdersLastYear)
router.post("/custom", reportsController.getOrdersBetweenDates)

export default router