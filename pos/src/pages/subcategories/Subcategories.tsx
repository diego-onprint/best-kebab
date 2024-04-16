import { useParams } from "react-router-dom"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import SubcategoriesList from "../../components/categories/subcategories_list/SubcategoriesList"

const Subcategories = () => {

    const { id } = useParams()
    const errorMsg = "An error ocurred fetching categories"

    return (
        <div>
            <h2 className="section-title">Categories</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <SubcategoriesList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Subcategories