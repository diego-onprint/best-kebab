import { deleteOrderModel } from "../models/delete_order.model.js"

const deleteOrder = async (req, res) => {
    try {
        const response = await deleteOrderModel.deleteOrder(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: true, msg: err })
    }
}

export const deleteOrderController = {
    deleteOrder,
}