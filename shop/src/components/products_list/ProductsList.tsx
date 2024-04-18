import { Dispatch, SetStateAction, useEffect, useState } from "react"
import type { CartTotal, Product } from "../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import useQuery from "../../hooks/useQuery"
import { products } from "../../../data/products"

const ProductsList = () => {

    // const [products, setProducts] = useState<Product[]>([])
    const totalProducts = useSelector<RootState, number>(state => state.cart.totalProducts)
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)

    const query = useQuery()
    const category = query.get("category")
    const filteredProducts = products.filter((product: Product) => product.parent === category)


    console.log("IN PRODUCTS", category, filteredProducts)

    return (
        <div className={`${filteredProducts.length > 0 && "-translate-x-full"} transition-transform z-20 bg-white fixed top-0 -right-[100vw] w-[100vw] h-[100vh]`}>
            <div className="relative p-3 border-b border-zinc-200">
                <h3 className="text-center font-semibold">Select products</h3>
            </div>
            <div className="flex flex-nowrap gap-4 p-4 bg-white shadow-md overflow-x-scroll">
                <p>Select a product</p>
            </div>
            <div className="grid grid-cols-12 gap-2 flex-1 h-80 overflow-y-auto overflow-x-hidden py-3 px-2 bg-neutral-100">
                {
                    filteredProducts.length > 0 ?
                        filteredProducts.map(product => (
                            <article key={product.id} className="col-span-6 sm:col-span-4 lg:col-span-3 border border-zinc-100 bg-white rounded-lg p-2 flex flex-col shadow-sm">
                                {/* <img src={product.images[0].src} className="w-full h-24 object-cover rounded-md" /> */}
                                <div className="p-1 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3>{product.name}</h3>
                                        <p>CHF.{product.price}</p>
                                    </div>
                                    <button onClick={() => setProductDetails(product)} className="primary-button bg-zinc-100 text-black border border-zinc-300" type="button">Add</button>
                                </div>
                            </article>
                        )) : null
                }
            </div>
            {/* {
                totalProducts > 0 ?
                    <div className="z-10 flex gap-6 items-end h-24 w-full p-5 bg-white border-t border-slate-100 shadow-lg">
                        <div>
                            <p><span>{totalProducts}</span> producto{totalProducts > 1 && <span>s</span>}</p>
                            <p className="text-xl font-semibold"><span className="text-sm">CHF.</span> {total}</p>
                        </div>
                        <button onClick={() => setShowOrder(true)} className="primary-button flex-1">Check Order</button>
                    </div> : null
            } */}
        </div>
    )
}

export default ProductsList