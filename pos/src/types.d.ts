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
export type PaymentOptions = "kasse" | "kredikarte"

export type OrderTypes = "delivery" | "takeaway" | "tisch"

export type TicketDataType = {
    paymentMethod: PaymentOptions
    orderType: OrderTypes
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