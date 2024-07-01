import { ReactNode, Suspense, lazy } from 'react'
import SideBar from './side_bar/SideBar'
import Cart from '../cart/Cart'
import Ticket from '../ticket/Ticket'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import type { Product } from '../../types'

const ProductOptions = lazy(() => import("../products/product_options/ProductOptions"))
const Checkout = lazy(() => import("../checkout/Checkout"))

type PropsTypes = {
  children: ReactNode
}

const Layout = ({ children }: PropsTypes) => {

  const { currentSelectedProduct } = useSelector<RootState, { currentSelectedProduct: Product }>(state => state.productOptions)
  const { checkoutMenu, customProductMenu } = useSelector<RootState, { checkoutMenu: boolean }>(state => state.menus)

  return (
    <>
      <Ticket />
      <div className="dont-print relative flex w-full h-screen overflow-hidden bg-white z-50">
        <SideBar />
        <main className="@container/main flex-1 py-6 px-4 bg-indigo-50/50 overflow-y-auto">
          {children}
        </main>
        <Cart />
        {currentSelectedProduct ? <Suspense fallback={<></>}><ProductOptions /></Suspense> : null}
        {checkoutMenu ? <Suspense fallback={<></>}><Checkout /></Suspense> : null}
      </div>
    </>
  )
}

export default Layout