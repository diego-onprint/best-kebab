import { createShopOrderModel } from "../models/new_shop_order.model.js"
import { io } from "../app.js"
import { sendOrderConfirmationMail } from "../utils/sendOrderConfirmationMail.js"

const createOrder = async (req, res) => {
    try {
        const response = await createShopOrderModel.createOrder(req.body)
        io.emit("shop-order-created", { success: true, data: response })
        //Send mail to customer
        if (response.success ) {
            sendOrderConfirmationMail(response.data)
        }
        
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const createShopOrderController = {
    createOrder,
}