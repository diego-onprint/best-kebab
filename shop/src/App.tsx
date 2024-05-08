// import Order from "./components/order/Order"
// import Checkout from "./components/checkout/Checkout"
import Categories from "./views/categories/Categories"
import Products from "./views/products/Products"
import Cart from "./components/cart/Cart"
import Product from "./views/product/Product"

function App() {
  return (
    <main className="relative flex h-screen overflow-hidden">
        <Categories />
        <Products />
        <Cart />
        <Product />
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
