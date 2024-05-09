import type { ProductType } from "../../types"
import { formatPrice } from "../../utils/formatPrice"

type PropsTypes = {
    product: ProductType
}

const ProductDetail = ({ product }: PropsTypes) => {
    return (
        <div className="bg-white rounded-md overflow-hidden">
            <img className="w-full h-36 object-cover" src="/product-placeholder.jpg" alt="" />
            <div className="p-4">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-zinc-700">{product.description.length > 0 ? product.description : product.name}</p>
                <p className="font-semibold">CHF. {formatPrice(product.price)}</p>
            </div>
        </div>
    )
}

export default ProductDetail