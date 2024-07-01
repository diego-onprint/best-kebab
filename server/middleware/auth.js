import jwt from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = "kfh32jh87sohfdoas6f"

export const auth = (req, res, next) => {
    // TODO solve the CORS issue and refactor to send token trhough credentials in header
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]

    // console.log(token)

    // if (!token) res.status(401).json({ error: true, msg: "No access token" })

    // jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {

    //     if (err) res.status(403).json({ error: true, msg: "Incorrect access token" })

    //     req.user = user

    //     next()
    // })
}