import { useState } from "react"
import Selector from "./selector/Selector"
import { formatPrice } from "../../../utils/format/formatPrice"
import type { Product } from "../../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
  const [openSelector, setOpenSelector] = useState(false)

  console.log("Product card...", currentOrder)

  return (
    <>
      <article
        // Disable action if no table selected
        onClick={() => currentOrder.data && setOpenSelector(!openSelector)}
        role="button"
        tabIndex={0}
        className={`${!currentOrder.data && "opacity-30 cursor-default"} col-span-6 xl:col-span-4 h-24 border border-zinc-200 bg-white rounded-lg`}
      >
        <div className="p-2">
          <h3>{product.product_name}</h3>
          <p>CHF. <span className="font-bold">{formatPrice(product.product_price)}</span></p>
        </div>
      </article>
      {openSelector ? <Selector product={product} openSelector={openSelector} setOpenSelector={setOpenSelector} /> : null}
    </>
  )
}

export default ProductCard