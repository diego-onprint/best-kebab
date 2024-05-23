import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import PageLoader from "./components/common/page_loader/PageLoader"
import TicketContextProvider from "./context/TicketContext"
import Ticket from "./components/ticket/Ticket"
import KithcenTicket from "./components/ticket/KitchenTicket"
import Persons from "./pages/persons/Persons"
import NotificationsLayer from "./hocs/NotificationsLayer"
import NewOrderSocketLayer from "./hocs/NewOrderSocketLayer"

const Categories = lazy(() => import("./pages/categories/Categories"))
const Products = lazy(() => import("./pages/products/Products"))
const Orders = lazy(() => import("./pages/orders/Orders"))
const Tables = lazy(() => import("./pages/tables/Tables"))
// const Reports = lazy(() => import("./pages/reports/Reports"))

function App() {

  return (
    <TicketContextProvider>
        <NotificationsLayer>
          <NewOrderSocketLayer>
            <Ticket />
            <KithcenTicket />
            <Layout>
              <Routes>
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
                  path="/orders"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Orders />
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
                {/* <Route path="/reports" element={<Reports />} /> */}
              </Routes>
            </Layout>
          </NewOrderSocketLayer>
        </NotificationsLayer>
    </TicketContextProvider>
  )
}

export default App
