import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import PageLoader from "./components/common/page_loader/PageLoader"
import PrivateRoutes from "./routes/PrivateRoutes"
import SocketRegis from "./hocs/SocketRegis"
import AutomaticActions from "./hocs/AutomaticActions"

const Categories = lazy(() => import("./pages/categories/Categories"))
const Subcategories = lazy(() => import("./pages/subcategories/Subcategories"))
const Products = lazy(() => import("./pages/products/Products"))
const Orders = lazy(() => import("./pages/orders/Orders"))
const Tables = lazy(() => import("./pages/tables/Tables"))
const Takeaway = lazy(() => import("./pages/takeaway/Takeaway"))
const Login = lazy(() => import("./pages/login/Login"))
const Reports = lazy(() => import("./pages/reports/Reports"))

function App() {

  return (
    <SocketRegis>
      <AutomaticActions>
        <Toaster position="top-center" containerClassName="dont-print" />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Tables />
                </Suspense>
              }
            />
            <Route
              path="/categories"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Categories />
                </Suspense>
              }
            />
            <Route
              path="/subcategories/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Subcategories />
                </Suspense>
              }
            />
            <Route
              path="/products/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path="/tables"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Tables />
                </Suspense>
              }
            />
            <Route
              path="/takeaway"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Takeaway />
                </Suspense>
              }
            />
            <Route
              path="/orders"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Orders />
                </Suspense>
              }
            />
            <Route
              path="/reports"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Reports />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <p>404 page not found</p>
              </Suspense>
            }
          />
        </Routes>
      </AutomaticActions>
    </SocketRegis>
  )
}

export default App
