import { useGetProductsByCategoryQuery } from "../../store/api/apiSlice"
import Spinner from "../common/spinner/Spinner"
import { formatPrice } from "../../utils/formatPrice"
import useParam from "../../hooks/useParam"
import useNavigation from "../../hooks/useNavigation"

const ProductsList = () => {

    const category = useParam("category")
    const { data: products, error, isFetching } = useGetProductsByCategoryQuery(category)
    const { toProductView } = useNavigation()

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
                            onClick={() => toProductView(product.product_id)}
                            className="grid grid-cols-12 gap-2 bg-white rounded-md p-1 h-24 mb-2"
                            key={product.product_id}
                        >
                            <div className="col-span-4 p-1">
                                <img className="w-full h-full object-cover rounded-md" src={product.product_image} alt="" />
                            </div>
                            <div className="col-span-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold truncate">{product.product_name}</h3>
                                    <p className="text-sm text-zinc-500 truncate">{product.product_description.length > 0 ? product.product_description : product.product_name}</p>
                                </div>
                                <p className="font-semibold">CHF. {formatPrice(product.product_price)}</p>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default ProductsList