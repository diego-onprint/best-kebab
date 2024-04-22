export type Product = {
    id: number
    name: string
    price: string
    images: ProductImage[]
    variations: number[]
    timestamp: string
}

export type Category = {
    id: number
    name: string
    slug: string
    image: ProductImage
    description: string
}

type ProductImage = {
    id: number
    src: string
    alt: string
}

//CART
export type Cart = {
    products: CartProduct[]
    total: string
}

export type CartProduct = Product & { 
    uid: string
    qty: number 
    variation: CartProductVariation
    notes: string
}

export type CartProductId = CartProduct["id"]
export type CartTotal = Cart["total"]

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

export type WooOrder = {
    billing: {
        first_name: string
        last_name?: string
        address_1?: string
        addres_2?: string
        city?: string
        company?: string
        country?: string
        email?: string
        phone?: string
        postcode?: string
        state?: string
    }
    date_crated?: string
    line_items: WooItem[]
    number: string
    payment_method_title: string
    billing?: {
        first_name: string
        last_name?: string
        address_1?: string
        addres_2?: string
        city?: string
        company?: string
        country?: string
        email?: string
        phone?: string
        postcode?: string
        state?: string
    }
}

export type WooItem = {
    id: number
    name: string
    price: number
    total: string
    meta_data: {
        id: number
        key: string
        value: string
    }
}

export type NewOrderNotification = {
    showNotification: boolean
    newOrders: Order[]
}
