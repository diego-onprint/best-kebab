import { reportsModel } from "../models/reports.model.js"

const getOrdersCurrentDay = async (req, res) => {
    try {
        const response = await reportsModel.getOrdersCurrentDay()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


const getOrdersCurrentWeek = async (req, res) => {
    try {
        const response = await reportsModel.getOrdersCurrentWeek()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


const getOrdersLastMonth = async (req, res) => {
    try {
        const response = await reportsModel.getOrdersLastMonth()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getOrdersLastYear = async (req, res) => {
    try {
        const response = await reportsModel.getOrdersLastYear()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


const getOrdersCurrentYear = async (req, res) => {
    try {
        const response = await reportsModel.getOrdersCurrentYear()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getOrdersBetweenDates = async (req, res) => {
    try {
        const response = await reportsModel.getOrdersBetweenDates(req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const reportsController = {
    getOrdersCurrentWeek,
    getOrdersLastMonth,
    getOrdersLastYear,
    getOrdersCurrentYear,
    getOrdersBetweenDates,
    getOrdersCurrentDay,
}