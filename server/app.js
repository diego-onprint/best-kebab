require('dotenv').config()
const express = require("express")
const { Server } = require("socket.io")
const { createServer } = require("http")
const cors = require("cors")

const app = express()
const httpServer = createServer(app)

// WOOCOMMERCE CERT
const baseUrl = process.env.STORE_URL
const ck = process.env.WOO_CONSUMER_KEY
const cs = process.env.WOO_SECRET_KEY
const auth = btoa(`${ck}:${cs}`)

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

//FOR PROD
// const io = new Server(httpServer)

//FOR DEV
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const categories = require("./data/categories")

const products = require("./data/products")

// CATEGORIES
app.get("/api/categories", async (req, res) => {
    const parentCategories = categories.filter(category => {
        return category.parent === "pos"
    })
    res.status(200).send({ categories: parentCategories })
})

// SUBCATEGORIES
app.get("/api/subcategories/:id", async (req, res) => {

    const subcategories = categories.filter(category => {
        return category.parent === req.params.id
    })

    res.status(200).send({ subcategories: subcategories })
})

// PRODUCTS
app.get("/api/products/:id", async (req, res) => {

    const filteredProducts = products.filter(category => {
        return category.parent === req.params.id
    })

    res.status(200).send({ products: filteredProducts })
})

app.get("/api/orders", async (req, res) => {

    const url = `${baseUrl}orders?page=${req.query.page}&per_page=10`
    const nextPage = parseInt(req.query.page) + 1
    const nextUrl = `${baseUrl}orders?page=${nextPage}`

    let orders
    let hasNextPage

    try {

        const wooResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        })

        orders = await wooResponse.json()

        const nextResponse = await fetch(nextUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        })

        const nextResult = await nextResponse.json()

        hasNextPage = nextResult.length > 0

    } catch (err) {

        res.status(500).send({ ok: false, msg: err })
    }

    res.status(200).send({ orders: orders, hasNextPage })
})

// SALES REPORT
app.get("/api/sales-reports", async (req, res) => {

    const queryString = Object.entries(req.query).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')

    const url = `${baseUrl}reports/sales?${queryString}`
    let result

    try {

        const wooResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        })

        result = await wooResponse.json()

    } catch (err) {

        res.status(500).send({ ok: false, msg: err })

    }

    res.status(200).send({ summary: result[0] })
})

// TOTAL ORDERS
app.get("/api/total-orders-report", async (req, res) => {

    const url = `${baseUrl}reports/orders/totals`
    let result

    try {

        const wooResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        })

        result = await wooResponse.json()

    } catch (err) {

        res.status(500).send({ ok: false, msg: err })
    }

    res.status(200).send({ data: result })
})

// CRETE NEW LOCAL ORDER
app.post("/api/new-local-order", async (req, res) => {

    // create woo order
    const url = `${baseUrl}orders`

    let result

    const order = req.body

    try {

        const wooResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`,
            },
            body: JSON.stringify(order),
        })

        result = await wooResponse.json()

    } catch (err) {

        res.status(500).send({ ok: false, msg: err })
    }

    res.send({ ok: true, result: result }).status(200)
})

app.get("/api/new-order-webhook", async (req, res) => {

    io.emit("new-order", { success: true })

    res.status(200).send({ success: true })
})

io.on("connection", socket => {
    console.log("User connected - Server")
    io.emit("on-connect", { success: true })
})


httpServer.listen(8080, () => {
    console.log("server started at 8080")
})