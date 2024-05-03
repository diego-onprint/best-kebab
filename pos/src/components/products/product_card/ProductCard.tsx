import { formatPrice } from "../../../utils/format/formatPrice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store/store"
import type { Product, Order } from "../../../types"
import { setCurrentSelectedProduct } from "../../../store/product_options/productOptionsSlice"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const dispatch = useDispatch<AppDispatch>()
  const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)

  return (
    <>
      <article
        // Disable action if no table selected
        onClick={() => currentOrder.data && dispatch(setCurrentSelectedProduct(product))}
        role="button"
        tabIndex={0}
        className={`${!currentOrder.data && "opacity-30 cursor-default"} col-span-6 xl:col-span-4 h-24 border border-zinc-200 bg-white rounded-lg`}
      >
        <div className="p-2">
          <h3>{product.product_name}</h3>
          <p>CHF. <span className="font-bold">{formatPrice(product.product_price)}</span></p>
        </div>
      </article>
    </>
  )
}

export default ProductCard