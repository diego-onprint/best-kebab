export type ProductType = {
    id: string
    name: string
    price: number
    images: ProductImage[]
    description: string
    parent: string
    variations: []
}

type ProductImage = {
    id: number
    src: string
    alt: string
}

export type Category = {
    id: string
    name: string
    parent: string
}

export type CartProduct = Product & { qty: number, localId: string }

export type Cart = { 
    products: CartProduct[] 
    total: string
    totalProducts: number
}

export type CartProductId = CartProduct["id"]
export type CartTotal = Cart["total"]
