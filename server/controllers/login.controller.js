import { loginModel } from "../models/login.model.js"

const login = async (req, res) => {
    try {
        const response = await loginModel.login(req.body)

        res
        .cookie('refresh_token', response.tokens.refreshToken, { httpOnly: true })
        .status(200)
        .json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const loginController = {
    login
}