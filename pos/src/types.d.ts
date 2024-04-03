export type Product = {
    id: number
    name: string
    price: string
    images: ProductImage[]
    variations: number[]
}

export type Category = {
    id: number
    name: string
    slug: string
    image: ProductImage

}

type ProductImage = {
    id: number
    src: string
    alt: string
}

//CART
export type CartProduct = Pick<Product, 'id' | 'name' | 'price'> & { 
    qty: number 
    variation: ProductVariation
}

export type Cart = {
    products: CartProduct[]
    total: string
}

export type CartProductId = CartProduct["id"]
export type CartTotal = Cart["total"]


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