import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import TablesList from "../../components/tables/tables_list/TablesList"

const Tables = () => {

    const errorMsg = "An error ocurred fetching tables"

    return (
        <div>
            <h2 className="section-title">Tables</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <TablesList />
            </ErrorBoundary>
        </div>
    )
}

export default Tables