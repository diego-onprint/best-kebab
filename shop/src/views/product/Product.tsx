import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useGetProductByIdQuery } from "../../store/api/apiSlice"
import ReturnButton from "../../components/common/return_button/ReturnButton"
import ProductDetail from "../../components/product_detail/ProductDetail"
import Counter from "../../components/common/counter/Counter"
import ProductNotes from "../../components/product_detail/product_notes/ProductNotes"
import ProductOptions from "../../components/product_detail/product_options/ProductOptions"
import Spinner from "../../components/common/spinner/Spinner"
import { createTimestamp } from "../../utils/createTimestamp"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { addProduct } from "../../store/cart/cartSlice"
import type { CartProduct } from "../../types"

const DURATION = 1000

const Product = () => {

  const dispatch = useDispatch<AppDispatch>()
  const [qty, setQty] = useState(1)
  const [showNotification, setShowNotification] = useState(false)
  const [selectedVariations, setSelectedVariations] = useState([])
  const [disabled, setDisabled] = useState(false)
  const notesRef = useRef(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const productParam = searchParams.get("product")
  const { data: product, error, isFetching } = useGetProductByIdQuery(productParam)

  const resetState = () => {
    setQty(1)
    setSelectedVariations([])
    notesRef.current.value = ""
  }

  const handleAdd = () => {

    setDisabled(true)

    const timestamp = createTimestamp()

    const parsedProduct: CartProduct = {
      product_id: product.product_id,
      product_uid: product.product_id + timestamp,
      product_name: product.product_name,
      product_price: product.product_price,
      product_qty: qty,
      product_variations: selectedVariations,
      product_parent_category: product.product_parent_category,
      product_notes: notesRef.current.value,
    }

    dispatch(addProduct(parsedProduct))

    setShowNotification(true)

    resetState()

    setTimeout(() => {
      navigate(-1)
      setShowNotification(false)
      setDisabled(false)
    }, DURATION)
  }

  return (
    <div className={`${!productParam ? "translate-x-full" : ""} flex flex-col absolute top-0 right-0 w-screen min-h-screen pb-4 transition-transform z-[60] flex-1 overflow-y-auto`}>
      <div className="section-header grid place-items-center">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
          <ReturnButton style={`w-5 h-5 ${disabled ? "opacity-50" : ""}`} disabled={disabled} />
        </div>
        {product ? <h3 className="text-center font-semibold max-w-44 truncate">{product.product_name}</h3> : null}
      </div>
      <div className="flex flex-col gap-2 bg-neutral-100 flex-1 pt-20 pb-20 px-2">
        {
          !product || isFetching ?
            <div className="w-full h-full grid place-items-center bg-neutral-100">
              <Spinner color="text-zinc-300" />
            </div> :
            <div className={`${disabled ? "opacity-50" : ""} flex flex-col gap-2`}>
              <ProductDetail product={product} />
              {/* {
                product.variations.length > 0 ?
                  <ProductOptions
                    variations={product.variations}
                    selectedVariations={selectedVariations}
                    setSelectedVariations={setSelectedVariations}
                  />
                  : null
              } */}
              <ProductNotes ref={notesRef} />
            </div>
        }
      </div>
      <div className="fixed bottom-0 h-20 bg-white w-full z-50 p-4 grid grid-cols-12 gap-2">
        <div className={"col-span-5"}>
          <Counter qty={qty} setQty={setQty} disabled={disabled}/>
        </div>
        <button
          onClick={handleAdd}
          disabled={disabled}
          className="primary-button col-span-7"
        >
          Add product
        </button>
      </div>
      {
        showNotification ?
            <div className="notification-base bg-lime-500 text-white font-semibold flex gap-1 items-center">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Product added</span>
            </div>
          : null
      }
    </div>
  )
}

export default Product