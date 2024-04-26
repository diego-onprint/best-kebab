import { categoriesModel } from "../models/categories.model.js"

const getCategories = async (req, res) => {
    try {
        const response = await categoriesModel.findCategories()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

export const categoriesController = {
    getCategories
}