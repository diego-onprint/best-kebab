import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import LocalStorageProvider from "./hocs/LocalStorageProvider"
import TableProvider from "./hocs/TableProvider"
import SectionsContextProvider from "./context/SectionsContext"
import ShopRoute from "./hocs/ShopRoute"

const Products = lazy(() => import("./views/products/Products"))
const Checkout = lazy(() => import("./views/checkout/Checkout"))
const Success = lazy(() => import("./views/success/Success"))

function App() {
  return (
    // REMOVE TABLE PROVIDER USE PARAMS INSTEAD
    <TableProvider>
      <LocalStorageProvider>
        <Toaster position="top-center" />
        <SectionsContextProvider>
            <Routes>
              <Route element={<ShopRoute />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<></>}>
                      <Products />
                    </Suspense>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Suspense fallback={<></>}>
                      <Checkout />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                  path="/success"
                  element={
                    <Suspense fallback={<></>}>
                      <Success />
                    </Suspense>
                  }
                />
            </Routes>
        </SectionsContextProvider>
      </LocalStorageProvider>
    </TableProvider>
  )
}

export default App
