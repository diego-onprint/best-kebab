import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../store/store"
import { setCustomProductMenu } from "../../../store/menus/menusSlice"
import Counter from "../../common/counter/Counter"
import { createTimestamp } from "../../../utils/create/createTimestamp"
import { useUpdateOrderInDbAndStore } from "../../../hooks/useUpdateOrderInDbAndStore"
import { getCartTotal } from "../../../utils/get/getCartTotal"
import type { RootState } from "../../../store/store"
import type { CartProduct, Order } from "../../../types"

const ID = 123456

const CustomProduct = () => {

    const dispatch = useDispatch<AppDispatch>()
    const currentOrder = useSelector<RootState, Order>(state => state.currentOrder)
    const { updateOrder } = useUpdateOrderInDbAndStore()
    const [qty, setQty] = useState(1)
    const nameRef = useRef(null)
    const priceRef = useRef(null)
    const notesRef = useRef(null)

    const handleClose = () => dispatch(setCustomProductMenu(false))

    const handleAdd = () => {

        const timestamp = createTimestamp()

        const productToAdd: CartProduct = {
            product_id: Math.ceil(ID + Number(timestamp.slice(-3) + priceRef.current?.value || 0)),
            product_uid: ID + timestamp,
            product_name: nameRef.current?.value || "",
            product_price: Number(priceRef.current?.value) || 0,
            product_qty: qty,
            product_parent_category: "",
            // product_variations: [],
            product_notes: notesRef.current?.value || "",
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
                <div className="grid grid-cols-12 gap-2">
                    <div className="flex flex-col gap-1 col-span-8">
                        <label className="font-semibold">Name</label>
                        <input ref={nameRef} type="text" className="p-2 border border-zinc-200 resize-none rounded-md" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-4">
                        <label className="font-semibold">Price</label>
                        <input ref={priceRef} type="number" className="p-2 border border-zinc-200 resize-none rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                        <p className="font-semibold">Qty.</p>
                        <Counter qty={qty} setQty={setQty} />
                    </div>
                    <div className="col-span-8">
                        <label className="mb-2 font-semibold">Bemerkung</label>
                        <textarea rows={1} className="w-full p-2 border border-zinc-200 resize-none rounded-md" ref={notesRef} />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <button onClick={handleClose} className="ghost-button col-span-4">Cancel</button>
                    <button onClick={handleAdd} className="primary-button col-span-8">Add</button>
                </div>
            </div>
        </section>
    )
}

export default CustomProduct