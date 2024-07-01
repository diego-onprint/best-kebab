import { remoteShopOrderModel} from "../models/remote_shop_order.model.js"
import { io } from "../app.js"

const createRemoteShopOrder = async (req, res) => {
    try {
        const response = await remoteShopOrderModel.createOrder(req.params.id, req.body)
        io.emit("on-order-update", { success: true, response })
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const remoteShopOrderController = {
    createRemoteShopOrder,
}