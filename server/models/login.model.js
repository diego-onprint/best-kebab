import { pool } from "../db/connection.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = "kfh32jh87sohfdoas6f"
const REFRESH_TOKEN_SECRET = "ueyoqertkj3h476jklhfd"

const login = async (data) => {

    const { username, password } = data

    try {

        const query = "SELECT * FROM users WHERE username = $1"
        const { rows } = await pool.query(query, [username])

        if (!rows[0]) return { error: true, msg:"No user found", status: 401 }

        // Hash psw for registration n write to db the hashed
        // const hashedPass = await bcrypt.hash(password, 10)
        // console.log(hashedPass)

        const validPass = await bcrypt.compare(password, rows[0].passhash)

        if (!validPass) return { error: true, msg: "Incorrect Password", status: 401 }

        const payload = { user: username }
        const accessToken = jwt.sign( payload, ACCESS_TOKEN_SECRET, { expiresIn: "20s"})
        const refreshToken = jwt.sign( payload, REFRESH_TOKEN_SECRET, { expiresIn: "5m"})

        return { success: true, tokens: { accessToken, refreshToken }, username: rows[0].username }

    } catch (err) {
        console.log(err)
        return { error: true, msg: err }
    }
}

export const loginModel = {
    login,
}