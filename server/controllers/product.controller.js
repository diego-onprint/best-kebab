import { productModel } from "../models/product.model.js"

const getProductById = async (req, res) => {
    try {
        const response = await productModel.findProductById(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const productController = {
    getProductById,
}