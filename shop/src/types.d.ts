export type Product = {
    id: number
    name: string
    price: string
    images: ProductImage[]
    description: string
}

type ProductImage = {
    id: number
    src: string
    alt: string
}

export type Category = {
    id: number
    name: string
    slug: string
    image: ProductImage
    
}

export type CartProduct = Product & { qty: number, localId: string }

export type Cart = { 
    products: CartProduct[] 
    total: string
    totalProducts: number
}

export type CartProductId = CartProduct["id"]
export type CartTotal = Cart["total"]
