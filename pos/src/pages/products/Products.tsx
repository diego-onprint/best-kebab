import { useParams } from "react-router-dom"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ProductsList from "../../components/products/products_list/ProductsList"
// import ReturnButton from "../../components/common/return_button/ReturnButton"
import { setAddProductMenu } from "../../store/menus/menusSlice"
import { useDispatch } from "react-redux"

const Products = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const errorMsg = "An error ocurred fetching products"

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <h2 className="section-title">Produkten</h2>
                <div className="flex gap-4">
                    <button onClick={() => dispatch(setAddProductMenu(true))} className="bg-white rounded-md p-2 border border-zinc-200">Neues Produkt</button>
                </div>
            </div>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <ProductsList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Products