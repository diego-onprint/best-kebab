import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import CategoriesList from "../../components/categories/categories_list/CategoriesList"

const Categories = () => {

    const errorMsg = "An error ocurred fetching categories"

    return (
        <div>
            <h2 className="section-title">Categories</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <CategoriesList />
            </ErrorBoundary>
        </div>
    )
}

export default Categories