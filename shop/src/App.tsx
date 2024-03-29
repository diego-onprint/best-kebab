import { useState } from "react";
import Layout from "./components/layout/Layout";
import ProductsList from "./components/products_list/ProductsList";
import { CartProduct, Product } from "./types";
import CheckoutForm from "./components/checkout_form/CheckoutForm";
import ProductDetail from "./components/product_detail/ProductDetail";

function App() {

  const [cart, setCart] = useState<CartProduct[]>([])
  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [selectedProduct, setSelectedProduct] = useState()
  const [isCheckout, setCheckout] = useState(false)

  return (
    <Layout>
      <div className="grid grid-cols-12 p-4 max-w-screen-xl mx-auto gap-4">
        <div className="col-span-12 md:col-span-6">
          <ProductsList setProductDetails={setProductDetails} />
        </div>
        <ProductDetail productDetails={productDetails} setProductDetails={setProductDetails} />
        { isCheckout ? <CheckoutForm cart={cart} setCheckout={setCheckout} /> : null }

      </div>
    </Layout>
  )
}

export default App
