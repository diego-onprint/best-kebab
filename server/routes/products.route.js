import { Router } from "express"
import { productsController } from "../controllers/products.controller.js"

const router = Router()

router.get("/", productsController.getAllProducts)

router.get("/:id", productsController.getProductsByCategory)

export default router