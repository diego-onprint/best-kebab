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

const Product = () => {

  const [qty, setQty] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [disabled, setDisabled] = useState(false)
  const notesRef = useRef(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const productParam = searchParams.get("product")
  const { data: product, error, isFetching } = useGetProductByIdQuery(productParam)

  const resetState = () => {
    console.log("reset")
    setQty(1)
    setSelectedOptions([])
  }

  const handleAdd = () => {

    setDisabled(true)
    console.log(notesRef.current.value)

    // Set notification, whait and remove detail
    setTimeout(() => {
      navigate(-1)
      notesRef.current.value = ""
    }, 2000)

    setTimeout(() => {
      setDisabled(false)
    }, 2300)
  }

  useEffect(() => {
    resetState()
  }, [productParam])

  console.log(selectedOptions)

  return (
    <div className={`${!product && "translate-x-full"} absolute top-0 right-0 w-screen min-h-screen pb-24 transition-transform z-[60] flex-1`}>
      <div className="section-header grid place-items-center">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
          <ReturnButton style="w-5 h-5" />
        </div>
        {product ? <h3 className="text-center font-semibold max-w-44 truncate">{product.name}</h3> : null}
      </div>
      <div className="flex flex-col gap-2 bg-neutral-100 flex-1 pt-20 pb-20 px-2">
        {
          !product || isFetching ?
            <div className="w-full h-full grid place-items-center bg-neutral-100">
              <Spinner color="text-zinc-300" />
            </div> :
            <>
              <ProductDetail product={product} />
              {
                product.variations.length > 0 ?
                  <ProductOptions
                    variations={product.variations}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                  : null
              }
              <ProductNotes ref={notesRef} />
            </>
        }
      </div>
      <div className="fixed bottom-0 h-20 bg-white w-full z-50 p-4 grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <Counter qty={qty} setQty={setQty} />
        </div>
        <button
          onClick={handleAdd}
          disabled={disabled}
          className="primary-button col-span-7"
        >
          Add product
        </button>
      </div>
    </div>
  )
}

export default Product