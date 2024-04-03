import { useState } from "react"
import ProductsList from "./components/products_list/ProductsList"
import { useLocation } from "react-router-dom"
import type { Product } from "./types"
import ProductDetail from "./components/product_detail/ProductDetail"
import Order from "./components/order/Order"
import Checkout from "./components/checkout/Checkout"

function App() {

  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [showOrder, setShowOrder] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const location = useLocation();

  // Extract query parameters from location.search
  const queryParams = new URLSearchParams(location.search);

  // Get specific query parameters using the get method
  const table = queryParams.get('table') ;
  // const param2 = queryParams.get('param2');

  console.log("TABLE....", typeof table)

  return (
    <main>
        <ProductsList
          setProductDetails={setProductDetails}
          setShowOrder={setShowOrder}
          table={table}
        />
        <ProductDetail
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
        <Order
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          setShowCheckout={setShowCheckout}
          table={table}
        />
        <Checkout 
          showCheckout={showCheckout}
          setShowCheckout={setShowCheckout}
          table={table}
        />
        {/* {isCheckout ? <CheckoutForm cart={cart} setCheckout={setCheckout} /> : null} */}
    </main>
  )
}

export default App
