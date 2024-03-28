import MonthSalesGraph from "../../components/dashboard/MonthSalesGraph"
import SummaryBanner from "../../components/dashboard/SummaryBanner"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"

const Dashboard = () => {
  return (
    <div>
      <h2 className="section-title">Dashboard</h2>
      <div className="box mt-4">
        <h3 className="font-semibold">Current month summary</h3>
        <ErrorBoundary fallback={<ErrorFallback>An error ocurred in this section</ErrorFallback>}>
          <SummaryBanner />
        </ErrorBoundary>
      </div>
      <div className="box mt-4">
        <h3 className="font-semibold">Current month sales by day</h3>
        <ErrorBoundary fallback={<ErrorFallback>An error ocurred in this section</ErrorFallback>}>
          <MonthSalesGraph />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Dashboard