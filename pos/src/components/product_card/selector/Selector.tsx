import { useState, Dispatch, SetStateAction } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../../store/cart/cartSlice"
import Options from "../options/Options"
import ErrorBoundary from "../../error_boundary/ErrorBoundary"
import ErrorFallback from "../../error_fallback/ErrorFallback"
import type { AppDispatch } from "../../../store/store"
import type { Product, ProductVariation } from "../../../types"
import Counter from "../counter/Counter"

type PropsTypes = {
    product: Product
    openSelector: boolean
    setOpenSelector: Dispatch<SetStateAction<boolean>>
}

const Selector = ({ product, openSelector, setOpenSelector }: PropsTypes) => {

    const [variation, setVariation] = useState<ProductVariation>()
    const dispatch = useDispatch<AppDispatch>()
    const [qty, setQty] = useState(1)

    const handleAdd = (product: Product) => {
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: qty,
        variation: variation
      }
      dispatch(addProduct(productToAdd))
      setOpenSelector(!openSelector)
    }

    return (
        <section className="fixed inset-0 bg-black/10 z-[900] grid place-items-center">
            <div className="flex flex-col gap-4 w-[90%] max-w-xl bg-white rounded-lg p-5">
                <h3 className="font-semibold text-xl">{product.name}</h3>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <h4 className="mb-2">Quantity</h4>
                        <Counter qty={qty} setQty={setQty} />
                    </div>
                    <div className="col-span-6">
                        <ErrorBoundary fallback={<ErrorFallback>Error fetching options</ErrorFallback>}>
                            {product.variations.length > 0 ? <Options id={product.id} setVariation={setVariation}/> : null}
                        </ErrorBoundary>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-6">
                    <button onClick={() => setOpenSelector(!openSelector)} className="ghost-button col-span-4">Cancel</button>
                    <button
                        onClick={() => handleAdd(product)}
                        onKeyDown={(e) => e.key === "Enter" && handleAdd(product)}
                        className="primary-button col-span-8"
                        // disabled={!variation}
                    >
                        Add
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Selector