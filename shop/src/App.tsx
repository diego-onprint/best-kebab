import LocalStorageProvider from "./hocs/LocalStorageProvider"
import Categories from "./views/categories/Categories"
import Products from "./views/products/Products"
import Cart from "./components/cart/Cart"
import Product from "./views/product/Product"
import Checkout from "./views/checkout/Checkout"
import TableProvider from "./hocs/TableProvider"
import Confirmation from "./views/confirmation/Confirmation"
import Orders from "./views/orders/Orders"
import Landing from "./views/landing/Landing"

function App() {
  return (
    <TableProvider>
      <LocalStorageProvider>
        <main className="relative flex h-screen max-w-lg mx-auto overflow-hidden">
            <Landing />
            <Categories />
            <Products />
            {/* <Cart /> */}
            <Product />
            <Checkout />
            <Confirmation />
            <Orders />
        </main>
      </LocalStorageProvider>
    </TableProvider>
  )
}

export default App
