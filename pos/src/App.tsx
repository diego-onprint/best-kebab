import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Categories from "./pages/categories/Categories"
import Products from "./pages/products/Products"
import Layout from "./components/layout/Layout"
// import Reports from "./pages/reports/Reports"
import Orders from "./pages/orders/Orders"
import Tables from "./pages/tables/Tables"
import { getLocalStorageItem } from "./utils/localStorage"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store"
import { updateCartInitialState } from "./store/cart/cartSlice"
import { updateTablesInitialState } from "./store/tables/tablesSlice"
import Subcategories from "./pages/subcategories/Subcategories"

// TODO dynamic imports!

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {

    const cartLocalStorage = getLocalStorageItem("cart")
    const tablesLocalStorage = getLocalStorageItem("tables")

    if (cartLocalStorage) {
      dispatch(updateCartInitialState(cartLocalStorage))
    }

    if (tablesLocalStorage) {
      dispatch(updateTablesInitialState(tablesLocalStorage))
    }

  }, [])

  return (
    <Layout>
      <main className="@container/main flex-1 py-6 px-4 bg-indigo-50/50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategories/:id" element={<Subcategories />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/tables" element={<Tables />} />
          {/* <Route path="/reports" element={<Reports />} /> */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
