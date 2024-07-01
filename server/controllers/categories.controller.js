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

const createCategory = async (req, res) => {
    try {
        const response = await categoriesModel.createCategory(req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const response = await categoriesModel.deleteCategory(req.params.id)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const categoriesController = {
    getCategories,
    createCategory,
    deleteCategory,
}