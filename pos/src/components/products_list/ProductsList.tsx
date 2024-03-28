import { useGetProductsByCategoryQuery } from "../../store/api/apiSlice"
import ProductCard from "../product_card/ProductCard"

const ProductsList = ({ id }: { id: string | undefined }) => {

    const { data, error } = useGetProductsByCategoryQuery(id)

    //case not found -404- or sorts
    if (error) throw Error
    
    return (
        <div className="grid grid-cols-12 gap-2 py-2">
            {data?.products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
    )
}

export default ProductsList