import { useDispatch, useSelector } from "react-redux"
import useProductActions from "../../../hooks/useProductActions"
import { setCurrentSelectedProduct } from "../../../store/product_options/productOptionsSlice"
import Counter from '../../common/counter/Counter'
import type { Product } from '../../../types'
import type { AppDispatch, RootState } from "../../../store/store"
import { setEditProductMenu } from "../../../store/menus/menusSlice"
import VariationsMenu from "./options/VariationsMenu"

const ProductOptions = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { currentOrderId, completedOrderToEditId } = useSelector<RootState, CurrentOrder>(state => state.currentOrder)
    const { currentSelectedProduct: product } = useSelector<RootState, { currentSelectedProduct: Product }>(state => state.productOptions)
    const { productQty, setProductQty, productNotes, addProduct, productVariations, setProductVariations } = useProductActions()

    const handleClose = () => {
        dispatch(setCurrentSelectedProduct(null))
    }

    const handleAdd = () => {
        addProduct()
        handleClose()
    }

    const handleEditMenu = () => {
        dispatch(setEditProductMenu({ open: true, productId: product.id }))
    }

    return (
        <section onClick={handleClose} className="fixed inset-0 bg-black/10 z-[900] grid place-items-center">
            <div onClick={(event) => event.stopPropagation()} className="flex flex-col gap-1 w-[90%] max-w-xl bg-white rounded-lg p-5">
                <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                        <h3 className="font-semibold text-xl">{product.name}</h3>
                        <button onClick={handleEditMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </button>
                    </div>
                    {
                        product.variations.length > 0 ?
                            <VariationsMenu variations={product.variations} productVariations={productVariations} setProductVariations={setProductVariations} /> : null
                    }
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 items-center justify-end gap-4 flex-1">
                            <h4 className="font-semibold">Qty</h4>
                            <Counter qty={productQty} setQty={setProductQty} />
                        </div>
                        <div className="col-span-8">
                            <label className="mb-2 font-semibold">Bemerkung</label>
                            <textarea ref={productNotes} rows={1} className="w-full p-2 border border-zinc-200 resize-none rounded-md" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <button onClick={handleClose} className="secondary-button py-3 col-span-4">Cancel</button>
                        <button onClick={handleAdd} className={`${!currentOrderId && !completedOrderToEditId ? "opacity-45 cursor-default pointer-events-none bg-zinc-500" : ""} primary-button py-3 col-span-8`}>Add</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductOptions