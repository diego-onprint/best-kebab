import { tablesModel } from "../models/tables.model.js"

const getAllTables = async (_, res) => {
    try {
        const response = await tablesModel.findAllTables()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

export const tablesController = {
    getAllTables,
}