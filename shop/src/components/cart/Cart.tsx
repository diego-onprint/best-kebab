/**
 * Before checkout check if there is a table id. 
 * If table id, dont use form and send order to updateOrderData
 * endpoint, just to update the order for that table.
 * SECURITY. set a cookie or something that expires
 * else the user w/table id will be able to keep ordering
 * remotely or while other people in that same table
 * (login?)
 * 
 * If no table id, use a form to capture user data and
 * hit endpoint createOnlineOrder that will generate an
 * order as a TKW order in the pos (use same tkw form)
 * 
 * 
 */

import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { calculatePercentage } from "../../utils/calculatePercentage"
import { removeProduct } from "../../store/cart/cartSlice"
import type { AppDispatch } from "../../store/store"
import useParam from "../../hooks/useParam"
import { useUpdateOrderDataMutation } from "../../store/api/apiSlice"

const Cart = () => {

  const TAX_RATE = 2.6
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const table = useParam("table")
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector(state => state.cart)
  const [updateOrderData, { isLoading }] = useUpdateOrderDataMutation()

  const handleNavigation = (route) => {

    if (cart.products.length > 0) {
      const params = new URLSearchParams(searchParams)
      navigate({
        pathname: route,
        search: params.toString()
      })
    }
  }

  const handleRemove = (uid) => {
    dispatch(removeProduct(uid))
  }



  return (
    <aside className="sticky top-16 p-3">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Warenkorb</h2>
        {
          cart.products.length > 0 ?
            <ul className="flex flex-col gap-2 border border-zinc-200 p-3 rounded-lg divide-y divide-zinc-200 max-h-96 overflow-y-auto">
              {
                cart.products.map(product => {
                  return (
                    <li className="flex flex-col gap-1 pt-2" key={product.uid}>
                      <div className="flex justify-between gap-2">
                        <p className="flex-1 text-sm overflow-hidden truncate">{product.name}</p>
                        <p className="flex-0 text-sm">
                          <span className="text-zinc-400">CHF </span>
                          <span>{product.price}</span>
                        </p>
                      </div>
                      {
                        product.variations.length > 0 ?
                          <ul className="flex flex-col gap-1">
                            {
                              product.variations.map(variation => {
                                return (
                                  <div className="flex justify-between pl-2" key={variation.uid}>
                                    <p className="text-xs">{variation.option_name}</p>
                                    <p className="text-xs">
                                      <span className="text-zinc-400">CHF </span>
                                      <span>{variation.option_price}</span>
                                    </p>
                                  </div>
                                )
                              })
                            }
                          </ul> : null
                      }
                      <button onClick={() => handleRemove(product.uid)} className="secondary-button text-xs self-start mt-2 p-1 rounded-md">Entfernen</button>
                    </li>
                  )
                })
              }
            </ul> :
            <div className="flex-1 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-zinc-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
              </svg>
            </div>
        }
        {
          pathname !== "/checkout" ?
            <>
              <dl className="bg-zinc-100 rounded-md flex justify-between p-4">
                <dt className="text-xl font-semibold">Gesamt</dt>
                <dd className="text-xl font-bold">CHF {cart.subtotal}</dd>
              </dl>
              <button onClick={() => handleNavigation("/checkout")} className={`flex gap-2 primary-button hover:gap-8 transition-all ${cart.products.length <= 0 && "bg-zinc-400 cursor-pointer"}`}>
                <span>Bezahlen</span>
                {
                  cart.products.length > 0 ?
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </span> : null
                }
              </button>
            </> : null
        }
        {
          pathname === "/checkout" ?
            <div className="flex flex-col gap-2">
              <dl className="bg-zinc-100 rounded-md p-4 flex flex-col gap-2 divide-y divide-white">
                <div className="flex justify-between pt-2">
                  <dt className="font-semibold">Zwischensumme</dt>
                  <dd className="font-bold">CHF {cart.subtotal}</dd>
                </div>
                {
                  !table ?
                    <>
                      <div className="flex justify-between pt-2">
                        <dt className="font-semibold">Tip ({cart.tip.percentage}%)</dt>
                        <dd className="font-bold">CHF {cart.tip.total}</dd>
                      </div>
                      <div className="flex justify-between pt-2">
                        <dt className="font-semibold">Versand Gebühr</dt>
                        <dd className="font-bold">CHF 0.00</dd>
                      </div>
                    </> : null
                }
                <div className="flex justify-between pt-2">
                  <dt className="text-xl font-semibold">Gesamt</dt>
                  <dd className="text-xl font-bold">CHF {cart.total.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-sm">MwSt.</dt>
                  <dd className="text-sm">CHF {calculatePercentage(parseInt(cart.total), TAX_RATE).toFixed(2)} -{'>'} {TAX_RATE}% MwsT inkl.</dd>
                </div>
              </dl>
            </div> : null
        }
      </div>
    </aside>
  )
}

export default Cart