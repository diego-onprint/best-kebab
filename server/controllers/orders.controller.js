import { ordersModel } from "../models/orders.model.js"

const getOrdersByPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const condition = req.query.condition
        const response = await ordersModel.getOrdersByPage(page, limit, condition)
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const response = await ordersModel.getAllOrders()
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

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
    getOrdersByPage,
    getAllOrders,

    getTablesOrders,
    getTakeawayOrders,
    getOrderById,
    updateOrderPrintedProducts,
}