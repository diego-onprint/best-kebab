import { Dispatch, SetStateAction, useEffect, useState } from "react"
import type { CartTotal, Product } from "../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

type PropsTypes = {
    setProductDetails: Dispatch<SetStateAction<Product | null>>
    setShowOrder: Dispatch<SetStateAction<boolean>>
    table: string
}

const ProductsList = ({ setProductDetails, setShowOrder, table }: PropsTypes) => {

    const [products, setProducts] = useState<Product[]>([])
    const totalProducts = useSelector<RootState, number>(state => state.cart.totalProducts)
    const total = useSelector<RootState, CartTotal>(state => state.cart.total)


    const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_STORE_BASE_URL : import.meta.env.VITE_STORE_BASE_URL
    const ck = import.meta.env.DEV ? import.meta.env.VITE_WOO_CONSUMER_KEY : import.meta.env.VITE_WOO_CONSUMER_KEY
    const cs = import.meta.env.DEV ? import.meta.env.VITE_WOO_SECRET_KEY : import.meta.env.VITE_WOO_SECRET_KEY
    const url = `${baseUrl}products?per_page=10&consumer_key=${ck}&consumer_secret=${cs}`

    // GET PRODUCTS
    useEffect(() => {

        const getData = async () => {

            console.log(url)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setProducts(json)

            } catch (err) {
                console.log("Error fetching data: ", err)
            }
        }

        getData()

    }, [url])

    return (
        <div className="w-full flex flex-col h-[80vh]">
            <div className="relative p-3 border-b border-zinc-200">
                <h3 className="text-center font-semibold">Select products</h3>
                <p className="text-center text-zinc-400">Table {table}</p>
            </div>
            <div className="flex flex-nowrap gap-4 p-4 bg-white shadow-md overflow-x-scroll">
                <p>Categories</p>
                {/* <button className="inline-block">Cat. 1</button>
                <button className="inline-block">Cat. 2</button>
                <button className="inline-block">Cat. 3</button>
                <button className="inline-block">Cat. 4</button>
                <button className="inline-block">Cat. 5</button>
                <button className="inline-block">Cat. 6</button>
                <button className="inline-block">Cat. 6</button> */}
            </div>
            <div className="grid grid-cols-12 gap-2 flex-1 h-80 overflow-y-auto py-3 px-2 bg-neutral-100">
                {
                    products.length !== 0 ?
                        products.map(product => (
                            <article key={product.id} className="col-span-6 sm:col-span-4 lg:col-span-3 border border-zinc-100 bg-white rounded-lg p-2 flex flex-col shadow-sm">
                                <img src={product.images[0].src} className="w-full h-24 object-cover rounded-md" />
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
            {
                totalProducts > 0 ?
                    <div className="z-10 flex gap-6 items-end h-24 w-full p-5 bg-white border-t border-slate-100 shadow-lg">
                        <div>
                            <p><span>{totalProducts}</span> producto{totalProducts > 1 && <span>s</span>}</p>
                            <p className="text-xl font-semibold"><span className="text-sm">CHF.</span> {total}</p>
                        </div>
                        <button onClick={() => setShowOrder(true)} className="primary-button flex-1">Check Order</button>
                    </div> : null
            }
        </div>
    )
}

export default ProductsList