import { Router } from "express"
import { personsController } from "../controllers/persons.controller.js"

const router = Router()

router.get("/", personsController.getAllPersons)

export default router