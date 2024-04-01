import { useState } from "react"
import ProductsList from "./components/products_list/ProductsList"
import { Product } from "./types"
import ProductDetail from "./components/product_detail/ProductDetail"
import Order from "./components/order/Order"
import Checkout from "./components/checkout/Checkout"

function App() {

  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [showOrder, setShowOrder] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <main>
        <ProductsList
          setProductDetails={setProductDetails}
          setShowOrder={setShowOrder}
        />
        <ProductDetail
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
        <Order
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          setShowCheckout={setShowCheckout}
        />
        <Checkout 
          showCheckout={showCheckout}
          setShowCheckout={setShowCheckout}
        />
        {/* {isCheckout ? <CheckoutForm cart={cart} setCheckout={setCheckout} /> : null} */}
    </main>
  )
}

export default App
