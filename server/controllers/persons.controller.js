import { personsModel } from "../models/persons.model.js"

const getAllPersons = async (_, res) => {
    try {
        const response = await personsModel.findAllPersons()
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

export const personsController = {
    getAllPersons,
}