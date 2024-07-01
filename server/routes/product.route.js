import { Router } from "express"
import { productController } from "../controllers/product.controller.js"

const router = Router()

router.post("/", productController.addProduct)
router.get("/:id", productController.getProductById)
router.delete("/:id", productController.removeProduct)
router.patch("/:id", productController.updateProduct)

export default router