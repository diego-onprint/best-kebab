import { formatPrice } from "../../../utils/format/formatPrice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../store/store"
import type { Product } from "../../../types"
import { setCurrentSelectedProduct } from "../../../store/product_options/productOptionsSlice"
import { useGetOrderDataByIdQuery } from "../../../store/api/apiSlice"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const dispatch = useDispatch<AppDispatch>()
  const { currentOrderId } = useSelector(state => state.currentOrder)
  const { data: order, isFetching } = useGetOrderDataByIdQuery(currentOrderId)
  const editable = order?.status.value === "created"

  const handleClick = () => {
    if (editable) {
      dispatch(setCurrentSelectedProduct(product))
    }
  }

  return (
    <article
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={`${!editable && "opacity-50 cursor-default"} relative overflow-hidden grid col-span-6 xl:col-span-4 h-24 border border-zinc-200 bg-white rounded-lg`}
    >
      <div className="px-3 py-2 flex flex-col justify-between">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="self-end">CHF {formatPrice(product.price)}</p>
      </div>
      {/* <div className="absolute top-0 -right-5">
        <div style={{backgroundColor: product.color}} className="p-8 transform rotate-45 translate-x-1/2 -translate-y-1/2 z-50"></div>
      </div> */}
    </article>
  )
}

export default ProductCard