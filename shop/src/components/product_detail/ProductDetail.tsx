import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../../store/cart/cartSlice"
import type { CartProduct, Product, ProductType } from "../../types"
import type { AppDispatch, RootState } from "../../store/store"
import Spinner from "../common/spinner/Spinner"

type PropsTypes = {
    product: ProductType
    isFetching: boolean
    selectedOptions: []
    setSelectedOptions: () => void
}

const ProductDetail = ({ product, isFetching }: PropsTypes) => {

    if (!product || isFetching) {
        return (
            <div className="w-full h-full grid place-items-center bg-neutral-100">
                <Spinner color="text-zinc-300" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 overflow-y-auto bg-neutral-100 flex-1 px-4 pt-20 pb-20 px-2">
            <div className="bg-white rounded-md overflow-hidden">
                <img className="w-full h-36 object-cover" src="/product-placeholder.jpg" alt="" />
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="text-zinc-700">{product.description.length > 0 ? product.description : product.name}</p>
                </div>
            </div>
            {
                product.variations.length > 0 ?
                <div className="bg-white rounded-md p-4">
                    <h4 className="font-medium">Options</h4>
                    <div>

                    </div>
                </div> : null
            }
            <div className="bg-white rounded-md p-4">
                <h4 className="font-medium">Bemerkung</h4>
            </div>
        </div>
    )
}

export default ProductDetail