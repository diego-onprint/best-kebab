import { useState } from "react"
import type { Product } from "../../types"
import Selector from "./selector/Selector"
import { formatPrice } from "../../utils/formatPrice"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const [openSelector, setOpenSelector] = useState(false)

  return (
    <>
      <article
        onClick={() => setOpenSelector(!openSelector)}
        role="button"
        tabIndex={0}
        key={product.id}
        className="col-span-6 xl:col-span-4 h-24 border border-zinc-200 bg-white rounded-lg"
      >
        <div className="p-2">
          <h3>{product.name}</h3>
          <p>CHF. <span className="font-bold">{formatPrice(product.price)}</span></p>
        </div>
      </article>
      {openSelector ? <Selector product={product} openSelector={openSelector} setOpenSelector={setOpenSelector} /> : null}
    </>
  )
}

export default ProductCard