import ProductsList from "../../components/products_list/ProductsList"
import ReturnButton from "../../components/common/return_button/ReturnButton"
import useParam from "../../hooks/useParam"
import useNavigation from "../../hooks/useNavigation"

const Products = () => {

    const category = useParam("category")
    const { toOrdersView } = useNavigation()

    return (
        <div className={`${!category && "translate-x-full"} absolute top-0 right-0 w-screen h-screen transition-transform z-20 flex flex-col flex-1 overflow-y-auto`}>
            <div className="section-header grid place-items-center relative min-h-16">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center">
                    <ReturnButton style="w-5 h-5" />
                </div>
                <h3 className="text-center font-semibold">Ein Produkt auswählen</h3>
                <button onClick={toOrdersView} className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </button>
            </div>
            <ProductsList />
        </div>
    )
}

export default Products