import { completedOrdersModel } from "../models/completed_orders.model.js"

const getAllCompletedOrders = async (req, res) => {

    try {

        let response

        if (!!req.query.page && !!req.query.limit) {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            response = await completedOrdersModel.findSomeCompletedOrders(page, limit)

        } else {

            response = await completedOrdersModel.findAllCompletedOrders()
        }

        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// const deleteCompletedOrder = async (req, res) => {
//     try {

//         const response = completedOrdersModel.deleteCompletedOrder(req.params.id)
//         res.status(200).json(response)

//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// }

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

const getCompletedOrderById = async (req, res) => {
    try {
        const response = await completedOrdersModel.findCompletedOrderById(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteCompletedOrder = async (req, res) => {
    try {
        const response = await completedOrdersModel.deleteCompletedOrder(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: true, msg: err })
    }
}

const updateCompletedOrderDetails = async (req, res) => {
    try {
        const response = await completedOrdersModel.updateCompletedOrderDetails(req.params.id, req.body)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: true, msg: err })
    }
}

const updateCompletedOrderProducts = async (req, res) => {
    try {
        const response = await completedOrdersModel.updateCompletedOrderProducts(req.params.id, req.body)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: true, msg: err })
    }
}


export const completedOrdersController = {
    getAllCompletedOrders,
    updateOrderStatus,
    deleteOldDeletedOrders,
    getCompletedOrderById,
    deleteCompletedOrder,
    updateCompletedOrderDetails,
    updateCompletedOrderProducts,
}