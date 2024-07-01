import { lazy, Suspense } from "react"
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { getLocalStorageItem } from '../utils/local_storage/localStorage'

const AdminMenus = lazy(() => import("../hocs/AdminMenus"))

const PrivateRoutes = () => {

    // TODO refactor to jwt
    const auth = getLocalStorageItem("user")

    return (
        auth ?
            <>
                <Suspense fallback={<></>}>
                    <AdminMenus />
                </Suspense>
                <Layout>
                    <Outlet />
                </Layout>
            </> :
            <Navigate to="/login" />
    )
}

export default PrivateRoutes