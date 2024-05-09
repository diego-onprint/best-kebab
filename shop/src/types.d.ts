export type ProductType = {
    id: number
    name: string
    price: number
    description?: string
    parent?: string
    variations: []
}

export type CartProductType = ProductType & { 
    uid: string
    qty: number
    notes: string
}

export type CartType = { 
    products: CartProductType[] 
    total: string
    totalProducts: number
}
