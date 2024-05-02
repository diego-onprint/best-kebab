import { checkoutModel } from "../models/checkout.model.js"

const createOrder = async (req, res) => {
    try {
        const response = await checkoutModel.postOrder(req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const checkoutController = {
    createOrder,
}