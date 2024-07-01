import { ordersModel } from "../models/orders.model.js"

const getTablesOrders = async (req, res) => {
    try {
        const response = await ordersModel.findTablesOrders()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

const getTakeawayOrders = async (req, res) => {
    try {
        const response = await ordersModel.findTakeawayOrders()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

const getOrderById = async (req, res) => {
    try {
        const response = await ordersModel.findOrderById(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

const updateOrderPrintedProducts = async (req, res) => {

    const { selectedProducts } = req.body

    try {
        const response = await ordersModel.updateOrderPrintedProducts(req.params.id, selectedProducts)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

export const ordersController = {
    getTablesOrders,
    getTakeawayOrders,
    getOrderById,
    updateOrderPrintedProducts,
}