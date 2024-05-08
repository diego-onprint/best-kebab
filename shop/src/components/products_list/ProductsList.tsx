import { useGetProductsByCategoryQuery } from "../../store/api/apiSlice"
import { useSearchParams } from "react-router-dom"
import { urlSearchParamsToObject } from "../../utils/urlSearchParamsToObject"
import Spinner from "../common/spinner/Spinner"

const ProductsList = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get("category")
    const { data: products, error, isFetching } = useGetProductsByCategoryQuery(category)

    const handleClick = (id) => {
        const paramsObject = urlSearchParamsToObject(searchParams)
        setSearchParams({ ...paramsObject, product: id })
    }

    if (isFetching) {
        return (
            <div className="w-full h-full grid place-items-center bg-neutral-100">
                <Spinner color="text-zinc-300" />
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto bg-neutral-100 pt-3 pb-24 px-2">
            {
                products.map(product => {
                    return (
                        <article
                            onClick={() => handleClick(product.id)}
                            className="grid grid-cols-12 gap-2 bg-white rounded-md p-1 h-24 mb-2"
                            key={product.id}
                        >
                            <div className="col-span-4 p-1">
                                <img className="w-full h-full object-cover rounded-md" src="/product-placeholder.jpg" alt="" />
                            </div>
                            <div className="col-span-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold truncate">{product.name}</h3>
                                    <p className="text-sm text-zinc-500 truncate">{product.description.length > 0 ? product.description : product.name}</p>
                                </div>
                                <p className="font-semibold">CHF. {product.price}</p>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default ProductsList