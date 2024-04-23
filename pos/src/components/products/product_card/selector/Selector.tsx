import { useState, Dispatch, SetStateAction, useRef } from "react"
import { useDispatch } from "react-redux"
import Counter from "../counter/Counter"
import VariationsMenu from "../options/VariationsMenu"
import { createTimestamp } from "../../../../utils/create/createTimestamp"
import { AppDispatch  } from "../../../../store/store"
import type { Product } from "../../../../types"
import { addOrderProduct } from "../../../../store/orders/ordersSlice"

type PropsTypes = {
    product: Product
    openSelector: boolean
    setOpenSelector: Dispatch<SetStateAction<boolean>>
}

const Selector = ({ product, openSelector, setOpenSelector }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const notesRef = useRef()
    const [selectedVarations, setSelectedVarations] = useState([])
    const [qty, setQty] = useState(1)

    const handleAdd = () => {

        const timestamp = createTimestamp()

        const productToAdd = {
            id: product.id,
            uid: product.id + timestamp,
            name: product.name,
            price: product.price,
            qty: qty,
            variations: selectedVarations,
            parent: product.parent,
            timestamp: timestamp,
            notes: notesRef.current.value,
        }

        dispatch(addOrderProduct(productToAdd))

        setOpenSelector(!openSelector)
    }

    return (
        <section className="fixed inset-0 bg-black/10 z-[900] grid place-items-center">
            <div className="flex flex-col gap-1 w-[90%] max-w-xl bg-white rounded-lg p-5">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <h3 className="font-semibold text-xl">{product.name}</h3>
                        </div>
                        <div className="flex items-center justify-end gap-4 flex-1">
                            <h4 className="font-semibold">Qty</h4>
                            <Counter qty={qty} setQty={setQty} />
                        </div>
                    </div>
                    {
                        product.variations?.length > 0 ?
                            <VariationsMenu
                                variations={product.variations}
                                selectedVariations={selectedVarations}
                                setSelectedVariations={setSelectedVarations}
                            /> : null
                    }
                    <div>
                        <label className="mb-2 font-semibold">Bemerkung</label>
                        <textarea rows={2} className="w-full p-2 border border-zinc-200 resize-none rounded-md" ref={notesRef} />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <button onClick={() => setOpenSelector(!openSelector)} className="ghost-button col-span-4">Cancel</button>
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

export default Selector