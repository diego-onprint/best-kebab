import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { Link } from "react-router-dom"

const SideBar = () => {

  const { status: connectionStatus } = useSelector<RootState, { status: boolean }>(state => state.status)
  const [active, setActive] = useState("/")

  return (
    <header className="flex flex-col gap-8 px-1 py-2 shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <span className={`absolute right-1 top-2 w-2 h-2 ring-2 ring-white rounded-full ${connectionStatus ? "bg-green-400" : "bg-red-500"}`}></span>
          <picture className="w-10 h-10 grid place-items-center">
            <source srcSet="/assets/onprint-logo.webp" type="image/webp" />
            <img src="/assets/onprint-logo.png" />
          </picture>
        </div>
        <div className="relative font-bold">POS</div>
      </div>
      <nav>
        <ul className="flex flex-col gap-4">
          <li className="text-[10px]">
            <Link
              to="/"
              onClick={() => setActive("/")}
              className={`flex flex-col items-center p-1 hover:bg-zinc-100 rounded-md ${active === "/" && "bg-zinc-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="text-[10px]">
            <Link
              to="/categories"
              onClick={() => setActive("/categories")}
              className={`flex flex-col items-center p-1 hover:bg-zinc-100 rounded-md ${active === "/categories" && "bg-zinc-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
              Products
            </Link>
          </li>
          <li className="text-[10px]">
            <Link
              to="/orders"
              onClick={() => setActive("/orders")}
              className={`flex flex-col items-center p-1 hover:bg-zinc-100 rounded-md ${active === "/orders" && "bg-zinc-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
              </svg>
              Orders
            </Link>
          </li>
          <li className="text-[10px]">
            <Link
              to="/reports"
              onClick={() => setActive("/reports")}
              className={`flex flex-col items-center p-1 hover:bg-zinc-100 rounded-md ${active === "/reports" && "bg-zinc-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>
              Reports
            </Link></li>
          <li className="text-[10px]">
            <Link
              to="/settings"
              onClick={() => setActive("/settings")}
              className={`flex flex-col items-center p-1 hover:bg-zinc-100 rounded-md ${active === "/settings" && "bg-zinc-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default SideBar