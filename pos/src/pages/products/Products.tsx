import { useParams } from "react-router-dom"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ProductsList from "../../components/products/products_list/ProductsList"
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