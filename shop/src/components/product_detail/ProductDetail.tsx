import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../../store/cart/cartSlice"
import type { CartProduct, Product } from "../../types"
import type { AppDispatch, RootState } from "../../store/store"


type PropsTypes = {
    productDetails: Product | null
    setProductDetails: Dispatch<SetStateAction<Product | null>>
}

const ProductDetail = ({ productDetails, setProductDetails }: PropsTypes) => {

    const [loading, setLoading] = useState(false)
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch<AppDispatch>()
    //GET THE LENGTH TO GENERATE UNIQUE IDS OF THE PRODUCT IN THE CART WHEN ADDED
    const cart = useSelector<RootState, CartProduct[]>(state => state.cart.products)

    const handleAdd = () => {
        // console.log(productDetails)
        setLoading(true)
        dispatch(addProduct({ ...productDetails, qty: qty, localId: productDetails?.id + "" + cart.length }))
        setTimeout(() => {
            setLoading(false)
            handleReset()
        }, 1000)
    }

    const handleInc = () => qty < 5 && setQty(prev => prev + 1)

    const handleDec = () => qty > 1 && setQty(prev => prev - 1)

    const handleReset = () => {
        setProductDetails(null)
        setQty(1)
    }

    return (
        <div className={`${productDetails && "-translate-x-full"} transition-transform z-20 bg-white fixed top-0 -right-[100vw] w-[100vw] h-[100vh]`}>
            {
                productDetails ?
                    <div className="relative px-4 pt-12">
                        <button onClick={handleReset} className="absolute left-4 top-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <img src={productDetails.images[0].src} alt="" className="rounded-xl h-40 w-full object-cover" />
                        <h2 className="text-2xl font-semibold">{productDetails.name}</h2>
                        <p>{productDetails.description.length !== 0 ? productDetails.description : productDetails.name}</p>
                        <p className="font-semibold text-xl">CHF. {productDetails.price}</p>
                        <div className="flex gap-2">
                            <div className="flex w-28 border border-zinc-200 rounded-md divide-x divide-zinc-200">
                                <button onClick={handleDec} className="flex-1 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                </button>
                                <div className="flex-1 flex items-center justify-center">{qty}</div>
                                <button onClick={handleInc} className="flex-1 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                            <button disabled={loading} onClick={handleAdd} className="primary-button flex-1 disabled:bg-green-600 transition">
                                {
                                    loading ?
                                    "Added to cart" :
                                    "Add to cart"
                                }
                            </button>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default ProductDetail