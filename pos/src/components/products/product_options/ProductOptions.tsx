import { useState, useRef, Dispatch, SetStateAction } from "react"
import Counter from '../../common/counter/Counter'
import { useDispatch, useSelector } from "react-redux"
import { useUpdateOrderInDbAndStore } from "../../../hooks/useUpdateOrderInDbAndStore"
import { AppDispatch, RootState } from "../../../store/store"
import { setCurrentSelectedProduct } from "../../../store/product_options/productOptionsSlice"
import { createTimestamp } from "../../../utils/create/createTimestamp"
import { getCartTotal } from "../../../utils/get/getCartTotal"
import type { Product, Order } from '../../../types'

const ProductOptions = () => {

    const dispatch = useDispatch<AppDispatch>()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const { currentSelectedProduct: product } = useSelector<RootState, { currentSelectedProduct: Product }>(state => state.productOptions)
    const { updateOrder } = useUpdateOrderInDbAndStore()
    const [qty, setQty] = useState(1)
    const [selectedVariations, setSelectedVarations] = useState<ProductVariation[]>([])
    const notesRef = useRef()

    const handleClose = () => {
        dispatch(setCurrentSelectedProduct(null))
    }

    const handleAdd = () => {
        const timestamp = createTimestamp()

        const productToAdd: CartProduct = {
            product_id: product.product_id,
            product_uid: product.product_id + timestamp,
            product_name: product.product_name,
            product_price: product.product_price,
            product_qty: qty,
            product_variations: selectedVariations,
            product_parent_category: product.product_parent_category,
            product_notes: notesRef.current.value,
        }

        const updatedOrderProducts = [...currentOrder.data.cart.products, productToAdd]

        const updatedOrder = {
            ...currentOrder,
            data: {
                ...currentOrder.data,
                cart: {
                    ...currentOrder.data.cart,
                    products: updatedOrderProducts,
                    total: getCartTotal(updatedOrderProducts)
                }
            }
        }

        updateOrder(updatedOrder)
        handleClose()
    }

    return (
        <section className="fixed inset-0 bg-black/10 z-[900] grid place-items-center">
            <div className="flex flex-col gap-1 w-[90%] max-w-xl bg-white rounded-lg p-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <h3 className="font-semibold text-xl">{product.product_name}</h3>
                        </div>
                        <div className="flex items-center justify-end gap-4 flex-1">
                            <h4 className="font-semibold">Qty</h4>
                            <Counter qty={qty} setQty={setQty} />
                        </div>
                    </div>
                    {/* {
                        product.product_variations?.length > 0 ?
                            <VariationsMenu
                                variations={product.product_variations}
                                selectedVariations={selectedVariations}
                                setSelectedVariations={setSelectedVarations}
                            /> : null
                    } */}
                    <div>
                        <label className="mb-2 font-semibold">Bemerkung</label>
                        <textarea rows={2} className="w-full p-2 border border-zinc-200 resize-none rounded-md" ref={notesRef} />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <button onClick={handleClose} className="ghost-button col-span-4">Cancel</button>
                        <button onClick={handleAdd} className="primary-button col-span-8"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductOptions