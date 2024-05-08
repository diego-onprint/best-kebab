import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ReturnButton from "../../components/common/return_button/ReturnButton"
import ProductDetail from "../../components/product_detail/ProductDetail"
import { useGetProductByIdQuery } from "../../store/api/apiSlice"
import { useState } from "react"
import Counter from "../../components/common/counter/Counter"

const Product = () => {
  
  const [qty, setQty] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState([])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const productParam = searchParams.get("product")
  const { data: product, error, isFetching } = useGetProductByIdQuery(productParam)

  const handleAdd = () => {

    console.log(product)

    // Set notification, whait and remove detail
    setTimeout(() => {
      navigate(-1)
    }, 2000)
  }

  return (
    <div className={`${!product && "translate-x-full"} absolute top-0 right-0 w-screen h-screen transition-transform z-[60] flex flex-col flex-1`}>
      <div className="section-header grid place-items-center">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
          <ReturnButton style="w-5 h-5" />
        </div>
        {product ? <h3 className="text-center font-semibold">{product.name}</h3> : null}
      </div>
      <ProductDetail 
      product={product} 
      isFetching={isFetching} 
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      />
      <div className="fixed bottom-0 h-20 bg-white w-full z-50 p-4 grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <Counter qty={qty} setQty={setQty} />
        </div>
        <button onClick={handleAdd} className="primary-button col-span-7">Add product</button>
      </div>
    </div>
  )
}

export default Product