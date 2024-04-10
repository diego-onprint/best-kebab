import { useState, Dispatch, SetStateAction, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Options from "../options/Options"
import ErrorBoundary from "../../error_boundary/ErrorBoundary"
import ErrorFallback from "../../error_fallback/ErrorFallback"
import { addProduct } from "../../../store/cart/cartSlice"
import { addTableProduct } from "../../../store/tables/tablesSlice"
import { AppDispatch, RootState } from "../../../store/store"
import type { Product, ProductVariation, Table } from "../../../types"
import Counter from "../counter/Counter"
import { createTimestamp } from "../../../utils/createTimestamp"

type PropsTypes = {
    product: Product
    openSelector: boolean
    setOpenSelector: Dispatch<SetStateAction<boolean>>
}

const Selector = ({ product, openSelector, setOpenSelector }: PropsTypes) => {

    const dispatch = useDispatch<AppDispatch>()
    const notesRef = useRef()
    const [selectedVarations, setSelectedVarations] = useState([])
    const activeTable = useSelector<RootState, Table["id"]>(state => state.tables.activeTable)
    const [qty, setQty] = useState(1)

    // const handleAdd = (product: Product) => {

    //     const timestamp = createTimestamp()

    //     const productToAdd = {
    //         id: product.id,
    //         uid: crypto.randomUUID(),
    //         name: product.name,
    //         price: product.price,
    //         qty: qty,
    //         variations: selectedVarations,
    //         timestamp: timestamp,
    //         notes: notesRef.current.value,
    //     }

    //     if (activeTable !== -1) {

    //         dispatch(addTableProduct(productToAdd))

    //     } else {

    //         dispatch(addProduct(productToAdd))
    //     }

    //     setOpenSelector(!openSelector)

    // }

    console.log(product)

    return (
        <section className="fixed inset-0 bg-black/10 z-[900] grid place-items-center">
            <div className="flex flex-col gap-4 w-[90%] max-w-xl bg-white rounded-lg p-5">
                <h3 className="font-semibold text-xl">{product.name}</h3>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <h4 className="mb-2">Quantity</h4>
                        <Counter qty={qty} setQty={setQty} />
                        <div className="mt-4">
                            <label className="mb-2">Notes</label>
                            <textarea rows={3} className="w-full p-2 border border-zinc-200 resize-none rounded-md" ref={notesRef} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        {/* <ErrorBoundary fallback={<ErrorFallback>Error fetching options</ErrorFallback>}>
                            {
                                product.variations.length > 0 ?
                                    <Options
                                        id={product.id}
                                        selectedVariations={selectedVarations}
                                        setSelectedVariations={setSelectedVarations}
                                    /> : null}
                        </ErrorBoundary> */}
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
        </section>
    )
}

export default Selector