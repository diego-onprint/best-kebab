export type Category = {
    uid: number
    id: string
    name: string
    parent_category: string
    subcategories: boolean
}

export type Product = {
    id: number
    name: string
    price: number
    parent_category: string
    description?: string
    stock?: number
    variations?: ProductVariation[]
}

export type ProductVariation = {
    variation_id: string
    variation_value: string
    variation_price: number
    variation_parent: string
}

export type CartProduct = Product & {
    uid: string
    qty: number
    notes?: string | undefined
}

export type Cart = {
    products: CartProduct[]
    total: string
}

export type CurrentOrder = {
    currentOrderId: string
}

export type CompletedOrder = {
    created_by: string
    status: { 
        name: string
        value: string
    }
    date_created: string
    order_name: string
    cart: Cart
    customer: CustomerData
}

export type CustomerData = {
    name?: string
    surname?: string
    address?: string
    city?: string
    postcode?: string
    phone?: string
    email?: string
    paymentMethod?: PaymentMethod
    notes?: string
}

export type PaymentMethod = {
    name: "Barzahlung" | "Kredikarten" | "Twint" | "Lunchcheck"
    value: "cash" | "credit" | "twint" | "lunchcheck"
}

export type TicketType = "shop" | "kitchen" | "shopSelection" | "kitchenSelection" | null

export type OrderType = {
    value: "tisch" | "lieferung"
    name: "Tisch" | "Lieferung"
}

///////////////////////////////////////////
////////////////////////////////// CLEANUP
//////////////////////////////////////////

type ProductImage = {
    id: number
    src: string
    alt: string
}

export type CartProductVariation = {
    id: string
    name: string
    parent: string
    price: number
    timestamp: string
}

// TICKET
export type TicketDataType = {
    paymentMethod: {
        name: "Kreditkarten" | "Barzahlung" | "Twint"
        value: "credit" | "cash" | "twint"
    }
    orderType: {
        name: "Lieferung" | "Abholung" | "Tisch"
        value: "delivery" | "takeaway" | "tisch"
    }
}

// API STORE
export type ProductVariationResponse = {
    variations: ProductVariation[]
}

export type ProductVariation = {
    attributes: { id: number, name: string, option: string }[]
    description: string
    id: number
    price: string
}

// TABLES
export type Tables = {
    tables: Table[]
    activeTable: Table["id"]
}

export type Table = {
    cart: Cart
    id: number
    capacity: number
    name: string
}

// ORDERS
export type Order = {
    id: number
}

export type NewOrderNotification = {
    showNotification: boolean
    newOrders: Order[]
}
