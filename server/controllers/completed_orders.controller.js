import { completedOrdersModel } from "../models/completed_orders.model.js"

const getAllCompletedOrders = async (req, res) => {

    try {

        let response

        if (!!req.query.page && !!req.query.limit) {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const status = req.query.status
            response = await completedOrdersModel.findSomeCompletedOrders(page, limit, status)

        } else {

            response = await completedOrdersModel.findAllCompletedOrders()
        }

        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteCompletedOrder = async (req, res) => {
    try {

        const response = completedOrdersModel.deleteCompletedOrder(req.params.id)
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const updateOrderStatus = async (req, res) => {

    try {

        const response = completedOrdersModel.updateOrderStatus(req.params.id, req.body)
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteOldDeletedOrders = async (req, res) => {
    try {
        const response = completedOrdersModel.deleteOldDeletedOrders()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


export const completedOrdersController = {
    getAllCompletedOrders,
    deleteCompletedOrder,
    updateOrderStatus,
    deleteOldDeletedOrders,
}