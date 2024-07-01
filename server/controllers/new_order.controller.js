import { createOrderModel } from "../models/new_order.model.js"

const createOrder = async (req, res) => {

    try {
        const response = await createOrderModel.createOrder(req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateClientData = async (req, res) => {
    try {
        const response = await createOrderModel.updateClientData(req.params.id, req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const createOrderController = {
    createOrder,
    updateClientData
}