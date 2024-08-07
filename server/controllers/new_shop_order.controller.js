import { createShopOrderModel } from "../models/new_shop_order.model.js"
import { io } from "../app.js"
import { storeSockets } from "../utils/storeSockets.js"
import { sendOrderConfirmationMail } from "../utils/sendOrderConfirmationMail.js"
import { sendWhatsAppConfirmationMessage } from "../utils/sendWhatsappConfirmationMessage.js"

const createOrder = async (req, res) => {
    try {
        const response = await createShopOrderModel.createOrder(req.body)

        io.emit("shop-order-created", { success: true, data: response })

        io
        .to(storeSockets.screen)
        .emit("update-screen", { success: true, message: "here" })

        //Send mail/message to customer
        if (!response.error ) {

            if (response.details.customer_data.email.length > 0) {
                sendOrderConfirmationMail(response)
            }

            if (response.details.customer_data.phone.length > 0) {
                sendWhatsAppConfirmationMessage(response.details.customer_data.phone, response.id)
            }
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