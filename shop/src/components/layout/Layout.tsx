import Hero from "../hero/Hero"
import Cart from "../cart/Cart"
// import StickyScrollSpyNav from "../sticky_scroll_spy_nav/StickyScrollSpyNav"
import { useLocation } from "react-router-dom"
import MobileCart from "../cart/mobile_cart/MobileCart"

const Layout = ({ children }) => {

  const { pathname } = useLocation()
  const isHome = pathname === "/" 

  return (
    <main>
      <Hero />
      {/* {isHome ? <StickyScrollSpyNav /> : null} */}
      {isHome ? <MobileCart /> : null}
      <div className="max-w-7xl grid grid-cols-12 mx-auto pt-8">
        <div className={`col-span-12 sm:col-span-7 ${isHome && "col-span-12 sm:col-span-7"}`}>
          {children}
        </div>
        <div className={`col-span-12 sm:col-span-5 ${isHome && "hidden col-span-0 sm:block sm:col-span-5"}`}>
          <Cart />
        </div>
      </div>
    </main>
  )
}

export default Layout