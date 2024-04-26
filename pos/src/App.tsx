import { useEffect, lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import { getLocalStorageItem } from "./utils/local_storage/localStorage"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store"
import PageLoader from "./components/common/page_loader/PageLoader"
import TicketContextProvider from "./context/TicketContext"
import NewOrderNotificationContextProvider from "./context/NewOrderNotificationContext"
import Takeaway from "./pages/takeaway/Takeaway"
import { updateOrdersInitialState } from "./store/orders/ordersSlice"
import Ticket from "./components/ticket/Ticket"

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"))
const Categories = lazy(() => import("./pages/categories/Categories"))
const Subcategories = lazy(() => import("./pages/subcategories/Subcategories"))
const Products = lazy(() => import("./pages/products/Products"))
const Orders = lazy(() => import("./pages/orders/Orders"))
const Tables = lazy(() => import("./pages/tables/Tables"))
// const Reports = lazy(() => import("./pages/reports/Reports"))

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const ordersLocalStorage = getLocalStorageItem("orders")
    ordersLocalStorage && dispatch(updateOrdersInitialState(ordersLocalStorage))
  }, [dispatch])

  return (
    <TicketContextProvider>
      <NewOrderNotificationContextProvider>
        <Ticket />
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageLoader />}>
                  {/* <Dashboard /> */}
                  <p>Dashboard</p>
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
            {/* <Route
              path="/subcategories/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Subcategories />
                </Suspense>
              }
            /> */}
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
                  {/* <Tables /> */}
                  <p>Tables</p>
                </Suspense>
              }
            />
            {/* <Route path="/reports" element={<Reports />} /> */}
            <Route
              path="/orders"
              element={
                <Suspense fallback={<PageLoader />}>
                  {/* <Orders /> */}
                  <p>Orders</p>
                </Suspense>
              }
            />
            <Route
              path="/takeaway"
              element={
                <Suspense fallback={<PageLoader />}>
                  {/* <Takeaway /> */}
                  <p>Takeaway</p>
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
        </Layout>
      </NewOrderNotificationContextProvider>
    </TicketContextProvider>
  )
}

export default App
