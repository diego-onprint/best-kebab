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
      <main className="@container/main flex-1 py-6 px-4 bg-indigo-50/50 overflow-y-auto">
        {children}
      </main>
      <Cart />
    </div>
  )
}

export default Layout