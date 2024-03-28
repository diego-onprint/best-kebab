import { useParams } from "react-router-dom"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ProductsList from "../../components/products_list/ProductsList"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"

const Products = () => {

    const { id } = useParams()
    const errorMsg = "An error ocurred fetching products"

    return (
        <div>
            <h2 className="section-title">Products</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <ProductsList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Products