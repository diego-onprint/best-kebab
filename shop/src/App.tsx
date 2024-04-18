import { useEffect, useState } from "react"
import { categories } from "../data/categories"
import { useLocation } from "react-router-dom"
import ProductsList from "./components/products_list/ProductsList"
// import ProductDetail from "./components/product_detail/ProductDetail"
// import Order from "./components/order/Order"
// import Checkout from "./components/checkout/Checkout"
import CategoriesList from "./components/categories_list/CategoriesList"
import type { Category, Product } from "./types"
import useQuery from "./hooks/useQuery"

function App() {

  const query = useQuery()
  const [selectedProdudct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category["id"] | null>(null)
  const [showOrder, setShowOrder] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  // // Extract query parameters from location.search
  // // const queryParams = new URLSearchParams(location.search);

  // // Get specific query parameters using the get method
  const category = query.get('category')

  console.log(category)

  return (
    <main>
        <CategoriesList 
          categories={categories}
        />
        <ProductsList />
        {/* <ProductDetail
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        /> */}
        {/* <Order
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          setShowCheckout={setShowCheckout}
        /> */}
        {/* <Checkout 
          showCheckout={showCheckout}
          setShowCheckout={setShowCheckout}
        /> */}
        {/* {isCheckout ? <CheckoutForm cart={cart} setCheckout={setCheckout} /> : null} */}
    </main>
  )
}

export default App
