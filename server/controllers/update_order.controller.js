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

export const updateOrderController = {
    updateOrder
}