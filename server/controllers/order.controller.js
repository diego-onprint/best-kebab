import { orderModel } from "../models/order.model.js"
import { io } from "../app.js"

const getOrderById = async (req, res) => {
    try {
        const response = await orderModel.findOrderById(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

const updateOrder = async (req, res) => {
    try {
        const response = await orderModel.updateOrder(req.params.id, req.body)
        io.emit("on-order-update", { success: true })
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

export const orderController = {
    getOrderById,
    updateOrder,
}