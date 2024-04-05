import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Categories from "./pages/categories/Categories"
import Products from "./pages/products/Products"
import Layout from "./components/layout/Layout"
import Reports from "./pages/reports/Reports"
import Orders from "./pages/orders/Orders"
import Tables from "./pages/tables/Tables"

// TODO dynamic imports!

function App() {

  return (
    <Layout>
      <main className="@container/main flex-1 py-6 px-4 bg-indigo-50/50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/category/:id" element={<Products />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </Layout>
  )
}

export default App
