import { completedOrdersModel } from "../models/completed_orders.model.js"

const getAllCompletedOrders = async (req, res) => {
    try {
        const response = await completedOrdersModel.findAllCompletedOrders()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const completedOrdersController = {
    getAllCompletedOrders,
}