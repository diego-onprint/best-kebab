import { MouseEvent } from "react"
import { formatPrice } from "../../../utils/format/formatPrice"
import useProductActions from "../../../hooks/useProductActions"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../store/store"
import { removeSelectedProduct, setSelectedProduct } from "../../../store/selected_products/selectedProducts"

const Item = ({ product }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { products: selectedProducts } = useSelector(state => state.selectedProducts)
    const { removeProduct, isUpdating } = useProductActions()
    const isSelected = selectedProducts.includes(product.uid)

    const handleSelectProduct = () => {
        !isSelected ?
            dispatch(setSelectedProduct(product.uid)) :
            dispatch(removeSelectedProduct(product.uid))
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (!isSelected) removeProduct(product.uid)
    }

    return (
        <li onClick={handleSelectProduct} className={`${isUpdating && "opacity-40"} ${isSelected && "bg-zinc-100"} flex gap-6 p-4 justify-between items-start relative`}>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <p className="font-semibold">{product.qty}</p>
                        <dt className="truncate max-w-52">{product.name}</dt>
                    </div>
                    <dd className="font-semibold">
                        <span className="text-sm">CHF </span>
                        {formatPrice(product.total.toFixed(2))}
                    </dd>
                </div>
                {
                    product.variations.length > 0 ?
                        product.variations.map(option => {
                            return (
                                <div key={option.timestamp} className="flex justify-between gap-2 pl-4 text-zinc-400">
                                    <p>{option.option_name}</p>
                                    <dt className="truncate max-w-60">
                                        <span className="text-sm">CHF </span>
                                        {(option.option_price * product.qty).toFixed(2)}
                                    </dt>
                                </div>
                            )
                        }) : null
                }
            </div>
            <div className="flex gap-10">
                <button onClick={handleDelete} disabled={isSelected} className={`${isSelected ? "text-zinc-400 pointer-events-none cursor-default opacity-50" : "text-red-400 cursor-pointer"}`} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {
                product.wasPrinted ?
                    <div className="absolute top-1 left-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                        </svg>
                    </div> : null
            }
        </li>
    )
}

export default Item