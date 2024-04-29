import { Router } from "express"
import { tablesController } from "../controllers/tables.controller.js"

const router = Router()

router.get("/", tablesController.getAllTables)

export default router