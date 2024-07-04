import { lazy, Suspense } from "react"
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { getLocalStorageItem } from '../utils/local_storage/localStorage'
import NotificationsLayer from '../hocs/NotificationsLayer'
import NewOrderSocketLayer from '../hocs/NewOrderSocketLayer'

const AdminMenus = lazy(() => import("../hocs/AdminMenus"))

const PrivateRoutes = () => {

    // TODO refactor to jwt
    const auth = getLocalStorageItem("user")

    return (
        auth ?
            <NotificationsLayer>
                <NewOrderSocketLayer>
                    <Suspense fallback={<></>}>
                        <AdminMenus />
                    </Suspense>
                    <Layout>
                        <Outlet />
                    </Layout>
                </NewOrderSocketLayer>
            </NotificationsLayer> :
            <Navigate to="/login" />
    )
}

export default PrivateRoutes