import { productModel } from "../models/product.model.js"

const addProduct = async (req, res) => {

    const data = req.body

    try {
        const response = await productModel.addProduct(data)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const removeProduct = async (req, res) => {
    try {
        const response = await productModel.removeProduct(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateProduct = async (req, res) => {

    const data = req.body
    const id = req.params.id

    try {
        const response = await productModel.updateProduct(id, data)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

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
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
}