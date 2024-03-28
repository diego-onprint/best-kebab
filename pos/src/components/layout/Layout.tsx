import { ReactNode } from 'react'
import SideBar from './side_bar/SideBar'
import Cart from '../cart/Cart'

type PropsTypes = {
    children: ReactNode
}

const Layout = ({ children }: PropsTypes) => {
  return (
    <div className="relative flex w-full h-screen overflow-hidden">
        <SideBar />
        {children}
        <Cart />
    </div>
  )
}

export default Layout