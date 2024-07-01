import { shopOrderModel } from "../models/shop_order.model.js"
import { io } from "../app.js"

const updateOrderFromShop = async (req, res) => {
    try {
        const response = await shopOrderModel.updateOrderFromShop(req.params.id, req.body)
        io.emit("qr-order-updated", { success: true, response })
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const shopOrderController = {
    updateOrderFromShop,
}