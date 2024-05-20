import { productModel } from "../models/product.model.js"

const getProductById = async (req, res) => {
    try {

        if(req.params.id) {
            const response = await productModel.findProductById(req.params.id)
            res.status(200).json(response)
        } else {
            res.status(200)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const productController = {
    getProductById
}