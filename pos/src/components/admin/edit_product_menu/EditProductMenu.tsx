import { useDispatch, useSelector } from "react-redux"
import { setEditProductMenu } from "../../../store/menus/menusSlice"
import Form from "./form/Form"
import type { RootState } from "../../../store/store"
import { setCurrentSelectedProduct } from "../../../store/product_options/productOptionsSlice"

const EditProductMenu = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { currentSelectedProduct: product } = useSelector<RootState, { currentSelectedProduct: Product }>(state => state.productOptions)

    const handleClose = () => {
        dispatch(setEditProductMenu({ open: false, productId: null }))
        dispatch(setCurrentSelectedProduct(null))
    }

    return (
        <div onClick={handleClose} className="modal-overlay">
            <div onClick={(e) => e.stopPropagation()} className="w-11/12 max-w-[800px] bg-white p-6 rounded-lg shadow-lg relative">
                <div className="flex gap-4 items-center mb-4">
                    <button onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold">Edit {product.name}</h2>
                </div>
                <Form />
            </div>
        </div>
    )
}

export default EditProductMenu