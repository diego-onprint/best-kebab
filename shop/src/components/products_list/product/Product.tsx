import { useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../../store/cart/cartSlice"
import VariationButton from "./variation_button/VariationButton"
import toast from 'react-hot-toast'
import { createTimestamp } from "../../../utils/createTimestamp"
import { AppDispatch } from "../../../store/store"

const Product = ({ product }) => {

    const dispatch = useDispatch<AppDispatch>()
    const [openModal, setOpenModal] = useState(false)
    const [variations, setVariations] = useState([])
    const [qty, setQty] = useState(1)

    const handleClick = () => {
        // Open modal if needs options else add to cart
        if (product.variations.length > 0) {
            return setOpenModal(true)
        }

        handleAdd()
    }

    const handleRemove = (uid) => {
        const filteredVariations = variations.filter(option => option.uid !== uid)
        setVariations(filteredVariations)
    }

    const handleAdd = () => {

        const timestamp = createTimestamp()

        const parsedProduct: CartProduct = {
            id: product.id,
            uid: product.id + timestamp,
            name: product.name,
            price: product.price,
            qty: qty,
            total: product.price * qty,
            variations: variations,
            category_id: product.parent,
        }

        dispatch(addProduct(parsedProduct))

        if (openModal) setOpenModal(false)

        toast.success('Produkt hinzugefügt')
    }

    const getProductTotal = () => {
        const variationsTotal = variations.reduce((acc, curr) => {
            return acc + (curr.option_price * qty)
        }, 0)
        const total = (parseFloat(product.price) + variationsTotal) * qty
        return total.toFixed(2)
    }
    
    return (
        <div>
            <article onClick={handleClick} className="grid grid-cols-12 border border-zinc-200 p-3 rounded-lg" role="button" key={product.id}>
                <div className="col-span-12 grid grid-cols-12 sm:gap-2">
                    {
                        product.image.length > 0 ?
                        <picture className="w-full h-24 rounded-md object-cover col-span-12 sm:col-span-3">
                            {/* <source media="(min-width: 1024px)" srcSet="https://resto-demo.ch/wp-content/uploads/2024/06/aladin-hero-large.jpg" /> */}
                            {/* <source media="(max-width: 1023px)" srcSet="https://resto-demo.ch/wp-content/uploads/2024/06/aladin-hero-small.jpg" /> */}
                            <img className="w-full h-24 rounded-md object-cover" src={product.image} alt="" />
                        </picture> : null
                    }
                    <div className={`col-span-12 ${product.image.length > 0 && "sm:col-span-9"}`}>
                        <h3 className="font-bold text-xl sm:text-lg">{product.name}</h3>
                        <p>{product.description.length > 0 ? product.description : product.name}</p>
                        <p className="text-lg">
                            <span className="font-semibold text-zinc-400">CHF </span>
                            <span className="font-bold">{product.price}</span>
                        </p>
                    </div>
                </div>
                <div className="col-span-12 mt-4 flex sm:justify-start">
                    <button className="primary-button flex-1 sm:flex-initial">Produkt hinzufügen</button>
                </div>
            </article>
            {
                openModal ?
                    <div onClick={() => setOpenModal(false)} className="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-start px-2 py-14 z-[999]">
                        <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded-md w-full max-w-3xl h-full max-h-[550px] flex flex-col justify-between divide-y divide-zinc-400 gap-2">
                            <div className="flex flex-col">
                                <h2 className="font-semibold text-3xl truncate overflow-hidden w-full">{product.name}</h2>
                                <div className="flex flex-col gap-2 pt-4">
                                    {
                                        product.variations.map(variation => {
                                            return (
                                                <VariationButton
                                                    variation={variation}
                                                    variations={variations}
                                                    setVariations={setVariations}
                                                    key={variation.variation_id}
                                                />
                                            )
                                        })
                                    }
                                    <div className="overflow-auto flex flex-col flex-1 gap-2 pt-4">
                                        {
                                            variations.length > 0 ?
                                                variations.map(selectedOption => {
                                                    return (
                                                        <button onClick={() => handleRemove(selectedOption.uid)} className="flex justify-between" key={selectedOption.uid}>
                                                            <span className="overflow-hidden truncate max-w-[80%]">{selectedOption.option_name}</span>
                                                            <span className="flex gap-6">
                                                                <span>CHF {selectedOption.option_price * qty}</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    )
                                                }) : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 pt-4">
                                {/* <div className="col-span-4">
                                    <Counter qty={qty} setQty={setQty} />
                                </div> */}
                                <button onClick={handleAdd} className="primary-button col-span-8 col-start-5 flex gap-3">
                                    <span>CHF {getProductTotal()}</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default Product