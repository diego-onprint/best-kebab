import { useParams } from "react-router-dom"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ProductsList from "../../components/products_list/ProductsList"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"
import ReturnButton from "../../components/common/return_button/ReturnButton"

const Products = () => {

    const { id } = useParams()
    const errorMsg = "An error ocurred fetching products"

    return (
        <div>
            <div className="flex items-center gap-2">
                <ReturnButton />
                <h2 className="section-title">Products</h2>
            </div>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <ProductsList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Products