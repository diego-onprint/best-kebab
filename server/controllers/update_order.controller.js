import { updateOrderModel } from "../models/update_order.model.js"

const updateOrder = async (req, res) => {

    try {
        const response = await updateOrderModel.updateOrder(req.params.id, req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateOrderStatus = async (req, res) => {

    try {
        const response = await updateOrderModel.updateOrderStatus(req.params.id, req.body.status)
        res.status(200).json(response)
    } catch {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateOrderDetails = async (req, res) => {
    try {
        const response = await updateOrderModel.updateOrderDetails(req.params.id, req.body.details)
        res.status(200).json(response)
    } catch {
        console.log(err)
        res.status(500).json(err)
    }
}


export const updateOrderController = {
    updateOrder,
    updateOrderStatus,
    updateOrderDetails,
}