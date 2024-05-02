import { productsModel } from "../models/products.model.js"

const getAllProducts = async (req, res) => {
    try {
        const response = await productsModel.findAllProducts()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const response = await productsModel.findProductsByCategory(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}



export const productsController = {
    getAllProducts,
    getProductsByCategory,
}