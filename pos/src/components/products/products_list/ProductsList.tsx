import { useGetAllProductsQuery, useGetProductsByCategoryQuery } from "../../../store/api/apiSlice"
import ProductCard from "../product_card/ProductCard"
import Spinner from "../../common/spinner/Spinner"

const ProductsList = ({ id }: { id: string | undefined }) => {

    const { data, error, isFetching } = useGetProductsByCategoryQuery(id)
    // const { data, error, isFetching } = useGetAllProductsQuery()

    //case not found -404- or sorts
    if (error) throw Error

    return (
        <>
            {
                !isFetching ?
                    <div className="grid grid-cols-12 gap-2 py-2">
                        {data.map(product => <ProductCard key={product.id} product={product} />)}
                    </div> :
                    <div className="flex-1 grid place-items-center">
                        <Spinner color="text-zinc-300" />
                    </div>
            }
        </>
    )
}

export default ProductsList