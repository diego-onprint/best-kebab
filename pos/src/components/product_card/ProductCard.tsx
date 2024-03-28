import { useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../store/cart/cartSlice"
import type { AppDispatch } from "../../store/store"
import type { Product } from "../../types"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const [openSelector, setOpenSelector] = useState(false)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch<AppDispatch>()

  const handleAdd = (product: Product) => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: qty,
    }
    dispatch(addProduct(productToAdd))
    setOpenSelector(!openSelector)
  }

  return (
    <>
      <article
        onClick={() => setOpenSelector(!openSelector)}
        role="button"
        tabIndex={0}
        key={product.id}
        className="col-span-6 sm:col-span-4 lg:col-span-3 h-22 border border-zinc-100 bg-white rounded-lg"
      >
        <div className="p-2">
          <h3>{product.name}</h3>
          <p>CHF. <span className="font-bold">{product.price}</span></p>
        </div>
      </article>

      {
        openSelector ?
          <section className="fixed inset-0 bg-black/10 z-[900] grid place-items-center">
            <div className="flex flex-col gap-4 w-[90%] max-w-xl bg-white rounded-lg p-5">
              <h3 className="font-semibold text-xl">{product.name}</h3>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <h4>Quantity</h4>
                </div>
                <div className="col-span-6">
                  <h4>Options</h4>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 mt-6">
                <button onClick={() => setOpenSelector(!openSelector)} className="ghost-button col-span-4">Cancel</button>
                <button
                  onClick={() => handleAdd(product)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd(product)}
                  className="primary-button col-span-8"
                >
                  Add
                </button>
              </div>
            </div>
          </section> : null
      }
    </>
  )
}

export default ProductCard