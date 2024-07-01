import { removeOrderModel } from "../models/remove_order.model.js"

const removeOrder = async (req, res) => {
    try {
        const response = await removeOrderModel.removeOrder(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: true, msg: err })
    }
}

export const removeOrderController = {
    removeOrder,
}