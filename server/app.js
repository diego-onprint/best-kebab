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
app.use(express.json());

//FOR PROD
const io = new Server(httpServer)
app.use(express.static('dist'))

//FOR DEV
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:5173"
//     }
// })

io.on("connection", socket => {
    console.log("user connected")
})

const categories = [
    {
        id: "vorspeisen",
        name: "Vorspeisen",
        parent: "pos",
    },
    {
        id: "salat",
        name: "Salat",
        parent: "pos",
    },
    {
        id: "hahnchen",
        name: "Hähnchen",
        parent: "pos",
    },
    {
        id: "burgers",
        name: "Burgers",
        parent: "pos",
        subcategories: true,
    },
    {
        id: "rosti",
        name: "Rösti",
        parent: "burgers"
    },
    {
        id: "burger",
        name: "Burger",
        parent: "burgers"
    },
    {
        id: "veggie",
        name: "Veggie",
        parent: "burgers"
    },
    {
        id: "xl",
        name: "XL",
        parent: "burgers"
    }
]

const products = [
    {
        id: "chili-cheese-habanero-rosti",
        name: "Chili-Cheese Habanero Rösti",
        description: "Hamburgerbrot mit Sesam, Rösti- Patties, Salat, Guacamole, Cheddar-Käse, Chili-Cheese Habanerossauce, Jalapeños",
        price: 29,
        variations: [
            {
                id: "extrawunsch",
                name: "Extrawunsch",
                options: [
                    {
                        id: "zwiebelringe",
                        name: "Zwiebelringe",
                        price: 2,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "essiggurke",
                        name: "Essiggurke",
                        price: 2,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "raclettekaese",
                        name: "Raclettekäse",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "karamellisierte-zwiebel",
                        name: "karamellisierte Zwiebel",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "honig",
                        name: "Honig",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "lattichstreifen",
                        name: "Lattichstreifen",
                        price: 2,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "tomate",
                        name: "Tomate",
                        price: 2,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "feta-ziegenkase",
                        name: "Feta-Ziegenkäse",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "cheddar",
                        name: "Cheddar",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "rosti-pattie",
                        name: "Rösti-Pattie",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "jalapenos",
                        name: "Jalapenos",
                        price: 2,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "rucola",
                        name: "Rucola",
                        price: 2,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "spiegelei-freiland",
                        name: "Spiegelei (Freiland)",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "walnuss",
                        name: "Walnuss",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                    {
                        id: "speck",
                        name: "Speck",
                        price: 3,
                        // parent: "extrawunsch"
                    },
                ]
            },
            {
                id: "saucen",
                name: "Saucen",
                options: [
                    {
                        id: "honig-senf",
                        name: "Honig-Senf",
                        price: 3.5,
                        parent: "saucen",
                    },
                    {
                        id: "leicht-scharfe-barbecue",
                        name: "Leicht scharfe Barbecue",
                        price: 3.5,
                        parent: "saucen",
                    },
                    {
                        id: "cocktailsauce",
                        name: "Cocktailsauce",
                        price: 3.5,
                        parent: "saucen",
                    },
                    {
                        id: "guacamole",
                        name: "Guacamole",
                        price: 3.5,
                        parent: "saucen",
                    },
                    {
                        id: "knoblauch",
                        name: "Knoblauch",
                        price: 3.5,
                        parent: "saucen",
                    },
                ]
            },
            {
                id: "beilage",
                name: "Beilage",
                options: [
                    {
                        id: "supper-dipperfrites",
                        name: "Supper Dipperfrites",
                        price: 8.9,
                        parent: "beilage",
                    },
                    {
                        id: "kleine-portion-susskartoffelpommes ",
                        name: "Kleine Portion Süsskartoffelpommes ",
                        price: 6.5,
                        parent: "beilage",
                    },
                    {
                        id: "truffelol",
                        name: "Trüffelöl",
                        price: 2,
                        parent: "beilage",
                    },
                    {
                        id: "Kleine Supper Dipperfrites",
                        name: "Kleine Supper Dipperfrites",
                        price: 5.5,
                        parent: "beilage",
                    },
                    {
                        id: "gemischter-gruner-salat",
                        name: "gemischter grüner Salat",
                        price: 3.5,
                        parent: "beilage",
                    },
                    {
                        id: "susskartoffelpommes",
                        name: "Süsskartoffelpommes",
                        price: 9.9,
                        parent: "beilage",
                    },
                    {
                        id: "rostipommes",
                        name: "Röstipommes",
                        price: 10.9,
                        parent: "beilage",
                    },
                    {
                        id: "kleine-portion-rostipommes",
                        name: "Kleine Portion Röstipommes",
                        price: 3.5,
                        parent: "beilage",
                    },
                ]
            },
        ],
        parent: "rosti"
    },
    {
        id: "handwerker-rosti",
        name: "Handwerker Rösti",
        description: "Hamburgerbrot mit Sesam, Rösti- Patties, Zwiebelwürfel, 2x Cheddar-Käse, Salat und Cocktailsauce",
        price: 23.9,
        variations: [],
        parent: "rosti"
    },
    {
        id: "krautergarten-rosti",
        name: "Kräutergarten Rösti",
        description: "Brot mit Sesam, Rösti- Patties, Rucola, Tomate, Walnüsse, karamellisierte Zwiebeln, Hirtenkäse, Honig-Senfsauce",
        price: 27.9,
        variations: [],
        parent: "rosti"
    },
]

// CATEGORIES
app.get("/api/categories", async (req, res) => {
    const parentCategories = categories.filter(category => {
        return category.parent === "pos"
    })
    res.status(200).send({ categories: parentCategories })
})

app.get("/api/subcategories/:id", async (req, res) => {

    const subcategories = categories.filter(category => {
        return category.parent === req.params.id
    })

    res.status(200).send({ subcategories: subcategories })
})

app.get("/api/products/:id", async (req, res) => {

    const filteredProducts = products.filter(category => {
        return category.parent === req.params.id
    })

    res.status(200).send({ products: filteredProducts })
})

// CRETE NEW LOCAL ORDER
app.post("/api/new-local-order", async (req, res) => {

    // create woo order
    const url = `${baseUrl}orders`

    let result

    const data = req.body

    const order = {
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true,
        billing: {
            first_name: data.customer,
        },
        shipping: {
            first_name: "test - local order",
        },
        line_items: data.products,
    }

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








////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// PRODUCTS BY CATEGORY
// app.get("/api/products/:id", async (req, res) => {

//     const url = `${baseUrl}products?category=${req.params.id}&per_page=100`
//     let result

//     try {

//         const wooResponse = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Basic ${auth}`,
//             },
//         })

//         result = await wooResponse.json()

//     } catch (err) {

//         res.status(500).send({ ok: false, msg: err })

//     }

//     res.status(200).send({ products: result })
// })

// // PRODUCT VARIATION
// app.get("/api/product-variation/:id", async (req, res) => {

//     const url = `${baseUrl}products/${req.params.id}/variations`
//     let result

//     try {

//         const wooResponse = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Basic ${auth}`,
//             },
//         })

//         result = await wooResponse.json()

//     } catch (err) {

//         res.status(500).send({ ok: false, msg: err })

//     }

//     res.status(200).send({ variations: result })
// })

// // CATEGORIES
// app.get("/api/categories/:id", async (req, res) => {

//     // 18 IS THE DEFAULT PARENT CATEGORY FOR POS CATEGORIES
//     const parent = req.params.id === "undefined" ? 18 : req.params.id
    
//     const url = `${baseUrl}products/categories?per_page=100&parent=${parent}`
//     let result

//     try {

//         const wooResponse = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Basic ${auth}`,
//             },
//         })

//         result = await wooResponse.json()

//     } catch (err) {

//         res.status(500).send({ ok: false, msg: err })

//     }

//     res.status(200).send({ categories: result })
// })

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

// GET ORDERS
app.get("/api/orders", async (req, res) => {

    const url = `${baseUrl}orders?page=${req.query.page}&per_page=20`
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


// CRETE NEW ORDER
app.post("/api/new-order", async (req, res) => {

    // create woo order
    const url = `${baseUrl}orders`

    let result

    //req.body schema:
    // {
    //     products: [],
    //     isStore: true/false
    //     storeId: store1/store2... //define printer
    // }

    const data = req.body

    // TODO format order
    const order = {
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true,
        billing: {
            first_name: data.customer,
            // last_name: 'Doe',
            // address_1: '969 Market',
            // address_2: '',
            // city: 'San Francisco',
            // state: 'CA',
            // postcode: '94103',
            // country: 'US',
            // email: 'john.doe@example.com',
            // phone: '(555) 555-5555',
        },
        shipping: {
            first_name: data.customer,
            // last_name: 'Doe',
            address_1: data.address,
            // address_2: '',
            city: data.city,
            // state: 'CA',
            postcode: data.postcode,
            country: data.country,
        },
        line_items: data.products
    }

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

    io.emit("new-order", { success: true, data: result })

    res.send({ ok: true, result: result }).status(200)
})

// // CRETE NEW LOCAL ORDER
// app.post("/api/new-local-order", async (req, res) => {

//     // create woo order
//     const url = `${baseUrl}orders`

//     let result

//     const data = req.body

//     console.log("DATA.....", data)

//     // TODO format order
//     const order = {
//         payment_method: 'bacs',
//         payment_method_title: 'Direct Bank Transfer',
//         set_paid: true,
//         billing: {
//             first_name: data.customer,
//         },
//         shipping: {
//             first_name: data.table,
//         },
//         line_items: data.products,
//     }

//     try {

//         const wooResponse = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Basic ${auth}`,
//             },
//             body: JSON.stringify(order),
//         })

//         result = await wooResponse.json()

//     } catch (err) {

//         res.status(500).send({ ok: false, msg: err })

//     }

//     io.emit("new-local-order", { success: true, data: result })

//     res.send({ ok: true, result: result }).status(200)
// })

httpServer.listen(8080, () => {
    console.log("server started at 8080")
})