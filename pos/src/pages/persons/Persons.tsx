import ErrorBoundary from "../../components/common/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/common/error_fallback/ErrorFallback"
import PersonsList from "../../components/persons_list/PersonsList"


const Persons = () => {

    const errorMsg = "An error ocurred fetching persons"

    return (
        <div>
            <h2 className="section-title">Tables</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <PersonsList />
            </ErrorBoundary>
        </div>
    )
}

export default Persons